import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { googleConfig } from "../../../../../../../../config";
import { loginByGoogleUseCase } from "../../../../../../../auth/application/useCase/loginByGoogle";
import { LoginByGoogleReqDTO } from "../../../../../../../auth/application/useCase/loginByGoogle/LoginByGoogleReqDTO";

export class GoogleOAuth {
  public async authedCallback(
    accessToken: any,
    refreshToken: any,
    profile: any,
    done: any
  ) {
    const reqDTO: LoginByGoogleReqDTO = { id: profile.id };
    const eitherError = await loginByGoogleUseCase.execute(reqDTO);
    if (eitherError.isError()) {
      return done(eitherError.result.errorValue());
    } else {
      return done(null, eitherError.result.getData());
    }
  }
  public useStrategy() {
    return new GoogleStrategy(
      {
        clientID: googleConfig.clientID,
        clientSecret: googleConfig.clientSecret,
        callbackURL: googleConfig.redirectURI,
        proxy: true,
      },
      this.authedCallback
    );
  }
}
