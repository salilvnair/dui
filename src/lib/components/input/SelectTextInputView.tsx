import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { DropdownArrowIcon, CheckIcon, SearchIcon, ServerIcon } from '../../../icons';
import type { DuiSize, DuiRadius, DuiWidth, DuiFontStyle } from '../../core/DuiTypes';
import { useInputBase } from '../../core/InputBase';
import { useDui } from '../../core/DuiContext';
import { buildHighlightedHTML, getCaretOffset, setCaretOffset, createEditableHistory, isUndoKey, isRedoKey } from '../../core/VariableToken';
import './SelectTextInputView.css';

export interface SelectTextOption {
  value: string;
  label: string;
  /** Accent color for this option — e.g. HTTP methods */
  color?: string;
}

/** Running mock server entry — shown at top of suggestions with server icon */
export interface MockServerSuggestion {
  url: string;
  name: string;
}

export interface SelectTextInputViewProps {
  selectValue: string;
  selectOptions: SelectTextOption[];
  onSelectChange: (value: string) => void;
  inputValue: string;
  onInputChange: (value: string) => void;
  placeholder?: string;
  /** Falls back to DuiProvider size when omitted. */
  size?: DuiSize;
  disabled?: boolean;
  /** Accent border color on focus */
  accentColor?: string;
  /** Override the select section width in px */
  selectWidth?: number;
  /** URL / text autocomplete suggestions */
  suggestions?: string[];
  /** Running mock server URLs — shown at the top with a server icon */
  mockServers?: MockServerSuggestion[];
  /** Called when user picks a mock server entry (in addition to onInputChange) */
  onMockServerSelect?: (url: string) => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  /** Minimum width (px) for the suggestions dropdown — useful when the input is narrow */
  suggestionMinWidth?: number;
  /** z-index for the suggestions dropdown portal (default: 9998) */
  suggestionZIndex?: number;
  // ─── DUI container props ──────────────────────────────────────────────────
  width?: DuiWidth;
  borderRadius?: DuiRadius | number;
  color?: string;
  fontStyle?: DuiFontStyle;
  className?: string;
}

/** Select section width per size — sized to fit longest HTTP method label ("OPTIONS") */
const SELECT_WIDTH: Record<DuiSize, number> = {
  xxs: 44, xs: 52, sm: 64, md: 80, lg: 96, xl: 112, xxl: 128, xxxl: 148,
};

