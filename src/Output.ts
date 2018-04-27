
import { Value } from './Value';
import { Range, RangeList } from './Range';
import { Functions as fn } from './Functions';


export enum OutputUnit {
  NONE,
  GIVEN,
  SHORT,
  LONG
}

export enum OutputFormat {
  GIVEN,
  NUMBER,
  MIXED,
  FRACTION,
  IMPROPER
}

export interface OutputInput {
  unit?: OutputUnit;
  format?: OutputFormat;
  repeatUnit?: boolean;
  unitSpacer?: string;
  rangeSpacer?: string;
  fractionSpacer?: string;
  mixedSpacer?: string;
  delimiter?: string;
  significant?: number;
}

export class Output implements OutputInput
{

  public unit: OutputUnit = OutputUnit.GIVEN;
  public format: OutputFormat = OutputFormat.GIVEN;
  public repeatUnit: boolean = false;
  public unitSpacer: string = '';
  public rangeSpacer: string = ' - ';
  public fractionSpacer: string = '/';
  public mixedSpacer: string = ' ';
  public delimiter: string = ', ';
  public significant: number = -1;

  public constructor(input?: OutputInput)
  {
    if (fn.isDefined(input))
    {
      this.set( input );
    }
  }

  public set(input: OutputInput): this
  {
    this.unit = fn.coalesce( input.unit, this.unit );
    this.format = fn.coalesce( input.format, this.format );
    this.repeatUnit = fn.coalesce( input.repeatUnit, this.repeatUnit );
    this.unitSpacer = fn.coalesce( input.unitSpacer, this.unitSpacer );
    this.rangeSpacer = fn.coalesce( input.rangeSpacer, this.rangeSpacer );
    this.fractionSpacer = fn.coalesce( input.fractionSpacer, this.fractionSpacer );
    this.mixedSpacer = fn.coalesce( input.mixedSpacer, this.mixedSpacer );
    this.delimiter = fn.coalesce( input.delimiter, this.delimiter );
    this.significant = fn.coalesce( input.significant, this.significant );

    return this;
  }

  public extend(input?: OutputInput): Output
  {
    let extended: Output = this;

    if (fn.isDefined(input))
    {
      if (input instanceof Output)
      {
        extended = input;
      }
      else
      {
        extended = new Output( this );
        extended.set( input );
      }
    }

    return extended;
  }

  public ranges(ranges: RangeList): string
  {
    let out = '';

    for (let i = 0; i < ranges.length; i++)
    {
      let range: Range = ranges[ i ];

      if (range.isValid)
      {
        if (out.length)
        {
          out += this.delimiter;
        }

        out += this.range( range );
      }
    }

    return out;
  }

  public range(range: Range): string
  {
    let out = '';

    if (!range.isValid)
    {
      // nothing
    }
    else if (range.isFixed)
    {
      out += this.value( range.min );
    }
    else
    {
      let minUnit: boolean = this.repeatUnit || range.min.unit !== range.max.unit;

      out += this.value( range.min, minUnit );
      out += this.rangeSpacer;
      out += this.value( range.max );
    }

    return out;
  }

  public value(value: Value, showUnit: boolean = true): string
  {
    let out = '';

    if (!value.isValid)
    {

    }
    else if (this.isFraction( value ))
    {
      if (this.isMixed( value ))
      {
        out += value.mixedWhole;
        out += this.mixedSpacer;
        out += value.mixedNum;
        out += this.fractionSpacer;
        out += value.den;
      }
      else
      {
        out += value.num;
        out += this.fractionSpacer;
        out += value.den;
      }
    }
    else
    {
      out += this.number( value.value );
    }

    if (value.isValid && this.unit !== OutputUnit.NONE && showUnit)
    {
      let group = value.group;

      out += this.unitSpacer;

      if (this.isLongUnit( value ))
      {
        out += fn.isSingular( value.value ) ? group.getSingularLong() : group.getPluralLong();
      }
      else if (this.isShortUnit( value ) || (group && group.dynamic))
      {
        out += fn.isSingular( value.value ) ? group.getSingularShort() : group.getPluralShort();
      }
      else
      {
        out += value.unit;
      }
    }

    return out;
  }

  public number(x: number): string
  {
    let valueString: string = x + '';

    if (this.significant >= 0)
    {
      let valueSignificant: string = x
        .toFixed(this.significant)
        .replace(/0*$/, '')
        .replace(/\.$/, '');

      return valueSignificant.length < valueString.length ? valueSignificant : valueString;
    }

    return valueString;
  }

  public isFraction(value: Value): boolean
  {
    return value.isFraction && this.format !== OutputFormat.NUMBER;
  }

  public isNumber(value: Value): boolean
  {
    return value.isValid && !this.isFraction( value );
  }

  public isMixed(value: Value): boolean
  {
    return value.mixedWhole !== 0 && this.format !== OutputFormat.IMPROPER;
  }

  public isShortUnit(value: Value)
  {
    return value.group && this.unit === OutputUnit.SHORT;
  }

  public isLongUnit(value: Value)
  {
    return value.group && this.unit === OutputUnit.LONG;
  }

}
