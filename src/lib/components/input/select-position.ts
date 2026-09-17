/**
 * Where a select's menu goes, and how tall it is allowed to be.
 *
 * ── Why this is its own module ──
 *
 * It used to live inline in `SelectInputView`, with a copy of the same
 * arithmetic in the test beside it and a comment promising the two were "kept
 * in step by construction". They were, for a while. A test that owns a second
 * copy of the thing it is testing cannot fail when the first copy drifts,
 * which is the one job it had — so there is now one function, and the test
 * imports it.
 *
 * ── The rule ──
 *
 * The decision has to use the height the menu will ACTUALLY be, not the height
 * of its contents. `scrollHeight` for a few hundred options is many thousands
 * of pixels; comparing that against the space on either side made every long
 * list decide nothing fitted, fall through to opening downward, and run off
 * the bottom of the window. The longer the list, the more certain it was to do
 * the wrong thing.
 *
 * So: cap the height first, then choose the side with room, then clamp to the
 * room that side actually has. The menu scrolls internally rather than past
 * the edge of the window.
 */

/** Nothing taller than this, however long the list. */
export const MAX_MENU_H = 380;

/**
 * Never collapse to a sliver.
 *
 * A trigger a few pixels from an edge has almost no room on that side, and a
 * 12px menu is unusable — better to overlap the trigger slightly and stay
 * readable. `placeSelectMenu` honours that by keeping the height and sliding
 * the menu back inside the window, rather than by letting it hang over the
 * edge where the overlapped part cannot be reached at all.
 */
export const MIN_MENU_H = 120;

/** Distance kept from the edge of the window. */
const VIEWPORT_MARGIN = 8;

/** Distance between the trigger and its menu. */
const GAP = 4;

export interface MenuPlacement {
  side: 'above' | 'below';
  /** Viewport coordinate for the menu's top edge. */
  top: number;
  /** What the menu may grow to. It scrolls beyond this. */
  maxHeight: number;
}

/**
 * Place the menu for a trigger at `rect` in a window `viewportHeight` tall.
 *
 * `contentHeight` is the menu's `scrollHeight` — what it would be if nothing
 * constrained it. It informs the choice of side and never the final height.
 */
export function placeSelectMenu(
  rect: { top: number; bottom: number },
  contentHeight: number,
  viewportHeight: number,
): MenuPlacement {
  const cap = Math.min(MAX_MENU_H, viewportHeight * 0.7);
  const content = contentHeight || 200;
  /* Only for choosing a side: "would it fit below?" is asked of the height the
     menu would like, not of the ceiling it is allowed. */
  const wanted = Math.min(content, cap);

  const spaceBelow = viewportHeight - rect.bottom - VIEWPORT_MARGIN;
  const spaceAbove = rect.top - VIEWPORT_MARGIN;

  /* Below when it fits, and otherwise whichever side has more — a menu that
     is cramped either way should at least be cramped on the roomier side. */
  const below = spaceBelow >= wanted || spaceBelow >= spaceAbove;

  /*
    ── A ceiling, not a height ──

    This is `max-height`: the menu sizes itself to its own content and scrolls
    only past this. Setting it to the content's own height therefore does
    nothing useful and one thing harmful — the box is `border-box`, so a
    `max-height` equal to `scrollHeight` leaves a content area a pixel or two
    SHORTER than the content it was measured from, and the menu grows a
    scrollbar to cover the difference.

    That is how a five-item list with a thousand pixels of clear space under it
    ended up scrolling: 151px of content, capped at 151px, 150px to put it in.

    So the ceiling is the room there is, capped. Content decides the height;
    this only decides when it stops growing.
  */
  const limit = Math.max(0, viewportHeight - 2 * VIEWPORT_MARGIN);
  const room = Math.max(0, (below ? spaceBelow : spaceAbove) - GAP);
  const maxHeight = Math.min(Math.max(Math.min(room, cap), MIN_MENU_H), limit);

  /* How tall it will actually be, which is what the position has to be built
     from — a short menu placed as though it were the full ceiling would float
     a couple of hundred pixels above the trigger it belongs to. */
  const height = Math.min(maxHeight, content);

  /*
    Then put it on screen, which is a separate question from how tall it is.

    When the chosen side has less room than the minimum, the menu is wider
    than its side and the preferred position hangs off the edge — downward
    into 98px of room with 120px of menu is 18px past the bottom of a short
    panel, and that 18px is not "slightly overlapped", it is unreachable.

    Clamping the position instead spends the overlap on the trigger, which is
    a control the reader has already finished with, rather than on the window
    edge, which eats it.
  */
  const preferred = below ? rect.bottom + GAP : rect.top - height - GAP;
  const lowest = Math.max(VIEWPORT_MARGIN, viewportHeight - VIEWPORT_MARGIN - height);
  const top = Math.min(Math.max(VIEWPORT_MARGIN, preferred), lowest);

  return { side: below ? 'below' : 'above', top, maxHeight };
}
