import { GetStaffByIDUseCase } from "./GetStaffByIDUseCase";
import { GetStaffByIDController } from "./GetStaffByIDController";
import { authCache } from "../../../../staff-identity/application/services";

const getStaffByIDUseCase = new GetStaffByIDUseCase(authCache);
const getStaffByIDController = new GetStaffByIDController(getStaffByIDUseCase);

export { getStaffByIDUseCase, getStaffByIDController };
