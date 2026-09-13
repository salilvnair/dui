/**
 * A text box that runs a search, and looks like it will.
 *
 * The sibling of `FilterInputView`, and it exists for the same reason: the
 * placeholder is the only thing identifying a bare input, and typing removes
 * it, so the state where the control is actually in use is the one state with
 * nothing on screen to say what it is. The icon stays, and takes the accent
 * once there is something to run.
 *
 * The difference from the filter is what Enter means. A filter narrows a list
 * that is already on screen, so it applies as you type and Enter has nothing
 * to do. A search is a round trip — an exec into a pod, a walk of a filesystem
 * — so it has to be asked for, and the key people press to ask is Enter. A
 * separate Search button beside the field is a second way to do the same
 * thing, and it takes width from the field on every screen it sits on.
 *
 * Clearing is offered rather than assumed: the X removes the text, and callers
 * that want clearing to also drop the results say so with `onClear`.
 *
 * ── Suggestions ──
 * What you searched before belongs under the box, the way a URL bar's history
 * does — not in a row of chips beside it. A chip row takes permanent width
 * from a dialog to show something wanted for one second before typing starts,
 * and it cannot hold anything but the bare string. The dropdown costs nothing
 * until the field is focused, has room for what each entry meant, and is the
 * gesture people already have here: focus, arrow down, Enter.
 */
import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import type { DuiSize } from '../../core/DuiTypes';
import { SearchInputView } from './SearchInputView';
import { SearchIcon, CloseCircleIcon, CloseIcon } from '../../../icons';

/**
 * One offered search.
 *
 * `meta` is the right-hand detail — what the entry meant beyond its text: how
 * many things it was run against, when, how many it found. A bare string is
 * accepted too, and means an entry with nothing to add.
 */
export interface SearchSuggestion {
  value: string;
  meta?: string;
  icon?: ReactNode;
}

export interface SearchFieldViewProps {
  /**
   * A stable hook for tests and automation.
   *
   * Lands on this component's root element as `data-testid`. Worth setting on
   * anything a test drives: several dui inputs render a `contenteditable` div
   * with a decorative placeholder span, which neither `getByPlaceholder` nor
   * `getByRole` reliably finds.
   */
  testId?: string;

  value: string;
  onChange: (value: string) => void;
  /** Enter, and the icon's tooltip. Omit for a box that only holds a term. */
  onSearch?: (value: string) => void;
  /**
   * Clearing, when it means more than emptying the box.
   *
   * Defaults to `onChange('')`. Pass this where the results have to go too —
   * a cleared query beside a full result list is a screen describing a search
   * nobody can see the terms of.
   */
  onClear?: () => void;
  placeholder?: string;
  size?: DuiSize;
  width?: string | number;
  accentColor?: string;
  /** Sits between the text and the clear button — a count, a spinner. */
  trailing?: ReactNode;
  autoFocus?: boolean;

  /** Offered under the box on focus. Strings are entries with no detail. */
  suggestions?: (string | SearchSuggestion)[];
  /** The heading over them. What they ARE, in a word or two. */
  suggestionsLabel?: string;
  /**
   * Picking one.
   *
   * Defaults to putting it in the box and running it, which is what a history
   * entry is for. Callers that restore more than the text — the things the
   * search was run against — do it here.
   */
  onPick?: (value: string) => void;
  /** Given, each row gets an X that drops that entry. */
  onForget?: (value: string) => void;
  /** Most to offer at once. Beyond this the list stops being a shortcut. */
  maxSuggestions?: number;
  /** Above modals by default, which is where this is usually used. */
  suggestionZIndex?: number;
}

const asItem = (s: string | SearchSuggestion): SearchSuggestion =>
  (typeof s === 'string' ? { value: s } : s);

