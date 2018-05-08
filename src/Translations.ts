
import { Core } from './Core';
import { Parse } from './Parse';
import { Value } from './Value';


/**
 * A function which takes user input and a group factor and converts the user
 * input into another string to be parsed by the next translator or the
 * [[Parse]] class.
 *
 * @param x The input to parse.
 * @return The translated input or the original input.
 */
export type Translator = (x: string) => string;

/**
 * A function which provides a regular expression match, a group factory, and
 * a constant variable which was provided earlier to run a translation and
 * return the translated value.
 *
 * @param matches The regular expression group matches.
 * @param vars The constant variable passed to [[newRegexTranslator]].
 */
export type RegexTranslator = (matches: any[], vars?: any) => string;

/**
 * Creates a [[Translator]] which matches against a regular expression and when
 * the user input matches the regular expression another handler function is
 * called to translate the input. Optionally a constant value can be passed
 * to this function and down to the translator.
 *
 * @param regex The regular expression to match against user input.
 * @param handler The function to call if the input matched the expression.
 * @param vars The constant value to pass to the [[RegexTranslator]].
 * @return A [[Translator]] function.
 */
export function newRegexTranslator(regex: RegExp, handler: RegexTranslator, vars?: any): Translator
{
  return (x: string) =>
  {
    let matches = x.match( regex );

    if (matches)
    {
      x = handler( matches, vars );
    }

    return x;
  };
}

/**
 * The class which holds [[Translator]]s to manipulate user input into something
 * more understandable to the [[Parse]] class.
 */
export class Translations
{

  /**
   * An array of translators that have been registered.
   *
   * @see [[Translations.add]]
   */
  public static registered: Translator[] = [];

  /**
   * Adds all translators in the library to be available when parsing.
   */
  public static addDefaults()
  {
    this.add( this.Quantity );
    this.add( this.NumberWords );
    this.add( this.FractionOfNumber );
    this.add( this.AndFraction );
    this.add( this.QuantityValue );
  }

  /**
   * Adds the given translator to the list of registered translators. This
   * translator will be called last.
   *
   * @param translator The function which translates user input.

   */
  public static add(translator: Translator)
  {
    this.registered.push( translator );
  }

  /**
   * Translates the user input based on the registered translators and returns
   * the final string ready to be parsed.
   *
   * @param input The input to translate.
   * @return The translated string.
   */
  public static translate(input: string): string
  {
    let registered = this.registered;

    for (let i = 0; i < registered.length; i++)
    {
      input = registered[ i ]( input );
    }

    return input;
  }

  /**
   * A translator which takes a word which represents a number and converts it
   * the respective number.
   *
   * *Examples:*
   * - one [unit]
   * - dozen [unit]
   * - an eleven [unit]
   */
  public static NumberWords: Translator =
    newRegexTranslator(
      /^(an?\s+|)(one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|dozen|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|twenty|thirty|fourty|fifty|sixty|seventy|eighty|ninety)\s+(.*)/i,
      (matches, vars) => {
        let wordName: string = matches[ 2 ];
        let remaining: string = matches[ 3 ];

        return vars[ wordName ] + ' ' + remaining;
      }, {
        one: '1',
        two: '2',
        three: '3',
        four: '4',
        five: '5',
        six: '6',
        seven: '7',
        eight: '8',
        nine: '9',
        ten: '10',
        eleven: '11',
        twelve: '12',
        dozen: '12',
        thirteen: '13',
        fouteen: '14',
        fifteen: '15',
        sixteen: '16',
        seventeen: '17',
        eighteen: '18',
        nineteen: '19',
        twenty: '20',
        thirty: '30',
        fourty: '40',
        fifty: '50',
        sixty: '60',
        seventy: '70',
        eighty: '80',
        ninety: '90'
      }
    );

  /**
   * A translator which takes a word which represents a fraction and multiplies
   * it by the following value.
   *
   * *Examples:*
   * - a third of an acre
   * - half a dozen eggs
   * - a seventh of a mile
   */
  public static FractionOfNumber: Translator =
    newRegexTranslator(
      /^(an?\s+|one|)(half|third|fourth|fifth|sixth|seventh|eighth|nineth|tenth)\s+(a\s+|an\s+|of\s+an?\s+|of\s+)(.*)/i,
      (matches, vars) => {
        let remaining: string = matches[ 4 ];
        let parsed: Value = Parse.valueFromString( remaining );
        let fractionName: string = matches[ 2 ].toLowerCase();
        let fraction: Value = vars[ fractionName ];

        return parsed.mul( fraction ).output( Core.globalOutput );
      }, {
        half: Value.fromFraction(1, 2),
        third: Value.fromFraction(1, 3),
        fourth: Value.fromFraction(1, 4),
        fifth: Value.fromFraction(1, 5),
        sixth: Value.fromFraction(1, 6),
        seventh: Value.fromFraction(1, 7),
        eighth: Value.fromFraction(1, 8),
        nineth: Value.fromFraction(1, 9),
        tenth: Value.fromFraction(1, 10)
      }
    );

  /**
   * A translator which takes a word which represents a fraction and multiplies
   * it by the following value.
   *
   * *Examples:*
   * - 23 and a half eggs
   * - one and a half acres
   * - 23 and a third
   * - 12 and one fourth
   */
  public static AndFraction: Translator =
    newRegexTranslator(
      /^(.*)\s+and\s+(an?|one)\s+(half|third|fourth|fifth|sixth|seventh|eighth|nineth|tenth)\s*(.*)/i,
      (matches, vars) => {
        let prefix: string = matches[ 1 ];
        let units: string = matches[ 4 ];
        let value: Value = Parse.valueFromString( prefix + units );
        let fractionName: string = matches[ 3 ].toLowerCase();
        let fraction: Value = vars[ fractionName ];

        return value.add( fraction ).output( Core.globalOutput );
      }, {
        half: Value.fromFraction(1, 2),
        third: Value.fromFraction(1, 3),
        fourth: Value.fromFraction(1, 4),
        fifth: Value.fromFraction(1, 5),
        sixth: Value.fromFraction(1, 6),
        seventh: Value.fromFraction(1, 7),
        eighth: Value.fromFraction(1, 8),
        nineth: Value.fromFraction(1, 9),
        tenth: Value.fromFraction(1, 10)
      }
    );

  /**
   * A translator which takes the amount in parenthesis and moves it out.
   *
   * *Examples:*
   * - (one and a half) acre
   * - (12) tacos
   */
  public static Quantity: Translator =
    newRegexTranslator(
      /^\((.*)\)(.*)$/,
      (matches) => {
        let quantity: string = matches[ 1 ];
        let unit: string = matches[ 2 ];

        return quantity + unit;
      }
    );

  /**
   * A translator which takes the amount in parenthesis and moves it out.
   *
   * *Examples:*
   * - 1 (6 ounce)
   * - 5 (3 liter)
   */
  public static QuantityValue: Translator =
    newRegexTranslator(
      /^\s*((-?\d*)(\s+(\d+))?(\s*\/\s*(\d+)|\.(\d+)|))\s*\(\s*((-?\d*)(\s+(\d+))?(\s*\/\s*(\d+)|\.(\d+)|)\s*(.*))\s*\)\s*$/i,
      (matches) => {
        let quantityInput: string = matches[ 1 ];
        let quantity: Value = Parse.valueFromString( quantityInput );
        let alternativeInput: string = matches[ 8 ];
        let alternative: Value = Parse.valueFromString( alternativeInput );

        return alternative.mul( quantity ).output( Core.globalOutput );
      }
    );

}
