#!/usr/bin/env node
/**
 * One clip per segment, recorded by driving the real showcase.
 *
 *   node scripts/demo-video/record.js
 *   node scripts/demo-video/record.js --only playground,theming
 *   node scripts/demo-video/record.js --url http://localhost:5199
 *
 * Requires the showcase running:  npm run dev -- --port 5180
 *
 * ── The rule this file exists to enforce ──
 *
 * No bad footage survives. A recipe that silently did nothing — typed into a
 * panel that had not opened, clicked a button that had not mounted — still
 * produces a perfectly good video of the app sitting in the wrong state, and
 * nothing downstream can tell. So every recipe verifies before its clip is
 * kept, a failed segment's video is deleted, and the run exits non-zero with a
 * list of what broke and a screenshot of each failure. `compose.js` will not
 * stitch a video that is missing clips, so a bad take cannot reach the output
 * by accident.
 *
 * Flags:
 *   --url URL     the app to record (default: config.json's appUrl)
 *   --only a,b    record just these segments, leaving the other clips alone
 *   --keep-going  record the rest after a failure instead of stopping
 *   --retries N   attempts per segment before giving up (default 2)
 */
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { recipes } from './recipes.js';
import { appHealth } from './drive.js';
import { buildIntroHtml, introAnimationSec } from './intro-template.js';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const argv = process.argv.slice(2);
const flag = (name, fallback) => {
  const at = argv.indexOf(name);
  return at >= 0 ? (argv[at + 1] ?? true) : fallback;
};
const only = String(flag('--only', '') || '').split(',').map(s => s.trim()).filter(Boolean);
const keepGoing = argv.includes('--keep-going');
const retries = Number(flag('--retries', 2));

const configPath = path.resolve(argv.find(a => a.endsWith('.json')) || path.join(ROOT, 'config.json'));
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
/* `--url` beats the config, for the common case of the dev server sitting on a
   different port than the day this file was written. */
const urlOverride = flag('--url', '');
if (urlOverride && urlOverride !== true) config.appUrl = String(urlOverride);

const OUT_DIR = path.join(ROOT, '.output');
const RAW_DIR = path.join(OUT_DIR, 'raw');
const SHOT_DIR = path.join(OUT_DIR, 'failed');

/*
  A full run starts from nothing; `--only` reshoots a segment and leaves the
  rest of the take alone. Wiping unconditionally meant reshooting one bad
  segment destroyed the eleven clips beside it, so the only way to fix one was
  to record them all again.
*/
if (!only.length) fs.rmSync(RAW_DIR, { recursive: true, force: true });
fs.rmSync(SHOT_DIR, { recursive: true, force: true });
fs.mkdirSync(RAW_DIR, { recursive: true });

/** What the previous run verified, so an `--only` reshoot can keep it. */
function previousSnapshot() {
  try {
    return JSON.parse(fs.readFileSync(path.join(OUT_DIR, 'config.snapshot.json'), 'utf8'));
  } catch {
    return null;
  }
}

async function reachable(url) {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(4000) });
    return res.ok || res.status < 500;
  } catch {
    return false;
  }
}

/**
 * Chromium, with room to work.
 *
 * A browser per take rather than one for the whole run: a dozen video
 * recordings in one process eventually exhausts the renderer and it crashes at
 * a different segment each time, which is the tell that it is resource
 * pressure rather than a bad step. A launch costs a fraction of a second
 * against a take that runs for fifteen.
 */
function launch() {
  return chromium.launch({
    args: ['--disable-dev-shm-usage', '--js-flags=--max-old-space-size=4096'],
  });
}

/**
 * Record one take. The video is kept only if the take succeeded.
 *
 * Playwright writes the file on `context.close()`, so a failed take is
 * recorded and then deleted — a few wasted seconds in exchange for the "no bad
 * footage survives" rule holding absolutely.
 */
