import { DeleteRoleByRoleVIDController } from "./DeleteRoleByRoleVIDController";
import { DeleteRoleByRoleVIDUseCase } from "./DeleteRoleByRoleVIDUseCase";
import { roleRepo } from "../../../infra/repos";

const deleteRoleByRoleVIDUseCase = new DeleteRoleByRoleVIDUseCase(roleRepo);
const deleteRoleByRoleVIDController = new DeleteRoleByRoleVIDController(
  deleteRoleByRoleVIDUseCase
);
export { deleteRoleByRoleVIDController, deleteRoleByRoleVIDUseCase };
