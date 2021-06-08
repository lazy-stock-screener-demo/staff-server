import { CreateRoleController } from "./CreateRoleController";
import { CreateRoleUseCase } from "./CreateRoleUseCase";
import { roleRepo } from "../../../infra/repos";

const createRoleUseCase = new CreateRoleUseCase(roleRepo);
const createRoleController = new CreateRoleController(createRoleUseCase);

export { createRoleUseCase, createRoleController };
