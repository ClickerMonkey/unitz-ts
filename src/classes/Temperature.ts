
import { System } from '../System';
import { Class } from '../Class';
import { Plurality } from '../Plurality';

let _C_: string = '\xb0C';

export let Temperature = new Class('Temperature')
  .setBaseConversion('F', _C_, x => ((x - 32) * 5 / 9))
  .setBaseConversion(_C_, 'F', x => ((x * 9 / 5) + 32))
  .setBaseConversion('K', _C_, x => (x - 273.15))
  .setBaseConversion('K', 'F', x => ((x * 9 / 5) - 459.67))
  .setBaseConversion(_C_, 'K', x => (x + 273.15))
  .setBaseConversion('F', 'K', x => ((x + 459.67) * 5 / 9))
  .addGroups([
    {
      system: System.IMPERIAL,
      common: true,
      unit: 'F',
      baseUnit: 'F',
      denominators: [],
      units: {
        'F': Plurality.EITHER,
        '\xb0F': Plurality.EITHER,
        'Fahrenheit': Plurality.EITHER
      }
    },
    {
      system: System.METRIC,
      common: true,
      unit: _C_,
      baseUnit: _C_,
      denominators: [],
      units: {
        '\xb0C': Plurality.EITHER,
        'Celsius': Plurality.EITHER
      }
    },
    {
      system: System.METRIC,
      unit: 'K',
      baseUnit: 'K',
      denominators: [],
      units: {
        'K': Plurality.EITHER,
        'kelvin': Plurality.SINGULAR,
        'kelvins': Plurality.PLURAL
      }
    }
  ])
  .setClassScales()
