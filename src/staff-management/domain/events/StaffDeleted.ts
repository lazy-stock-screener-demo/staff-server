import { Staff } from "../Staff";
import { IDomainEvent } from "../../../shared/domain/events/IDomainEvent";
import { UniqueEntityID } from "../../../shared/domain/id/UniqueEntityID";

export class StaffDeleted implements IDomainEvent {
  public dateTimeOccurred: Date;
  public staff: Staff;

  constructor(staff: Staff) {
    this.dateTimeOccurred = new Date();
    this.staff = staff;
  }

  public getAggregateID(): UniqueEntityID {
    return this.staff.id;
  }
}
