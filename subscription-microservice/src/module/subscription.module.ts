import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriptionService } from './subscription.service';
import { SubscriptionController } from './subscription.controller';
import { Subscription } from './entities/subscription.entity';
import { NatsClientModule } from 'src/nats-client/nats-client.module';

@Module({
  imports: [TypeOrmModule.forFeature([Subscription]), NatsClientModule],
  controllers: [SubscriptionController],
  providers: [SubscriptionService],
  exports: [SubscriptionService],
})
export class SubscriptionModule {}
