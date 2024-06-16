import { inject, injectable } from "inversify";
import "reflect-metadata";
import { CreateSubscriptionDto } from "./dto/subscription.dto";
import { INVERSIFY_TYPES } from "../../constants/inversify.types";
import { Subscription } from "./Subscription.model";
import { ISubscriptionRepository } from "./subscription.repository";

export interface ISubscriptionService {
    create(bookData: CreateSubscriptionDto): Promise<Subscription | null>;
    getAll(): Promise<Subscription[]>;
}

@injectable()
export class SubscriptionService implements ISubscriptionService {
    constructor(@inject(INVERSIFY_TYPES.ISubscriptionRepository) private subscriptionRepository: ISubscriptionRepository) {}

    public async create({ email }: CreateSubscriptionDto): Promise<Subscription | null> {
        const existingEmail = await this.subscriptionRepository.getOne({ email });

        if (existingEmail) {
            throw new Error("Email already exist");
        }

        return this.subscriptionRepository.create(email);
    }

    public async getAll(): Promise<Subscription[]> {
        return this.subscriptionRepository.getAll();
    }

    public async getOne(email: string) {
        return this.subscriptionRepository.getOne({ email });
    }
}
