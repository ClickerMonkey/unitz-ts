
import { Functions as fn } from './Functions';
import { BaseInput, RangeInput, RangesInput, RangeDefinition, ValueInput, ValueDefinition, ParseResult } from './Types';
import { Group, GroupFactory } from './Group';
import { Range, RangeList } from './Range';
import { Value } from './Value';
import { Base } from './Base';

/** The class which takes user input and parses it to specific structures. **/
export class Parse
{

  /** The regular expression used to split up a string into multiple ranges. **/
  public static REGEX_LIST: RegExp = /\s*,\s*/;

  /** The regular expression used to split up a range string to determine the min and maximum values. **/
  public static REGEX_RANGE: RegExp = /\s*(-?[^-]+)-(.+)/;

  /** The regular expression used to parse a value number or fraction and possible unit from a string. **/
  public static REGEX_PARSE: RegExp = /^\s*(-?\d*)(\s+(\d+))?(\s*\/\s*(\d+)|\.(\d+)|)\s*(.*)\s*$/i;

  /**
   * Parses user input into a base.
   *
   * @param input The input to parse into a Base.
   */
  public static base(input: BaseInput): Base
  {
    if (input instanceof Base)
    {
      return <Base>input;
    }

    return new Base( <RangesInput>input );
  }

  public static ranges(input: RangesInput, groups: GroupFactory): RangeList
  {
    if (fn.isArray(input))
    {
      return this.rangesFromArray( <RangeInput[]>input, groups );
    }
    else if (fn.isString(input))
    {
      return this.rangesFromString( <string>input, groups );
    }
    else if (fn.isRangeDefinition(input))
    {
      return this.rangesFromArray( [ <RangeDefinition>input ], groups );
    }
    else if (fn.isValueDefinition(input))
    {
      return this.rangesFromArray( [ <ValueDefinition>input ], groups );
    }

    return [];
  }

  public static rangesFromArray(input: RangeInput[], groups: GroupFactory): RangeList
  {
    let ranges = [];

    for (let i = 0; i < input.length; i++)
    {
      let range: Range = this.range( input[ i ], groups );

      ranges.push( range );
    }

    return ranges;
  }

  public static rangesFromString(input: string, groups: GroupFactory): RangeList
  {
    let ranges: string[] = input.split( this.REGEX_LIST );

    return this.rangesFromArray( ranges, groups );
  }

  public static range(input: RangeInput, groups: GroupFactory): Range
  {
    if (fn.isString(input))
    {
      return this.rangeFromString( <string>input, groups );
    }
    else if (fn.isRangeDefinition(input))
    {
      let range: RangeDefinition = <RangeDefinition>input;
      let min: Value = this.value( range.min, groups );
      let max: Value = this.value( range.max, groups );

      return new Range( min, max );
    }

    return Range.INVALID;
  }

  public static rangeFromString(input: string, groups: GroupFactory): Range
  {
    let matches: string[] = this.REGEX_RANGE.exec( input );

    if (!matches)
    {
      let fixed: Value = this.valueFromString(input, groups);

      return new Range(fixed, fixed);
    }

    let minInput: string = matches[1];
    let maxInput: string = matches[2];

    let minParsed: ParseResult = this.input( minInput );
    let maxParsed: ParseResult = this.input( maxInput );

    if (!minParsed || !maxParsed)
    {
      return Range.INVALID;
    }

    let minUnit: string = minParsed.unit || maxParsed.unit;
    let maxUnit: string = maxParsed.unit || minParsed.unit;

    let min: Value = this.valueFromResult(minParsed, minUnit, groups);
    let max: Value = this.valueFromResult(maxParsed, maxUnit, groups);

    return new Range( min, max );
  }

  public static value(input: ValueInput, groups: GroupFactory): Value
  {
    if (fn.isString(input))
    {
      return this.valueFromString( <string>input, groups );
    }
    else if (fn.isValueDefinition(input))
    {
      return this.valueFromValue( <ValueDefinition>input, groups );
    }

    return Value.INVALID;
  }

  public static valueFromValue(input: ValueDefinition, groups: GroupFactory): Value
  {
    let givenValue: number = fn.isDefined( input.value ) ? input.value : 1;
    let num: number = fn.isDefined( input.num ) ? input.num : givenValue;
    let den: number = fn.isDefined( input.den ) ? input.den : 1;
    let parsedValue: number = fn.isDefined( input.value ) ? input.value : num / den;
    let unit: string = input.unit || '';
    let group: Group = groups( unit );

    return new Value( parsedValue, num, den, unit, group );
  }

  public static valueFromString(input: string, groups: GroupFactory): Value
  {
    let parsed: ParseResult = this.input( input );

    return parsed ? this.valueFromResult(parsed, parsed.unit, groups) : Value.INVALID;
  }

  public static valueFromResult(result: ParseResult, unit: string, groups: GroupFactory): Value
  {
    let group: Group = groups( unit );

    return new Value(result.value, result.valueNum, result.valueDen, unit, group);
  }

  /**
   * Possible Values:
   * 1tsp
   * 1 tsp
   * 1/2 tsp
   * 1 1/2 tsp
   * 1 - 2 tsp
   * 1 tsp, 1 cup
   * 2/3 - 1 c, 1 lb, 2.45 cats
   */
  public static input(input: string): ParseResult
  {
    let matches: string[] = this.REGEX_PARSE.exec( input );
    let whole: number = parseInt( matches[1] );
    let hasWhole: boolean = isFinite( whole );
    let sign: number = matches[1].charAt(0) === '-' ? -1 : 1;
    let num: number = parseInt( matches[3] );
    let den: number = parseInt( matches[5] );
    let decimal: string = matches[6];
    let hasDecimal: boolean = isFinite( parseFloat( decimal ) );
    let unit: string = fn.trim( matches[7] );

    if ( !hasWhole && hasDecimal )
    {
      whole = 0;
      hasWhole = true;
    }

    if ( !hasWhole && !unit )
    {
      return null;
    }

    let value: number = 1;
    let valueDen: number = 1;
    let valueNum: number = 1;

    if ( hasWhole )
    {
      value = whole;
      valueNum = whole;

      if ( isFinite( den ) )
      {
        valueDen = den;

        if ( isFinite( num ) )
        {
          value += ( num / den ) * sign;
          valueNum *= den;
          valueNum += num;
        }
        else
        {
          value /= den;
        }
      }
      else if ( hasDecimal )
      {
        let remainder = parseFloat( '0.' + decimal );

        value += remainder * sign;
        valueNum += remainder;
      }

      valueNum *= sign;
    }

    return { value, valueNum, valueDen, num, den, unit };
  }


}
