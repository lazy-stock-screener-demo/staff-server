import { IRoleDTO } from "../../dtos/IRoleDTO";

export interface IUpdateRoleByRoleVIDReqDTO {
  roleVID: string;
  newRoleName: string;
}

export interface IUpdateRoleByRoleVIDResDTO {
  role: IRoleDTO;
}
