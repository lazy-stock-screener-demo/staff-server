import { Result } from "../../shared/application/Result";
import { IGuardProps, Guard } from "../../shared/application/Guard";
import { ValueObject } from "../../shared/domain/ValueObject";
import { RoleSlug } from "./RoleSlug";
import { RoleVID } from "./RoleVID";
import { RoleName } from "./RoleName";

interface IRoleViewProps {
  roleVID: RoleVID;
  roleSlug: RoleSlug;
  roleName: RoleName;
  isEnabled: boolean;
}

export class RoleView extends ValueObject<IRoleViewProps> {
  get roleVID(): RoleVID {
    return this.props.roleVID;
  }

  get roleSlug(): RoleSlug {
    return this.props.roleSlug;
  }

  get roleName(): RoleName {
    return this.props.roleName;
  }

  get isEnabled(): boolean {
    return this.props.isEnabled;
  }

  private constructor(props: IRoleViewProps) {
    super(props);
  }

  public static create(props: IRoleViewProps): Result<RoleView> {
    const guardArgs: IGuardProps[] = [
      { argument: props.roleName, argumentName: "roleName" },
      { argument: props.isEnabled, argumentName: "roleIsEnabled" },
    ];

    const guardEitherError = Guard.againstNullOrUndefinedBulk(guardArgs);

    if (!guardEitherError.succeeded) {
      return Result.fail<RoleView>(guardEitherError.message);
    }
    return Result.ok<RoleView>(
      new RoleView({
        ...props,
      })
    );
  }
}
