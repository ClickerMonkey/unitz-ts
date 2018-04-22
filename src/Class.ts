
import { GroupDefinition, StringMap, NumberMap, Converter, ConverterDoubleMap } from './Types';
import { Group, GroupMap, GroupList } from './Group';


export type ClassMap = { [unit: string]: Class };

export class Class
{

  public name: string;
  public groupMap: GroupMap;
  public groups: GroupList;
  public bases: StringMap;
  public converters: NumberMap;
  public mapping: ConverterDoubleMap;

  public constructor(name: string, groups?: GroupDefinition[])
  {
    this.name = name;
    this.groupMap = {};
    this.groups = [];
    this.bases = {};
    this.converters = {};
    this.mapping = {};

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

  public addGroup(definition: GroupDefinition): this
  {
    let group = new Group(definition, this);
    let { relativeUnit, units } = group;

    if (relativeUnit)
    {
      group.baseScale = group.relativeScale * this.converters[ relativeUnit ];
      group.baseUnit = this.bases[ relativeUnit ];
    }

    for (let alias in units)
    {
      this.converters[ alias ] = group.baseScale;
      this.bases[ alias ] = group.baseUnit;
      this.groupMap[ alias ] = group;
    }

    this.groups.push( group );

    return this;
  }

  public setBaseConversion(fromUnit: string, toUnit: string, converter: Converter): this
  {
    let mapping = this.mapping;
    mapping[ fromUnit ] = mapping[ fromUnit ] || {};
    mapping[ fromUnit ][ toUnit ] = converter;

    return this;
  }

}
