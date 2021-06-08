import { ValueObject } from "../../shared/domain/ValueObject";
import { Result } from "../../shared/application/Result";
import { Guard } from "../../shared/application/Guard";

interface IRoleNameProps {
  value: string;
}

export class RoleName extends ValueObject<IRoleNameProps> {
  public static maxLength: number = 22;
  public static minLength: number = 2;

  get value(): string {
    return this.props.value;
  }

  private constructor(props: IRoleNameProps) {
    super(props);
  }

  public static create(props: IRoleNameProps): Result<RoleName> {
    const roleNameEitherError = Guard.againstNullOrUndefined(
      props.value,
      "role name"
    );
    if (!roleNameEitherError.succeeded) {
      return Result.fail<RoleName>(roleNameEitherError.message);
    }

    const minLengthResult = Guard.againstAtLeast(this.minLength, props.value);
    if (!minLengthResult.succeeded) {
      return Result.fail<RoleName>(minLengthResult.message);
    }

    const maxLengthResult = Guard.againstAtMost(this.maxLength, props.value);
    if (!maxLengthResult.succeeded) {
      return Result.fail<RoleName>(maxLengthResult.message);
    }

    return Result.ok<RoleName>(new RoleName({ ...props }));
  }
}
