import { UseCaseError } from "../../../../shared/application/UseCaseError";
import { Result } from "../../../../shared/application/Result";

export namespace CreateRoleErrors {
  export class RoleNameTakenError extends Result<UseCaseError> {
    constructor(roleName: string) {
      super(false, {
        message: `Couldn't create a role with role name : ${roleName}.`,
      } as UseCaseError);
    }
  }
  export class RoleSlugError extends Result<UseCaseError> {
    constructor(roleName: string) {
      super(false, {
        message: `Couldn't create a role slug with role name : ${roleName}.`,
      } as UseCaseError);
    }
  }
}
