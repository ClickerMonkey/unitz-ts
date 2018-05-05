
import { System } from '../System';
import { Class } from '../Class';
import { Plurality } from '../Plurality';


/**
 * @hidden
 */
export let Length = new Class('Length')
  .setBaseConversion('in', 'mm', (x) => x * 25.4)

  .setBaseConversion('mm', 'in', (x) => x * 0.039370)

  .addGroups([
    {
      system: System.US,
      common: true,
      unit: 'in',
      baseUnit: 'in',
      denominators: [2, 4, 8, 16, 32],
      units: {
        'in': Plurality.EITHER,
        'inch': Plurality.SINGULAR,
        'inches': Plurality.PLURAL,
        '"': Plurality.EITHER
      }
    },
    {
      system: System.US,
      common: true,
      unit: 'ft',
      relativeUnit: 'in',
      relativeScale: 12,
      denominators: [2],
      units: {
        'ft': Plurality.EITHER,
        'foot': Plurality.SINGULAR,
        'feet': Plurality.PLURAL,
        '\'': Plurality.EITHER
      }
    },
    {
      system: System.US,
      unit: 'yd',
      relativeUnit: 'ft',
      relativeScale: 3,
      denominators: [],
      units: {
        'yd': Plurality.EITHER,
        'yard': Plurality.SINGULAR,
        'yards': Plurality.PLURAL,
        'yds': Plurality.PLURAL
      }
    },
    {
      system: System.US,
      common: true,
      unit: 'mi',
      relativeUnit: 'ft',
      relativeScale: 5280,
      denominators: [2, 3, 4, 10],
      units: {
        'mi': Plurality.EITHER,
        'mile': Plurality.SINGULAR,
        'miles': Plurality.PLURAL
      }
    },
    {
      system: System.US,
      unit: 'league',
      relativeUnit: 'mi',
      relativeScale: 3,
      denominators: [2, 3, 4, 5, 6, 7, 8, 9, 10],
      units: {
        'league': Plurality.EITHER,
        'leagues': Plurality.PLURAL
      }
    },
    {
      system: System.METRIC,
      common: true,
      unit: 'mm',
      baseUnit: 'mm',
      denominators: [10],
      units: {
        'mm': Plurality.EITHER,
        'millimeter': Plurality.SINGULAR,
        'millimeters': Plurality.PLURAL
      }
    },
    {
      system: System.METRIC,
      common: true,
      unit: 'cm',
      relativeUnit: 'mm',
      relativeScale: 10,
      denominators: [2, 4, 10],
      units: {
        'cm': Plurality.EITHER,
        'centimeter': Plurality.SINGULAR,
        'centimeters': Plurality.PLURAL
      }
    },
    {
      system: System.METRIC,
      unit: 'dc',
      relativeUnit: 'cm',
      relativeScale: 10,
      denominators: [10],
      units: {
        'dc': Plurality.EITHER,
        'decimeter': Plurality.SINGULAR,
        'decimeters': Plurality.PLURAL
      }
    },
    {
      system: System.METRIC,
      common: true,
      unit: 'm',
      relativeUnit: 'cm',
      relativeScale: 100,
      denominators: [2, 3, 4, 5, 10],
      units: {
        'm': Plurality.EITHER,
        'meter': Plurality.SINGULAR,
        'meters': Plurality.PLURAL
      }
    },
    {
      system: System.METRIC,
      common: true,
      unit: 'km',
      relativeUnit: 'm',
      relativeScale: 1000,
      denominators: [2, 3, 4, 5, 6, 7, 8, 9, 10],
      units: {
        'km': Plurality.EITHER,
        'kilometer': Plurality.SINGULAR,
        'kilometers': Plurality.PLURAL
      }
    }
  ])
  .setClassScales()
