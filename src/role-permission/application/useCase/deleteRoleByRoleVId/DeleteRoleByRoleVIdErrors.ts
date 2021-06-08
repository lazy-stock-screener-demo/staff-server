import { UseCaseError } from "../../../../shared/application/UseCaseError";
import { Result } from "../../../../shared/application/Result";

export namespace DeleteRoleByRoleVIDErrors {
  export class RoleNotFoundError extends Result<UseCaseError> {
    constructor(roleID: string) {
      super(false, {
        message: `Couldn't delete a role with role ID : ${roleID}. Not Existed.`,
      } as UseCaseError);
    }
  }
  // export class NotAllowDeleteDefaultRole extends Result<UseCaseError> {
  //   constructor(roleName: string) {
  //     super(false, {
  //       message: `Couldn't delete a default role: ${roleName}.`,
  //     } as UseCaseError);
  //   }
  // }
}
