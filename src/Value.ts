
import { Functions as fn } from './Functions';
import { Transform } from './Transform';
import { Output, OutputInput } from './Output';
import { Group } from './Group';
import { Core } from './Core';


/**
 * A class which contains a parsed number or fraction.
 */
export class Value
{

  /**
   * A value instance which contains invalid numbers.
   */
  public static INVALID: Value = new Value(Number.NaN, Number.NaN, 1, '', null);

  /**
   * The number parsed or num / den if a fraction was parsed.
   */
  public readonly value: number;

  /**
   * The numerator parsed or calculated if this is a fraction, otherwise this
   * will be equal to [[Value.value]].
   */
  public readonly num: number;

  /**
   * The denominator parsed or calculated if this is a fraction, otherwise this
   * will be equal to 1.
   */
  public readonly den: number;

  /**
   * The group determined based on the unit.
   */
  public readonly group: Group;

  /**
   * The unit parsed or chosen to be output to the user.
   */
  public unit: string;


  /**
   * Creates a new instance of Value given the value, possible numerator and
   * denominator, and the unit and it's group.
   *
   * @param value [[Value.value]]
   * @param num [[Value.num]]
   * @param den [[Value.den]]
   * @param unit [[Value.unit]]
   * @param group [[Value.group]]
   */
  public constructor(value: number, num: number, den: number, unit: string, group: Group)
  {
    let divisor: number = fn.gcd(num, den);
    this.value = value;
    this.num = num / divisor;
    this.den = den / divisor;
    this.unit = unit;
    this.group = group;
  }

  /**
   * Returns true if this value was successfully parsed from some input.
   */
  public get isValid(): boolean
  {
    return isFinite(this.value);
  }

  /**
   * Returns true if this value is a fraction with a numerator and denoninator.
   */
  public get isFraction(): boolean
  {
    return this.den !== 1;
  }

  /**
   * Returns true if this value is a number and not a fraction.
   */
  public get isDecimal(): boolean
  {
    return this.den === 1;
  }

  /**
   * Returns true if this value is zero.
   */
  public get isZero(): boolean
  {
    return fn.isZero( this.value );
  }

  /**
   * Returns true if this value is singular.
   *
   * @see [[Functions.isSingular]]
   */
  public get isSingular(): boolean
  {
    return fn.isSingular( this.value );
  }

  /**
   * Returns the number of this value relative to the base unit.
   */
  public get scaled(): number
  {
    return this.group ? this.value * this.group.baseScale : this.value;
  }

  /**
   * Returns the number of this value relative to the first base unit of it's
   * class.
   */
  public get classScaled(): number
  {
    return this.group ? this.value * this.group.classScale : this.value;
  }

  /**
   * Returns the number which represents the fraction in the value. There may
   * be a difference between this value and the number when the fraction is
   * calculated from the denominators of the group.
   */
  public get calculated(): number
  {
    return this.num / this.den;
  }

  /**
   * Returns the whole number for the mixed fraction of this value. If this
   * value is not a fraction 0 is returned.
   */
  public get mixedWhole(): number
  {
    return this.den !== 1 ? Math.floor(this.num / this.den) : 0;
  }

  /**
   * Returns the numerator for the mixed fraction of this value. If this value
   * is not a fraction then the numerator is returned.
   */
  public get mixedNum(): number
  {
    return this.den !== 1 ? this.num % this.den : this.num;
  }

  /**
   * Returns the floor of the number in this value.
   */
  public get floor(): number
  {
    return Math.floor(this.value);
  }

  /**
   * Returns the ceiling of the number in this value.
   */
  public get ceil(): number
  {
    return Math.ceil(this.value);
  }

  /**
   * Returns the truncated number in this value taking into account it's sign.
   */
  public get truncate(): number
  {
    return this.value < 0 ? this.ceil : this.floor;
  }

  /**
   * Returns the fractional part of the number in this value.
   */
  public get remainder(): number
  {
    return this.value - this.floor;
  }

  /**
   * Returns the signed distance the number of this value is from the fraction
   * numerator and denominator determined. If this value is not a fraction then
   * this should return zero.
   */
  public get error(): number
  {
    return this.calculated - this.value;
  }

  /**
   * Returns the absolute distance the number of this value is from the fraction
   * numerator and denominator determined. If this value is not a fraction then
   * this should return zero.
   */
  public get distance(): number
  {
    return fn.abs(this.error);
  }

  /**
   * Returns a version of this value with the preferred unit.
   *
   * @return A new value or the reference to this instance if it's groupless.
   * @see [[Group.preferredUnit]]
   */
  public preferred(): Value
  {
    return this.group ? new Value(this.value, this.num, this.den, this.group.preferredUnit, this.group) : this;
  }

