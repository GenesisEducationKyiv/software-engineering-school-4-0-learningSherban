import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { BaseAxiosApi } from "src/common/api/base-axios.api";
import { IExchangeApi } from "../interfaces/exchange-api.interface";
import { firstValueFrom } from "rxjs";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class OpenExchangeApi extends BaseAxiosApi implements IExchangeApi {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    super();
    this.baseURL = "https://openexchangerates.org";
    this.authorization = this.configService.get<string>("OPENEXCHANGE_API_KEY");
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
