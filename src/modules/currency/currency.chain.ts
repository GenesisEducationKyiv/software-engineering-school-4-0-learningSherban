import { Injectable } from "@nestjs/common";
import { PrivatBankApi } from "./api/privatbank.api";
import { OpenExchangeApi } from "./api/openexchange.api";
import { IExchangeApi } from "./interfaces/exchange-api.interface";

@Injectable()
export class CurrencyChain {
    private providers: IExchangeApi[];

    constructor(
        private readonly privatbankApi: PrivatBankApi,
        private readonly openexchangeApi: OpenExchangeApi
    ) {
        this.providers = [this.openexchangeApi, this.privatbankApi];
    }

    async getCurrencyData(baseCurrency: string): Promise<number> {
        for (const provider of this.providers) {
            try {
                const data = await provider.getRate(baseCurrency);
                return data;
            } catch (error) {
                console.error(`Provider failed: ${error.message}`);
            }
        }
        throw new Error("All providers failed");
    }
}
