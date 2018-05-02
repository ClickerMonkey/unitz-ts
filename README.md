# Unitz

A unit parser, converter, & calculator for TypeScript and JS.

```
// TypeScript
import { uz } from 'unitz';

// Javascript
var uz = Unitz.uz;

// Parsing
uz('2.5 cups'); // parses numbers
uz('1/2 in'); // parses fractions
uz('3 1/4'); // mixed fractions and unitless values
uz('mile'); // implicit values (1)
uz('4-5 seconds'); // parses ranges
uz('4s - 3min'); // parses ranges with mixed units
uz('2c, 4s, 23mi'); // mixed unit classes

// Transformations
uz('1.5 pints').normalize(); // = 3 cups: convert to unit in same class which is more human friendly
uz('1c, 1pt').compact(); // = 1.5 pt: join values in the same unit class together
uz('43in').expand(); // = 3 ft, 7 in: pull unit values of the same class apart to be more human friendly

// Operations
uz('1 pt').add('1 cup').normalize(); // = 3 cups
uz('1 pt').sub('1 cup').normalize(); // = 1 cup
uz('1 pt, 3 in').scale(2); // = 2 pt, 6 in
uz('1 pt, 3 in').scaleTo('6 c'); // = 3 pt, 9 in

// Convert
uz('1 - 2 gal').convert('c'); // = 16 - 32 c
uz('3 cup').conversions(); // = 3/16 gal, 3/4 qt, 1 1/2 pt, 3 c, 24 floz, 48 tbsp, 144 tsp

// Mutations
uz('3 cups').preferred(); // = 3 c: convert units to preferred
uz('-2 in, 4 mi, -2 - 2').positive(); // = 4 mi, 0 - 2: we only want positive
uz('-2 in, 4 mi, -2 - 2').negative(); // = -2 in, -2 - 0: we only want negative
uz('-2 in, 4 mi, 0 tacos').nonzero(); // = -2 in, 4 mi: we only want non-zero
uz('-2 in, 4 mi, -2 - 2').min(); // = -2 in, -2: we only the minimum values of a range
uz('-2 in, 4 mi, -2 - 2').max(); // = -2 in, 2: we only the maximum values of a range
uz('0.5 tsp').fractions(); // = 1/2 tsp: convert to fractions
uz('1/2 tsp').numbers(); // = 0.5 tsp: convert to numbers

// Sorting
uz('1 tsp, 1 pt, 4 gal').sort(); // = 4 gal, 1 pt, 1 tsp: sort values

// Dynamic
uz('1 loaf').add('4 loaves').normalize(); // = 5 loaves
```

### Customization

You can customize exactly how Unitz behaves.

```
// When preferred() is ran, use this unit
Unitz.Core.setPreferred( 'cup' );

// Set this unit group as common or uncommon
Unitz.Core.setCommon( 'cup', false ); // we don't use cups round these parts

// Set the denominators available for a unit group
Unitz.Core.setDenominators( 'cup', [2, 3, 4, 5, 6] );

// Add some units to an existing group
Unitz.Core.getGroup('cup').addUnits({
  'cupz': Unitz.Plurality.PLURAL
});

// Remove some units from an existing group
Unitz.Core.getGroup('c').removeUnits(['cup', 'cups']);

// Add my own class
Unitz.Core.addClass(new Class('Loaf', [
  {
    system: Unitz.System.ANY,
    common: true,
    unit: 'loaf',
    baseUnit: 'loaf',
    denominators: [2, 3, 4, 5, 6, 7, 8, 9, 10],
    units: {
      'loaf': Unitz.Plurality.SINGULAR,
      'loaf of bread': Unitz.Plurality.SINGULAR,
      'loafs': Unitz.Plurality.PLURAL,
      'loaves': Unitz.Plurality.PLURAL,
      'loaves of bread': Unitz.Plurality.PLURAL
    }
  }
]));

// To create dynamic groups Unitz looks at the first 3 characters to determine if two units are matches. You can override this by figuring out a value which can be used as a key.
Unitz.Core.getDynamicMatch = function(unit) {
  // use soundex instead of the first three characters. cup and kup are equal now!
  return soundex( unit );
};
```
