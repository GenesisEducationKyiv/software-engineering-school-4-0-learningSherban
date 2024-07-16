import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('/')
export class CurrencyController {
  constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) {}

  @Get('/rate')
  createSubscription() {
    return this.natsClient.send({ cmd: 'getRate' }, {});
  }
}
