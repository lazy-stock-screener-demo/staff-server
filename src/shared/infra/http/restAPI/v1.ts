import { Router } from "express";
import { staffRouterBuffer } from "../../../../staff-management/infra/http/restAPI/routes";
import { rolePermissionRouterBuffer } from "../../../../role-permission/infra/http/restfulAPI/routes";
import { licenseMangementRouterBuffer } from "../../../../license-management/infra/http/restfulAPI/route";
// import { authRouterContainer } from "../../../../auth/infra/http/restAPI/routes";

const v1Router = Router();

v1Router.use("/v1", staffRouterBuffer);
v1Router.use("/v1", rolePermissionRouterBuffer);
v1Router.use("/v1", licenseMangementRouterBuffer);

export { v1Router };
