import { useMemo, type CSSProperties } from 'react';
import './AudioWaveformView.css';

export interface AudioWaveformViewProps {
  /** Normalized amplitude samples, 0-1. If omitted, renders a deterministic placeholder pattern. */
  samples?: number[];
  /** Playback progress, 0-1 — played bars render in `color`, the rest in a muted tone. */
  progress?: number;
  height?: number;
  color?: string;
  /** Animate bars with a gentle bounce — for a "live"/recording waveform. */
  animated?: boolean;
  className?: string;
  style?: CSSProperties;
}

function placeholderSamples(count: number): number[] {
  return Array.from({ length: count }, (_, i) => 0.25 + 0.65 * Math.abs(Math.sin(i * 0.7) * Math.cos(i * 0.31)));
}

/** Static or animated waveform visualization primitive — used standalone or inside `AudioPlayerView`. */
export function AudioWaveformView({
  samples,
  progress = 0,
  height = 40,
  color,
  animated = false,
  className = '',
  style,
}: AudioWaveformViewProps) {
  const accent = color ?? 'var(--color-primary)';
  const bars = useMemo(() => samples ?? placeholderSamples(48), [samples]);

  return (
    <div className={className} style={{ display: 'flex', alignItems: 'center', gap: 2, height, ...style }}>
      {bars.map((amp, i) => {
        const played = i / bars.length <= progress;
        return (
          <span
            key={i}
            style={{
              flex: 1, minWidth: 2, borderRadius: 2, height: `${Math.max(8, amp * 100)}%`,
              background: played ? accent : 'var(--color-surface-border)',
              transition: 'background 120ms',
              animation: animated ? `dui-waveform-bounce ${0.6 + (i % 5) * 0.08}s ease-in-out infinite` : undefined,
              transformOrigin: 'center',
            }}
          />
        );
      })}
    </div>
  );
}
