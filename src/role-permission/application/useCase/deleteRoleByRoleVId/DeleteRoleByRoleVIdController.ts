import { Response } from "express";
import { BaseController } from "../../../../shared/application/BaseController";
import { IDecodedRequest } from "../../../../staff-management/infra/http/restAPI/IDecodedRequest";
import {
  IDeleteRoleByRoleVIDReqDTO,
  IDeleteRoleByRoleVIDResDTO,
} from "./DeleteRoleByRoleVIDDTO";
import { DeleteRoleByRoleVIDErrors } from "./DeleteRoleByRoleVIDErrors";
import { DeleteRoleByRoleVIDUseCase } from "./DeleteRoleByRoleVIDUseCase";

export class DeleteRoleByRoleVIDController extends BaseController {
  private useCase: DeleteRoleByRoleVIDUseCase;

  constructor(useCase: DeleteRoleByRoleVIDUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: IDecodedRequest, res: Response): Promise<any> {
    const dto: IDeleteRoleByRoleVIDReqDTO = {
      roleVID: req.params.roleVID,
    };
    try {
      const eitherError = await this.useCase.execute(dto);
      if (eitherError.isError()) {
        const error = eitherError.result;
        switch (error.constructor) {
          case DeleteRoleByRoleVIDErrors.RoleNotFoundError:
            return this.notFound(res, error.getErr().message);
          default:
            return this.fail(res, error.getErr().message);
        }
      } else {
        return this.ok(res);
      }
    } catch (err) {
      return this.fail(res, err);
    }
  }
}
