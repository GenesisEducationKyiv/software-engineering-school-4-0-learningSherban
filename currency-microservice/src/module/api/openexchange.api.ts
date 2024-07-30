import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { BaseAxiosApi } from 'src/common/api/base-axios.api';
import { IExchangeApi } from '../interfaces/exchange-api.interface';
import { firstValueFrom } from 'rxjs';
import { DotenvConfigService } from 'src/config/dotenv/config.service';

@Injectable()
export class OpenExchangeApi extends BaseAxiosApi implements IExchangeApi {
  constructor(
    private readonly httpService: HttpService,
    private readonly dotenvService: DotenvConfigService,
  ) {
    super();
    this.baseURL = 'https://openexchangerates.org';
    this.authorization = this.dotenvService.getVariable(
      'OPENEXCHANGE_API_KEY',
    ) as string;
  }

  async getRate(targetCurrency: string): Promise<number | null> {
    const res = await firstValueFrom(
      this.httpService.get(
        `${this.baseURL}/api/latest.json?&symbols=${targetCurrency}`,
        {
          headers: {
            Authorization: this.authorization,
          },
        },
      ),
    );
    return res.data.rates[targetCurrency];
  }
}
