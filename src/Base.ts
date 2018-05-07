
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
   * @see [[Range.scale]]
   * @see [[Base.mutate]]
   */
  public scale(amount: number): Base
  {
    return this.mutate(r => r.scale( amount ));
  }

  /**
   * Scales the ranges in this instance by the given value and returns a
   * new instance.
   *
   * *For example:*
   * ```javascript
   * uz('1c, 3/5m').scale(Value.fromFraction(2, 3)); // '2/3c, 6/15m'
   * ```
   *
   * @param amount The value to scale the ranges in this instance by.
   * @return A new instance.
   * @see [[Range.mul]]
   * @see [[Base.mutate]]
   */
  public mul(amount: Value): Base
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

  /**
   * Flattens any ranges to their maximum values.
   *
   * *For example:*
   * ```javascript
   * uz('1 - 3c, 5m').max(); // '3c, 5m'
   * ```
   *
   * @return A new instance or this if this instance has no ranges.
   * @see [[Range.maxd]]
   * @see [[Base.mutate]]
   */
  public max(): Base
  {
    return this.hasRanges ? this.mutate(r => r.maxd()) : this;
  }

  /**
   * Flattens any ranges to their minimum values.
   *
   * *For example:*
   * ```javascript
   * uz('1 - 3c, 5m').max(); // '1c, 5m'
   * ```
   *
   * @return A new instance or this if this instance has no ranges.
   * @see [[Range.mind]]
   * @see [[Base.mutate]]
   */
  public min(): Base
  {
    return this.hasRanges ? this.mutate(r => r.mind()) : this;
  }

  /**
   * Converts each range to units that best represent the value.
   *
   * *For example:*
   * ```javascript
   * uz('1.5pt, 12in, 3.14159rad').normalize(); // '3c, 1ft, 180deg'
   * ```
   *
   * @param options Options to control which units and values are acceptable.
   * @param forOutput The output options that should be used to determine which
   *  value & unit is best.
   * @return A new instance.
   * @see [[Transform]]
   * @see [[Output]]
   * @see [[Core.isMoreNormal]]
   * @see [[Core.globalTransform]]
   * @see [[Core.globalOutput]]
   * @see [[Range.normalize]]
   * @see [[Base.mutate]]
   */
  public normalize(options?: TransformInput, forOutput?: OutputInput): Base
  {
    let output: Output = Core.globalOutput.extend( forOutput );
    let transform: Transform = Core.globalTransform.extend( options );

    return this.mutate(r => r.normalize( transform, output ));
  }

  /**
   * Joins all ranges of the same classes together and uses the largest unit
   * to represent the sum for the class.
   *
   * *For example:*
   * ```javascript
   * uz('1c, 1pt').compact(); // '1.5pt'
   * ```
   *
   * @param options Options to control which units and values are acceptable.
   * @return A new instance.
   * @see [[Transform]]
   * @see [[Core.globalTransform]]
   */
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

  /**
   * Joins all ranges of the same classes together and then separates them
   * into whole number ranges for better readability.
   *
   * *For example:*
   * ```javascript
   * uz('1.5pt').expand(); // '1pt, 1c'
   * uz('53in').expand(); // '4ft, 5in'
   * uz('2ft, 29in').expand(); // '4ft, 5in'
   * uz('6543mm').expand(); // '6 m, 54 cm, 3 mm'
   * ```
   *
   * @param options Options to control which units and values are acceptable.
   * @return A new instance.
   * @see [[Transform]]
   * @see [[Core.globalTransform]]
   */
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

  /**
   * Adds the ranges of this instance and the given input together. When the
   * ranges use the same units they are added together, otherwise they are
   * added to the end of the range list.
   *
   * *For example:*
   * ```javascript
   * uz('1pt').add('2pt, 1c'); // '3pt, 1c'
   * uz('1pt').add('2pt, 1c', 2); // '5pt, 2c'
   * ```
   *
   * @param input An instance or input which can be parsed into an instance.
   * @param scale A number to multiple the input by when adding it to this instance.
   * @return A new instance.
   * @see [[Base.operate]]
   * @see [[Range.add]]
   * @see [[Range.scale]]
   */
  public add(input: BaseInput, scale: number = 1): Base
  {
    return this.operate(input, (a, b) => a.add(b, scale), (a) => a.scale( scale ));
  }

  /**
   * Subtracts the given input from the ranges of this instance. When the ranges
   * use the same units they are subtracted, otherwise they are added to the
   * end of the range list and negated.
   *
   * *For example:*
   * ```javascript
   * uz('3pt').sub('2pt, 1c'); // '1pt, -1c'
   * uz('1pt').add('2pt, 1c', 2); // '-3pt, -2c'
   * ```
   *
   * @param input An instance or input which can be parsed into an instance.
   * @param scale A number to multiple the input by when subtracting it from this instance.
   * @return A new instance.
   * @see [[Base.operate]]
   * @see [[Range.sub]]
   * @see [[Range.scale]]
   */
  public sub(input: BaseInput, scale: number = 1): Base
  {
    return this.operate(input, (a, b) => a.sub(b, scale), (a) => a.scale( -scale ));
  }

  /**
   * Subtracts the given input from the ranges of this instance. When the ranges
   * use the same units they are subtracted, otherwise they are added to the
   * end of the range list and negated.
   *
   * *For example:*
   * ```javascript
   * uz('3pt').sub('2pt, 1c'); // '1pt, -1c'
   * uz('1pt').add('2pt, 1c', 2); // '-3pt, -2c'
   * ```
   *
   * @param input An instance or input which can be parsed into an instance.
   * @param operate A function to call when matching ranges are found and an
   *  operation should be performed between them. The range returned by this
   *  function ends up in the result.
   * @param operate.a The first range to operate on.
   * @param operate.b The second range to operate on.
   * @param remainder A function to call on a range that did not have a match
   *  in this instance where the range returned is added to the result.
   * @param remainder.a The remaining range to operate on.
   * @return A new instance.
   * @see [[Range.isMatch]]
   */
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

  /**
   * Joins all ranges of the same classes together and then calculates all
   * equivalent ranges for each range for each valid group according to the
   * given options.
   *
   * *For example:*
   * ```javascript
   * uz('1.5pt').conversions(); // '3/16gal, 3/4qt, 1 1/2pt, 3c, 24floz, 48tbsp, 144tsp'
   * uz('20celsius, 45deg'); // '68F, 20celsius, 45deg, 0.785rad'
   * ```
   *
   * @param options Options to control which units and values are acceptable.
   * @return A new instance.
   * @see [[Transform]]
   * @see [[Core.globalTransform]]
   * @see [[Value.conversions]]
   */
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

  /**
   * Executes the given function on each range in this instance and if the
   * function returns a valid range its added to the result.
   *
   * *For example:*
   * ```javascript
   * uz('1.5pt').mutate(r => r.scale(2)); // '3pt'
   * ```
   *
   * @param mutator The function which may return a range.
   * @return A new instance.
   */
  public mutate(mutator: RangeMutator): Base
  {
    let ranges: RangeList = [];
    let source: RangeList = this.ranges;

    for (let i = 0; i < source.length; i++)
    {
      let mutated: Range = mutator( source[ i ] ) ;

      if (mutated && mutated.isValid)
      {
        ranges.push( mutated );
      }
    }

    return new Base( this.input, ranges );
  }

  /**
   * Removes the ranges from this instance that aren't valid according to the
   * transform options provided taking into account the global options.
   *
   * *For example:*
   * ```javascript
   * uz('1in, 2m').filter({system: Unitz.System.METRIC}); // '2m'
   * ```
   *
   * @param options Options to control which units and values are acceptable.
   * @return A new instance.
   * @see [[Transform]]
   * @see [[Core.globalTransform]]
   * @see [[Transform.isValidRange]]
   */
  public filter(options?: TransformInput): Base
  {
    let transform: Transform = Core.globalTransform.extend( options );
    let ranges: RangeList = this.ranges;
    let filtered: RangeList = [];

    for (let i = 0; i < ranges.length; i++)
    {
      let range: Range = ranges[ i ];

      if (transform.isValidRange( range ))
      {
        filtered.push( range );
      }
    }

    return new Base( this.input, filtered );
  }

  /**
   * Sorts the ranges in this instance based on the options provided taking into
   * account the global options.
   *
   * *For example:*
   * ```javascript
   * uz('1in, 3ft, 1.3yd, 1m').sort(); // 1.3yd, 1m, 3ft, 1in
   * uz('1in, 3ft, 1.3yd, 1m').sort({ascending: true}); // 1in, 3ft, 1m, 1.3yd
   * uz('1-3cups, 2-2.5cups, 4in').sort({
   *  type: Unitz.SortType.MIN,
   *  classes: {
   *   Volume: 1,
   *   Length: 2
   *  }
   * }); // 4in, 2 - 2.5cups, 1 - 3cups
   * ```
   *
   * @param options Options to control how sorting is done.
   * @return A new instance.
   * @see [[Sort]]
   * @see [[Core.globalSort]]
   */
  public sort(options?: SortInput): Base
  {
    let sort: Sort = Core.globalSort.extend( options );
    let ranges: RangeList = this.ranges.slice();

    ranges.sort( sort.getSorter() );

    return new Base( this.input, ranges );
  }

  /**
   * Returns the ranges in this instance grouped by their class. All groupless
   * ranges are added to their own list.
   */
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

  /**
   * Calculates what this instance would need to be scaled by so that the given
   * value & unit pair is equal to the sum of ranges in this instance of the
   * same class. If there are no ranges with the same class then zero is
   * returned. If the sum of ranges with the same class results in an actual
   * range (where min != max) then you can specify how to pick a value from the
   * range with rangeDetla. A value of 0 uses the min, 1 uses the max, and 0.5
   * uses the average between them.
   *
   * *For example:*
   * ```javascript
   * uz('1m, 2 - 3c').getScaleTo('6c'); // 2
   * uz('1m, 2 - 3c').getScaleTo('6c', 0); // 3
   * uz('1m, 2 - 3c').getScaleTo('6c', 0.5); // 2.4
   * uz('1m, 2 - 3c').getScaleTo('45deg'); // 0
   * ```

   * @param unitValue A value & unit pair to scale the ranges in this instance to.
   * @param rangeDelta When this instance contains ranges this value instructs
   *  how the scale factor is calculated. A value of 0 means it looks at the
   *  minimum, 1 is the maximum, and 0.5 is the average.
   * @return A value to scale by or zero if this instance cannot match the input.
   * @see [[Base.convert]]
   * @see [[Parse.value]]
   */
  public getScaleTo(unitValue: string, rangeDelta: number = 1.0): number
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

  /**
   * Converts the ranges in this instance to a string with the given output
   * options taking into account the global options.
   *
   * @param options The options to override the global output options.
   * @return The string representation of this instance.
   * @see [[Output]]
   */
  public output(options?: OutputInput): string
  {
    let output: Output = Core.globalOutput.extend( options );

    return output.ranges( this.ranges );
  }

  /**
   * Converts the appropriate ranges in this instance into the desired unit
   * and returns their converted sum. If the given unit does not map to a group
   * then null is returned. If there are no ranges in this instance in the same
   * class then the range returned is equivalent to zero.
   *
   * *For example:*
   * ```javascript
   * uz('1in, 1m, 1ft').convert('cm'); // '133.02 cm'
   * ```
   *
   * @param unit The unit to calculate the sum of.
   * @return A new range which is the sum of ranges in the same class converted
   *  to the desired unit.
   * @see [[Core.getGroup]]
   * @see [[Range.isZero]]
   */
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

  /**
   * Iterates over each range in this instance in order or reversed and passes
   * each one to the given iterate function. If the iterate function returns
   * false the iteration will stop.
   *
   * @param iterate The function to invoke with each range and it's index.
   * @param iterate.range The current range being iterated.
   * @param iterate.index The index of the current range in this instance.
   * @param reverse Whether the iteration should be done forward or backward.
   * @return The reference to this instance.
   */
  public each(iterate: (range: Range, index: number) => any, reverse: boolean = false): this
  {
    let ranges: RangeList = this.ranges;
    let start = reverse ? ranges.length - 1 : 0;
    let end = reverse ? -1 : ranges.length;
    let move = reverse ? -1 : 1;

    for (let i = start; i !== end; i += move)
    {
      if (iterate( ranges[ i ], i ) === false)
      {
        break;
      }
    }

    return this;
  }

  /**
   * Returns an array of the classes represented in this instance. If there are
   * no classes in this instance then an empty array is returned.
   *
   * @return An array of the classes in this instance.
   */
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

  /**
   * Returns whether this instance has actual ranges. An actual range is where
   * the minimum and maximum values differ.
   *
   * @see [[Range.isRange]]
   */
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

  /**
   * Returns whether this instance only has valid ranges. If any of the ranges
   * in this instance are not valid false is returned, otherwise true.
   *
   * @see [[Range.isValid]]
   */
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

  /**
   * Returns the number of ranges in this instance.
   */
  public get length(): number
  {
    return this.ranges.length;
  }

  /**
   * Returns true if this instance has a single fixed value.
   *
   * @see [[Range.isFixed]]
   */
  public get isFixed(): boolean
  {
    return this.ranges.length === 1 && this.ranges[ 0 ].isFixed;
  }

  /**
   * Returns true if this instance has a single range.
   *
   * @see [[Range.isRange]]
   */
  public get isRange(): boolean
  {
    return this.ranges.length === 1 && this.ranges[ 0 ].isRange;
  }

}
