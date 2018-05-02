
import { System } from '../System';
import { Class } from '../Class';
import { Plurality } from '../Plurality';


/**
 * The Area class which contains the following groups:
 *
 * - square inch
 * - square foot
 * - square yard
 * - acre
 * - square mile
 * - square millimeter
 * - square centimeter
 * - square meter
 * - square kilometer
 */
export let Area = new Class('Area')
  .setBaseConversion('sqin', 'sqmm', (x) => x * 645.16)

  .setBaseConversion('sqmm', 'sqin', (x) => x * 0.00155)

  .addGroups([
    {
      system: System.IMPERIAL,
      common: true,
      unit: 'sqin',
      baseUnit: 'sqin',
      denominators: [2, 4, 8, 16],
      units: {
        'sqin': Plurality.EITHER,
        'sq. in': Plurality.EITHER,
        'sq in': Plurality.EITHER,
        'in2': Plurality.EITHER,
        'in^2': Plurality.EITHER,
        'in\xb2': Plurality.EITHER,
        'inch2': Plurality.SINGULAR,
        'inch^2': Plurality.SINGULAR,
        'inch\xb2': Plurality.SINGULAR,
        'inches2': Plurality.PLURAL,
        'inches^2': Plurality.PLURAL,
        'inches\xb2': Plurality.PLURAL,
        'square in': Plurality.EITHER,
        'square inch': Plurality.SINGULAR,
        'square inches': Plurality.PLURAL
      }
    },
    {
      system: System.IMPERIAL,
      common: true,
      unit: 'sqft',
      relativeUnit: 'sqin',
      relativeScale: 12 * 12,
      denominators: [2, 4, 8, 16],
      units: {
        'sqft': Plurality.EITHER,
        'sq. ft': Plurality.EITHER,
        'sq ft': Plurality.EITHER,
        'ft2': Plurality.EITHER,
        'ft^2': Plurality.EITHER,
        'ft\xb2': Plurality.EITHER,
        'foot2': Plurality.SINGULAR,
        'foot^2': Plurality.SINGULAR,
        'foot\xb2': Plurality.SINGULAR,
        'feet2': Plurality.PLURAL,
        'feet^2': Plurality.PLURAL,
        'feet\xb2': Plurality.PLURAL,
        'square ft': Plurality.EITHER,
        'square foot': Plurality.SINGULAR,
        'square feet': Plurality.PLURAL
      }
    },
    {
      system: System.IMPERIAL,
      unit: 'sqyd',
      relativeUnit: 'sqft',
      relativeScale: 3 * 3,
      denominators: [2, 3, 4, 8, 9, 16],
      units: {
        'sqyd': Plurality.EITHER,
        'sq. yd': Plurality.EITHER,
        'sq yd': Plurality.EITHER,
        'yd2': Plurality.EITHER,
        'yd^2': Plurality.EITHER,
        'yd\xb2': Plurality.EITHER,
        'yard2': Plurality.SINGULAR,
        'yard^2': Plurality.SINGULAR,
        'yard\xb2': Plurality.SINGULAR,
        'yards2': Plurality.PLURAL,
        'yards^2': Plurality.PLURAL,
        'yards\xb2': Plurality.PLURAL,
        'square yard': Plurality.SINGULAR,
        'square yards': Plurality.PLURAL
      }
    },
    {
      system: System.IMPERIAL,
      common: true,
      unit: 'acre',
      relativeUnit: 'sqyd',
      relativeScale: 4840,
      denominators: [2, 3, 4, 8, 10],
      units: {
        'acre': Plurality.EITHER,
        'acres': Plurality.PLURAL
      }
    },
    {
      system: System.IMPERIAL,
      common: true,
      unit: 'sqmi',
      relativeUnit: 'acre',
      relativeScale: 640,
      denominators: [2, 3, 4, 8, 10],
      units: {
        'sqmi': Plurality.EITHER,
        'sq. mi': Plurality.EITHER,
        'sq mi': Plurality.EITHER,
        'mi2': Plurality.EITHER,
        'mi^2': Plurality.EITHER,
        'mi\xb2': Plurality.EITHER,
        'mile2': Plurality.SINGULAR,
        'mile^2': Plurality.SINGULAR,
        'mile\xb2': Plurality.SINGULAR,
        'miles2': Plurality.PLURAL,
        'miles^2': Plurality.PLURAL,
        'miles\xb2': Plurality.PLURAL,
        'square mi': Plurality.EITHER,
        'square mile': Plurality.SINGULAR,
        'square miles': Plurality.PLURAL
      }
    },
    {
      system: System.METRIC,
      common: true,
      unit: 'sqmm',
      baseUnit: 'sqmm',
      denominators: [2, 4, 8, 16],
      units: {
        'sqmm': Plurality.EITHER,
        'sq. mm': Plurality.EITHER,
        'sq mm': Plurality.EITHER,
        'mm2': Plurality.EITHER,
        'mm^2': Plurality.EITHER,
        'mm\xb2': Plurality.EITHER,
        'millimeter2': Plurality.SINGULAR,
        'millimeter^2': Plurality.SINGULAR,
        'millimeter\xb2': Plurality.SINGULAR,
        'millimeters2': Plurality.PLURAL,
        'millimeters^2': Plurality.PLURAL,
        'millimeters\xb2': Plurality.PLURAL,
        'square mm': Plurality.EITHER,
        'square millimeter': Plurality.SINGULAR,
        'square millimeters': Plurality.PLURAL
      }
    },
    {
      system: System.METRIC,
      common: true,
      unit: 'sqcm',
      relativeUnit: 'sqmm',
      relativeScale: 100,
      denominators: [2, 4, 8, 16],
      units: {
        'sqcm': Plurality.EITHER,
        'sq. cm': Plurality.EITHER,
        'sq cm': Plurality.EITHER,
        'cm2': Plurality.EITHER,
        'cm^2': Plurality.EITHER,
        'cm\xb2': Plurality.EITHER,
        'centimeter2': Plurality.SINGULAR,
        'centimeter^2': Plurality.SINGULAR,
        'centimeter\xb2': Plurality.SINGULAR,
        'centimeters2': Plurality.PLURAL,
        'centimeters^2': Plurality.PLURAL,
        'centimeters\xb2': Plurality.PLURAL,
        'square cm': Plurality.EITHER,
        'square centimeter': Plurality.SINGULAR,
        'square centimeters': Plurality.PLURAL
      }
    },
    {
      system: System.METRIC,
      common: true,
      unit: 'sqm',
      relativeUnit: 'sqcm',
      relativeScale: 10000,
      denominators: [2, 4, 8, 16],
      units: {
        'sqm': Plurality.EITHER,
        'sq. m': Plurality.EITHER,
        'sq m': Plurality.EITHER,
        'm2': Plurality.EITHER,
        'm^2': Plurality.EITHER,
        'm\xb2': Plurality.EITHER,
        'meter2': Plurality.SINGULAR,
        'meter^2': Plurality.SINGULAR,
        'meter\xb2': Plurality.SINGULAR,
        'meters2': Plurality.PLURAL,
        'meters^2': Plurality.PLURAL,
        'meters\xb2': Plurality.PLURAL,
        'square m': Plurality.EITHER,
        'square meter': Plurality.SINGULAR,
        'square meters': Plurality.PLURAL
      }
    },
    {
      system: System.METRIC,
      common: true,
      unit: 'sqkm',
      relativeUnit: 'sqm',
      relativeScale: 1000000,
      denominators: [2, 4, 8, 16],
      units: {
        'sqkm': Plurality.EITHER,
        'sq. km': Plurality.EITHER,
        'sq km': Plurality.EITHER,
        'km2': Plurality.EITHER,
        'km^2': Plurality.EITHER,
        'km\xb2': Plurality.EITHER,
        'kilometer2': Plurality.SINGULAR,
        'kilometer^2': Plurality.SINGULAR,
        'kilometer\xb2': Plurality.SINGULAR,
        'kilometers2': Plurality.PLURAL,
        'kilometers^2': Plurality.PLURAL,
        'kilometers\xb2': Plurality.PLURAL,
        'square km': Plurality.EITHER,
        'square kilometer': Plurality.SINGULAR,
        'square kilometers': Plurality.PLURAL
      }
    }
  ])
  .setClassScales()
