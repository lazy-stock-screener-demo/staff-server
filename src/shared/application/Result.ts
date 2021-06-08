export class Result<T> {
  public isSuccess: boolean;
  public isFailure: boolean;
  private errData: T | string;
  private data: T;

  public constructor(isSuccess: boolean, errData?: T | string, data?: T) {
    if (isSuccess && errData) {
      throw new Error(
        "InvalidOperation: A result cannot be successful and contain an error"
      );
    }
    if (!isSuccess && !errData) {
      throw new Error(
        "InvalidOperation: A failing result needs to contain an error message"
      );
    }
    this.isSuccess = isSuccess;
    this.isFailure = !isSuccess;
    this.errData = errData;
    this.data = data;

    Object.freeze(this);
  }

  /**
   * @method getData
   * @public
   * @desc
   */
  public getData(): T {
    if (!this.isSuccess) {
      throw new Error(
        "Can't get the value of an error result. Use 'errorValue' instead."
      );
    }
    return this.data;
  }

  /**
   * @method errErr
   * @public
   * @desc
   */

  public getErr(): T {
    return this.errData as T;
  }

  /**
   * @method ok
   * @static
   * @desc
   */

  public static ok<U>(data?: U): Result<U> {
    return new Result<U>(true, null, data);
  }

  /**
   * @method fail
   * @static
   * @desc
   */

  public static fail<U>(errData: string): Result<U> {
    return new Result<U>(false, errData);
  }

  /**
   * @method combine
   * @static
   * @desc
   */

  public static combine(results: Result<any>[]): Result<any> {
    for (let result of results) {
      if (result.isFailure) return result;
    }
    return Result.ok();
  }
}
