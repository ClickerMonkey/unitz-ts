
import { Functions as fn } from './Functions';
import { Core } from './Core';
import { Parse } from './Parse';
import { RangesInput, BaseInput } from './Types';
import { Range, RangeList, RangeMutator } from './Range';
import { Group } from './Group';
import { Transform, TransformInput } from './Transform';
import { Output, OutputInput } from './Output';
import { Sort, SortInput } from './Sort';
import { Value } from './Value';
import { Class, ClassGrouping } from './Class';


/**
 * Takes user input and returns a new instance of [Base].
 */
export function uz(input: RangesInput)
{
  return new Base(input);
}

/**
 * The main class which contains a list of ranges and the user input.
 */
export class Base
{

  /**
   * The input parsed to generate this instance or the input passed from the
   * parent instance when an operation was performed on it.
   */
  public input: RangesInput;

  /**
   * The list of ranges in this instance.
   */
  public ranges: RangeList;

  /**
   * Creates a new instance of Base given some user input to parse or an
   * existing list of ranges to use instead.
   *
   * @param input The input to parse if ranges is not provided.
   * @param ranges The already parsed ranges to use for this instance.
   */
  public constructor(input: RangesInput, ranges?: RangeList )
  {
    this.input = input;
    this.ranges = ranges || Parse.ranges( input, Core.getGroup );
  }

  /**
   * Scales the ranges in this instance by the given factor and returns a
   * new instance.
   *
   * *For example:*
   * ```javascript
   * uz('1c, 2.3m').scale(2); // '2c, 4.6m'
   * ```
   *
   * @param amount The factor to scale the ranges in this instance by.
   * @return A new instance.
   * @see [[Range.mul]]
   * @see [[Base.mutate]]
   */
  public scale(amount: number): Base
  {
    return this.mutate(r => r.mul( amount ));
  }

  // 1c, 3m SCALE TO 1/2c = 1/2c, 1.5m

  /**
   * Scales the ranges in this instance up to some value with a unit and returns
   * a new instance. Because this instance might contain ranges, a rangeDelta
   * can be specified to instruct on which value (min or max) to use when
   * calculating how much to scale by.
   *
   * *For example:*
   * ```javascript
   * uz('1m, 2 - 3c').scaleTo('6c'); // '2m, 4 - 6c'
   * uz('1m, 2 - 3c').scaleTo('6c', 0); // '3m, 6 - 9c'
   * uz('1m, 2 - 3c').scaleTo('6c', 0.5); // '2.4m, 4.8 - 6c'
   * ```
   *
   * @param unitValue A value & unit pair to scale the ranges in this instance to.
   * @param rangeDelta When this instance contains ranges this value instructs
   *  how the scale factor is calculated. A value of 0 means it looks at the
   *  minimum, 1 is the maximum, and 0.5 is the average.
   * @return A new instance.
   * @see [[Base.getScaleTo]]
   * @see [[Base.scale]]
   */
  public scaleTo(unitValue: string, rangeDelta: number = 1.0): Base
  {
    return this.scale( this.getScaleTo(unitValue, rangeDelta) );
  }

  /**
   * Changes the units used on each of the ranges in this instance to the
   * preferred unit for each group.
   *
   * *For example:*
   * ```javascript
   * uz('5 kilos').preferred(); // '5 kg'
   * ```
   *
   * @return A new instance.
   * @see [[Core.setPreferred]]
   * @see [[Range.preferred]]
   * @see [[Base.mutate]]
   */
  public preferred(): Base
  {
    return this.mutate(r => r.preferred());
  }

  /**
   * Drops negative ranges and modifies partially negative ranges so that all
   * values are greater than or equal to zero.
   *
   * *For example:*
   * ```javascript
   * uz('0c, 2tbsp, -4tbsp').positive(); // '0c, 2tbsp'
   * uz('-2 - 3 in').positive(); // '0 - 3in'
   * ```
   *
   * @return A new instance.
   * @see [[Range.positive]]
   * @see [[Base.mutate]]
   */
  public positive(): Base
  {
    return this.mutate(r => r.positive());
  }

  /**
   * Drops positive ranges and modifies partially positive ranges so that all
   * values are less than zero.
   *
   * *For example:*
   * ```javascript
   * uz('0c, 2tbsp, -4tbsp').negative(); // '-4tbsp'
   * uz('-2 - 3 in').negative(); // '-2 - 0in'
   * ```
   *
   * @return A new instance.
   * @see [[Range.negative]]
   * @see [[Base.mutate]]
   */
  public negative(): Base
  {
    return this.mutate(r => r.negative());
  }

