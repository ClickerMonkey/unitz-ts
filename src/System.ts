

/**
 * An enumeration which specifies what system of measurement a unit belongs to
 * or specifies which system a user desires for output or conversions.
 *
 * @see [[Group]]
 * @see [[Transform]]
 */
export enum System
{

  /**
   * The Metrix System of Measurement.
   */
  METRIC,

  /**
   * The US "traditional systems of weights and measures". Also known as
   * "Standard", "Customary", or, erroneously: "Imperial", or "English".
   */
  US,

  /**
   * A value for groups when the unit does not belong to a system.
   */
  NONE,

  /**
   * A value for transforms which specify that the user or developer are looking
   * to get results in any system.
   */
  ANY,

  /**
   * A value for transforms which specify that the user or developer are looking
   * to get results in the same system that is already being used for a range.
   * If a current system cannot be determined then any system is returned.
   */
  GIVEN

}
