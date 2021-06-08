import { Response } from "express";
import { BaseController } from "../../../../shared/application/BaseController";
import { IDecodedRequest } from "../../../infra/http/restAPI/IDecodedRequest";
import { TextUtils } from "../../../../shared/application/middleware/TextUtils";
import { CreateStaffReqDTO } from "./CreateStaffDTO";
import { CreateStaffErrors } from "./CreateStaffErrors";
import { CreateStaffUseCase } from "./CreateStaffUseCase";

export class CreateStaffController extends BaseController {
  private useCase: CreateStaffUseCase;

  constructor(useCase: CreateStaffUseCase) {
    super();
    this.useCase = useCase;
  }

  /**
   * @method executeImpl
   * @public async
   * @desc
   */

  public async executeImpl(req: IDecodedRequest, res: Response): Promise<any> {
    const dto: CreateStaffReqDTO = {
      staffName: TextUtils.sanitize(req.body.staffName),
      email: TextUtils.sanitize(req.body.email),
      password: req.body.password,
    };

    try {
      const eitherError = await this.useCase.execute(dto);
      if (eitherError.isError()) {
        const error = eitherError.result;
        switch (error.constructor) {
          case CreateStaffErrors.StaffNameTakenError:
            return this.conflict(res, error.getErr().message);
          case CreateStaffErrors.EmailAlreadyExistsError:
            return this.conflict(res, error.getErr().message);
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
