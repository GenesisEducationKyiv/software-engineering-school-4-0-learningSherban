import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { CurrencyService } from "src/modules/currency/currency.service";
import { SubscriptionService } from "src/modules/subscription/subscription.service";

@Injectable()
export class CurrencyRateCronService {
    constructor(
        private readonly subscriptionService: SubscriptionService,
        private readonly currencyService: CurrencyService,
        private readonly mailService: MailerService
    ) {}

    @Cron("* * * * * *")
    async handleCron() {
        try {
            const subscriptions = await this.subscriptionService.getAll();
            const usdRate = await this.currencyService.getRate("USD");
            const sendMailPromises = [];
            for (const subscription of subscriptions) {
                console.log(`Send rate ${usdRate} to email: ${subscription.email}`);
                sendMailPromises.push(
                    this.mailService.sendMail({
                        from: "Currency Rate Notifier",
                        to: subscription.email,
                        subject: `USD to UAH rate`,
                        text: `Hello! 1 USD = ${usdRate} UAH`,
                    })
                );
            }

            await Promise.allSettled(sendMailPromises);
            return true;
        } catch (error) {
            throw error;
        }
    }
}
