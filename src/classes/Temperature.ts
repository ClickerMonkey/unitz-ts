
import { System } from '../System';
import { Class } from '../Class';
import { Plurality } from '../Plurality';


export let Temperature = new Class('Temperature')
  .setBaseConversion('F', 'C', (x) => (x - 32) * 5 / 9)
  .setBaseConversion('C', 'F', (x) => (x * 9 / 5) + 32)
  .setBaseConversion('K', 'C', (x) => x - 273.15)
  .setBaseConversion('K', 'F', (x) => (x * 9 / 5) - 459.67)
  .setBaseConversion('C', 'K', (x) => x + 273.15)
  .setBaseConversion('F', 'K', (x) => (x + 459.67) * 5 / 9)
  .addGroups([
    {
      system: System.IMPERIAL,
      common: true,
      unit: 'F',
      baseUnit: 'F',
      denominators: [],
      units: {
        'F': Plurality.EITHER,
        '°F': Plurality.EITHER,
        'Fahrenheit': Plurality.EITHER
      }
    },
    { // TODO C interferes with cups
      system: System.METRIC,
      common: true,
      unit: '°C',
      baseUnit: '°C',
      denominators: [],
      units: {
        '°C': Plurality.EITHER,
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
        'kelvin': Plurality.EITHER,
        'kelvins': Plurality.EITHER
      }
    }
  ])
  .setClassScales()
