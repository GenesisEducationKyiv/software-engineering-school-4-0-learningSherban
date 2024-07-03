import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ISubscription } from "../interfaces/subscription.interface";

@Entity({ name: "subscriptions" })
export class Subscription implements ISubscription {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "varchar" })
    email: string;

    @CreateDateColumn({ name: "created_at", type: "timestamp" })
    createdAt: Date;
    @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
    updatedAt: Date;
}
