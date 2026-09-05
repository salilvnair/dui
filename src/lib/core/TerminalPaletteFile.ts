/**
 * Terminal palettes as a file: reading them, writing them, and refusing them.
 *
 * ── Why this is a validator and not a `JSON.parse` ──
 *
 * Every colour in a palette ends up in CSS. xterm writes them into inline
 * styles and CSS custom properties, and a string that arrives from a file, a
 * clipboard or a language model is not a colour just because it sits in a
 * field named `red`. A value like
 *
 *     "red; background-image: url(https://elsewhere/pixel.png)"
 *
 * is a perfectly ordinary JSON string and a CSS injection, and the difference
 * is this file.
 *
 * So nothing is trusted and nothing is repaired. Every value is matched
 * against a strict colour grammar — hex or rgb()/rgba(), nothing else, no
 * named colours, no `var()`, no functions — and a palette with one bad value
 * is rejected whole, with the field named. Repairing it would mean guessing
 * what someone meant by a string that had no business being there.
 *
 * ── Why there are limits on sizes and counts ──
 *
 * An import is a file the user did not write, and "how big" is the other half
 * of "what shape". A 40 MB JSON array of 200,000 themes is valid JSON, and
 * parsing it into a store that is written back to localStorage on every change
 * is a way to wedge the panel. The caps here are generous for a human and
 * uninteresting to anyone trying.
 */
import type { TerminalAnsi, TerminalPalette } from './TerminalPalette';

/**
 * The sixteen slots plus the three that go with them, named once.
 *
 * Written out rather than derived from a sample palette: this list is what
 * "complete" means for an import, and deriving it from data would mean a typo
 * in a built-in silently changed what imports are allowed to contain.
 */
export const TERMINAL_ANSI_KEYS = [
  'foreground', 'cursor', 'selectionBackground',
  'black', 'red', 'green', 'yellow',
  'blue', 'magenta', 'cyan', 'white',
  'brightBlack', 'brightRed', 'brightGreen', 'brightYellow',
  'brightBlue', 'brightMagenta', 'brightCyan', 'brightWhite',
] as const satisfies readonly (keyof TerminalAnsi)[];

/**
 * What counts as a colour.
 *
 * `#rgb`, `#rrggbb`, `#rrggbbaa`, and `rgb()`/`rgba()` with plain numbers. No
 * named colours — not because `rebeccapurple` is dangerous but because the
 * moment names are allowed the check becomes a list someone has to maintain,
 * and the failure mode of a missing entry is a theme that renders as black on
 * black. No `var()`, no `color-mix()`, no `url()`, no anything else: a
 * terminal palette has never needed one, and each is a way for a value to mean
 * something other than a colour.
 */
const HEX = /^#(?:[0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i;
const RGB = /^rgba?\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*(?:,\s*(?:0|1|0?\.\d{1,4})\s*)?\)$/i;

export function isTerminalColor(v: unknown): v is string {
  if (typeof v !== 'string') return false;
  const s = v.trim();
  // Length first: the regexes are anchored and linear, but a megabyte-long
  // candidate is not a colour under any reading and there is no reason to walk
  // it to find that out.
  if (s.length === 0 || s.length > 32) return false;
  if (HEX.test(s)) return true;
  if (!RGB.test(s)) return false;
  // rgb(999,999,999) matches the shape and is not a colour. Checked here
  // rather than in the pattern, where the alternation would be unreadable.
  const parts = s.slice(s.indexOf('(') + 1, s.lastIndexOf(')')).split(',');
  return parts.slice(0, 3).every(p => Number(p.trim()) <= 255);
}

/** Ids are used as object keys, DOM keys and a stored preference. */
const ID = /^[a-z0-9][a-z0-9-]{0,38}[a-z0-9]$/;

const MAX_LABEL = 40;
/**
 * A ceiling on how many themes one import may carry.
 *
 * Not a guess at how many anyone wants — the picker shows six — but a bound on
 * what a file is allowed to do to the store behind it.
 */
export const MAX_THEMES_PER_IMPORT = 50;
/** The same bound on the whole collection, built-ins included. */
export const MAX_THEMES_STORED = 200;

/** The wrapper an export writes and an import recognises. */
export const TERMINAL_THEME_FORMAT = 'dui.terminalTheme';
export const TERMINAL_THEME_VERSION = 1;

export interface TerminalThemeFile {
  [TERMINAL_THEME_FORMAT]: number;
  themes: TerminalPalette[];
}

export type TerminalThemeParse =
  | { ok: true; themes: TerminalPalette[] }
  | { ok: false; error: string };

function ansiOf(raw: Record<string, unknown>, where: string):
{ ok: true; ansi: TerminalAnsi } | { ok: false; error: string } {
  const out: Record<string, string> = {};
  for (const key of TERMINAL_ANSI_KEYS) {
    const v = raw[key];
    if (v === undefined) return { ok: false, error: `${where} is missing "${key}".` };
    if (!isTerminalColor(v)) {
      return {
        ok: false,
        error: `${where}.${key} is not a colour. Use #rgb, #rrggbb, #rrggbbaa, `
          + 'rgb(r,g,b) or rgba(r,g,b,a).',
      };
    }
    out[key] = String(v).trim();
  }
  return { ok: true, ansi: out as unknown as TerminalAnsi };
}

