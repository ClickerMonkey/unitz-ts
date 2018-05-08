
import { Functions as fn } from './Functions';
import { Value } from './Value';
import { Transform } from './Transform';
import { Output, OutputInput } from './Output';
import { Core } from './Core';


/**
 * An array of ranges.
 */
export type RangeList = Range[];

/**
 * A function which takes a range and might return a range based on the given.
 */
export type RangeMutator = (range: Range) => Range;


/**
 * A pair of minimum and maximum values. A range can be fixed which means the
 * minimum and maximum are equivalent - in which case the range behaves like
 * a [[Value]].
 */
export class Range
{

  /**
   * A range instance which contains invalid values.
   */
  public static INVALID: Range = new Range( Value.INVALID, Value.INVALID );


  /**
   * The minimum value in the range.
   */
  public readonly min: Value;

  /**
   * The maximum value in the range.
   */
  public readonly max: Value;


  /**
   * Creates a new instance of Range given the minimum and maximum values.
   *
   * @param min The minimum value for the range.
   * @param max The maximum value for the range.
   */
  public constructor(min: Value, max: Value)
  {
    this.min = min.value < max.value ? min : max;
    this.max = max.value > min.value ? max : min;
  }

  /**
   * True if the min and max are both valid.
   */
  public get isValid(): boolean
  {
    return this.min.isValid && this.max.isValid;
  }

  /**
   * True if the min or max are a fraction.
   */
  public get isFraction(): boolean
  {
    return this.min.isFraction || this.max.isFraction;
  }

  /**
   * True if the min and max are decimal.
   */
  public get isDecimal(): boolean
  {
    return this.min.isDecimal && this.max.isDecimal;
  }

  /**
   * True if the min and max are not the same value.
   */
  public get isRange(): boolean
  {
    return this.min.value !== this.max.value;
  }

  /**
   * True if the min and max are the same value.
   */
  public get isFixed(): boolean
  {
    return this.min.value === this.max.value;
  }

  /**
   * True if the min and max are both equal to zero.
   */
  public get isZero(): boolean
  {
    return this.min.isZero && this.max.isZero;
  }

  /**
   * True if the min and max are both singular (1 or -1).
   */
  public get isSingular(): boolean
  {
    return this.min.isSingular && this.max.isSingular;
  }

  /**
   * True if one of min and max are rates.
   */
  public get isRate(): boolean
  {
    return this.min.isRate && this.max.isRate;
  }

  /**
   * The average number between the min and max.
   */
  public get average(): number
  {
    return (this.min.value + this.max.value) * 0.5;
  }

  /**
   * The minimum value of this range.
   */
  public get value(): number
  {
    return this.min.value;
  }

  /**
   * The minimum value of this range.
   */
  public get minimum(): number
  {
    return this.min.value;
  }

  /**
   * The maximum value of this range.
   */
  public get maximum(): number
  {
    return this.max.value;
  }

  /**
   * The unit which identifies the group of the minimum value or `null` if the
   * minimum value does not have a group.
   */
  public get unit(): string
  {
    return this.min.group ? this.min.group.unit : null;
  }

  /**
   * Determines if the given range matches this range enough to allow a
   * simple mathematical operation between the two ranges.
   *
   * @param range The range to test.
   * @return True if the groups of the given range match this range.
   */
  public isExactMatch(range: Range): boolean
  {
    return this.min.group === range.min.group &&
      this.max.group === range.max.group &&
      this.min.rateGroup === range.min.rateGroup &&
      this.max.rateGroup === range.max.rateGroup;
  }

  /**
   * Determines if the given range matches this range enough to allow a
   * complex mathematical operation between the two ranges.
   *
   * @param min The minimum of the range to test.
   * @param max The maximum of the range to test.
   * @return True if the min and max have compatible values.
   */
  public isMatch(min: Value, max: Value): boolean
  {
    return this.min.isMatch( min ) && this.max.isMatch( max );
  }

  /**
   * @return A range which has the min and max converted to their preferred units.
   * @see [[Value.preferred]]
   */
  public preferred(): Range
  {
    let min: Value = this.min.preferred();
    let max: Value = this.max.preferred();

    return new Range( min, max );
  }

  /**
   * @return A range which has only positive values. If the range is entirely
   *  negative then `null` is returned.
   */
  public positive(): Range
  {
    let minNegative: boolean = this.min.value < 0;
    let maxNegative: boolean = this.max.value < 0;

    if (maxNegative)
    {
      return null;
    }

    let min: Value = minNegative ? this.min.zero() : this.min.copy();
    let max: Value = this.max.copy();

    return new Range( min, max );
  }

  /**
   * @return A range which has only negative values. If the range is entirely
   *  positive then `null` is returned.
   */
  public negative(): Range
  {
    let minPositive: boolean = this.min.value >= 0;
    let maxPositive: boolean = this.max.value >= 0;

    if (minPositive)
    {
      return null;
    }

    let min: Value = this.min.copy();
    let max: Value = maxPositive ? this.max.zero() : this.max.copy();

    return new Range( min, max );
  }

