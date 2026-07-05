import type { CSSProperties, ReactNode } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { useDisplayBase } from '../../core/DisplayBase';

export interface LiveCursor {
  id: string;
  name: string;
  /** Position as a fraction (0-1) of the container's width/height. */
  x: number;
  y: number;
  color?: string;
}

export interface LiveCursorPresenceViewProps {
  cursors: LiveCursor[];
  children: ReactNode;
  size?: DuiSize;
  className?: string;
  style?: CSSProperties;
}

const PALETTE = ['#f97316', '#22c55e', '#3b82f6', '#e11d48', '#a855f7', '#14b8a6'];

/** Collaborative cursors with name tags, overlaid on arbitrary content. */
export function LiveCursorPresenceView({
  cursors,
  children,
  size,
  className = '',
  style,
}: LiveCursorPresenceViewProps) {
  const base = useDisplayBase(size);

  return (
    <div className={className} style={{ position: 'relative', ...style }}>
      {children}
      {cursors.map((c, i) => (
        <div
          key={c.id}
          style={{
            position: 'absolute', left: `${c.x * 100}%`, top: `${c.y * 100}%`,
            transform: 'translate(-2px, -2px)', pointerEvents: 'none',
            transition: 'left 200ms ease-out, top 200ms ease-out', zIndex: 10,
          }}
        >
          <svg width={16} height={16} viewBox="0 0 16 16" fill={c.color ?? PALETTE[i % PALETTE.length]}>
            <path d="M1 1 L14 7 L8 8.5 L6.5 14 Z" stroke="var(--color-surface)" strokeWidth={1} />
          </svg>
          <span style={{
            marginLeft: 12, marginTop: -4, display: 'inline-block', fontSize: base.fontSize, color: '#fff',
            background: c.color ?? PALETTE[i % PALETTE.length], padding: '1px 6px', borderRadius: 4, whiteSpace: 'nowrap',
          }}>
            {c.name}
          </span>
        </div>
      ))}
    </div>
  );
}
