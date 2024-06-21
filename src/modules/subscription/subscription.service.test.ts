import { INVERSIFY_TYPES } from "../../constants/inversify.types";
import { appDIContainer } from "../../ioc";
import { ISubscriptionRepository, SubscriptionRepository } from "./subscription.repository";
import { instance, mock, reset, when } from "ts-mockito";
import { ISubscriptionService } from "./subscription.service";
import { Subscription } from "./Subscription.model";

describe("Subscription service", () => {
    let mockSubscriptionRepository: ISubscriptionRepository;
    let subscriptionService: ISubscriptionService;

    beforeEach(() => {
        mockSubscriptionRepository = mock<ISubscriptionRepository>(SubscriptionRepository);

        when(mockSubscriptionRepository.create("test@gmail.com")).thenResolve();
        when(mockSubscriptionRepository.getOne({ email: "test@gmail.com" })).thenResolve(Subscription.build({email: "test@gmail.com", id: 1}));

        appDIContainer.rebind(INVERSIFY_TYPES.ISubscriptionRepository).toConstantValue(instance(mockSubscriptionRepository));

        subscriptionService = appDIContainer.get(INVERSIFY_TYPES.ISubscriptionService);
    });

    afterEach(() => {
        reset(mockSubscriptionRepository);
    });

    it("Creating without errors", async () => {
        // await subscriptionService.create({ email: "test@gmail.com" });
        await expect(subscriptionService.create({ email: "test@gmail.com" })).rejects.toEqual("Email already exist");
    });
});
