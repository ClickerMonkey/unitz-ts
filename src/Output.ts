
import { Value } from './Value';
import { Range, RangeList } from './Range';
import { Functions as fn } from './Functions';


/**
 * The enumeration which decides what unit to use when converting to a string.
 */
export enum OutputUnit
{

  /**
   * This value will keep units from being displayed.
   */
  NONE,

  /**
   * This value will ensure the unit exactly as the user entered it is used in
   * the output no matter whether the value's plurality matches the given
   * unit's plurality.
   *
   * @see [[Value.unit]]
   */
  GIVEN,

  /**
   * This value will force the short versions of the unit to be used.
   *
   * @see [[Group.singularShort]]
   * @see [[Group.pluralShort]]
   */
  SHORT,

  /**
   * This value will force the long versions of the unit to be used.
   *
   * @see [[Group.singularLong]]
   * @see [[Group.pluralLong]]
   */
  LONG
}

/**
 * The enumeration which decides how a value will be converted to a string.
 */
export enum OutputFormat
{

  /**
   * The format of the user input will be used if possible.
   */
  GIVEN,

  /**
   * All values will be displayed using their decimal representation.
   */
  NUMBER,

  /**
   * All values will be displayed as a mixed fraction if the value is a fraction.
   * A mixed fraction has a whole number followed by a fraction where the
   * numerator is smaller than the denominator.
   *
   * @see [[Value.isFraction]]
   */
  MIXED,

  /**
   * All values will be displayed as an improper fraction if the value is a
   * fraction and the numerator is larger than the denoninator.
   *
   * @see [[Value.isFraction]]
   */
  IMPROPER
}


/**
 * Developer input which can be passed to an Output constructor or all the
 * various functions that use the [[Output]] object.
 *
 * @see [[Base.output]]
 * @see [[Range.output]]
 * @see [[Value.output]]
 */
export interface OutputInput
{
  /**
   * @see [[Output.unit]]
   */
  unit?: OutputUnit;

  /**
   * @see [[Output.format]]
   */
  format?: OutputFormat;

  /**
   * @see [[Output.repeatUnit]]
   */
  repeatUnit?: boolean;

  /**
   * @see [[Output.unitSpacer]]
   */
  unitSpacer?: string;

  /**
   * @see [[Output.rangeSpacer]]
   */
  rangeSpacer?: string;

  /**
   * @see [[Output.fractionSpacer]]
   */
  fractionSpacer?: string;

  /**
   * @see [[Output.mixedSpacer]]
   */
  mixedSpacer?: string;

  /**
   * @see [[Output.delimiter]]
   */
  delimiter?: string;

  /**
   * @see [[Output.significant]]
   */
  significant?: number;
}


/**
 * The class which converts Unitz objects to strings.
 */
export class Output implements OutputInput
{

  /**
   * The option that specifies which units are chosen.
   */
  public unit: OutputUnit = OutputUnit.GIVEN;

  /**
   * The option that specifies how values are displayed.
   */
  public format: OutputFormat = OutputFormat.GIVEN;

  /**
   * Whether or not a unit should be displayed for the minimum and maximum of a
   * range when they have the same group.
   */
  public repeatUnit: boolean = false;

  /**
   * The spacing used between the value and the unit.
   */
  public unitSpacer: string = '';

  /**
   * The spacing used between the minimum and maximum values in a range.
   */
  public rangeSpacer: string = ' - ';

  /**
   * The spacing used to separate the numerator and denominator of a fraction.
   */
  public fractionSpacer: string = '/';

  /**
   * The spacing used to seperate a mixed number from the fraction.
   */
  public mixedSpacer: string = ' ';

  /**
   * The delimiter used to separate ranges.
   */
  public delimiter: string = ', ';

  /**
   * An option used to restrict numbers from displaying large decimal numbers.
   * When this value is set to -1 numbers are displayed fully. If the value is
   * set to zero all numbers will be truncated to the whole version.
   */
  public significant: number = -1;


  /**
   * Creates a new instance of Output with an optional set of options to
   * override the default values.
   *
   * @param input The options to apply to the this instance.
   */
  public constructor(input?: OutputInput)
  {
    if (fn.isDefined(input))
    {
      this.set( input );
    }
  }

  /**
   * Overrides values in this instance with ones specified in input.
   *
   * @param input The values to override.
   * @return The reference to this instance.
   */
  public set(input: OutputInput): this
  {
    this.unit = fn.coalesce( input.unit, this.unit );
    this.format = fn.coalesce( input.format, this.format );
    this.repeatUnit = fn.coalesce( input.repeatUnit, this.repeatUnit );
    this.unitSpacer = fn.coalesce( input.unitSpacer, this.unitSpacer );
    this.rangeSpacer = fn.coalesce( input.rangeSpacer, this.rangeSpacer );
    this.fractionSpacer = fn.coalesce( input.fractionSpacer, this.fractionSpacer );
    this.mixedSpacer = fn.coalesce( input.mixedSpacer, this.mixedSpacer );
    this.delimiter = fn.coalesce( input.delimiter, this.delimiter );
    this.significant = fn.coalesce( input.significant, this.significant );

    return this;
  }

