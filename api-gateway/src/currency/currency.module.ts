import { Module } from '@nestjs/common';
import { NatsClientModule } from 'src/nats-client/nats-client.module';
import { CurrencyController } from './currency.controller';

@Module({
  imports: [NatsClientModule],
  controllers: [CurrencyController],
})
export class CurrencyModule {}
