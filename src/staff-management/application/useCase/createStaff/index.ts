import { CreateStaffUseCase } from "./CreateStaffUseCase";
import { CreateStaffController } from "./CreateStaffController";
import { staffRepo } from "../../../infra/repos";

const createStaffUseCase = new CreateStaffUseCase(staffRepo);
const createStaffController = new CreateStaffController(createStaffUseCase);

export { createStaffUseCase, createStaffController };
