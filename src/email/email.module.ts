import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CreateEmailService } from './create-email.service';
import { SendEmailService } from './send-email.service';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env',
            isGlobal: true
        }),
        MailerModule.forRoot({
            transport: `smtps://${process.env.USER_EMAIL}:${process.env.PASSWORD}@${process.env.SERVER_EMAIL}`,
            defaults: {
                from: `"Solar Tambaú" <${process.env.USER_EMAIL}>`,
            },
            preview: false,
            template: {
                dir: process.cwd() + '/template/',
                adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
                options: {
                    strict: true,
                },
            },
        }),
    ],
    providers: [
        CreateEmailService,
        SendEmailService
    ],
    exports: [
        CreateEmailService,
        SendEmailService
    ]
})
export class EmailModule { }