
import { Plurality } from './Plurality';
import { System } from './System';
import { Class, ClassMap } from './Class';
import { Output } from './Output';
import { Group, GroupMap, GroupList } from './Group';
import { Transform } from './Transform';
import { Sort } from './Sort';


export class Core
{

  public static classMap: ClassMap = {};
  public static classes: Class[] = [];
  public static unitToGroup: GroupMap = {};
  public static dynamicGroups: GroupList = [];
  public static dynamicMatches: GroupMap = {};
  public static dynamicMatchLength: number = 3;

  public static globalOutput: Output = new Output();
  public static globalTransform: Transform = new Transform();
  public static globalSort: Sort = new Sort();


  public static getGroup(unit: string): Group
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

    let dynamicUnit: string = Core.getDynamicMatch( unit );
    let dynamicGroup: Group = Core.dynamicMatches[ dynamicUnit ];

    if (dynamicGroup)
    {
      return Core.addDynamicUnit( unit, dynamicGroup );
    }

    return Core.newDynamicGroup( unit );
  }

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

  public static addClasses(...classes: Class[]): void
  {
    for (let i = 0; i < classes.length; i++)
    {
      this.addClass( classes[ i ] );
    }
  }

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

  public static getDynamicMatch(unit: string)
  {
    return unit.substring( 0, this.dynamicMatchLength ).toLowerCase();
  }

}
