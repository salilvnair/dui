import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { SearchIcon } from '../../../icons';

export interface PaletteCommand {
  id: string;
  label: string;
  /** Small muted text on the right (e.g. section, shortcut) */
  hint?: string;
  icon?: ReactNode;
  /** Extra strings the filter also matches against */
  keywords?: string[];
  action: () => void;
}

export interface CommandPaletteViewProps {
  open: boolean;
  onClose: () => void;
  commands: PaletteCommand[];
  placeholder?: string;
  emptyText?: string;
  accentColor?: string;
}

/** Cmd-K style launcher: fuzzy filter + ↑/↓/Enter/Esc keyboard navigation. */
export function CommandPaletteView({
  open,
  onClose,
  commands,
  placeholder = 'Type a command or search…',
  emptyText = 'No matching commands',
  accentColor,
}: CommandPaletteViewProps) {
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const accent = accentColor || 'var(--color-primary)';

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    const scored = commands
      .map(c => {
        const hay = [c.label, c.hint ?? '', ...(c.keywords ?? [])]
          .join(' ')
          .toLowerCase();
        if (!hay.includes(q)) return null;
        // startswith beats substring; label match beats keyword match
        const score =
          (c.label.toLowerCase().startsWith(q) ? 0 : 1) +
          (c.label.toLowerCase().includes(q) ? 0 : 2);
        return { c, score };
      })
      .filter(Boolean) as { c: PaletteCommand; score: number }[];
    return scored.sort((a, b) => a.score - b.score).map(s => s.c);
  }, [commands, query]);

  useEffect(() => {
    if (open) {
      setQuery('');
      setActive(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  useEffect(() => setActive(0), [query]);

  if (!open) return null;

  const run = (cmd: PaletteCommand) => {
    onClose();
    cmd.action();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') { onClose(); return; }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive(a => Math.min(a + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive(a => Math.max(a - 1, 0));
    } else if (e.key === 'Enter' && filtered[active]) {
      e.preventDefault();
      run(filtered[active]);
    }
  };

  return createPortal(
    <div
      onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: 'fixed', inset: 0, zIndex: 1200,
        background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(2px)',
        display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
        paddingTop: '15vh',
      }}
    >
      <div
        role="dialog"
        aria-label="Command palette"
        style={{
          width: 560, maxWidth: '90vw',
          background: 'var(--color-surface)',
          border: '1px solid var(--color-surface-border)',
          borderRadius: 12, overflow: 'hidden',
          boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
        }}
      >
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '12px 14px',
          borderBottom: '1px solid var(--color-surface-border)',
        }}>
          <SearchIcon size={15} style={{ color: accent, flexShrink: 0 }} />
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
            style={{
              flex: 1, border: 'none', outline: 'none', background: 'transparent',
              fontSize: 14, color: 'var(--color-text-primary)', fontFamily: 'inherit',
            }}
          />
          <kbd style={{
            fontSize: 10, padding: '2px 6px', borderRadius: 4,
            border: '1px solid var(--color-surface-border)',
            color: 'var(--color-text-muted)',
          }}>esc</kbd>
        </div>

        <div style={{ maxHeight: 320, overflowY: 'auto', padding: 6 }}>
          {filtered.length === 0 && (
            <div style={{ padding: '20px 14px', fontSize: 12, color: 'var(--color-text-muted)', textAlign: 'center' }}>
              {emptyText}
            </div>
          )}
          {filtered.map((c, i) => (
            <button
              key={c.id}
              type="button"
              onClick={() => run(c)}
              onMouseEnter={() => setActive(i)}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                padding: '9px 10px', borderRadius: 8, border: 'none',
                cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit',
                background: i === active
                  ? `color-mix(in srgb, ${accent} 12%, transparent)`
                  : 'transparent',
                color: i === active ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
              }}
            >
              {c.icon && <span style={{ flexShrink: 0, display: 'flex', color: i === active ? accent : 'var(--color-text-muted)' }}>{c.icon}</span>}
              <span style={{ flex: 1, fontSize: 13, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {c.label}
              </span>
              {c.hint && (
                <span style={{ fontSize: 10, color: 'var(--color-text-muted)', flexShrink: 0 }}>{c.hint}</span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>,
    document.body,
  );
}
