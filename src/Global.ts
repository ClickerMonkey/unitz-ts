
import { Plurality } from './Plurality';
import { System } from './System';
import { Class, ClassMap } from './Class';
import { Output } from './Output';
import { Group, GroupMap, GroupList } from './Group';
import { Transform } from './Transform';
import { Sort } from './Sort';


export let classMap: ClassMap = {};
export let classes: Class[] = [];
export let unitToGroup: GroupMap = {};
export let dynamicGroups: GroupList = [];
export let dynamicMatches: GroupMap = {};

export let globalOutput: Output = new Output();
export let globalTransform: Transform = new Transform();
export let globalSort: Sort = new Sort();


export function getGroup(unit: string): Group
{
  if (!unit)
  {
    return null;
  }

  let exactGroup: Group = unitToGroup[ unit ];

  if (exactGroup)
  {
    return exactGroup;
  }

  let normalizedUnit: string = unit.toLowerCase();
  let normalizedGroup: Group = unitToGroup[ normalizedUnit ];

  if (normalizedGroup)
  {
    return normalizedGroup;
  }

  let dynamicUnit: string = getDynamicMatch( unit );
  let dynamicGroup: Group = dynamicMatches[ dynamicUnit ];

  if (dynamicGroup)
  {
    return addDynamicUnit( unit, dynamicGroup );
  }

  return newDynamicGroup( unit );
}

export function addClass(parent: Class): void
{
  classMap[ parent.name ] = parent;
  classes.push( parent );

  let groups: GroupMap = parent.groupMap;

  for (let unit in groups)
  {
    unitToGroup[ unit ] = groups[ unit ];
  }
}

export function addClasses(...classes: Class[]): void
{
  for (let i = 0; i < classes.length; i++)
  {
    addClass( classes[ i ] );
  }
}

export function addDynamicUnit(unit: string, group: Group): Group
{
  group.units[ unit ] = Plurality.EITHER;

  let unitCount: number = 0;

  for (let groupUnit in group.units)
  {
    unitCount++;
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

  unitToGroup[ unit ] = group;
  unitToGroup[ unit.toLowerCase() ] = group;

  dynamicMatches[ getDynamicMatch( unit ) ] = group;

  return group;
}

export function newDynamicGroup(unit: string): Group
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

  addDynamicUnit( unit, group );

  dynamicGroups.push( group );

  return group;
}

export let dynamicMatchLength: number = 3;

export function getDynamicMatch(unit: string)
{
  return unit.substring( 0, dynamicMatchLength ).toLowerCase();
}
