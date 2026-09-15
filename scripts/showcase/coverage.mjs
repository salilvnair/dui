#!/usr/bin/env node
/**
 * Which exported components the showcase does not show.
 *
 *   npm run coverage
 *   npm run coverage -- --check    # exit non-zero if anything is missing
 *
 * The showcase is the library's documentation, and the only thing keeping the
 * two in step is somebody remembering. They had already drifted: `BadgeChipView`
 * shipped with fifty skins and a `DuiProvider`-wide `chipVariant`, and none of
 * it was reachable from the showcase, because adding a component to `src/lib`
 * and adding a panel to `DuiShowcase` are separate acts and nothing connected
 * them.
 *
 * This connects them. It reads the public barrel for every exported component,
 * reads the showcase's own sidebar for every panel, and reports the difference.
 *
 * ── What counts ──
 *
 * A "component" is a value export whose name ends in `View`, plus the handful
 * of named exceptions below that are components without the suffix. Hooks,
 * tokens, types and helpers are not components and are not expected to have a
 * panel of their own.
 *
 * Some components legitimately have no panel — a sub-part only ever rendered by
 * another component, or the two Monaco-backed implementations that the registry
 * swaps in. Those are listed in EXEMPT with the reason, so "no panel" is always
 * either a finding or a decision someone wrote down.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const check = process.argv.includes('--check');
const verbose = process.argv.includes('--verbose');

/** Components without the `View` suffix that are still components. */
const EXTRA_COMPONENTS = new Set([
  'DuiProvider', 'YamlKeyChip', 'CommandChip', 'LiveColorCustomizer',
  'ThemeVarEditor', 'StageCheck', 'StageSpin', 'StagePulse',
]);

/**
 * Components with no panel, on purpose.
 *
 * Keep the reason with the name — an exemption nobody can explain is just an
 * older version of the drift this script exists to catch.
 */
const EXEMPT = new Map([
  ['EditorViewMonacoImpl', 'registry implementation, swapped in behind EditorView'],
  ['DiffEditorViewMonacoImpl', 'registry implementation, swapped in behind DiffEditorView'],
]);

// ── The public surface ───────────────────────────────────────────────────────
const barrel = fs.readFileSync(path.join(ROOT, 'src/lib/index.ts'), 'utf8');
const exported = new Set();
/* Value exports only. `export type { … }` is types, which have no panel. */
for (const m of barrel.matchAll(/^export\s+\{([^}]*)\}/gm)) {
  for (const raw of m[1].split(',')) {
    const name = raw.trim().replace(/^type\s+/, '').split(/\s+as\s+/).pop()?.trim();
    if (!name) continue;
    if (name.endsWith('View') || EXTRA_COMPONENTS.has(name)) exported.add(name);
  }
}

// ── What the showcase draws ──────────────────────────────────────────────────
const showcase = fs.readFileSync(path.join(ROOT, 'src/showcase/DuiShowcase.tsx'), 'utf8');
/* The sidebar's labels are the component names as the showcase advertises
   them; the PANELS titles catch the few that differ. */
const shown = new Set();
for (const m of showcase.matchAll(/label:\s*'([^']+)'/g)) shown.add(m[1]);
for (const m of showcase.matchAll(/title:\s*'([^']+)'/g)) shown.add(m[1]);
/* A panel titled "StageCheck / StageSpin / StagePulse" covers three names, and
   "DuiProvider — Size System" is a panel for DuiProvider — so split on every
   separator a title actually uses, em dash included. Missing the em dash is why
   the first run of this reported DuiProvider as undocumented. */
const shownFlat = new Set();
for (const label of shown) {
  for (const part of label.split(/[\/·,—–|+&]/)) {
    const t = part.trim();
    if (t) shownFlat.add(t);
  }
}
/*
  Anything rendered anywhere in the showcase is demonstrated, even without a
  panel of its own — a skeleton shown beside the card it stands in for is
  covered, and reporting it as missing would be wrong.

  Scanning only DuiShowcase.tsx was not enough: it reported
  IssueCardSkeletonView as undocumented while the IssueCardView panel was
  rendering three of them.
*/
const mentioned = new Set();
(function scan(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) { scan(full); continue; }
    if (!/\.tsx?$/.test(entry.name)) continue;
    const text = fs.readFileSync(full, 'utf8');
    for (const m of text.matchAll(/\b([A-Z][A-Za-z0-9]*View)\b/g)) mentioned.add(m[1]);
  }
})(path.join(ROOT, 'src/showcase'));

const missing = [];
const onlyMentioned = [];
for (const name of [...exported].sort()) {
  if (EXEMPT.has(name)) continue;
  if (shownFlat.has(name)) continue;
  if (mentioned.has(name)) onlyMentioned.push(name);
  else missing.push(name);
}

console.log(`${exported.size} components exported, ${shownFlat.size} named in the showcase.\n`);

if (missing.length) {
  console.log(`NO PANEL AND NEVER MENTIONED — ${missing.length}:`);
  for (const n of missing) console.log(`  ${n}`);
  console.log('');
}
if (onlyMentioned.length) {
  console.log(`no panel of their own, but used inside another panel — ${onlyMentioned.length}:`);
  for (const n of onlyMentioned) console.log(`  ${n}`);
  console.log('');
}
if (verbose && EXEMPT.size) {
  console.log('exempt:');
  for (const [n, why] of EXEMPT) console.log(`  ${n} — ${why}`);
  console.log('');
}

if (!missing.length) {
  console.log('Every exported component has a panel or appears in one.');
} else if (check) {
  console.error(`${missing.length} component${missing.length === 1 ? '' : 's'} missing from the showcase.`);
  process.exit(1);
}
