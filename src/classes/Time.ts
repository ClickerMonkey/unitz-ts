
import { System } from '../System';
import { Class } from '../Class';
import { Plurality } from '../Plurality';


export let Time = new Class('Time')
  .addGroups([
    {
      system: System.ANY,
      unit: 'ns',
      baseUnit: 'ns',
      denominators: [10, 100],
      units: {
        'ns': Plurality.EITHER,
        'nanosecond': Plurality.SINGULAR,
        'nanoseconds': Plurality.PLURAL,
        'nano': Plurality.SINGULAR,
        'nanos': Plurality.PLURAL
      }
    },
    {
      system: System.ANY,
      unit: 'us',
      relativeUnit: 'ns',
      relativeScale: 1000,
      denominators: [10, 100, 1000],
      units: {
        'us': Plurality.EITHER,
        'microsecond': Plurality.SINGULAR,
        'microseconds': Plurality.PLURAL,
        'micro': Plurality.SINGULAR,
        'micros': Plurality.PLURAL
      }
    },
    {
      system: System.ANY,
      common: true,
      unit: 'ms',
      relativeUnit: 'us',
      relativeScale: 1000,
      denominators: [10, 100, 1000],
      units: {
        'ms': Plurality.EITHER,
        'millisecond': Plurality.SINGULAR,
        'milliseconds': Plurality.PLURAL,
        'milli': Plurality.SINGULAR,
        'millis': Plurality.PLURAL
      }
    },
    {
      system: System.ANY,
      common: true,
      unit: 's',
      relativeUnit: 'ms',
      relativeScale: 1000,
      denominators: [10, 100, 1000],
      units: {
        's': Plurality.EITHER,
        'second': Plurality.SINGULAR,
        'seconds': Plurality.PLURAL,
        'sec': Plurality.SINGULAR,
        'secs': Plurality.PLURAL
      }
    },
    {
      system: System.ANY,
      common: true,
      unit: 'min',
      relativeUnit: 's',
      relativeScale: 60,
      denominators: [2, 3, 4, 60],
      units: {
        'min': Plurality.EITHER,
        'minute': Plurality.SINGULAR,
        'minutes': Plurality.PLURAL,
        'mins': Plurality.PLURAL
      }
    },
    {
      system: System.ANY,
      common: true,
      unit: 'hr',
      relativeUnit: 'min',
      relativeScale: 60,
      denominators: [2, 3, 4, 60],
      units: {
        'hr': Plurality.EITHER,
        'hour': Plurality.SINGULAR,
        'hours': Plurality.PLURAL,
        'hrs': Plurality.PLURAL
      }
    },
    {
      system: System.ANY,
      common: true,
      unit: 'day',
      relativeUnit: 'hr',
      relativeScale: 24,
      denominators: [2, 3, 4, 6, 24],
      units: {
        'day': Plurality.EITHER,
        'days': Plurality.PLURAL
      }
    },
    {
      system: System.ANY,
      common: true,
      unit: 'wk',
      relativeUnit: 'day',
      relativeScale: 7,
      denominators: [7],
      units: {
        'wk': Plurality.EITHER,
        'week': Plurality.SINGULAR,
        'weeks': Plurality.PLURAL,
        'wks': Plurality.PLURAL
      }
    },
    {
      system: System.ANY,
      common: true,
      unit: 'yr',
      relativeUnit: 'day',
      relativeScale: 365.2425,
      denominators: [2, 3, 4, 6, 12, 52],
      units: {
        'yr': Plurality.EITHER,
        'year': Plurality.SINGULAR,
        'years': Plurality.PLURAL,
        'yrs': Plurality.PLURAL
      }
    },
    {
      system: System.ANY,
      common: true,
      unit: 'score',
      relativeUnit: 'yr',
      relativeScale: 20,
      denominators: [20],
      units: {
        'score': Plurality.EITHER
      }
    }
  ])
  .setClassScales();
