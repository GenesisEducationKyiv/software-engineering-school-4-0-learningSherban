import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';

@Controller('/')
export class SubscriptionController {
  constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) {}

  @Post('/subscribe')
  createSubscription(@Body() createSubscriptionDto: CreateSubscriptionDto) {
    return this.natsClient.send(
      { cmd: 'createSubscription' },
      createSubscriptionDto,
    );
  }
}
