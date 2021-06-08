import { Result } from "../../../../shared/application/Result";
import {
  errorInstance,
  successInstance,
} from "../../../../shared/application/EitherError";
import { IUseCase } from "../../../../shared/application/IUseCase";
import { AppError } from "../../../../shared/application/AppError";
import { EitherError } from "../../../../shared/application/EitherError";
import { RoleView } from "../../../domain/RoleView";
import { ReadRoleByRoleVIDErrors } from "./ReadRoleByRoleVIDErrors";
import { IReadRoleByRoleVIDReqDTO } from "./ReadRoleByRoleVIDDTO";
import { IRoleRepo } from "../../../infra/repos/sequlizeORM/RoleRepo";
import { RoleID } from "../../../domain/RoleID";

type Response = EitherError<
  ReadRoleByRoleVIDErrors.RoleNotFoundError | AppError.UnexpectedError,
  Result<RoleView>
>;

export class ReadRoleByRoleVIDUseCase
  implements IUseCase<IReadRoleByRoleVIDReqDTO, Promise<Response>> {
  private roleRepo: IRoleRepo;

  constructor(roleRepo: IRoleRepo) {
    this.roleRepo = roleRepo;
  }
  public async execute(reqDTO: IReadRoleByRoleVIDReqDTO): Promise<Response> {
    try {
      let roleView: RoleView;
      try {
        roleView = await this.roleRepo.readRoleViewByRoleVID(reqDTO.roleVID);
      } catch (err) {
        return errorInstance(
          new ReadRoleByRoleVIDErrors.RoleNotFoundError(reqDTO.roleVID)
        ) as Response;
      }
      return successInstance(Result.ok<RoleView>(roleView));
    } catch (err) {
      return errorInstance(new AppError.UnexpectedError(err)) as Response;
    }
  }
}
