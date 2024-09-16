import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Handlebars from 'handlebars';
import { readFile } from 'fs/promises';
import path from 'path';

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
    constructor(private configService: ConfigService) {}

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
            const ses = new SESClient({
                region: this.configService.get('AWS_REGION') as string,
                credentials: {
                    secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY') as string,
                    accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID') as string,
                  }
            });
            const command = new SendEmailCommand(params);
            const sesResult = await ses.send(command);
            return sesResult;
        } catch (err) {
            console.error(err)
            throw (err)
        }
    }
}
