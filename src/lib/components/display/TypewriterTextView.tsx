import { useEffect, useState, type CSSProperties } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { useDisplayBase } from '../../core/DisplayBase';
import './TypewriterTextView.css';

export interface TypewriterTextViewProps {
  text: string | string[];
  /** Milliseconds per character. Default 45. */
  speed?: number;
  /** Pause (ms) between cycling to the next string when `text` is an array. Default 1500. */
  pause?: number;
  loop?: boolean;
  size?: DuiSize;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

/** Animated typing-effect text. */
export function TypewriterTextView({
  text,
  speed = 45,
  pause = 1500,
  loop = true,
  size,
  color,
  className = '',
  style,
}: TypewriterTextViewProps) {
  const base = useDisplayBase(size, { color });
  const strings = Array.isArray(text) ? text : [text];
  const [strIdx, setStrIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = strings[strIdx];
    if (!deleting && charIdx === current.length) {
      if (!loop && strIdx === strings.length - 1) return;
      const t = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(t);
    }
    if (deleting && charIdx === 0) {
      setDeleting(false);
      setStrIdx(i => (i + 1) % strings.length);
      return;
    }
    const t = setTimeout(() => setCharIdx(i => i + (deleting ? -1 : 1)), deleting ? speed / 2 : speed);
    return () => clearTimeout(t);
  }, [charIdx, deleting, strIdx]);

  return (
    <span className={className} style={{ fontSize: base.fontSize, color: color ?? 'var(--color-text-primary)', fontFamily: 'var(--font-mono, monospace)', ...style }}>
      {strings[strIdx].slice(0, charIdx)}
      <span className="dui_typewriter__cursor" />
    </span>
  );
}
