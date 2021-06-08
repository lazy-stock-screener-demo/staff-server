import { Response } from "express";
import { BaseController } from "../../../../shared/application/BaseController";
import { IDecodedRequest } from "../../../../staff-management/infra/http/restAPI/IDecodedRequest";
import { ICreateRoleReqDTO, ICreateRoleResDTO } from "./CreateRoleDTO";
import { CreateRoleErrors } from "./CreateRoleErrors";
import { CreateRoleUseCase } from "./CreateRoleUseCase";
import { RoleViewMap } from "../../mappers/RoleViewMap";

export class CreateRoleController extends BaseController {
  private useCase: CreateRoleUseCase;

  constructor(useCase: CreateRoleUseCase) {
    super();
    this.useCase = useCase;
  }
  /**
   * @method executeImpl
   * @public async
   * @desc
   */

  async executeImpl(req: IDecodedRequest, res: Response): Promise<any> {
    const dto: ICreateRoleReqDTO = {
      roleName: req.body.data.roleName,
    };
    try {
      const eitherErr = await this.useCase.execute(dto);
      if (eitherErr.isError()) {
        switch (eitherErr.result.constructor) {
          case CreateRoleErrors.RoleNameTakenError:
            return this.conflict(res, eitherErr.result.getErr().message);
          case CreateRoleErrors.RoleSlugError:
            return this.notFound(res, eitherErr.result.getErr().message);
          default:
            return this.fail(res, eitherErr.result.getErr().message);
        }
      } else {
        const roleView = eitherErr.result.getData();
        return this.ok<ICreateRoleResDTO>(res, {
          role: RoleViewMap.toDTO(roleView),
        });
      }
    } catch (err) {
      return this.fail(res, err);
    }
  }
}
