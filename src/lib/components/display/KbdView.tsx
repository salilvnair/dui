import type { CSSProperties } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { useChipBase } from '../../core/ChipBase';

export interface KbdViewProps {
  keys: string | string[];
  size?: DuiSize;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

/** `<kbd>`-style hotkey hint chip. Composes multiple keys with a "+" separator. */
export function KbdView({
  keys,
  size,
  color,
  className = '',
  style,
}: KbdViewProps) {
  const base = useChipBase(size, { color });
  const list = Array.isArray(keys) ? keys : [keys];

  return (
    <span className={className} style={{ display: 'inline-flex', alignItems: 'center', gap: 3, ...style }}>
      {list.map((k, i) => (
        <kbd
          key={i}
          style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            minWidth: base.height, height: base.height, padding: `0 ${base.paddingX}`,
            borderRadius: 5, fontSize: base.fontSize, fontFamily: 'ui-monospace, monospace', fontWeight: 600,
            color: base.color ?? 'var(--color-text-secondary)', background: 'var(--color-surface)',
            border: '1px solid var(--color-surface-border)', borderBottomWidth: 2,
            boxSizing: 'border-box',
          }}
        >
          {k}
        </kbd>
      ))}
    </span>
  );
}
