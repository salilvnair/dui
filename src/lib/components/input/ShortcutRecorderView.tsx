import { useState, useRef, type CSSProperties } from 'react';
import type { DuiSize, DuiRadius } from '../../core/DuiTypes';
import { useInputBase } from '../../core/InputBase';
import { KbdView } from '../display/KbdView';

export interface ShortcutRecorderViewProps {
  value: string[];
  onChange: (keys: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
  size?: DuiSize;
  borderRadius?: DuiRadius | number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

const MODIFIER_ORDER = ['Control', 'Meta', 'Alt', 'Shift'];

function normalizeKey(e: React.KeyboardEvent): string {
  const key = e.key;
  if (key === ' ') return 'Space';
  if (key.length === 1) return key.toUpperCase();
  return key;
}

/** Captures a keybinding — click to start recording, press keys, click away or Enter to commit. */
export function ShortcutRecorderView({
  value,
  onChange,
  placeholder = 'Click to record…',
  disabled = false,
  size,
  borderRadius,
  color,
  className = '',
  style,
}: ShortcutRecorderViewProps) {
  const base = useInputBase(size, { borderRadius, color });
  const accent = color ?? 'var(--color-primary)';
  const [recording, setRecording] = useState(false);
  const [draft, setDraft] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const startRecording = () => {
    if (disabled) return;
    setDraft([]);
    setRecording(true);
    requestAnimationFrame(() => containerRef.current?.focus());
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!recording) return;
    e.preventDefault();
    if (e.key === 'Escape') { setRecording(false); return; }
    const mods = MODIFIER_ORDER.filter(m =>
      (m === 'Control' && e.ctrlKey) || (m === 'Meta' && e.metaKey) || (m === 'Alt' && e.altKey) || (m === 'Shift' && e.shiftKey)
    );
    const isModifierOnly = ['Control', 'Meta', 'Alt', 'Shift'].includes(e.key);
    const combo = isModifierOnly ? mods : [...mods, normalizeKey(e)];
    setDraft(combo);
    if (!isModifierOnly) {
      onChange(combo);
      setRecording(false);
    }
  };

  const displayKeys = recording ? draft : value;

  return (
    <div
      ref={containerRef}
      tabIndex={disabled ? -1 : 0}
      onClick={startRecording}
      onKeyDown={handleKeyDown}
      onBlur={() => setRecording(false)}
      className={className}
      style={{
        display: 'flex', alignItems: 'center', gap: 6, height: base.height,
        paddingLeft: base.paddingX, paddingRight: base.paddingX,
        border: `1px solid ${recording ? accent : 'var(--color-input-border)'}`, borderRadius: base.borderRadius,
        background: 'var(--color-input-bg)', cursor: disabled ? 'default' : 'pointer',
        opacity: disabled ? 0.5 : 1, outline: 'none', boxSizing: 'border-box',
        ...style,
      }}
    >
      {displayKeys.length > 0
        ? <KbdView keys={displayKeys} size={size} />
        : <span style={{ fontSize: base.fontSize, color: 'var(--color-text-muted)' }}>{recording ? 'Press keys…' : placeholder}</span>}
    </div>
  );
}
