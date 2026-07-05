import { useEffect, useState, type CSSProperties } from 'react';
import type { DuiSize, DuiWidth, DuiRadius } from '../../core/DuiTypes';
import { useInputBase } from '../../core/InputBase';

export interface GhostTypingPlaceholderViewProps {
  value: string;
  onChange: (value: string) => void;
  /** Rotating example queries typed/backspaced into the placeholder slot. */
  examples: string[];
  /** Milliseconds per character. Default 45. */
  speed?: number;
  pause?: number;
  size?: DuiSize;
  width?: DuiWidth;
  borderRadius?: DuiRadius | number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

/** An input placeholder that types out rotating example queries, pauses, then backspaces into the next one. */
export function GhostTypingPlaceholderView({
  value,
  onChange,
  examples,
  speed = 45,
  pause = 1400,
  size,
  width,
  borderRadius,
  color,
  className = '',
  style,
}: GhostTypingPlaceholderViewProps) {
  const base = useInputBase(size, { width, borderRadius, color });
  const [exIdx, setExIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (focused || value) return;
    const current = examples[exIdx] ?? '';
    if (!deleting && charIdx === current.length) {
      const t = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(t);
    }
    if (deleting && charIdx === 0) {
      setDeleting(false);
      setExIdx(i => (i + 1) % examples.length);
      return;
    }
    const t = setTimeout(() => setCharIdx(i => i + (deleting ? -1 : 1)), deleting ? speed / 2 : speed);
    return () => clearTimeout(t);
  }, [charIdx, deleting, exIdx, focused, value]);

  const placeholder = focused || value ? '' : (examples[exIdx] ?? '').slice(0, charIdx);

  return (
    <input
      value={value}
      onChange={e => onChange(e.target.value)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      placeholder={placeholder}
      className={className}
      style={{
        height: base.height, fontSize: base.fontSize, padding: `0 ${base.paddingX}`,
        borderRadius: base.borderRadius, border: '1px solid var(--color-surface-border)',
        background: 'var(--color-surface)', color: 'var(--color-text-primary)', outline: 'none',
        width: base.width, boxSizing: 'border-box',
        ...style,
      }}
    />
  );
}