function paletteOf(raw: unknown, where: string): TerminalThemeParse {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
    return { ok: false, error: `${where} is not an object.` };
  }
  const o = raw as Record<string, unknown>;

  const id = typeof o.id === 'string' ? o.id.trim().toLowerCase() : '';
  if (!ID.test(id)) {
    return {
      ok: false,
      error: `${where}.id must be lowercase letters, digits and dashes `
        + '(2 to 40 characters).',
    };
  }

  const label = typeof o.label === 'string' ? o.label.trim() : '';
  if (!label || label.length > MAX_LABEL) {
    return { ok: false, error: `${where}.label must be 1 to ${MAX_LABEL} characters.` };
  }

  const dark = ansiOf((o.dark ?? {}) as Record<string, unknown>, `${where}.dark`);
  if (!dark.ok) return dark;

  /*
    A light variant is optional, and its absence is not filled in.

    Deriving one would mean darkening every colour by some factor, and that is
    exactly the thing the palettes themselves refuse to do — a published light
    palette is a different set of decisions, not a transform of the dark one.
    A theme with no light variant is honestly a dark theme, and the UI says so
    rather than shipping a guess under the author's name.
  */
  let light: TerminalAnsi | undefined;
  if (o.light !== undefined) {
    const l = ansiOf(o.light as Record<string, unknown>, `${where}.light`);
    if (!l.ok) return l;
    light = l.ansi;
  }

  // The swatch is the one colour that stands for the theme in the picker.
  // Falling back to the dark blue is better than rejecting a theme over the
  // one field a hand-written file is most likely to leave out.
  const swatch = isTerminalColor(o.swatch) ? String(o.swatch).trim() : dark.ansi.blue;

  return {
    ok: true,
    themes: [{ id, label, swatch, dark: dark.ansi, light: light ?? dark.ansi }],
  };
}

/**
 * Read a theme file, a bare theme, or an array of either.
 *
 * All three because all three get pasted. An export writes the wrapper, a
 * model asked for "a theme" writes one object, and someone assembling a few by
 * hand writes an array — refusing two of those on a technicality would be a
 * validator being pedantic rather than careful.
 */
export function parseTerminalThemes(input: unknown): TerminalThemeParse {
  let raw = input;

  if (typeof raw === 'string') {
    if (raw.length > 2_000_000) return { ok: false, error: 'That file is too large to be a theme.' };
    try { raw = JSON.parse(raw); } catch { return { ok: false, error: 'That is not valid JSON.' }; }
  }

  let list: unknown[];
  if (Array.isArray(raw)) {
    list = raw;
  } else if (raw && typeof raw === 'object' && Array.isArray((raw as TerminalThemeFile).themes)) {
    const version = (raw as Record<string, unknown>)[TERMINAL_THEME_FORMAT];
    /*
      An unknown version is refused rather than attempted.

      A file from a later format may hold fields this build would drop, and
      silently importing three quarters of a theme gives someone a palette that
      is wrong in a way they cannot see.
    */
    if (version !== undefined && version !== TERMINAL_THEME_VERSION) {
      return {
        ok: false,
        error: `That file is version ${String(version)} and this build reads `
          + `version ${TERMINAL_THEME_VERSION}.`,
      };
    }
    list = (raw as TerminalThemeFile).themes;
  } else {
    list = [raw];
  }

  if (list.length === 0) return { ok: false, error: 'That file holds no themes.' };
  if (list.length > MAX_THEMES_PER_IMPORT) {
    return { ok: false, error: `That file holds ${list.length} themes; the limit is ${MAX_THEMES_PER_IMPORT}.` };
  }

  const themes: TerminalPalette[] = [];
  const seen = new Set<string>();
  for (let i = 0; i < list.length; i++) {
    const where = list.length === 1 ? 'The theme' : `Theme ${i + 1}`;
    const one = paletteOf(list[i], where);
    if (!one.ok) return one;
    const t = one.themes[0];
    if (seen.has(t.id)) return { ok: false, error: `Two themes in that file share the id "${t.id}".` };
    seen.add(t.id);
    themes.push(t);
  }
  return { ok: true, themes };
}

/** What an export writes — pretty-printed, because someone will edit it. */
export function serializeTerminalThemes(themes: TerminalPalette[]): string {
  const file: TerminalThemeFile = {
    [TERMINAL_THEME_FORMAT]: TERMINAL_THEME_VERSION,
    themes,
  };
  return JSON.stringify(file, null, 2);
}

/**
 * A theme to start from.
 *
 * Grey rather than beautiful, on purpose: a template that already looks like a
 * finished palette invites changing four colours and keeping twelve, which is
 * how you get a theme that is mostly someone else's. Every slot here is
 * obviously a placeholder.
 */
export function terminalThemeTemplate(id = 'my-theme', label = 'My Theme'): TerminalPalette {
  const ansi: TerminalAnsi = {
    foreground: '#cccccc', cursor: '#cccccc', selectionBackground: 'rgba(128,128,128,.28)',
    black: '#3a3a3a', red: '#c05050', green: '#5f9f5f', yellow: '#b08a3c',
    blue: '#5580b0', magenta: '#9a6fa8', cyan: '#4f9a9a', white: '#b0b0b0',
    brightBlack: '#5a5a5a', brightRed: '#e06060', brightGreen: '#78c078',
    brightYellow: '#d4a54c', brightBlue: '#6f9fd0', brightMagenta: '#b98ac6',
    brightCyan: '#68b8b8', brightWhite: '#e6e6e6',
  };
  return { id, label, swatch: '#5580b0', dark: ansi, light: ansi };
}
