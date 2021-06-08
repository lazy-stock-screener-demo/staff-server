import { Result } from "../../shared/application/Result";
import { Entity } from "../../shared/domain/Entity";
import { UniqueEntityID } from "../../shared/domain/id/UniqueEntityID";

export class StaffID extends Entity<any> {
  get id(): UniqueEntityID {
    return this._id;
  }

  private constructor(id?: UniqueEntityID) {
    super(null, id);
  }

  public static create(id?: UniqueEntityID): Result<StaffID> {
    return Result.ok<StaffID>(new StaffID(id));
  }
}
