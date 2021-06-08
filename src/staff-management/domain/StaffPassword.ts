import * as bcrypt from "bcrypt-nodejs";
import { ValueObject } from "../../shared/domain/ValueObject";
import { Guard } from "../../shared/application/Guard";
import { Result } from "../../shared/application/Result";

export interface IStaffPasswordProps {
  value: string;
  hashed?: boolean;
}

export class StaffPassword extends ValueObject<IStaffPasswordProps> {
  public static minLength: number = 6;

  get value(): string {
    return this.props.value;
  }

  private constructor(props: IStaffPasswordProps) {
    super(props);
  }

  /**
   * @method isAppropriateLength
   * @static
   * @desc
   */

  private static isAppropriateLength(password: string): boolean {
    return password.length >= this.minLength;
  }

  /**
   * @method comparePassword
   * @public
   * @desc
   */

  public async comparePassword(plainTextPassword: string): Promise<boolean> {
    let hashed: string;
    if (this.isAlreadyHashed()) {
      hashed = this.props.value;
      return this.bcryptCompare(plainTextPassword, hashed);
    } else {
      return this.props.value === plainTextPassword;
    }
  }

  /**
   * @method bcryptCompare
   * @private
   * @desc
   */

  private bcryptCompare(plainText: string, hashed: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      bcrypt.compare(plainText, hashed, (err, compareResult) => {
        if (err) return resolve(false);
        return resolve(compareResult);
      });
    });
  }

  /**
   * @method isAlreadyHashed
   * @public
   * @desc
   */

  public isAlreadyHashed(): boolean {
    return this.props.hashed;
  }

  /**
   * @method hashPassword
   * @private
   * @desc
   */

  private hashPassword(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, null, null, (err, hash) => {
        if (err) return reject(err);
        resolve(hash);
      });
    });
  }

  /**
   * @method getHashedValue
   * @public
   * @desc
   */

  public getHashedValue(): Promise<string> {
    return new Promise((resolve) => {
      if (this.isAlreadyHashed()) {
        return resolve(this.props.value);
      } else {
        return resolve(this.hashPassword(this.props.value));
      }
    });
  }

  /**
   * @method create
   * @static
   * @desc
   */

  public static create(props: IStaffPasswordProps): Result<StaffPassword> {
    const propsResult = Guard.againstNullOrUndefined(props.value, "password");

    if (!propsResult.succeeded) {
      return Result.fail<StaffPassword>(propsResult.message);
    } else {
      if (!props.hashed) {
        if (!this.isAppropriateLength(props.value)) {
          return Result.fail<StaffPassword>(
            "Password doesnt meet criteria [8 chars min]."
          );
        }
      }

      return Result.ok<StaffPassword>(
        new StaffPassword({
          value: props.value,
          hashed: !!props.hashed === true,
        })
      );
    }
  }
}
