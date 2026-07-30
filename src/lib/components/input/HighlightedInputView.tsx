import { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { SearchIcon, ServerIcon } from '../../../icons';
import type { DuiSize } from '../../core/DuiTypes';
import { useInputBase } from '../../core/InputBase';
import './HighlightedInputView.css';

export interface MockServerSuggestion {
  url: string;
  name: string;
}

export interface HighlightedInputViewProps {
  value: string;
  onChange: (value: string) => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  onBlur?: () => void;
  placeholder?: string;
  suggestions?: string[];
  /** Running mock server URLs — shown at the top with a server icon */
  mockServers?: MockServerSuggestion[];
  disabled?: boolean;
  accentColor?: string;
  /** Falls back to DuiProvider size when omitted. */
  size?: DuiSize;
  /** Raw height override in px — prefer `size` for token-aligned sizing. */
  height?: number;
  /** Border radius of the input in px — falls back to the size-token radius (matching SelectTextInputView / every other DUI input) when omitted */
  borderRadius?: number;
  style?: React.CSSProperties;
  className?: string;
}

const TOKEN_RE   = /(\{\{[\w.\-]+\}\}|\$\{[\w.\-]+\})/g;
const ESCAPE_RE  = /(\$daakia_\{[\w.\-]+\}_\$)/g;

function buildHTML(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(ESCAPE_RE, '<span class="dui_highlighted-input__token--escape">$1</span>')
    .replace(TOKEN_RE,  '<span class="dui_highlighted-input__token">$1</span>');
}

function getCaretOffset(el: HTMLElement): number {
  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0) return 0;
  const range = sel.getRangeAt(0);
  const pre = range.cloneRange();
  pre.selectNodeContents(el);
  pre.setEnd(range.endContainer, range.endOffset);
  return pre.toString().length;
}

function setCaretOffset(el: HTMLElement, offset: number): void {
  const sel = window.getSelection();
  if (!sel) return;
  const range = document.createRange();
  let remaining = offset;
  const walk = (node: Node): boolean => {
    if (node.nodeType === Node.TEXT_NODE) {
      const len = node.textContent?.length ?? 0;
      if (remaining <= len) { range.setStart(node, remaining); range.collapse(true); return true; }
      remaining -= len;
      return false;
    }
    for (const child of Array.from(node.childNodes)) { if (walk(child)) return true; }
    return false;
  };
  if (!walk(el)) { range.selectNodeContents(el); range.collapse(false); }
  sel.removeAllRanges();
  sel.addRange(range);
}

