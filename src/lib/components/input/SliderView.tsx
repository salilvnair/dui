import type { CSSProperties } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import './SliderView.css';

export interface SliderViewProps {
  /**
   * A stable hook for tests and automation.
   *
   * Lands on this component's root element as `data-testid`. Worth setting on
   * anything a test drives: several dui inputs render a `contenteditable` div
   * with a decorative placeholder span, which neither `getByPlaceholder` nor
   * `getByRole` reliably finds.
   */
  testId?: string;

  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  size?: DuiSize;
  accentColor?: string;
  showValue?: boolean;
  width?: number | string;
  className?: string;
}

export function SliderView({ testId,
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  accentColor,
  showValue = false,
  width = '120px',
  className = '',
}: SliderViewProps) {
  const accent = accentColor || 'var(--color-primary)';
  const pct = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));

  const sliderStyle: CSSProperties = {
    '--dui-slider-accent': accent,
    background: `linear-gradient(to right, ${accent} ${pct}%, var(--color-surface-border, #3a3a3a) ${pct}%)`,
    width: typeof width === 'number' ? `${width}px` : width,
  } as CSSProperties;

  return (
    <div data-testid={testId} className={`dui-slider ${className}`}>
      <input
        type="range"
        className="dui-slider__input"
        value={value}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        style={sliderStyle}
      />
      {showValue && (
        <span style={{ fontSize: '11px', fontFamily: 'monospace', color: 'var(--color-text-muted)', minWidth: '30px', textAlign: 'right', marginLeft: '6px' }}>
          {value}
        </span>
      )}
    </div>
  );
}
