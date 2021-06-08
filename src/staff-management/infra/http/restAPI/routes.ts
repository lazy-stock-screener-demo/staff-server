import { Router } from "express";
import { createStaffController } from "../../../application/useCase/createStaff";
// import { fetchStaffController } from "../../../application/useCase/fetchStaff";
// import { updateStaffController } from "../../../application/useCase/updateStaff";
// import { deleteStaffController } from "../../../application/useCase/deleteStaff";

const staffRouterBuffer = Router();
const staffRouter = Router();

// staffRouter.get("/staff", (req, res) => fetchStaffController.execute(req, res));

staffRouter.post("/staff", (req, res) =>
  createStaffController.execute(req, res)
);

// staffRouter.put("/staff/:id", (req, res) =>
//   updateStaffController.execute(req, res)
// );

// staffRouter.delete("/staff/:id", (req, res) =>
//   deleteStaffController.execute(req, res)
// );

staffRouterBuffer.use("/staff-mangement", staffRouter);

export { staffRouterBuffer };