  /**
   * Drops ranges that are equal to zero.
   *
   * *For example:*
   * ```javascript
   * uz('0c, 2tbsp').negative(); // '2tbsp'
   * ```
   *
   * @return A new instance.
   * @see [[Range.nonzero]]
   * @see [[Base.mutate]]
   */
  public nonzero(): Base
  {
    return this.mutate(r => r.nonzero());
  }

  /**
   * Converts each range to fractions if a denominator for the specified units
   * yields a fraction close enough to the original value.
   *
   * *For example:*
   * ```javascript
   * uz('1/2 cup').fractions(); // '1/2 cup'
   * uz('0.3cm').fractions(); // '3/10 cm'
   * uz('0.33 decades').fractions(); // '0.33 decades' closest is 3/10 but that's not close enough
   * ```
   *
   * @return A new instance.
   * @see [[Range.fractioned]]
   * @see [[Base.mutate]]
   */
  public fractions(): Base
  {
    return this.mutate(r => r.fractioned());
  }

  /**
   * Converts each range to numbers if they are fractions.
   *
   * *For example:*
   * ```javascript
   * uz('1/2 cup').fractions(); // '0.5 cup'
   * uz('0.3cm').fractions(); // '0.3 cm'
   * ```
   *
   * @return A new instance.
   * @see [[Range.numbered]]
   * @see [[Base.mutate]]
   */
  public numbers(): Base
  {
    return this.mutate(r => r.numbered());
  }

  // 1 - 3c = 3c
  public max(): Base
  {
    return this.hasRanges ? this.mutate(r => r.maxd()) : this;
  }

  // 1 - 3c = 1c
  public min(): Base
  {
    return this.hasRanges ? this.mutate(r => r.mind()) : this;
  }

  // 1.5pt = 3c
  public normalize(options?: TransformInput, forOutput?: OutputInput): Base
  {
    let output: Output = Core.globalOutput.extend( forOutput );
    let transform: Transform = Core.globalTransform.extend( options );

    return this.mutate(r => r.normalize( transform, output ));
  }

  // 1c, 1pt = 1.5pt
  public compact(options?: TransformInput): Base
  {
    let compacted: RangeList = [];
    let transform: Transform = Core.globalTransform.extend( options );
    let { classes, groupless } = this.groupByClass();

    for (let className in classes)
    {
      let entry = classes[ className ];
      let ranges: RangeList = entry.ranges;
      let parent: Class = entry.parent;
      let minGroupChosen: Group = <Group>null;
      let maxGroupChosen: Group = <Group>null;
      let minSum: number = 0;
      let maxSum: number = 0;

      // If the transformation options ignores this class, skip it.
      if (!transform.isClassMatch( parent ))
      {
        continue;
      }

      // Determine the smallest visible group we can use.
      parent.getVisibleGroups( transform, false, null, (group) =>
      {
        minGroupChosen = maxGroupChosen = group;
        return false;
      });

      // If we can't find one, then no groups are valid. Skip them.
      if (!minGroupChosen)
      {
        continue;
      }

      // For each range, sum up the minimums and maximums while also determining
      // the largest min & max that should be used to represent the sums.
      for (let i = 0; i < ranges.length; i++)
      {
        let range: Range = ranges[ i ];
        let minGroup: Group = range.min.group;
        let maxGroup: Group = range.max.group;

        if (minGroup.classScale > minGroupChosen.classScale && transform.isVisibleGroup( minGroup ))
        {
          if (i !== 0)
          {
            minSum = parent.convert( minSum, minGroupChosen, minGroup );
          }
          minGroupChosen = minGroup;
        }

        if (maxGroup.classScale > maxGroupChosen.classScale && transform.isVisibleGroup( maxGroup ))
        {
          if (i !== 0)
          {
            maxSum = parent.convert( maxSum, maxGroupChosen, maxGroup );
          }
          maxGroupChosen = maxGroup;
        }

        minSum += range.min.convertTo( minGroupChosen );
        maxSum += range.max.convertTo( maxGroupChosen );
      }

      let min: Value = Value.fromNumberForGroup( minSum, minGroupChosen );
      let max: Value = Value.fromNumberForGroup( maxSum, maxGroupChosen );

      compacted.push( new Range( min, max ) );
    }

    // If the transform options permit groupless results and there are ranges
    // without groups - sum them all.
    if (transform.groupless && groupless.length)
    {
      let minSum: Value = new Value(0, 0, 1, '', <Group>null);
      let maxSum: Value = new Value(0, 0, 1, '', <Group>null);

      for (let i = 0; i < groupless.length; i++)
      {
        minSum = minSum.add( groupless[ i ].min );
        maxSum = maxSum.add( groupless[ i ].max );
      }

      compacted.push( new Range( minSum, maxSum ) );
    }

    return new Base( this.input, compacted );
  }

