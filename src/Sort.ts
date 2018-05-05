
import { Functions as fn } from './Functions';
import { Range } from './Range';


/**
 * The enumeration which decides what value in a range should be used when
 * sorting between ranges with differing minimum and maximum values.
 */
export enum SortType
{

  /**
   * This value will use the minimum of the ranges to sort by.
   */
  MIN,

  /**
   * This value will use the maximum of the ranges to sort by.
   */
  MAX,

  /**
   * This value will use the average of the ranges to sort by.
   */
  AVERAGE
}

/**
 * Developer input which can be passed to a Sort constructor or the sort
 * function that uses the [[Sort]] object.
 *
 * @see [[Base.sort]]
 */
export interface SortInput
{
  /**
   * @see [[Sort.ascending]]
   */
  ascending?: boolean;

  /**
   * @see [[Sort.type]]
   */
  type?: SortType;

  /**
   * @see [[Sort.classes]]
   */
  classes?: SortClassMap;
}

/**
 * An object which specifies the priority between different class types.
 */
export type SortClassMap =
{

  /**
   * The priorities are numbers keyed by the class names.
   */
  [className: string]: number
};

/**
 * A function which takes two ranges and returns a number which discribes the
 * ordering relationship between the two ranges. If a < b then a negative value
 * is returned. If a > b then a positive value is returned. If a = b then zero
 * is returned.
 *
 * @param a The first range.
 * @param b The second range.
 * @return A number which describes the ordering between the two ranges.
 */
export type Sorter = (a: Range, b: Range) => number;


/**
 * The class which determines how to sort ranges.
 */
export class Sort implements SortInput
{

  /**
   * If the ranges should be in ascending order (small values followed by large
   * values). The default value is in descending order.
   */
  public ascending: boolean = false;

  /**
   * How ranges should be compared when the minimum and maximum values differ.
   */
  public type: SortType = SortType.MAX;

  /**
   * This object describes how ranges of different classes should be sorted by
   * given each class a priority. If a class is not defined here the priority
   * assumed is zero.
   */
  public classes: SortClassMap = {};

  /**
   * Creates a new instance of Sort with an optional set of options to override
   * the default values.
   *
   * @param input The options to apply to the new instance.
   */
  public constructor(input?: SortInput)
  {
    if (fn.isDefined(input))
    {
      this.set( input );
    }
  }

  /**
   * Overrides values in this instance ith ones specified in the input. If class
   * sorting options are specified they are merged into this instance as opposed
   * to a complete overwrite.
   *
   * @param input The values to override.
   * @return The reference to this instance.
   */
  public set(input: SortInput): this
  {
    this.ascending = fn.coalesce( input.ascending, this.ascending );
    this.type = fn.coalesce( input.type, this.type );

    if (fn.isDefined( input.classes ))
    {
      for (let className in input.classes)
      {
        this.classes[ className ] = input.classes[ className ];
      }
    }

    return this;
  }

  /**
   * Returns a Sort instance which matches the desired options. If no options
   * are specified the reference to this instance is returned. If the options
   * are already an instance of Sort its returned. If options are specified
   * a new instance is created with the options of this instance, and the given
   * options applied with [[Sort.set]].
   *
   * @param input The options desired.
   * @return An instance of this class which matches the desired options.
   */
  public extend(input?: SortInput): Sort
  {
    let extended: Sort = this;

    if (fn.isDefined(input))
    {
      if (input instanceof Sort)
      {
        extended = input;
      }
      else
      {
        extended = new Sort( this );
        extended.set( input );
      }
    }

    return extended;
  }

  /**
   * Returns a function which can sort ranges based on the options in this
   * instance. Comparison is first done by class, and followed by type.
   */
  public getSorter(): Sorter
  {
    return (a: Range, b: Range) =>
    {
      let d: number = this.getClassComparison(a, b);

      if (d === 0)
      {
        switch (this.type)
        {
          case SortType.MIN:
            d = this.getMinComparison(a, b);
            break;
          case SortType.MAX:
            d = this.getMaxComparison(a, b);
            break;
          case SortType.AVERAGE:
            d = this.getAverageComparison(a, b);
            break;
        }
      }

      return this.ascending ? d : -d;
    };
  }

  /**
   * A sort function between two ranges which look at the range minimums.
   *
   * @param a The first range.
   * @param b The second range.
   * @see [[Sorter]]
   */
  private getMinComparison(a: Range, b: Range): number
  {
    return fn.sign( a.min.classScaled - b.min.classScaled );
  }

  /**
   * A sort function between two ranges which look at the range maximums.
   *
   * @param a The first range.
   * @param b The second range.
   * @see [[Sorter]]
   */
  private getMaxComparison(a: Range, b: Range): number
  {
    return fn.sign( a.max.classScaled - b.max.classScaled );
  }

  /**
   * A sort function between two ranges which look at the range averages.
   *
   * @param a The first range.
   * @param b The second range.
   * @see [[Sorter]]
   */
  private getAverageComparison(a: Range, b: Range): number
  {
    let avg: number = (a.min.classScaled + a.max.classScaled) * 0.5;
    let bvg: number = (b.min.classScaled + b.max.classScaled) * 0.5;

    return fn.sign( avg - bvg );
  }

  /**
   * A sort function between two ranges which look at the range classes.
   *
   * @param a The first range.
   * @param b The second range.
   * @see [[Sorter]]
   */
  private getClassComparison(a: Range, b: Range): number
  {
    let ag: number = a.min.group ? 1 : -1;
    let bg: number = b.min.group ? 1 : -1;

    if (ag !== bg)
    {
      return ag - bg;
    }

    let ac: number = this.classes[ a.min.group.parent.name ] || 0;
    let bc: number = this.classes[ b.min.group.parent.name ] || 0;

    return ac - bc;
  }

}
