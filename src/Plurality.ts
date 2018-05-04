

/**
 * An enumeration which specifies whether a unit represents a singular value (1),
 * a plural value, or might represent either.
 */
export enum Plurality
{

  /**
   * The unit is only a singular representation.
   */
  SINGULAR,

  /**
   * The unit is only a plural representation.
   */
  PLURAL,

  /**
   * The unit can be used as singular and plural.
   */
  EITHER

}
