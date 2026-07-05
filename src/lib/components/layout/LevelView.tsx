import type { CSSProperties, ReactNode } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { useLayoutBase } from '../../core/LayoutBase';

export interface LevelViewProps {
  /** Items on the left side. */
  left?: ReactNode;
  /** Items on the right side. */
  right?: ReactNode;
  size?: DuiSize;
  className?: string;
  style?: CSSProperties;
}

/** Space-between horizontal toolbar row — level primitive. */
export function LevelView({
  left,
  right,
  size,
  className = '',
  style,
}: LevelViewProps) {
  const base = useLayoutBase(size);

  return (
    <div className={className} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: base.gap, width: '100%', ...style }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: base.gap }}>{left}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: base.gap }}>{right}</div>
    </div>
  );
}
