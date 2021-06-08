import {
  AuthenticationError,
  UserInputError,
  ApolloError,
  ForbiddenError,
} from "apollo-server";

export abstract class ApolloController {
  protected abstract executeImpl(req: any, res: any): Promise<void | any>;

  /**
   * @method execute
   * @public async
   * @desc
   */

  public async execute(req: any, res: any): Promise<void> {
    try {
      return await this.executeImpl(req, res);
    } catch (err) {
      console.log(`[ApolloController]: Uncaught controller error`);
      return err;
    }
  }
  public authenticationError(message?: string) {
    throw new AuthenticationError(message ? message : "Unauthorized");
  }
  public forbiddenError(message?: string) {
    throw new ForbiddenError(message ? message : "Forbidden");
  }
  public clientError(message?: string) {
    throw new UserInputError(message ? message : "InputError");
  }
  public apolloError(error: Error | string) {
    throw new ApolloError(error.toString());
  }
}
