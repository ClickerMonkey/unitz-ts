
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
   * The system the group exists in. Should be one of:
   * [[System.METRIC]], [[System.IMPERIAL]], or [[System.ANY]]
   */
  system: System;
  /**
   * The unit which identifies the group.
   */
  unit: string;
  /**
   * Whether the group is considered common. A common group is one that everyone
   * is familiar with and is used to communicate values. A group that is not
   * common exists for conversions and parsing but when transforms are performed
   * uncommon groups are not used to represent a value.
   */
  common?: boolean;
  /**
   * The preferred unit of the group. The [[Base.preferred]] function will
   * convert the current units to the preferred units. The preferred unit can be
   * changed through [[Group.setPreferred]].
   */
  preferredUnit?: string;
  baseUnit?: string;
  relativeUnit?: string;
  relativeScale?: number;
  denominators: number[];
  units: UnitDefinitionMap;
}

export interface ParseResult {
  value: number;
  valueNum: number;
  valueDen: number;
  num: number;
  den: number;
  unit: string;
}

export interface ValueDefinition {
  value?: number;
  num?: number;
  den?: number;
  unit?: string;
}

export type ValueInput = string | ValueDefinition;

export interface RangeDefinition {
  min: ValueInput,
  max: ValueInput
}

export type RangeInput = string | RangeDefinition | ValueDefinition;

export type RangesInput = string | RangeInput | RangeInput[];

export type BaseInput = Base | RangesInput;
