
import { } from 'jest';
import { parseInput } from '../Parse';
import { addDefaults } from '../classes/';

describe('Parse', () => {

  addDefaults();

  it('parseInput', () => {

    expect( parseInput('1c') ).toEqual( {num: NaN, den: NaN, unit: 'c', value: 1, valueNum: 1, valueDen: 1} );
    expect( parseInput('1/2 cups') ).toEqual( {num: NaN, den: 2, unit: 'cups', value: 0.5, valueNum: 1, valueDen: 2} );
    expect( parseInput('1 1/2 taco') ).toEqual( {num: 1, den: 2, unit: 'taco', value: 1.5, valueNum: 3, valueDen: 2} );
    expect( parseInput('cup') ).toEqual( {num: NaN, den: NaN, unit: 'cup', value: 1, valueNum: 1, valueDen: 1} );
    expect( parseInput('2') ).toEqual( {num: NaN, den: NaN, unit: '', value: 2, valueNum: 2, valueDen: 1} );
    expect( parseInput('2.3 meows') ).toEqual( {num: NaN, den: NaN, unit: 'meows', value: 2.3, valueNum: 2.3, valueDen: 1} );
    expect( parseInput('2.56m') ).toEqual( {num: NaN, den: NaN, unit: 'm', value: 2.56, valueNum: 2.56, valueDen: 1} );

  });

});