async function take(browser, id, drive) {
  const dir = path.join(RAW_DIR, `${id}_tmp`);
  fs.mkdirSync(dir, { recursive: true });
  const { width, height } = config.output;
  const context = await browser.newContext({
    viewport: { width, height },
    recordVideo: { dir, size: { width, height } },
  });
  /*
    Tell the playground that something other than a person is typing.

    Monaco's editor options are construction options: every re-render hands it
    the same object again, so turning bracket auto-closing off from outside
    lasts exactly until the next keystroke puts it back, and the typed snippet
    lands a closing brace on top of one Monaco already inserted. Setting this
    before the app loads is the only place the answer holds for a whole take.
  */
  await context.addInitScript(() => { window.__DUI_NO_AUTOCLOSE__ = true; });

  const page = await context.newPage();
  /*
    Playwright starts filming when the page is created, so every clip opens on
    a blank frame, the app booting, and the warmup. The driver marks the window
    worth keeping and compose.js cuts to it; without this each clip carries the
    same long dead head and the finished video runs three times its useful
    length.
  */
  const t0 = Date.now();
  const marks = {};
  const mark = {
    begin: () => { marks.begin = (Date.now() - t0) / 1000; },
    end: () => { marks.end = (Date.now() - t0) / 1000; },
  };

  let failure;
  try {
    await drive(page, mark);
  } catch (e) {
    failure = e;
    /* A picture of the moment it went wrong, worth far more than the message
       when the message is "element not found". */
    fs.mkdirSync(SHOT_DIR, { recursive: true });
    await page.screenshot({ path: path.join(SHOT_DIR, `${id}.png`) }).catch(() => {});
  }

  await page.waitForTimeout(400);
  await context.close();

  const files = fs.readdirSync(dir).filter(f => f.endsWith('.webm'));
  if (failure || !files.length) {
    fs.rmSync(dir, { recursive: true, force: true });
    throw failure || new Error('Playwright wrote no video for this take');
  }
  const dest = path.join(RAW_DIR, `${id}.webm`);
  fs.renameSync(path.join(dir, files[0]), dest);
  fs.rmSync(dir, { recursive: true, force: true });
  return { dest, marks };
}

/**
 * The marked window, turned into the trim the composer wants.
 *
 * A little lead-in so the first click is not the first frame, and a hold at
 * the end so the result is on screen long enough to read. A take that marked
 * nothing keeps its configured trim rather than guessing.
 */
const LEAD_IN_SEC = 0.6;
const HOLD_SEC = 1.4;

function trimFromMarks(marks, fallbackStart) {
  if (typeof marks.begin !== 'number') return { trimStartSec: fallbackStart };
  const trimStartSec = Math.max(0, marks.begin - LEAD_IN_SEC);
  if (typeof marks.end !== 'number') return { trimStartSec };
  return { trimStartSec, endAtSec: marks.end + HOLD_SEC };
}

