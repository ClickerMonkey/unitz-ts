
import { Value } from './Value';
import { Range, RangeList } from './Range';
import { isDefined, isSingular } from './Functions';


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
  FRACTION
}

export class Output
{

  public unit: OutputUnit = OutputUnit.GIVEN;
  public format: OutputFormat = OutputFormat.GIVEN;
  public repeatUnit: boolean = false;
  public unitSpacer: string = '';
  public rangeSpacer: string = ' - ';
  public fractionSpacer: string = '/';
  public mixedSpacer: string = ' ';
  public delimiter: string = ', ';
  public significant: number = 2;

  public constructor(options?: object)
  {
    if (isDefined(options))
    {

    }
  }

  public ranges(ranges: RangeList): string
  {
    let out = '';

    for (let i = 0; i < ranges.length; i++)
    {
      if (i > 0)
      {
        out += this.delimiter;
      }

      out += this.range( ranges[ i ] );
    }

    return out;
  }

  public range(range: Range): string
  {
    let out = '';

    if (range.isFixed)
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

    if (this.isFraction( value ))
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
      let valueString: string = value.value + '';

      let valueSignificant: string = value.value
        .toFixed(this.significant)
        .replace(/0*$/, '')
        .replace(/\.$/, '');

      out += valueSignificant.length < valueString.length ? valueSignificant : valueString;
    }

    if (this.unit !== OutputUnit.NONE && showUnit)
    {
      let group = value.group;

      out += this.unitSpacer;

      if (this.isLongUnit( value ))
      {
        out += isSingular( value.value ) ? group.getSingularLong() : group.getPluralLong();
      }
      else if (this.isShortUnit( value ))
      {
        out += isSingular( value.value ) ? group.getSingularShort() : group.getPluralShort();
      }
      else
      {
        out += value.unit;
      }
    }

    return out;
  }

  public isFraction(value: Value): boolean
  {
    return value.isFraction && this.format !== OutputFormat.NUMBER;
  }

  public isMixed(value: Value): boolean
  {
    return value.mixedWhole !== 0 && this.format === OutputFormat.MIXED;
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
