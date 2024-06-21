import { inject, injectable } from "inversify";
import "reflect-metadata";
import { INVERSIFY_TYPES } from "../../constants/inversify.types";
import { IExchangeApi } from "./api/open-exchange.api";

export enum CurrencyStrategies {
    PRIVAT = "PRIVAT",
    OPENEXCHANGE = "OPENEXCHANGE",
}

export interface IStrategySelector {
    select(strategyName: CurrencyStrategies): ICurrencyStrategy;
}

export interface ICurrencyStrategy {
    getRate(targetCurrency: string): Promise<number | null>;
}

@injectable()
export class StrategySelector implements IStrategySelector {
    constructor(
        @inject(INVERSIFY_TYPES.IPrivatBankStrategy) private privatBankStrategy: ICurrencyStrategy,
        @inject(INVERSIFY_TYPES.IOpenExchangeStrategy) private openExchangeStrategy: ICurrencyStrategy
    ) {}

    select(strategyName: CurrencyStrategies): ICurrencyStrategy {
        console.log("strategyName", strategyName)
        switch (strategyName) {
            case CurrencyStrategies.PRIVAT:
                return this.privatBankStrategy;

            case CurrencyStrategies.OPENEXCHANGE:
            default:
                return this.openExchangeStrategy;
        }
    }
}

@injectable()
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class PrivatBankStrategy implements ICurrencyStrategy {
    constructor(@inject(INVERSIFY_TYPES.IPrivatBankApi) private privatBankApi: IExchangeApi) {}

    async getRate(targetCurrency: string) {
        console.log("PRIV ST")
        return await this.privatBankApi.getRate(targetCurrency);
    }
}

@injectable()
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class OpenExchangeStrategy {
    constructor(@inject(INVERSIFY_TYPES.IOpenExchangeApi) private openExchangeApi: IExchangeApi) {}

    async getRate(targetCurrency: string) {
        console.log("OPEN ST")
        throw new Error('error')
        return await this.openExchangeApi.getRate(targetCurrency);
    }
}
