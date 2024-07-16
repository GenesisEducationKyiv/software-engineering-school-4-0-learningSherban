import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Cron } from '@nestjs/schedule';
import { randomUUID } from 'crypto';
import { lastValueFrom } from 'rxjs';
import { IMailEventDto } from 'src/module/interfaces/mail-event.interface';
import { ISubscription } from 'src/module/interfaces/subscription.interface';

@Injectable()
export class CurrencyRateCronService {
  constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) {}

  @Cron('* * * * * *')
  async handleCron() {
    try {
      const subscriptions = await lastValueFrom<ISubscription[]>(
        this.natsClient.send({ cmd: 'getAllSubscriptions' }, {}),
      );
      console.log('usdRate');
      const usdRate = await lastValueFrom<number>(
        this.natsClient.send({ cmd: 'getRate' }, {}),
      );
      const sendMailPromises = [];
      for (const subscription of subscriptions) {
        const mailEvent: IMailEventDto = {
          eventId: randomUUID(),
          eventType: 'RateMail',
          aggregateId: subscription.id,
          timestamp: new Date().toISOString(),
          data: {
            subscriptionId: subscription.id,
            subscriptionEmail: subscription.email,
            mailText: `Hello! 1 USD = ${usdRate} UAH`,
          },
        };
        sendMailPromises.push(
          lastValueFrom(this.natsClient.emit({ cmd: 'sendMail' }, mailEvent)),
        );
        console.log(`Send rate ${usdRate} to email: ${subscription.email}`);
      }

      await Promise.allSettled(sendMailPromises);
      return true;
    } catch (error) {
      throw error;
    }
  }
}
