import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class SendEmailService {
    constructor(private readonly mailerService: MailerService) { }

    public sendEmail(emailBody): void {
        const { body } = emailBody;
        const { addresses, subject, text } = body;
        this.mailerService
            .sendMail({
                to: addresses, // list of receivers
                //from: 'youremail@domain.com', // sender address
                subject: subject, // Subject line
                text: text, // plaintext body
                html: `${text}`, // HTML body content
            })
            .then((res) => {
                console.log("E-mail enviado com sucesso");
                //console.log(res);
            })
            .catch((err) => {
                console.log("Falha ao enviar e-mail");
                //console.log(err);
            });
    }
}