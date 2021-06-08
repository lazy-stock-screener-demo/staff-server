import { RoleRepoSequelize } from "./sequlizeORM/RoleRepo";
import models from "../../../shared/infra/repos/sequelize/schemas";

const roleRepo = new RoleRepoSequelize(models);

export { roleRepo };
