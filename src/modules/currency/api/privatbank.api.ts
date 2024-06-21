import { injectable } from "inversify";
import "reflect-metadata";
import { BaseAxiosApi } from "../../../common/base-axios.api";
import { AxiosRequestConfig, AxiosResponse } from "axios";

export interface IExchangeApi extends BaseAxiosApi {
    getRate(targetCurrency: string): Promise<number | null>;
}

interface PrivatBankCurrency {
    ccy: string;
    base_ccy: string;
    buy: string;
    sale: string;
}

@injectable()
export class PrivatBankApi extends BaseAxiosApi implements IExchangeApi {
    constructor() {
        super();
        this.baseURL = "https://api.privatbank.ua";
        this.authorization = "";
    }

    async getRate(targetCurrency: string): Promise<number | null> {
        const config: AxiosRequestConfig = {
            method: "get",
            url: `/p24api/pubinfo?json&exchange&coursid=5`,
        };
        const res = (await this.request(config)) as AxiosResponse;
        console.log(res.data.find((el: PrivatBankCurrency) => el.ccy === targetCurrency));
        return res.data.find((el: PrivatBankCurrency) => el.ccy === targetCurrency)?.buy;
    }
}
