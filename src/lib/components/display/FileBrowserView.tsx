import { useEffect, useRef } from 'react';
import { BadgeChipView } from './BadgeChipView';
import { TableSkeletonView } from './TableSkeletonView';
import type { CSSProperties, ReactNode } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { useDisplayBase } from '../../core/DisplayBase';
import {
  FolderIcon, FileTextIcon, LockIcon, LinkIcon, ArrowToLeftIcon,
} from '../../../icons';

/**
 * A directory listing — the rows a file manager shows.
 *
 * `FileListView` is a list of things being uploaded: it has progress bars and
 * a remove button, and every row is going the same way. This is the other
 * shape entirely — entries already exist somewhere, some are folders you
 * descend into, some are files you act on, and some you can see but not touch.
 *
 * The row actions are supplied rather than fixed, because what you can do with
 * a file depends on where it lives. A listing from a pod offers "open" and
 * "download"; one from a bucket might offer a signed link; the table should not
 * have to know. `show` on an action is how a row ends up with fewer buttons
 * than its neighbour, which is the affordance doing the talking: a file with no
 * open action is a file nothing here can render.
 */

export type FileBrowserKind = 'file' | 'dir' | 'link' | 'other';

export type FileBrowserTone =
  | 'neutral' | 'info' | 'success' | 'warning' | 'danger' | 'accent';

export interface FileBrowserEntry {
  id: string;
  name: string;
  kind: FileBrowserKind;
  /** Rendered by `formatSize`; omit where a size is meaningless (a folder). */
  size?: number;
  /** Free text — whatever the source calls a date. Not parsed. */
  modified?: string;
  /** Secondary column for a folder: `142 items`, `38 files`. */
  detail?: string;
  /** Short type badge — `csv`, `properties`, `binary`. */
  badge?: string;
  badgeTone?: FileBrowserTone;
  /** Where a symlink points. Shown after the name. */
  linkTarget?: string;
  /**
   * Visible but untouchable, with the reason.
   *
   * Kept in the list rather than filtered out: a listing that silently shows
   * one fewer entry than the directory holds is worse than one showing a
   * locked row, because only the second tells you to go and look at why.
   */
  disabledReason?: string;
}

export interface FileBrowserAction {
  id: string;
  /** Rendered inside a square button; supply a sized icon. */
  icon: ReactNode;
  /** Tooltip and accessible name. Required — an icon with no name is a rebus. */
  label: string;
  tone?: FileBrowserTone;
  /** Return false to leave this row without the action. */
  show?: (entry: FileBrowserEntry) => boolean;
}

