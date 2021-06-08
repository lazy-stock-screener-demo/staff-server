import { Request, Response } from "express";

export abstract class BaseController {
  protected abstract executeImpl(
    req: Request,
    res: Response
  ): Promise<void | any>;

  /**
   * @method jsonResponse
   * @static
   * @desc
   */

  public static jsonResponse(res: Response, code: number, message: string) {
    return res.status(code).json({ message });
  }

  /**
   * @method execute
   * @public async
   * @desc
   */

  public async execute(req: Request, res: Response): Promise<void> {
    try {
      await this.executeImpl(req, res);
    } catch (err) {
      console.log(`[BaseController]: Uncaught controller error`, err);
      this.fail(res, "An unexpected error occurred");
    }
  }

  /**
   * @method ok
   * @public
   * @desc
   */

  public ok<T>(res: Response, dto?: T) {
    if (!!dto) {
      res.type("application/json");
      return res.status(200).json(dto);
    } else {
      return res.status(200);
    }
  }

  /**
   * @method created
   * @public
   * @desc
   */

  public created(res: Response) {
    return res.sendStatus(201);
  }

  /**
   * @method clientError
   * @public
   * @desc
   */

  public clientError(res: Response, message?: string) {
    return BaseController.jsonResponse(
      res,
      400,
      message ? message : "Unauthorized"
    );
  }

  /**
   * @method unauthorized
   * @public
   * @desc
   */

  public unauthorized(res: Response, message?: string) {
    return BaseController.jsonResponse(
      res,
      401,
      message ? message : "Unauthorized"
    );
  }

  /**
   * @method paymentRequired
   * @public
   * @desc
   */

  public paymentRequired(res: Response, message?: string) {
    return BaseController.jsonResponse(
      res,
      402,
      message ? message : "Payment required"
    );
  }

  /**
   * @method forbidden
   * @public
   * @desc
   */

  public forbidden(res: Response, message?: string) {
    return BaseController.jsonResponse(
      res,
      403,
      message ? message : "Forbidden"
    );
  }

  /**
   * @method notFound
   * @public
   * @desc
   */

  public notFound(res: Response, message?: string) {
    return BaseController.jsonResponse(
      res,
      404,
      message ? message : "Not found"
    );
  }

  /**
   * @method conflict
   * @public
   * @desc
   */

  public conflict(res: Response, message?: string) {
    return BaseController.jsonResponse(
      res,
      409,
      message ? message : "Conflict"
    );
  }

  /**
   * @method tooMany
   * @public
   * @desc
   */

  public tooMany(res: Response, message?: string) {
    return BaseController.jsonResponse(
      res,
      429,
      message ? message : "Too many requests"
    );
  }

  /**
   * @method fail
   * @public
   * @desc
   */

  public fail(res: Response, error: Error | string) {
    return res.status(500).json({
      message: error.toString(),
    });
  }
}
