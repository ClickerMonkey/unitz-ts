
import { isArray, isString, isRangeDefinition, isValueDefinition, isDefined } from './Functions';
import { RangeInput, RangesInput, RangeDefinition, ValueInput, ValueDefinition, ParseResult } from './Types';
import { Group, GroupFactory } from './Group';
import { Range, RangeList } from './Range';
import { Value } from './Value';


export let REGEX_RANGE: RegExp = /\s*(-?[^-]+)-(.+)/;
export let REGEX_LIST: RegExp = /\s*,\s*/;
export let REGEX_PARSE: RegExp = /^\s*(-?\d*)(\s+(\d+))?(\s*\/\s*(\d+)|\.(\d+)|)\s*(.*)\s*$/i;

export function parseRanges(input: RangesInput, groups: GroupFactory): RangeList
{
  if (isArray(input))
  {
    return parseRangesFromArray( <RangeInput[]>input, groups );
  }
  else if (isString(input))
  {
    return parseRangesFromString( <string>input, groups );
  }
  else if (isRangeDefinition(input))
  {
    return parseRangesFromArray( [ <RangeDefinition>input ], groups );
  }
  else if (isValueDefinition(input))
  {
    return parseRangesFromArray( [ <ValueDefinition>input ], groups );
  }

  return [];
}

function parseRangesFromArray(input: RangeInput[], groups: GroupFactory): RangeList
{
  let ranges = [];

  for (let i = 0; i < input.length; i++)
  {
    let range: Range = parseRange( input[ i ], groups );

    ranges.push( range );
  }

  return ranges;
}

function parseRangesFromString(input: string, groups: GroupFactory): RangeList
{
  let ranges: string[] = input.split( REGEX_LIST );

  return parseRangesFromArray( ranges, groups );
}

export function parseRange(input: RangeInput, groups: GroupFactory): Range
{
  if (isString(input))
  {
    return parseRangeFromString( <string>input, groups );
  }
  else if (isRangeDefinition(input))
  {
    let range: RangeDefinition = <RangeDefinition>input;
    let min: Value = parseValue( range.min, groups );
    let max: Value = parseValue( range.max, groups );

    return new Range( min, max );
  }

  return null;
}

function parseRangeFromString(input: string, groups: GroupFactory): Range
{
  let matches: string[] = REGEX_RANGE.exec( input );

  if (!matches) {
    let fixed: Value = parseValueFromString(input, groups);

    return new Range(fixed, fixed);
  }

  let minInput: string = matches[1];
  let maxInput: string = matches[2];

  let minParsed: ParseResult = parseInput( minInput );
  let maxParsed: ParseResult = parseInput( maxInput );

  let minUnit: string = minParsed.unit || maxParsed.unit;
  let maxUnit: string = maxParsed.unit || minParsed.unit;

  let min: Value = parseValueFromResult(minParsed, minUnit, groups);
  let max: Value = parseValueFromResult(maxParsed, maxUnit, groups);

  return new Range(min, max);
}

export function parseValue(input: ValueInput, groups: GroupFactory): Value
{
  if (isString(input))
  {
    return parseValueFromString( <string>input, groups );
  }
  else if (isValueDefinition(input))
  {
    return parseValueFromValue( <ValueDefinition>input, groups );
  }

  return null;
}

function parseValueFromValue(input: ValueDefinition, groups: GroupFactory): Value
{
  let givenValue: number = isDefined( input.value ) ? input.value : 1;
  let num: number = isDefined( input.num ) ? input.num : givenValue;
  let den: number = isDefined( input.den ) ? input.den : 1;
  let parsedValue: number = isDefined( input.value ) ? input.value : num / den;
  let unit: string = input.unit || '';
  let group: Group = groups( unit );

  return new Value( parsedValue, num, den, unit, group );
}

function parseValueFromString(input: string, groups: GroupFactory): Value
{
  let parsed: ParseResult = parseInput( input );

  return parseValueFromResult(parsed, parsed.unit, groups);
}

function parseValueFromResult(result: ParseResult, unit: string, groups: GroupFactory): Value
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
export function parseInput(input: string): ParseResult
{
  let matches: string[] = REGEX_PARSE.exec( input );
  let whole: number = parseInt( matches[1] );
  let hasWhole: boolean = isFinite( whole );
  let sign: number = matches[1].charAt(0) === '-' ? -1 : 1;
  let num: number = parseInt( matches[3] );
  let den: number = parseInt( matches[5] );
  let decimal: number = parseInt( matches[6] );
  let unit: string = matches[7];

  if ( !hasWhole && isFinite( decimal ) )
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
    else if ( isFinite( decimal ) )
    {
      let remainder = parseFloat( '0.' + decimal );

      value += remainder * sign;
      valueNum += remainder;
    }

    valueNum *= sign;
  }

  return { value, valueNum, valueDen, num, den, unit };
}
