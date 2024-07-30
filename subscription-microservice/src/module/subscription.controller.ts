import { Controller } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { Subscription } from './entities/subscription.entity';
import { ICreateSubscriptionDto } from './interfaces/subscription.interface';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @MessagePattern({ cmd: 'createSubscription' })
  async createSubscription(
    @Payload() inputs: ICreateSubscriptionDto,
  ): Promise<Subscription> {
    return await this.subscriptionService.create(inputs);
  }

  @MessagePattern({ cmd: 'deleteSubscription' })
  async deleteSubscription(
    @Payload() inputs: ICreateSubscriptionDto,
  ): Promise<Subscription> {
    return await this.subscriptionService.delete(inputs);
  }

  @MessagePattern({ cmd: 'getAllSubscriptions' })
  async getAllSubscriptions(): Promise<Subscription[]> {
    return await this.subscriptionService.getAll();
  }
}
