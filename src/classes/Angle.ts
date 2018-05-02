
import { System } from '../System';
import { Class } from '../Class';
import { Plurality } from '../Plurality';

let RAD2DEG = 180 / Math.PI;
let DEG2RAD = Math.PI / 180;

/**
 * The Angle class which contains the following groups.
 *
 * - degree
 * - radian
 */
export let Angle = new Class('Angle')
  .setBaseConversion('deg', 'rad', (x) => x * DEG2RAD)

  .setBaseConversion('rad', 'deg', (x) => x * RAD2DEG)

  .addGroups([
    {
      system: System.ANY,
      common: true,
      unit: 'deg',
      baseUnit: 'deg',
      denominators: [],
      units: {
        'deg': Plurality.EITHER,
        '\xb0': Plurality.EITHER,
        'degrees': Plurality.PLURAL,
        'degree': Plurality.SINGULAR
      }
    },
    {
      system: System.ANY,
      common: true,
      unit: 'rad',
      baseUnit: 'rad',
      denominators: [],
      units: {
        'rad': Plurality.EITHER,
        'radians': Plurality.PLURAL,
        'radian': Plurality.SINGULAR
      }
    }
  ])
  .setClassScales()
