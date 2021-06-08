import { UseCaseError } from "../../../../shared/application/UseCaseError";
import { Result } from "../../../../shared/application/Result";

export namespace ReadRoleByRoleVIDErrors {
  export class RoleNotFoundError extends Result<UseCaseError> {
    constructor(roleName: string) {
      super(false, {
        message: `Couldn't find a role by role view id ${
          roleName ? roleName : "which you didn't provide any."
        }.`,
      } as UseCaseError);
    }
  }
}
