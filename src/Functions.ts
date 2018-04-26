

export class Functions
{

  public static EPSILON: number = 0.00001;

  public static isZero(x: number): boolean
  {
    return this.abs( x ) < this.EPSILON;
  }

  public static isEqual(a: number, b: number): boolean
  {
    return this.abs( a - b ) < this.EPSILON;
  }

  public static isWhole(x: number): boolean
  {
    return this.abs( Math.floor( x ) - x ) < this.EPSILON;
  }

  public static isSingular(x: any): boolean
  {
    return this.isNumber( x ) && this.abs( this.abs( x ) - 1 ) < this.EPSILON;
  }

  public static isPlural(x: number): boolean
  {
    return x !== 1 && x !== -1;
  }

  public static isNumber(x: any): boolean
  {
    return isFinite(x);
  }

  public static trim(x: string): string
  {
    return x ? x.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '') : x;
  }

  public static gcd(a: number, b: number): number
  {
    if (!this.isWhole(a) || !this.isWhole(b))
    {
      return 1;
    }

    let x: number = a < b ? a : b;
    let y: number = a < b ? b : a;
    x = this.abs(x);
    y = this.abs(y);

    while(y)
    {
      let t = y;
      y = x % y;
      x = t;
    }

    return x;
  }

  public static abs(x: number): number
  {
    return x < 0 ? -x : x;
  }

  public static sign(x: number): number
  {
    return x < 0 ? -1 : (x === 0 ? 0 : 1);
  }

  public static appendTo<T>(array: T[], input: T | T[]): T[]
  {
    if (input instanceof Array)
    {
      array.push.apply( array, input );
    }
    else if (input)
    {
      array.push( input );
    }

    return array;
  }

  public static isGroupDefinition(input: any): boolean
  {
    return !!(input && input.system && input.unit && input.denominators && input.units);
  }

  public static isValueDefinition(input: any): boolean
  {
    return !!(input && (input.value || input.unit || input.num || input.den));
  }

  public static isRangeDefinition(input: any): boolean
  {
    return !!(input && input.min && input.max);
  }

  public static isArray(input: any): boolean
  {
    return input instanceof Array;
  }

  public static isString(input: any): boolean
  {
    return typeof(input) === 'string';
  }

  public static isDefined(input: any): boolean
  {
    return typeof(input) !== 'undefined';
  }

  public static coalesce(a: any, b: any): any
  {
    return this.isDefined( a ) ? a : b;
  }

}