  // 1.5pt = 1c, 1pt
  public expand(options?: TransformInput): Base
  {
    let transform: Transform = Core.globalTransform.extend( options );
    let compacted: Base = this.compact( transform );
    let { ranges } = compacted;
    let expanded: RangeList = [];

    for (let i = 0; i < ranges.length; i++)
    {
      let range: Range = ranges[ i ];
      let value: Value = transform.convertWithMax ? range.max : range.min;
      let valueGroup: Group = value.group;
      let valueSign: number = fn.sign( value.value );

      if (valueGroup)
      {
        valueGroup.matches(transform, true, (group) =>
        {
          if (!fn.isZero( value.value ))
          {
            let transformed = value.convertToValue(group);

            if (group.isBase)
            {
              value = value.zero();

              expanded.push( Range.fromFixed( transformed ) )
            }
            else if (fn.abs( transformed.value ) >= 1 && fn.sign( transformed.value) === valueSign)
            {
              let truncated: Value = transformed.truncated();

              value = value.sub( truncated.convertToValue( valueGroup ) );

              expanded.push( Range.fromFixed( truncated ) );
            }
          }
        });
      }
      else
      {
        expanded.push( range );
      }
    }

    return new Base( this.input, expanded );
  }

  public add(input: BaseInput, scale: number = 1): Base
  {
    return this.operate(input, (a, b) => a.add(b, scale), (a) => a.mul( scale ));
  }

  public sub(input: BaseInput, scale: number = 1): Base
  {
    return this.operate(input, (a, b) => a.sub(b, scale), (a) => a.mul( -scale ));
  }

  public operate(input: BaseInput,
    operate: (a: Range, b: Range) => Range,
    remainder: (a: Range) => Range): Base
  {
    let ranges: RangeList = this.ranges;
    let output: RangeList = [];

    let other: Base = Parse.base( input );
    let otherRanges: RangeList = other.ranges;
    let otherUsed: boolean[] = [];

    for (let i = 0; i < ranges.length; i++)
    {
      let range: Range = ranges[ i ];

      for (let k = 0; k < otherRanges.length; k++)
      {
        if (!otherUsed[ k ])
        {
          let otherRange: Range = otherRanges[ k ];

          if (range.isMatch( otherRange ))
          {
            range = operate( range, otherRange );
            otherUsed[ k ] = true;
          }
        }
      }

      output.push( range );
    }

    for (let k = 0; k < otherRanges.length; k++)
    {
      if (!otherUsed[ k ])
      {
        output.push( remainder( otherRanges[ k ] ) );
      }
    }

    return new Base( this.input, output );
  }

  public conversions(options?: TransformInput): Base
  {
    let transform: Transform = Core.globalTransform.extend( options );
    let compacted: Base = this.compact( options );
    let ranges: RangeList = compacted.ranges;
    let output: RangeList = [];

    for (let i = 0; i < ranges.length; i++)
    {
      let range: Range = ranges[ i ];
      let convert: Value = transform.convertWithMax ? range.max : range.min;

      convert.conversions(transform, false, (transformed) =>
      {
        let min: Value = transform.convertWithMax ? range.min.convertToValue( transformed.group ) : transformed;
        let max: Value = transform.convertWithMax ? transformed : range.max.convertToValue( transformed.group );

        if (min.value <= transform.max && max.value >= transform.min)
        {
          output.push( new Range( min, max ) );
        }
      });
    }

    return new Base( this.input, output );
  }

  public mutate(mutator: RangeMutator): Base
  {
    let ranges: RangeList = [];
    let source: RangeList = this.ranges;

    for (let i = 0; i < source.length; i++)
    {
      let mutated: Range = mutator( source[ i ] ) ;

      if (mutated)
      {
        ranges.push( mutated );
      }
    }

    return new Base( this.input, ranges );
  }

