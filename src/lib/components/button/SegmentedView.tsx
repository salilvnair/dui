/**
 * SegmentedView — bordered button-group segment control.
 *
 * Driven by DUI_HEIGHT.tab so the height is always consistent with other
 * DUI components at the same size. Active segment uses accentColor fill.
 *
 * Usage:
 *   <SegmentedView
 *     options={[{id:'a',label:'A'},{id:'b',label:'B'}]}
 *     value={v}
 *     onChange={setV}
 *     size="sm"
 *     accentColor="var(--story-accent-3)"
 *   />
 */
import type { CSSProperties, ReactNode } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { DUI_HEIGHT, DUI_FONT_SIZE, DUI_PADDING_X } from '../../core/DuiTokens';

export interface SegmentedOption {
  id: string;
  label: string;
  icon?: ReactNode;
}

export interface SegmentedViewProps {
  options: SegmentedOption[];
  value: string;
  onChange: (id: string) => void;
  size?: DuiSize;
  accentColor?: string;
  className?: string;
  style?: CSSProperties;
}

export function SegmentedView({
  options,
  value,
  onChange,
  size = 'sm',
  accentColor,
  className,
  style,
}: SegmentedViewProps) {
  const h = DUI_HEIGHT.tab[size];
  const fs = DUI_FONT_SIZE[size];
  const px = DUI_PADDING_X[size];

  return (
    <div
      className={className}
      style={{
        display: 'inline-flex',
        height: h,
        borderRadius: 6,
        border: '1px solid var(--color-btn-secondary-border, rgba(255,255,255,0.12))',
        overflow: 'hidden',
        background: 'var(--color-btn-secondary-bg, rgba(255,255,255,0.04))',
        flexShrink: 0,
        ...style,
      }}
    >
      {options.map((opt) => {
        const active = opt.id === value;
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => onChange(opt.id)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 4,
              height: '100%',
              padding: `0 ${px}`,
              fontSize: fs,
              fontWeight: 600,
              lineHeight: 1,
              whiteSpace: 'nowrap',
              background: active
                ? (accentColor ?? 'var(--color-primary, #7c3aed)')
                : 'transparent',
              color: active ? '#fff' : 'var(--color-text-muted)',
              border: 'none',
              cursor: 'pointer',
              transition: 'background 120ms, color 120ms',
              fontFamily: 'inherit',
            }}
          >
            {opt.icon}
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
