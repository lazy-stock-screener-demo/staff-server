import { UniqueEntityID } from "../../shared/domain/id/UniqueEntityID";
import { Result } from "../../shared/application/Result";
import { Entity } from "../../shared/domain/Entity";

export class RoleID extends Entity<any> {
  get id(): UniqueEntityID {
    return this._id;
  }
  private constructor(id?: UniqueEntityID) {
    super(null, id);
  }

  public static create(id?: UniqueEntityID): Result<RoleID> {
    return Result.ok<RoleID>(new RoleID(id));
  }
}
