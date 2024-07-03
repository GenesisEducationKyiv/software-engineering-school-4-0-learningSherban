import { BaseAxiosApi } from "src/common/api/base-axios.api";

export interface IExchangeApi extends BaseAxiosApi {
    getRate(targetCurrency: string): Promise<number | null>;
}
