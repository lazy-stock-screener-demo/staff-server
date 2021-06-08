import { Result } from "../../shared/application/Result";
import { ValueObject } from "../../shared/domain/ValueObject";
import { Guard } from "../../shared/application/Guard";

interface IStaffNameProps {
  value: string;
}

export class StaffName extends ValueObject<IStaffNameProps> {
  public static maxLength: number = 15;
  public static minLength: number = 2;

  private constructor(props: IStaffNameProps) {
    super(props);
  }

  get value(): string {
    return this.props.value;
  }

  /**
   * @method create
   * @static
   * @desc
   */

  public static create(props: IStaffNameProps): Result<StaffName> {
    const staffNameResult = Guard.againstNullOrUndefined(
      props.value,
      "username"
    );
    if (!staffNameResult.succeeded) {
      return Result.fail<StaffName>(staffNameResult.message);
    }

    const minLengthResult = Guard.againstAtLeast(this.minLength, props.value);
    if (!minLengthResult.succeeded) {
      return Result.fail<StaffName>(minLengthResult.message);
    }

    const maxLengthResult = Guard.againstAtMost(this.maxLength, props.value);
    if (!maxLengthResult.succeeded) {
      return Result.fail<StaffName>(minLengthResult.message);
    }

    return Result.ok<StaffName>(new StaffName(props));
  }
}
