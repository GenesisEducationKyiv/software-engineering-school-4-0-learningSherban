import { inject, injectable } from "inversify";
import "reflect-metadata";
import { BaseAxiosApi } from "../../../common/base-axios.api";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { DotenvService } from "../../../config/dotenv.service";
import { INVERSIFY_TYPES } from "../../../constants/inversify.types";

export interface IExchangeApi extends BaseAxiosApi {
    getRate(targetCurrency: string): Promise<number | null>;
}

@injectable()
export class OpenExchangeApi extends BaseAxiosApi implements IExchangeApi {
    constructor(@inject(INVERSIFY_TYPES.IDotenvService) private dotenvService: DotenvService) {
        super();
        this.baseURL = "https://openexchangerates.org";
        this.authorization = this.dotenvService.get("API_KEY");
    }

    async getRate(targetCurrency: string): Promise<number | null> {
        const config: AxiosRequestConfig = {
            method: "get",
            url: `/api/latest.json?&symbols=${targetCurrency}`,
        };
        const res = (await this.request(config)) as AxiosResponse;

        return res.data.rates[targetCurrency];
    }
}
