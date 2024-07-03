import { Test, TestingModule } from "@nestjs/testing";
import { SubscriptionController } from "../subscription.controller";
import { SubscriptionService } from "../subscription.service";
import { ICreateSubscriptionDto } from "../interfaces/subscription.interface";
import { Subscription } from "../entities/subscription.entity";
import { randomUUID } from "crypto";
import { ConflictException } from "@nestjs/common";

describe("SubscriptionController", () => {
    let controller: SubscriptionController;

    const mockSubscriptionService = {
        create: jest.fn(),
        getByEmail: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [SubscriptionController],
            providers: [
                {
                    provide: SubscriptionService,
                    useValue: mockSubscriptionService,
                },
            ],
        }).compile();

        controller = module.get<SubscriptionController>(SubscriptionController);
    });

    it("Should be defined", () => {
        expect(controller).toBeDefined();
    });

    it("Should create a new user by a given data", async () => {
        const createSubscriptionDto = {
            email: "test3@gmail.com",
        } as ICreateSubscriptionDto;

        const subscription = {
            id: randomUUID(),
            email: "test3@gmail.com",
        } as Subscription;

        jest.spyOn(mockSubscriptionService, "create").mockReturnValue(subscription);

        const result = await controller.create(createSubscriptionDto);

        expect(mockSubscriptionService.create).toHaveBeenCalled();
        expect(mockSubscriptionService.create).toHaveBeenCalledWith(createSubscriptionDto);
        expect(result).toEqual(subscription);
    });

    it("Should return error that user exist", async () => {
        const createSubscriptionDto = {
            email: "test@gmail.com",
        } as ICreateSubscriptionDto;

        const subscription = {
            id: randomUUID(),
            email: "test3@gmail.com",
        } as Subscription;

        jest.spyOn(mockSubscriptionService, "getByEmail").mockResolvedValue(subscription);

        try {
            await controller.create(createSubscriptionDto);
        } catch (error) {
            expect(mockSubscriptionService.getByEmail).toHaveBeenCalledWith("test@gmail.com");
            expect(error).toBeInstanceOf(ConflictException);
            expect(error.message).toBe("Conflict");
        }
    });
});
