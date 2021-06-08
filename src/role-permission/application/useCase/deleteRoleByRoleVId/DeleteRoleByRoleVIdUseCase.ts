import { Result } from "../../../../shared/application/Result";
import {
  errorInstance,
  successInstance,
} from "../../../../shared/application/EitherError";
import { IUseCase } from "../../../../shared/application/IUseCase";
import { AppError } from "../../../../shared/application/AppError";
import { EitherError } from "../../../../shared/application/EitherError";
import { IRoleRepo } from "../../../infra/repos/sequlizeORM/RoleRepo";
import { DeleteRoleByRoleVIDErrors } from "./DeleteRoleByRoleVIDErrors";
import { IDeleteRoleByRoleVIDReqDTO } from "./DeleteRoleByRoleVIDDTO";
import { Role } from "../../../domain/Role";

type Response = EitherError<
  DeleteRoleByRoleVIDErrors.RoleNotFoundError | AppError.UnexpectedError,
  Result<void>
>;

export class DeleteRoleByRoleVIDUseCase
  implements IUseCase<IDeleteRoleByRoleVIDReqDTO, Promise<Response>> {
  private roleRepo: IRoleRepo;
  constructor(roleRepo: IRoleRepo) {
    this.roleRepo = roleRepo;
  }
  public async execute(reqDTO: IDeleteRoleByRoleVIDReqDTO): Promise<Response> {
    try {
      let role: Role;

      try {
        role = await this.roleRepo.readRoleByRoleVID(reqDTO.roleVID);
      } catch (err) {
        return errorInstance(
          new DeleteRoleByRoleVIDErrors.RoleNotFoundError(reqDTO.roleVID)
        ) as Response;
      }

      role.delete();

      await this.roleRepo.save(role);
      // await this.roleRepo.delete(reqDTO.roleVID);

      return successInstance(Result.ok<void>());
    } catch (err) {
      return errorInstance(new AppError.UnexpectedError(err)) as Response;
    }
  }
}
