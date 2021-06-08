import { Request } from "express";
import { JWTClaims } from "../../../../staff-identity/domain/jwt";

export interface IDecodedRequest extends Request {
  decoded: JWTClaims;
}