  /**
   * @return A range which has a non-zero min and max. If both are equial to
   *  zero then `null` is returned.
   */
  public nonzero(): Range
  {
    let minZero: boolean = fn.isZero( this.min.value );
    let maxZero: boolean = fn.isZero( this.max.value );

    if (minZero && maxZero)
    {
      return null;
    }

    let min: Value = this.min.copy();
    let max: Value = this.max.copy();

    return new Range( min, max );
  }

  /**
   * @return A range with only the maximum value from this range.
   */
  public maxd(): Range
  {
    let fixed: Value = this.max.copy();

    return new Range(fixed, fixed);
  }

  /**
   * @return A range with only the minimum value from this range.
   */
  public mind(): Range
  {
    let fixed: Value = this.min.copy();

    return new Range(fixed, fixed);
  }

  /**
   * Creates a range with with units that best represent the values. This may
   * cause the minimum and maximum values to have different units.
   *
   * @param transform Options to control which units and values are acceptable.
   * @param forOutput The output options that should be used to determine which
   *  value & unit is best.
   * @return A new range.
   * @see [[Value.normalize]]
   */
  public normalize(transform: Transform, forOutput: Output): Range
  {
    let min: Value = this.min.normalize( transform, forOutput );
    let max: Value = this.max.normalize( transform, forOutput );

    return new Range(min, max)
  }

  /**
   * Adds this range and a given range (optionally scaled by a factor) together.
   *
   * @param addend The range to add to this instance.
   * @param scale The factor to multiply the addend by when added it to this
   *  instance.
   * @return a new range.
   * @see [[Value.add]]
   */
  public add(addend: Range, scale: number = 1): Range
  {
    let min: Value = this.min.add(addend.min, scale);
    let max: Value = this.max.add(addend.max, scale);

    return new Range(min, max);
  }

  /**
   * Subtracts a given range (optionally scaled by a factor) from this range.
   *
   * @param subtrahend The range to remove from this instance.
   * @param scale The factor to multiply the subtrahend by when subtracting it
   *  from this instance.
   * @return A new range.
   * @see [[Value.sub]]
   */
  public sub(subtrahend: Range, scale: number = 1): Range
  {
    let min: Value = this.min.sub(subtrahend.min, scale);
    let max: Value = this.max.sub(subtrahend.max, scale);

    return new Range(min, max);
  }

  /**
   * Multiplies this range by a scalar factor.
   *
   * @param scale The amount to multiply the range by.
   * @return A new range.
   * @see [[Value.scale]]
   */
  public scale(scale: number): Range
  {
    let min: Value = this.min.scale(scale);
    let max: Value = this.max.scale(scale);

    return new Range(min, max);
  }

  /**
   * Multiplies this range by a scale value.
   *
   * @param scale The amount to multiply the range by.
   * @return A new range.
   * @see [[Value.mul]]
   */
  public mul(scale: Value): Range
  {
    let min: Value = this.min.mul(scale);
    let max: Value = this.max.mul(scale);

    return new Range(min, max);
  }

  /**
   * Returns a range which is coerced into being represented by fractions if a
   * valid fraction can be determined from the units valid denominators.
   *
   * @return A new range if the minimum and maximum are not fractions, otherwise
   *  the reference to this range is returned.
   * @see [[Value.fractioned]]
   */
  public fractioned(): Range
  {
    if (this.min.isFraction && this.max.isFraction)
    {
      return this;
    }

    let min: Value = this.min.fractioned();
    let max: Value = this.max.fractioned();

    return new Range(min, max);
  }

  /**
   * Returns a range which has any fraction values converted to numbers.
   *
   * @return A new range if the mimimum or maximum are fractions, otherwise the
   *  the reference to this range is returned.
   * @see [[Value.numbered]]
   */
  public numbered(): Range
  {
    if (!this.min.isFraction && !this.max.isFraction)
    {
      return this;
    }

    let min: Value = this.min.numbered();
    let max: Value = this.max.numbered();

    return new Range(min, max);
  }

  /**
   * Converts this range to a string with the given output options taking into
   * account the global options.
   *
   * @param options The options to override the global output options.
   * @return The string representation of this instance.
   * @see [[Output]]
   */
  public output(options?: OutputInput): string
  {
    let output: Output = Core.globalOutput.extend( options );

    return output.range( this );
  }

  /**
   * Creates a fixed range from a given value. A fixed range behaves essentially
   * as a value since the minimum and maximum are equivalent.
   *
   * @param fixed The value to be used as the min and max of the range.
   * @return A new fixed range.
   */
  public static fromFixed(fixed: Value): Range
  {
    return new Range(fixed, fixed);
  }

}
