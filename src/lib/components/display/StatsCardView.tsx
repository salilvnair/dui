export type StatsTrend = 'up' | 'down' | 'neutral';

export interface StatsCardViewProps {
  label: string;
  value: string | number;
  subValue?: string;
  icon?: React.ReactNode;
  unit?: string;
  trend?: StatsTrend;
  trendValue?: string;
  accentColor?: string;
  compact?: boolean;
  /** 'label-top' (default): small caps label, then the big value below it.
   *  'value-top': big value first, small label caption below — for tiles
   *  where the number/timestamp is the headline (e.g. "2,847 / Nodes"). */
  layout?: 'label-top' | 'value-top';
  className?: string;
  style?: React.CSSProperties;
}

export function StatsCardView({
  label,
  value,
  subValue,
  icon,
  unit,
  trend,
  trendValue,
  accentColor,
  compact = false,
  layout = 'label-top',
  className = '',
  style,
}: StatsCardViewProps) {
  const accent = accentColor || 'var(--color-primary)';
  const trendColor = trend === 'up' ? 'var(--color-statscard-trend-up)' : trend === 'down' ? 'var(--color-statscard-trend-down)' : 'var(--color-text-muted)';
  const trendChar = trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→';

  const labelRow = (
    // `justify-content: space-between` alone gave no minimum spacing between
    // the label text and the icon — a long label (e.g. "TOTAL NODES") in a
    // narrow compact card ran right up against (or under) the icon with zero
    // gap. `gap` guarantees breathing room; `minWidth: 0` + ellipsis lets the
    // label truncate instead of overlapping when space is tight; `flexShrink:
    // 0` keeps the icon from being squeezed into the overlap in the first place.
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px' }}>
      <span style={{
        fontSize: '10px', fontWeight: 600, color: 'var(--color-text-muted)',
        textTransform: 'uppercase', letterSpacing: '0.06em',
        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', minWidth: 0,
      }}>
        {label}
      </span>
      {icon && layout === 'label-top' && (
        <span style={{ color: accent, opacity: 0.7, flexShrink: 0 }}>{icon}</span>
      )}
    </div>
  );

  const valueRow = (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
      {icon && layout === 'value-top' && (
        <span style={{ color: accent, opacity: 0.8, marginRight: '2px' }}>{icon}</span>
      )}
      <span style={{ fontSize: compact ? '18px' : '22px', fontWeight: 700, color: accent, lineHeight: 1 }}>
        {value}
      </span>
      {unit && (
        <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', fontWeight: 500 }}>{unit}</span>
      )}
    </div>
  );

  return (
    <div
      className={className}
      style={{
        background: accentColor ? `color-mix(in srgb, ${accentColor} 8%, var(--color-surface))` : 'var(--color-statscard-bg)',
        border: accentColor ? `1px solid color-mix(in srgb, ${accentColor} 20%, transparent)` : '1px solid var(--color-statscard-border)',
        borderRadius: '8px',
        padding: compact ? '10px 12px' : '14px 16px',
        display: 'flex',
        flexDirection: 'column',
        gap: compact ? '4px' : '6px',
        minWidth: compact ? 100 : 130,
        ...style,
      }}
    >
      {layout === 'value-top' ? (
        <>
          {valueRow}
          <span style={{ fontSize: '10px', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            {label}
          </span>
        </>
      ) : (
        <>
          {labelRow}
          {valueRow}
        </>
      )}

      {(subValue || (trend && trendValue)) && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {subValue && (
            <span style={{ fontSize: '10px', color: 'var(--color-text-muted)' }}>{subValue}</span>
          )}
          {trend && trendValue && (
            <span style={{ fontSize: '10px', color: trendColor, fontWeight: 600 }}>
              {trendChar} {trendValue}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
