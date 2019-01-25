
import { GroupDefinition, RangeDefinition, ValueDefinition } from './Types';


/**
 * The class which contains commonly used functions by the library. These
 * functions and variables exist in a class so they may be overridden if
 * desired.
 */
export class Functions
{

  /**
   * The maximum distance a number can be from another to be considered
   * equivalent. This is to compensate for floating point precision issues.
   */
  public static EPSILON: number = 0.00001;

  /**
   * Determines if the given number is zero.
   *
   * @param x The number to test.
   * @return True if the number is zero, otherwise false.
   * @see [[Functions.EPSILON]]
   */
  public static isZero(x: number): boolean
  {
    return this.abs( x ) < this.EPSILON;
  }

  /**
   * Determines if the given number is equal to another.
   *
   * @param a The first number to compare.
   * @param b The second number to compare.
   * @return True if the two numbers are equal.
   * @see [[Functions.EPSILON]]
   */
  public static isEqual(a: number, b: number): boolean
  {
    return this.abs( a - b ) < this.EPSILON;
  }

  /**
   * Determines if the given number is a whole number (integer).
   *
   * @param x The number to test.
   * @return True if the number is whole, otherwise false.
   * @see [[Functions.EPSILON]]
   */
  public static isWhole(x: number): boolean
  {
    return this.abs( Math.floor( x ) - x ) < this.EPSILON;
  }

  /**
   * Determines if the given number is singular. A singular number is 1 or -1.
   *
   * @param x The number to test.
   * @return True if the number is singular, otherwise false.
   * @see [[Functions.EPSILON]]
   */
  public static isSingular(x: any): boolean
  {
    return this.isNumber( x ) && this.abs( this.abs( x ) - 1 ) < this.EPSILON;
  }

  /**
   * Determines if the given number is valid. A valid number is finite and not
   * NaN or Infinity.
   *
   * @param x The number to test.
   * @return True if the input is finite number.
   */
  public static isNumber(x: any): boolean
  {
    return isFinite(x);
  }

  /**
   * Trims the given input if its a string.
   *
   * @param x The string to remove space from the beginning and end.
   * @return A trimmed string.
   */
  public static trim(x: string): string
  {
    return x ? x.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '') : x;
  }

  /**
   * Calculates the greatest common denominator between the two numbers. If
   * either of the numbers are not whole (integers) then 1 is immediately
   * returned.
   *
   * @param a The first number.
   * @param b The second number.
   * @return The greatest common denominator between the two numbers.
   */
  public static gcd(a: number, b: number): number
  {
    if (!this.isWhole(a) || !this.isWhole(b))
    {
      return 1;
    }

    let x: number = a < b ? a : b;
    let y: number = a < b ? b : a;
    x = this.abs(x);
    y = this.abs(y);

    while(y)
    {
      let t = y;
      y = x % y;
      x = t;
    }

    return x;
  }

  /**
   * Determines the absolute value of the given number.
   *
   * @param x The number to return the positive version of.
   * @return The absolute value of x.
   */
  public static abs(x: number): number
  {
    return x < 0 ? -x : x;
  }

  /**
   * Determines the sign of the given number. One of three values will be
   * returned: 1, 0, or -1.
   *
   * @param x The number to determine the sign of.
   * @return The sign of the given number.
   */
  public static sign(x: number): number
  {
    return x < 0 ? -1 : (x > 0 ? 1 : 0);
  }

  /**
   * Appends an element or array of elements to the end of the given array.
   *
   * @param array The array to append values to the end of.
   * @param input The element or array of elements to append to the end.
   * @return The reference to the `array` given.
   */
  public static appendTo<T>(array: T[], input: T | T[]): T[]
  {
    if (input instanceof Array)
    {
      array.push.apply( array, input );
    }
    else if (input)
    {
      array.push( input );
    }

    return array;
  }

  /**
   * Determines whether the given input looks like a [[GroupDefinition]].
   *
   * @param input The variable to inspect.
   * @return True if the variable appears to be a [[GroupDefinition]].
   */
  public static isGroupDefinition(input: any): input is GroupDefinition
  {
    return !!(input && input.system && input.unit && input.denominators && input.units);
  }

  /**
   * Determines whether the given input looks like a [[ValueDefinition]].
   *
   * @param input The variable to inspect.
   * @return True if the variable appears to be a [[ValueDefinition]].
   */
  public static isValueDefinition(input: any): input is ValueDefinition
  {
    return !!(input && (input.value || input.unit || input.num || input.den));
  }

  /**
   * Determines whether the given input looks like a [[RangeDefinition]].
   *
   * @param input The variable to inspect.
   * @return True if the variable appears to be a [[RangeDefinition]].
   */
  public static isRangeDefinition(input: any): input is RangeDefinition
  {
    return !!(input && input.min && input.max);
  }

  /**
   * Determines whether the given input is an array.
   *
   * @param input The variable to test.
   * @return True if the variable is an array, otherwise false.
   */
  public static isArray<T>(input: any): input is Array<T>
  {
    return input instanceof Array;
  }

  /**
   * Determines whether the given input is a string.
   *
   * @param input The variable to test.
   * @return True if the variable is a string, otherwise false.
   */
  public static isString(input: any): input is string
  {
    return typeof(input) === 'string';
  }

  /**
   * Determines whether the given input is defined.
   *
   * @param input The variable to test.
   * @return True if the variable is defined, otherwise false.
   */
  public static isDefined(input: any): boolean
  {
    return typeof(input) !== 'undefined';
  }

  /**
   * Returns the first argument which is defined.
   *
   * @param a The first argument to look at.
   * @param b The second argument to look at.
   * @return The first defined argument.
   * @see [[Functions.isDefined]]
   */
  public static coalesce(a: any, b: any): any
  {
    return this.isDefined( a ) ? a : b;
  }

}
