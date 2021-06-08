import { Router } from "express";
import { createRoleController } from "../../../application/useCase/createRole";
import { readRoleByRoleVIDController } from "../../../application/useCase/readRoleByRoleVID";
import { updateRoleByRoleVIDController } from "../../../application/useCase/updateRoleByRoleVID";
import { deleteRoleByRoleVIDController } from "../../../application/useCase/deleteRoleByRoleVID";
import { readRolesBulkController } from "../../../application/useCase/readRolesBulk";

const rolePermissionRouterBuffer = Router();
const rolePermissionRouter = Router();

rolePermissionRouter.get("/role/:roleVID", (req, res) =>
  readRoleByRoleVIDController.execute(req, res)
);

rolePermissionRouter.get("/roles", (req, res) =>
  readRolesBulkController.execute(req, res)
);

rolePermissionRouter.post("/role", (req, res) =>
  createRoleController.execute(req, res)
);

rolePermissionRouter.put("/role/:roleVID", (req, res) =>
  updateRoleByRoleVIDController.execute(req, res)
);

rolePermissionRouter.delete("/role/:roleVID", (req, res) =>
  deleteRoleByRoleVIDController.execute(req, res)
);

rolePermissionRouterBuffer.use("/role-permission", rolePermissionRouter);

export { rolePermissionRouterBuffer };
