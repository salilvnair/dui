/**
 * Two texts, side by side, with the changed lines marked.
 *
 * ── Why this and not a Monaco diff ──
 *
 * A code editor's diff mode is a code editor first: its own scrollbars, its own
 * minimap, its own selection model, and a decoration pass that has to be
 * configured before it colours anything. For "show me what changed between
 * these two blobs" that is a great deal of machinery to look at two hundred
 * lines, and every caller ends up fighting its sizing.
 *
 * ── Alignment is the whole point ──
 *
 * Both sides render the SAME row list. A line that exists only on one side is
 * drawn as an empty slot on the other, so a line sits opposite its counterpart
 * rather than opposite whatever happens to be nth in a file that gained three
 * rows higher up. Scrolling is shared for the same reason: two panes that drift
 * apart are two files, not a diff.
 */
import { useMemo, useRef, useCallback, type CSSProperties, type RefObject } from 'react';
import { SplitPanelView } from '../layout/SplitPanelView';
import { diffLines, tallyDiff, type DiffLine } from './line-diff';

const ROW = 17;

const TONE: Record<DiffOpKey, { bg: string; fg: string }> = {
  add:    { bg: 'color-mix(in srgb, var(--color-success) 14%, transparent)', fg: 'var(--color-success)' },
  remove: { bg: 'color-mix(in srgb, var(--color-error) 14%, transparent)',   fg: 'var(--color-error)' },
  same:   { bg: 'transparent',                                               fg: 'var(--color-text-secondary)' },
};

type DiffOpKey = 'same' | 'add' | 'remove';

/** One side of the pair. `side` decides which rows are real here and which are gaps. */
function Side({ lines, side, scrollRef, onScroll }: {
  lines: DiffLine[];
  side: 'left' | 'right';
  scrollRef: RefObject<HTMLDivElement | null>;
  onScroll: () => void;
}) {
  const gutterWidth = `${Math.max(2, String(lines.length).length)}ch`;

  return (
    <div
      ref={scrollRef}
      onScroll={onScroll}
      style={{
        height: '100%', overflow: 'auto',
        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
        fontSize: 11, lineHeight: `${ROW}px`,
        background: 'var(--color-input-bg)',
      }}
    >
      {lines.map((l, i) => {
        /* A line the other side owns is a gap here — drawn, so the two gutters
           stay level, but with no number and no text. */
        const mine = side === 'left' ? l.op !== 'add' : l.op !== 'remove';
        const tone = mine ? TONE[l.op] : TONE.same;
        const no = side === 'left' ? l.leftLine : l.rightLine;
        return (
          <div
            key={i}
            style={{
              display: 'flex', alignItems: 'flex-start', minHeight: ROW,
              background: mine ? tone.bg : 'color-mix(in srgb, var(--color-text-primary) 3%, transparent)',
            }}
          >
            <span style={{
              flexShrink: 0, userSelect: 'none', textAlign: 'right',
              paddingLeft: 8, paddingRight: 8, width: gutterWidth,
              color: 'var(--color-text-muted)', opacity: 0.45, fontVariantNumeric: 'tabular-nums',
            }}>
              {no ?? ''}
            </span>
            <span style={{ flexShrink: 0, userSelect: 'none', paddingRight: 4, color: tone.fg, width: '1ch' }}>
              {mine && l.op !== 'same' ? (l.op === 'add' ? '+' : '-') : ''}
            </span>
            <span style={{ color: tone.fg, whiteSpace: 'pre' }}>{mine ? l.text : ''}</span>
          </div>
        );
      })}
    </div>
  );
}

export interface LineDiffViewProps {
  left: string;
  right: string;
  leftLabel?: string;
  rightLabel?: string;
  /** Shown beside the label — e.g. a filename, or "not present". */
  leftNote?: string;
  rightNote?: string;
  /** A fixed height, or omit to fill a flex parent. */
  height?: number | string;
  /** Adds a "+n / −n" tally to each header. */
  showTally?: boolean;
  /**
   * Colour of the two header labels.
   *
   * Defaults to error on the left and success on the right, which is the
   * convention every diff uses: what left had and right does not is a removal.
   */
  leftTone?: string;
  rightTone?: string;
  className?: string;
  style?: CSSProperties;
}

export function LineDiffView({
  left, right,
  leftLabel = 'Before', rightLabel = 'After',
  leftNote, rightNote,
  height,
  showTally = false,
  leftTone = 'var(--color-error)',
  rightTone = 'var(--color-success)',
  className,
  style,
}: LineDiffViewProps) {
  const lines = useMemo(() => diffLines(left, right), [left, right]);
  const counts = useMemo(() => tallyDiff(lines), [lines]);

  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  /* Without this the two onScroll handlers drive each other in a loop. */
  const syncing = useRef(false);

  const sync = useCallback((from: 'left' | 'right') => () => {
    if (syncing.current) return;
    const a = from === 'left' ? leftRef.current : rightRef.current;
    const b = from === 'left' ? rightRef.current : leftRef.current;
    if (!a || !b) return;
    syncing.current = true;
    b.scrollTop = a.scrollTop;
    b.scrollLeft = a.scrollLeft;
    requestAnimationFrame(() => { syncing.current = false; });
  }, []);

  const header = (text: string, sub: string | undefined, tone: string) => (
    <div style={{
      display: 'flex', alignItems: 'baseline', gap: 8,
      padding: '4px 8px', flexShrink: 0,
      borderBottom: '1px solid var(--color-surface-border)',
    }}>
      <span style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.06em', color: tone }}>
        {text}
      </span>
      {sub && (
        <span style={{ fontSize: 10, color: 'var(--color-text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {sub}
        </span>
      )}
      {showTally && (
        <span style={{ fontSize: 10, marginLeft: 'auto', flexShrink: 0, fontFamily: 'ui-monospace, monospace' }}>
          <span style={{ color: 'var(--color-success)' }}>+{counts.added}</span>
          {' / '}
          <span style={{ color: 'var(--color-error)' }}>−{counts.removed}</span>
        </span>
      )}
    </div>
  );

  return (
    <div
      className={className}
      style={{
        display: 'flex', flexDirection: 'column', minHeight: 0, height: height ?? '100%',
        ...style,
      }}
    >
      <SplitPanelView
        direction="horizontal"
        defaultSplit={50}
        minFirst={140}
        minSecond={140}
        style={{ flex: 1, minHeight: 0 }}
        first={
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0 }}>
            {header(leftLabel, leftNote, leftTone)}
            <div style={{ flex: 1, minHeight: 0 }}>
              <Side lines={lines} side="left" scrollRef={leftRef} onScroll={sync('left')} />
            </div>
          </div>
        }
        second={
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0 }}>
            {header(rightLabel, rightNote, rightTone)}
            <div style={{ flex: 1, minHeight: 0 }}>
              <Side lines={lines} side="right" scrollRef={rightRef} onScroll={sync('right')} />
            </div>
          </div>
        }
      />
    </div>
  );
}
