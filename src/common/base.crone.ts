import { ScheduledTask } from "node-cron";

export interface IBaseCrone {
    croneInstance: ScheduledTask;
    process(): Promise<boolean>;
}