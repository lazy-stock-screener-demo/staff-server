import { AggregateRoot } from "../../shared/domain/AggregateRoot";
import { UniqueEntityID } from "../../shared/domain/id/UniqueEntityID";
import { Result } from "../../shared/application/Result";
import { RoleID } from "./RoleID";
import { RoleSlug } from "./RoleSlug";
import { RoleName } from "./RoleName";

interface IRoleProps {
  roleSlug: RoleSlug;
  roleName: RoleName;
  isEnable?: boolean;
}

export class Role extends AggregateRoot<IRoleProps> {
  get roleID(): RoleID {
    return RoleID.create(this._id).getData();
  }

  get roleSlug(): RoleSlug {
    return this.props.roleSlug;
  }

  get roleName(): RoleName {
    return this.props.roleName;
  }

  get isEnable(): boolean {
    return this.props.isEnable;
  }

  public updateRoleName({
    roleName: roleName,
  }: {
    roleName: RoleName;
  }): Result<void> {
    this.props.roleName = roleName;
    return Result.ok<void>();
  }

  public delete(): void {
    if (this.props.isEnable) {
      this.props.isEnable = false;
    }
  }

  private constructor(props: IRoleProps, id?: UniqueEntityID) {
    super(props, id);
  }

  /**
   * @method create
   * @static
   * @desc
   */

  public static create(props: IRoleProps, id?: UniqueEntityID): Result<Role> {
    const role = new Role(
      {
        ...props,
        isEnable: props.isEnable ? props.isEnable : true,
      },
      id
    );

    return Result.ok<Role>(role);
  }
}
