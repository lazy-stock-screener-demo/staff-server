import { Result } from "../../../../shared/application/Result";
import {
  errorInstance,
  successInstance,
} from "../../../../shared/application/EitherError";
import { IUseCase } from "../../../../shared/application/IUseCase";
import { AppError } from "../../../../shared/application/AppError";
import { EitherError } from "../../../../shared/application/EitherError";
import { IRoleRepo } from "../../../infra/repos/sequlizeORM/RoleRepo";
import { CreateRoleErrors } from "./CreateRoleErrors";
import { ICreateRoleReqDTO } from "./CreateRoleDTO";
import { RoleName } from "../../../domain/RoleName";
import { Role } from "../../../domain/Role";
import { RoleView } from "../../../domain/RoleView";
import { RoleSlug } from "../../../domain/RoleSlug";

type Response = EitherError<
  CreateRoleErrors.RoleNameTakenError | AppError.UnexpectedError,
  Result<RoleView>
>;

export class CreateRoleUseCase
  implements IUseCase<ICreateRoleReqDTO, Promise<Response>> {
  private roleRepo: IRoleRepo;

  constructor(roleRepo: IRoleRepo) {
    this.roleRepo = roleRepo;
  }
  public async execute(reqDTO: ICreateRoleReqDTO): Promise<Response> {
    let roleName: RoleName;
    let roleSlug: RoleSlug;
    try {
      const roleNameOrError = RoleName.create({ value: reqDTO.roleName });
      if (roleNameOrError.isFailure) {
        return errorInstance(
          new CreateRoleErrors.RoleNameTakenError(reqDTO.roleName)
        );
      } else {
        roleName = roleNameOrError.getData();
      }
      const roleSlugOrError = RoleSlug.create({ value: roleName.value });
      if (roleNameOrError.isFailure) {
        return errorInstance(
          new CreateRoleErrors.RoleSlugError(reqDTO.roleName)
        );
      } else {
        roleSlug = roleSlugOrError.getData();
      }
      // Check Role has been taken or not?
      const isRoleAlreadyExists = await this.roleRepo.isExistByRoleName(
        roleName
      );
      if (isRoleAlreadyExists) {
        return errorInstance(
          new CreateRoleErrors.RoleNameTakenError(reqDTO.roleName)
        ) as Response;
      }

      // Create Role
      const roleOrError: Result<Role> = Role.create({
        roleName,
        roleSlug,
      });

      // Save Role
      const role: Role = roleOrError.getData();
      const roleResult: RoleView = await this.roleRepo.save(role);

      return successInstance(Result.ok<RoleView>(roleResult));
    } catch (err) {
      return errorInstance(new AppError.UnexpectedError(err)) as Response;
    }
  }
}
