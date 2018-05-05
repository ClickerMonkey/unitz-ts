
import { Class } from './Class';
import { Core } from './Core';

import { Angle } from './classes/Angle';
import { Area } from './classes/Area';
import { Digital } from './classes/Digital';
import { Length } from './classes/Length';
import { Temperature } from './classes/Temperature';
import { Time } from './classes/Time';
import { Volume } from './classes/Volume';
import { Weight } from './classes/Weight';


/**
 * The class which keeps a reference to the [[Class]] instances available in
 * this library.
 */
export class Classes
{

  /**
   * The Angle class which contains the following groups.
   *
   * - degree
   * - radian
   */
  public static Angle: Class = Angle;

  /**
   * The Area class which contains the following groups:
   *
   * - square inch
   * - square foot
   * - square yard
   * - acre
   * - square mile
   * - square millimeter
   * - square centimeter
   * - square meter
   * - square kilometer
   */
  public static Area: Class = Area;

  /**
   * The Digital class which contains the following groups:
   *
   * - bit
   * - nibble
   * - byte
   * - kilo/mego/giga/tera/peta/exa/zetta/yotta byte
   * - kibi/mebi/gibi/tebi/pebi/exbi/zebi/yobi byte
   * - kilo/mego/giga/tera/peta/exa/zetta/yotta bit
   * - ki/mi/gi/ti/pi/ez/zi/yi bit
   */
  public static Digital: Class = Digital;

  /**
   * The Length class which contains the following groups.
   *
   * - inch
   * - foot
   * - yard
   * - mile
   * - league
   * - millimeter
   * - centimeter
   * - decimeter
   * - meter
   * - kilometer
   */
  public static Length: Class = Length;

  /**
   * The Temperature class which contains the following groups.
   *
   * - celsius
   * - kelvin
   * - fahrenheit
   */
  public static Temperature: Class = Temperature;

  /**
   * The Time class which contains the following groups.
   *
   * - nanosecond
   * - microsecond
   * - millisecond
   * - second
   * - hour
   * - day
   * - week
   * - year
   * - score
   * - decade
   * - biennium
   * - triennium
   * - quadrennium
   * - lustrum
   * - decade
   * - centry
   * - millennium
   */
  public static Time: Class = Time;

  /**
   * The Volume clas which contains the following groups.
   *
   * - teaspoon
   * - tablespoon
   * - fluid ounce
   * - cup
   * - pint
   * - quart
   * - gallon
   * - milliliter
   * - centiliter
   * - decaliter
   * - kiloliter
   * - cubic millimeter
   * - cubic centimeter
   * - cubic meter
   * - cubic kilometer
   * - cubic inch
   * - cubic foot
   * - cubic yard
   */
  public static Volume: Class = Volume;

  /**
   * The Weight clas which contains the following groups.
   *
   * - milligram
   * - gram
   * - kilogram
   * - ounce
   * - pound
   * - ton
   */
  public static Weight: Class = Weight;

  /**
   * Adds all classes in the library to be available when parsing units.
   */
  public static addDefaults()
  {
    Core.addClasses(
      Classes.Weight,
      Classes.Area,
      Classes.Time,
      Classes.Digital,
      Classes.Temperature,
      Classes.Angle,
      Classes.Volume,
      Classes.Length
    );
  }

}
