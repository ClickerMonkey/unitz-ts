// import { describe, it, expect } from 'jest';
import { Translations } from '../Translations';
import { Classes } from '../Classes';

describe('Translations', () =>
{

  Translations.addDefaults();
  Classes.addDefaults();

  let trans = (x: string) => {
    return Translations.translate( x );
  };

  it('NumberWords', () =>
  {
    expect( trans('one pound') ).toBe( '1 pound' );
    expect( trans('dozen tacos') ).toBe( '12 tacos' );
    expect( trans('an eleven meters') ).toBe( '11 meters' );
  })

  it('FractionOfNumber', () =>
  {
    expect( trans('a third of an acre') ).toBe( '1/3acre' );
    expect( trans('half a dozen eggs') ).toBe( '6eggs' );
    expect( trans('a seventh of a mile') ).toBe( '1/7mile' );
  })

  it('AndFraction', () =>
  {
    expect( trans('23 and a half eggs') ).toBe( '23 1/2eggs' );
    expect( trans('one and a half acres') ).toBe( '1 1/2acres' );
    expect( trans('23 and a third') ).toBe( '23 1/3' );
    expect( trans('12 and one fourth cups') ).toBe( '12 1/4cups' );
  })

  it('Quantity', () =>
  {
    expect( trans('(one and a half) acre') ).toBe( '1 1/2acre' );
    expect( trans('(12) tacos') ).toBe( '12 tacos' );
  })

  it('QuantityValue', () =>
  {
    expect( trans('1 (6 ounce)') ).toBe( '6ounce' );
    expect( trans('5 (3 liter)') ).toBe( '15liter' );
  })

})
