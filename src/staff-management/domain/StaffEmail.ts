import { Result } from "../../shared/application/Result";
import { ValueObject } from "../../shared/domain/ValueObject";

export interface IStaffEmailProps {
  value: string;
}

export class StaffEmail extends ValueObject<IStaffEmailProps> {
  get value(): string {
    return this.props.value;
  }
  private constructor(props: IStaffEmailProps) {
    super(props);
  }

  /**
   * @method isValidEmail
   * @static
   * @desc
   */
  private static isValidEmail(email: string) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  /**
   * @method format
   * @static
   * @desc
   */

  private static format(email: string): string {
    return email.trim().toLowerCase();
  }

  /**
   * @method create
   * @static
   * @desc
   */

  public static create(props: IStaffEmailProps): Result<StaffEmail> {
    if (!this.isValidEmail(props.value)) {
      return Result.fail<StaffEmail>("Email address is not valid");
    } else {
      return Result.ok<StaffEmail>(
        new StaffEmail({ value: this.format(props.value) })
      );
    }
  }
}
