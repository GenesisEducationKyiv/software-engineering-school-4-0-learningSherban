import Model, { ModelAttributes } from "sequelize/types/model";

export type BaseModelClass = { new(): Model }

export interface BaseModel {
  class: typeof Model,
  tableOptions: ModelAttributes;
}