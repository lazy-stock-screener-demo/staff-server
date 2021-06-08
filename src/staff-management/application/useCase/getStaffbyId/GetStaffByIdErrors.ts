import { UseCaseError } from "../../../../shared/application/UseCaseError";
import { Result } from "../../../../shared/application/Result";

export namespace GetStaffByIDErrors {
  export class IDNotFoundError extends Result<UseCaseError> {
    constructor(id: string) {
      super(false, {
        message: `Couldn't find a post by id {${id}}.`,
      } as UseCaseError);
    }
  }
}
