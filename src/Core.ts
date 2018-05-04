
import { Plurality } from './Plurality';
import { System } from './System';
import { Class, ClassMap } from './Class';
import { Output } from './Output';
import { Group, GroupMap, GroupList } from './Group';
import { Transform } from './Transform';
import { Value } from './Value';
import { Sort } from './Sort';


/**
 * The global class which keeps track of all unit mappings and global options.
 *
 * This class is also responsible for creating dynamic classes and groups based
 * on approximation when a desired unit is not defined by the developer.
 */
export class Core
{

  /**
   * The map of defined classes by their name.
   */
  public static classMap: ClassMap = {};

  /**
   * An array of the defined classes.
   */
  public static classes: Class[] = [];

  /**
   * A map of groups by their acceptable units.
   */
  public static unitToGroup: GroupMap = {};

  /**
   * A list of dynamically created groups based on units specified by a user
   * which are not defined by the developer.
   */
  public static dynamicGroups: GroupList = [];

  /**
   * A map of the dynamically created groups by a key determined by
   * [[Core.getDynamicMatch]].
   */
  public static dynamicMatches: GroupMap = {};

  /**
   * Dynamic groups are mapped together (by default) by looking at the first few
   * characters.
   *
   * @see [[Core.getDynamicMatch]]
   */
  public static dynamicMatchLength: number = 3;


  /**
   * The global options used for outputting [[Base]], [[Range]], and [[Value]]s
   * which may be overridden by specifying any number of options.
   *
   * @see [[Base.output]]
   * @see [[Range.output]]
   * @see [[Value.output]]
   */
  public static globalOutput: Output = new Output();

  /**
   * The global transform options used for transforming a [[Base]] instance
   * by specifying what sort of units/groups are visible to the user.
   *
   * @see [[Base.normalize]]
   * @see [[Base.compact]]
   * @see [[Base.expand]]
   * @see [[Base.conversions]]
   * @see [[Base.filter]]
   */
  public static globalTransform: Transform = new Transform();

  /**
   * The global sort options used for ordering ranges in a [[Base]] instance.
   *
   * @see [[Base.sort]]
   */
  public static globalSort: Sort = new Sort();


  /**
   * Returns a [[Group]] instance mapped by the given unit. If no unit is given
   * `null` is returned. If the unit isn't mapped to a group a dynamic group
   * match is looked at and if none are found and `createDynamic` is true a new
   * dynamic group is created.
   *
   * @param unit The unit of the group to get.
   * @param createDynamic If creating a dynamic group should be created if an
   *  existing group could not be found.
   * @return The group matched to the unit or null if none was found.
   * @see [[Core.getDynamicMatch]]
   * @see [[Core.addDynamicUnit]]
   * @see [[Core.newDynamicGroup]]
   */
  public static getGroup(unit: string, createDynamic: boolean = true): Group
  {
    if (!unit)
    {
      return null;
    }

    let exactGroup: Group = Core.unitToGroup[ unit ];

    if (exactGroup)
    {
      return exactGroup;
    }

    let normalizedUnit: string = unit.toLowerCase();
    let normalizedGroup: Group = Core.unitToGroup[ normalizedUnit ];

    if (normalizedGroup)
    {
      return normalizedGroup;
    }

    if (!createDynamic)
    {
      return null;
    }

    let dynamicUnit: string = Core.getDynamicMatch( unit );
    let dynamicGroup: Group = Core.dynamicMatches[ dynamicUnit ];

    if (dynamicGroup)
    {
      return Core.addDynamicUnit( unit, dynamicGroup );
    }

    return Core.newDynamicGroup( unit );
  }

  /**
   * Sets the given unit as the preferred unit for the group it belongs to. If a
   * group is not found then this has no affect.
   *
   * @param unit The unit to mark as the preferred unit.
   * @see [[Core.getGroup]]
   */
  public static setPreferred(unit: string): void
  {
    let group: Group = this.getGroup( unit, false );

    if (group)
    {
      group.setPreferred( unit );
    }
  }

  /**
   * Sets whether the group associated with the given unit is common. A common
   * group is one a user is familiar with and would be okay seeing values
   * represented in. If a group is not found then this has no affect.
   *
   * @param unit The unit of a group to set the common flag.
   * @param common Whether the associated group should be common.
   * @see [[Core.getGroup]]
   */
  public static setCommon(unit: string, common: boolean = true): void
  {
    let group: Group = this.getGroup( unit, false );

    if (group)
    {
      group.setCommon( common );
    }
  }

