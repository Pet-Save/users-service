import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SesService {
    constructor(private configService: ConfigService) {}

    async sendEmail(subject: string, content: string) {
        try {
            const params = {
                Source: "server@mail.petsaveorg.com",
                Destination: {
                    ToAddresses: [
                        process.env.DEFAULT_EMAIL || 'petsaveorg@gmail.com'
                    ]
                },
                Message: {
                    Subject: {
                        Data: subject
                    },
                    Body: {
                        Text: {
                            Data: content
                        }
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
