#!/usr/bin/env node
/**
 * One contact sheet per group — the README's answer to "what is in here".
 *
 *   npm run sheets
 *   npm run sheets -- --theme light
 *   npm run sheets -- --only Inputs,Overlays
 *
 * Reads `media/components.<theme>.json` and the PNGs beside it, so the dev
 * server does not need to be running — `npm run shots` first, this second.
 *
 * ── Why a sheet at all ──
 *
 * Two hundred and thirty-eight images cannot go in a README: GitHub would be
 * asked for thirty-odd megabytes on every page view, and nobody scrolls that
 * far anyway. One picture per group is eighteen images, each of which answers
 * "what does this family of components look like" at a glance, with the names
 * printed under them so a reader can go and find the one they want.
 *
 * ── Why the browser ──
 *
 * The obvious tool is ffmpeg's `tile` filter, and it cannot label anything
 * without a drawtext filter, which needs a libfreetype build that is not
 * reliably present. Laying the sheet out as a web page and photographing it
 * costs one Chromium launch and gives real typography, real ellipsis, and a
 * grid that reflows — none of which ffmpeg was ever going to do.
 *
 * The page is written to disk and navigated to, rather than handed to
 * `setContent`: a document created that way has an `about:blank` origin, and
 * Chromium refuses `file://` subresources from it, so every sheet came out as
 * a grid of correctly-labelled empty boxes.
 */
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

const argv = process.argv.slice(2);
const flag = (name, fallback) => {
  const at = argv.indexOf(name);
  return at === -1 ? fallback : argv[at + 1];
};
const theme = String(flag('--theme', 'dark'));
const only = String(flag('--only', '') || '').split(',').map(s => s.trim()).filter(Boolean);
/* Three across at 1680 wide gives each tile about 520px — enough that a data
   table is still readable, small enough that a group of twenty fits on a sheet
   somebody will actually look at. */
const COLUMNS = Number(flag('--columns', 3));
const SHEET_WIDTH = Number(flag('--width', 1800));
/* Every tile the same height, because a masonry sheet of wildly different
   components reads as a mess rather than as a catalog. Tall shots are cropped
   from the top, which is where the component is. */
const TILE_HEIGHT = Number(flag('--tile-height', 320));

const manifestPath = path.join(ROOT, 'media', `components.${theme}.json`);
if (!fs.existsSync(manifestPath)) {
  console.error(`No ${path.relative(ROOT, manifestPath)}.`);
  console.error(`Run the captures first:  npm run shots${theme === 'light' ? ':light' : ''}`);
  process.exit(1);
}
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

const OUT_DIR = path.join(ROOT, 'media', theme === 'light' ? 'sheets-light' : 'sheets');
fs.mkdirSync(OUT_DIR, { recursive: true });

/** `Date & Time` → `date-time`, so the filename survives a URL and a shell. */
const slug = (title) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const PALETTE = theme === 'light'
  ? { page: '#f6f7f9', card: '#ffffff', border: '#dfe3e8', text: '#12141a', muted: '#6b7280' }
  : { page: '#0f1115', card: '#16181d', border: '#272b33', text: '#e8eaee', muted: '#8a93a3' };

function sheetHtml(group, items) {
  const tiles = items.map((c) => {
    const file = path.join(ROOT, c.image);
    /* A component captured on a previous run but since renamed leaves a
       manifest entry with no file. Draw the name rather than a broken image. */
    const src = fs.existsSync(file) ? pathToFileURL(file).href : '';
    return `
      <figure class="tile">
        <div class="shot">${src ? `<img src="${src}" alt="">` : '<div class="missing">no capture</div>'}</div>
        <figcaption>${c.label}</figcaption>
      </figure>`;
  }).join('');

  return `<!doctype html><html><head><meta charset="utf-8"><style>
    * { box-sizing: border-box; }
    body {
      margin: 0; padding: 32px 32px 36px; width: ${SHEET_WIDTH}px;
      background: ${PALETTE.page}; color: ${PALETTE.text};
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif;
    }
    header { display: flex; align-items: baseline; gap: 12px; margin-bottom: 22px; }
    h1 { margin: 0; font-size: 26px; font-weight: 800; letter-spacing: -0.02em; }
    .count { font-size: 13px; color: ${PALETTE.muted}; }
    .wordmark { margin-left: auto; font-size: 13px; font-weight: 700; color: ${PALETTE.muted}; letter-spacing: 0.08em; }
    .grid { display: grid; grid-template-columns: repeat(${COLUMNS}, 1fr); gap: 16px; }
    .tile { margin: 0; border: 1px solid ${PALETTE.border}; border-radius: 10px; background: ${PALETTE.card}; overflow: hidden; }
    /* Fixed box, top-anchored: the component is at the top of every capture,
       so a tall one is cropped at the bottom rather than shrunk to illegible. */
    .shot { height: ${TILE_HEIGHT}px; overflow: hidden; display: block; }
    .shot img { width: 100%; display: block; }
    .missing { height: 100%; display: flex; align-items: center; justify-content: center; font-size: 12px; color: ${PALETTE.muted}; }
    figcaption {
      padding: 9px 12px; font-size: 12px; font-weight: 600;
      border-top: 1px solid ${PALETTE.border}; color: ${PALETTE.text};
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
  </style></head><body>
    <header>
      <h1>${group}</h1>
      <span class="count">${items.length} component${items.length === 1 ? '' : 's'}</span>
      <span class="wordmark">@salilvnair/dui</span>
    </header>
    <div class="grid">${tiles}</div>
  </body></html>`;
}

(async () => {
  const groups = manifest.groups.filter(g => !only.length || only.includes(g));
  if (!groups.length) {
    console.error(`No such group. Known: ${manifest.groups.join(', ')}`);
    process.exit(1);
  }

  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: SHEET_WIDTH, height: 1000 },
    /* 1x here on purpose: the tiles are already 2x captures being scaled down,
       so a 2x sheet would be a 10MB image of no extra detail. */
    deviceScaleFactor: 1,
  });

  /* Beside the sheets, so the file:// page and the file:// images it loads sit
     in the same directory. */
  const scratch = path.join(OUT_DIR, '_sheet.html');

  const made = [];
  for (const group of groups) {
    const items = manifest.components.filter(c => c.group === group);
    if (!items.length) continue;
    fs.writeFileSync(scratch, sheetHtml(group, items), 'utf8');
    await page.goto(pathToFileURL(scratch).href, { waitUntil: 'load' });
    /* The captures decode after `load` fires; without this the sheet
       photographs while half its tiles are still blank. */
    await page.evaluate(() => Promise.all(
      [...document.images].map(img => img.complete ? null : img.decode().catch(() => {})),
    ));
    await page.waitForTimeout(150);

    /* Sized to the sheet, not to the window. `fullPage` grows a page taller
       than the viewport but never shrinks one shorter, so a group of four came
       out with six hundred pixels of empty background under it. */
    const tall = await page.evaluate(() => Math.ceil(document.body.getBoundingClientRect().height));
    await page.setViewportSize({ width: SHEET_WIDTH, height: Math.max(200, tall) });
    await page.waitForTimeout(80);

    const dest = path.join(OUT_DIR, `${slug(group)}.png`);
    await page.screenshot({ path: dest, fullPage: true });
    made.push({ group, dest, items: items.length });
    console.log(`  ${group.padEnd(20)} ${String(items.length).padStart(3)} components  ->  ${path.relative(ROOT, dest)}`);
  }

  await browser.close();
  fs.rmSync(scratch, { force: true });
  console.log(`\n${made.length} sheets in ${path.relative(ROOT, OUT_DIR)}`);
})();
