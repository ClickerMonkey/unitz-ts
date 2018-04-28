
import { Functions as fn } from './Functions';
import { Transform } from './Transform';
import { Output } from './Output';
import { Group } from './Group';


// TODO perUnit & perGroup (or: rateUnit & rateGroup)

export type ValueMap = { [unit: string]: Value };

export class Value
{

  public static INVALID: Value = new Value(Number.NaN, Number.NaN, 1, '', null);
  public static SEPARATOR_FRACTION: string = '/';
  public static SEPARATOR_MIXED: string = ' ';

  public readonly value: number;
  public readonly num: number;
  public readonly den: number;
  public readonly group: Group;
  public unit: string;

  public constructor(value: number, num: number, den: number, unit: string, group: Group)
  {
    let divisor: number = fn.gcd(num, den);
    this.value = value;
    this.num = num / divisor;
    this.den = den / divisor;
    this.unit = unit;
    this.group = group;
  }

  public get isValid(): boolean
  {
    return isFinite(this.value);
  }

  public get isFraction(): boolean
  {
    return this.den !== 1;
  }

  public get isDecimal(): boolean
  {
    return this.den === 1;
  }

  public get scaled(): number
  {
    return this.group ? this.value * this.group.baseScale : this.value;
  }

  public get classScaled(): number
  {
    return this.group ? this.value * this.group.classScale : this.value;
  }

  public get actual(): number
  {
    return this.num / this.den;
  }

  public get mixedWhole(): number
  {
    return this.den !== 1 ? Math.floor(this.num / this.den) : 0;
  }

  public get mixedNum(): number
  {
    return this.den !== 1 ? this.num % this.den : this.num;
  }

  public get floor(): number
  {
    return Math.floor(this.value);
  }

  public get ceil(): number
  {
    return Math.ceil(this.value);
  }

  public get truncate(): number
  {
    return this.value < 0 ? this.ceil : this.floor;
  }

  public get remainder(): number
  {
    return this.value - this.floor;
  }

  public get error(): number
  {
    return this.actual - this.value;
  }

  public get distance(): number
  {
    return fn.abs(this.error);
  }

  public get asString(): string
  {
    return (this.den === 1) ?
      (this.value + '') :
      (this.mixedWhole !== 0 ?
          (this.mixedWhole + Value.SEPARATOR_MIXED + this.mixedNum + Value.SEPARATOR_FRACTION + this.den) :
          (this.num + Value.SEPARATOR_FRACTION + this.den)
      )
    ;
  }

  public preferred(): Value
  {
    return this.group ? new Value(this.value, this.num, this.den, this.group.preferredUnit, this.group) : this;
  }

  public copy(): Value
  {
    return new Value(this.value, this.num, this.den, this.unit, this.group);
  }

  public zero(): Value
  {
    return new Value(0, 0, 1, this.unit, this.group);
  }

  public truncated(): Value
  {
    return new Value(this.truncate, this.truncate, 1, this.unit, this.group);
  }

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

  public numbered(): Value
  {
    if (this.isFraction)
    {
      return new Value(this.value, this.value, 1, this.unit, this.group);
    }

    return this;
  }

  public convertTo(to: Group): number
  {
    let group: Group = this.group;

    return group ? group.parent.convert( this.value, group, to ) : this.value;
  }

  public convertToValue(group: Group): Value
  {
    return Value.fromNumberForGroup( this.convertTo( group ), group );
  }

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

  public normalize(transform: Transform, forOutput: Output): Value
  {
    let closest: Value;
    let closestString: string;

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
        let convertString: string = forOutput.value( convert );

        if (!closest || convertString.length <= closestString.length)
        {
          closest = convert;
          closestString = convertString;
        }
      }
    });

    return closest || this;
  }

  public add(addend: Value, scale: number = 1): Value
  {
    let num = this.num * addend.den + addend.num * this.den * scale;
    let den = this.den * addend.den;
    let result = this.value + addend.value * scale;

    return new Value(result, num, den, this.unit, this.group);
  }

  public sub(subtrahend: Value, scale: number = 1): Value
  {
    let num = this.num * subtrahend.den - subtrahend.num * this.den * scale;
    let den = this.den * subtrahend.den;
    let result = this.value - subtrahend.value * scale;

    return new Value(result, num, den, this.unit, this.group);
  }

  public mul(scale: number): Value
  {
    return new Value(this.value * scale, this.num * scale, this.den, this.unit, this.group);
  }

  public static fromNumber(value: number, unit: string = '', group: Group = null): Value
  {
    return new Value(value, value, 1, unit, group);
  }

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

  public static fromNumberForGroup(value: number, group: Group): Value
  {
    return this.fromNumberWithDenominators( value, group.denominators, group.preferredUnit, group );
  }

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

  public static fromFraction(num: number, den: number, unit: string = '', group: Group = null): Value
  {
    return new Value(num / den, num, den, unit, group);
  }

}
