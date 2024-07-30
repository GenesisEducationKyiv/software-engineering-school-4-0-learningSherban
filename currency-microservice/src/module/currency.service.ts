import { Injectable } from "@nestjs/common";
import { CurrencyChain } from "./currency.chain";

@Injectable()
export class CurrencyService {
    constructor(private currencyChain: CurrencyChain) {}

    async getRate(baseCurrency: string): Promise<number> {
        return await this.currencyChain.getCurrencyData(baseCurrency);
    }
}
