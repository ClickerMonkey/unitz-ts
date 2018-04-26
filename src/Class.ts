
import { GroupDefinition, Converter, ConverterDoubleMap } from './Types';
import { Group, GroupMap, GroupList } from './Group';
import { Transform } from './Transform';
import { RangeList } from './Range';


export type ClassMap = { [unit: string]: Class };

export type ClassGrouping = {
  groupless: RangeList,
  classes: { [className: string]: { ranges: RangeList, parent: Class } }
}

export class Class
{

  public name: string;
  public groupMap: GroupMap;
  public groups: GroupList;
  public converters: ConverterDoubleMap;

  public constructor(name: string, groups?: GroupDefinition[])
  {
    this.name = name;
    this.groupMap = {};
    this.groups = [];
    this.converters = {};

    if (groups)
    {
      this.addGroups(groups);
    }
  }

  public addGroups(definitions: GroupDefinition[]): this
  {
    for (let i = 0; i < definitions.length; i++)
    {
      this.addGroup(definitions[i]);
    }

    return this;
  }

  public addGroup(definition: GroupDefinition): Group
  {
    let group = new Group(definition, this);
    let { relativeUnit, relativeScale, units } = group;

    if (relativeUnit)
    {
      let relative: Group = this.groupMap[ relativeUnit ];

      group.baseScale = relativeScale * relative.baseScale;
      group.baseUnit = relative.baseUnit;
    }

    for (let alias in units)
    {
      this.addGroupUnit( alias, group );
    }

    this.groups.push( group );

    return group;
  }

  public addGroupUnit(unit: string, group: Group): this
  {
    let lower: string = unit.toLowerCase();

    this.groupMap[ unit ] = group;
    this.groupMap[ lower ] = group;

    return this;
  }

  public removeGroupUnit(unit: string, group: Group): this
  {
    let lower: string = unit.toLowerCase();

    if (this.groupMap[ unit ] === group)
    {
      delete this.groupMap[ unit ];
    }

    if (this.groupMap[ lower ] === group)
    {
      delete this.groupMap[ lower ];
    }

    return this;
  }

  private getFirstBase(): Group
  {
    let groups: GroupList = this.groups;

    for (let i = 0; i < groups.length; i++)
    {
      let group: Group = groups[ i ];

      if (group.unit === group.baseUnit)
      {
        return group;
      }
    }

    return null;
  }

  public setClassScales(): this
  {
    let groups: GroupList = this.groups;
    let first: Group = this.getFirstBase();

    if (first)
    {
      for (let i = 0; i < groups.length; i++)
      {
        let group: Group = groups[ i ];

        if (group.baseUnit === first.baseUnit)
        {
          group.classScale = group.baseScale;
        }
        else if (group.baseUnit in this.converters)
        {
          group.classScale = this.converters[ group.baseUnit ][ first.baseUnit ]( group.baseScale );
        }
      }
    }

    return this;
  }

  public setBaseConversion(fromUnit: string, toUnit: string, converter: Converter): this
  {
    let converters = this.converters;
    converters[ fromUnit ] = converters[ fromUnit ] || {};
    converters[ fromUnit ][ toUnit ] = converter;

    return this;
  }

  public getVisibleGroups(transform: Transform, reverse: boolean, relatedGroup: Group, callback: (group: Group, index: number) => any): void
  {
    let groups: GroupList = this.groups;
    let matched: number = 0;

    let start = reverse ? groups.length - 1 : 0;
    let stop = reverse ? -1 : groups.length;
    let increment = reverse ? -1 : 1;

    for (let i = start; i !== stop; i += increment)
    {
      let group: Group = groups[ i ];

      if (transform.isVisibleGroup( group, relatedGroup ))
      {
        let result: any = callback( group, matched++ );

        if (result === false)
        {
          break;
        }
      }
    }
  }

  public convert(value: number, from: Group, to: Group): number
  {
    if (from === to || !from || !to)
    {
      return value;
    }

    let converted: number = value * from.baseScale;

    if (from.baseUnit !== to.baseUnit)
    {
      let converter: Converter = this.converters[ from.baseUnit ][ to.baseUnit ];

      converted = converter( converted );
    }

    return converted / to.baseScale;
  }

}
