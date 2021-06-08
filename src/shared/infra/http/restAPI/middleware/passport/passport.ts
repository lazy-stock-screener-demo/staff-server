import passport from "passport";
import { GoogleOAuth } from "./strategy/GoogleOAuth";
import { GetUserByIDReqDTO } from "../../../../../../auth/application/useCase/getUserbyID/GetUserByIDReqDTO";
import { getUserByIDUseCase } from "../../../../../../auth/application/useCase/getUserbyID";
// import { FacebookAuth } from "./strategy/facebookOAuth";
// import { LocalhostAuth } from "./strategy/localStrategy";

const googleOAuth = new GoogleOAuth();
// const facebookAuth = new FacebookAuth(authCache);
// const localhostAuth = new LocalhostAuth(authCache);

// Set serialze what kind of information into cookie
passport.serializeUser<any, any>((user, done) => {
  done(undefined, user.id);
});

// deserialize user id from cookie or session
passport.deserializeUser(async (id: any, done) => {
  const reqDTO: GetUserByIDReqDTO = { id };
  const eitherError = await getUserByIDUseCase.execute(reqDTO);
  if (eitherError.isError()) {
    return done(eitherError.result.errorValue());
  } else {
    return done(null, eitherError.result.getData());
  }
});

passport.use(googleOAuth.useStrategy());
// passport.use(localhostAuth.useStrategy());
// passport.use(facebookAuth.useStrategy());

export default passport;
