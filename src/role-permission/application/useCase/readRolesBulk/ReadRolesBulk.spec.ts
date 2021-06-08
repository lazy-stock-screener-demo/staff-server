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
  xit("Role can be bulk read", async () => {
    const roleNameOrError = RoleName.create({ value: "test_read_role" });
    const roleName: RoleName = roleNameOrError.getData();
    const roleSlugOrError = RoleSlug.create({ value: roleName.value });
    const roleSlug: RoleSlug = roleSlugOrError.getData();
    const roleOrError: Result<Role> = Role.create({ roleName, roleSlug });
    const role: Role = roleOrError.getData();

    const roleRepo = new RoleRepoSequelize(models);

    const roleInRepo: RoleView[] = await roleRepo.readRolesBulk(0);

    expect(roleInRepo.length).to.eql(2);
    await roleRepo.delete(role);
  });
});
