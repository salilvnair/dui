#!/usr/bin/env node
/**
 * Give every interactive dui component a `testId`.
 *
 * ── Why ──
 *
 * A component library that cannot be addressed by a test is a library every
 * consumer has to reverse-engineer. dui's inputs are the sharp case: several of
 * them — `SelectTextInputView`, `HighlightedInputView` — render a
 * `contenteditable` div with a decorative `<span>` for a placeholder, so
 * Playwright's `getByPlaceholder` finds nothing and `getByRole('textbox')` is a
 * coin toss. A demo recorder built on that spent an entire take typing into an
 * element that was not there, and nothing said so.
 *
 * The components that extend a native props interface AND spread `...rest`
 * already pass `data-testid` through and need nothing. This fills in the rest.
 *
 * ── What it does ──
 *
 * For each file: add `testId?: string` to the component's props interface, pull
 * `testId` out of the destructured parameters, and put `data-testid={testId}`
 * on the root element the component returns.
 *
 * It only edits a file when all three are unambiguous. Anything else is
 * reported and left alone — a codemod that guesses at 98 components is how a
 * library breaks quietly.
 *
 * Usage:
 *   node scripts/add-testid.js            # dry run, prints the plan
 *   node scripts/add-testid.js --write    # apply it
 */
const fs = require('fs');
const path = require('path');

const write = process.argv.includes('--write');
const ROOT = path.resolve(__dirname, '..', 'src', 'lib', 'components');
const FAMILIES = ['button', 'input', 'tabs', 'modal', 'chips'];

const DOC = `  /**
   * A stable hook for tests and automation.
   *
   * Lands on this component's root element as \`data-testid\`. Worth setting on
   * anything a test drives: several dui inputs render a \`contenteditable\` div
   * with a decorative placeholder span, which neither \`getByPlaceholder\` nor
   * \`getByRole\` reliably finds.
   */
  testId?: string;
`;

/** The props interface a component's parameter list is typed with. */
function propsInterfaceOf(src, componentName) {
  const want = `${componentName}Props`;
  const re = new RegExp(`export interface ${want}(?:\\s+extends[^{]*)?\\s*\\{`);
  const m = re.exec(src);
  return m ? { name: want, at: m.index + m[0].length } : undefined;
}

/** `export function Name(` or `export const Name = forwardRef…function Name(`. */
function componentNameOf(src, file) {
  const base = path.basename(file, '.tsx');
  return new RegExp(`(export function ${base}\\b|function ${base}\\b)`).test(src) ? base : undefined;
}

/**
 * Where the destructured props open, so `testId` can be pulled out.
 *
 * Only the object-pattern form — `function X({ a, b }: XProps)`. A component
 * taking `props` whole is left alone; there is no safe single place to add to.
 */
function destructureAt(src, componentName) {
  const re = new RegExp(`function ${componentName}\\s*\\(\\s*\\{`);
  const m = re.exec(src);
  return m ? m.index + m[0].length : undefined;
}

/**
 * The opening tag of the element the component returns.
 *
 * The LAST `return (` that is followed by a JSX tag — early returns in these
 * files are `return null` for a closed modal or a guard, and the real markup is
 * the final one. Refuses when the tag already carries a `data-testid`, or when
 * the root is a fragment (nothing to put an attribute on).
 */
function rootTagAt(src) {
  /* `return (<Tag`, and `return createPortal(<Tag` — every modal in this
     library portals, and those are exactly the components a test most wants to
     address. */
  const re = /return\s*(?:createPortal\s*\(\s*)?\(?\s*\n?\s*<([A-Za-z][\w.]*)/g;
  let last;
  let m;
  while ((m = re.exec(src))) last = m;
  if (!last) return undefined;
  return { tag: last[1], at: last.index + last[0].length };
}

/**
 * How to spell the hook for this root.
 *
 * A DOM element takes `data-testid`. A composite root — `<PickerView>`,
 * `<SelectInputView>` — takes `testId`, because React drops an unknown
 * `data-testid` prop on a component silently and the attribute would never
 * reach the DOM. Getting this backwards produces a codemod that appears to
 * work and gives you nothing to select.
 */
const isComponent = (tag) => /^[A-Z]/.test(tag);

const plan = [];
const skipped = [];

for (const family of FAMILIES) {
  const dir = path.join(ROOT, family);
  if (!fs.existsSync(dir)) continue;
  for (const name of fs.readdirSync(dir).filter((f) => f.endsWith('View.tsx'))) {
    const file = path.join(dir, name);
    const src = fs.readFileSync(file, 'utf8');
    const rel = `${family}/${name}`;

    if (/\.\.\.rest|\.\.\.props|\.\.\.restProps/.test(src)) {
      skipped.push([rel, 'already spreads rest — data-testid works today']);
      continue;
    }
    if (/testId/.test(src)) { skipped.push([rel, 'already has testId']); continue; }

    const component = componentNameOf(src, file);
    if (!component) { skipped.push([rel, 'no function matching the file name']); continue; }
    const iface = propsInterfaceOf(src, component);
    if (!iface) { skipped.push([rel, `no "export interface ${component}Props"`]); continue; }
    const destructure = destructureAt(src, component);
    if (destructure === undefined) { skipped.push([rel, 'props are not destructured']); continue; }
    const root = rootTagAt(src);
    if (!root) { skipped.push([rel, 'could not find the returned root element']); continue; }

    plan.push({ file, rel, component, iface, destructure, root });
  }
}

console.log(`Will add testId to ${plan.length} component${plan.length === 1 ? '' : 's'}:`);
for (const p of plan) console.log(`  ${p.rel}  (<${p.root.tag}> -> ${isComponent(p.root.tag) ? 'testId' : 'data-testid'})`);

console.log(`\nLeaving ${skipped.length} alone:`);
const byReason = new Map();
for (const [rel, why] of skipped) {
  if (!byReason.has(why)) byReason.set(why, []);
  byReason.get(why).push(rel);
}
for (const [why, files] of byReason) {
  console.log(`  ${why} (${files.length})`);
  if (!/already spreads rest/.test(why)) for (const f of files) console.log(`      ${f}`);
}

if (!write) {
  console.log('\nDry run. Re-run with --write to apply.');
  process.exit(0);
}

for (const p of plan) {
  let src = fs.readFileSync(p.file, 'utf8');
  /* Back to front, so each insertion does not move the offsets of the next. */
  const edits = [
    { at: p.root.at, text: isComponent(p.root.tag) ? ' testId={testId}' : ' data-testid={testId}' },
    { at: p.destructure, text: ' testId,' },
    { at: p.iface.at, text: '\n' + DOC },
  ].sort((a, b) => b.at - a.at);
  for (const e of edits) src = src.slice(0, e.at) + e.text + src.slice(e.at);
  fs.writeFileSync(p.file, src);
}
console.log(`\nWrote ${plan.length} files.`);
