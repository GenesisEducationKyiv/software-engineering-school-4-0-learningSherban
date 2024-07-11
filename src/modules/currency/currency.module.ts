import { Module } from "@nestjs/common";
import { CurrencyService } from "./currency.service";
import { CurrencyController } from "./currency.controller";
import { OpenExchangeApi } from "./api/openexchange.api";
import { PrivatBankApi } from "./api/privatbank.api";
import { CurrencyChain } from "./currency.chain";
import { HttpModule } from "@nestjs/axios";

@Module({
  imports: [HttpModule],
  controllers: [CurrencyController],
  providers: [CurrencyService, CurrencyChain, PrivatBankApi, OpenExchangeApi],
  exports: [CurrencyService],
})
export class CurrencyModule {}
