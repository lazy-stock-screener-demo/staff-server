import { IRoleDTO } from "../../dtos/IRoleDTO";

export interface ICreateRoleReqDTO {
  roleName: string;
}

export interface ICreateRoleResDTO {
  role: IRoleDTO;
}