export function SearchFieldView({ testId,
  value,
  onChange,
  onSearch,
  onClear,
  placeholder = 'Search',
  size = 'sm',
  width = '100%',
  accentColor = 'var(--color-accent, var(--color-primary))',
  trailing,
  autoFocus,
  suggestions,
  suggestionsLabel = 'Recent searches',
  onPick,
  onForget,
  maxSuggestions = 8,
  suggestionZIndex = 10000,
}: SearchFieldViewProps) {
  const active = value.length > 0;

  const hostRef = useRef<HTMLDivElement>(null);
  const [focused, setFocused] = useState(false);
  const [highlight, setHighlight] = useState(-1);
  const [closed, setClosed] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0, width: 0 });

  /*
    What is offered.

    Empty box: everything, most recent first, which is the whole point of
    focusing an empty search field. With text: the entries containing it, minus
    the one already typed — offering the exact string in the box is a row that
    does nothing.
  */
  const offered = useMemo(() => {
    const all = (suggestions ?? []).map(asItem).filter(s => s.value.trim());
    const q = value.trim().toLowerCase();
    const matching = q
      ? all.filter(s => s.value.toLowerCase().includes(q) && s.value !== value)
      : all;
    return matching.slice(0, maxSuggestions);
  }, [suggestions, value, maxSuggestions]);

  const open = focused && !closed && offered.length > 0;

  /* Glued to the box, through scrolling and resizing alike — a dropdown that
     stays behind while the page moves is worse than none. */
  useEffect(() => {
    if (!open) return;
    const track = () => {
      const el = hostRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      setPos({ top: r.bottom + 4, left: r.left, width: r.width });
    };
    track();
    window.addEventListener('scroll', track, { passive: true, capture: true });
    window.addEventListener('resize', track, { passive: true });
    return () => {
      window.removeEventListener('scroll', track, { capture: true });
      window.removeEventListener('resize', track);
    };
  }, [open, offered.length]);

  /* Typing reopens a list that Escape closed, and moves the highlight off a
     row that is no longer the one it was on. */
  useEffect(() => { setHighlight(-1); setClosed(false); }, [value]);

  const pick = (v: string) => {
    setHighlight(-1);
    /* Closed here rather than left to the value change: picking puts that
       value in the box, which would otherwise re-filter and re-offer it. */
    setClosed(true);
    if (onPick) onPick(v);
    else {
      onChange(v);
      onSearch?.(v);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (open && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
      e.preventDefault();
      const step = e.key === 'ArrowDown' ? 1 : -1;
      setHighlight(h => {
        const next = h + step;
        if (next < 0) return offered.length - 1;
        if (next >= offered.length) return 0;
        return next;
      });
      return;
    }
    if (e.key === 'Escape' && open) {
      /* Closes the list, not the dialog around it. Without stopping it here,
         one Escape over an open suggestion list shut the whole modal. */
      e.preventDefault();
      e.stopPropagation();
      setHighlight(-1);
      setClosed(true);
      return;
    }
    if (e.key !== 'Enter') return;
    e.preventDefault();
    if (open && highlight >= 0) { pick(offered[highlight].value); return; }
    onSearch?.(value);
  };

  return (
    <div ref={hostRef} style={{ position: 'relative', width }}>
      <SearchInputView data-testid={testId}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        size={size}
        width="100%"
        autoFocus={autoFocus}
        onFocus={() => { setFocused(true); setClosed(false); }}
        /* Late enough that a click on a row still lands: the rows suppress the
           blur themselves, but a click anywhere else has to close the list. */
        onBlur={() => window.setTimeout(() => setFocused(false), 90)}
        onKeyDown={onKeyDown}
        prefix={
          <SearchIcon
            size={12}
            color={active ? accentColor : 'var(--color-text-muted)'}
          />
        }
        suffix={(trailing || active) ? (
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            {trailing}
            {active && (
              <button
                type="button"
                onClick={() => (onClear ? onClear() : onChange(''))}
                title="Clear"
                aria-label="Clear the search"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: 'none', background: 'transparent', padding: 2,
                  cursor: 'pointer', color: 'var(--color-text-muted)',
                }}
              >
                <CloseCircleIcon size={12} />
              </button>
            )}
          </span>
        ) : undefined}
      />

      {open && createPortal(
        <div
          data-dui-search-suggestions
          role="listbox"
          style={{
            position: 'fixed', top: pos.top, left: pos.left, width: pos.width,
            background: 'var(--color-surface)',
            border: '1px solid var(--color-surface-border)',
            borderRadius: 8,
            boxShadow: '0 8px 24px rgba(0,0,0,0.22)',
            zIndex: suggestionZIndex, padding: 3, overflow: 'hidden',
          }}
        >
          <div style={{ padding: '4px 10px 6px', borderBottom: '1px solid var(--color-surface-border)' }}>
            <p style={{
              margin: 0, fontSize: '9.5px', fontWeight: 700, letterSpacing: '0.08em',
              textTransform: 'uppercase', color: 'var(--color-text-muted)',
            }}>
              {suggestionsLabel}
            </p>
          </div>
          <div style={{ padding: '4px 3px 3px', maxHeight: 280, overflowY: 'auto' }}>
            {offered.map((s, i) => (
              <div
                key={s.value}
                role="option"
                aria-selected={i === highlight}
                onMouseDown={e => { e.preventDefault(); pick(s.value); }}
                onMouseEnter={() => setHighlight(i)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '6px 8px 6px 10px', marginBottom: 2, borderRadius: 5,
                  cursor: 'pointer', fontSize: 12.5, color: 'var(--color-text-primary)',
                  background: i === highlight
                    ? `color-mix(in srgb, ${accentColor} 13%, transparent)`
                    : 'transparent',
                }}
              >
                {s.icon ?? <SearchIcon size={13} style={{ color: 'var(--color-text-muted)', flexShrink: 0 }} />}
                <span style={{
                  flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap', fontFamily: 'monospace',
                }}>
                  {s.value}
                </span>
                {s.meta && (
                  <span style={{ fontSize: 10, color: 'var(--color-text-muted)', flexShrink: 0 }}>
                    {s.meta}
                  </span>
                )}
                {onForget && (
                  <button
                    type="button"
                    title="Forget this search"
                    aria-label={`Forget ${s.value}`}
                    /* Stops the row's own mousedown: the X is the one part of
                       the row that must not run the search it is removing. */
                    onMouseDown={e => { e.preventDefault(); e.stopPropagation(); onForget(s.value); }}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      border: 'none', background: 'transparent', padding: 2, flexShrink: 0,
                      cursor: 'pointer', color: 'var(--color-text-muted)',
                    }}
                  >
                    <CloseIcon size={11} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>,
        document.body,
      )}
    </div>
  );
}
