import type { CSSProperties } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { useCardBase } from '../../core/CardBase';
import { StatisticView } from './StatisticView';
import { SparklineView } from './SparklineView';

export interface StatTrendCardViewProps {
  label: string;
  value: number;
  trend: number[];
  prefix?: string;
  suffix?: string;
  precision?: number;
  size?: DuiSize;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

/** Animated count-up number + sparkline trend — distinct from the static `StatsCardView`. */
export function StatTrendCardView({
  label,
  value,
  trend,
  prefix,
  suffix,
  precision,
  size,
  color,
  className = '',
  style,
}: StatTrendCardViewProps) {
  const base = useCardBase(size, { color });

  return (
    <div className={className} style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 12, padding: base.padding, border: '1px solid var(--color-surface-border)', borderRadius: base.borderRadius, ...style }}>
      <StatisticView label={label} value={value} prefix={prefix} suffix={suffix} precision={precision} size={size} color={color} />
      <SparklineView data={trend} width={80} height={32} color={color} />
    </div>
  );
}
