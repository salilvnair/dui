import type { CSSProperties, ReactNode } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { useDisplayBase } from '../../core/DisplayBase';
import {
  FolderIcon, FileTextIcon, LockIcon, ExternalLinkIcon, ArrowToLeftIcon,
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
  /** A folder was opened, or a file activated. */
  onOpen?: (entry: FileBrowserEntry) => void;
  actions?: FileBrowserAction[];
  onAction?: (actionId: string, entry: FileBrowserEntry) => void;
  /** Offer a `..` row. Omit `onParent` at the root rather than disabling it. */
  onParent?: () => void;
  selectedId?: string;
  /** Shown in place of the rows when there are none. */
  emptyText?: ReactNode;
  /** A summary line under the rows — counts, the command that ran. */
  footer?: ReactNode;
  showHeader?: boolean;
  size?: DuiSize;
  accentColor?: string;
  className?: string;
  style?: CSSProperties;
}

const TONE: Record<FileBrowserTone, string> = {
  neutral: 'var(--color-text-muted)',
  info: 'var(--color-info, #3fb9cc)',
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

function Badge({ text, tone = 'info' }: { text: string; tone?: FileBrowserTone }) {
  const c = TONE[tone];
  return (
    <span style={{
      fontSize: 9, fontWeight: 700, letterSpacing: '.05em', textTransform: 'uppercase',
      padding: '1.5px 6px', borderRadius: 4, whiteSpace: 'nowrap', flexShrink: 0,
      color: c,
      background: `color-mix(in srgb, ${c} 14%, transparent)`,
      border: `1px solid color-mix(in srgb, ${c} 30%, transparent)`,
    }}>{text}</span>
  );
}

export function FileBrowserView({
  entries,
  onOpen,
  actions = [],
  onAction,
  onParent,
  selectedId,
  emptyText = 'Nothing here.',
  footer,
  showHeader = true,
  size,
  accentColor,
  className = '',
  style,
}: FileBrowserViewProps) {
  const base = useDisplayBase(size);
  const accent = accentColor ?? 'var(--color-primary)';

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
          <span style={{ ...head, width: 88, textAlign: 'right' }}>size</span>
          <span style={{ ...head, width: 132, textAlign: 'right' }}>modified</span>
          {actions.length > 0 && <span style={{ width: actions.length * 29 }} />}
        </div>
      )}

      <div style={{ overflowY: 'auto', minHeight: 0, flex: 1 }}>
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
            <ArrowToLeftIcon size={14} style={{ flexShrink: 0 }} />
            <span style={{ fontFamily: 'ui-monospace, monospace' }}>..</span>
          </button>
        )}

        {entries.length === 0 && !onParent && (
          <div style={{
            padding: '26px 12px', textAlign: 'center',
            color: 'var(--color-text-muted)', fontSize: base.fontSize,
          }}>{emptyText}</div>
        )}

        {entries.map(entry => {
          const disabled = !!entry.disabledReason;
          const isDir = entry.kind === 'dir';
          const selected = entry.id === selectedId;
          const rowActions = actions.filter(a => !a.show || a.show(entry));

          return (
            <div
              key={entry.id}
              onDoubleClick={!disabled && onOpen ? () => onOpen(entry) : undefined}
              title={entry.disabledReason ?? entry.name}
              style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '4px 12px',
                background: selected
                  ? `color-mix(in srgb, ${accent} 9%, transparent)`
                  : 'transparent',
                opacity: disabled ? 0.62 : 1,
              }}
            >
              {/* name */}
              <span style={{
                flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', gap: 8,
              }}>
                <span style={{ display: 'flex', flexShrink: 0, color: iconColour(entry) }}>
                  {disabled ? <LockIcon size={14} />
                    : isDir ? <FolderIcon size={14} />
                      : entry.kind === 'link' ? <ExternalLinkIcon size={14} />
                        : <FileTextIcon size={14} />}
                </span>

                {isDir && !disabled && onOpen ? (
                  <button
                    type="button"
                    onClick={() => onOpen(entry)}
                    style={{
                      border: 'none', background: 'transparent', padding: 0,
                      cursor: 'pointer', font: 'inherit', fontSize: base.fontSize,
                      fontFamily: 'ui-monospace, monospace', color: accent,
                      fontWeight: 500, minWidth: 0,
                      overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                    }}
                  >{entry.name}</button>
                ) : (
                  <span style={{
                    fontFamily: 'ui-monospace, monospace', fontSize: base.fontSize,
                    color: disabled ? 'var(--color-text-muted)' : 'var(--color-text-primary)',
                    minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}>{entry.name}</span>
                )}

                {entry.linkTarget && (
                  <span style={{
                    fontFamily: 'ui-monospace, monospace', fontSize: base.fontSize,
                    color: 'var(--color-text-muted)', whiteSpace: 'nowrap',
                  }}>→ {entry.linkTarget}</span>
                )}

                {entry.badge && <Badge text={entry.badge} tone={entry.badgeTone} />}
              </span>

              {/* size, or the folder's own count */}
              <span style={{
                width: 88, textAlign: 'right', flexShrink: 0,
                fontFamily: 'ui-monospace, monospace', fontSize: base.fontSize,
                fontVariantNumeric: 'tabular-nums', color: 'var(--color-text-secondary)',
              }}>
                {entry.detail ?? (isDir ? '—' : formatSize(entry.size))}
              </span>

              <span style={{
                width: 132, textAlign: 'right', flexShrink: 0,
                fontFamily: 'ui-monospace, monospace', fontSize: base.fontSize,
                fontVariantNumeric: 'tabular-nums', color: 'var(--color-text-muted)',
              }}>{entry.modified ?? '—'}</span>

              {actions.length > 0 && (
                <span style={{
                  width: actions.length * 29, flexShrink: 0,
                  display: 'flex', justifyContent: 'flex-end', gap: 4,
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
                        width: 25, height: 20, borderRadius: 5, padding: 0,
                        cursor: disabled ? 'default' : 'pointer',
                        color: TONE[a.tone ?? 'neutral'],
                        background: a.tone && a.tone !== 'neutral'
                          ? `color-mix(in srgb, ${TONE[a.tone]} 13%, transparent)`
                          : 'var(--color-surface)',
                        border: `1px solid ${a.tone && a.tone !== 'neutral'
                          ? `color-mix(in srgb, ${TONE[a.tone]} 34%, transparent)`
                          : 'var(--color-surface-border)'}`,
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
