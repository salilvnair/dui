import type { CSSProperties } from 'react';
import type { DuiSize, DuiWidth } from '../../core/DuiTypes';
import { useFeedbackBase } from '../../core/FeedbackBase';
import './ProgressBarView.css';

export interface ProgressBarViewProps {
  /** 0-100. Omit for indeterminate (striped, animated) mode. */
  value?: number;
  /** Secondary "buffered" fill, 0-100 — e.g. video buffering ahead of playback. */
  buffer?: number;
  size?: DuiSize;
  width?: DuiWidth;
  color?: string;
  trackColor?: string;
  className?: string;
  style?: CSSProperties;
}

export function ProgressBarView({
  value,
  buffer,
  size,
  width,
  color,
  trackColor,
  className = '',
  style,
}: ProgressBarViewProps) {
  const base = useFeedbackBase(size, { width, color });
  const accent = color ?? 'var(--color-primary)';
  const track = trackColor ?? 'var(--color-surface-border)';
  const indeterminate = value === undefined;
  const pct = Math.min(100, Math.max(0, value ?? 0));

  return (
    <div
      className={`dui_progressbar ${className}`}
      role="progressbar"
      aria-valuenow={indeterminate ? undefined : pct}
      style={{ width: base.width, height: base.thickness, borderRadius: base.thickness / 2, background: track, overflow: 'hidden', position: 'relative', ...style }}
    >
      {buffer !== undefined && !indeterminate && (
        <div style={{ position: 'absolute', inset: 0, width: `${Math.min(100, Math.max(0, buffer))}%`, background: `color-mix(in srgb, ${accent} 30%, transparent)`, borderRadius: 'inherit', transition: 'width 300ms ease-out' }} />
      )}
      <div
        className={indeterminate ? 'dui_progressbar__fill dui_progressbar__fill--indeterminate' : 'dui_progressbar__fill'}
        style={{
          position: 'absolute', top: 0, bottom: 0, left: 0,
          width: indeterminate ? '40%' : `${pct}%`,
          background: accent, borderRadius: 'inherit',
          transition: indeterminate ? undefined : 'width 300ms ease-out',
        }}
      />
    </div>
  );
}
