import { UpdateRoleByRoleVIDController } from "./UpdateRoleByRoleVIDController";
import { UpdateRoleByRoleVIDUseCase } from "./UpdateRoleByRoleVIDUseCase";
import { roleRepo } from "../../../infra/repos";

const updateRoleByRoleVIDUseCase = new UpdateRoleByRoleVIDUseCase(roleRepo);
const updateRoleByRoleVIDController = new UpdateRoleByRoleVIDController(
  updateRoleByRoleVIDUseCase
);

export { updateRoleByRoleVIDUseCase, updateRoleByRoleVIDController };
