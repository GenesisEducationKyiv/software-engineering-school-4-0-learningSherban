export interface IMailEventDto {
  eventId: string;
  eventType: string;
  aggregateId: string;
  timestamp: string;
  data: {
    subscriptionId: string;
    subscriptionEmail: string;
    mailText: string;
  };
}
