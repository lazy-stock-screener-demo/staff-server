import { createStaffController } from "../../../application/useCase/createStaff";

const staffResolver = {
  Mutations: {
    createStaff: async (parent, args, { req }) =>
      createStaffController.execute(req, null),
  },
};

export { staffResolver };
