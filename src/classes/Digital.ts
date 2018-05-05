
import { System } from '../System';
import { Class } from '../Class';
import { Plurality } from '../Plurality';


/**
 * @hidden
 */
export let Digital = new Class('Digital')
  .addGroups([
    {
      system: System.ANY,
      common: true,
      unit: 'b',
      baseUnit: 'b',
      denominators: [],
      units: {
        'b': Plurality.EITHER,
        'bit': Plurality.SINGULAR,
        'bits': Plurality.PLURAL
      }
    },
    {
      system: System.ANY,
      unit: 'nibble',
      relativeUnit: 'b',
      relativeScale: 4,
      denominators: [],
      units: {
        'nibble': Plurality.EITHER,
        'nibbles': Plurality.PLURAL,
        'nybble': Plurality.EITHER,
        'nyble': Plurality.EITHER,
        'half-byte': Plurality.EITHER,
        'half byte': Plurality.EITHER,
        'tetrade': Plurality.EITHER,
        'semi-octet': Plurality.EITHER,
        'quadbit': Plurality.EITHER,
        'quartet': Plurality.EITHER
      }
    },
    {
      system: System.ANY,
      common: true,
      unit: 'B',
      relativeUnit: 'b',
      relativeScale: 8,
      denominators: [2, 8],
      units: {
        'B': Plurality.EITHER,
        'byte': Plurality.SINGULAR,
        'bytes': Plurality.PLURAL
      }
    }
  ])

addDigitalUnits(
  Digital,
  'B',
  1000,
  [2, 4, 5, 10],
  'byte', 'bytes',
  [
    ['kB', 'kilo'],
    ['mB', 'mega'],
    ['gB', 'giga'],
    ['tB', 'tera'],
    ['pB', 'peta'],
    ['eB', 'exa'],
    ['zB', 'zetta'],
    ['yB', 'yotta']
  ]
);

addDigitalUnits(
  Digital,
  'B',
  1024,
  [2, 4, 8, 16],
  'byte', 'bytes',
  [
    ['KB', 'kibi'],
    ['MB', 'mebi'],
    ['GB', 'gibi'],
    ['TB', 'tebi'],
    ['PB', 'pebi'],
    ['EB', 'exbi'],
    ['ZB', 'zebi'],
    ['YB', 'yobi']
  ]
);

addDigitalUnits(
  Digital,
  'b',
  1000,
  [2, 4, 5, 10],
  'bit', 'bits',
  [
    ['kb', 'kilo', 'kbit'],
    ['mb', 'mega', 'mbit'],
    ['gb', 'giga', 'gbit'],
    ['tb', 'tera', 'tbit'],
    ['pb', 'peta', 'pbit'],
    ['eb', 'exa', 'ebit'],
    ['zb', 'zetta', 'zbit'],
    ['yb', 'yotta', 'ybit']
  ]
);

addDigitalUnits(
  Digital,
  'b',
  1024,
  [2, 4, 8, 16],
  'bit', 'bits',
  [
    ['kibit', 'kibi'],
    ['mibit', 'mebi'],
    ['gibit', 'gibi'],
    ['tibit', 'tebi'],
    ['pibit', 'pebi'],
    ['eibit', 'exbi'],
    ['zibit', 'zebi'],
    ['yibit', 'yobi']
  ]
);

Digital.setClassScales();


function addDigitalUnits(parent: Class, relativeTo: string, relativeScales: number, denominators: number[], suffixSingular: string, suffixPlural: string, unitAndPrefixes: string[][])
{
  for (let i = 0; i < unitAndPrefixes.length; i++)
  {
    let [unit, prefix, extra] = unitAndPrefixes[ i ];

    let units = {};
    units[ unit ] = Plurality.EITHER;
    units[ prefix + suffixSingular ] = Plurality.SINGULAR;
    units[ prefix + suffixPlural ] = Plurality.PLURAL;

    if (extra)
    {
      units[ extra ] = Plurality.EITHER;
    }

    parent.addGroup({
      system: System.ANY,
      common: true,
      unit: unit,
      relativeUnit: relativeTo,
      relativeScale: relativeScales,
      denominators: denominators,
      units: units
    });

    relativeTo = unit;
  }
}
