import { Module } from "@nestjs/common";
import { MailerModule } from "@nestjs-modules/mailer";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { NodemailerConfig } from "../../../config/nodemailer.config";

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const { email, password } =
          configService.get<NodemailerConfig>("nodemailer")!;

        return {
          transport: {
            host: "gmail",
            auth: {
              user: email,
              pass: password,
            },
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class NodemailerProviderModule {}
