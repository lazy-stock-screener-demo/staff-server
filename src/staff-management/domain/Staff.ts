import { AggregateRoot } from "../../shared/domain/AggregateRoot";
import { UniqueEntityID } from "../../shared/domain/id/UniqueEntityID";
import { Guard } from "../../shared/application/Guard";
import { Result } from "../../shared/application/Result";
import { JWTToken, RefreshToken } from "../../staff-identity/domain/jwt";
import { StaffID } from "./StaffID";
import { StaffEmail } from "./StaffEmail";
import { StaffName } from "./StaffName";
import { StaffPassword } from "./StaffPassword";
import { StaffCreated } from "./events/StaffCreated";
import { StaffLoggedIn } from "../../staff-identity/domain/events/StaffLoggedIn";
import { StaffDeleted } from "./events/StaffDeleted";

interface IStaffProps {
  email: StaffEmail;
  username: StaffName;
  password: StaffPassword;
  isEmailVerified?: boolean;
  isAdminStaff?: boolean;
  accessToken?: JWTToken;
  refreshToken?: RefreshToken;
  isDeleted?: boolean;
  lastLogin?: Date;
}

export class Staff extends AggregateRoot<IStaffProps> {
  get userID(): StaffID {
    return StaffID.create(this._id).getData();
  }
  get email(): StaffEmail {
    return this.props.email;
  }

  get username(): StaffName {
    return this.props.username;
  }

  get password(): StaffPassword {
    return this.props.password;
  }

  get isDeleted(): boolean {
    return this.props.isDeleted;
  }

  get isEmailVerified(): boolean {
    return this.props.isEmailVerified;
  }

  get isAdminStaff(): boolean {
    return this.props.isAdminStaff;
  }

  get accessToken(): string {
    return this.props.accessToken;
  }

  get refreshToken(): RefreshToken {
    return this.props.refreshToken;
  }

  private constructor(props: IStaffProps, id?: UniqueEntityID) {
    super(props, id);
  }

  /**
   * @method isLoggedIn
   * @static
   * @desc
   */

  public isLoggedIn(): boolean {
    return !!this.props.accessToken && !!this.props.refreshToken;
  }

  /**
   * @method delete
   * @static
   * @desc
   */

  public delete(): void {
    if (!this.props.isDeleted) {
      this.addDomainEvent(new StaffDeleted(this));
      this.props.isDeleted = true;
    }
  }

  /**
   * @method setAccessToken
   * @static
   * @desc
   */

  public setAccessToken(token: JWTToken, refreshToken: RefreshToken): void {
    this.addDomainEvent(new StaffLoggedIn(this));
    this.props.accessToken = token;
    this.props.refreshToken = refreshToken;
    this.props.lastLogin = new Date();
  }

  /**
   * @method create
   * @static
   * @desc
   */

  public static create(props: IStaffProps, id?: UniqueEntityID): Result<Staff> {
    const guardResult = Guard.againstNullOrUndefinedBulk([
      { argument: props.username, argumentName: "username" },
      { argument: props.email, argumentName: "email" },
    ]);

    if (!guardResult.succeeded) {
      return Result.fail<Staff>(guardResult.message);
    }

    const isNewStaff = !!id === false;
    const staff = new Staff(
      {
        ...props,
        isDeleted: props.isDeleted ? props.isDeleted : false,
        isEmailVerified: props.isEmailVerified ? props.isEmailVerified : false,
        isAdminStaff: props.isAdminStaff ? props.isAdminStaff : false,
      },
      id
    );

    if (isNewStaff) {
      staff.addDomainEvent(new StaffCreated(staff));
    }

    return Result.ok<Staff>(staff);
  }
}
