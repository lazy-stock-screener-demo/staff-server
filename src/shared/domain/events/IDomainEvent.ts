import { UniqueEntityID } from "../id/UniqueEntityID";

export interface IDomainEvent {
  dateTimeOccurred: Date;
  getAggregateID(): UniqueEntityID;
}
