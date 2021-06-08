import { Result } from "../../../../shared/application/Result";
import {
  errorInstance,
  successInstance,
} from "../../../../shared/application/EitherError";
import { IUseCase } from "../../../../shared/application/IUseCase";
import { AppError } from "../../../../shared/application/AppError";
import { EitherError } from "../../../../shared/application/EitherError";
import { IRoleRepo } from "../../../infra/repos/sequlizeORM/RoleRepo";
import { UpdateRoleByRoleVIDErrors } from "./UpdateRoleByRoleVIDErrors";
import { IUpdateRoleByRoleVIDReqDTO } from "./UpdateRoleByRoleVIDDTO";
import { RoleName } from "../../../domain/RoleName";
import { RoleView } from "../../../domain/RoleView";
import { Role } from "../../../domain/Role";

type Response = EitherError<
  UpdateRoleByRoleVIDErrors.RoleNotFoundError | AppError.UnexpectedError,
  Result<RoleView>
>;

export class UpdateRoleByRoleVIDUseCase
  implements IUseCase<IUpdateRoleByRoleVIDReqDTO, Promise<Response>> {
  private roleRepo: IRoleRepo;
  constructor(roleRepo: IRoleRepo) {
    this.roleRepo = roleRepo;
  }
  public async execute(reqDTO: IUpdateRoleByRoleVIDReqDTO): Promise<Response> {
    let role: Role;
    let newRoleName: RoleName;
    try {
      const newRoleNameOrError = RoleName.create({ value: reqDTO.newRoleName });
      if (newRoleNameOrError.isFailure) {
        return errorInstance(
          new UpdateRoleByRoleVIDErrors.NewRoleNameUndefinedError(
            reqDTO.newRoleName
          )
        );
      } else {
        newRoleName = newRoleNameOrError.getData();
      }

      try {
        role = await this.roleRepo.readRoleByRoleVID(reqDTO.roleVID);
      } catch (err) {
        return errorInstance(
          new UpdateRoleByRoleVIDErrors.RoleNotFoundError(reqDTO.roleVID)
        ) as Response;
      }

      role.updateRoleName({ roleName: newRoleName });

      const roleResult: RoleView = await this.roleRepo.save(role);

      return successInstance(Result.ok<RoleView>(roleResult));
    } catch (err) {
      return errorInstance(new AppError.UnexpectedError(err)) as Response;
    }
  }
}
