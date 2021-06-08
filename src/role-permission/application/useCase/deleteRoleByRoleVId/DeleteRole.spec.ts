import { expect } from "chai";
import { Result } from "../../../../shared/application/Result";
import { Role } from "../../../domain/Role";
import { RoleName } from "../../../domain/RoleName";
import { RoleSlug } from "../../../domain/RoleSlug";
import { RoleRepoSequelize } from "../../../infra/repos/sequlizeORM/RoleRepoSequelize";
import models from "../../../../shared/infra/repos/sequelize/models";

describe("Integration Test: ", () => {
  // before(async function () {});
  xit("Role can be Deleted.", async () => {
    const roleNameOrError = RoleName.create({ value: "test_delete_role" });
    const roleName: RoleName = roleNameOrError.getData();
    const roleSlugOrError = RoleSlug.create({ value: roleName.value });
    const roleSlug: RoleSlug = roleSlugOrError.getData();
    const roleOrError: Result<Role> = Role.create({ roleName, roleSlug });
    let role: Role = roleOrError.getData();

    const roleRepo = new RoleRepoSequelize(models);
    await roleRepo.save(role);

    // Delete RoleName
    await roleRepo.delete(role);
    const isRoleExists = await roleRepo.isExistByRoleID(role.roleID);

    // Note: The extracted Role doesn't contain the same UUID with the one that saved.
    expect(isRoleExists).to.false;
  });
});
