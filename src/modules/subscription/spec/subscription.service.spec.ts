import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Subscription } from "../entities/subscription.entity";
import { SubscriptionService } from "../subscription.service";
import { randomUUID } from "crypto";
import { ICreateSubscriptionDto } from "../interfaces/subscription.interface";
import { ConflictException } from "@nestjs/common";

describe("SubscriptionService", () => {
    let service: SubscriptionService;

    const mockSubscriptionRepository = {
        save: jest.fn(),
        find: jest.fn(),
        findOneBy: jest.fn(),
        findOne: jest.fn(),
        delete: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                SubscriptionService,
                {
                    provide: getRepositoryToken(Subscription),
                    useValue: mockSubscriptionRepository,
                },
            ],
        }).compile();

        service = module.get<SubscriptionService>(SubscriptionService);
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });

    it("Success create", async () => {
        const createSubscriptionDto = {
            email: "test3@gmail.com",
        } as ICreateSubscriptionDto;

        const subscription = {
            id: randomUUID(),
            email: "test3@gmail.com",
        } as Subscription;

        jest.spyOn(mockSubscriptionRepository, "save").mockReturnValue(subscription);

        const result = await service.create(createSubscriptionDto);

        expect(mockSubscriptionRepository.save).toHaveBeenCalled();
        expect(mockSubscriptionRepository.save).toHaveBeenCalledWith(createSubscriptionDto);
        expect(result).toEqual(subscription);
    });

    it("Error when create", async () => {
        const createSubscriptionDto = {
            email: "test3@gmail.com",
        } as ICreateSubscriptionDto;

        const subscription = {
            id: randomUUID(),
            email: "test3@gmail.com",
        } as Subscription;

        jest.spyOn(mockSubscriptionRepository, "findOneBy").mockReturnValue(subscription);

        try {
            await service.create(createSubscriptionDto);
        } catch (error) {
            expect(mockSubscriptionRepository.findOneBy).toHaveBeenCalledWith(createSubscriptionDto);
            expect(error).toBeInstanceOf(ConflictException);
            expect(error.message).toBe("Conflict");
        }
    });

    it("findAll", () => {});
    it("findOne", () => {});
    it("update", () => {});
    it("remove", () => {});
});
