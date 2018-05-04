
import { Plurality } from './Plurality';
import { System } from './System';
import { Class } from './Class';
import { GroupDefinition, UnitDefinitionMap, Numbers } from './Types';
import { Functions as fn } from './Functions';
import { Transform } from './Transform';


/**
 * An array of groups.
 */
export type GroupList = Group[];

/**
 * An object of groups keyed by their units.
 */
export type GroupMap = { [key: string]: Group };

/**
 * A function which takes a unit and returns a Group instance.
 */
export type GroupFactory = (unit: string) => Group;


/**
 * A unit and its aliases as well as their plurality.
 *
 * A group is relative to a base group or is a base group itself. As unit
 * aliases are added to the group it determines the appropriate plural and
 * singular long and short versions given the unit aliases in this group.
 */
export class Group
{

  /**
   * The System this group belongs in. One of [[System.METRIC]],
   * [[System.US]], or [[System.ANY]].
   */
  public system: System;

  /**
   * Whether this group is considered common. A common group is one a
   * developer has decided the user will be familiar with and would be okay
   * seeing values in this unit.
   */
  public common: boolean;

  /**
   * The main unit for this group. This is the preferred unit if one is not
   * specified in the definition.
   */
  public unit: string;

  /**
   * The unit of the base group. The base group is typically the smallest value
   * and is also where the baseUnit matches unit.
   */
  public baseUnit: string;

  /**
   * The scale of this group relative to the base group. This is used for
   * conversions of values with the same base group.
   */
  public baseScale: number = 1;

  /**
   * The scale of this group relative to the first base group added to the
   * class. This is used to compare numbers of the same class across all bases.
   */
  public classScale: number = 0;

  /**
   * The unit the developer prefers for their users.
   *
   * @see [[Base.preferred]]
   */
  public preferredUnit: string;

  /**
   * The unit this group is relative to.
   */
  public relativeUnit: string;

  /**
   * This defines how to calculate the scale of the group by multiplying it by
   * the group of `relativeUnit`.
   */
  public relativeScale: number;

  /**
   * A map of all valid units and whether they are singular, plural, or either.
   */
  public units: UnitDefinitionMap;

  /**
   * The list of valid denominators for this group. Values when converted to
   * fractions look at this list to ensure that fractions are not produced that
   * are not user friendly. For example, no one would say 5/23 a meter.
   */
  public denominators: number[];

  /**
   * Whether this group was dynamically created by user input having units
   * not mapped to groups by the developer.
   */
  public dynamic: boolean = false;

  /**
   * The class this group belongs to.
   */
  public parent: Class;

  /**
   * The shortest unit in this group that is used for singular values.
   */
  public singularShort: string;

  /**
   * The longest unit in this group that is used for singular values.
   */
  public singularLong: string;

  /**
   * The longest unit in this group that is used for plural values.
   */
  public pluralShort: string;

  /**
   * The longest unit in this group that is used for plural values.
   */
  public pluralLong: string;


  /**
   * Creates a new instance of Group given a definition and the parent class.
   *
   * @param definition The definition of the group.
   * @param parent The class which contains this group.
   */
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

  /**
   * True if this group is a base group, otherwise false.
   */
  public get isBase(): boolean
  {
    return this.unit === this.baseUnit;
  }

  /**
   * Sets the dynamic flag of this group.
   *
   * @param dynamic Whether this group is dynamic or not.
   * @return The reference to this instance.
   */
  public setDynamic(dynamic: boolean = true): this
  {
    this.dynamic = dynamic;

    return this;
  }

  /**
   * Adds a denominator or array of denominators to this group.
   *
   * @param denominators A denominator or an array of denominators to add.
   * @return The reference to this instance.
   */
  public addDenominator(denominators: Numbers): this
  {
    fn.appendTo( this.denominators, denominators );

    return this;
  }

  /**
   * Sets the denominators of this group.
   *
   * @param denominators The new denominators for this group.
   * @return The reference to this instance.
   * @see [[Group.denominators]]
   */
  public setDenominators(denominators: number[]): this
  {
    this.denominators = denominators;

    return this;
  }

  /**
   * Sets the common flag of this group.
   *
   * @param common Whether this group is common or not.
   * @return The reference to this instance.
   * @see [[Group.common]]
   */
  public setCommon(common: boolean = true): this
  {
    this.common = common;

    return this;
  }

  /**
   * Sets the preferred unit of this group.
   *
   * @param unit The preferred unit of this group.
   * @return The reference to this instance.
   * @see [[Group.preferredUnit]]
   */
  public setPreferred(unit: string): this
  {
    this.preferredUnit = unit;

    return this;
  }

  /**
   * Adds the given unit aliases to this group and the parent class.
   *
   * @param units The units to add to the group and class.
   * @return The reference to this instance.
   * @see [[Class.addGroupUnit]]
   */
  public addUnits(units: UnitDefinitionMap): this
  {
    let parent: Class = this.parent;

    for (let unit in units)
    {
      this.units[ unit ] = units[ unit ];

      parent.addGroupUnit( unit, this );
    }

    this.updateUnits();

    return this;
  }

  /**
   * Removes the given unit aliases from this group and the parent class.
   *
   * @param units The array of unit aliases to remove.
   * @return The reference to this instance.
   * @see [[Class.removeGroupUnit]]
   */
  public removeUnits(units: string[]): this
  {
    let parent: Class = this.parent;
    let existing: UnitDefinitionMap = this.units;

    for (let i = 0; i < units.length; i++)
    {
      let unit = units[ i ];

      if (unit in existing)
      {
        delete existing[ unit ];

        parent.removeGroupUnit( unit, this );
      }
    }

    return this;
  }

  /**
   * Updates the singular and plural long and short form units for this group.
   *
   * @return The reference to this instance.
   */
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

  /**
   * Invokes a callback for each group in the parent class that are visible
   * based on the given transform relative to this group.
   *
   * @param transform The transform which decides what groups are visible.
   * @param reverse If the groups of the class should be iterated in reverse.
   * @param callback A function to invoke with all visible groups found and the
   *  index of that group in the set of visible groups. If `false` is returned
   *  by the function iteration of visible groups ceases.
   * @param callback.group The current visible group.
   * @param callback.index The index of the current visible group.
   * @see [[Transform.isVisibleGroup]]
   */
  public matches(transform: Transform, reverse: boolean, callback: (group: Group, index: number) => any): void
  {
    if (this.parent)
    {
      this.parent.getVisibleGroups( transform, reverse, this, callback );
    }
  }

}
