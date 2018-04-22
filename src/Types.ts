
import { Plurality } from './Plurality';
import { System } from './System';


export type Strings = string | string[];

export type StringMap = { [unit: string]: string };

export type Numbers = number | number[];

export type NumberMap = { [unit: string]: number };

export type Converter = (base: number) => number;

export type ConverterMap = { [unit: string]: Converter };

export type ConverterDoubleMap = { [unit: string]: ConverterMap };

export type UnitDefinitionMap = { [unit: string]: Plurality };

export interface GroupDefinition {
  system: System;
  unit: string;
  common?: boolean;
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
