
import { Plurality } from './Plurality';
import { System } from './System';
import { Base } from './Base';


/**
 * A type which is a single number or an array of numbers.
 */
export type Numbers = number | number[];


/**
 * A function which takes a number and returns a number.
 */
export type Converter = (base: number) => number;


/**
 * An object where the key is a unit and a value is a Converter.
 */
export type ConverterMap = { [unit: string]: Converter };


/**
 * A double object where both keys are units and the value is a Converter.
 * This is used by Class to convert from one base unit to another.
 */
export type ConverterDoubleMap = { [unit: string]: ConverterMap };


/**
 * An object where the key is a unit and the value is a Plurality value.
 * This is used when defining a group's units.
 */
export type UnitDefinitionMap = { [unit: string]: Plurality };


/**
 * An object which is passed to a group constructor to initialize it.
 */
export interface GroupDefinition
{
  /**
   * @see [[Group.system]]
   */
  system: System;
  /**
   * @see [[Group.unit]]
   */
  unit: string;
  /**
   * @see [[Group.common]]
   */
  common?: boolean;
  /**
   * @see [[Group.preferredUnit]]
   */
  preferredUnit?: string;
  /**
   * @see [[Group.baseUnit]]
   */
  baseUnit?: string;
  /**
   * @see [[Group.relativeUnit]]
   */
  relativeUnit?: string;
  /**
   * @see [[Group.relativeScale]]
   */
  relativeScale?: number;
  /**
   * @see [[Group.denominators]]
   */
  denominators: number[];
  /**
   * @see [[Group.units]]
   */
  units: UnitDefinitionMap;
}


/**
 * An object which is returned by [[Parse.input]] given a string.
 */
export interface ParseResult
{

  /**
   * The value parsed. This is always present and finite.
   */
  value: number;

  /**
   * The numerator (potentially improper) of the fraction. This is always
   * present and finite. If the parsed string is not a fraction this will be
   * equal to value.
   */
  valueNum: number;

  /**
   * The denominator of the fraction. This is always present, finite, and whole.
   * If the parsed string is not a fraction this will be equal to 1.
   */
  valueDen: number;

  /**
   * The numerator of the fraction. If the input was not a fraction then this
   * will not be a valid number.
   */
  num: number;

  /**
   * The denominator of the fraction. If the input was not a fraction then this
   * will not be a valid number.
   */
  den: number;

  /**
   * The unit parsed from the input.
   */
  unit: string;
}


/**
 * An object which can be passed as a value instead of the string representation.
 */
export interface ValueDefinition
{
  /**
   * @see [[Value.value]]
   */
  value?: number;
  /**
   * @see [[Value.num]]
   */
  num?: number;
  /**
   * @see [[Value.den]]
   */
  den?: number;
  /**
   * @see [[Value.unit]]
   */
  unit?: string;
}


/**
 * The types which can be passed as value inputs.
 */
export type ValueInput = string | ValueDefinition;


/**
 * An object which can be passed as a range instead of the string representation.
 */
export interface RangeDefinition
{
  /**
   * @see [[Range.min]]
   */
  min: ValueInput,
  /**
   * @see [[Range.max]]
   */
  max: ValueInput
}


/**
 * The types which can be passed as range inputs.
 */
export type RangeInput = string | RangeDefinition | ValueDefinition;


/**
 * The types which can be passed as range list inputs.
 */
export type RangesInput = string | RangeInput | RangeInput[];


/**
 * The types which can be passed as base inputs.
 */
export type BaseInput = Base | RangesInput;