export interface FileBrowserViewProps {
  entries: FileBrowserEntry[];
  /** Selecting a row. Single click, the way a file manager behaves. */
  onSelect?: (entry: FileBrowserEntry) => void;
  /**
   * Briefly mark one row.
   *
   * For arriving from somewhere else — a search result, a deep link — where
   * the row you came for is one of forty and the eye has no idea which. The
   * caller clears it; a highlight that never fades becomes a second, competing
   * selection.
   */
  highlightId?: string;
  /** Hide the size column. A search hit has no size to show, and a column of
   *  em dashes is worse than no column. */
  showSize?: boolean;
  /** Hide the modified column, for the same reason. */
  showModified?: boolean;
  /** Tighter rows and smaller chips, for a list inside a dialog. */
  dense?: boolean;
  /**
   * The literal a search matched on, highlighted wherever it appears.
   *
   * Pass the plain text, not the glob or the regex that was typed — this is
   * for the eye, and `*invoice*` highlighted literally would find nothing.
   * When a row's name is a whole path, the directory in front of the filename
   * dims at the same time: three weights on one line — dim ancestry, the
   * matched run, the rest of the name — say WHY this row is a result, which a
   * uniform grey path never does.
   */
  match?: string;
  /** A folder was opened, or a file activated. */
  onOpen?: (entry: FileBrowserEntry) => void;
  /**
   * Right-click on a row.
   *
   * The row actions are the two or three verbs worth a permanent icon; a file
   * manager has always had more than that, and putting the rest on every row
   * would bury the ones people use. The caller gets the entry and the event so
   * it can put a menu where the pointer is.
   */
  onContextMenu?: (entry: FileBrowserEntry, e: React.MouseEvent) => void;
  /**
   * Right-click on the list itself, away from any row.
   *
   * The empty area below the last row is still the directory, and a file
   * manager has always let you act on it there — "search here", "refresh",
   * "download all of this". Without a handler the browser's own menu appears
   * instead, offering Copy and Select All over a list that has neither.
   */
  onEmptyContextMenu?: (e: React.MouseEvent) => void;
  actions?: FileBrowserAction[];
  onAction?: (actionId: string, entry: FileBrowserEntry) => void;
  /** Offer a `..` row. Omit `onParent` at the root rather than disabling it. */
  onParent?: () => void;
  selectedId?: string;
  /**
   * The wash on the selected row. Defaults to the neutral one below.
   *
   * Selection is a state, not an event, so it does not take the view's accent:
   * a list where the selected row wears the same colour as every meaningful
   * badge on it has nowhere left to go when something actually needs saying.
   */
  selectionColor?: string;
  /** The wash on the arriving row. Defaults to the amber below. */
  flashColor?: string;
  /** Shown in place of the rows when there are none. */
  emptyText?: ReactNode;
  /**
   * The listing is on its way.
   *
   * Draws column-aligned placeholder rows instead of the empty state, because
   * "nothing here" and "not here yet" are different answers and only one of
   * them is worth reading. The component draws it rather than the caller: the
   * column widths are known here and nowhere else, and a skeleton whose
   * columns do not line up with the table it precedes makes the real rows look
   * like they jumped.
   */
  loading?: boolean;
  /** A summary line under the rows — counts, the command that ran. */
  footer?: ReactNode;
  showHeader?: boolean;
  size?: DuiSize;
  accentColor?: string;
  className?: string;
  style?: CSSProperties;
}

/*
  Two row states, two hues, and neither is the accent.

  Both are written as a colour mixed into `transparent` rather than a flat
  fill, which is what makes one pair of values work in both themes: the mix
  composites over whatever surface the row is actually sitting on, so the same
  16% lands as a slate wash on a dark ground and a pale one on a light ground.
  A literal hex here would need a second literal under a media query, and the
  two would drift the first time either was touched.

  Both hues are pure, and the strength of the mix is what decides whether a
  pure hue reads as itself or as mud. Too thin and a saturated yellow over a
  dark ground composites to brown; too strong and it stops being a highlight
  and becomes a painted bar. The flash sits at just over a third — bright
  enough to find across a screenful, transparent enough that the filename
  underneath still reads as text rather than as something written on a label.

  The two states do not want the same treatment, which is why only one of them
  is loud. The selected row is a muted blue-slate at a low mix: it is on screen
  for as long as the file stays open, and a saturated selection stops reading
  as "this row" and starts reading as a bar of colour. The arriving row is a
  bright golden yellow, a hue that appears nowhere else
  in the list, because it has one job: be findable in the second before the eye
  gives up. That it then fades to the
  neutral is the whole point — the loud colour announces the row, the quiet
  one keeps it.
*/
const SELECTED = 'var(--dui-row-selected, #4d7d94)';
const FLASH = 'var(--dui-row-flash, #ffc400)';
/** The matched run in a name. The flash hue, at full strength on text. */
const MATCH = 'var(--dui-row-flash, #ffc400)';

const TONE: Record<FileBrowserTone, string> = {
  neutral: 'var(--color-text-muted)',
  /*
    The view's own accent, not a fixed cyan.

    A type badge is the view speaking about its own rows, so it should be the
    colour the view is — a hard-coded hue made every file list in the product
    wear the same blue whatever accent the panel around it was using.
  */
  info: 'var(--dui-file-badge, var(--color-info, #3fb9cc))',
  success: 'var(--color-success)',
  warning: 'var(--color-warning)',
  danger: 'var(--color-error)',
  accent: 'var(--color-primary)',
};

