import { UseCaseError } from "../../../../shared/application/UseCaseError";
import { Result } from "../../../../shared/application/Result";

export namespace UpdateRoleByRoleVIDErrors {
  export class RoleNotFoundError extends Result<UseCaseError> {
    constructor(roleID: string) {
      super(false, {
        message: `Couldn't find a role by roleID ${roleID}.`,
      } as UseCaseError);
    }
  }
  export class NewRoleNameUndefinedError extends Result<UseCaseError> {
    constructor(errorValue: string) {
      super(false, {
        message: `Update NewRoleName Error, New Role Name is: ${errorValue}.`,
      } as UseCaseError);
    }
  }
}
