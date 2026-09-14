#!/usr/bin/env node
/**
 * A photograph of every component in the library.
 *
 *   npm run shots                     # all of them, dark, into media/components/
 *   npm run shots -- --theme light    # …on the light ground, into media/components-light/
 *   npm run shots -- --only chips,datatable
 *   npm run shots -- --hero           # just the two full-window shots
 *
 * Requires the showcase running (`npm run dev -- --port 5180`).
 *
 * ── What gets framed ──
 *
 * Not the window. A screenshot of the whole app, repeated two hundred and
 * thirty-eight times, is two hundred and thirty-eight pictures of the same
 * sidebar and the same code editor with a small difference near the bottom.
 * The first version of this script did exactly that, and the contact sheet it
 * produced was unreadable.
 *
 * So each shot is taken through the showcase's capture address —
 * `#/<id>?capture=1` — which draws the component's examples and no chrome at
 * all, and is clipped to what was actually drawn rather than to the window, so
 * a chip yields a picture of a chip rather than a chip adrift in nine hundred
 * pixels of background.
 *
 * The two full-window shots, which do want the whole app in frame, are taken
 * deliberately and once, by `--hero`.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { APP_URL, reachable, startHint, openShowcase, readCatalog, flatten, show } from '../showcase/catalog.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

const argv = process.argv.slice(2);
const flag = (name, fallback) => {
  const at = argv.indexOf(name);
  return at === -1 ? fallback : argv[at + 1];
};
const theme = String(flag('--theme', 'dark'));
const only = String(flag('--only', '') || '').split(',').map(s => s.trim()).filter(Boolean);
const heroOnly = argv.includes('--hero');
const skipHero = argv.includes('--no-hero');
/* Tall enough for a component and a couple of its examples; short enough that
   the result is still a picture rather than a page. */
const MAX_HEIGHT = Number(flag('--max-height', 980));

const OUT_DIR = path.join(ROOT, 'media', theme === 'light' ? 'components-light' : 'components');
const HERO_DIR = path.join(ROOT, 'media');

/**
 * The rectangle worth keeping.
 *
 * Measured from what the capture body actually drew, not from the window. A
 * component that renders 180px tall gets a 180px picture; one that renders
 * 3,000px tall gets the cap, because past a certain height the image stops
 * being a thumbnail and starts being a page nobody scrolls.
 *
 * Everything is clamped into the viewport at the end: Playwright refuses a
 * clip that runs off the screen, and an element measured before its webfonts
 * settle can report a box a few pixels wider than the page it sits on.
 */
async function contentClip(page, maxHeight) {
  return page.evaluate((cap) => {
    const body = document.querySelector('[data-capture-body]');
    if (!body) return null;
    const r = body.getBoundingClientRect();
    const x = Math.max(0, Math.floor(r.x));
    const y = Math.max(0, Math.floor(r.y));
    const width = Math.min(window.innerWidth - x, Math.ceil(r.width));
    /* The box is what was drawn; the viewport is what is lit. A clip taller
       than the window captures nothing but background below the fold. */
    const drawn = Math.min(Math.ceil(r.height), window.innerHeight - y);
    return { x, y, width, height: Math.max(1, Math.min(drawn, cap)) };
  }, maxHeight);
}

async function captureHeroes(page) {
  fs.mkdirSync(HERO_DIR, { recursive: true });
  const shots = [
    { id: 'datatable', theme: 'dark',  file: 'dui-showcase-dark.png' },
    { id: 'calendar',  theme: 'light', file: 'dui-showcase-light.png' },
  ];
  for (const s of shots) {
    await show(page, s.id, { theme: s.theme === 'dark' ? null : s.theme, settleMs: 1400 });
    const dest = path.join(HERO_DIR, s.file);
    await page.screenshot({ path: dest });
    console.log(`  hero  ${path.relative(ROOT, dest)}`);
  }
  /* Put the ground back, so a `--hero` run does not leave the next component
     shot on whatever theme the last hero wanted. */
  await show(page, 'textinput', { theme: theme === 'light' ? 'light' : null, capture: true, settleMs: 400 });
}