export function HighlightedInputView({
  value,
  onChange,
  onKeyDown,
  onBlur,
  placeholder,
  suggestions = [],
  mockServers = [],
  disabled,
  accentColor,
  size,
  height,
  borderRadius,
  style,
  className = '',
}: HighlightedInputViewProps) {
  const base = useInputBase(size);
  const resolvedHeight = height ?? parseInt(base.height, 10);
  const resolvedBorderRadius = borderRadius ?? base.borderRadius;
  const editorRef  = useRef<HTMLDivElement>(null);
  const composing  = useRef(false);
  const lastValue  = useRef<string | null>(null);
  const [focused,     setFocused]     = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [dropPos,     setDropPos]     = useState({ top: 0, left: 0, width: 0 });

  const accent = accentColor || 'var(--color-primary)';

  // Populate on mount
  useEffect(() => {
    const el = editorRef.current;
    if (!el) return;
    el.innerHTML = buildHTML(value);
    lastValue.current = value;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Sync when value is changed externally by parent
  useEffect(() => {
    const el = editorRef.current;
    if (!el || lastValue.current === value) return;
    lastValue.current = value;
    const isFocused = document.activeElement === el;
    const offset = isFocused ? getCaretOffset(el) : -1;
    el.innerHTML = buildHTML(value);
    if (isFocused && offset >= 0) setCaretOffset(el, offset);
  }, [value]);

  const filtered = useMemo(() => {
    if (!focused || !suggestions.length) return [];
    const lower = value.toLowerCase().trim();
    if (!lower) return [...new Set(suggestions)].slice(0, 8);
    return [...new Set(suggestions.filter(s => s.toLowerCase().includes(lower) && s !== value))].slice(0, 8);
  }, [value, focused, suggestions]);

  const filteredMockServers = useMemo(() => {
    if (!focused || !mockServers.length) return [];
    const lower = value.toLowerCase().trim();
    const deduped = mockServers.filter((s, i) => mockServers.findIndex(o => o.url === s.url) === i);
    if (!lower) return deduped.slice(0, 8);
    return deduped.filter(s => s.url.toLowerCase().includes(lower) || s.name.toLowerCase().includes(lower)).slice(0, 8);
  }, [value, focused, mockServers]);

  useEffect(() => { setSelectedIdx(0); }, [filtered.length, filteredMockServers.length, value]);

  useEffect(() => {
    if ((filtered.length === 0 && filteredMockServers.length === 0) || !editorRef.current) return;
    const r = editorRef.current.getBoundingClientRect();
    setDropPos({ top: r.bottom + 4, left: r.left, width: r.width });
  }, [filtered.length, filteredMockServers.length, focused]);

  const handleSelect = (url: string) => {
    const el = editorRef.current;
    if (el) {
      el.innerHTML = buildHTML(url);
      const range = document.createRange();
      range.selectNodeContents(el);
      range.collapse(false);
      window.getSelection()?.removeAllRanges();
      window.getSelection()?.addRange(range);
    }
    lastValue.current = url;
    onChange(url);
    setFocused(false);
    editorRef.current?.focus();
  };

  const handleInput = useCallback(() => {
    if (composing.current) return;
    const el = editorRef.current;
    if (!el) return;
    const text = el.innerText.replace(/\n/g, '');
    const offset = getCaretOffset(el);
    el.innerHTML = buildHTML(text);
    setCaretOffset(el, offset);
    lastValue.current = text;
    onChange(text);
  }, [onChange]);

  const allDropItems = useMemo(() => [
    ...filteredMockServers.map(s => s.url),
    ...filtered,
  ], [filteredMockServers, filtered]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') e.preventDefault();
    if (allDropItems.length > 0) {
      if (e.key === 'ArrowDown') { e.preventDefault(); setSelectedIdx(i => (i + 1) % allDropItems.length); return; }
      if (e.key === 'ArrowUp')   { e.preventDefault(); setSelectedIdx(i => (i - 1 + allDropItems.length) % allDropItems.length); return; }
      if (e.key === 'Enter' && allDropItems[selectedIdx] !== value) { e.preventDefault(); handleSelect(allDropItems[selectedIdx]); return; }
      if (e.key === 'Escape')    { setFocused(false); return; }
    }
    onKeyDown?.(e);
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    document.execCommand('insertText', false, text);
  };

  const showDrop = focused && (filtered.length > 0 || filteredMockServers.length > 0);

  return (
    <div className={`dui_highlighted-input ${className}`} style={style}>
      {!value && placeholder && (
        <span className="dui_highlighted-input__placeholder" style={{ lineHeight: `${resolvedHeight}px` }}>
          {placeholder}
        </span>
      )}
      <div
        ref={editorRef}
        contentEditable={!disabled}
        suppressContentEditableWarning
        spellCheck={false}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        onFocus={() => setFocused(true)}
        onBlur={() => { setTimeout(() => setFocused(false), 150); onBlur?.(); }}
        onCompositionStart={() => { composing.current = true; }}
        onCompositionEnd={() => { composing.current = false; handleInput(); }}
        className={`dui_highlighted-input__editor${disabled ? ' opacity-60' : ''}`}
        style={{ height: resolvedHeight, lineHeight: `${resolvedHeight}px`, borderRadius: resolvedBorderRadius, borderColor: focused ? accent : undefined }}
      />
      {showDrop && createPortal(
        <div
          style={{
            position: 'fixed', zIndex: 9999,
            top: dropPos.top, left: dropPos.left, width: dropPos.width,
            background: 'var(--color-surface)',
            border: '1px solid var(--color-surface-border)',
            borderRadius: 8,
            boxShadow: '0 8px 24px rgba(0,0,0,0.22)',
            padding: 3, overflow: 'hidden',
            '--dui-stiv-accent': accent,
          } as React.CSSProperties}
        >
          {/* Mock server suggestions — shown at top */}
          {filteredMockServers.length > 0 && (
            <>
              <div style={{ padding: '4px 10px 6px', borderBottom: '1px solid var(--color-surface-border)' }}>
                <p style={{ fontSize: '9.5px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>
                  Mock Servers
                </p>
              </div>
              <div style={{ padding: '4px 3px 3px' }}>
                {filteredMockServers.map((s, idx) => (
                  <div
                    key={s.url}
                    onMouseDown={e => { e.preventDefault(); handleSelect(s.url); }}
                    onMouseEnter={() => setSelectedIdx(idx)}
                    className={`dui-stiv-sugg-item${idx === selectedIdx ? ' dui-stiv-sugg-item--active' : ''}`}
                    style={{ '--dui-stiv-accent': 'var(--color-mock-server)' } as React.CSSProperties}
                  >
                    <ServerIcon size={14} style={{ color: 'var(--color-mock-server)', flexShrink: 0 }} />
                    <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontFamily: 'monospace', color: 'var(--color-mock-server)' }}>
                      {s.url}
                    </span>
                    <span style={{ fontSize: '10px', color: 'var(--color-text-muted)', flexShrink: 0 }}>
                      {s.name}
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* URL history suggestions */}
          {filtered.length > 0 && (
            <>
              <div style={{ padding: '4px 10px 6px', borderBottom: '1px solid var(--color-surface-border)', marginTop: filteredMockServers.length > 0 ? 4 : 0 }}>
                <p style={{ fontSize: '9.5px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>
                  Suggestions
                </p>
              </div>
              <div style={{ padding: '4px 3px 3px' }}>
                {filtered.map((url, idx) => {
                  const globalIdx = filteredMockServers.length + idx;
                  return (
                    <div
                      key={url}
                      onMouseDown={e => { e.preventDefault(); handleSelect(url); }}
                      onMouseEnter={() => setSelectedIdx(globalIdx)}
                      className={`dui-stiv-sugg-item${globalIdx === selectedIdx ? ' dui-stiv-sugg-item--active' : ''}`}
                    >
                      <SearchIcon size={14} style={{ color: 'var(--color-text-muted)', flexShrink: 0 }} />
                      <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontFamily: 'monospace' }}>
                        {url}
                      </span>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>,
        document.body
      )}
    </div>
  );
}
