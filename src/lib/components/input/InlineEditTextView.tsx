import { useEffect, useRef, useState, type CSSProperties } from 'react';

export interface InlineEditTextViewProps {
  /** Current committed value. */
  value: string;
  /** Shown (dimmed by the consumer's CSS) when value is empty, and as the edit box placeholder. */
  placeholder?: string;
  /** Called with the trimmed new value on Enter/blur. May be async — the display dims until it resolves. */
  onSave: (next: string) => void | Promise<void>;
  /** Multiline editing (default true): the box auto-grows with content; Shift+Enter inserts a newline, Enter saves. */
  multiline?: boolean;
  disabled?: boolean;
  /** Applied to the display span AND the edit box, so hover affordances style both states. */
  className?: string;
  accentColor?: string;
  /** Hover tooltip on the display span (default "Double-click to edit"). */
  tooltip?: string;
  style?: CSSProperties;
}

/**
 * InlineEditTextView — double-click any run of text to edit it in place.
 *
 * The edit box is *seamless*: it inherits font, size, line-height, and color
 * from its context, spans the full width of the line it replaces, auto-grows
 * for multiline content, and uses negative margins so its padding + border
 * overlay the text footprint instead of shifting the layout. The result reads
 * as "the text became editable", not "a form input appeared".
 *
 * Enter saves (Shift+Enter = newline when multiline), Escape cancels, blur saves.
 */
export function InlineEditTextView({
  value,
  placeholder = '',
  onSave,
  multiline = true,
  disabled = false,
  className = '',
  accentColor,
  tooltip = 'Double-click to edit',
  style,
}: InlineEditTextViewProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const [saving, setSaving] = useState(false);
  const boxRef = useRef<HTMLTextAreaElement | null>(null);
  const accent = accentColor || 'var(--color-primary)';

  useEffect(() => { if (!editing) setDraft(value); }, [value, editing]);

  const autoGrow = () => {
    const el = boxRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  };

  useEffect(() => {
    if (!editing) return;
    autoGrow();
    const el = boxRef.current;
    el?.focus();
    el?.setSelectionRange(el.value.length, el.value.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editing]);

  const save = async () => {
    const next = draft.trim();
    setEditing(false);
    if (next === value.trim()) return;
    setSaving(true);
    try {
      await onSave(next);
    } finally {
      setSaving(false);
    }
  };

  const cancel = () => { setDraft(value); setEditing(false); };

  if (editing) {
    return (
      <textarea
        ref={boxRef}
        value={draft}
        placeholder={placeholder}
        rows={1}
        className={className}
        onChange={(e) => { setDraft(e.target.value); autoGrow(); }}
        onBlur={() => void save()}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !(multiline && e.shiftKey)) { e.preventDefault(); void save(); }
          if (e.key === 'Escape') { e.preventDefault(); cancel(); }
        }}
        style={{
          display: 'block',
          width: '100%',
          boxSizing: 'border-box',
          font: 'inherit',
          fontSize: 'inherit',
          lineHeight: 'inherit',
          color: 'inherit',
          textAlign: 'inherit',
          background: 'var(--color-input-bg)',
          border: `1px solid ${accent}`,
          borderRadius: 6,
          padding: '2px 6px',
          // padding (2/6) + border (1) exactly cancelled so the box overlays
          // the text footprint instead of pushing siblings around
          margin: '-3px -7px',
          outline: 'none',
          resize: 'none',
          overflow: 'hidden',
          boxShadow: `0 0 0 2px color-mix(in srgb, ${accent} 20%, transparent)`,
          ...style,
        }}
      />
    );
  }

  return (
    <span
      className={className}
      title={disabled ? undefined : tooltip}
      style={{ opacity: saving ? 0.55 : undefined, cursor: disabled ? undefined : 'text', ...style }}
      onDoubleClick={disabled ? undefined : () => setEditing(true)}
    >
      {value || placeholder}
    </span>
  );
}
