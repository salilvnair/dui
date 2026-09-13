/**
 * The chip's fifty looks, and the two sub-pixel corrections under them.
 *
 * The table is data, and data that only one component reads is data nothing
 * checks. These are the properties that make a look safe to switch to
 * globally: every id resolves, no two skins share one, and none of them
 * quietly changes the chip's size — a skin that did would break the alignment
 * of every row it appears in, which is exactly the drift the component was
 * written to end.
 */
import { describe, it, expect } from 'vitest';
import { BADGE_CHIP_SKINS, CHIP_SKIN_BY_ID, DEFAULT_CHIP_VARIANT,
  type ChipSkin } from './badge-chip-skins';
import { chipBoxStyle, chipDotStyle, chipTextStyle, type BadgeChipSize } from './BadgeChipView';

const SIZES: BadgeChipSize[] = ['2xs', 'xs', 'sm', 'md'];
const HEIGHT: Record<BadgeChipSize, number> = { '2xs': 10, xs: 14, sm: 16, md: 18 };
const TONE = '#22c55e';

describe('the table', () => {
  it('has fifty looks', () => {
    expect(BADGE_CHIP_SKINS).toHaveLength(50);
  });

  it('has no duplicate ids', () => {
    const ids = BADGE_CHIP_SKINS.map(s => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('names and describes every one of them, for the picker', () => {
    for (const s of BADGE_CHIP_SKINS) {
      expect(s.label.trim()).not.toBe('');
      expect(s.note.trim()).not.toBe('');
    }
  });

  it('is reachable by id', () => {
    for (const s of BADGE_CHIP_SKINS) expect(CHIP_SKIN_BY_ID[s.id]).toBe(s);
  });

  it('defaults to one that exists', () => {
    expect(CHIP_SKIN_BY_ID[DEFAULT_CHIP_VARIANT]).toBeDefined();
  });
});

describe('a skin decides the surface, never the size', () => {
  it('keeps the height the size asked for', () => {
    for (const skin of BADGE_CHIP_SKINS) {
      for (const size of SIZES) {
        expect(chipBoxStyle(skin, TONE, size).height).toBe(HEIGHT[size]);
      }
    }
  });

  it('keeps the font size the size asked for', () => {
    const fs = { '2xs': 6, xs: 7.5, sm: 8, md: 9 };
    for (const skin of BADGE_CHIP_SKINS) {
      for (const size of SIZES) {
        expect(chipBoxStyle(skin, TONE, size).fontSize).toBe(fs[size]);
      }
    }
  });

  it('always centres its content', () => {
    for (const skin of BADGE_CHIP_SKINS) {
      const box = chipBoxStyle(skin, TONE, 'sm');
      expect(box.alignItems).toBe('center');
      expect(box.justifyContent).toBe('center');
    }
  });
});

describe('the corrections', () => {
  /*
    The one that was actually visible. Letter-spacing is added after the last
    character too, so the trailing gap sits inside the box being centred and
    pushes the ink left by half the tracking.
  */
  it('takes the trailing letter-space back out wherever there is tracking', () => {
    /* `as const satisfies` narrows each entry to its own literal type, so the
       optional keys are absent from the union rather than optional on it. */
    for (const skin of BADGE_CHIP_SKINS as readonly ChipSkin[]) {
      const tracking = skin.tracking ?? 0.08;
      const t = chipTextStyle(skin, 'sm');
      if (tracking) expect(t?.marginRight).toBe(`-${tracking}em`);
      else expect(t?.marginRight).toBeUndefined();
    }
  });

  it('nudges caps down by the measured amount, and sentence case not at all', () => {
    const nudge = { '2xs': '0.3px', xs: '0.2px', sm: undefined, md: '0.1px' };
    for (const size of SIZES) {
      const caps = chipTextStyle(CHIP_SKIN_BY_ID.quiet, size);
      const sentence = chipTextStyle(CHIP_SKIN_BY_ID['mui-filled'], size);
      expect(caps?.transform).toBe(nudge[size] ? `translateY(${nudge[size]})` : undefined);
      expect(sentence?.transform).toBeUndefined();
    }
  });
});

describe('an icon beside the word stays beside it', () => {
  /*
    The regression that made this worth a test: the children used to sit in the
    chip's own flex box, and wrapping them in a span to carry the centring
    corrections put them in inline flow instead. An `<svg>` is `display: block`
    under a Tailwind reset, so it took a line of its own — the REST status
    bar's performance badge became a gauge on one line and the reading on the
    next.
  */
  it('keeps the text span a flex row for every skin', () => {
    for (const skin of BADGE_CHIP_SKINS as readonly ChipSkin[]) {
      for (const size of SIZES) {
        const t = chipTextStyle(skin, size);
        expect(t.display).toBe('inline-flex');
        expect(t.alignItems).toBe('center');
      }
    }
  });
});

describe('what the skins actually draw', () => {
  it('gives the raised one its three edges and nothing else one of them', () => {
    const raised = String(chipBoxStyle(CHIP_SKIN_BY_ID.embossed, TONE, 'sm').boxShadow);
    expect(raised).toContain('inset 0 1px 0');
    expect(raised).toContain('0 1px 2px');
    expect(chipBoxStyle(CHIP_SKIN_BY_ID.quiet, TONE, 'sm').boxShadow).toBeUndefined();
    expect(chipBoxStyle(CHIP_SKIN_BY_ID.flat, TONE, 'sm').boxShadow).toBeUndefined();
  });

  it('puts ink on a solid fill rather than the tone, which would vanish', () => {
    expect(chipBoxStyle(CHIP_SKIN_BY_ID.solid, TONE, 'sm').color).toBe('#101010');
    expect(chipBoxStyle(CHIP_SKIN_BY_ID.solid, TONE, 'sm').background).toBe(TONE);
  });

  it('leaves a bare skin with no box to speak of', () => {
    const box = chipBoxStyle(CHIP_SKIN_BY_ID.text, TONE, 'sm');
    expect(box.background).toBeUndefined();
    expect(box.border).toBeUndefined();
    expect(box.padding).toBe(0);
    expect(box.color).toBe(TONE);
  });

  it('rounds a pill fully and squares a rail', () => {
    expect(chipBoxStyle(CHIP_SKIN_BY_ID.pill, TONE, 'sm').borderRadius).toBe(999);
    expect(chipBoxStyle(CHIP_SKIN_BY_ID.rail, TONE, 'sm').borderRadius).toBe(0);
    expect(chipBoxStyle(CHIP_SKIN_BY_ID.rail, TONE, 'sm').borderLeft).toContain('2px solid');
  });

  it('drops the uppercase on the sentence-case families', () => {
    for (const id of ['mui-filled', 'm3-assist', 'github-label', 'stripe-badge']) {
      expect(chipBoxStyle(CHIP_SKIN_BY_ID[id], TONE, 'sm').textTransform).toBe('none');
    }
    expect(chipBoxStyle(CHIP_SKIN_BY_ID.quiet, TONE, 'sm').textTransform).toBe('uppercase');
  });

  it('sizes the dot from the size, for the skins that have one', () => {
    expect(chipDotStyle(TONE, 'sm').width).toBe(5);
    expect(chipDotStyle(TONE, 'md').width).toBe(6);
  });
});
