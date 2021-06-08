import { Request, Response } from "express";
import { BaseController } from "../../../../shared/application/BaseController";
import { StaffMap } from "../../../../staff-management/application//mappers/StaffMap";
import { GetStaffByIDReqDTO, GetStaffByIDResDTO } from "./GetStaffByIDDTO";
import { GetStaffByIDErrors } from "./GetStaffByIDErrors";
import { GetStaffByIDUseCase } from "./GetStaffByIDUseCase";

export class GetStaffByIDController extends BaseController {
  private useCase: GetStaffByIDUseCase;

  constructor(useCase: GetStaffByIDUseCase) {
    super();
    this.useCase = useCase;
  }
  /**
   * @method executeImpl
   * @public async
   * @desc
   */

  public async executeImpl(req: Request, res: Response): Promise<any> {
    const reqDTO: GetStaffByIDReqDTO = {
      id: req.body.id,
    };
    try {
      const eitherError = await this.useCase.execute(reqDTO);

      if (eitherError.isError()) {
        const error = eitherError.result;
        switch (error.constructor) {
          case GetStaffByIDErrors.IDNotFoundError:
            return this.notFound(res, error.errorValue().message);
          default:
            return this.fail(res, error.errorValue().message);
        }
      } else {
        const staff = eitherError.result.getData();
        return this.ok<GetStaffByIDResDTO>(res, {
          staff: StaffMap.toDTO(staff),
        });
      }
    } catch (err) {
      return this.fail(res, err);
    }
  }
}
