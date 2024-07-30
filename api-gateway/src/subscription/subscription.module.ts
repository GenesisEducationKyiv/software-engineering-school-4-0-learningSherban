import { Module } from '@nestjs/common';
import { NatsClientModule } from 'src/nats-client/nats-client.module';
import { SubscriptionController } from './subscription.controller';

@Module({
  imports: [NatsClientModule],
  controllers: [SubscriptionController],
  providers: [],
})
export class SubscriptionModule {}