  /**
   * Returns a copy of this value.
   *
   * @return A new value.
   */
  public copy(): Value
  {
    return new Value(this.value, this.num, this.den, this.unit, this.group);
  }

  /**
   * Returns a value equivalent to zero with the unt and group of this instance.
   *
   * @return A new value.
   */
  public zero(): Value
  {
    return new Value(0, 0, 1, this.unit, this.group);
  }

  /**
   * Returns the truncated version of this value. That's a value where the
   * number is a whole number.
   *
   * @return A new value.
   */
  public truncated(): Value
  {
    return new Value(this.truncate, this.truncate, 1, this.unit, this.group);
  }

  /**
   * Returns a version of this value as a fraction.
   *
   * @return A new value or the reference to this instance if it's a fraction.
   */
  public fractioned(): Value
  {
    if (this.isFraction)
    {
      return this;
    }

    if (this.group)
    {
      return Value.fromNumberWithDenominators(this.value, this.group.denominators, this.unit, this.group);
    }

    return this;
  }

  /**
   * Returns a version of this value as a number.
   *
   * @return A new value or the reference to this instance if it's a number.
   */
  public numbered(): Value
  {
    if (this.isFraction)
    {
      return new Value(this.value, this.value, 1, this.unit, this.group);
    }

    return this;
  }

  /**
   * Converts this value to the given group and returns the result.
   *
   * @param to The group to convert to.
   * @return The converted value or the number of this value if there's no group.
   */
  public convertTo(to: Group): number
  {
    let group: Group = this.group;

    return group ? group.parent.convert( this.value, group, to ) : this.value;
  }

  /**
   * Converts this value to the given group and returns a new value. The new
   * value will attempted to be converted to a fraction.
   *
   * @param group The group to convert to.
   * @return A new value.
   */
  public convertToValue(group: Group): Value
  {
    return Value.fromNumberForGroup( this.convertTo( group ), group );
  }

  /**
   * Determines the available conversions of this value for all groups
   * that are valid for the given transform.
   *
   * @param transform Transform which controls the units and values acceptable.
   * @param reverse Whether to iterate from largest units to smallest units
   *  (`true`), or from smallest to largest (`false`).
   * @param callback The function to invoke for each valid conversion.
   * @param callback.transformed The conversion calculated.
   * @param callback.index The index of the conversion during iteration.
   * @see [[Group.matches]]
   */
  public conversions(transform: Transform, reverse: boolean, callback: (transformed: Value, index: number) => void): void
  {
    if (this.group)
    {
      this.group.matches(transform, reverse, (group, index) =>
      {
        callback( this.convertToValue( group ), index );
      });
    }
  }

  /**
   * Returns a value based on this value with the unit that best represents the
   * value. What is best is typically related to the magnitude of the value.
   * Really small and really large values are harder for people to comprehend so
   * the unit which results in the most normal looking value is determined.
   *
   * @param transform Transform which controls the units and values acceptable.
   * @param forOutput The output that may be used so the most normal looking
   *  value can be determined.
   * @return The most normal value found.
   * @see [[Value.conversions]]
   * @see [[Core.isMoreNormal]]
   */
  public normalize(transform: Transform, forOutput: Output): Value
  {
    let closest: Value;

    this.conversions(transform, false, (convert) =>
    {
      let acceptable: boolean = !forOutput.isNumber( convert );

      if (!acceptable)
      {
        let number: string = forOutput.number( convert.value );

        acceptable = number !== '0';
      }

      if (acceptable)
      {
        if (!closest || Core.isMoreNormal(closest, convert, transform, forOutput))
        {
          closest = convert;
        }
      }
    });

    return closest || this;
  }

  /**
   * Calculates the sum of this value and the given addend scaled by some
   * factor. This is equivalent to `result = this + (addend * scale)`.
   *
   * @param addend The value to add to this.
   * @param scale The factor to scale the addend by before adding it to this.
   * @return A new instance.
   */
  public add(addend: Value, scale: number = 1): Value
  {
    let num = this.num * addend.den + addend.num * this.den * scale;
    let den = this.den * addend.den;
    let result = this.value + addend.value * scale;

    return new Value(result, num, den, this.unit, this.group);
  }

  /**
   * Calculates the difference between this value and the subtrahend scaled by
   * some factor. This is equivalent to `result = this - (subtrahend * scale)`.
   *
   * @param subtrahend The value to subtract from this.
   * @param scale The factor to scale the subtrahend by before subtraction.
   * @return A new instance.
   */
  public sub(subtrahend: Value, scale: number = 1): Value
  {
    let num = this.num * subtrahend.den - subtrahend.num * this.den * scale;
    let den = this.den * subtrahend.den;
    let result = this.value - subtrahend.value * scale;

    return new Value(result, num, den, this.unit, this.group);
  }

