import { Response } from "express";
import { BaseController } from "../../../../shared/application/BaseController";
import { IDecodedRequest } from "../../../../staff-management/infra/http/restAPI/IDecodedRequest";
import {
  IUpdateRoleByRoleVIDReqDTO,
  IUpdateRoleByRoleVIDResDTO,
} from "./UpdateRoleByRoleVIDDTO";
import { UpdateRoleByRoleVIDErrors } from "./UpdateRoleByRoleVIDErrors";
import { UpdateRoleByRoleVIDUseCase } from "./UpdateRoleByRoleVIDUseCase";
import { RoleViewMap } from "../../mappers/RoleViewMap";

export class UpdateRoleByRoleVIDController extends BaseController {
  private useCase: UpdateRoleByRoleVIDUseCase;

  constructor(useCase: UpdateRoleByRoleVIDUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: IDecodedRequest, res: Response): Promise<any> {
    const dto: IUpdateRoleByRoleVIDReqDTO = {
      roleVID: req.params.roleVID,
      newRoleName: req.body.data.newRoleName,
    };
    try {
      const eitherError = await this.useCase.execute(dto);
      if (eitherError.isError()) {
        const error = eitherError.result;
        switch (error.constructor) {
          case UpdateRoleByRoleVIDErrors.RoleNotFoundError:
            return this.notFound(res, error.getErr().message);
          case UpdateRoleByRoleVIDErrors.NewRoleNameUndefinedError:
            return this.notFound(res, error.getErr().message);
          default:
            return this.fail(res, error.getErr().message);
        }
      } else {
        const roleView = eitherError.result.getData();
        return this.ok(res, {
          role: RoleViewMap.toDTO(roleView),
        });
      }
    } catch (err) {
      return this.fail(res, err);
    }
  }
}
