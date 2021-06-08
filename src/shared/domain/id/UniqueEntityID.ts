import { v4 as uuid_v4 } from "uuid";
import { IDentifier } from "./IDentifier";

export class UniqueEntityID extends IDentifier<string | number> {
  constructor(id?: string | number) {
    super(id ? id : uuid_v4());
  }
}