(async () => {
  if (!(await reachable(config.appUrl))) {
    const port = new URL(config.appUrl).port || '5180';
    console.error(`\nThe showcase is not answering at ${config.appUrl}.`);
    console.error(`Start it first:\n  npm run dev -- --port ${port}\n`);
    process.exit(1);
  }

  const wanted = only.length ? config.segments.filter(s => only.includes(s.id)) : config.segments;
  if (only.length) {
    const missing = only.filter(id => !config.segments.some(s => s.id === id));
    if (missing.length) {
      console.error(`No such segment: ${missing.join(', ')}`);
      console.error(`Known: ${config.segments.map(s => s.id).join(', ')}`);
      process.exit(1);
    }
  }

  const verified = [];
  const failures = [];

  /* ── The title card ── */
  const wantsIntro = config.intro?.enabled && (!only.length || only.includes('intro'));
  if (wantsIntro) {
    const { width, height } = config.output;
    const html = buildIntroHtml({ ...config.intro, width, height });
    const holdSec = config.intro.holdSec ?? 4;
    const browser = await launch();
    try {
      await take(browser, 'intro', async (page, mark) => {
        await page.setContent(html);
        mark.begin();
        /* Hold from when the animation finishes, not from when it starts —
           otherwise the finished card, which is the point of the card, is on
           screen for a third of a second. */
        await page.waitForTimeout((introAnimationSec(config.intro.badges.length) + holdSec) * 1000);
        mark.end();
      });
      console.log('  intro            ok');
    } catch (e) {
      failures.push({ id: 'intro', why: e.message });
      console.error(`  intro            FAILED — ${e.message}`);
    } finally {
      await browser.close();
    }
  }

  /* ── The segments ── */
  for (const seg of wanted) {
    const recipe = recipes[seg.recipe];
    if (!recipe) {
      failures.push({ id: seg.id, why: `no recipe named "${seg.recipe}"` });
      console.error(`  ${seg.id.padEnd(16)} FAILED — no recipe named "${seg.recipe}"`);
      if (!keepGoing) break;
      continue;
    }

    let done = false;
    let lastError;
    for (let attempt = 1; attempt <= retries && !done; attempt++) {
      const browser = await launch();
      try {
        const { marks } = await take(browser, seg.id, async (page, mark) => {
          await page.goto(config.appUrl, { waitUntil: 'domcontentloaded' });
          /* The dev server compiles the best part of a thousand modules on the
             first hit of a run, so this wait is long on purpose. */
          await page.waitForSelector('[data-showcase-content]', { timeout: 120_000 });
          await page.waitForFunction(() => Boolean(window.__DUI_SHOWCASE__), null, { timeout: 30_000 });
          /* Monaco arrives in the background now; filming a code panel before
             it does records the plain-text fallback. */
          await page.waitForFunction(() => window.__DUI_MONACO_READY__ === true, null, { timeout: 60_000 })
            .catch(() => {});
          const health = await appHealth(page);
          if (!health.catalog) throw new Error('the showcase never published its catalog');
          if (seg.warmupMs) await page.waitForTimeout(seg.warmupMs);
          await recipe(page, mark, seg.options || {});
        });
        verified.push({ ...seg, ...trimFromMarks(marks, seg.trimStartSec ?? 1.2) });
        console.log(`  ${seg.id.padEnd(16)} ok`);
        done = true;
      } catch (e) {
        lastError = e;
        if (attempt < retries) console.log(`  ${seg.id.padEnd(16)} attempt ${attempt} failed, retrying`);
      } finally {
        await browser.close();
      }
    }

    if (!done) {
      failures.push({ id: seg.id, why: lastError?.message || 'unknown' });
      console.error(`  ${seg.id.padEnd(16)} FAILED — ${lastError?.message}`);
      if (!keepGoing) break;
    }
  }

  /*
    The snapshot is what compose.js and refine.js read.

    It lists only the segments that verified, with the trim each one measured
    for itself — so a `--only` reshoot has to merge with the previous run
    rather than replace it, or the eleven untouched clips lose the marks that
    say where they were cut.
  */
  const previous = only.length ? previousSnapshot() : null;
  const merged = previous
    ? [...previous.segments.filter(s => !verified.some(v => v.id === s.id)), ...verified]
      .sort((a, b) => config.segments.findIndex(s => s.id === a.id) - config.segments.findIndex(s => s.id === b.id))
    : verified;

  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(
    path.join(OUT_DIR, 'config.snapshot.json'),
    JSON.stringify({ ...config, segments: merged }, null, 2) + '\n',
  );

  console.log(`\n${merged.length}/${config.segments.length} segments recorded.`);
  if (failures.length) {
    console.error(`\n${failures.length} failed:`);
    for (const f of failures) console.error(`  ${f.id}: ${f.why}`);
    console.error(`\nScreenshots of each failure: ${path.relative(process.cwd(), SHOT_DIR)}`);
    process.exit(1);
  }
})();
