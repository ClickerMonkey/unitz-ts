
import { System } from '../System';
import { Class } from '../Class';
import { Plurality } from '../Plurality';


/**
 * The Weight clas which contains the following groups.
 *
 * - milligram
 * - gram
 * - kilogram
 * - ounce
 * - pound
 * - ton
 */
export let Weight = new Class('Weight')
  .setBaseConversion('mg', 'oz', (x) => x * 0.000035274)

  .setBaseConversion('oz', 'mg', (x) => x * 28349.5)

  .addGroups([
    {
      system: System.METRIC,
      common: true,
      unit: 'mg',
      baseUnit: 'mg',
      denominators: [2, 10],
      units: {
        'mg': Plurality.EITHER,
        'milligram': Plurality.SINGULAR,
        'milligrams': Plurality.PLURAL
      }
    },
    {
      system: System.METRIC,
      common: true,
      unit: 'g',
      relativeUnit: 'mg',
      relativeScale: 1000,
      denominators: [2, 10, 1000],
      units: {
        'g': Plurality.EITHER,
        'gram': Plurality.SINGULAR,
        'grams': Plurality.PLURAL
      }
    },
    {
      system: System.METRIC,
      common: true,
      unit: 'kg',
      relativeUnit: 'g',
      relativeScale: 1000,
      denominators: [2, 10, 1000],
      units: {
        'kg': Plurality.EITHER,
        'kilo': Plurality.SINGULAR,
        'kilos': Plurality.PLURAL,
        'kilogram': Plurality.SINGULAR,
        'kilograms': Plurality.PLURAL
      }
    },
    {
      system: System.US,
      common: true,
      unit: 'oz',
      baseUnit: 'oz',
      denominators: [2, 3, 4, 16],
      units: {
        'oz': Plurality.EITHER,
        'ounce': Plurality.SINGULAR,
        'ounces': Plurality.PLURAL
      }
    },
    {
      system: System.US,
      common: true,
      unit: 'lb',
      relativeUnit: 'oz',
      relativeScale: 16,
      denominators: [2, 3, 4, 16],
      units: {
        'lb': Plurality.EITHER,
        'lbs': Plurality.PLURAL,
        'pound': Plurality.SINGULAR,
        'pounds': Plurality.PLURAL
      }
    },
    {
      system: System.US,
      common: true,
      unit: 'ton',
      relativeUnit: 'lb',
      relativeScale: 2000,
      denominators: [2, 3, 4, 10],
      units: {
        'ton': Plurality.EITHER,
        'tons': Plurality.PLURAL,
        'tonnes': Plurality.PLURAL
      }
    }
  ])
  .setClassScales();
