
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
   * Determines if the given range matches this range enough to provide a
   * mathematical operation between the two ranges.
   *
   * @param range The range to test.
   * @return True if the groups of the given range match this range.
   */
  public isMatch(range: Range): boolean
  {
    return this.min.group === range.min.group &&
      this.max.group === range.max.group;
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

  public nonzero(): Range
  {
    let minZero: boolean = this.min.value === 0;
    let maxZero: boolean = this.max.value === 0;

    if (minZero && maxZero)
    {
      return null;
    }

    let min: Value = this.min.copy();
    let max: Value = this.max.copy();

    return new Range( min, max );
  }

  public maxd(): Range
  {
    let fixed: Value = this.max.copy();

    return new Range(fixed, fixed);
  }

  public mind(): Range
  {
    let fixed: Value = this.min.copy();

    return new Range(fixed, fixed);
  }

  public normalize(transform: Transform, forOutput: Output): Range
  {
    let min: Value = this.min.normalize( transform, forOutput );
    let max: Value = this.max.normalize( transform, forOutput );

    return new Range(min, max)
  }

  public add(addend: Range, scale: number = 1): Range
  {
    let min: Value = this.min.add(addend.min, scale);
    let max: Value = this.max.add(addend.max, scale);

    return new Range(min, max);
  }

  public sub(subtrahend: Range, scale: number = 1): Range
  {
    let min: Value = this.min.sub(subtrahend.min, scale);
    let max: Value = this.max.sub(subtrahend.max, scale);

    return new Range(min, max);
  }

  public mul(scale: number): Range
  {
    let min: Value = this.min.mul(scale);
    let max: Value = this.max.mul(scale);

    return new Range(min, max);
  }

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

  public static fromFixed(fixed: Value): Range
  {
    return new Range(fixed, fixed);
  }

}
