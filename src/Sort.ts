
import { Functions as fn } from './Functions';
import { Range } from './Range';


export enum SortType {
  MIN,
  MAX,
  AVERAGE
}

export interface SortInput {
  ascending?: boolean;
  type?: SortType;
  classes?: SortClassMap;
}

export type SortClassMap = { [className: string]: number };

export type Sorter = (a: Range, b: Range) => number;

export class Sort implements SortInput
{

  public ascending: boolean = false;
  public type: SortType = SortType.MAX;
  public classes: SortClassMap = {};

  public constructor(input?: SortInput)
  {
    if (fn.isDefined(input))
    {
      this.set( input );
    }
  }

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

  private getMinComparison(a: Range, b: Range): number
  {
    return fn.sign( a.min.classScaled - b.min.classScaled );
  }

  private getMaxComparison(a: Range, b: Range): number
  {
    return fn.sign( a.max.classScaled - b.max.classScaled );
  }

  private getAverageComparison(a: Range, b: Range): number
  {
    let avg: number = (a.min.classScaled + a.max.classScaled) * 0.5;
    let bvg: number = (b.min.classScaled + b.max.classScaled) * 0.5;

    return fn.sign( avg - bvg );
  }

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
