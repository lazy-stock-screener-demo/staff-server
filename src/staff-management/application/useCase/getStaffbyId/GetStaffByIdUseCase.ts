import { Result } from "../../../../shared/application/Result";
import {
  errorInstance,
  successInstance,
} from "../../../../shared/application/EitherError";
import { IUseCase } from "../../../../shared/application/IUseCase";
import { AppError } from "../../../../shared/application/AppError";
import { EitherError } from "../../../../shared/application/EitherError";
import { IAuthCacheRedis } from "../../../../staff-identity/application/services/redis/AuthService";
import { GetStaffByIDErrors } from "./GetStaffByIDErrors";
import { GetStaffByIDReqDTO } from "./GetStaffByIDDTO";
import { Staff } from "../../../domain/Staff";

type Response = EitherError<
  GetStaffByIDErrors.IDNotFoundError | AppError.UnexpectedError,
  Result<Staff>
>;

export class GetStaffByIDUseCase
  implements IUseCase<GetStaffByIDReqDTO, Promise<Response>> {
  private authCache: IAuthCacheRedis;

  constructor(authCache: IAuthCacheRedis) {
    this.authCache = authCache;
  }
  async execute(reqDTO: GetStaffByIDReqDTO): Promise<Response> {
    let staff: Staff;

    try {
      try {
        staff = await this.authCache.getUserByID(reqDTO.id);
      } catch (err) {
        return errorInstance(new GetStaffByIDErrors.IDNotFoundError(reqDTO.id));
      }
      return successInstance(Result.ok<Staff>(staff));
    } catch (err) {
      return errorInstance(new AppError.UnexpectedError(err));
    }
  }
}
