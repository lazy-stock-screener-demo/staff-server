import { expect } from "chai";
import { Result } from "../../../../shared/application/Result";
import { RoleRepoSequelize } from "../../../infra/repos/sequlizeORM/RoleRepoSequelize";
import models from "../../../../shared/infra/repos/sequelize/models";
import { Role } from "../../../domain/Role";
import { RoleName } from "../../../domain/RoleName";
import { RoleSlug } from "../../../domain/RoleSlug";
import { RoleView } from "../../../domain/RoleView";

describe("Integration Test: ", () => {
  // before(async function () {});
  it("Role can be updated.", async () => {
    const roleNameOrError = RoleName.create({ value: "test_update_role" });
    const roleName: RoleName = roleNameOrError.getData();
    const roleSlugOrError = RoleSlug.create({ value: roleName.value });
    const roleSlug: RoleSlug = roleSlugOrError.getData();
    const roleOrError: Result<Role> = Role.create({ roleName, roleSlug });
    let role: Role = roleOrError.getData();

    const roleRepo = new RoleRepoSequelize(models);
    await roleRepo.save(role);

    const newRoleNameOrError = RoleName.create({
      value: "new_test_update_role",
    });
    const newRoleName: RoleName = newRoleNameOrError.getData();

    // Update New RoleName
    role.updateRoleName({ roleName: newRoleName });
    const roleUpdateResult: RoleView = await roleRepo.save(role);

    // Note: difference between extracting value from value object and aggregate root
    // Aggregate Root:
    // const newRoleInRepo: Role = await roleRepo.readRoleByRoleID(role.roleID);
    // expect(newRoleInRepo.roleName).to.equal("new_test_update_role");
    // Value Object:
    // const roleUpdateResult: RoleView = await roleRepo.save(role);
    // expect(roleUpdateResult.roleName.value).to.equal("new_test_update_role");

    expect(roleUpdateResult.roleName.value).to.equal("new_test_update_role");
    await roleRepo.delete(role);
  });
});
