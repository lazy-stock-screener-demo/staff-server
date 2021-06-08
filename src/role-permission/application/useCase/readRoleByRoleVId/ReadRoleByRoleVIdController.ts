import { Request, Response } from "express";
import { JsxSelfClosingElement } from "typescript";
import { BaseController } from "../../../../shared/application/BaseController";
import { IDecodedRequest } from "../../../infra/http/restfulAPI/IDecodedRequest";
import { RoleViewMap } from "../../mappers/RoleViewMap";
import {
  IReadRoleByRoleVIDReqDTO,
  IReadRoleByRoleVIDResDTO,
} from "./ReadRoleByRoleVIDDTO";
import { ReadRoleByRoleVIDErrors } from "./ReadRoleByRoleVIDErrors";
import { ReadRoleByRoleVIDUseCase } from "./ReadRoleByRoleVIDUseCase";

export class ReadRoleByRoleVIDController extends BaseController {
  private useCase: ReadRoleByRoleVIDUseCase;

  constructor(useCase: ReadRoleByRoleVIDUseCase) {
    super();
    this.useCase = useCase;
  }
  /**
   * @method executeImpl
   * @public async
   * @desc
   */

  async executeImpl(req: IDecodedRequest, res: Response): Promise<any> {
    // /role/:roleVID => req.params.roleVID
    // /role?roleVID => req.query.roleVID
    const dto: IReadRoleByRoleVIDReqDTO = {
      roleVID: req.params.roleVID,
    };
    try {
      const eitherError = await this.useCase.execute(dto);
      if (eitherError.isError()) {
        const error = eitherError.result;
        switch (error.constructor) {
          case ReadRoleByRoleVIDErrors.RoleNotFoundError:
            return this.notFound(res, error.getErr().message);
          default:
            return this.fail(res, error.getErr().message);
        }
      } else {
        const roleView = eitherError.result.getData();
        return this.ok<IReadRoleByRoleVIDResDTO>(res, {
          role: RoleViewMap.toDTO(roleView),
        });
      }
    } catch (err) {
      return this.fail(res, err);
    }
  }
}