  /**
   * Sets the denominators for the group associated to the given unit.
   * Denominators are useful for calculating a fraction from a value.
   *
   * @param unit The unit of a group to set the denominators of.
   * @param denominators The new denominators for the group.
   * @see [[Core.getGroup]]
   */
  public static setDenominators(unit: string, denominators: number[]): void
  {
    let group: Group = this.getGroup( unit, false );

    if (group)
    {
      group.setDenominators( denominators );
    }
  }

  /**
   * Adds the given class and all groups and units to the global state. If there
   * are units mapped to other groups they are overwritten by the units in the
   * given class.
   *
   * @param parent The class to add to the global state.
   */
  public static addClass(parent: Class): void
  {
    this.classMap[ parent.name ] = parent;
    this.classes.push( parent );

    let groups: GroupMap = parent.groupMap;

    for (let unit in groups)
    {
      this.unitToGroup[ unit ] = groups[ unit ];
    }
  }

  /**
   * Adds an array of classes to the global state.
   *
   * @see [[Core.addClass]]
   */
  public static addClasses(...classes: Class[]): void
  {
    for (let i = 0; i < classes.length; i++)
    {
      this.addClass( classes[ i ] );
    }
  }

  /**
   * Adds the unit to the given dynamic group. This function also updates the
   * plurality of all the units currently in the group.
   *
   * @param unit The unit to add to the given group.
   * @param group The dynamically created group.
   * @return The instance of the given group.
   */
  public static addDynamicUnit(unit: string, group: Group): Group
  {
    group.units[ unit ] = Plurality.EITHER;

    let unitCount: number = 0;

    for (let groupUnit in group.units)
    {
      if (groupUnit)
      {
        unitCount++;
      }
    }

    if (unitCount > 1)
    {
      let longest: string;

      for (let groupUnit in group.units)
      {
        group.units[ groupUnit ] = Plurality.SINGULAR;

        if (!longest || groupUnit.length > longest.length)
        {
          longest = groupUnit;
        }
      }

      if (longest)
      {
        group.units[ longest ] = Plurality.PLURAL;
      }
    }

    group.updateUnits();

    this.unitToGroup[ unit ] = group;
    this.unitToGroup[ unit.toLowerCase() ] = group;

    this.dynamicMatches[ this.getDynamicMatch( unit ) ] = group;

    return group;
  }

  /**
   * Creates a dynamic class & group based on the given unit and adds it to the
   * global state. By default the group is marked with [[System.ANY]], is
   * common, and has the valid denominators 2, 3, 4, 5, 6, 8, 10.
   *
   * @param unit The initial unit of the group to use as the name of the class
   *  and the base unit of the group.
   * @return An instance of a new Group with a new parent Class.
   */
  public static newDynamicGroup(unit: string): Group
  {
    let parent: Class = new Class(unit);

    let group: Group = parent.addGroup({
      system: System.ANY,
      unit: unit,
      common: true,
      baseUnit: unit,
      denominators: [2, 3, 4, 5, 6, 8, 10],
      units: {}
    });

    group.setDynamic();

    this.addDynamicUnit( unit, group );
    this.dynamicGroups.push( group );

    return group;
  }

  /**
   * The function which takes a unit and generates a string which should be used
   * to mark similarly spelled units under the same dynamic group.
   *
   * @param unit The unit to build a key from.
   * @return The key which identifies the dynamic group.
   */
  public static getDynamicMatch(unit: string): string
  {
    return unit.substring( 0, this.dynamicMatchLength ).toLowerCase();
  }

  /**
   * The function which takes to values and determines which one is more
   * "normal" or "human friendly".
   *
   * @param fromValue The most normal value found so far.
   * @param toValue The value to compare to.
   * @param transform The transformation rules to guide the function to choose
   *  the more normal value.
   * @param forOutput The output options to guide the function to choose the
   *  more normal value.
   * @return True if `toValue` appears more normal than `fromValue`.
   */
  // @ts-ignore
  public static isMoreNormal(fromValue: Value, toValue: Value, transform: Transform, forOutput: Output): boolean
  {
    let fromString: string = forOutput.value( fromValue );
    let toString: string = forOutput.value( toValue );

    return toString.length <= fromString.length;
  }

}
