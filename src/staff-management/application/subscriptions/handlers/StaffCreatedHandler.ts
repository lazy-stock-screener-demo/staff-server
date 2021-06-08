import { IEventHandler } from "../../../../shared/domain/events/IEventHandler";
import { EventMediator } from "../../../../shared/domain/events/EventMediator";
import { StaffCreated } from "../../../domain/events/StaffCreated";

export class StaffCreatedHandler implements IEventHandler {
  constructor() {
    this.setupSubscriptions();
  }

  public setupSubscriptions(): void {
    EventMediator.register(this.onStaffCreated.bind(this), StaffCreated.name);
  }

  private async onStaffCreated(event: StaffCreated): Promise<void> {}
}
