
import { Class, ClassMap } from './Class';
import { Output } from './Output';
import { Group } from './Group';
import { Transform } from './Transform';


export let classMap: ClassMap = {};
export let classes: Class[] = [];
export let unitToClass: ClassMap = {};
export let globalOutput: Output = new Output();
export let globalTransform: Transform = new Transform();

export function getGroupForUnit(unit: string): Group | undefined
{
  let normalizedUnit: string = (unit || '').toLowerCase();
  let parent: Class = unitToClass[ normalizedUnit ];

  return parent ? parent.groupMap[ normalizedUnit ] : null;
}

export function addClass(parent: Class): void
{
  classMap[ parent.name ] = parent;
  classes.push( parent );

  for (let unit in parent.converters)
  {
    unitToClass[ unit ] = parent;
  }
}

export function addClasses(...classes: Class[]): void
{
  for (let i = 0; i < classes.length; i++)
  {
    addClass( classes[ i ] );
  }
}
