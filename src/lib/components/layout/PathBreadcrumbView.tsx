import { useEffect, useRef, useState } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { useNavBase } from '../../core/NavBase';
import { ChevronRightIcon, MoreHorizontalIcon } from '../../../icons';

/**
 * A filesystem path, as a chain of jump targets or as the string it always was.
 *
 * `BreadcrumbView` is the right component for a trail of pages, where each
 * label is prose and the whole thing is read rather than typed. A PATH is a
 * different object: it has a canonical text form people already know, and the
 * fastest way to reach one you know is to type it rather than click five
 * ancestors. Splitting a slash-separated string is also not the caller's job
 * to repeat everywhere it shows a path.
 *
 * So the control has two states over one value. Double-click — or press Enter
 * on the focused chain — swaps the segments for an input holding the raw path;
 * Enter commits, Escape puts the chain back untouched.
 */

export interface PathBreadcrumbViewProps {
  /** An absolute, slash-separated path. `/` renders as a single root segment. */
  path: string;
  /** A segment was clicked; the argument is the absolute path of that segment. */
  onNavigate?: (path: string) => void;
  /**
   * A path was typed and committed.
   *
   * Omit to make the control read-only: with no handler there is nothing for
   * editing to do, so the double-click does not arm and the affordance is not
   * advertised.
   */
  onSubmit?: (path: string) => void;
  /** Label for the leading `/`. Some filesystems want a share or drive name. */
  rootLabel?: string;
  /** Collapse the middle into `…` past this many segments. Default 5. */
  maxVisible?: number;
  size?: DuiSize;
  /** Colour of the segment the path currently ends at. */
  color?: string;
  className?: string;
  placeholder?: string;
}

export function PathBreadcrumbView({
  path,
  onNavigate,
  onSubmit,
  rootLabel = '/',
  maxVisible = 5,
  size,
  color,
  className = '',
  placeholder = '/absolute/path',
}: PathBreadcrumbViewProps) {
  const base = useNavBase(size, { activeColor: color });
  const accent = base.activeColor ?? 'var(--color-primary)';

  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(path);
  const [expanded, setExpanded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  /*
    The draft follows the path while the chain is showing, and stops the moment
    editing starts. Without the guard, a listing that finishes loading mid-edit
    would overwrite what somebody was halfway through typing.
  */
  useEffect(() => { if (!editing) setDraft(path); }, [path, editing]);

  useEffect(() => {
    if (!editing) return;
    const el = inputRef.current;
    if (!el) return;
    el.focus();
    // Caret at the end rather than a selection: the common edit is appending
    // or trimming a segment, not replacing the whole path.
    el.setSelectionRange(el.value.length, el.value.length);
  }, [editing]);

  const segments = splitPath(path, rootLabel);

  const commit = () => {
    const next = draft.trim();
    setEditing(false);
    if (next && next !== path) onSubmit?.(next);
    else setDraft(path);
  };

  if (editing) {
    return (
      <div className={className} style={{ display: 'flex', flex: 1, minWidth: 0 }}>
        <input
          ref={inputRef}
          value={draft}
          spellCheck={false}
          autoComplete="off"
          aria-label="Path"
          placeholder={placeholder}
          onChange={e => setDraft(e.target.value)}
          onBlur={commit}
          onKeyDown={e => {
            if (e.key === 'Enter') { e.preventDefault(); commit(); }
            // Escape restores rather than commits — the only way to back out
            // of a half-typed path without navigating somewhere by accident.
            if (e.key === 'Escape') { e.preventDefault(); setDraft(path); setEditing(false); }
          }}
          style={{
            flex: 1, minWidth: 0,
            font: 'inherit', fontSize: base.fontSize,
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
            color: accent,
            background: 'var(--color-input-bg, var(--color-surface))',
            border: `1px solid ${accent}`,
            borderRadius: 6,
            padding: '4px 9px',
            outline: 'none',
          }}
        />
      </div>
    );
  }

  const shouldCollapse = !expanded && segments.length > maxVisible;
  const visible = shouldCollapse
    ? [segments[0], { label: '…', path: '', collapse: true },
       ...segments.slice(segments.length - (maxVisible - 2))]
    : segments;

  return (
    <nav
      className={className}
      aria-label="Path"
      tabIndex={onSubmit ? 0 : undefined}
      title={onSubmit ? `${path} — double-click to type a path` : path}
      onDoubleClick={onSubmit ? () => setEditing(true) : undefined}
      onKeyDown={onSubmit ? (e => {
        // Keyboard parity for the double-click, which is otherwise a gesture
        // only a mouse can make.
        if (e.key === 'Enter' && e.target === e.currentTarget) {
          e.preventDefault();
          setEditing(true);
        }
      }) : undefined}
      style={{
        display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 4,
        fontSize: base.fontSize, minWidth: 0,
        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
        cursor: onSubmit ? 'text' : undefined,
      }}
    >
      {visible.map((seg, i) => {
        const isLast = i === visible.length - 1;
        const isCollapse = (seg as { collapse?: boolean }).collapse;
        return (
          <span key={`${seg.path}-${i}`} style={{ display: 'flex', alignItems: 'center', gap: 4, minWidth: 0 }}>
            {isCollapse ? (
              <button
                type="button"
                onClick={() => setExpanded(true)}
                aria-label="Show the whole path"
                style={{
                  display: 'flex', border: 'none', background: 'transparent',
                  color: 'var(--color-text-muted)', cursor: 'pointer', padding: 2,
                }}
              >
                <MoreHorizontalIcon size={13} />
              </button>
            ) : onNavigate && !isLast ? (
              <button
                type="button"
                onClick={() => onNavigate(seg.path)}
                style={{
                  border: 'none', background: 'transparent', cursor: 'pointer',
                  font: 'inherit', fontSize: base.fontSize, fontWeight: 500,
                  color: accent, padding: '1px 3px', borderRadius: 3,
                  whiteSpace: 'nowrap',
                }}
              >
                {seg.label}
              </button>
            ) : (
              <span style={{
                color: isLast ? 'var(--color-text-primary)' : accent,
                fontWeight: isLast ? 700 : 500,
                whiteSpace: 'nowrap',
                padding: '1px 3px',
              }}>{seg.label}</span>
            )}
            {!isLast && (
              <ChevronRightIcon
                size={11}
                style={{ color: 'var(--color-text-muted)', opacity: 0.55, flexShrink: 0 }}
              />
            )}
          </span>
        );
      })}
    </nav>
  );
}

/**
 * `/var/lib/app` into segments that each address a real directory.
 *
 * Exported because the caller almost always needs the same walk for its own
 * navigation, and two implementations of "what is the parent of this" drift.
 */
export function splitPath(path: string, rootLabel = '/'): { label: string; path: string }[] {
  const out = [{ label: rootLabel, path: '/' }];
  let at = '';
  for (const part of path.split('/').filter(Boolean)) {
    at += `/${part}`;
    out.push({ label: part, path: at });
  }
  return out;
}
