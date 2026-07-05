import type { CSSProperties, ReactNode } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { useCardBase } from '../../core/CardBase';
import { ToggleSwitchView } from './ToggleSwitchView';

export interface SwitchGroupItem {
  value: string;
  label: string;
  description?: string;
  icon?: ReactNode;
  disabled?: boolean;
}

export interface SwitchGroupViewProps {
  title?: string;
  items: SwitchGroupItem[];
  /** Set of currently-enabled item values. */
  checked: string[];
  onChange: (checked: string[]) => void;
  size?: DuiSize;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function SwitchGroupView({
  title,
  items,
  checked,
  onChange,
  size,
  color,
  className = '',
  style,
}: SwitchGroupViewProps) {
  const base = useCardBase(size, { color });
  const checkedSet = new Set(checked);

  const toggle = (value: string, on: boolean) => {
    onChange(on ? [...checked, value] : checked.filter(v => v !== value));
  };

  return (
    <div className={className} style={{ borderRadius: base.borderRadius, border: '1px solid var(--color-surface-border)', background: 'var(--color-surface)', overflow: 'hidden', ...style }}>
      {title && (
        <div style={{ padding: base.padding, fontSize: base.fontSize, fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', borderBottom: '1px solid var(--color-surface-border)' }}>
          {title}
        </div>
      )}
      {items.map((item, i) => (
        <div
          key={item.value}
          style={{
            display: 'flex', alignItems: 'center', gap: base.gap, padding: base.padding,
            borderBottom: i < items.length - 1 ? '1px solid var(--color-surface-border)' : 'none',
            opacity: item.disabled ? 0.5 : 1,
          }}
        >
          {item.icon && <span style={{ display: 'flex', color: 'var(--color-text-muted)', flexShrink: 0 }}>{item.icon}</span>}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: base.fontSize, fontWeight: 600, color: 'var(--color-text-primary)' }}>{item.label}</div>
            {item.description && (
              <div style={{ fontSize: base.fontSize, color: 'var(--color-text-muted)', marginTop: 1 }}>{item.description}</div>
            )}
          </div>
          <ToggleSwitchView
            checked={checkedSet.has(item.value)}
            onChange={v => toggle(item.value, v)}
            disabled={item.disabled}
            size={size}
            accentColor={color}
          />
        </div>
      ))}
    </div>
  );
}
