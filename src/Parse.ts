
import { Functions as fn } from './Functions';
import { BaseInput, RangeInput, RangesInput, ValueInput, ValueDefinition, ParseResult } from './Types';
import { Group } from './Group';
import { Core } from './Core';
import { Range, RangeList } from './Range';
import { Value } from './Value';
import { Base } from './Base';
import { Translations } from './Translations';
import { Rate, Rates } from './Rates';


/**
 * The class which takes user input and parses it to specific structures.
 */
export class Parse
{

  /**
   * The regular expression used to split up a string into multiple ranges.
   */
  public static REGEX_LIST: RegExp = /\s*,\s*/;

  /**
   * The regular expression used to split up a range string to determine the min
   * and maximum values.
   */
  public static REGEX_RANGE: RegExp = /\s*(-?[^-]+)-(.+)/;

  /**
   * The regular expression used to parse a value number or fraction and
   * possible unit from a string.
   */
  public static REGEX_PARSE: RegExp = /^\s*(-?\d*)(\s+(\d+))?(\s*\/\s*(\d+)|\.(\d+)|)\s*(.*)\s*$/i;

  /**
   * The regular expression used to split up a unit from a rateUnit.
   */
  public static REGEX_UNIT: RegExp = /\s*(\/|\s+per\s+)\s*/i;

  /**
   * Parses user input into a [[Base]] instance.
   *
   * @param input The input to parse into a Base.
   * @return The instance parsed from the input.
   */
  public static base(input: BaseInput): Base
  {
    if (input instanceof Base)
    {
      return <Base>input;
    }

    return new Base( <RangesInput>input );
  }

  /**
   * Parses user input into a an array of [[Range]]s.
   *
   * @param input The input to parse.
   * @return The instances parsed from the input.
   */
  public static ranges(input: RangesInput): RangeList
  {
    if (fn.isArray<RangeInput>(input))
    {
      return this.rangesFromArray( input );
    }
    else if (fn.isString(input))
    {
      return this.rangesFromString( input );
    }
    else if (fn.isRangeDefinition(input))
    {
      return this.rangesFromArray( [ input ] );
    }
    else if (fn.isValueDefinition(input))
    {
      return this.rangesFromArray( [ input ] );
    }

    return [];
  }

  /**
   * Parses user input into a an array of [[Range]]s.
   *
   * @param input The input to parse.
   * @return The instances parsed from the input.
   */
  public static rangesFromArray(input: RangeInput[]): RangeList
  {
    let ranges = [];

    for (let i = 0; i < input.length; i++)
    {
      let range: Range = this.range( input[ i ] );

      ranges.push( range );
    }

    return ranges;
  }

  /**
   * Parses user input into a an array of [[Range]]s.
   *
   * @param input The input to parse.
   * @return The instances parsed from the input.
   */
  public static rangesFromString(input: string): RangeList
  {
    let ranges: string[] = input.split( this.REGEX_LIST );

    return this.rangesFromArray( ranges );
  }

  /**
   * Parses user input into a [[Range]].
   *
   * @param input The input to parse.
   * @return The instance parsed from the input.
   */
  public static range(input: RangeInput): Range
  {
    if (fn.isString(input))
    {
      return this.rangeFromString( input );
    }
    else if (fn.isRangeDefinition(input))
    {
      let min: Value = this.value( input.min );
      let max: Value = this.value( input.max );

      return new Range( min, max );
    }
    else if (fn.isValueDefinition(input))
    {
      let value = this.valueFromValue( input );

      return new Range( value, value );
    }

    return Range.INVALID;
  }

  /**
   * Parses user input into a [[Range]].
   *
   * @param input The input to parse.
   * @return The instance parsed from the input.
   */
  public static rangeFromString(input: string): Range
  {
    let matches: string[] = this.REGEX_RANGE.exec( input );

    if (!matches)
    {
      let fixed: Value = this.valueFromString(input);

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

    let minRate: string = minParsed.rate || maxParsed.rate;
    let maxRate: string = maxParsed.rate || minParsed.rate;

    let min: Value = this.valueFromResult(minParsed, minUnit, minRate);
    let max: Value = this.valueFromResult(maxParsed, maxUnit, maxRate);

    return new Range( min, max );
  }

  /**
   * Parses user input into a [[Value]].
   *
   * @param input The input to parse.
   * @return The instance parsed from the input.
   */
  public static value(input: ValueInput): Value
  {
    if (fn.isString(input))
    {
      return this.valueFromString( input );
    }
    else if (fn.isValueDefinition(input))
    {
      return this.valueFromValue( input );
    }

    return Value.INVALID;
  }

  /**
   * Parses user input into a [[Value]].
   *
   * @param input The input to parse.
   * @return The instance parsed from the input.
   */
  public static valueFromValue(input: ValueDefinition): Value
  {
    let givenValue: number = fn.isDefined( input.value ) ? input.value : 1;
    let num: number = fn.isDefined( input.num ) ? input.num : givenValue;
    let den: number = fn.isDefined( input.den ) ? input.den : 1;
    let parsedValue: number = fn.isDefined( input.value ) ? input.value : num / den;
    let unit: string = input.unit || '';
    let rate: string = input.rate || '';
    let group: Group = Core.getGroup( unit );
    let rateGroup: Group = Core.getGroup( rate );

    return new Value( parsedValue, num, den, unit, group, rate, rateGroup );
  }

  /**
   * Parses user input into a [[Value]].
   *
   * @param input The input to parse.
   * @return The instance parsed from the input.
   */
  public static valueFromString(input: string): Value
  {
    let translated: string = Translations.translate( input );
    let parsed: ParseResult = this.input( translated );

    return parsed ? this.valueFromResult(parsed, parsed.unit, parsed.rate) : Value.INVALID;
  }

  /**
   * Parses user input into a [[Value]].
   *
   * @param result The already parsed input.
   * @param unit The unit parsed from the input.
   * @return The instance parsed from the input.
   */
  public static valueFromResult(result: ParseResult, unit: string, rateUnit: string): Value
  {
    let group: Group = Core.getGroup( unit );
    let rateGroup: Group = Core.getGroup( rateUnit );

    return new Value(result.value, result.valueNum, result.valueDen, unit, group, rateUnit, rateGroup);
  }



  /**
   * Parses user input into a [[ParseResult]]. If the input is not valid null
   * is returned.
   *
   * *Examples:*
   * - 1tsp
   * - 1 tsp
   * - 1/2 tsp
   * - 1 1/2 tsp
   * - -2 cups
   * - 2.35"
   *
   * @param input The string to parse a value and unit from.
   * @return The result of the parsing.
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
    let { unit, rate } = this.unit( fn.trim( matches[7] ) );

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

    return { value, valueNum, valueDen, num, den, unit, rate };
  }

  /**
   * Parses unit input into a [[Rate]].
   *
   * *Examples:*
   * - m/s
   * - miles per hour
   * - mph
   *
   * @param input The string to parse a unit from.
   * @return The result of the parsing.
   */
  public static unit(input: string): Rate
  {
    let rate: Rate = Rates.get( input );

    if (!rate)
    {
      let units: string[] = input.split( this.REGEX_UNIT );

      rate = {
        unit: units[0] ? fn.trim( units[0] ).replace( /\.$/, '' ) : '',
        rate: units[2] ? fn.trim( units[2] ).replace( /\.$/, '' ) : ''
      };
    }

    return rate;
  }

}