export function SelectTextInputView({
  selectValue,
  selectOptions,
  onSelectChange,
  inputValue,
  onInputChange,
  placeholder = 'Enter URL or paste text',
  size,
  disabled = false,
  accentColor,
  selectWidth,
  suggestions = [],
  mockServers = [],
  onMockServerSelect,
  onKeyDown,
  suggestionMinWidth,
  suggestionZIndex = 9998,
  width,
  borderRadius,
  color,
  fontStyle,
  className = '',
}: SelectTextInputViewProps) {
  const ctx = useDui();
  const resolvedSize: DuiSize = size ?? ctx.size;
  const base = useInputBase(size, { width, borderRadius, color, fontStyle });
  const selWidth = selectWidth ?? SELECT_WIDTH[resolvedSize];
  const accent = accentColor ?? 'var(--color-primary)';

  // Vertical centring for the editable, done with real padding rather than only
  // `align-content`. An EMPTY block container has no line box at all, so align-content has
  // nothing to distribute and the caret would sit at the content-box top — visibly higher
  // than the placeholder. Padding moves the content-box origin itself, so the caret is
  // centred whether or not any text exists. `align-content` stays on as a safety net for
  // any sub-pixel remainder once text is present.
  // Floor of 16px = the rendered height of a .dui-var-token chip (12px text + its 1px
  // borders). If the line box were shorter than the chip, the chip would overflow it and
  // get baseline-aligned instead of centred, sitting a couple of px high.
  const editorLineHeight = Math.max(Math.round(parseFloat(base.fontSize) * 1.2 * 10) / 10, 16);
  // -2: the pill's own 1px top/bottom border, which the editable sits inside.
  const editorPadY = Math.max(0, (parseFloat(base.height) - 2 - editorLineHeight) / 2);

  const [methodOpen, setMethodOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedIdx, setHighlightedIdx] = useState(-1);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);
  const suppressRef = useRef(false);
  const composingRef = useRef(false);
  // Set when our keydown handler already serviced an undo/redo, so the matching
  // beforeinput only has to block the browser's native pass, not re-apply.
  const historyHandledRef = useRef(false);
  const lastValueRef = useRef<string | null>(null);
  // Own undo stack — rewriting innerHTML per keystroke destroys the native one.
  const historyRef = useRef(createEditableHistory());
  const [methodDropPos, setMethodDropPos] = useState({ top: 0, left: 0, width: 0 });
  const [suggDropPos, setSuggDropPos] = useState({ top: 0, left: 0, width: 0 });

  const selectedOpt = selectOptions.find(o => o.value === selectValue);
  const selectColor = selectedOpt?.color ?? 'var(--color-text-primary)';

  // ── Highlighted contentEditable text field (same {{var}} token engine as
  //    HighlightedInputView, so REST/SOAP's unified method+URL bar colors variable
  //    references identically to every other protocol's URL bar) ─────────────

  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    el.innerHTML = buildHighlightedHTML(inputValue);
    lastValueRef.current = inputValue;
    historyRef.current.reset(inputValue, inputValue.length);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const el = inputRef.current;
    if (!el || lastValueRef.current === inputValue) return;
    lastValueRef.current = inputValue;
    const isFocused = document.activeElement === el;
    const offset = isFocused ? getCaretOffset(el) : -1;
    el.innerHTML = buildHighlightedHTML(inputValue);
    if (isFocused && offset >= 0) setCaretOffset(el, offset);
    // Externally-driven change (suggestion pick, tab switch, saved request load) —
    // record it so undo can step back past it too.
    historyRef.current.push(inputValue, offset >= 0 ? offset : inputValue.length);
  }, [inputValue]);

  /** Write a value straight into the DOM + caret, bypassing the history recorder. */
  const applyValue = useCallback((text: string, caret: number) => {
    const el = inputRef.current;
    if (!el) return;
    el.innerHTML = buildHighlightedHTML(text);
    setCaretOffset(el, Math.min(caret, text.length));
    lastValueRef.current = text;
    onInputChange(text);
  }, [onInputChange]);

  const handleEditorInput = useCallback(() => {
    if (composingRef.current) return;
    const el = inputRef.current;
    if (!el) return;
    const text = el.innerText.replace(/\n/g, '');
    const offset = getCaretOffset(el);
    el.innerHTML = buildHighlightedHTML(text);
    setCaretOffset(el, offset);
    lastValueRef.current = text;
    historyRef.current.push(text, offset);
    onInputChange(text);
  }, [onInputChange]);

  // preventDefault() on keydown does NOT reliably stop a contentEditable's native undo
  // (the Edit menu and some key routes bypass it). When it slips through, the browser
  // splices the old DOM back in *on top of* the value we just wrote, which is what
  // duplicated the text. beforeinput/historyUndo is the authoritative place to block it.
  const handleBeforeInput = (e: React.FormEvent<HTMLDivElement>) => {
    const inputType = (e.nativeEvent as InputEvent).inputType;
    if (inputType !== 'historyUndo' && inputType !== 'historyRedo') return;
    e.preventDefault();
    if (historyHandledRef.current) { historyHandledRef.current = false; return; }
    const entry = inputType === 'historyUndo' ? historyRef.current.undo() : historyRef.current.redo();
    if (entry) applyValue(entry.text, entry.caret);
  };

  const handleEditorPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    document.execCommand('insertText', false, text);
  };

  // ── Filtered suggestions ──────────────────────────────────────────────────

  const filteredSuggestions = useMemo(() => {
    if (!suggestions.length) return [];
    if (!inputValue.trim()) return [...new Set(suggestions)].slice(0, 8);
    const lower = inputValue.toLowerCase();
    return [...new Set(suggestions.filter(s => s.toLowerCase().includes(lower) && s !== inputValue))].slice(0, 8);
  }, [inputValue, suggestions]);

  const filteredMockServers = useMemo(() => {
    if (!mockServers.length) return [];
    if (!inputValue.trim()) return mockServers.slice(0, 8);
    const lower = inputValue.toLowerCase();
    return mockServers.filter(s => s.url.toLowerCase().includes(lower) || s.name.toLowerCase().includes(lower)).slice(0, 8);
  }, [inputValue, mockServers]);

  // ── Method dropdown ────────────────────────────────────────────────────────

  const openMethodDropdown = () => {
    if (disabled) return;
    const el = triggerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setMethodDropPos({ top: rect.bottom + 4, left: rect.left, width: Math.max(rect.width, 120) });
    setMethodOpen(v => !v);
  };

  useEffect(() => {
    if (!methodOpen) return;
    const handler = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (!t.closest('[data-stiv-method]') && !t.closest('[data-stiv-trigger]')) setMethodOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [methodOpen]);

  // Keep method dropdown glued to trigger on scroll/resize
  useEffect(() => {
    if (!methodOpen) return;
    const track = () => {
      const el = triggerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      setMethodDropPos({ top: rect.bottom + 4, left: rect.left, width: Math.max(rect.width, 120) });
    };
    window.addEventListener('scroll', track, { passive: true, capture: true });
    window.addEventListener('resize', track, { passive: true });
    return () => {
      window.removeEventListener('scroll', track, { capture: true });
      window.removeEventListener('resize', track);
    };
  }, [methodOpen]);

  // ── Suggestions dropdown ────────────────────────────────────────────────────

  useEffect(() => {
    // Suppress reopening immediately after user selects a suggestion
    if (suppressRef.current) return;
    if ((filteredSuggestions.length > 0 || filteredMockServers.length > 0) && focused) {
      const el = inputRef.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        setSuggDropPos({ top: rect.bottom + 4, left: rect.left, width: Math.max(rect.width, suggestionMinWidth ?? 0) });
      }
      setShowSuggestions(true);
      setHighlightedIdx(-1);
    } else {
      setShowSuggestions(false);
    }
  }, [filteredSuggestions, filteredMockServers, focused]);

  // Keep suggestions dropdown glued to input on scroll/resize
  useEffect(() => {
    if (!showSuggestions) return;
    const track = () => {
      const el = inputRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      setSuggDropPos({ top: rect.bottom + 4, left: rect.left, width: Math.max(rect.width, suggestionMinWidth ?? 0) });
    };
    window.addEventListener('scroll', track, { passive: true, capture: true });
    window.addEventListener('resize', track, { passive: true });
    return () => {
      window.removeEventListener('scroll', track, { capture: true });
      window.removeEventListener('resize', track);
    };
  }, [showSuggestions]);

  const handleMockSelect = (url: string) => {
    handleSuggestionSelect(url);
    onMockServerSelect?.(url);
  };

  const handleSuggestionSelect = (val: string) => {
    suppressRef.current = true;
    onInputChange(val);
    setShowSuggestions(false);
    setHighlightedIdx(-1);
    inputRef.current?.focus();
    // Reset after one event-loop tick — long enough for the effect to have run
    setTimeout(() => { suppressRef.current = false; }, 150);
  };

  const allItems = useMemo(() => [
    ...filteredMockServers.map(s => s.url),
    ...filteredSuggestions,
  ], [filteredMockServers, filteredSuggestions]);

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    // Undo/redo must be handled by us: repainting innerHTML per keystroke wiped the
    // browser's native history, so letting the default through replays a stale DOM and
    // corrupts the text (see createEditableHistory).
    if (isUndoKey(e) || isRedoKey(e)) {
      e.preventDefault();
      historyHandledRef.current = true;
      const entry = isUndoKey(e) ? historyRef.current.undo() : historyRef.current.redo();
      if (entry) applyValue(entry.text, entry.caret);
      return;
    }
    // contentEditable inserts a <div>/<br> on Enter by default — this is a single-line
    // field, so always suppress that; the suggestion-select branch below still runs.
    if (e.key === 'Enter') e.preventDefault();
    if (showSuggestions && allItems.length > 0) {
      if (e.key === 'ArrowDown') { e.preventDefault(); setHighlightedIdx(i => Math.min(i + 1, allItems.length - 1)); return; }
      if (e.key === 'ArrowUp')   { e.preventDefault(); setHighlightedIdx(i => Math.max(i - 1, -1)); return; }
      if (e.key === 'Enter' && highlightedIdx >= 0) { e.preventDefault(); handleSuggestionSelect(allItems[highlightedIdx]); return; }
      if (e.key === 'Escape')    { setShowSuggestions(false); setHighlightedIdx(-1); return; }
    }
    onKeyDown?.(e);
  };

  const borderColor = focused || methodOpen ? accent : 'var(--color-input-border)';

  return (
    <>
      <div
        ref={wrapperRef}
        className={className}
        style={{
          display: 'flex',
          height: base.height,
          width: base.width,
          border: `1px solid ${borderColor}`,
          borderRadius: base.borderRadius,
          background: 'var(--color-input-bg)',
          opacity: disabled ? 0.5 : 1,
          transition: 'border-color 120ms',
          overflow: 'visible',
          position: 'relative',
        }}
      >
        {/* Select trigger */}
        <div
          ref={triggerRef}
          data-stiv-trigger
          onClick={openMethodDropdown}
          className={`dui_select-text__trigger${disabled ? ' dui_select-text__trigger--disabled' : ''}`}
          style={{
            display: 'flex', alignItems: 'center', gap: base.gap,
            padding: `0 ${base.paddingX}`,
            width: selWidth,
            flexShrink: 0,
            cursor: disabled ? 'not-allowed' : 'pointer',
            userSelect: 'none',
            color: selectColor,
            fontWeight: 700,
            fontSize: base.fontSize,
            letterSpacing: '0.02em',
            borderRadius: `calc(${base.borderRadius} - 1px) 0 0 calc(${base.borderRadius} - 1px)`,
          }}
        >
          <span style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {selectedOpt?.label ?? selectValue}
          </span>
          <DropdownArrowIcon
            size={base.iconSize - 2}
            style={{
              flexShrink: 0,
              color: 'var(--color-text-muted)',
              transform: methodOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 150ms ease',
            }}
          />
        </div>

        {/* Divider */}
        <div style={{ width: 1, alignSelf: 'stretch', background: 'var(--color-input-border)', flexShrink: 0, margin: '4px 0' }} />

        {/* URL text field — contentEditable so {{var}} tokens can render as colored
            chips inline, same engine as HighlightedInputView (GraphQL/gRPC/MCP/AI/
            WS/SSE/SIO/MQTT), just laid out inside this component's single bordered
            method+URL pill instead of a second separate box. */}
        <div style={{ flex: 1, minWidth: 0, position: 'relative', height: '100%' }}>
          {/* Hidden while focused — same reason as HighlightedInputView: this overlay is
              positioned, so it paints above the editor's caret and made the cursor look
              dimmed/behind the grey placeholder text. */}
          {!inputValue && !focused && placeholder && (
            <span
              className="dui_select-text__placeholder"
              style={{
                position: 'absolute', left: base.paddingX, top: 0, right: base.paddingX,
                lineHeight: base.height,
                pointerEvents: 'none',
                fontSize: base.fontSize,
                color: 'var(--color-text-muted)',
                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
              }}
            >
              {placeholder}
            </span>
          )}
          <div
            ref={inputRef}
            contentEditable={!disabled}
            suppressContentEditableWarning
            spellCheck={false}
            onInput={handleEditorInput}
            onBeforeInput={handleBeforeInput}
            onPaste={handleEditorPaste}
            onFocus={() => setFocused(true)}
            onBlur={() => setTimeout(() => setFocused(false), 120)}
            onKeyDown={handleInputKeyDown}
            onCompositionStart={() => { composingRef.current = true; }}
            onCompositionEnd={() => { composingRef.current = false; handleEditorInput(); }}
            className="dui_select-text__editor"
            style={{
              height: '100%', width: '100%',
              padding: `${editorPadY}px ${base.paddingX}`,
              boxSizing: 'border-box',
              // display/align-content live in SelectTextInputView.css (block, never flex)
              // so they can carry an @supports fallback — see the note there.
              outline: 'none', background: 'transparent',
              fontSize: base.fontSize,
              // An explicit small line-height, never the field height: a full-height line
              // box would make the selection highlight and caret span the whole field.
              // Paired with editorPadY above, which is what actually centres it.
              lineHeight: `${editorLineHeight}px`,
              color: base.color ?? 'var(--color-text-primary)',
              fontFamily: 'inherit',
              fontStyle: base.fontStyle,
              whiteSpace: 'nowrap', overflow: 'hidden',
              cursor: disabled ? 'not-allowed' : 'text',
              caretColor: base.color ?? 'var(--color-text-primary)',
            }}
          />
        </div>
      </div>

      {/* Method dropdown portal */}
      {methodOpen && createPortal(
        <div
          data-stiv-method
          style={{
            position: 'fixed', top: methodDropPos.top, left: methodDropPos.left,
            minWidth: methodDropPos.width,
            background: 'var(--color-surface)',
            border: '1px solid var(--color-surface-border)',
            borderRadius: 8,
            boxShadow: '0 8px 24px rgba(0,0,0,0.22)',
            zIndex: 9999, padding: 3, overflow: 'hidden',
            '--dui-stiv-accent': accent,
          } as React.CSSProperties}
        >
          {selectOptions.map(opt => {
            const isSelected = opt.value === selectValue;
            return (
              <div
                key={opt.value}
                onMouseDown={e => { e.preventDefault(); onSelectChange(opt.value); setMethodOpen(false); }}
                className={`dui_select-text__option${isSelected ? ' dui_select-text__option--selected' : ''}`}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: `6px ${base.paddingX}`,
                  marginBottom: '2px',
                  borderRadius: 5, cursor: 'pointer',
                  fontSize: base.fontSize, fontWeight: isSelected ? 700 : 500,
                  color: opt.color ?? 'var(--color-text-primary)',
                }}
              >
                <span style={{ flex: 1 }}>{opt.label ?? opt.value}</span>
                {isSelected && <CheckIcon size={base.iconSize - 2} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />}
              </div>
            );
          })}
        </div>,
        document.body
      )}

      {/* Suggestions autocomplete portal */}
      {showSuggestions && (filteredSuggestions.length > 0 || filteredMockServers.length > 0) && createPortal(
        <div
          data-stiv-suggestions
          style={{
            position: 'fixed', top: suggDropPos.top, left: suggDropPos.left, width: suggDropPos.width,
            background: 'var(--color-surface)',
            border: '1px solid var(--color-surface-border)',
            borderRadius: 8,
            boxShadow: '0 8px 24px rgba(0,0,0,0.22)',
            zIndex: suggestionZIndex, padding: 3, overflow: 'hidden',
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
              {filteredMockServers.map((s, i) => (
                <div
                  key={s.url}
                  onMouseDown={e => { e.preventDefault(); handleMockSelect(s.url); }}
                  onMouseEnter={() => setHighlightedIdx(i)}
                  onMouseLeave={() => setHighlightedIdx(-1)}
                  className={`dui-stiv-sugg-item${i === highlightedIdx ? ' dui-stiv-sugg-item--active' : ''}`}
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
          {filteredSuggestions.length > 0 && (
            <>
              <div style={{ padding: '4px 10px 6px', borderBottom: '1px solid var(--color-surface-border)', marginTop: filteredMockServers.length > 0 ? 4 : 0 }}>
                <p style={{ fontSize: '9.5px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>
                  Suggestions
                </p>
              </div>
              <div style={{ padding: '4px 3px 3px' }}>
              {filteredSuggestions.map((s, i) => {
                const globalIdx = filteredMockServers.length + i;
                return (
                  <div
                    key={s}
                    onMouseDown={e => { e.preventDefault(); handleSuggestionSelect(s); }}
                    onMouseEnter={() => setHighlightedIdx(globalIdx)}
                    onMouseLeave={() => setHighlightedIdx(-1)}
                    className={`dui-stiv-sugg-item${globalIdx === highlightedIdx ? ' dui-stiv-sugg-item--active' : ''}`}
                  >
                    <SearchIcon size={14} style={{ color: 'var(--color-text-muted)', flexShrink: 0 }} />
                    <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontFamily: 'monospace' }}>
                      {s}
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
    </>
  );
}
