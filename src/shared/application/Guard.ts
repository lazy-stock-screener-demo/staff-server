export interface IGuardResult {
  succeeded: boolean;
  message?: string;
}

export interface IGuardProps {
  argument: any;
  argumentName: string;
}

export type IGuardPropsList = IGuardProps[];

export class Guard {
  /**
   * @method combine
   * @static
   * @desc
   */
  public static combine(guardResults: IGuardResult[]): IGuardResult {
    for (let result of guardResults) {
      if (result.succeeded === false) return result;
    }
    return { succeeded: true };
  }

  /**
   * @method greaterThan
   * @static
   * @desc
   */

  public static greaterThan(
    minValue: number,
    actualValue: number
  ): IGuardResult {
    return actualValue > minValue
      ? { succeeded: true }
      : {
          succeeded: false,
          message: `Number given {${actualValue}} is not greater than {${minValue}}`,
        };
  }

  /**
   * @method againstAtLeast
   * @static
   * @desc
   */

  public static againstAtLeast(numChars: number, text: string): IGuardResult {
    return text.length >= numChars
      ? { succeeded: true }
      : {
          succeeded: false,
          message: `Text is not at least ${numChars} chars.`,
        };
  }

  /**
   * @method againstAtMost
   * @static
   * @desc
   */

  public static againstAtMost(numChars: number, text: string): IGuardResult {
    return text.length <= numChars
      ? { succeeded: true }
      : {
          succeeded: false,
          message: `Text is greater than ${numChars} chars.`,
        };
  }

  /**
   * @method againstNullOrUndefined
   * @static
   * @desc
   */

  public static againstNullOrUndefined(
    argument: any,
    argumentName: string
  ): IGuardResult {
    if (argument === null || argument === undefined) {
      return {
        succeeded: false,
        message: `${argumentName} is null or undefined`,
      };
    } else {
      return { succeeded: true };
    }
  }

  /**
   * @method againstNullOrUndefinedBulk
   * @static
   * @desc
   */

  public static againstNullOrUndefinedBulk(
    args: IGuardPropsList
  ): IGuardResult {
    for (let arg of args) {
      const result = this.againstNullOrUndefined(
        arg.argument,
        arg.argumentName
      );
      if (!result.succeeded) return result;
    }

    return { succeeded: true };
  }
}
