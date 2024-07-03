import { Post, Body, Controller, UseFilters, InternalServerErrorException } from "@nestjs/common";
import { SubscriptionService } from "./subscription.service";
import { Subscription } from "./entities/subscription.entity";
import { ICreateSubscriptionDto } from "./interfaces/subscription.interface";
import { HttpExceptionFilter } from "src/common/helpers/exceptions/exception-filter";
@Controller("/")
export class SubscriptionController {
    constructor(private readonly subscriptionService: SubscriptionService) {}

    @Post("/subscribe")
    async create(@Body() inputs: ICreateSubscriptionDto): Promise<Subscription> {
        return await this.subscriptionService.create(inputs);
    }
}
