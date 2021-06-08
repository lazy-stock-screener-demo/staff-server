import { StaffRepoSequelize } from "./sequelizeORM/StaffRepoSequelize";
import models from "../../../shared/infra/repos/sequelize/schemas";

const staffRepo = new StaffRepoSequelize(models);

export { staffRepo };
