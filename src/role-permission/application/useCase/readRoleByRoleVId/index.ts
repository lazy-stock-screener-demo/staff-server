import { ReadRoleByRoleVIDController } from "./ReadRoleByRoleVIDController";
import { ReadRoleByRoleVIDUseCase } from "./ReadRoleByRoleVIDUseCase";
import { roleRepo } from "../../../infra/repos";

const readRoleByRoleVIDUseCase = new ReadRoleByRoleVIDUseCase(roleRepo);
const readRoleByRoleVIDController = new ReadRoleByRoleVIDController(
  readRoleByRoleVIDUseCase
);
export { readRoleByRoleVIDController, readRoleByRoleVIDUseCase };
