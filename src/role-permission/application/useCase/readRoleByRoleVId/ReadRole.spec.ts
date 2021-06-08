import { expect } from "chai";
import { Result } from "../../../../shared/application/Result";
import { RoleRepoSequelize } from "../../../infra/repos/sequlizeORM/RoleRepoSequelize";
import models from "../../../../shared/infra/repos/sequelize/models";
import { Role } from "../../../domain/Role";
import { RoleName } from "../../../domain/RoleName";
import { RoleView } from "../../../domain/RoleView";
import { RoleSlug } from "../../../domain/RoleSlug";

describe("Integration Test: ", () => {
  // before(async function () {});
  xit("RoleView can be read by RoleName.", async () => {
    const roleNameOrError = RoleName.create({ value: "test_read_role" });
    const roleName: RoleName = roleNameOrError.getData();
    const roleSlugOrError = RoleSlug.create({ value: roleName.value });
    const roleSlug: RoleSlug = roleSlugOrError.getData();
    const roleOrError: Result<Role> = Role.create({ roleName, roleSlug });
    const role: Role = roleOrError.getData();

    const roleRepo = new RoleRepoSequelize(models);
    await roleRepo.save(role);

    const roleInRepo: RoleView = await roleRepo.readRoleViewByRoleName(
      role.roleName
    );

    expect(roleInRepo.roleName.value).to.equal("test_read_role");
    await roleRepo.delete(role);
  });
  xit("RoleView can be read by RoleVID.", async () => {
    const roleNameOrError = RoleName.create({ value: "test_read_role" });
    const roleName: RoleName = roleNameOrError.getData();
    const roleSlugOrError = RoleSlug.create({ value: roleName.value });
    const roleSlug: RoleSlug = roleSlugOrError.getData();
    const roleOrError: Result<Role> = Role.create({ roleName, roleSlug });
    const role: Role = roleOrError.getData();

    const roleRepo = new RoleRepoSequelize(models);
    await roleRepo.save(role);

    const roleInRepo: RoleView = await roleRepo.readRoleViewByRoleName(
      role.roleName
    );

    expect(roleInRepo.roleName.value).to.equal("test_read_role");
    await roleRepo.delete(role);
  });
});
