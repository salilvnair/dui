import { describe, it, expect } from 'vitest';
import {
  totalOf, sunburstLayout, flameLayout, donutLayout, arcPath,
  type HierarchyNode,
} from './hierarchy-layout';

const TAU = Math.PI * 2;

const tree: HierarchyNode = {
  name: 'root',
  children: [
    { name: 'a', children: [{ name: 'a1', value: 30 }, { name: 'a2', value: 30 }] },
    { name: 'b', value: 40 },
  ],
};

describe('totalOf', () => {
  it('sums a leaf to its own value', () => {
    expect(totalOf({ name: 'x', value: 7 })).toBe(7);
  });

  it('sums a parent from its children', () => {
    expect(totalOf(tree)).toBe(100);
  });

  it('ignores a parent\'s own value rather than adding it', () => {
    // Adding both is how a chart ends up with slices exceeding the circle:
    // every level double-counts and the error compounds with depth.
    const node: HierarchyNode = { name: 'p', value: 999, children: [{ name: 'c', value: 10 }] };
    expect(totalOf(node)).toBe(10);
  });

  it('treats a negative value as zero rather than subtracting', () => {
    expect(totalOf({ name: 'x', value: -5 })).toBe(0);
  });
});

describe('sunburstLayout', () => {
  const slices = sunburstLayout(tree);

  it('does not emit the root — it is the hole in the middle', () => {
    expect(slices.every(s => s.depth >= 1)).toBe(true);
    expect(slices.some(s => s.name === 'root')).toBe(false);
  });

  it('fills the circle at the first ring', () => {
    const ring = slices.filter(s => s.depth === 1);
    const covered = ring.reduce((t, s) => t + (s.endAngle - s.startAngle), 0);
    expect(covered).toBeCloseTo(TAU, 9);
  });

  it('covers only the parents that HAVE children at deeper rings', () => {
    // `b` is a leaf, so the second ring covers `a`'s 60% and no more. A ring
    // that always summed to a full circle would mean a leaf was being given
    // phantom children to fill the gap.
    const ring = slices.filter(s => s.depth === 2);
    const covered = ring.reduce((t, s) => t + (s.endAngle - s.startAngle), 0);
    expect(covered).toBeCloseTo(TAU * 0.6, 9);
  });

  it('sizes a slice by its share of its parent', () => {
    const a = slices.find(s => s.name === 'a')!;
    const b = slices.find(s => s.name === 'b')!;
    expect(a.endAngle - a.startAngle).toBeCloseTo(TAU * 0.6, 9);
    expect(b.endAngle - b.startAngle).toBeCloseTo(TAU * 0.4, 9);
  });

  it('nests children inside their parent\'s arc', () => {
    const a = slices.find(s => s.name === 'a')!;
    for (const child of slices.filter(s => s.name === 'a1' || s.name === 'a2')) {
      expect(child.startAngle).toBeGreaterThanOrEqual(a.startAngle - 1e-9);
      expect(child.endAngle).toBeLessThanOrEqual(a.endAngle + 1e-9);
    }
  });

  it('leaves no gap or overlap between siblings', () => {
    const atDepth = slices.filter(s => s.depth === 1).sort((x, y) => x.startAngle - y.startAngle);
    for (let i = 1; i < atDepth.length; i++) {
      expect(atDepth[i].startAngle).toBeCloseTo(atDepth[i - 1].endAngle, 9);
    }
  });

  it('reports share as a fraction of the whole, not of the parent', () => {
    const a1 = slices.find(s => s.name === 'a1')!;
    expect(a1.share).toBeCloseTo(0.3, 9);
  });

  it('stops at maxDepth instead of recursing forever', () => {
    const deep: HierarchyNode = { name: 'r', children: [{ name: 'x', value: 1 }] };
    let cur = deep;
    for (let i = 0; i < 50; i++) {
      cur = { name: `d${i}`, children: [cur] };
    }
    const out = sunburstLayout(cur, { maxDepth: 3 });
    expect(Math.max(...out.map(s => s.depth))).toBeLessThanOrEqual(3);
  });

  it('drops slivers without stretching their neighbours', () => {
    const wide: HierarchyNode = {
      name: 'r',
      children: [{ name: 'big', value: 999 }, { name: 'sliver', value: 1 }],
    };
    const out = sunburstLayout(wide, { minShare: 0.01 });
    expect(out.map(s => s.name)).toEqual(['big']);
    // The survivor keeps its true share — 999/1000, not 100%.
    expect(out[0].share).toBeCloseTo(0.999, 6);
  });

  it('returns nothing for an empty tree rather than dividing by zero', () => {
    expect(sunburstLayout({ name: 'r', children: [] })).toEqual([]);
    expect(sunburstLayout({ name: 'r', value: 0 })).toEqual([]);
  });
});

