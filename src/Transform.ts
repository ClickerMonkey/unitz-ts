
import { Functions as fn } from './Functions';
import { System } from './System';
import { Group } from './Group';
import { Class } from './Class';
import { Range } from './Range';


/**
 * Developer input which can be passed to a Transform constructor or all the
 * various functions that use the [[Transform]] object.
 *
 * @see [[Base.normalize]]
 * @see [[Base.compact]]
 * @see [[Base.expand]]
 * @see [[Base.conversions]]
 * @see [[Base.filter]]
 */
export interface TransformInput
{
  /**
   * @see [[Transform.common]]
   */
  common?: boolean;
  /**
   * @see [[Transform.system]]
   */
  system?: System;
  /**
   * @see [[Transform.min]]
   */
  min?: number;
  /**
   * @see [[Transform.max]]
   */
  max?: number;
  /**
   * @see [[Transform.groupless]]
   */
  groupless?: boolean;
  /**
   * @see [[Transform.convertWithMax]]
   */
  convertWithMax?: boolean;
  /**
   * @see [[Transform.onlyUnits]]
   */
  onlyUnits?: string[];
  /**
   * @see [[Transform.notUnits]]
   */
  notUnits?: string[];
  /**
   * @see [[Transform.onlyClasses]]
   */
  onlyClasses?: string[];
  /**
   * @see [[Transform.notClasses]]
   */
  notClasses?: string[];
}


/**
 * THe class which controls which units and values are acceptable when
 * transforming a set of ranges.
 *
 * @see [[Base.normalize]]
 * @see [[Base.compact]]
 * @see [[Base.expand]]
 * @see [[Base.conversions]]
 * @see [[Base.filter]]
 */
export class Transform implements TransformInput
{

  /**
   * The option which determines whether only common or any group are valid.
   * To only include common units this value must be `true` and to include
   * common and uncommon this value must be `false`.
   */
  public common: boolean = true;

  /**
   * The desired system for the transformation.
   */
  public system: System = System.GIVEN;

  /**
   * The mimimum allowed value for the transformation.
   */
  public min: number = -Number.MAX_VALUE;

  /**
   * The maximum allowed value for the transformation.
   */
  public max: number = Number.MAX_VALUE;

  /**
   * Whether the minimum or maximum value of a range is used when producing
   * conversions.
   */
  public convertWithMax: boolean = true;

  /**
   * Whether ranges without units are considered valid for the transformation.
   */
  public groupless: boolean = true;

  /**
   * An array of units that define the valid ranges for a transformation.
   */
  public onlyUnits: string[];

  /**
   * An array of units that define the invalid ranges for a transformation.
   */
  public notUnits: string[];

  /**
   * An array of class names that define the valid ranges for a transformation.
   */
  public onlyClasses: string[];

  /**
   * An array of class names that define the invalid ranges for a transformation.
   */
  public notClasses: string[];


  /**
   * Creates a new instance of Transform with an optional set of options to
   * override the default values.
   *
   * @param input The options to apply to the new instance.
   */
  public constructor(input?: TransformInput)
  {
    if (fn.isDefined(input))
    {
      this.set( input );
    }
  }

  /**
   * Overrides values in this instance with ones specified in input.
   *
   * @param input The values to override.
   * @return The reference to this instance.
   */
  public set(input: TransformInput): this
  {
    this.common = fn.coalesce( input.common, this.common );
    this.system = fn.coalesce( input.system, this.system );
    this.min = fn.coalesce( input.min, this.min );
    this.max = fn.coalesce( input.max, this.max );
    this.groupless = fn.coalesce( input.groupless, this.groupless );
    this.convertWithMax = fn.coalesce( input.convertWithMax, this.convertWithMax );
    this.onlyUnits = fn.coalesce( input.onlyUnits, this.onlyUnits );
    this.notUnits = fn.coalesce( input.notUnits, this.notUnits );
    this.onlyClasses = fn.coalesce( input.onlyClasses, this.onlyClasses );
    this.notClasses = fn.coalesce( input.notClasses, this.notClasses );

    return this;
  }

  /**
   * Returns a Transform instance which matches the desired options. If no
   * options are specified the reference to this instance is returned. If the
   * options are already an instance of Transform its returned. If options are
   * specified a new instance is created with the options of this instance, and
   * the given options applied with [[Transform.set]].
   *
   * @param input The options desired.
   * @return An instance of this class which matches the desired options.
   */
  public extend(input?: TransformInput): Transform
  {
    let extended: Transform = this;

    if (fn.isDefined(input))
    {
      if (input instanceof Transform)
      {
        extended = input;
      }
      else
      {
        extended = new Transform( this );
        extended.set( input );
      }
    }

    return extended;
  }

  /**
   * Determines whether the given range is valid according to this instance.
   *
   * @param range The range to test.
   * @return True if the range matches this transform, otherwise false.
   */
  public isValidRange(range: Range): boolean
  {
    if (range.max.value < this.min)
    {
      return false;
    }

    if (range.min.value > this.max)
    {
      return false;
    }

    let group: Group = this.convertWithMax ? range.max.group : range.min.group;

    return this.isVisibleGroup(group);
  }

  /**
   * Determines whether the given group (and optionally a current group) is
   * valid or visible according to this instance.
   *
   * @param group The group to test.
   * @param givenGroup The current group if available.
   * @return True if the group matches this transform, otherwise false.
   */
  public isVisibleGroup(group: Group, givenGroup?: Group): boolean
  {
    if (!group)
    {
      return this.groupless;
    }

    return this.isCommonMatch( group ) &&
      this.isSystemMatch( group, givenGroup ) &&
      this.isUnitMatch( group ) &&
      this.isClassMatch( group.parent );
  }

  /**
   * Determines whether the given group matches the common option on this
   * instance.
   *
   * @param group The group to test.
   * @return True if the group matches the common option, otherwise false.
   */
  public isCommonMatch(group: Group): boolean
  {
    return !this.common || group.common;
  }

  /**
   * Determines whether the given group (and optionally a current group)
   * matches the system option on this instance.
   *
   * @param group The group to test.
   * @param givenGroup The current group if available.
   * @return True if the group matches ths system option, otherwise false.
   */
  public isSystemMatch(group: Group, givenGroup?: Group): boolean
  {
    switch (this.system)
    {
      case System.METRIC:
        return group.system === System.METRIC || group.system === System.ANY;
      case System.US:
        return group.system === System.US || group.system === System.ANY;
      case System.NONE:
        return false;
      case System.ANY:
        return true;
      case System.GIVEN:
        return !givenGroup || group.baseUnit === givenGroup.baseUnit;
    }

    return false;
  }

  /**
   * Determines whether the given class matches the classes options on this
   * instance.
   *
   * @param parent The class to test.
   * @return True if the class matches the classes options, otherwise false.
   */
  public isClassMatch(parent: Class): boolean
  {
    if (this.onlyClasses)
    {
      return this.onlyClasses.indexOf( parent.name ) !== -1;
    }

    if (this.notClasses)
    {
      return this.notClasses.indexOf( parent.name ) === -1;
    }

    return true;
  }

  /**
   * Determines whether the given group matches the unit options on this
   * instance.
   *
   * @param group The group to test.
   * @return True if the group matches the unit options, otherwise false.
   */
  public isUnitMatch(group: Group): boolean
  {
    if (this.onlyUnits)
    {
      return this.onlyUnits.indexOf( group.unit ) !== -1;
    }

    if (this.notUnits)
    {
      return this.notUnits.indexOf( group.unit ) === -1;
    }

    return true;
  }

}
