type EitherError<Error, Success> =
  | ErrorClass<Error, Success>
  | SuccessClass<Error, Success>;

class ErrorClass<Error, Success> {
  readonly result: Error;

  constructor(result: Error) {
    this.result = result;
  }

  /**
   * @method isError
   * @public
   * @desc
   */

  public isError(): this is ErrorClass<Error, Success> {
    return true;
  }

  /**
   * @method isSuccess
   * @public
   * @desc
   */

  public isSuccess(): this is SuccessClass<Error, Success> {
    return false;
  }
}

class SuccessClass<Error, Success> {
  readonly result: Success;

  constructor(result: Success) {
    this.result = result;
  }

  /**
   * @method isError
   * @public
   * @desc
   */

  public isError(): this is ErrorClass<Error, Success> {
    return false;
  }

  /**
   * @method isSuccess
   * @public
   * @desc
   */

  public isSuccess(): this is SuccessClass<Error, Success> {
    return true;
  }
}

const errorInstance = <Error, Success>(
  e: Error
): EitherError<Error, Success> => {
  return new ErrorClass(e);
};

const successInstance = <Error, Success>(
  s: Success
): EitherError<Error, Success> => {
  return new SuccessClass<Error, Success>(s);
};

export {
  EitherError,
  ErrorClass,
  SuccessClass,
  errorInstance,
  successInstance,
};
