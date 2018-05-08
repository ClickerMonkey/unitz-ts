

/**
 * A class which stores rate abbreviation mappins to the respective unit and
 * rate unit.
 */
export interface Rate
{
  /**
   * The main unit changing by some rate.
   */
  unit: string;

  /**
   * The unit which decides the rate. This typically follows per or slash (/),
   * for example: `m/s` and `meters per second`.
   */
  rate: string;
}


/**
 * A map of [[Rate]]s by their abbreviations.
 */
export type RateMap = { [name: string]: Rate };


/**
 * The class which holds [[Rate]]s mapped by their abbreviations.
 */
export class Rates
{

  /**
   * An object of rates mapped by their abbreviation.
   *
   * @see [[Rates.add]]
   */
  public static registered: RateMap = {};

  /**
   * Adds all rates in the library to be available when parsing.
   */
  public static addDefaults()
  {
    this.add('miles', 'hour', ['mph']);
    this.add('nautical miles', 'hour', ['knot', 'knots']);
    this.add('kilometers', 'hour', ['kph', 'kmph', 'km. hr.', 'k.p.h.', 'k.m.p.h.', 'km:h']);
  }

  /**
   * Adds one or many rates given the unit, rate, and all abbreviations.
   *
   * @param unit The unit.
   * @param rate The rate unit.
   * @param names The list of abbreviations for this rate.
   */
  public static add(unit: string, rate: string, names: string[])
  {
    for (let i = 0; i < names.length; i++)
    {
      this.registered[ names[ i ].toLowerCase() ] = { unit, rate };
    }
  }

  /**
   * Gets the rate for the given input or `undefined` if none exists.
   *
   * @param input The input to find a rate for.
   * @return The rate mapped by the input, otherwise `undefined`.
   */
  public static get(input: string): Rate
  {
    return this.registered[ input.toLowerCase() ];
  }

}
