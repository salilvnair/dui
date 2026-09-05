/**
 * The import path is the one place a palette arrives from outside, so this is
 * mostly a test that bad input is refused rather than that good input works.
 */
import { describe, it, expect } from 'vitest';
import { TERMINAL_PALETTES } from './TerminalPalette';
import {
  isTerminalColor, parseTerminalThemes, serializeTerminalThemes,
  terminalThemeTemplate, TERMINAL_ANSI_KEYS, MAX_THEMES_PER_IMPORT,
} from './TerminalPaletteFile';

describe('isTerminalColor', () => {
  it('takes the forms a palette is written in', () => {
    for (const ok of ['#fff', '#FFF', '#1e1e1e', '#1e1e1eff',
      'rgb(0,0,0)', 'rgba(122, 162, 247, .28)', 'rgba(0,0,0,1)']) {
      expect(isTerminalColor(ok), ok).toBe(true);
    }
  });

  it('refuses anything that could carry more than a colour', () => {
    for (const bad of [
      // The reason this file exists: valid JSON, and CSS once it lands.
      'red; background-image: url(https://elsewhere/p.png)',
      '#fff; position:fixed',
      'url(javascript:alert(1))',
      'var(--color-surface)',
      'color-mix(in srgb, red, blue)',
      'expression(alert(1))',
      // Named colours are refused too — see the comment on the grammar.
      'rebeccapurple', 'transparent',
      // Shapes that look right and are not.
      '#12', '#1234567', 'rgb(300,0,0)', 'rgb(0,0)', 'rgba(0,0,0,2)',
      '', '   ', '#'.repeat(64),
    ]) {
      expect(isTerminalColor(bad), bad).toBe(false);
    }
  });

  it('refuses non-strings, including the ones that stringify to a colour', () => {
    for (const bad of [null, undefined, 0, {}, [], ['#fff'],
      { toString: () => '#ffffff' }]) {
      expect(isTerminalColor(bad)).toBe(false);
    }
  });
});

describe('parseTerminalThemes', () => {
  const good = terminalThemeTemplate();

  it('round-trips what an export writes', () => {
    const out = parseTerminalThemes(serializeTerminalThemes(TERMINAL_PALETTES));
    expect(out.ok).toBe(true);
    if (!out.ok) return;
    expect(out.themes.map(t => t.id)).toEqual(TERMINAL_PALETTES.map(t => t.id));
    expect(out.themes[0].dark).toEqual(TERMINAL_PALETTES[0].dark);
  });

  it('takes a bare theme, because that is what a model returns', () => {
    const out = parseTerminalThemes(JSON.stringify(good));
    expect(out.ok).toBe(true);
    if (out.ok) expect(out.themes).toHaveLength(1);
  });

  it('takes a bare array', () => {
    const out = parseTerminalThemes([good, { ...good, id: 'other' }]);
    expect(out.ok).toBe(true);
    if (out.ok) expect(out.themes).toHaveLength(2);
  });

  it('names the field that was wrong', () => {
    const out = parseTerminalThemes({ ...good, dark: { ...good.dark, red: 'red; x:y' } });
    expect(out.ok).toBe(false);
    if (!out.ok) expect(out.error).toContain('dark.red');
  });

  it('refuses a theme missing any one slot', () => {
    for (const key of TERMINAL_ANSI_KEYS) {
      const dark: Record<string, unknown> = { ...good.dark };
      delete dark[key];
      const out = parseTerminalThemes({ ...good, dark });
      expect(out.ok, key).toBe(false);
      if (!out.ok) expect(out.error).toContain(key);
    }
  });

  it('derives a light variant when one is missing, and says that it did', () => {
    const { light: _drop, ...darkOnly } = good;
    const out = parseTerminalThemes(darkOnly);
    expect(out.ok).toBe(true);
    if (!out.ok) return;
    const t = out.themes[0];
    expect(t.lightDerived).toBe(true);
    // Derived, not copied: a theme used on a light ground with its dark
    // colours is the bug this replaced.
    expect(t.light).not.toEqual(t.dark);
    // And every derived value is still a colour, so it survives its own
    // validator on the way back in.
    for (const key of TERMINAL_ANSI_KEYS) {
      expect(isTerminalColor(t.light[key]), key).toBe(true);
    }
  });

  it('leaves an authored light variant alone', () => {
    const out = parseTerminalThemes(good);
    expect(out.ok).toBe(true);
    if (!out.ok) return;
    expect(out.themes[0].lightDerived).toBe(false);
    expect(out.themes[0].light).toEqual(good.light);
  });

  it('derives ink that is actually darker than the dark palette', () => {
    const { light: _drop, ...darkOnly } = good;
    const out = parseTerminalThemes(darkOnly);
    if (!out.ok) return;
    const luma = (hex: string) => {
      const n = parseInt(hex.slice(1), 16);
      return (0.299 * ((n >> 16) & 255) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255;
    };
    // The whole point: colours chosen to glow on near-black become ink on
    // near-white, so the foreground must end up dark.
    expect(luma(out.themes[0].light.foreground)).toBeLessThan(0.5);
  });

  it('refuses ids that are not usable as ids', () => {
    for (const id of ['', 'a', 'Has Caps', 'has space', '-lead', 'trail-',
      'x'.repeat(60), '../../etc', '__proto__']) {
      const out = parseTerminalThemes({ ...good, id });
      expect(out.ok, id).toBe(false);
    }
  });

  it('refuses two themes with the same id', () => {
    const out = parseTerminalThemes([good, good]);
    expect(out.ok).toBe(false);
    if (!out.ok) expect(out.error).toContain('share the id');
  });

  it('refuses a file from a version it does not read', () => {
    const out = parseTerminalThemes({ 'dui.terminalTheme': 99, themes: [good] });
    expect(out.ok).toBe(false);
    if (!out.ok) expect(out.error).toContain('version 99');
  });

  it('bounds what one file may carry', () => {
    const many = Array.from({ length: MAX_THEMES_PER_IMPORT + 1 },
      (_, i) => ({ ...good, id: `t${i}` }));
    const out = parseTerminalThemes(many);
    expect(out.ok).toBe(false);
    if (!out.ok) expect(out.error).toContain('limit');
  });

  it('says so plainly when it is not JSON at all', () => {
    expect(parseTerminalThemes('not json {').ok).toBe(false);
    expect(parseTerminalThemes('').ok).toBe(false);
    expect(parseTerminalThemes([]).ok).toBe(false);
  });

  it('does not let a prototype through the parse', () => {
    const out = parseTerminalThemes(
      '{"id":"x9","label":"x","dark":{"__proto__":{"polluted":1}}}');
    expect(out.ok).toBe(false);
    expect(({} as Record<string, unknown>).polluted).toBeUndefined();
  });
});
