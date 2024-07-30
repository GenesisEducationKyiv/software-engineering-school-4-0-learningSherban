import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subscription } from './entities/subscription.entity';
import { Repository } from 'typeorm';
import { ICreateSubscriptionDto } from './interfaces/subscription.interface';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(Subscription)
    private readonly subscriptionRepository: Repository<Subscription>,
  ) {}

  async get(id: string): Promise<Subscription | null> {
    return await this.subscriptionRepository.findOneBy({ id });
  }

  async getByEmail(email: string): Promise<Subscription | null> {
    return await this.subscriptionRepository.findOneBy({ email });
  }

  async create(input: ICreateSubscriptionDto): Promise<Subscription> {
    const existingSubscription = await this.getByEmail(input.email);

    if (existingSubscription) {
      throw new ConflictException();
    }

    return await this.subscriptionRepository.save(input);
  }

  async delete(email: string) {
    const existingSubscription = await this.getByEmail(email);

    if (!existingSubscription) {
      throw new ConflictException();
    }

    return await this.subscriptionRepository.delete({ email });
  }

  async getAll(): Promise<Subscription[]> {
    return await this.subscriptionRepository.find();
  }
}
