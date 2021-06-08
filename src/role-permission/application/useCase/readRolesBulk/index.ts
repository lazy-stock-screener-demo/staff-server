import {
  ReadRolesBulkController,
  ReadRolesBulkControllerApollo,
} from "./ReadRolesBulkController";
import { ReadRolesBulkUseCase } from "./ReadRolesBulkUseCase";
import { roleRepo } from "../../../infra/repos";

const readRoleByRoleIDUseCase = new ReadRolesBulkUseCase(roleRepo);
const readRolesBulkController = new ReadRolesBulkController(
  readRoleByRoleIDUseCase
);
const readRolesBulkControllerApollo = new ReadRolesBulkControllerApollo(
  readRoleByRoleIDUseCase
);

export {
  readRolesBulkController,
  readRolesBulkControllerApollo,
  readRoleByRoleIDUseCase,
};
