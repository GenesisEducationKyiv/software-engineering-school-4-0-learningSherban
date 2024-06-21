import { inject, injectable } from "inversify";
import "reflect-metadata";
import { INVERSIFY_TYPES } from "../../constants/inversify.types";
import { CurrencyStrategies, IStrategySelector } from "./currency.strategy";

export interface ICurrencyService {
    getRate(): Promise<number | null>;
}

@injectable()
export class CurrencyService implements ICurrencyService {
    constructor(@inject(INVERSIFY_TYPES.ICurrencyStrategy) private currencyStrategy: IStrategySelector) {}

    public async getRate(): Promise<number | null> {
        let strategy = null;
        let rate = null;
        try {
            let strategy = this.currencyStrategy.select(CurrencyStrategies.OPENEXCHANGE);
            rate = await strategy.getRate("UAH");
            if (!rate) {
                strategy = this.currencyStrategy.select(CurrencyStrategies.PRIVAT);
                rate = await strategy.getRate("UAH");
            }
            return rate;
        } catch (error) {
            strategy = this.currencyStrategy.select(CurrencyStrategies.PRIVAT);
            rate = await strategy.getRate("UAH");
            return rate
        }
    }
}
