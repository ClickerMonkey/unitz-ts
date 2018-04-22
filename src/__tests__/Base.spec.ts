// import { describe, it, expect } from 'jest';
import { uz } from '../Base'
import { Transform } from '../Transform';
import { System } from '../System';
import { Output } from '../Output';
import { addDefaults } from '../classes/'

describe('Base', () => {
  addDefaults()

  it('parses ranges', () => {
    let u = uz('1 - 2 in^2, 23 1/4 lb')
    let r0 = u.ranges[0]
    let r1 = u.ranges[1]

    expect(u.ranges.length).toBe(2)

    expect(r0.min.value).toBe(1)
    expect(r0.min.unit).toBe('in^2')

    expect(r0.max.value).toBe(2)
    expect(r0.max.unit).toBe('in^2')

    expect(r1.min.value).toBe(23.25)
    expect(r1.min.unit).toBe('lb')
    expect(r1.min.num).toBe(23 * 4 + 1)
    expect(r1.min.den).toBe(4)
    expect(r1.min.mixedWhole).toBe(23)
    expect(r1.min.mixedNum).toBe(1)
  })

  it('scales', () => {
    let u = uz('1c, 1-2m')
    let u0 = u.ranges[0]
    let u1 = u.ranges[1]

    expect(u.ranges.length).toBe(2)

    expect(u0.min.value).toBe(1)
    expect(u0.min.unit).toBe('c')
    expect(u1.min.value).toBe(1)
    expect(u1.max.value).toBe(2)
    expect(u1.min.unit).toBe('m')
    expect(u1.max.unit).toBe('m')

    let s = u.scale(1.5)
    let s0 = s.ranges[0]
    let s1 = s.ranges[1]

    expect(s.ranges.length).toBe(2)

    expect(s0.min.value).toBe(1.5)
    expect(s0.min.unit).toBe('c')
    expect(s1.min.value).toBe(1.5)
    expect(s1.max.value).toBe(3.0)
    expect(s1.min.unit).toBe('m')
    expect(s1.max.unit).toBe('m')
  })

  it('positive', () => {
    let u = uz('-1c, 1-2m')
    let u0 = u.ranges[0]
    let u1 = u.ranges[1]

    expect(u.ranges.length).toBe(2)

    expect(u0.min.value).toBe(-1)
    expect(u0.min.unit).toBe('c')
    expect(u1.min.value).toBe(1)
    expect(u1.max.value).toBe(2)
    expect(u1.min.unit).toBe('m')
    expect(u1.max.unit).toBe('m')

    let s = u.positive()
    let s0 = s.ranges[0]

    expect(s.ranges.length).toBe(1)

    expect(s0.min.value).toBe(1)
    expect(s0.max.value).toBe(2)
    expect(s0.min.unit).toBe('m')
    expect(s0.max.unit).toBe('m')
  })

  it('half positive', () => {
    let u = uz('-1c, -1-2m')
    let u0 = u.ranges[0]
    let u1 = u.ranges[1]

    expect(u.ranges.length).toBe(2)

    expect(u0.min.value).toBe(-1)
    expect(u0.min.unit).toBe('c')
    expect(u1.min.value).toBe(-1)
    expect(u1.max.value).toBe(2)
    expect(u1.min.unit).toBe('m')
    expect(u1.max.unit).toBe('m')

    let s = u.positive()
    let s0 = s.ranges[0]

    expect(s.ranges.length).toBe(1)

    expect(s0.min.value).toBe(0)
    expect(s0.max.value).toBe(2)
    expect(s0.min.unit).toBe('m')
    expect(s0.max.unit).toBe('m')
  })

  it('max', () => {
    let u = uz('-1c, 1-2m')
    let u0 = u.ranges[0]
    let u1 = u.ranges[1]

    expect(u.ranges.length).toBe(2)

    expect(u0.min.value).toBe(-1)
    expect(u0.min.unit).toBe('c')
    expect(u1.min.value).toBe(1)
    expect(u1.max.value).toBe(2)
    expect(u1.min.unit).toBe('m')
    expect(u1.max.unit).toBe('m')

    let s = u.max()
    let s0 = s.ranges[0]
    let s1 = s.ranges[1]

    expect(s.ranges.length).toBe(2)

    expect(s0.min.value).toBe(-1)
    expect(s0.min.unit).toBe('c')
    expect(s1.min.value).toBe(2)
    expect(s1.min.unit).toBe('m')
  })

  it('compact', () => {

    let u = uz('6oz, 1lb')
    let u0 = u.ranges[0]
    let u1 = u.ranges[1]

    expect(u.ranges.length).toBe(2)

    expect(u0.min.value).toBe(6)
    expect(u0.min.unit).toBe('oz')
    expect(u1.min.value).toBe(1)
    expect(u1.min.unit).toBe('lb')

    let s = u.compact()
    let s0 = s.ranges[0]

    expect(s.ranges.length).toBe(1)

    expect(s.normalize().output()).toBe('22oz')
  })

  it('expand', () => {

    expect( uz('24oz').expand().output() ).toBe('1lb, 8oz');

    expect( uz('2345.4 lbs').expand().output() ).toBe('1ton, 345lb, 6.4oz');

  })

  it('normalize', () => {

    expect(uz('1.5 lb').normalize().output()).toBe('24oz');

    expect(uz('32oz').normalize().output()).toBe('2lb');

  })

  it('convert', () => {

    expect(uz('1.5 lb').convert('oz').value).toBe(24);

    expect(uz('1 - 2lb').convert('oz').maximum).toBe(32);
    expect(uz('1 - 2lb').convert('oz').minimum).toBe(16);

  })

  it('transform', () => {

    let OUT = new Output();
    OUT.significant = 1;

    let METRIC = new Transform();
    METRIC.system = System.METRIC;

    expect(uz('23oz').transform(METRIC).output(OUT)).toBe('652g');

    let IMPERIAL = new Transform();
    IMPERIAL.system = System.IMPERIAL;

    expect(uz('652g').transform(IMPERIAL).output(OUT)).toBe('23oz');
  })
})
