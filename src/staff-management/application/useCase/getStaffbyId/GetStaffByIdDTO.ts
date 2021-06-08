import { IStaffDTO } from "../../dtos/IStaffDTO";

export interface GetStaffByIDReqDTO {
  id: string;
}

export interface GetStaffByIDResDTO {
  staff: IStaffDTO;
}
