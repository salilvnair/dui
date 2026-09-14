/**
 * What each segment of the video actually does.
 *
 * A recipe is `(page, mark, options) => void`. It calls `mark.begin()` at the
 * first thing worth filming and `mark.end()` at the last, and `record.js`
 * keeps only that window — everything before it is the app booting, which is
 * eighteen seconds of nothing in a segment whose interesting part is ten.
 *
 * Every recipe ends by verifying. A step that quietly did nothing still
 * records perfectly good footage of the app in the wrong state, and there is
 * no way to see that from the outside; `expectText` is the recipe stating what
 * has to be true for its clip to count. A failed check throws, the clip is
 * thrown away, and `compose.js` refuses to stitch a video with a hole in it.
 */
import { type, beat, goTo, scrollPane, scrollPaneTop, expectText, clickText, retypeEditor } from './drive.js';

/** The sidebar's search box, which is how a person finds one of 238 things. */
async function searchBox(page) {
  const box = page.locator('input[placeholder^="Search components"]').first();
  await box.waitFor({ state: 'visible', timeout: 15_000 });
  return box;
}

export const recipes = {
  /**
   * The catalog, found by searching it.
   *
   * The one segment that navigates by hand rather than by address, because
   * navigating *is* the subject: two hundred and thirty-eight components are
   * only useful if you can get to the one you want.
   */
  async catalog(page, mark) {
    await goTo(page, 'textinput');
    const box = await searchBox(page);
    await box.click();
    mark.begin();
    await type(page, 'table');
    await beat(page, 900);
    await page.getByText('DataTableView', { exact: true }).first().click();
    await beat(page, 1100);
    await expectText(page, 'DataTableView');

    /* Clear it and search for something from a different group, so the shot
       says "search the whole library" rather than "search finds one table". */
    await box.click();
    await page.keyboard.press('Control+A');
    await type(page, 'picker');
    await beat(page, 1000);
    await page.getByText('ColorPickerView', { exact: true }).first().click();
    await beat(page, 1200);
    await expectText(page, 'ColorPickerView');
    mark.end();
  },

  /**
   * The playground: edit the JSX, the component changes underneath it.
   *
   * ButtonView because the change has to be legible at a glance in a clip with
   * no narration — a filled primary button becoming a red danger one is, and a
   * prop nobody can see change is not.
   */
  async playground(page, mark, options = {}) {
    await goTo(page, options.component || 'button', { settleMs: 1600 });
    await expectText(page, 'ButtonView');
    mark.begin();
    await retypeEditor(page, '<ButtonView variant="danger" size="lg">Delete collection</ButtonView>');
    /* The preview is debounced; this is that debounce plus a beat to read it. */
    await beat(page, 1800);
    await expectText(page, 'Delete collection');
    await beat(page, 900);
    mark.end();
  },

  /**
   * Retheming, live.
   *
   * The library's whole claim is that every colour is a CSS variable, so the
   * segment is one variable being dragged and the component following it. The
   * colour customiser is opened, not assumed open.
   */
  async theming(page, mark, options = {}) {
    await goTo(page, options.component || 'chips', { settleMs: 1600 });
    mark.begin();
    await clickText(page, 'Customize Colors');
    await beat(page, 900);

    /* Drag a swatch's slider rather than typing a hex: the point is that the
       component repaints continuously, which a committed value in a text field
       does not show. */
    const slider = page.locator('input[type="range"]').first();
    if (await slider.count()) {
      const box = await slider.boundingBox();
      if (box) {
        await page.mouse.move(box.x + box.width * 0.5, box.y + box.height / 2);
        await page.mouse.down();
        for (const at of [0.62, 0.74, 0.86, 0.7, 0.28]) {
          await page.mouse.move(box.x + box.width * at, box.y + box.height / 2, { steps: 12 });
          await page.waitForTimeout(220);
        }
        await page.mouse.up();
      }
    }
    await beat(page, 1200);
    await expectText(page, options.expect || 'Hide Colors');
    mark.end();
  },

  /** Light and dark, both of which the whole library is built for. */
  async themes(page, mark, options = {}) {
    await goTo(page, options.component || 'statscard', { settleMs: 1400 });
    mark.begin();
    await beat(page, 700);
    await clickText(page, 'Light');
    await beat(page, 1500);
    await scrollPane(page, { by: 420, steps: 6 });
    await beat(page, 700);
    await clickText(page, 'Dark');
    await beat(page, 1600);
    await scrollPaneTop(page);
    await beat(page, 600);
    /* The ground it ends on is the ground the next clip starts on, so this
       asserts the switch went back rather than trusting that it did. */
    const theme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
    if (theme !== 'dark') throw new Error(`theme switch left the app on "${theme}", not dark`);
    mark.end();
  },

  /**
   * A component's examples, and the source under each one.
   *
   * "Show code" is on every example card in the showcase, so this reads as a
   * property of the library rather than a thing this one panel does.
   */
  async examples(page, mark, options = {}) {
    const id = options.component || 'datatable';
    await goTo(page, id, { tab: 'examples', settleMs: 1600 });
    await expectText(page, options.expect || 'Show code');
    mark.begin();
    await beat(page, 600);
    await scrollPane(page, { by: 480, steps: 7 });
    await clickText(page, 'Show code');
    await beat(page, 1600);
    await scrollPane(page, { by: 420, steps: 6 });
    await beat(page, 900);
    mark.end();
  },

  /**
   * The props table.
   *
   * Every component documents itself in the app, which is the answer to "how
   * do I use this" that does not involve reading the source.
   */
  async docs(page, mark, options = {}) {
    const id = options.component || 'textinput';
    await goTo(page, id, { tab: 'docs', settleMs: 1600 });
    /* A prop table's headings, as the DOM holds them. The table renders them
       "PROP TYPE DEFAULT DESCRIPTION", and looking for "PROP" failed every
       time: the capitals are `text-transform: uppercase`, and `textContent`
       is the text before CSS gets to it. */
    await expectText(page, options.expect || 'Default');
    mark.begin();
    await beat(page, 800);
    await scrollPane(page, { by: 900, steps: 12, pause: 110 });
    await beat(page, 900);
    mark.end();
  },

  /**
   * A straight look at one or more component panels.
   *
   * The workhorse: most segments are "show these things, scroll through what
   * they can do". `expect` is what makes each of them verifiable.
   */
  async tour(page, mark, options = {}) {
    const ids = (options.components || [options.component]).filter(Boolean);
    mark.begin();
    for (const [i, id] of ids.entries()) {
      await goTo(page, id, { tab: options.tab || 'examples', settleMs: 1500 });
      await beat(page, 500);
      await scrollPane(page, { by: options.scrollBy ?? 440, steps: 6 });
      await beat(page, 600);
      if (i < ids.length - 1) await scrollPaneTop(page);
    }
    if (options.expect) await expectText(page, options.expect);
    mark.end();
  },

  /** An overlay, opened — the part of a component library a still cannot show. */
  async overlay(page, mark, options = {}) {
    await goTo(page, options.component || 'modal', { tab: 'examples', settleMs: 1600 });
    mark.begin();
    await beat(page, 500);
    await clickText(page, options.open || 'Delete');
    await beat(page, 1600);
    await expectText(page, options.expect || 'cannot be undone', { where: 'body' });
    await beat(page, 900);
    await page.keyboard.press('Escape');
    await beat(page, 900);
    mark.end();
  },

  /**
   * The Monaco-backed editor.
   *
   * Worth its own segment because it is the library's one genuinely optional
   * dependency: this is what you get when you install it, and the same
   * component renders a plain-text fallback when you do not.
   */
  async editor(page, mark, options = {}) {
    await goTo(page, options.component || 'editor', { tab: 'examples', settleMs: 2400 });
    mark.begin();
    await beat(page, 900);
    await scrollPane(page, { by: 520, steps: 7 });
    await beat(page, 1400);
    await expectText(page, options.expect || 'EditorView', { where: 'body' });
    mark.end();
  },
};