  public filter(options?: TransformInput): Base
  {
    let transform: Transform = Core.globalTransform.extend( options );
    let ranges: RangeList = this.ranges;
    let filtered: RangeList = [];

    for (let i = 0; i < ranges.length; i++)
    {
      let range: Range = ranges[ i ];
      let group: Group = transform.convertWithMax ? range.max.group : range.min.group;

      if ((group && transform.isVisibleGroup( group )) || (!group && transform.groupless))
      {
        filtered.push( range );
      }
    }

    return new Base( this.input, filtered );
  }

  public sort(options?: SortInput): Base
  {
    let sort: Sort = Core.globalSort.extend( options );
    let ranges: RangeList = this.ranges.slice();

    ranges.sort( sort.getSorter() );

    return new Base( this.input, ranges );
  }

  public groupByClass(): ClassGrouping
  {
    let ranges: RangeList = this.ranges;
    let classes = {};
    let groupless = [];

    for (let i = 0; i < ranges.length; i++)
    {
      let range: Range = ranges[ i ];

      if (range.min.group)
      {
        let parent: Class = range.min.group.parent;
        let entry = classes[ parent.name ];

        if (!entry)
        {
          entry = classes[ parent.name ] = {
            parent: parent,
            ranges: []
          };
        }

        entry.ranges.push( range );
      }
      else
      {
        groupless.push( range );
      }
    }

    return { classes, groupless };
  }

  public getScaleTo(unitValue: string, rangeDelta: number = 0.5): number
  {
    let to: Value = Parse.value( unitValue, Core.getGroup );

    if (!to.isValid)
    {
      return 0;
    }

    let converted: Range = this.convert( to.unit );

    if (!converted || !converted.isValid)
    {
      return 0;
    }

    let convertedValue: number = (converted.maximum - converted.minimum) * rangeDelta + converted.minimum;
    let scale: number = to.value / convertedValue;

    return scale;
  }

  public output(options?: OutputInput): string
  {
    let output: Output = Core.globalOutput.extend( options );

    return output.ranges( this.ranges );
  }

  public convert(unit: string): Range
  {
    let group: Group = Core.getGroup( unit );

    if (!group)
    {
      return null;
    }

    let parent: Class = group.parent;
    let ranges: RangeList = this.ranges;
    let min: Value = new Value(0, 0, 1, unit, group);
    let max: Value = new Value(0, 0, 1, unit, group);

    for (let i = 0; i < ranges.length; i++)
    {
      let range: Range = ranges[ i ];
      let rangeGroup: Group = range.min.group;

      if (rangeGroup && rangeGroup.parent === parent)
      {
        min = min.add( range.min.convertToValue( group ) );
        max = max.add( range.max.convertToValue( group ) );
      }
    }

    return new Range( min, max );
  }

  public each(iterate: (range: Range) => any, reverse: boolean = false): this
  {
    let ranges: RangeList = this.ranges;
    let start = reverse ? ranges.length - 1 : 0;
    let end = reverse ? -1 : ranges.length;
    let move = reverse ? -1 : 1;

    for (let i = start; i !== end; i += move)
    {
      if (iterate( ranges[ i ] ) === false)
      {
        break;
      }
    }

    return this;
  }

  public classes(): Class[]
  {
    let ranges: RangeList = this.ranges;
    let classMap = {};
    let classes: Class[] = [];

    for (let i = 0; i < ranges.length; i++)
    {
      let range: Range = ranges[ i ];
      let group: Group = range.min.group;

      if (group)
      {
        classMap[ group.parent.name ] = group.parent;
      }
    }

    for (let className in classMap)
    {
      classes.push( classMap[ className ] );
    }

    return classes;
  }

  public get hasRanges(): boolean
  {
    let ranges: RangeList = this.ranges;

    for (let i = 0; i < ranges.length; i++)
    {
      if (ranges[ i ].isRange)
      {
        return true;
      }
    }

    return false;
  }

  public get isValid(): boolean
  {
    let ranges: RangeList = this.ranges;

    for (let i = 0; i < ranges.length; i++)
    {
      if (!ranges[ i ].isValid)
      {
        return false;
      }
    }

    return true;
  }

}
