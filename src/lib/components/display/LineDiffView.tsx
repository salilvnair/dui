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
 * rows higher up.
 *
 * ── One grid, not two panes ──
 *
 * The first version drew each side in its own scroller and kept them level with
 * a scroll-sync handler and `white-space: pre` — a fixed row height on both
 * sides meant row n was always opposite row n. It bought that alignment with
 * wrapping: a long line ran off the edge, so every pane grew a horizontal
 * scrollbar and the split grew a third one underneath. Beside the editor view,
 * which wraps, the same text rendered two different ways.
 *
 * So both sides are cells of one grid instead, one grid row per diff line. A
 * row is as tall as the taller of its two cells, which is exactly the alignment
 * guarantee the fixed height was buying — except now it survives wrapping. The
 * text wraps, nothing scrolls sideways, and the scroll-sync handler is gone
 * along with the class of bug where two panes drift apart.
 */
import { Fragment, useMemo, useRef, useState, useCallback, type CSSProperties } from 'react';
import { diffLines, tallyDiff, type DiffLine } from './line-diff';

const ROW = 17;

const TONE: Record<DiffOpKey, { bg: string; fg: string }> = {
  add:    { bg: 'color-mix(in srgb, var(--color-success) 14%, transparent)', fg: 'var(--color-success)' },
  remove: { bg: 'color-mix(in srgb, var(--color-error) 14%, transparent)',   fg: 'var(--color-error)' },
  same:   { bg: 'transparent',                                               fg: 'var(--color-text-secondary)' },
};

/** A slot the other side owns: drawn, so the row keeps its shape, but empty. */
const GAP_BG = 'color-mix(in srgb, var(--color-text-primary) 3%, transparent)';

type DiffOpKey = 'same' | 'add' | 'remove';

/** One line's cell on one side. */
function Cell({ line, side, gutterWidth }: {
  line: DiffLine;
  side: 'left' | 'right';
  gutterWidth: string;
}) {
  const mine = side === 'left' ? line.op !== 'add' : line.op !== 'remove';
  const tone = mine ? TONE[line.op] : TONE.same;
  const no = side === 'left' ? line.leftLine : line.rightLine;

  return (
    <div
      style={{
        display: 'flex', alignItems: 'flex-start', minHeight: ROW, minWidth: 0,
        background: mine ? tone.bg : GAP_BG,
        borderLeft: side === 'right' ? '1px solid var(--color-surface-border)' : undefined,
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
        {mine && line.op !== 'same' ? (line.op === 'add' ? '+' : '-') : ''}
      </span>
      {/*
        `pre-wrap` keeps the leading indentation that makes code readable while
        letting a long line fold. `anywhere` is the half that matters for the
        content this actually gets: a minified body or a base64 blob is one
        "word", and without it the line would still push the column wide.
      */}
      <span style={{
        flex: 1, minWidth: 0, color: tone.fg,
        whiteSpace: 'pre-wrap', overflowWrap: 'anywhere', paddingRight: 8,
      }}>
        {mine ? line.text : ''}
      </span>
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
  const gutterWidth = `${Math.max(2, String(lines.length).length)}ch`;

  /* The divider. Kept because comparing a wide left against a narrow right is a
     real thing to want; it just no longer needs a whole split-panel to exist. */
  const [leftPct, setLeftPct] = useState(50);
  const [dragging, setDragging] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  const onDrag = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const box = wrapRef.current?.getBoundingClientRect();
    if (!box || box.width === 0) return;
    const pct = ((e.clientX - box.left) / box.width) * 100;
    /* Clamped so neither side can be dragged away entirely — a column too
       narrow to hold its gutter is a column nobody can read. */
    setLeftPct(Math.min(85, Math.max(15, pct)));
  }, []);

  const cols = `${leftPct}% ${100 - leftPct}%`;

  const header = (text: string, sub: string | undefined, tone: string, isRight: boolean) => (
    <div style={{
      display: 'flex', alignItems: 'baseline', gap: 8, minWidth: 0,
      padding: '4px 8px',
      borderLeft: isRight ? '1px solid var(--color-surface-border)' : undefined,
    }}>
      <span style={{
        fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.06em',
        color: tone, flexShrink: 0,
      }}>
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
      ref={wrapRef}
      className={className}
      style={{
        position: 'relative',
        display: 'flex', flexDirection: 'column', minHeight: 0, height: height ?? '100%',
        ...style,
      }}
    >
      {/* Headers share the grid template, so a label always sits over its own
          column however the divider is dragged. */}
      <div style={{
        display: 'grid', gridTemplateColumns: cols, flexShrink: 0,
        borderBottom: '1px solid var(--color-surface-border)',
      }}>
        {header(leftLabel, leftNote, leftTone, false)}
        {header(rightLabel, rightNote, rightTone, true)}
      </div>

      <div style={{
        flex: 1, minHeight: 0,
        /* Vertical only. Nothing here is allowed to run off the side any more. */
        overflowY: 'auto', overflowX: 'hidden',
        background: 'var(--color-input-bg)',
        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
        fontSize: 11, lineHeight: `${ROW}px`,
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: cols }}>
          {/* Both cells of a line are emitted together, so the grid lays them
              in the same row and gives them a shared height. That shared height
              is the alignment guarantee — it is not maintained by anything, it
              is simply what a grid row does. */}
          {lines.map((l, i) => (
            <Fragment key={i}>
              <Cell line={l} side="left" gutterWidth={gutterWidth} />
              <Cell line={l} side="right" gutterWidth={gutterWidth} />
            </Fragment>
          ))}
        </div>
      </div>

      <div
        onPointerDown={e => { e.currentTarget.setPointerCapture(e.pointerId); setDragging(true); }}
        onPointerMove={e => { if (dragging) onDrag(e); }}
        onPointerUp={e => { e.currentTarget.releasePointerCapture(e.pointerId); setDragging(false); }}
        onDoubleClick={() => setLeftPct(50)}
        title="Drag to resize — double-click to even them up"
        style={{
          position: 'absolute', top: 0, bottom: 0,
          left: `calc(${leftPct}% - 3px)`, width: 6,
          cursor: 'col-resize', zIndex: 2,
          background: dragging ? 'color-mix(in srgb, var(--color-primary) 45%, transparent)' : 'transparent',
        }}
      />
    </div>
  );
}
