import { readRoleByRoleVIDController } from "../../../application/useCase/readRoleByRoleVID";
import { readRolesBulkControllerApollo } from "../../../application/useCase/readRolesBulk";

const rolePermissionResolver = {
  Query: {
    role: async (parent, args, { req, res }) =>
      await readRoleByRoleVIDController.execute(req, res),
    roles: async (parent, args, { req, res }) => {
      req.query.offset = args.offset;
      return await readRolesBulkControllerApollo.execute(req, res);
    },
  },
};

export { rolePermissionResolver };
