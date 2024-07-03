import { Module } from "@nestjs/common";
import { MailerModule } from "@nestjs-modules/mailer";
import { NodemailerConfigModule } from "src/config/mail/nodemailer/config.module";
import { NodemailerConfigService } from "src/config/mail/nodemailer/config.service";

@Module({
    imports: [
        MailerModule.forRootAsync({
            imports: [NodemailerConfigModule],
            useFactory: async (nodemailerConfigService: NodemailerConfigService) => ({
                transport: {
                    host: "gmail",
                    auth: {
                        user: nodemailerConfigService.user,
                        pass: nodemailerConfigService.password,
                    },
                },
            }),
            inject: [NodemailerConfigService],
        }),
    ],
})
export class NodemailerProviderModule {}
