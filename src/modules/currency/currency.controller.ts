import { Body, Controller, Get, UseFilters } from "@nestjs/common";
import { CurrencyService } from "./currency.service";
import { HttpExceptionFilter } from "src/common/helpers/exceptions/exception-filter";


@Controller("/")
export class CurrencyController {
    constructor(private readonly currencyService: CurrencyService) {}

    @Get("/rate")
    async create(): Promise<number> {
        return await this.currencyService.getRate("USD");
    }
}