/** Three significant figures, so a column of sizes lines up and reads. */
export function formatSize(bytes?: number): string {
  if (bytes === undefined) return '—';
  if (bytes < 1024) return `${Math.round(bytes)} B`;
  const units = ['KB', 'MB', 'GB', 'TB'];
  let v = bytes / 1024;
  let i = 0;
  while (v >= 1024 && i < units.length - 1) { v /= 1024; i++; }
  return `${v < 10 ? v.toFixed(1) : Math.round(v)} ${units[i]}`;
}

/**
 * A name in up to three weights: the directory, the matched run, the rest.
 *
 * Case-insensitive, because `find -iname` is, and a highlight that disagreed
 * with the search that produced it would be worse than none. Every occurrence
 * is marked rather than only the first — a path can match in the directory as
 * well as the filename, and marking one and not the other implies the other is
 * not why this row is here.
 */
function renderName(name: string, match?: string): ReactNode {
  const cut = name.lastIndexOf('/');
  const dir = cut >= 0 ? name.slice(0, cut + 1) : '';
  const base = cut >= 0 ? name.slice(cut + 1) : name;

  const head = dir && (
    <span style={{ color: 'var(--color-text-muted)' }}>{dir}</span>
  );

  const needle = match?.trim();
  if (!needle) return <>{head}{base}</>;

  const hay = base.toLowerCase();
  const low = needle.toLowerCase();
  const parts: ReactNode[] = [];
  let at = 0;
  for (;;) {
    const i = hay.indexOf(low, at);
    if (i < 0) break;
    if (i > at) parts.push(base.slice(at, i));
    parts.push(
      <span key={i} style={{ color: MATCH, fontWeight: 600 }}>
        {base.slice(i, i + low.length)}
      </span>,
    );
    at = i + low.length;
  }
  if (!parts.length) return <>{head}{base}</>;
  if (at < base.length) parts.push(base.slice(at));
  return <>{head}{parts}</>;
}

/** The row's type mark, on the shared chip. */
function Badge({ text, tone = 'info', dense }: {
  text: string; tone?: FileBrowserTone; dense?: boolean;
}) {
  return <BadgeChipView tone={TONE[tone]} size={dense ? 'xs' : 'sm'}>{text}</BadgeChipView>;
}

