import { IRoleDTO } from "../../dtos/IRoleDTO";

export interface IReadRolesBulkReqDTO {
  offset?: string;
}

export interface IReadRolesBulkResDTO {
  roles: IRoleDTO[];
}
