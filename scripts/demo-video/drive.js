/**
 * The small vocabulary every recipe is written in.
 *
 * Two rules hold the whole demo-video pipeline up, and both live here:
 *
 *   • Nothing types instantly. `type()` goes a character at a time, because a
 *     field that fills in one frame is not footage of anybody using anything.
 *
 *   • Every recipe verifies. A step that silently did nothing — typing into a
 *     panel that had not opened, clicking a button that had not mounted —
 *     still records perfectly good video of the app sitting in the wrong
 *     state, and `record.js` has no way to tell. `expectText` is how a recipe
 *     says what has to be true before its clip counts.
 */

/** Human typing speed, near enough. */
export async function type(page, text, { delay = 55 } = {}) {
  await page.keyboard.type(text, { delay });
}

/** A beat, so the eye lands on what just happened before the next thing. */
export async function beat(page, ms = 700) {
  await page.waitForTimeout(ms);
}

/**
 * Show a component, by address.
 *
 * Deliberately the hash and not a click: hunting a named row in a sidebar of
 * two hundred and thirty-eight is a different piece of footage every time it
 * is shot, and half of those are of the wrong component. The segments that are
 * *about* navigating do it by hand — see the catalog recipe.
 */
export async function goTo(page, id, { tab = 'live', theme = null, settleMs = 1100 } = {}) {
  const query = new URLSearchParams();
  if (theme) query.set('theme', theme);
  const search = query.toString();
  await page.evaluate((h) => {
    window.location.hash = h;
    const pane = document.querySelector('[data-showcase-content]');
    if (pane) pane.scrollTop = 0;
  }, `#/${id}${tab === 'live' ? '' : `/${tab}`}${search ? `?${search}` : ''}`);
  await page.waitForTimeout(settleMs);
}

/** Scroll the content pane, slowly enough to read on the way past. */
export async function scrollPane(page, { by = 520, steps = 8, pause = 90 } = {}) {
  for (let i = 0; i < steps; i++) {
    await page.evaluate((delta) => {
      const pane = document.querySelector('[data-showcase-content]');
      if (pane) pane.scrollTop += delta;
    }, Math.round(by / steps));
    await page.waitForTimeout(pause);
  }
}

export async function scrollPaneTop(page) {
  await page.evaluate(() => {
    const pane = document.querySelector('[data-showcase-content]');
    if (pane) pane.scrollTop = 0;
  });
}

/**
 * The check that decides whether a take is kept.
 *
 * Throws with what it wanted and what was there instead, because "element not
 * found" tells you nothing at the point you are looking at twenty clips trying
 * to work out which one went wrong.
 */
export async function expectText(page, needle, { where = '[data-showcase-content]', timeout = 8000 } = {}) {
  try {
    await page.waitForFunction(
      ([sel, text]) => {
        const root = document.querySelector(sel) || document.body;
        return (root.textContent || '').includes(text);
      },
      [where, needle],
      { timeout },
    );
  } catch {
    const seen = await page.evaluate((sel) => {
      const root = document.querySelector(sel) || document.body;
      return (root.textContent || '').slice(0, 300);
    }, where);
    throw new Error(`expected "${needle}" on screen; the panel said: ${JSON.stringify(seen)}`);
  }
}

/**
 * A control, by its visible words.
 *
 * Buttons first, plain text only as a fallback. Matching text alone found the
 * *heading* of the example card — "Delete Confirmation" — in preference to the
 * "Delete Collection" button inside it, clicked a span, and recorded a perfect
 * clip of a modal that never opened. A component library's showcase is full of
 * headings that describe the control below them, so the order matters.
 */
export async function clickText(page, text, { timeout = 8000 } = {}) {
  const button = page.getByRole('button', { name: text, exact: false }).first();
  if (await button.count()) {
    await button.waitFor({ state: 'visible', timeout });
    await button.click();
    return;
  }
  const target = page.getByText(text, { exact: false }).first();
  await target.waitFor({ state: 'visible', timeout });
  await target.click();
}

/**
 * Type into the playground's Monaco editor.
 *
 * Select-all then type, rather than clicking to a position: a click lands on
 * whatever character happens to be under the coordinate, which is a different
 * character each time the snippet changes. The whole buffer is short enough
 * that replacing it is both reliable and reads perfectly well on film.
 */
export async function retypeEditor(page, code, { delay = 34 } = {}) {
  const editor = page.locator('.monaco-editor').first();
  await editor.waitFor({ state: 'visible', timeout: 20_000 });
  await editor.click();
  await page.keyboard.press('Control+A');
  await page.keyboard.press('Delete');
  await page.keyboard.type(code, { delay });
}

/** Is the showcase up and past its boot? */
export async function appHealth(page) {
  return page.evaluate(() => ({
    booted: Boolean(document.querySelector('[data-showcase-content]')),
    catalog: Boolean(window.__DUI_SHOWCASE__),
    total: window.__DUI_SHOWCASE__?.total ?? 0,
  }));
}
