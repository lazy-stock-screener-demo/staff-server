import { IRoleDTO } from "../../dtos/IRoleDTO";

export interface IReadRoleByRoleVIDReqDTO {
  roleVID: string;
}

export interface IReadRoleByRoleVIDResDTO {
  role: IRoleDTO;
}
