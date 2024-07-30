import { Controller } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @MessagePattern({ cmd: 'getRate' })
  async getRate(): Promise<number> {
    return await this.currencyService.getRate('USD');
  }
}
