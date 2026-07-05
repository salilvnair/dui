import { useRef, type CSSProperties } from 'react';
import type { DuiSize, DuiRadius } from '../../core/DuiTypes';
import { useInputBase } from '../../core/InputBase';
import { PaperclipIcon, SendIcon } from '../../../icons';

export interface ChatInputViewProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  onAttach?: (files: FileList) => void;
  placeholder?: string;
  disabled?: boolean;
  size?: DuiSize;
  borderRadius?: DuiRadius | number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

/** Message composer — auto-growing textarea + attach + send. */
export function ChatInputView({
  value,
  onChange,
  onSend,
  onAttach,
  placeholder = 'Type a message…',
  disabled = false,
  size,
  borderRadius,
  color,
  className = '',
  style,
}: ChatInputViewProps) {
  const base = useInputBase(size, { borderRadius, color });
  const accent = color ?? 'var(--color-primary)';
  const fileRef = useRef<HTMLInputElement>(null);

  const send = () => { if (value.trim()) onSend(); };

  return (
    <div
      className={className}
      style={{
        display: 'flex', alignItems: 'flex-end', gap: 6, padding: 6,
        border: '1px solid var(--color-input-border)', borderRadius: base.borderRadius,
        background: 'var(--color-input-bg)', ...style,
      }}
    >
      {onAttach && (
        <>
          <button type="button" onClick={() => fileRef.current?.click()} style={{ display: 'flex', border: 'none', background: 'transparent', color: 'var(--color-text-muted)', cursor: 'pointer', padding: 6, flexShrink: 0 }} aria-label="Attach file">
            <PaperclipIcon size={base.iconSize} />
          </button>
          <input ref={fileRef} type="file" multiple style={{ display: 'none' }} onChange={e => { if (e.target.files) onAttach(e.target.files); e.target.value = ''; }} />
        </>
      )}
      <textarea
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        onChange={e => onChange(e.target.value)}
        onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } }}
        rows={1}
        style={{
          flex: 1, resize: 'none', border: 'none', outline: 'none', background: 'transparent',
          color: 'var(--color-text-primary)', fontSize: base.fontSize, fontFamily: 'inherit',
          maxHeight: 96, padding: '6px 4px',
        }}
      />
      <button
        type="button"
        disabled={disabled || !value.trim()}
        onClick={send}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          width: parseInt(base.height, 10), height: parseInt(base.height, 10), borderRadius: '999px',
          border: 'none', background: value.trim() ? accent : 'var(--color-surface-border)',
          color: '#fff', cursor: value.trim() ? 'pointer' : 'default', transition: 'background 140ms',
        }}
        aria-label="Send"
      >
        <SendIcon size={base.iconSize} />
      </button>
    </div>
  );
}
