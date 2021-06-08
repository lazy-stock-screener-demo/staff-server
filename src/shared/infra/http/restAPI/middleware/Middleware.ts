import { Request, Response, NextFunction } from "express";
import { IAuthCacheRedis } from "../../../../../auth/infra/cache/redis/AuthCacheRedis";

export class Middleware {
  private authCache: IAuthCacheRedis;
  constructor(authCache: IAuthCacheRedis) {
    this.authCache = authCache;
  }
  public isAuthenticated() {
    return (req: Request, res: Response, next: NextFunction) => {
      if (req.isAuthenticated()) {
        return next();
      } else {
        res.redirect("/login");
      }
    };
  }
  public isAuthorized() {}
}