  /**
   * Returns an output instance which matches the desired options. If no options
   * are specified the reference to this instance is returned. If the options
   * are already an instance of Output its returned. If options are specified
   * a new instance is created with the options of this instance, and the given
   * options applied with [[Output.set]].
   *
   * @param input The options desired.
   * @return An instance of this class which matches the desired options.
   */
  public extend(input?: OutputInput): Output
  {
    let extended: Output = this;

    if (fn.isDefined(input))
    {
      if (input instanceof Output)
      {
        extended = input;
      }
      else
      {
        extended = new Output( this );
        extended.set( input );
      }
    }

    return extended;
  }

  /**
   * Converts the list of ranges to a string. If a range is not valid it is
   * skipped.
   *
   * @param ranges The list of ranges to convert.
   * @return The string representation of the input.
   */
  public ranges(ranges: RangeList): string
  {
    let out = '';

    for (let i = 0; i < ranges.length; i++)
    {
      let range: Range = ranges[ i ];

      if (range.isValid)
      {
        if (out.length)
        {
          out += this.delimiter;
        }

        out += this.range( range );
      }
    }

    return out;
  }

  /**
   * Converts the range to a string.
   *
   * @param ranges The range to convert.
   * @return The string representation of the input.
   */
  public range(range: Range): string
  {
    let out = '';

    if (!range.isValid)
    {
      // nothing
    }
    else if (range.isFixed)
    {
      out += this.value( range.min );
    }
    else
    {
      let minUnit: boolean = this.repeatUnit || range.min.unit !== range.max.unit;

      out += this.value( range.min, minUnit );
      out += this.rangeSpacer;
      out += this.value( range.max );
    }

    return out;
  }

  /**
   * Converts the value to the string optionally showing or hiding the unit.
   *
   * @param value The value to convert.
   * @param showUnit Whether or not the unit should be added to the string.
   * @return The string representation of the input.
   */
  public value(value: Value, showUnit: boolean = true): string
  {
    let out = '';

    if (!value.isValid)
    {

    }
    else if (this.isFraction( value ))
    {
      if (this.isMixed( value ))
      {
        out += value.mixedWhole;
        out += this.mixedSpacer;
        out += value.mixedNum;
        out += this.fractionSpacer;
        out += value.den;
      }
      else
      {
        out += value.num;
        out += this.fractionSpacer;
        out += value.den;
      }
    }
    else
    {
      out += this.number( value.value );
    }

    if (showUnit && this.unit !== OutputUnit.NONE && value.isValid)
    {
      let group = value.group;

      out += this.unitSpacer;

      if (this.isLongUnit( value ))
      {
        out += fn.isSingular( value.value ) ? group.singularLong : group.pluralLong;
      }
      else if (this.isShortUnit( value ) || (group && group.dynamic))
      {
        out += fn.isSingular( value.value ) ? group.singularShort : group.pluralShort;
      }
      else
      {
        out += value.unit;
      }
    }

    return out;
  }

  /**
   * Converts the number to a string.
   *
   * @param x The number to convert.
   * @return The string representation of the input.
   */
  public number(x: number): string
  {
    let valueString: string = x + '';

    if (this.significant >= 0 && valueString !== '0')
    {
      let valueSignificant: string = x
        .toFixed(this.significant)
        .replace(/0*$/, '')
        .replace(/\.$/, '');

      return valueSignificant.length < valueString.length ? valueSignificant : valueString;
    }

    return valueString;
  }

  /**
   * Determines whether the value should be displayed as a fraction.
   *
   * @param value The value to look at.
   * @return True if the value should be displayed as a fraction, otherwise false.
   */
  public isFraction(value: Value): boolean
  {
    return value.isFraction && this.format !== OutputFormat.NUMBER;
  }

  /**
   * Determines whether the value should be displayed as a number.
   *
   * @param value The value to look at.
   * @return True if the value should be displayed as a number, otherwise false.
   */
  public isNumber(value: Value): boolean
  {
    return value.isValid && !this.isFraction( value );
  }

  /**
   * Determines whether the value should be displayed as a mixed fraction. This
   * assumes [[Output.isFraction]] was already checked and returned true.
   *
   * @param value The value to look at.
   * @return True if the value should be displayed as a mixed fraction, otherwise false.
   */
  public isMixed(value: Value): boolean
  {
    return value.mixedWhole !== 0 && this.format !== OutputFormat.IMPROPER;
  }

  /**
   * Determines whether the short unit should be displayed.
   *
   * @param value The value to look at.
   * @return True if the short unit should be displayed, otherwise false.
   */
  public isShortUnit(value: Value)
  {
    return value.group && this.unit === OutputUnit.SHORT;
  }

  /**
   * Determines whether the long unit should be displayed.
   *
   * @param value The value to look at.
   * @return True if the short unit should be displayed, otherwise false.
   */
  public isLongUnit(value: Value)
  {
    return value.group && this.unit === OutputUnit.LONG;
  }

}
