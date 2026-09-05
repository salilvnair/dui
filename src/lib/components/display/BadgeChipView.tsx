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
 * Three things make it look like an object rather than a tinted rectangle, and
 * all three are needed:
 *
 *   - a hairline of its own tone along the TOP edge, which is light catching a
 *     raised face;
 *   - a dark hairline along the bottom INSIDE, which is the far edge falling
 *     away;
 *   - a soft drop below, lifting the whole thing off the row.
 *
 * Any one alone still reads flat. It is the pair of opposing inner edges that
 * does the work.
 *
 * The text is centred by a flex box rather than by padding. Uppercase has no
 * descenders, so it rides high in a line box sized for letters that do, and no
 * amount of balanced padding fixes it — the box has to be centred.
 */
import type { CSSProperties, ReactNode } from 'react';

export type BadgeChipSize = 'xs' | 'sm' | 'md';

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
   * Drop the tint and the border, keeping only the text.
   *
   * For a chip in a dense row where a dozen of them would be more border than
   * content — the colour still carries the meaning.
   */
  plain?: boolean;
  title?: string;
  className?: string;
  style?: CSSProperties;
}

const SIZES: Record<BadgeChipSize, { h: number; fs: number; px: number; r: number }> = {
  xs: { h: 15, fs: 7.5, px: 4.5, r: 3 },
  sm: { h: 17, fs: 8, px: 6, r: 4 },
  md: { h: 20, fs: 9, px: 8, r: 5 },
};

export function BadgeChipView({
  children,
  tone = 'var(--color-text-muted)',
  size = 'sm',
  plain,
  title,
  className,
  style,
}: BadgeChipViewProps) {
  const s = SIZES[size];

  return (
    <span
      title={title}
      className={className}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        lineHeight: 1, height: s.h,
        fontSize: s.fs, fontWeight: 700, letterSpacing: '.08em',
        textTransform: 'uppercase', whiteSpace: 'nowrap', flexShrink: 0,
        padding: `0 ${s.px}px`, borderRadius: s.r,
        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
        color: tone,
        ...(plain ? {} : {
          background: `color-mix(in srgb, ${tone} 20%, transparent)`,
          border: `1px solid color-mix(in srgb, ${tone} 42%, transparent)`,
          boxShadow: [
            `inset 0 1px 0 color-mix(in srgb, ${tone} 45%, transparent)`,
            'inset 0 -1px 0 rgba(0,0,0,.28)',
            '0 1px 2px rgba(0,0,0,.35)',
          ].join(', '),
        }),
        ...style,
      }}
    >{children}</span>
  );
}
