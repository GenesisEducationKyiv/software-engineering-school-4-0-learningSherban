import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PostgresDatabaseProviderModule } from "./providers/database/postgres/postgres.module";
import { SubscriptionModule } from "./modules/subscription/subscription.module";
import { CurrencyModule } from "./modules/currency/currency.module";
import { NodemailerProviderModule } from "./providers/mails/nodemailer/nodemailer.module";
import { ScheduleModule } from "@nestjs/schedule";
import { CurrencyRateCronService } from "./jobs/consumer/currency-rate-cron/currency-rate-cron.consumer";
import { ConfigModule } from "@nestjs/config";
import { configurationFactory } from "./config";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configurationFactory] }),
    PostgresDatabaseProviderModule,
    NodemailerProviderModule,
    SubscriptionModule,
    CurrencyModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService, CurrencyRateCronService],
})
export class AppModule {}
