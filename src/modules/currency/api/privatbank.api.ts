import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { BaseAxiosApi } from "src/common/api/base-axios.api";
import { IExchangeApi } from "../interfaces/exchange-api.interface";
import { firstValueFrom } from "rxjs";
import { IPrivatBankCurrency } from "../interfaces/privatbank-currency.interface";

@Injectable()
export class PrivatBankApi extends BaseAxiosApi implements IExchangeApi {
    constructor(private readonly httpService: HttpService) {
        super();
        this.baseURL = "https://api.privatbank.ua";
        this.authorization = "";
    }

    async getRate(targetCurrency: string): Promise<number | null> {
        const res = await firstValueFrom(this.httpService.get(`${this.baseURL}/p24api/pubinfo?json&exchange&coursid=5`));
        console.log("RES", res)
        // const res = (await this.request(config)) as AxiosResponse;
        console.log(res.data.find((el: IPrivatBankCurrency) => el.ccy === targetCurrency));
        return res.data.find((el: IPrivatBankCurrency) => el.ccy === targetCurrency)?.buy;
    }
}