  /**
   * Calculates a new value by multiplying this by a given factor. This is
   * equivalent to `result = this * scale`.
   *
   * @param scale The factor to scale this instance by.
   * @return A new instance.
   */
  public scale(scale: number): Value
  {
    return new Value(this.value * scale, this.num * scale, this.den, this.unit, this.group);
  }

  /**
   * Calculates a new value by multiplying this by a given value. This is
   * equivalent to `result = this * scale`.
   *
   * @param scale The value to scale this instance by.
   * @return A new instance.
   */
  public mul(scale: Value): Value
  {
    return new Value(this.value * scale.value, this.num * scale.num, this.den * scale.den, this.unit, this.group);
  }

  /**
   * Converts this value to a string with the given output options taking into
   * account the global options.
   *
   * @param options The options to override the global output options.
   * @return The string representation of this instance.
   * @see [[Output]]
   */
  public output(options?: OutputInput): string
  {
    let output: Output = Core.globalOutput.extend( options );

    return output.value( this );
  }

  /**
   * Returns a Value instance which is a number with the optional unit and group.
   *
   * @param value The number.
   * @param unit The unit, if any, of the number.
   * @param group The group which matches the unit.
   * @return A new instance.
   */
  public static fromNumber(value: number, unit: string = '', group: Group = null): Value
  {
    return new Value(value, value, 1, unit, group);
  }

  /**
   * Returns a Value instance which tries to be a fraction given a range of
   * denominators. If the number is already whole or a fraction close
   * enough to the number cannot be found a value which is a number is returned.
   *
   * @param value The number to try to find a fraction for.
   * @param unit The unit, if any, of the number.
   * @param group The group which matches the unit.
   * @param minDen The starting denominator to inclusively try.
   * @param maxDen The last denominator to inclusively try.
   * @return A new instance.
   */
  public static fromNumberWithRange(value: number, unit: string = '', group: Group = null, minDen: number = 1, maxDen: number = 100): Value
  {
    let closestDenominator: number = 0;
    let closestDistance: number = -1;

    for (let i = minDen; i <= maxDen; i++)
    {
      let den = i;
      let num = Math.floor( den * value );
      let actual = num / den;
      let distance = fn.abs(value - actual);

      if (closestDistance === -1 || distance < closestDistance)
      {
        closestDistance = distance;
        closestDenominator = den;
      }
    }

    if (closestDistance > fn.EPSILON)
    {
      return new Value(value, value, 1, unit, group);
    }

    if (closestDenominator === 0)
    {
      closestDenominator = 1;
    }

    return new Value(value, Math.floor(value * closestDenominator), closestDenominator, unit, group);
  }

  /**
   * Returns a Value instance which tries to be a fraction based on the
   * denominators of the group. If a valid fraction could not be found then the
   * instance returned will be a number value. Since a unit is not passed here,
   * the preferred unit of the group is used as the unit of the value.
   *
   * @param value The number to try to find a fraction for.
   * @param group The group for the unit and also the denominators to try.
   * @return A new instance.
   */
  public static fromNumberForGroup(value: number, group: Group): Value
  {
    return this.fromNumberWithDenominators( value, group.denominators, group.preferredUnit, group );
  }

  /**
   * Returns a Value instance which tries to be a fraction based on the
   * denominators of the group. If a valid fraction could not be found then the
   * instance returned will be a number value.
   *
   * @param value The number to try to find a fraction for.
   * @param denominators The array of denominators to try.
   * @param unit The unit, if any, of the number.
   * @param group The group which matches the unit.
   * @return A new instance.
   */
  public static fromNumberWithDenominators(value: number, denominators: number[], unit: string = '', group: Group = null): Value
  {
    let closestDenominator: number = 0;
    let closestDistance: number = -1;

    for (let i = 0; i < denominators.length; i++)
    {
      let den = denominators[ i ];
      let num = Math.floor( den * value );
      let actual = num / den;
      let distance = fn.abs(value - actual);

      if (closestDistance === -1 || distance < closestDistance)
      {
        closestDistance = distance;
        closestDenominator = den;
      }
    }

    if (closestDistance > fn.EPSILON)
    {
      return new Value(value, value, 1, unit, group);
    }

    if (closestDenominator === 0)
    {
      closestDenominator = 1;
    }

    return new Value(value, Math.floor(value * closestDenominator), closestDenominator, unit, group);
  }

  /**
   * Returns a Value instance for a given fraction specified by a numerator and
   * denominator.
   *
   * @param num The numerator of the fraction.
   * @param den The denominator of the fraction.
   * @param unit The unit, if any, of the fraction.
   * @param group The group which matches the unit.
   * @return A new instance.
   */
  public static fromFraction(num: number, den: number, unit: string = '', group: Group = null): Value
  {
    return new Value(num / den, num, den, unit, group);
  }

}
