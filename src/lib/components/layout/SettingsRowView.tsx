import type { CSSProperties, ReactNode } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { useLayoutBase } from '../../core/LayoutBase';

export interface SettingsRowViewProps {
  label: string;
  description?: string;
  control: ReactNode;
  size?: DuiSize;
  className?: string;
  style?: CSSProperties;
}

/** Label + description + control row — the standard settings-page primitive. */
export function SettingsRowView({
  label,
  description,
  control,
  size,
  className = '',
  style,
}: SettingsRowViewProps) {
  const base = useLayoutBase(size);

  return (
    <div className={className} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: base.gap, padding: `10px ${base.padding}`, ...style }}>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: base.fontSize, fontWeight: 600, color: 'var(--color-text-primary)' }}>{label}</div>
        {description && <div style={{ fontSize: base.fontSize, color: 'var(--color-text-muted)', marginTop: 2 }}>{description}</div>}
      </div>
      <div style={{ flexShrink: 0 }}>{control}</div>
    </div>
  );
}