export function FileBrowserView({
  entries,
  onOpen,
  onContextMenu,
  onEmptyContextMenu,
  onSelect,
  highlightId,
  showSize = true,
  showModified = true,
  dense = false,
  actions = [],
  onAction,
  onParent,
  selectedId,
  match,
  selectionColor = SELECTED,
  flashColor = FLASH,
  emptyText = 'Nothing here.',
  loading,
  footer,
  showHeader = true,
  size,
  accentColor,
  className = '',
  style,
}: FileBrowserViewProps) {
  const base = useDisplayBase(size);
  const accent = accentColor ?? 'var(--color-primary)';

  /*
    Bring the highlighted row into view.

    Marking a row that is four hundred pixels below the fold tells the reader
    nothing — they arrived here BECAUSE they did not know where the file was,
    so leaving them to scroll for it undoes the whole point of the jump.
    `nearest` rather than `center` so a row already on screen does not lurch.
  */
  const highlightRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!highlightId) return;
    const el = highlightRef.current;
    if (!el) return;
    const reduced = typeof window !== 'undefined'
      && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    // A frame's grace: the row has to exist and be laid out before it can be
    // scrolled to, and on arrival this runs in the same tick as the listing.
    const id = requestAnimationFrame(() => {
      el.scrollIntoView({
        behavior: reduced ? 'auto' : 'smooth',
        block: 'nearest',
        inline: 'nearest',
      });
    });
    return () => cancelAnimationFrame(id);
  }, [highlightId, entries]);

  /*
    Which row is allowed to take its time changing colour.

    The half-second transition exists so the arriving amber visibly SETTLES
    into the selection rather than cutting to it. Applied to every row it also
    slowed down an ordinary click, which wants the opposite — you already know
    which row you hit, and half a second of fade reads as lag. Only the row
    that was flashed gets the slow one, and it keeps it after the flash clears,
    which is exactly when the settle happens.
  */
  const settling = useRef<string | undefined>(undefined);
  if (highlightId) settling.current = highlightId;

  const head: CSSProperties = {
    fontSize: 9, fontWeight: 600, letterSpacing: '.07em', textTransform: 'uppercase',
    color: 'var(--color-text-muted)', opacity: 0.8,
  };

  return (
    <div
      className={className}
      style={{ display: 'flex', flexDirection: 'column', minHeight: 0, ...style }}
    >
      {showHeader && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12,
          padding: '5px 12px 6px',
          borderBottom: '1px solid var(--color-surface-border)',
        }}>
          <span style={{ ...head, flex: 1, minWidth: 0 }}>name</span>
          {showSize && <span style={{ ...head, width: 88, textAlign: 'right' }}>size</span>}
          {showModified && <span style={{ ...head, width: 132, textAlign: 'right' }}>modified</span>}
          {actions.length > 0 && <span style={{ width: actions.length * (dense ? 21 : 29) }} />}
        </div>
      )}

      {/*
        The rows want a margin off every edge.

        A list flush to its container reads as clipped rather than contained —
        the first row touches the header rule, the last touches the footer, and
        the names start hard against the left border. The inset is small and
        does the whole job.
      */}
      <div
        /*
          A flex column, so the empty state can take the space that is LEFT.

          It used to be `height: 100%` on the placeholder, which is the height
          of the scroll container — but the `..` row is in there too, so the
          content came to one row taller than the box and every empty directory
          below the root grew a scrollbar over nothing.
        */
        style={{
          overflowY: 'auto', minHeight: 0, flex: 1, padding: '6px 4px',
          display: 'flex', flexDirection: 'column',
        }}
        /*
          Only when the click did not land on a row. A row has its own menu and
          the event bubbles, so without the check the background menu replaced
          the row menu everywhere — the row's own handler having already
          stopped nothing.
        */
        onContextMenu={onEmptyContextMenu ? e => {
          if ((e.target as HTMLElement).closest('[data-file-row]')) return;
          e.preventDefault();
          onEmptyContextMenu(e);
        } : undefined}
      >
        {onParent && (
          <button
            type="button"
            onClick={onParent}
            style={{
              display: 'flex', alignItems: 'center', gap: 10, width: '100%',
              padding: '5px 12px', border: 'none', background: 'transparent',
              cursor: 'pointer', font: 'inherit', textAlign: 'left',
              color: accent, fontSize: base.fontSize,
            }}
          >
            {/*
              The plan's glyph, drawn rather than typed.

              `..` is not "back" — it is the directory above this one, and a
              back arrow says the wrong thing next to it. A filled right-angle
              triangle in the accent reads as a corner turned upward, which is
              what the row does.
            */}
            <svg width="11" height="11" viewBox="0 0 12 12" aria-hidden="true"
                 style={{ flexShrink: 0 }}>
              <polygon points="11,1 11,11 1,11" fill={accent} />
            </svg>
            <span style={{ fontFamily: 'ui-monospace, monospace' }}>..</span>
          </button>
        )}

        {entries.length === 0 && loading && (
          <TableSkeletonView
            rowHeight={dense ? 20 : 24}
            /*
              Part of the space, not all of it. A placeholder filling the
              panel to its last pixel claims the directory is exactly as long
              as the window, which it will not be — and the moment the real
              rows are fewer, the list appears to collapse.
            */
            fill={0.6}
            leadingIcon
            columns={[
              { width: 'flex', fill: 0.45 },
              ...(showSize ? [{ width: 88, fill: 0.5, align: 'right' as const }] : []),
              ...(showModified ? [{ width: 132, fill: 0.62, align: 'right' as const }] : []),
              ...(actions.length
                ? [{ width: actions.length * (dense ? 21 : 29), fill: 0.5 }]
                : []),
            ]}
          />
        )}

        {entries.length === 0 && !loading && (
          /*
            Shown whenever there are no entries, `..` row or not.

            It used to be suppressed as soon as a parent row existed, on the
            reasoning that the list was not really empty — but `..` is
            navigation, not content. The effect was that every directory below
            the root lost its empty state: an empty one showed a lone `..` and
            nothing to say why, and a loading one had nowhere to put a
            skeleton, which is how a caller's placeholder can be wired
            correctly and still never appear.

            Centred in the space it actually has, not padded down from the top.

            A fixed top padding puts the placeholder just under the header in a
            tall list, which reads as content that failed to fill rather than
            as a screen waiting to be used — and the taller the container, the
            worse it looks. `height: 100%` on a flex child that already has
            `flex: 1` is what gives the grid something to centre within.
          */
          <div style={{
            flex: 1, minHeight: 120,
            display: 'grid', placeItems: 'center',
            padding: '12px', textAlign: 'center',
            color: 'var(--color-text-muted)', fontSize: base.fontSize,
          }}>{emptyText}</div>
        )}

        {entries.map(entry => {
          const disabled = !!entry.disabledReason;
          const isDir = entry.kind === 'dir';
          const selected = entry.id === selectedId;
          const highlighted = entry.id === highlightId;
          const rowActions = actions.filter(a => !a.show || a.show(entry));

          return (
            <div
              key={entry.id}
              data-file-row=""
              ref={highlighted ? highlightRef : undefined}
              onClick={!disabled && onSelect ? () => onSelect(entry) : undefined}
              onDoubleClick={!disabled && onOpen ? () => onOpen(entry) : undefined}
              /*
                Right-clicking selects too. Acting on a row the menu is open
                over, while a different row is highlighted, is how people
                delete the wrong file.
              */
              onContextMenu={onContextMenu ? e => {
                e.preventDefault();
                onSelect?.(entry);
                onContextMenu(entry, e);
              } : undefined}
              title={entry.disabledReason ?? entry.name}
              style={{
                display: 'flex', alignItems: 'center',
                gap: dense ? 8 : 12,
                padding: dense ? '2px 10px' : '4px 12px',
                /*
                  Highlight, then selection, then nothing — and a row that is
                  both draws the highlight, because the flash is temporary and
                  the selection underneath it is what it decays into.
                */
                background: highlighted
                  ? `color-mix(in srgb, ${flashColor} 36%, transparent)`
                  : selected
                    ? `color-mix(in srgb, ${selectionColor} 24%, transparent)`
                    : 'transparent',
                boxShadow: highlighted
                  ? `inset 2px 0 0 ${flashColor}`
                  : selected
                    ? `inset 2px 0 0 color-mix(in srgb, ${selectionColor} 60%, transparent)`
                    : undefined,
                // A row that responds to a click has to look like it will.
                // The default text caret says "select this string" and is the
                // single most common reason a list feels dead.
                cursor: disabled ? 'default' : (onSelect || onOpen) ? 'pointer' : 'default',
                opacity: disabled ? 0.62 : 1,
                transition: entry.id === settling.current
                  ? 'background .5s ease, box-shadow .5s ease'
                  : 'background .12s ease, box-shadow .12s ease',
                userSelect: 'none',
              }}
            >
              {/* name */}
              <span style={{
                flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', gap: 8,
              }}>
                <span style={{ display: 'flex', flexShrink: 0, color: iconColour(entry) }}>
                  {disabled ? <LockIcon size={14} />
                    : isDir ? <FolderIcon size={14} />
                      /* A chain, not an arrow-out-of-a-box: this row points at
                       something else in the same filesystem, it does not open
                       somewhere else, which is what the external-link mark
                       says everywhere it appears. */
                    : entry.kind === 'link' ? <LinkIcon size={14} />
                        : <FileTextIcon size={14} />}
                </span>

                {isDir && !disabled && onOpen ? (
                  <button
                    type="button"
                    onClick={() => onOpen(entry)}
                    style={{
                      border: 'none', background: 'transparent', padding: 0,
                      cursor: 'pointer', font: 'inherit',
                      fontSize: dense ? 10 : base.fontSize,
                      fontFamily: 'ui-monospace, monospace', color: accent,
                      fontWeight: 500, minWidth: 0,
                      overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                    }}
                  >{entry.name}</button>
                ) : (
                  <span style={{
                    fontFamily: 'ui-monospace, monospace',
                    fontSize: dense ? 10 : base.fontSize,
                    color: disabled ? 'var(--color-text-muted)' : 'var(--color-text-primary)',
                    minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}>{renderName(entry.name, match)}</span>
                )}

                {entry.linkTarget && (
                  <span style={{
                    fontFamily: 'ui-monospace, monospace', fontSize: base.fontSize,
                    color: 'var(--color-text-muted)', whiteSpace: 'nowrap',
                  }}>→ {entry.linkTarget}</span>
                )}

                {entry.badge && <Badge text={entry.badge} tone={entry.badgeTone} dense={dense} />}
              </span>

              {/* size, or the folder's own count */}
              {showSize && (
              <span style={{
                width: 88, textAlign: 'right', flexShrink: 0,
                fontFamily: 'ui-monospace, monospace', fontSize: base.fontSize,
                fontVariantNumeric: 'tabular-nums', color: 'var(--color-text-secondary)',
              }}>
                {entry.detail ?? (isDir ? '—' : formatSize(entry.size))}
              </span>
              )}

              {showModified && (
              <span style={{
                width: 132, textAlign: 'right', flexShrink: 0,
                fontFamily: 'ui-monospace, monospace', fontSize: base.fontSize,
                fontVariantNumeric: 'tabular-nums', color: 'var(--color-text-muted)',
              }}>{entry.modified ?? '—'}</span>
              )}

              {actions.length > 0 && (
                <span style={{
                  width: actions.length * (dense ? 21 : 29), flexShrink: 0,
                  display: 'flex', justifyContent: 'flex-end', gap: dense ? 3 : 4,
                }}>
                  {rowActions.map(a => (
                    <button
                      key={a.id}
                      type="button"
                      title={a.label}
                      aria-label={a.label}
                      disabled={disabled}
                      onClick={() => onAction?.(a.id, entry)}
                      style={{
                        display: 'grid', placeItems: 'center',
                        width: dense ? 18 : 25, height: dense ? 16 : 20,
                        borderRadius: dense ? 3 : 5, padding: 0,
                        cursor: disabled ? 'default' : 'pointer',
                        color: TONE[a.tone ?? 'neutral'],
                        /*
                          Dense rows drop the button chrome entirely.

                          A box around every icon on every row is more border
                          than content — the chip repeated forty times down a
                          list stops reading as a control and starts reading as
                          texture. Bare glyphs, with the hover state doing the
                          work the border was doing.
                        */
                        background: dense
                          ? 'transparent'
                          : a.tone && a.tone !== 'neutral'
                            ? `color-mix(in srgb, ${TONE[a.tone]} 13%, transparent)`
                            : 'var(--color-surface)',
                        border: dense ? 'none' : `1px solid ${a.tone && a.tone !== 'neutral'
                          ? `color-mix(in srgb, ${TONE[a.tone]} 34%, transparent)`
                          : 'var(--color-surface-border)'}`,
                        opacity: dense ? 0.85 : 1,
                      }}
                    >{a.icon}</button>
                  ))}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {footer && (
        <div style={{
          padding: '7px 12px', borderTop: '1px solid var(--color-surface-border)',
          fontSize: 10, color: 'var(--color-text-muted)',
          fontFamily: 'ui-monospace, monospace',
        }}>{footer}</div>
      )}
    </div>
  );
}

function iconColour(entry: FileBrowserEntry): string {
  if (entry.disabledReason) return 'var(--color-warning)';
  if (entry.kind === 'dir') return 'var(--color-warning)';
  if (entry.kind === 'link') return 'var(--color-info, #3fb9cc)';
  return 'var(--color-text-muted)';
}