(async () => {
  if (!(await reachable())) {
    console.error(`\nThe showcase is not answering at ${APP_URL}.\n${startHint()}`);
    process.exit(1);
  }

  const { browser, page } = await openShowcase({ theme });
  const catalog = await readCatalog(page);
  const all = flatten(catalog);
  console.log(`${all.length} components in ${catalog.groups.length} groups, ${theme} theme\n`);

  if (!skipHero) await captureHeroes(page);
  if (heroOnly) { await browser.close(); return; }

  const wanted = only.length ? all.filter(c => only.includes(c.id)) : all;
  if (only.length) {
    const missing = only.filter(id => !all.some(c => c.id === id));
    if (missing.length) console.log(`  not in the catalog, ignored: ${missing.join(', ')}\n`);
  }

  fs.mkdirSync(OUT_DIR, { recursive: true });
  const manifest = [];
  const failed = [];

  for (const [i, comp] of wanted.entries()) {
    const dest = path.join(OUT_DIR, `${comp.id}.png`);
    try {
      await show(page, comp.id, { theme: theme === 'light' ? 'light' : null, capture: true });
      const clip = await contentClip(page, MAX_HEIGHT);
      if (!clip || clip.width < 40 || clip.height < 40) throw new Error('nothing on screen to clip to');
      await page.screenshot({ path: dest, clip });
      manifest.push({
        id: comp.id,
        label: comp.label,
        title: comp.title,
        desc: comp.desc,
        group: comp.group,
        hasExamples: comp.hasExamples,
        hasDocs: comp.hasDocs,
        image: path.posix.join('media', path.basename(OUT_DIR), `${comp.id}.png`),
      });
      process.stdout.write(`\r  ${String(i + 1).padStart(3)}/${wanted.length}  ${comp.label.padEnd(30)}`);
    } catch (e) {
      failed.push({ id: comp.id, why: e.message });
      process.stdout.write(`\r  ${String(i + 1).padStart(3)}/${wanted.length}  ${comp.label.padEnd(30)} — failed\n`);
    }
  }
  process.stdout.write('\n');

  await browser.close();

  /*
    The manifest, merged rather than replaced.

    A `--only` run writing this file wholesale would replace a catalog of two
    hundred and thirty-eight entries with the three it reshot, and the site's
    demo page — which reads it — would quietly lose everything else. Skipping
    the write entirely was the first fix and the wrong one: reshooting the one
    component whose capture failed then left it missing from the catalog for
    good, which is exactly the case a partial run exists to handle.

    So a partial run updates the entries it took and keeps the rest, in the
    order the sidebar lists them.
  */
  const manifestPath = path.join(ROOT, 'media', `components.${theme}.json`);
  const order = all.map(c => c.id);
  let entries = manifest;
  if (only.length && fs.existsSync(manifestPath)) {
    const kept = JSON.parse(fs.readFileSync(manifestPath, 'utf8')).components || [];
    const fresh = new Set(manifest.map(m => m.id));
    entries = [...kept.filter(k => !fresh.has(k.id)), ...manifest]
      .sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));
  }
  fs.writeFileSync(manifestPath, JSON.stringify({
    generatedAt: new Date().toISOString().slice(0, 10),
    theme,
    total: entries.length,
    groups: catalog.groups.map(g => g.title),
    components: entries,
  }, null, 2) + '\n');

  console.log(`\n${path.relative(ROOT, manifestPath)}  ${entries.length} entries`);
  console.log(`${path.relative(ROOT, OUT_DIR)}  ${manifest.length} image${manifest.length === 1 ? '' : 's'} written`);
  if (failed.length) {
    console.error(`\n${failed.length} failed:`);
    for (const f of failed) console.error(`  ${f.id}: ${f.why}`);
    process.exit(1);
  }
})();
