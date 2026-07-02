export interface GaugeViewProps {
  /** 0–1 fraction */
  score: number;
  size?: number;
  /** Overrides the score-driven color when set */
  color?: string;
  /** Overrides the score-driven label when set */
  label?: string;
  className?: string;
  style?: React.CSSProperties;
}

function defaultColor(score: number): string {
  if (score >= 0.8) return 'var(--color-success)';
  if (score >= 0.5) return 'var(--color-warning)';
  return 'var(--color-error)';
}

function defaultLabel(score: number): string {
  if (score >= 0.8) return 'Excellent';
  if (score >= 0.6) return 'Good';
  if (score >= 0.4) return 'Fair';
  return 'Weak';
}

export function GaugeView({ score, size = 80, color, label, className = '', style }: GaugeViewProps) {
  const pct = Math.round(score * 100);
  const ringColor = color ?? defaultColor(score);
  const ringLabel = label ?? defaultLabel(score);

  return (
    <div
      className={className}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, ...style }}
    >
      <div
        style={{
          position: 'relative',
          width: size,
          height: size,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: `conic-gradient(${ringColor} ${pct * 3.6}deg, var(--color-elevated-border) 0deg)`,
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: size * 0.1,
            borderRadius: '50%',
            background: 'var(--color-surface)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span style={{ fontSize: size * 0.2, fontWeight: 700, color: ringColor }}>{pct}%</span>
        </div>
      </div>
      <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>{ringLabel}</span>
    </div>
  );
}
