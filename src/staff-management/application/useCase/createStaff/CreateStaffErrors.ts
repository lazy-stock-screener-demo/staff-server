import { UseCaseError } from "../../../../shared/application/UseCaseError";
import { Result } from "../../../../shared/application/Result";

export namespace CreateStaffErrors {
  export class StaffNameTakenError extends Result<UseCaseError> {
    constructor(staffname: string) {
      super(false, {
        message: `The username ${staffname} was already taken`,
      } as UseCaseError);
    }
  }
  export class EmailAlreadyExistsError extends Result<UseCaseError> {
    constructor(email: string) {
      super(false, {
        message: `The email ${email} associated for this account already exists`,
      } as UseCaseError);
    }
  }  
}
