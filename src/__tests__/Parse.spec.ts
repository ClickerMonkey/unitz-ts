
import { } from 'jest';
import { Parse } from '../Parse';
import { Classes } from '../Classes';
import { Rates } from '../Rates';

describe('Parse', () => {

  Classes.addDefaults();
  Rates.addDefaults();

  it('unit', () => {

    expect( Parse.unit('m/s')).toEqual({unit: 'm', rate: 's'} );
    expect( Parse.unit('mph')).toEqual({unit: 'miles', rate: 'hour'} );
    expect( Parse.unit('km. per hour')).toEqual({unit: 'km', rate: 'hour'} );
    expect( Parse.unit('kms./hr.')).toEqual({unit: 'kms', rate: 'hr'} );

  })

  it('input', () => {

    expect( Parse.input('1c') ).toEqual( {num: NaN, den: NaN, unit: 'c', rate: '', value: 1, valueNum: 1, valueDen: 1} );
    expect( Parse.input('1/2 cups') ).toEqual( {num: NaN, den: 2, unit: 'cups', rate: '', value: 0.5, valueNum: 1, valueDen: 2} );
    expect( Parse.input('1 1/2 taco') ).toEqual( {num: 1, den: 2, unit: 'taco', rate: '', value: 1.5, valueNum: 3, valueDen: 2} );
    expect( Parse.input('cup') ).toEqual( {num: NaN, den: NaN, unit: 'cup', rate: '', value: 1, valueNum: 1, valueDen: 1} );
    expect( Parse.input('2') ).toEqual( {num: NaN, den: NaN, unit: '', rate: '', value: 2, valueNum: 2, valueDen: 1} );
    expect( Parse.input('2.3 meows') ).toEqual( {num: NaN, den: NaN, unit: 'meows', rate: '', value: 2.3, valueNum: 2.3, valueDen: 1} );
    expect( Parse.input('2.56m') ).toEqual( {num: NaN, den: NaN, unit: 'm', rate: '', value: 2.56, valueNum: 2.56, valueDen: 1} );
    expect( Parse.input('20 m/s') ).toEqual( {num: NaN, den: NaN, unit: 'm', rate: 's', value: 20, valueNum: 20, valueDen: 1} );

  });

  it('range value', () => {

    expect( Parse.range({value: 200, unit: 'kg'}).value ).toEqual(200);

  });

});
