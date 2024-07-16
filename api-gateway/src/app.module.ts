import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NatsClientModule } from './nats-client/nats-client.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { CurrencyModule } from './currency/currency.module';

@Module({
  imports: [NatsClientModule, SubscriptionModule, CurrencyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
