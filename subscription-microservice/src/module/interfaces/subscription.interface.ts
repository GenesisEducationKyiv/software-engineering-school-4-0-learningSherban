export interface ISubscription {
  id: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateSubscriptionDto {
  email: string;
}
