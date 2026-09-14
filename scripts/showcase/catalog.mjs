/**
 * The one list of components, read from the running app.
 *
 * `DuiShowcase` publishes its sidebar as `window.__DUI_SHOWCASE__`, so the
 * screenshot run, the demo video and the README catalog all enumerate the same
 * components the app actually draws. The alternative — each script keeping its
 * own copy of the ids — is three lists that go stale independently, and the
 * failure is silent: a new component simply never gets photographed.
 */
import { chromium } from 'playwright';

export const APP_URL = process.env.DUI_SHOWCASE_URL || 'http://localhost:5180';

/** Is the showcase actually up? A refused connection deserves one clear line. */
export async function reachable(url = APP_URL) {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(5000) });
    return res.ok || res.status < 500;
  } catch {
    return false;
  }
}

export function startHint(url = APP_URL) {
  const port = new URL(url).port || '5180';
  return `Start it first:\n  npm run dev -- --port ${port}\n`;
}

/**
 * Chromium, sized for the captures.
 *
 * `deviceScaleFactor: 2` because these end up in a README on a retina screen,
 * where a 1x screenshot of 11px type is mush. It doubles the file size and it
 * is the whole difference between a catalog you can read and one you squint at.
 */
export async function openShowcase({ width = 1440, height = 900, scale = 2, theme = 'dark' } = {}) {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor: scale,
    colorScheme: theme === 'light' ? 'light' : 'dark',
  });
  /* Monaco inserts a closing bracket for every one you type. Harmless for a
     person, wrong for a script that types a finished snippet — and it has to be
     set before the app boots, because the editor reads it at construction. */
  await context.addInitScript(() => { window.__DUI_NO_AUTOCLOSE__ = true; });

  const page = await context.newPage();
  await page.goto(APP_URL, { waitUntil: 'domcontentloaded' });
  /* The dev server compiles the best part of a thousand modules on first hit,
     so the first paint is genuinely slow — this is not a hung page. */
  await page.waitForSelector('[data-showcase-content]', { timeout: 120_000 });
  await page.waitForFunction(() => Boolean(window.__DUI_SHOWCASE__), null, { timeout: 30_000 });

  return { browser, context, page };
}

/** `[{ title, items: [{ id, label, title, desc }] }]`, straight from the app. */
export async function readCatalog(page) {
  return page.evaluate(() => window.__DUI_SHOWCASE__);
}

/** Every component, flattened, with the group it belongs to kept alongside. */
export function flatten(catalog) {
  return catalog.groups.flatMap(g => g.items.map(i => ({ ...i, group: g.title })));
}

/**
 * Show one component, and wait for it to stop moving.
 *
 * Setting the hash rather than navigating: a reload costs the module graph
 * again, two hundred and thirty-eight times. The hash listener in the app turns
 * this into a React state change, which is the same thing a click would do.
 */
export async function show(page, id, { tab = 'live', theme = null, capture = false, settleMs = 900 } = {}) {
  const query = new URLSearchParams();
  if (theme) query.set('theme', theme);
  if (capture) query.set('capture', '1');
  const search = query.toString();
  const hash = `#/${id}${tab === 'live' ? '' : `/${tab}`}${search ? `?${search}` : ''}`;
  /* A panel still scrolled to where the previous component left it photographs
     as a component missing its heading — so the reset happens twice, once when
     the hash changes and once after the new panel has rendered into it. */
  const toTop = () => {
    const pane = document.querySelector('[data-showcase-content]');
    if (pane) pane.scrollTop = 0;
    window.scrollTo(0, 0);
  };
  await page.evaluate((h) => { window.location.hash = h; }, hash);
  await page.evaluate(toTop);
  await settled(page, settleMs);
  await page.evaluate(toTop);
  await page.waitForTimeout(120);
}

/**
 * Wait for the panel to actually be on screen.
 *
 * Panels are lazily imported, so switching to one now fetches a chunk. The old
 * fixed pause was correct when every component was already in the bundle and
 * is a race now: a chunk that arrives a beat late gets photographed as the
 * word "Loading…".
 *
 * So wait for the Suspense marker to leave the DOM first, then pause for the
 * animations and the webfonts — which is what the pause was ever really for.
 * A panel already in the browser cache clears the first step immediately, so
 * this is faster in the common case as well as correct in the rare one.
 */
async function settled(page, settleMs) {
  try {
    await page.waitForFunction(
      () => !document.querySelector('[data-panel-pending]'),
      null,
      { timeout: 30_000 },
    );
  } catch {
    /* Thirty seconds on one chunk means something is wrong with the server,
       not with the panel. Fall through and let the caller's own check fail
       with something more useful than a timeout. */
  }
  await page.waitForTimeout(settleMs);
}
