
import { getGroupForUnit, globalTransform, globalOutput } from './Global';
import { parseRanges, parseValue } from './Parse';
import { RangesInput } from './Types';
import { Range, RangeList, RangeMutator } from './Range';
import { Group } from './Group';
import { Output } from './Output';
import { Transform } from './Transform';
import { Value } from './Value';
import { Class } from './Class';


export function uz(input: RangesInput)
{
  return new Base(input);
}

export class Base
{

  public input: RangesInput;
  public ranges: RangeList;

  public constructor(input: RangesInput, ranges?: RangeList )
  {
    this.input = input;
    this.ranges = ranges || parseRanges( input, getGroupForUnit );
  }

  // 1c, 2.3m SCALE BY 2 = 2c, 4.6m
  public scale(amount: number): Base
  {
    return this.mutate(r => r.mul( amount ));
  }

  // 1c, 3m SCALE TO 1/2c = 1/2c, 1.5m
  public scaleTo(unitValue: string): Base
  {
    return this.scale( this.getScaleTo(unitValue) );
  }

  // 0c, 2tbsp, -4tbsp = 0c, 2tbsp
  public positive(): Base
  {
    return this.mutate(r => r.positive());
  }

  // 0c, 2tbsp, -4tbsp = -4tbsp
  public negative(): Base
  {
    return this.mutate(r => r.negative());
  }

  // 0c, 2tbsp = 2tbsp
  public nonzero(): Base
  {
    return this.mutate(r => r.nonzero());
  }

  // 1 - 3c = 3c
  public max(): Base
  {
    return this.mutate(r => r.maxd());
  }

  // 1 - 3c = 1c
  public min(): Base
  {
    return this.mutate(r => r.mind());
  }

  // 1.5pt = 3c
  public normalize(transformOverride?: Transform): Base
  {
    let transform: Transform = transformOverride || globalTransform;

    return this.mutate(r => r.normalize( transform ));
  }

  // 1c, 1pt = 1.5pt
  public compact(transformOverride?: Transform): Base
  {
    let compacted: RangeList = [];
    let transform: Transform = transformOverride || globalTransform;
    let { classes, groupless } = this.groupByClass();

    for (let className in classes)
    {
      let ranges: RangeList = classes[ className ];
      let minGroupChosen: Group = <Group>null;
      let maxGroupChosen: Group = <Group>null;
      let minSum: number = 0;
      let maxSum: number = 0;

      for (let i = 0; i < ranges.length; i++)
      {
        let range: Range = ranges[ i ];
        let minGroup = range.min.group;
        let maxGroup = range.max.group;

        if (!minGroupChosen || ((minGroup.common || !transform.common) && minGroup.baseScale > minGroupChosen.baseScale))
        {
          minGroupChosen = minGroup;
        }

        if (!maxGroupChosen || ((maxGroup.common || !transform.common) && maxGroup.baseScale > maxGroupChosen.baseScale))
        {
          maxGroupChosen = maxGroup;
        }

        minSum += range.min.scaled;
        maxSum += range.max.scaled;
      }

      let minScaled: number = minSum / minGroupChosen.baseScale;
      let maxScaled: number = maxSum / maxGroupChosen.baseScale;

      let min: Value = Value.fromNumberForGroup( minScaled, minGroupChosen );
      let max: Value = Value.fromNumberForGroup( maxScaled, maxGroupChosen );

      compacted.push( new Range( min, max ) );
    }

    if (groupless.length)
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
  public expand(transformOverride?: Transform): Base
  {
    let transform: Transform = transformOverride || globalTransform;
    let compacted: Base = this.compact( transform );
    let { ranges } = compacted;
    let expanded: RangeList = [];

    for (let i = 0; i < ranges.length; i++)
    {
      let range: Range = ranges[ i ];
      let min: Value = range.min;
      let minGroup: Group = min.group;

      if (minGroup)
      {
        minGroup.matches(transform, true, (group) =>
        {
          if (min.value > 0)
          {
            let transformed = min.convertTo(group);

            if (group.isBase)
            {
              expanded.push( Range.fromFixed( transformed ) )
            }
            else if (transformed.value > 1)
            {
              let floored: Value = transformed.floored();
              let scaled: number = group.baseScale / minGroup.baseScale;

              min = min.sub( floored, scaled );
              expanded.push( Range.fromFixed( floored ) );
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

  private groupByClass()
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

        classes[ parent.name ] = classes[ parent.name ] || [];
        classes[ parent.name ].push( range );
      }
      else
      {
        groupless.push( range );
      }
    }

    return { classes, groupless };
  }

  // TODO filter (out certain classes or groups)
  // TODO preferred () converts units to preferredUnits if available

  public transform(transform: Transform): Base
  {
    return this.mutate((r) =>
    {
      let min: Value = null;
      let max: Value = null;

      r.min.conversions(transform, false, (transformed) => {
        if (!min || transformed.asString.length < min.asString.length) {
          min = transformed;
        }
      });

      r.max.conversions(transform, false, (transformed) => {
        if (!max || transformed.asString.length < max.asString.length) {
          max = transformed;
        }
      });

      return new Range( min, max );
    });
  }

  public getScaleTo(unitValue: string): number
  {
    let to: Value = parseValue( unitValue, getGroupForUnit );
    let converted: Range = this.convert( to.unit );
    let scale: number = to.value / converted.average;

    return scale;
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

  public output(outputOverride?: Output): string
  {
    let output = outputOverride || globalOutput;

    return output.ranges( this.ranges );
  }

  public convert(unit: string): Range
  {
    let group: Group = getGroupForUnit( unit );

    if (!group)
    {
      return null;
    }

    let parent: Class = group.parent;
    let ranges: RangeList = this.ranges;
    let min: Value = new Value(0, 0, 1, group.unit, group);
    let max: Value = new Value(0, 0, 1, group.unit, group);

    for (let i = 0; i < ranges.length; i++)
    {
      let range: Range = ranges[ i ];
      let rangeGroup: Group = range.min.group;

      if (rangeGroup && rangeGroup.parent === parent)
      {
        let rangeScale: number = rangeGroup.baseScale / group.baseScale;

        min = min.add(range.min, rangeScale);
        max = max.add(range.max, rangeScale);
      }
    }

    return new Range( min, max );
  }

}
