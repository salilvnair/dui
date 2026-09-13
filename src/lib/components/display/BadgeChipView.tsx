/**
 * The small uppercase pill that labels a thing.
 *
 * A type, a state, a bound on a query, the volume a directory came from — the
 * recurring "this is one of a small set" mark. It was written out by hand in a
 * dozen places, and the copies had already drifted: different heights, two
 * font sizes, three border strengths, and only some of them lifted off the
 * surface. Side by side that reads as carelessness before anyone works out
 * what any individual chip says.
 *
 * ── The look is a value ──
 *
 * There was one look: a raised face with a lit top edge, a dark inner bottom
 * edge and a drop shadow. It reads well alone in a dense monospace row and
 * badly in a line of five, where every chip looks like a button you could
 * press and none of them are. So the look moved into `badge-chip-skins.ts` as
 * data — fifty of them — and this component interprets it. `variant` picks
 * one; `DuiProvider`'s `chipVariant` changes every chip in the product at once.
 *
 * The skin decides the surface and how the text is set. It does NOT decide the
 * height or the font size: those come from `size`, so chips in different skins
 * still line up on one baseline.
 *
 * ── Centring the text ──
 *
 * The text sat very slightly left of centre in every chip, which reads as
 * "not quite right" long before anyone identifies it. The cause is
 * letter-spacing: it is added AFTER the last character as well as between
 * them, so the trailing gap is inside the box being centred and the ink is
 * pushed left by half the tracking — 0.36px at `md`. A negative margin of one
 * tracking unit takes that trailing space back out.
 *
 * The vertical story is the one you would expect to matter and does not.
 * Measured against a real baseline probe in this font, the caps are centred to
 * within 0.04px at `sm` and 0.12px at `md`; only `2xs` is off by as much as a
 * third of a pixel. So the vertical nudge is per size and measured, rather
 * than the "half a descender" rule of thumb, which is worth about 0.4px in the
 * wrong direction at the sizes that matter.
 */
import type { CSSProperties, ReactNode } from 'react';
import { useDui } from '../../core/DuiContext';
import {
  CHIP_SKIN_BY_ID, DEFAULT_CHIP_VARIANT,
  type BadgeChipVariant, type ChipSkin,
} from './badge-chip-skins';

export type BadgeChipSize = '2xs' | 'xs' | 'sm' | 'md';
export type { BadgeChipVariant };

export interface BadgeChipViewProps {
  children: ReactNode;
  /**
   * The chip's colour, used for text, fill, border and the top highlight.
   *
   * One value rather than a palette per part: a chip whose border and text
   * disagree stops reading as a single object, and every call site that has
   * tried to tune them separately has produced something worse.
   */
  tone?: string;
  size?: BadgeChipSize;
  /**
   * Which of the fifty looks. Falls back to the provider's `chipVariant`, then
   * to the original raised one.
   */
  variant?: BadgeChipVariant;
  /**
   * Drop the tint and the border, keeping only the text.
   *
   * Kept for the callers that already say it. It is the `text` skin by another
   * name, and it wins over `variant` when both are given.
   */
  plain?: boolean;
  title?: string;
  className?: string;
  style?: CSSProperties;
}

/*
  `2xs` is for a chip that annotates something rather than labelling it.

  The mark beside a facet field name saying where the field came from is the
  case it was added for: at `xs` the chip stood taller than the 10.5px name it
  qualified, so the annotation read as the heading and the heading as its
  caption. A chip that outweighs its own subject is the wrong size whatever
  else is true of it.
*/
interface ChipSize {
  h: number; fs: number; px: number; r: number; dot: number;
  /**
   * Down by this many px to centre the caps.
   *
   * Measured, not derived: a baseline probe inside a rendered chip, against
   * the cap height of this font (0.656em). Rounding to whole pixels would
   * overshoot every one of them.
   */
  nudge: number;
}

/*
  Tightened, on the second look at them in place.

  The first set gave `md` a 20px box around 9px text — six pixels of air above
  and below a six-pixel cap, and eight either side. Beside a 11.5px label like
  "Status:" that reads as a button rather than a mark on the value. Roughly a
  pixel off the padding and two off the height in each, which is enough to
  close the gap without crowding the glyphs against the border.
*/
const SIZES: Record<BadgeChipSize, ChipSize> = {
  '2xs': { h: 10, fs: 6, px: 3, r: 2, dot: 4, nudge: 0.3 },
  xs: { h: 14, fs: 7.5, px: 4, r: 3, dot: 5, nudge: 0.2 },
  sm: { h: 16, fs: 8, px: 5, r: 4, dot: 5, nudge: 0 },
  md: { h: 18, fs: 9, px: 7, r: 5, dot: 6, nudge: 0.1 },
};

const mix = (tone: string, pct: number) => `color-mix(in srgb, ${tone} ${pct}%, transparent)`;

