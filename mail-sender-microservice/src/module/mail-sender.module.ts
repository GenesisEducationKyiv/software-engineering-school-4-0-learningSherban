import { Module } from '@nestjs/common';
import { MailSenderController } from './mail-sender.controller';
import { MailService } from './mail-sender.service';
import { CurrencyRateCronService } from 'src/jobs/consumer/currency-rate-cron/currency-rate-cron.consumer';
import { NatsClientModule } from 'src/nats-client/nats-client.module';

@Module({
  imports: [NatsClientModule],
  controllers: [MailSenderController],
  providers: [MailService, CurrencyRateCronService],
  exports: [MailService, CurrencyRateCronService],
})
export class MailSenderModule {}
