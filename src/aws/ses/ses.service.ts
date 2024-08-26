import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SesService {
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
                region: process.env.AWS_REGION,
                credentials: {
                    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
                    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
                  }
            });
            const command = new SendEmailCommand(params);
            const sesResult = await ses.send(command);
            return sesResult;
        } catch (err) {
            throw (err)
        }
    }
}
