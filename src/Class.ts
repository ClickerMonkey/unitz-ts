
import { GroupDefinition, Converter, ConverterMap, ConverterDoubleMap } from './Types';
import { Group, GroupMap, GroupList } from './Group';
import { Transform } from './Transform';


/**
 * A map of classes is an object where the key is a unit and the value is a class.
 */
export type ClassMap = { [unit: string]: Class };

/**
 * A collection of groups and their units with the logic on how to convert
 * between groups with differing base units.
 *
 * A class is essentially something like "Length" where base units are "inches"
 * and "millimeters" and there are various other groups based off of these
 * base groups like "feet", "centimeters", and "meters".
 *
 * A class is responsible for being the sole place where conversion is done
 * between different groups in the same class.
 *
 * @see [[Class.convert]]
 */
export class Class
{

  /**
   * The name of the class.
   */
  public name: string;

  /**
   * A map of groups by their units. This map contains the expected case of each
   * unit as well as the lowercase version of the unit as long as it doesn't
   * overwrite another group. Unit case may be important so it has priority.
   */
  public groupMap: GroupMap;

  /**
   * A list of the groups in this class.
   */
  public groups: GroupList;

  /**
   * A map of functions which convert one unit value to another unit value.
   * It is used by invoking `converters[ fromUnit ][ toUnit ]( value )`.
   *
   * @see [[Class.setBaseConversion]]
   * @see [[Class.convert]]
   */
  public converters: ConverterDoubleMap;

  /**
   * Creates a new instance of Class given the name of the class and optionally
   * the groups of the class.
   *
   * @param name The unique name of the class.
   * @param groups The optional list of groups to populate the class with.
   */
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

  /**
   * Adds the group definitions to this class.
   *
   * @param definitions The array of group definitions.
   * @return The reference to this instance.
   * @see [[Class.addGroup]]
   */
  public addGroups(definitions: GroupDefinition[]): this
  {
    for (let i = 0; i < definitions.length; i++)
    {
      this.addGroup(definitions[i]);
    }

    return this;
  }

  /**
   * Adds a group definition to this class. If the group is relative to another
   * group the [[Group.baseScale]] and [[Group.baseUnit]] are set to appropriate
   * values.
   *
   * @param definition The group definition.
   * @return The instance of the group created from the definition.
   * @see [[Class.addGroupUnit]]
   */
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

  /**
   * Adds the unit to this class for the given group. If the lowercase version
   * of the unit has not been mapped yet it will be mapped to the given group.
   *
   * @param unit The unit to map to the group.
   * @param group The group which has the unit.
   * @return The reference to this instance.
   */
  public addGroupUnit(unit: string, group: Group): this
  {
    let lower: string = unit.toLowerCase();

    this.groupMap[ unit ] = group;

    if (!this.groupMap[ lower ])
    {
      this.groupMap[ lower ] = group;
    }

    return this;
  }

  /**
   * Removes the given unit associated to the given group from the class. If the
   * group is not mapped to this unit then this has no effect.
   *
   * @param unit The unit to remove from this class.
   * @param group The group which has the unit.
   * @return The reference to this instance.
   */
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

  /**
   * Determines the first group in this class which is a base group.
   *
   * @see [[Group.isBase]]
   */
  private getFirstBase(): Group
  {
    let groups: GroupList = this.groups;

    for (let i = 0; i < groups.length; i++)
    {
      let group: Group = groups[ i ];

      if (group.isBase)
      {
        return group;
      }
    }

    return null;
  }

  /**
   * Updates the [[Group.classScale]] value in each group in this class so that
   * there is a baseline for comparing one group to another no matter the base
   * unit. For comparing in the same base, you can use [[Group.baseScale]].
   *
   * @return The reference to this instance.
   */
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

  /**
   * Sets the conversion function between the two base units.
   *
   * @param fromUnit The base unit to convert from.
   * @param toUnit The base unit to convert to.
   * @param converter The function to pass the value to convert.
   * @return The reference to this instance.
   */
  public setBaseConversion(fromUnit: string, toUnit: string, converter: Converter): this
  {
    let converters = this.converters;
    converters[ fromUnit ] = converters[ fromUnit ] || {};
    converters[ fromUnit ][ toUnit ] = converter;

    return this;
  }

  /**
   * Determines which groups in this class are visible according to the given
   * transform. The groups can be iterated in reverse and can optionally take
   * a related group into consideration (when the system is GIVEN, we want to
   * return the groups with the same system).
   *
   * @param transform The transform which decides what groups are visible.
   * @param reverse If the groups of this class should be iterated in reverse.
   * @param relatedGroup A related group which may be used for visibility if the
   *  [[Transform.system]] is [[System.GIVEN]].
   * @param callback A function to invoke with all visible groups found and the
   *  index of that group in the set of visible groups. If `false` is returned
   *  by the function iteration of visible groups ceases.
   * @param callback.group The current visible group.
   * @param callback.index The index of the current visible group.
   * @see [[Transform.isVisibleGroup]]
   */
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

  /**
   * Converts the given number from a given group to a given group. If the two
   * groups are the same or one or both of the groups are not provided then the
   * `value` provided is returned. If the two groups have differing base units
   * the [[Class.converters]] map is used to convert the `value` over to the
   * proper base. If the [[Class.converters]] map is missing a base conversion
   * zero is returned. This might happen if a group is passed to this function
   * which does not belong to this class OR if the user has impromperly setup
   * their own classes.
   *
   * @param value The number to convert.
   * @param from The group of the number to convert from.
   * @param to The group to convert to.
   * @param invalid The value to return if a conversion between the two groups
   *  could not be made.
   * @return The converted number or zero if a base conversion could not be found.
   */
  public convert(value: number, from: Group, to: Group, invalid: number = 0): number
  {
    if (from === to || !from || !to)
    {
      return value;
    }

    let converted: number = value * from.baseScale;

    if (from.baseUnit !== to.baseUnit)
    {
      let map: ConverterMap = this.converters[ from.baseUnit ];

      if (!map || !map[ to.baseUnit ])
      {
        return invalid;
      }

      let converter: Converter = map[ to.baseUnit ];

      converted = converter( converted );
    }

    return converted / to.baseScale;
  }

}
