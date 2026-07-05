import type { CSSProperties } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { useChipBase } from '../../core/ChipBase';
import { CloseIcon } from '../../../icons';

export interface FilterBarFilter {
  key: string;
  label: string;
}

export interface FilterBarViewProps {
  filters: FilterBarFilter[];
  onRemove: (key: string) => void;
  onClearAll?: () => void;
  size?: DuiSize;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

/** Chip-based row of active filters with a clear-all action. */
export function FilterBarView({
  filters,
  onRemove,
  onClearAll,
  size,
  color,
  className = '',
  style,
}: FilterBarViewProps) {
  const base = useChipBase(size, { color });
  const accent = color ?? 'var(--color-primary)';

  if (filters.length === 0) return null;

  return (
    <div className={className} style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 6, ...style }}>
      {filters.map(f => (
        <span
          key={f.key}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 4, height: base.height,
            paddingLeft: base.paddingX, paddingRight: 6, borderRadius: base.borderRadius,
            background: `color-mix(in srgb, ${accent} 12%, transparent)`, color: accent,
            fontSize: base.fontSize, fontWeight: 600,
          }}
        >
          {f.label}
          <button
            type="button"
            onClick={() => onRemove(f.key)}
            aria-label={`Remove ${f.label}`}
            style={{ display: 'flex', border: 'none', background: 'transparent', color: 'inherit', cursor: 'pointer', padding: 1, opacity: 0.7 }}
          >
            <CloseIcon size={10} />
          </button>
        </span>
      ))}
      {onClearAll && (
        <button
          type="button"
          onClick={onClearAll}
          style={{ border: 'none', background: 'transparent', color: 'var(--color-text-muted)', fontSize: base.fontSize, fontWeight: 600, cursor: 'pointer', textDecoration: 'underline' }}
        >
          Clear all
        </button>
      )}
    </div>
  );
}
