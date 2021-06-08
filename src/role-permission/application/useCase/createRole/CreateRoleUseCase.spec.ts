import { expect } from "chai";
import { Result } from "../../../../shared/application/Result";
import { RoleRepoSequelize } from "../../../infra/repos/sequlizeORM/RoleRepoSequelize";
import models from "../../../../shared/infra/repos/sequelize/models";
import { Role } from "../../../domain/Role";
import { RoleName } from "../../../domain/RoleName";
import { RoleSlug } from "../../../domain/RoleSlug";
import { RoleVID } from "../../../domain/RoleVID";
import { RoleView } from "../../../domain/RoleView";

let role: Role;
const roleRepo = new RoleRepoSequelize(models);

describe("Integration Test: ", async () => {
  // before(async function () {});
  xit("Role can be created.", async () => {
    const roleNameOrError = RoleName.create({ value: "test_create_role" });
    const roleName: RoleName = roleNameOrError.getData();
    const roleSlugOrError = RoleSlug.create({ value: roleName.value });
    const roleSlug: RoleSlug = roleSlugOrError.getData();
    const roleOrError: Result<Role> = Role.create({ roleName, roleSlug });
    role = roleOrError.getData();

    const roleInRepo: RoleView = await roleRepo.save(role);
    // 20210101 change definition of return valeu from save
    // const roleInRepo: Role = await roleRepo.readRoleByRoleID(role.roleID);
    expect(roleInRepo.roleName.value).to.equal("test_create_role");
  });
  xit("Created Role can be viewed by RoleView.", async () => {
    const roleVIDOrError = RoleVID.create({ value: role.roleID.id.toString() });
    const roleVID: RoleVID = roleVIDOrError.getData();
    const roleVIDInRepo: RoleView = await roleRepo.readRoleViewByRoleVID(
      roleVID.value
    );
    expect(role.roleID.id.toString().replace(/-/g, "")).to.contain(
      roleVIDInRepo.roleVID.value
    );
  });
  after(async () => {
    // await roleRepo.delete(role);
  });
});
