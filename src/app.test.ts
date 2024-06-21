import { Application } from "express";
import { appDIContainer } from "./ioc";
import { INVERSIFY_TYPES } from "./constants/inversify.types";
import { ILogger, LoggerService } from "./logger/logger.service";
import { DatabaseService, IDatabaseService } from "./db/db.service";
import { mock, instance, when, verify, anything, reset } from "ts-mockito";
import { NotifyRateCrone } from "./crones/cron.processor";
import { CurrencyController, ICurrencyController } from "./modules/currency/currency.controller";
import { ISubscriptionController, SubscriptionController } from "./modules/subscription/subscription.controller";

describe("Application", () => {
    let mockSubscriptionController: ISubscriptionController;
    let mockCurrencyController: ICurrencyController;
    let mockDatabaseService: IDatabaseService;
    let mockNotifyRateCrone: NotifyRateCrone;
    let mockLogger: ILogger;
    let app: Application;

    beforeEach(() => {
        mockSubscriptionController = mock<ISubscriptionController>(SubscriptionController);
        mockCurrencyController = mock<ICurrencyController>(CurrencyController);
        mockDatabaseService = mock<DatabaseService>(DatabaseService);
        mockNotifyRateCrone = mock<NotifyRateCrone>(NotifyRateCrone);
        mockLogger = mock<LoggerService>(LoggerService);


        when(mockDatabaseService.connect()).thenResolve(); // Resolve or reject based on your test case
        when(mockDatabaseService.initModels([expect.anything()])).thenReturn();
        when(mockNotifyRateCrone.create()).thenReturn();
        when(mockSubscriptionController.router).thenReturn(jest.fn() as any);
        when(mockCurrencyController.router).thenReturn(jest.fn() as any);

        appDIContainer.rebind(INVERSIFY_TYPES.ISubscriptionController).toConstantValue(instance(mockSubscriptionController));
        appDIContainer.rebind(INVERSIFY_TYPES.ICurrencyController).toConstantValue(instance(mockCurrencyController));
        appDIContainer.rebind(INVERSIFY_TYPES.IDatabaseService).toConstantValue(instance(mockDatabaseService));
        appDIContainer.rebind(INVERSIFY_TYPES.INotifyRateCrone).toConstantValue(instance(mockNotifyRateCrone));
        appDIContainer.rebind(INVERSIFY_TYPES.ILoggerService).toConstantValue(instance(mockLogger));

        app = appDIContainer.get(INVERSIFY_TYPES.Application);
    });

    afterEach(() => {
        reset(mockSubscriptionController);
        reset(mockCurrencyController);
        reset(mockDatabaseService);
        reset(mockNotifyRateCrone);
        reset(mockLogger);
    });

    it("Start application without errors", async () => {
        await app.init();

        expect(mockDatabaseService.connect).toHaveBeenCalledTimes(1);
        expect(mockDatabaseService.initModels).toHaveBeenCalledWith([expect.anything()]);
        expect(mockNotifyRateCrone.create).toHaveBeenCalledTimes(1);
        expect(mockLogger.log).toHaveBeenCalledWith('Server has been started on port 3000');
    });
});
