
import { Plurality } from './Plurality';
import { System } from './System';
import { Class } from './Class';
import { GroupDefinition, UnitDefinitionMap, Numbers } from './Types';
import { appendTo } from './Functions';
import { Transform } from './Transform';


export type GroupList = Group[];

export type GroupMap = { [key: string]: Group };

export type GroupFactory = (unit: string) => Group;

export class Group
{

  public system: System;
  public common: boolean;
  public unit: string;
  public baseUnit: string;
  public baseScale: number = 1;
  public classScale: number = 0;
  public preferredUnit: string;
  public relativeUnit: string;
  public relativeScale: number;
  public units: UnitDefinitionMap;
  public denominators: number[];
  public dynamic: boolean = false;
  public parent: Class;

  private singularShort: string;
  private singularLong: string;
  private pluralShort: string;
  private pluralLong: string;

  public constructor(definition: GroupDefinition, parent: Class)
  {
    this.system = definition.system;
    this.common = !!definition.common;
    this.unit = definition.unit;
    this.baseUnit = definition.baseUnit;
    this.preferredUnit = definition.preferredUnit || definition.unit;
    this.relativeUnit = definition.relativeUnit;
    this.relativeScale = definition.relativeScale || 1;
    this.units = definition.units;
    this.denominators = definition.denominators;
    this.parent = parent;

    this.updateUnits();
  }

  public get isBase(): boolean
  {
    return this.unit === this.baseUnit;
  }

  public setDynamic(dynamic: boolean = true): this
  {
    this.dynamic = dynamic;

    return this;
  }

  public addUnits(units: UnitDefinitionMap): this
  {
    for (let unit in units)
    {
      this.units[ unit ] = units[ unit ];
    }

    this.updateUnits();

    return this;
  }

  public addDenominator(denominators: Numbers): this
  {
    appendTo( this.denominators, denominators );

    return this;
  }

  public setDenominators(denominators: number[]): this
  {
    this.denominators = denominators;

    return this;
  }

  public updateUnits(): this
  {
    this.singularShort = null;
    this.singularLong = null;
    this.pluralShort = null;
    this.pluralLong = null;

    for (let unit in this.units)
    {
      var plurality = this.units[ unit ];

      if (plurality !== Plurality.PLURAL)
      {
        if (!this.singularShort || unit.length < this.singularShort.length)
        {
          this.singularShort = unit;
        }

        if (!this.singularLong || unit.length > this.singularLong.length)
        {
          this.singularLong = unit;
        }
      }

      if (plurality !== Plurality.SINGULAR)
      {
        if (!this.pluralShort || unit.length < this.pluralShort.length)
        {
          this.pluralShort = unit;
        }

        if (!this.pluralLong || unit.length > this.pluralLong.length)
        {
          this.pluralLong = unit;
        }
      }
    }

    return this;
  }

  public getPluralLong(): string
  {
    return this.pluralLong;
  }

  public getPluralShort(): string
  {
    return this.pluralShort;
  }

  public getSingularLong(): string
  {
    return this.singularLong;
  }

  public getSingularShort(): string
  {
    return this.singularShort;
  }

  public matches(transform: Transform, reverse: boolean, callback: (group: Group, index: number) => any): void
  {
    if (this.parent)
    {
      let groups: GroupList = this.parent.groups;
      let matched: number = 0;

      let start = reverse ? groups.length - 1 : 0;
      let stop = reverse ? -1 : groups.length;
      let increment = reverse ? -1 : 1;

      for (let i = start; i !== stop; i += increment)
      {
        let group: Group = groups[ i ];

        if (matchesGroup( transform.system, group, this ) && (group.common || !transform.common))
        {
          callback( group, matched++ );
        }
      }
    }
  }

}

export function matchesGroup(desired: System, group: Group, givenGroup?: Group): boolean
{
  switch (desired)
  {
    case System.METRIC:
      return group.system === System.METRIC;
    case System.IMPERIAL:
      return group.system === System.IMPERIAL;
    case System.NONE:
      return false;
    case System.ANY:
      return true;
    case System.GIVEN:
      return givenGroup && group.baseUnit === givenGroup.baseUnit;
  }

  return false;
}
