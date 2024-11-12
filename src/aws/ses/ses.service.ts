import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Handlebars from 'handlebars';
import { readFile } from 'fs/promises';
import path from 'path';
import { fromSSO } from '@aws-sdk/credential-provider-sso';

Handlebars.registerHelper('includesElement', (array, element) => {
    return array.includes(element);
});

Handlebars.registerHelper('ifEquals', function(arg1, arg2) {
    return (arg1 == arg2)
});

Handlebars.registerHelper('add', function(arg1, arg2) {
    return arg1 + arg2
});

@Injectable()
export class SesService {
    private sesClient: SESClient;
    
    constructor(
        private configService: ConfigService,
    ) {
        const env = this.configService.get('NODE_ENV');
        this.sesClient = new SESClient({
            region: this.configService.get('AWS_REGION'),
            credentials: env === 'local'
                ? fromSSO({ profile: process.env.AWS_PROFILE })
                : undefined, // Use IAM role in production
        });
    }

    async getAndHydrateHtmlTemplate(templateName: string, emailData: any) {
        try{
            const emailHtmlTemplate = await readFile(path.resolve(__dirname, `../../assets/email-templates/${templateName}`), 'utf8');
            const templateHtml = Handlebars.compile(emailHtmlTemplate);
            return templateHtml(emailData);
        } catch(err) {
            console.error(err)
            throw (err)            
        }
    }

    async sendEmail(templateName: string, subject: string, emailData: any) {
        const hydratedTemplate = await this.getAndHydrateHtmlTemplate(templateName, emailData);
        try {
            const params = {
                Source: "server@mail.petsaveorg.com",
                Destination: {
                    ToAddresses: [
                        process.env.DEFAULT_EMAIL || 'petsaveorg@gmail.com'
                    ]
                },
                Message: {
                    Body: {
                        Html: {
                            Data: hydratedTemplate
                        },
                    },
                    Subject: {
                        Data: subject,
                        Charset: 'UTF-8'
                    }
                },
            }
            const command = new SendEmailCommand(params);
            const sesResult = await this.sesClient.send(command);
            return sesResult;
        } catch (err) {
            console.error(err)
            throw (err)
        }
    }
}
