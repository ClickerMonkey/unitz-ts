
import { System } from '../System';
import { Class } from '../Class';
import { Plurality } from '../Plurality';


/**
 * @hidden
 */
export let Volume = new Class('Volume')
  .setBaseConversion('tsp', 'ml', (x) => x * 4.92892)
  .setBaseConversion('tsp', 'mm3', (x) => x * 4928.92)
  .setBaseConversion('tsp', 'in3', (x) => x * 0.300781)

  .setBaseConversion('ml', 'tsp', (x) => x * 0.202884)
  .setBaseConversion('ml', 'mm3', (x) => x * 1000)
  .setBaseConversion('ml', 'in3', (x) => x * 0.0610237)

  .setBaseConversion('mm3', 'tsp', (x) => x * 0.000202884)
  .setBaseConversion('mm3', 'ml', (x) => x * 0.001)
  .setBaseConversion('mm3', 'in3', (x) => x * 0.0000610237)

  .setBaseConversion('in3', 'tsp', (x) => x * 3.32468)
  .setBaseConversion('in3', 'ml', (x) => x * 16.3871)
  .setBaseConversion('in3', 'mm3', (x) => x * 16387.1)

  .addGroups([
    {
      system: System.US,
      common: true,
      unit: 'tsp',
      baseUnit: 'tsp',
      denominators: [2, 3, 4],
      units: {
        'tsp': Plurality.EITHER,
        'ts': Plurality.EITHER,
        'tsps': Plurality.PLURAL,
        'teaspoon': Plurality.SINGULAR,
        'teaspoons': Plurality.PLURAL
      }
    },
    {
      system: System.US,
      common: true,
      unit: 'tbsp',
      relativeUnit: 'tsp',
      relativeScale: 3,
      denominators: [2, 3, 4],
      units: {
        'tbsp': Plurality.EITHER,
        'tbsps': Plurality.PLURAL,
        'tablespoon': Plurality.SINGULAR,
        'tablespoons': Plurality.PLURAL
      }
    },
    {
      system: System.US,
      common: true,
      unit: 'floz',
      relativeUnit: 'tsp',
      relativeScale: 6,
      denominators: [2, 3, 6],
      units: {
        // 'oz': Plurality.EITHER,
        // 'ounce': Plurality.SINGULAR,
        // 'ounces': Plurality.PLURAL,
        'floz': Plurality.EITHER,
        'fl-oz': Plurality.EITHER,
        'fl oz': Plurality.EITHER,
        'fluid ounce': Plurality.SINGULAR,
        'fluid ounces': Plurality.PLURAL,
        'fl. oz': Plurality.EITHER,
        'oz. fl': Plurality.EITHER,
        'oz fl': Plurality.EITHER
      }
    },
    {
      system: System.US,
      common: true,
      unit: 'c',
      relativeUnit: 'floz',
      relativeScale: 8,
      denominators: [2, 3, 4],
      units: {
        'c': Plurality.EITHER,
        'cup': Plurality.SINGULAR,
        'cups': Plurality.PLURAL
      }
    },
    {
      system: System.US,
      common: true,
      unit: 'pt',
      relativeUnit: 'c',
      relativeScale: 2,
      denominators: [2, 4, 8],
      units: {
        'pt': Plurality.EITHER,
        'pint': Plurality.SINGULAR,
        'pints': Plurality.PLURAL
      }
    },
    {
      system: System.US,
      common: true,
      unit: 'qt',
      relativeUnit: 'c',
      relativeScale: 4,
      denominators: [2, 4, 8],
      units: {
        'qt': Plurality.EITHER,
        'quart': Plurality.SINGULAR,
        'quarts': Plurality.PLURAL
      }
    },
    {
      system: System.US,
      common: true,
      unit: 'gal',
      relativeUnit: 'qt',
      relativeScale: 4,
      denominators: [2, 4, 8, 16],
      units: {
        'gal': Plurality.EITHER,
        'gallon': Plurality.SINGULAR,
        'gallons': Plurality.PLURAL,
        'gals': Plurality.PLURAL
      }
    },
    {
      system: System.METRIC,
      common: true,
      unit: 'ml',
      baseUnit: 'ml',
      denominators: [2, 10],
      units: {
        'ml': Plurality.EITHER,
        'millilitre': Plurality.SINGULAR,
        'millilitres': Plurality.PLURAL,
        'milliliter': Plurality.SINGULAR,
        'milliliters': Plurality.PLURAL
      }
    },
    {
      system: System.METRIC,
      unit: 'cl',
      relativeUnit: 'ml',
      relativeScale: 10,
      denominators: [10],
      units: {
        'cl': Plurality.EITHER,
        'centilitre': Plurality.SINGULAR,
        'centilitres': Plurality.PLURAL,
        'centiliter': Plurality.SINGULAR,
        'centiliters': Plurality.PLURAL
      }
    },
    {
      system: System.METRIC,
      common: true,
      unit: 'l',
      relativeUnit: 'ml',
      relativeScale: 1000,
      denominators: [2, 3, 4, 10],
      units: {
        'l': Plurality.EITHER,
        'litre': Plurality.SINGULAR,
        'litres': Plurality.PLURAL,
        'liter': Plurality.SINGULAR,
        'liters': Plurality.PLURAL
      }
    },
    {
      system: System.METRIC,
      unit: 'dl',
      relativeUnit: 'l',
      relativeScale: 10,
      denominators: [10, 100],
      units: {
        'dl': Plurality.EITHER,
        'decalitre': Plurality.SINGULAR,
        'decalitres': Plurality.PLURAL,
        'decaliter': Plurality.SINGULAR,
        'decaliters': Plurality.PLURAL
      }
    },
    {
      system: System.METRIC,
      common: true,
      unit: 'kl',
      relativeUnit: 'l',
      relativeScale: 1000,
      denominators: [10, 100],
      units: {
        'kl': Plurality.EITHER,
        'kilolitre': Plurality.SINGULAR,
        'kilolitres': Plurality.PLURAL,
        'kiloliter': Plurality.SINGULAR,
        'kiloliters': Plurality.PLURAL
      }
    },
    {
      system: System.METRIC,
      unit: 'mm3',
      baseUnit: 'mm3',
      denominators: [2, 4, 8],
      units: {
        'mm3': Plurality.EITHER,
        'mm^3': Plurality.EITHER,
        'mm\xb3': Plurality.EITHER,
        'millimeter3': Plurality.SINGULAR,
        'millimeter^3': Plurality.SINGULAR,
        'millimeter\xb3': Plurality.SINGULAR,
        'millimeters3': Plurality.PLURAL,
        'millimeters^3': Plurality.PLURAL,
        'millimeters\xb3': Plurality.PLURAL,
        'cubic mm': Plurality.EITHER,
        'cubic millimeter': Plurality.SINGULAR,
        'cubic millimeters': Plurality.PLURAL
      }
    },
    {
      system: System.METRIC,
      unit: 'cm3',
      relativeUnit: 'mm3',
      relativeScale: 1000,
      denominators: [2, 4, 8],
      units: {
        'cm3': Plurality.EITHER,
        'cm^3': Plurality.EITHER,
        'cm\xb3': Plurality.EITHER,
        'centimeter3': Plurality.SINGULAR,
        'centimeter^3': Plurality.SINGULAR,
        'centimeter\xb3': Plurality.SINGULAR,
        'centimeters3': Plurality.PLURAL,
        'centimeters^3': Plurality.PLURAL,
        'centimeters\xb3': Plurality.PLURAL,
        'cubic cm': Plurality.EITHER,
        'cubic centimeter': Plurality.SINGULAR,
        'cubic centimeters': Plurality.PLURAL
      }
    },
    {
      system: System.METRIC,
      unit: 'm3',
      relativeUnit: 'cm3',
      relativeScale: 1000000,
      denominators: [2, 4, 8],
      units: {
        'm3': Plurality.EITHER,
        'm^3': Plurality.EITHER,
        'm\xb3': Plurality.EITHER,
        'meter3': Plurality.SINGULAR,
        'meter^3': Plurality.SINGULAR,
        'meter\xb3': Plurality.SINGULAR,
        'meters3': Plurality.PLURAL,
        'meters^3': Plurality.PLURAL,
        'meters\xb3': Plurality.PLURAL,
        'cubic m': Plurality.EITHER,
        'cubic meter': Plurality.SINGULAR,
        'cubic meters': Plurality.PLURAL
      }
    },
    {
      system: System.METRIC,
      unit: 'km3',
      relativeUnit: 'm3',
      relativeScale: 1000000000,
      denominators: [2, 4, 8],
      units: {
        'km3': Plurality.EITHER,
        'km^3': Plurality.EITHER,
        'km\xb3': Plurality.EITHER,
        'kilometer3': Plurality.SINGULAR,
        'kilometer^3': Plurality.SINGULAR,
        'kilometer\xb3': Plurality.SINGULAR,
        'kilometers3': Plurality.PLURAL,
        'kilometers^3': Plurality.PLURAL,
        'kilometers\xb3': Plurality.PLURAL,
        'cubic km': Plurality.EITHER,
        'cubic kilometer': Plurality.SINGULAR,
        'cubic kilometers': Plurality.PLURAL
      }
    },
    {
      system: System.US,
      unit: 'in3',
      baseUnit: 'in3',
      denominators: [2, 4, 8],
      units: {
        'in3': Plurality.EITHER,
        'in^3': Plurality.EITHER,
        'in\xb3': Plurality.EITHER,
        'inch3': Plurality.SINGULAR,
        'inch^3': Plurality.SINGULAR,
        'inch\xb3': Plurality.SINGULAR,
        'inches3': Plurality.PLURAL,
        'inches^3': Plurality.PLURAL,
        'inches\xb3': Plurality.PLURAL,
        'cubic in': Plurality.EITHER,
        'cubic inch': Plurality.SINGULAR,
        'cubic inches': Plurality.PLURAL
      }
    },
    {
      system: System.METRIC,
      unit: 'ft3',
      relativeUnit: 'in3',
      relativeScale: 1728,
      denominators: [2, 4, 8],
      units: {
        'ft3': Plurality.EITHER,
        'ft^3': Plurality.EITHER,
        'ft\xb3': Plurality.EITHER,
        'foot3': Plurality.SINGULAR,
        'foot^3': Plurality.SINGULAR,
        'foot\xb3': Plurality.SINGULAR,
        'feet3': Plurality.PLURAL,
        'feet^3': Plurality.PLURAL,
        'feet\xb3': Plurality.PLURAL,
        'cubic ft': Plurality.EITHER,
        'cubic foot': Plurality.SINGULAR,
        'cubic feet': Plurality.PLURAL
      }
    },
    {
      system: System.METRIC,
      unit: 'yd3',
      relativeUnit: 'ft3',
      relativeScale: 27,
      denominators: [2, 4, 8],
      units: {
        'yd3': Plurality.EITHER,
        'yd^3': Plurality.EITHER,
        'yd\xb3': Plurality.EITHER,
        'yard3': Plurality.SINGULAR,
        'yard^3': Plurality.SINGULAR,
        'yard\xb3': Plurality.SINGULAR,
        'yards3': Plurality.PLURAL,
        'yards^3': Plurality.PLURAL,
        'yards\xb3': Plurality.PLURAL,
        'cubic yd': Plurality.EITHER,
        'cubic yard': Plurality.SINGULAR,
        'cubic yards': Plurality.PLURAL
      }
    }
  ])
  .setClassScales()