/** The style of the box, given a skin and a size. Exported for the gallery. */
export function chipBoxStyle(skin: ChipSkin, tone: string, size: BadgeChipSize): CSSProperties {
  const s = SIZES[size];
  const caps = skin.caps ?? true;
  const mono = skin.mono ?? true;
  const radius = skin.rail ? 0
    : skin.radius === 'pill' ? 999
      : skin.radius ?? s.r;

  const box: CSSProperties = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    gap: skin.dot ? Math.round(s.fs * 0.62) : undefined,
    lineHeight: 1, height: s.h,
    fontSize: s.fs,
    fontWeight: skin.weight ?? 700,
    letterSpacing: `${skin.tracking ?? 0.08}em`,
    textTransform: caps ? 'uppercase' : 'none',
    whiteSpace: 'nowrap', flexShrink: 0,
    padding: skin.bare ? 0 : `0 ${s.px + (skin.padX ?? 0)}px`,
    borderRadius: skin.bare && !skin.underline ? 0 : radius,
    fontFamily: mono ? 'ui-monospace, SFMono-Regular, Menlo, monospace' : 'inherit',
    color: tone,
  };

  if (skin.solid !== undefined) {
    box.background = skin.solid >= 100 ? tone : mix(tone, skin.solid);
    /* Ink on a saturated fill. Dark for a light tone, light for a dimmed one —
       the skin says which, because only it knows how far the fill was taken. */
    box.color = skin.ink === 'light' ? 'var(--color-text-primary)' : '#101010';
  } else if (skin.fill === 'neutral') {
    box.background = 'rgba(255,255,255,.06)';
  } else if (skin.fill === 'surface') {
    box.background = 'var(--color-surface-hover, rgba(255,255,255,.05))';
  } else if (skin.fill === 'sunken') {
    /*
      A well has to be darker than whatever it is cut into, and "darker" is a
      different colour on a white panel than on a near-black one. The value is
      a variable so a light theme can say what its own recess looks like; the
      fallback is the dark one, which is where this started.
    */
    box.background = 'var(--dui-chip-sunken-bg, rgba(0,0,0,.32))';
  } else if (typeof skin.fill === 'number') {
    box.background = mix(tone, skin.fill);
  }

  if (skin.border) {
    box.border = `${skin.borderWidth ?? 1}px ${skin.borderStyle ?? 'solid'} ${mix(tone, skin.border)}`;
  }
  if (skin.rail) {
    box.borderLeft = `2px solid ${tone}`;
    box.paddingLeft = Math.max(0, s.px - 1);
  }
  if (skin.underline) {
    box.borderBottom = `1.5px solid ${mix(tone, 60)}`;
    box.paddingBottom = 1;
  }

  const shadows: string[] = [];
  if (skin.ring) shadows.push(`inset 0 0 0 1px ${mix(tone, skin.ring)}`);
  if (skin.depth === 'raised') {
    shadows.push(
      `inset 0 1px 0 ${mix(tone, 45)}`,
      'inset 0 -1px 0 rgba(0,0,0,.28)',
      '0 1px 2px rgba(0,0,0,.35)',
    );
  } else if (skin.depth === 'inset') {
    /* The near edge in shadow, and the far edge catching light. The first is
       theme-dependent for the same reason the fill is; the second is the
       tone, which already works either way. */
    shadows.push(
      'inset 0 1px 1px var(--dui-chip-sunken-shadow, rgba(0,0,0,.5))',
      `inset 0 -1px 0 ${mix(tone, 22)}`,
    );
  } else if (skin.depth === 'lift') {
    shadows.push('0 1px 3px rgba(0,0,0,.42)');
  }
  if (shadows.length) box.boxShadow = shadows.join(', ');

  return box;
}

/** The dot's own box, when a skin has one. Exported for the gallery. */
export function chipDotStyle(tone: string, size: BadgeChipSize): CSSProperties {
  return {
    width: SIZES[size].dot, height: SIZES[size].dot,
    borderRadius: '50%', background: tone, flex: 'none',
  };
}

/**
 * What to put on the span holding the glyphs.
 *
 * It is a flex row, and that is not decoration. The children used to sit
 * directly in the chip's own flex box, so a caller passing an icon and a word
 * got them side by side. Wrapping them in a span to carry the corrections
 * below turned that into inline flow — and an `<svg>` is `display: block`
 * under a Tailwind reset, which breaks the line. The performance badge in the
 * REST status bar became a gauge on one line and "5.6σ slow" on the next.
 *
 * Then the two corrections, both sub-pixel and both real: the trailing
 * letter-space taken back out of the centring, and the measured vertical nudge
 * for caps. Exported so the gallery draws exactly what the component draws.
 */
export function chipTextStyle(skin: ChipSkin, size: BadgeChipSize): CSSProperties {
  const caps = skin.caps ?? true;
  const tracking = skin.tracking ?? 0.08;
  const nudge = caps ? SIZES[size].nudge : 0;
  return {
    display: 'inline-flex',
    alignItems: 'center',
    marginRight: tracking ? `-${tracking}em` : undefined,
    transform: nudge ? `translateY(${nudge}px)` : undefined,
  };
}

export function BadgeChipView({
  children,
  tone = 'var(--color-text-muted)',
  size = 'sm',
  variant,
  plain,
  title,
  className,
  style,
}: BadgeChipViewProps) {
  const ctx = useDui();
  const id = plain ? 'text' : (variant ?? ctx.chipVariant ?? DEFAULT_CHIP_VARIANT);
  const skin = CHIP_SKIN_BY_ID[id] ?? CHIP_SKIN_BY_ID[DEFAULT_CHIP_VARIANT];

  return (
    <span title={title} className={className} style={{ ...chipBoxStyle(skin, tone, size), ...style }}>
      {skin.dot && <span aria-hidden="true" style={chipDotStyle(tone, size)} />}
      {/* The corrections sit on an inner span so they move the glyphs and not
          the box, its border, or the dot beside them. */}
      <span style={chipTextStyle(skin, size)}>
        {skin.brackets ? <>[{children}]</> : children}
      </span>
    </span>
  );
}
