
import { Functions as fn } from './Functions';
import { System } from './System';
import { Group } from './Group';
import { Class } from './Class';


export interface TransformInput {
  common?: boolean;
  system?: System;
  min?: number;
  max?: number;
  groupless?: boolean;
  convertWithMax?: boolean;
  onlyUnits?: string[];
  notUnits?: string[];
  onlyClasses?: string[];
  notClasses?: string[];
}

export class Transform implements TransformInput
{

  public common: boolean = true;
  public system: System = System.GIVEN;
  public min: number = -Number.MAX_VALUE;
  public max: number = Number.MAX_VALUE;
  public convertWithMax: boolean = true;
  public groupless: boolean = true;
  public onlyUnits: string[];
  public notUnits: string[];
  public onlyClasses: string[];
  public notClasses: string[];

  public constructor(input?: TransformInput)
  {
    if (fn.isDefined(input))
    {
      this.set( input );
    }
  }

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

  public isVisibleGroup(group: Group, givenGroup?: Group): boolean
  {
    return this.isCommonMatch( group ) &&
      this.isSystemMatch( group, givenGroup ) &&
      this.isUnitMatch( group ) &&
      this.isClassMatch( group.parent );
  }

  public isCommonMatch(group: Group): boolean
  {
    return !this.common || group.common;
  }

  public isSystemMatch(group: Group, givenGroup?: Group): boolean
  {
    switch (this.system)
    {
      case System.METRIC:
        return group.system === System.METRIC || group.system === System.ANY;
      case System.IMPERIAL:
        return group.system === System.IMPERIAL || group.system === System.ANY;
      case System.NONE:
        return false;
      case System.ANY:
        return true;
      case System.GIVEN:
        return !givenGroup || group.baseUnit === givenGroup.baseUnit;
    }

    return false;
  }

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
