/**
 * How big an icon is, decided by what it is doing rather than by eye.
 *
 * A survey of one panel found fourteen distinct sizes across a hundred and
 * sixty-nine icons. Most of those clustered sensibly — the same handful of
 * numbers doing the same handful of jobs — but the tail was one-offs, and
 * worse, the same SLOT sometimes rendered at two sizes depending on state: a
 * tab whose icon was 12px normally and 11px when locked, so the row twitched
 * as permissions changed.
 *
 * Naming the roles is what stops that. A number picked at the call site is a
 * number nobody can check; a role can be read against its neighbours.
 *
 * The values are the ones already dominant in the product — this is a name for
 * what was mostly happening, not a new scale imposed on it.
 */
export const IconSize = {
  /** Inside a badge or chip, where the text is 8px. */
  chip: 9,
  /** Beside text in a dense row — a caption, a hint, a status word. */
  inline: 11,
  /** The common one: row actions, menu entries, buttons. */
  action: 12,
  /** A list item's kind marker, where the icon identifies the row. */
  item: 13,
  /** The leading glyph of a file or table row, and headers of that weight. */
  row: 15,
  /** Back arrows, tab-strip marks — navigation rather than action. */
  nav: 16,
  /** A clickable square standing on its own, like a select-all box. */
  control: 19,
  /** A state the panel is reporting, at the size of the thing it interrupts. */
  state: 20,
  /** The empty-state medallion. */
  medallion: 22,
} as const;

export type IconRole = keyof typeof IconSize;
