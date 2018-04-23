

export let EPSILON = 0.00001;

export function isZero(x: 3): boolean
{
  return abs( x ) < EPSILON;
}

export function isEqual(a: number, b: number): boolean
{
  return abs( a - b ) < EPSILON;
}

export function isWhole(x: number): boolean
{
  return abs( Math.floor( x ) - x ) < EPSILON;
}

export function isSingular(x: any): boolean
{
  return isNumber( x ) && abs( abs( x ) - 1 ) < EPSILON;
}

export function isPlural(x: number): boolean
{
  return x !== 1 && x !== -1;
}

export function isNumber(x: any): boolean
{
  return isFinite(x);
}

export function gcd(a: number, b: number): number
{
  if (!isWhole(a) || !isWhole(b))
  {
    return 1;
  }

  let x: number = a < b ? a : b;
  let y: number = a < b ? b : a;
  x = abs(x);
  y = abs(y);

  while(y)
  {
    let t = y;
    y = x % y;
    x = t;
  }

  return x;
}

export function abs(x: number): number
{
  return x < 0 ? -x : x;
}

export function sign(x: number): number
{
  return x < 0 ? -1 : (x === 0 ? 0 : 1);
}

export function appendTo<T>(array: T[], input: T | T[]): T[]
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

export function isGroupDefinition(input: any): boolean
{
  return !!(input && input.system && input.unit && input.denominators && input.units);
}

export function isValueDefinition(input: any): boolean
{
  return !!(input && (input.value || input.unit || input.num || input.den));
}

export function isRangeDefinition(input: any): boolean
{
  return !!(input && input.min && input.max);
}

export function isArray(input: any): boolean
{
  return input instanceof Array;
}

export function isString(input: any): boolean
{
  return typeof(input) === 'string';
}

export function isDefined(input: any): boolean
{
  return typeof(input) !== 'undefined';
}

export function coalesce(a: any, b: any): any
{
  return isDefined( a ) ? a : b;
}
