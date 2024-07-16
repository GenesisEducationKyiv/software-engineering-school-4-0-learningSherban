import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DotenvConfigModule } from './config/dotenv/config.module';
import { NodemailerProviderModule } from './providers/mails/nodemailer/nodemailer.module';
import { MailSenderModule } from './module/mail-sender.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    DotenvConfigModule,
    NodemailerProviderModule,
    MailSenderModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
