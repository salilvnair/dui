import { useEffect, useRef, useState, type CSSProperties } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { useDisplayBase } from '../../core/DisplayBase';
import './AIStreamingTextView.css';

export interface AIStreamingTextViewProps {
  /** Full text to reveal. As this grows (e.g. appended from a stream), new tokens fade in. */
  text: string;
  /** Show the pre-first-token "thinking" shimmer. */
  thinking?: boolean;
  /** Show the blinking cursor after the last revealed token. */
  streaming?: boolean;
  size?: DuiSize;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

/** Token-by-token LLM output renderer — per-token fade-in, thinking shimmer, blink cursor. */
export function AIStreamingTextView({
  text,
  thinking = false,
  streaming = true,
  size,
  color,
  className = '',
  style,
}: AIStreamingTextViewProps) {
  const base = useDisplayBase(size, { color });
  const tokens = text.length ? text.split(/(\s+)/).filter(Boolean) : [];
  const prevCount = useRef(0);
  const [newFrom, setNewFrom] = useState(0);

  useEffect(() => {
    setNewFrom(prevCount.current);
    prevCount.current = tokens.length;
  }, [text]);

  if (thinking && tokens.length === 0) {
    return (
      <span className={`dui_aistream__shimmer ${className}`} style={{ fontSize: base.fontSize, fontWeight: 600, ...style }}>
        Thinking…
      </span>
    );
  }

  return (
    <span className={className} style={{ fontSize: base.fontSize, color: color ?? 'var(--color-text-primary)', ...style }}>
      {tokens.map((tok, i) => (
        <span key={i} className={i >= newFrom ? 'dui_aistream__token' : undefined}>{tok}</span>
      ))}
      {streaming && <span className="dui_aistream__cursor" />}
    </span>
  );
}
