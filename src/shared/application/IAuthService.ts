import { JWTToken, JWTClaims, RefreshToken } from "../../staff-identity/domain/jwt";
import { Staff } from "../../staff-management/domain/Staff";

export interface IAuthService {
  signJWT(props: JWTClaims): JWTToken;
  decodeJWT(token: string): Promise<JWTClaims>;
  createRefreshToken(): RefreshToken;
  getTokens(staffname: string): Promise<string[]>;
  saveAuthenticatedUser(staff: Staff): Promise<void>;
  deAuthenticateUser(username: string): Promise<void>;
  refreshTokenExists(refreshToken: RefreshToken): Promise<boolean>;
  getStaffNameFromRefreshToken(refreshToken: RefreshToken): Promise<string>;
}