describe('flameLayout', () => {
  const cells = flameLayout(tree);

  it('emits the root, because it is the base the graph stands on', () => {
    expect(cells[0]).toMatchObject({ name: 'root', depth: 0, x: 0, width: 1 });
  });

  it('fills the base and the first row exactly', () => {
    for (const depth of [0, 1]) {
      const row = cells.filter(c => c.depth === depth);
      const covered = row.reduce((t, c) => t + c.width, 0);
      expect(covered).toBeCloseTo(1, 9);
    }
  });

  it('leaves the column under a leaf empty, rather than inventing a child', () => {
    // `b` is a leaf holding 40%, so row 2 covers the other 60% and stops.
    const row = cells.filter(c => c.depth === 2);
    expect(row.reduce((t, c) => t + c.width, 0)).toBeCloseTo(0.6, 9);
  });

  it('places children within their parent', () => {
    const a = cells.find(c => c.name === 'a')!;
    for (const child of cells.filter(c => c.name === 'a1' || c.name === 'a2')) {
      expect(child.x).toBeGreaterThanOrEqual(a.x - 1e-9);
      expect(child.x + child.width).toBeLessThanOrEqual(a.x + a.width + 1e-9);
    }
  });

  it('keeps the given order, because for a stack the order is the meaning', () => {
    const row = cells.filter(c => c.depth === 1);
    expect(row.map(c => c.name)).toEqual(['a', 'b']);
  });

  it('drops cells below a pixel rather than drawing invisible rectangles', () => {
    const wide: HierarchyNode = {
      name: 'r',
      children: [{ name: 'big', value: 10_000 }, { name: 'hair', value: 1 }],
    };
    const out = flameLayout(wide, { minWidth: 0.01 });
    expect(out.map(c => c.name)).toEqual(['r', 'big']);
  });
});

describe('donutLayout', () => {
  it('fills the circle', () => {
    const out = donutLayout([{ name: 'a', value: 3 }, { name: 'b', value: 1 }]);
    const covered = out.reduce((t, s) => t + (s.endAngle - s.startAngle), 0);
    expect(covered).toBeCloseTo(TAU, 9);
  });

  it('sorts biggest first', () => {
    const out = donutLayout([{ name: 'small', value: 1 }, { name: 'big', value: 9 }]);
    expect(out.map(s => s.name)).toEqual(['big', 'small']);
  });

  /*
    Unlike the sunburst this gathers its tail. A flat breakdown of a whole is
    read as a whole, so a missing wedge reads as a bug rather than a decision.
  */
  it('rolls the tail into a named slice rather than dropping it', () => {
    const items = Array.from({ length: 12 }, (_, i) => ({ name: `c${i}`, value: 12 - i }));
    const out = donutLayout(items, { maxSlices: 3 });
    expect(out.length).toBe(4);
    expect(out[3].name).toBe('other');
    const covered = out.reduce((t, s) => t + (s.endAngle - s.startAngle), 0);
    expect(covered).toBeCloseTo(TAU, 9);
  });

  it('does not add an "other" slice when nothing was left over', () => {
    const out = donutLayout([{ name: 'a', value: 1 }], { maxSlices: 3 });
    expect(out.map(s => s.name)).toEqual(['a']);
  });

  it('ignores zero and negative values instead of drawing backwards arcs', () => {
    const out = donutLayout([{ name: 'a', value: 5 }, { name: 'z', value: 0 }, { name: 'n', value: -2 }]);
    expect(out.map(s => s.name)).toEqual(['a']);
    expect(out[0].share).toBe(1);
  });

  it('returns nothing when everything is zero', () => {
    expect(donutLayout([{ name: 'a', value: 0 }])).toEqual([]);
  });
});

describe('arcPath', () => {
  it('draws a wedge', () => {
    const d = arcPath(50, 50, 20, 40, 0, Math.PI / 2);
    expect(d).toMatch(/^M /);
    expect(d).toContain('A 40 40');
    expect(d).toContain('A 20 20');
    expect(d.endsWith('Z')).toBe(true);
  });

  it('sets the large-arc flag past a half turn', () => {
    expect(arcPath(0, 0, 1, 2, 0, Math.PI * 0.4)).toContain('0 0 1');
    expect(arcPath(0, 0, 1, 2, 0, Math.PI * 1.5)).toContain('0 1 1');
  });

  /*
    A single 100% slice is the case a donut of one dominant thing produces,
    and an arc from an angle back to itself draws nothing — so the whole chart
    would come out blank exactly when it has the most to say.
  */
  it('draws a full ring as two half circles rather than nothing', () => {
    const d = arcPath(50, 50, 20, 40, 0, TAU);
    const arcs = d.match(/A /g) ?? [];
    expect(arcs.length).toBe(4);
  });

  it('starts at twelve o\'clock', () => {
    const d = arcPath(50, 50, 0, 40, 0, Math.PI / 2);
    // First point is directly above the centre.
    expect(d.startsWith('M 50 10')).toBe(true);
  });
});
