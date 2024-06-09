import { DataTypes, Model, Optional } from "sequelize";
import { BaseModel } from "../../common/types/BaseModel.interface";

export interface ISubscriptionAttributes {
    id: number;
    email: string;
}

export interface IEmailInput extends Optional<ISubscriptionAttributes, "id"> {}
export interface IEmailOutput extends Required<ISubscriptionAttributes> {}

export class Subscription extends Model implements ISubscriptionAttributes {
    id!: number;
    email!: string;
}

const tableOptions = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
};

const SubscriptionModel: BaseModel = { class: Subscription, tableOptions }

export default SubscriptionModel;