/**
 * Every interactive component can be addressed by a test.
 *
 * ── Why this is a test and not a convention ──
 *
 * dui is consumed by an app whose demo recorder and e2e suite both drive it
 * through Playwright. Several inputs here render a `contenteditable` div with a
 * decorative `<span>` for a placeholder — `getByPlaceholder` finds nothing and
 * `getByRole('textbox')` is a coin toss — so without a `testId` the only way in
 * is to reverse-engineer dui's internal class names, which then break silently
 * when they change.
 *
 * The `testId` prop was added across the interactive families by
 * `scripts/add-testid.cjs`. This is what stops the next component added by hand
 * from quietly missing it, and what caught the one mistake that codemod made:
 * `TabView.tsx` ends with a `TabBadge` helper, and "the last return in the
 * file" put the marker on a 6px dot instead of the component's root.
 */
import { describe, it, expect } from 'vitest';
import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';

const HERE = __dirname;

/** The families a test actually drives. Display-only components are exempt. */
const INTERACTIVE = ['button', 'input', 'tabs', 'modal', 'chips'];

/**
 * Components that legitimately have no `testId` of their own.
 *
 * Each one spreads `...rest` onto its root DOM element, so `data-testid="…"`
 * already reaches the DOM and a second way in would be noise.
 */
function spreadsRest(source: string): boolean {
  return /\.\.\.rest|\.\.\.props|\.\.\.restProps/.test(source);
}

/**
 * The four whose root is a fragment.
 *
 * `<>` has nothing to hang an attribute on. They are listed rather than ignored
 * so that "it has no testId" stays a decision somebody made, not an oversight
 * that spread.
 */
const FRAGMENT_ROOTED = new Set([
  'DropDownButtonView.tsx',
  'SplitButtonView.tsx',
  'InfoPopupView.tsx',
  'TooltipView.tsx',
  'TimeTravelSliderView.tsx',
]);

interface Component { family: string; file: string; path: string; source: string }

const components: Component[] = INTERACTIVE.flatMap((family) => {
  const dir = join(HERE, family);
  return readdirSync(dir)
    .filter((f) => f.endsWith('View.tsx'))
    .map((file) => ({ family, file, path: join(dir, file), source: readFileSync(join(dir, file), 'utf8') }));
});

describe('every interactive component can be addressed', () => {
  it('finds the components at all, so a passing run means something', () => {
    expect(components.length).toBeGreaterThan(80);
  });

  it('accepts a testId, spreads rest, or is a documented exception', () => {
    const missing = components
      .filter((c) => !FRAGMENT_ROOTED.has(c.file))
      .filter((c) => !spreadsRest(c.source))
      .filter((c) => !/testId\?: string/.test(c.source))
      .map((c) => `${c.family}/${c.file}`);
    expect(missing).toEqual([]);
  });

  it('puts the marker on the component, not on a helper below it', () => {
    /*
      The exact mistake the codemod made once. A marker inside a helper is
      worse than no marker: the prop exists, the docs say it works, and the
      attribute lands on something nobody wants to select.
    */
    const astray: string[] = [];
    for (const c of components) {
      const expected = c.file.replace(/\.tsx$/, '');
      for (const m of c.source.matchAll(/(?:data-testid|testId)=\{testId\}/g)) {
        const before = c.source.slice(0, m.index);
        const owners = [...before.matchAll(/^(?:export )?(?:function|const|class) (\w+)/gm)];
        const owner = owners.length ? owners[owners.length - 1][1] : '(top level)';
        if (owner !== expected) astray.push(`${c.family}/${c.file}: marker sits in ${owner}`);
      }
    }
    expect(astray).toEqual([]);
  });

  it('never passes data-testid to a component, which React would drop', () => {
    /*
      A composite root takes `testId`; a DOM element takes `data-testid`. The
      wrong one of those compiles, renders, and gives you nothing to select —
      which is the failure mode this whole file exists to prevent.
    */
    const wrong: string[] = [];
    for (const c of components) {
      for (const m of c.source.matchAll(/<([A-Z][\w.]*)[^>]*?\sdata-testid=\{testId\}/g)) {
        /* dui's own wrappers that forward to a rest-spreading child are fine —
           those genuinely want the DOM attribute. */
        if (/SearchInputView|IconButtonView|TextInputView|ButtonView/.test(m[1])) continue;
        wrong.push(`${c.family}/${c.file}: <${m[1]} data-testid=…>`);
      }
    }
    expect(wrong).toEqual([]);
  });
});
