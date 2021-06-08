import { Result } from "../../../../shared/application/Result";
import {
  errorInstance,
  successInstance,
} from "../../../../shared/application/EitherError";
import { IUseCase } from "../../../../shared/application/IUseCase";
import { AppError } from "../../../../shared/application/AppError";
import { EitherError } from "../../../../shared/application/EitherError";
import { RoleView } from "../../../domain/RoleView";
import { IReadRolesBulkReqDTO } from "./ReadRolesBulkDTO";
import { IRoleRepo } from "../../../infra/repos/sequlizeORM/RoleRepo";

type Response = EitherError<AppError.UnexpectedError, Result<RoleView[]>>;

export class ReadRolesBulkUseCase
  implements IUseCase<IReadRolesBulkReqDTO, Promise<Response>> {
  private roleRepo: IRoleRepo;
  constructor(roleRepo: IRoleRepo) {
    this.roleRepo = roleRepo;
  }
  public async execute(reqDTO: IReadRolesBulkReqDTO): Promise<Response> {
    try {
      const roleView: RoleView[] = await this.roleRepo.readRolesBulk(
        reqDTO.offset
      );
      return successInstance(Result.ok<RoleView[]>(roleView));
    } catch (err) {
      return errorInstance(new AppError.UnexpectedError(err));
    }
  }
}
