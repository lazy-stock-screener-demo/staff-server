import { Response } from "express";
import { BaseController } from "../../../../shared/application/BaseController";
import { ApolloController } from "../../../../shared/application/ApolloController";
import { IDecodedRequest } from "../../../infra/http/restfulAPI/IDecodedRequest";
import { RoleViewMap } from "../../mappers/RoleViewMap";
import { ReadRolesBulkUseCase } from "./ReadRolesBulkUseCase";
import { IReadRolesBulkReqDTO, IReadRolesBulkResDTO } from "./ReadRolesBulkDTO";

export class ReadRolesBulkController extends BaseController {
  private useCase: ReadRolesBulkUseCase;

  constructor(useCase: ReadRolesBulkUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: IDecodedRequest, res: Response): Promise<any> {
    const dto: IReadRolesBulkReqDTO = {
      offset: req.query.offset as string,
    };
    try {
      const eitherError = await this.useCase.execute(dto);
      if (eitherError.isError()) {
        const error = eitherError.result;
        switch (error.constructor) {
          default:
            return this.fail(res, error.getErr().message);
        }
      } else {
        const roleView = eitherError.result.getData();
        return this.ok<IReadRolesBulkResDTO>(res, {
          roles: roleView.map((roleDetail) => RoleViewMap.toDTO(roleDetail)),
        });
      }
    } catch (err) {
      return this.fail(res, err);
    }
  }
}

export class ReadRolesBulkControllerApollo extends ApolloController {
  private useCase: ReadRolesBulkUseCase;

  constructor(useCase: ReadRolesBulkUseCase) {
    super();
    this.useCase = useCase;
  }
  async executeImpl(req, res): Promise<any> {
    const dto: IReadRolesBulkReqDTO = {
      offset: req.query.offset as string,
    };
    try {
      const eitherError = await this.useCase.execute(dto);
      if (eitherError.isError()) {
        const error = eitherError.result;
        switch (error.constructor) {
          default:
            return this.apolloError(error.getErr().message);
        }
      } else {
        const roleView = eitherError.result.getData();
        return roleView.map((roleDetail) => RoleViewMap.toDTO(roleDetail));
      }
    } catch (err) {
      return this.apolloError(err);
    }
  }
}
