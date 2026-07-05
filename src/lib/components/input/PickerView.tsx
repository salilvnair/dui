import { useRef, useEffect, useCallback, useMemo } from 'react';
import type { DuiSize, DuiRadius, DuiWidth } from '../../core/DuiTypes';
import { useSelectBase } from '../../core/SelectBase';
import { useDui } from '../../core/DuiContext';
import './PickerView.css';

export interface PickerOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface PickerColumn {
  options: PickerOption[];
  value: string;
  onChange: (value: string) => void;
  /** Optional caption rendered under the wheel, e.g. "Hour" / "Min". */
  label?: string;
  /** Flex-grow weight relative to other columns. Defaults to 1 (equal width). */
  flex?: number;
}

export interface PickerViewProps {
  /** Single-column mode — mutually exclusive with `columns`. */
  options?: PickerOption[];
  value?: string;
  onChange?: (value: string) => void;
  /** Multi-column mode — e.g. hour / minute / meridiem wheels side by side. */
  columns?: PickerColumn[];
  size?: DuiSize;
  /** Odd number of rows visible in the wheel. Default 5. */
  visibleRows?: number;
  width?: DuiWidth;
  borderRadius?: DuiRadius | number;
  /** Accent color for the selection highlight band. */
  color?: string;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function Wheel({
  column,
  itemHeight,
  visibleRows,
  fontSize,
  accent,
  disabled,
}: {
  column: PickerColumn;
  itemHeight: number;
  visibleRows: number;
  fontSize: string;
  accent: string;
  disabled: boolean;
}) {
  const { options, value, onChange, label } = column;
  const scrollRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const settleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rafId = useRef<number | null>(null);
  const isProgrammatic = useRef(false);

  const wheelHeight = itemHeight * visibleRows;
  const padY = (itemHeight * (visibleRows - 1)) / 2;
  const activeIndex = Math.max(0, options.findIndex(o => o.value === value));

  const applyItemTransforms = useCallback((scrollTop: number) => {
    const els = itemRefs.current;
    const centerY = scrollTop + wheelHeight / 2;
    for (let i = 0; i < els.length; i++) {
      const el = els[i];
      if (!el) continue;
      const itemCenter = padY + i * itemHeight + itemHeight / 2;
      const norm = (itemCenter - centerY) / itemHeight;
      const dist = Math.abs(norm);
      const opacity = clamp(1 - dist * 0.38, 0.15, 1);
      const scale = clamp(1 - dist * 0.14, 0.68, 1);
      const rotateX = clamp(norm * 24, -58, 58);
      el.style.opacity = String(opacity);
      el.style.transform = `perspective(700px) rotateX(${rotateX}deg) scale(${scale})`;
    }
  }, [itemHeight, wheelHeight, padY]);

  const scrollToIndex = useCallback((index: number, smooth: boolean) => {
    const el = scrollRef.current;
    if (!el) return;
    isProgrammatic.current = true;
    el.scrollTo({ top: index * itemHeight, behavior: smooth ? 'smooth' : 'auto' });
    window.setTimeout(() => { isProgrammatic.current = false; }, smooth ? 260 : 0);
  }, [itemHeight]);

  // Sync scroll position when the controlled value changes externally.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const target = activeIndex * itemHeight;
    if (Math.abs(el.scrollTop - target) > 1) scrollToIndex(activeIndex, false);
    applyItemTransforms(target);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, itemHeight]);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    if (rafId.current) cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(() => applyItemTransforms(el.scrollTop));

    if (settleTimer.current) clearTimeout(settleTimer.current);
    settleTimer.current = setTimeout(() => {
      if (isProgrammatic.current) return;
      const nearest = clamp(Math.round(el.scrollTop / itemHeight), 0, options.length - 1);
      const target = options[nearest];
      if (target && target.value !== value && !target.disabled) onChange(target.value);
      else scrollToIndex(activeIndex, true);
    }, 110);
  }, [applyItemTransforms, itemHeight, options, value, onChange, activeIndex, scrollToIndex]);

  useEffect(() => () => {
    if (settleTimer.current) clearTimeout(settleTimer.current);
    if (rafId.current) cancelAnimationFrame(rafId.current);
  }, []);

  const handleKey = (e: React.KeyboardEvent) => {
    if (disabled) return;
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const next = options[clamp(activeIndex - 1, 0, options.length - 1)];
      if (next && !next.disabled) onChange(next.value);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = options[clamp(activeIndex + 1, 0, options.length - 1)];
      if (next && !next.disabled) onChange(next.value);
    }
  };

  return (
    <div className="dui_picker__col" style={{ flex: column.flex ?? 1 }}>
      <div
        className="dui_picker__wheel"
        style={{ height: wheelHeight, borderRadius: 'inherit' }}
      >
        <div
          className="dui_picker__highlight"
          style={{
            height: itemHeight,
            top: padY,
            borderTopColor: accent,
            borderBottomColor: accent,
            background: `color-mix(in srgb, ${accent} 10%, transparent)`,
          }}
        />
        <div className="dui_picker__fade dui_picker__fade--top" />
        <div className="dui_picker__fade dui_picker__fade--bottom" />
        <div
          ref={scrollRef}
          className={`dui_picker__scroll${disabled ? ' dui_picker__scroll--disabled' : ''}`}
          onScroll={handleScroll}
          onKeyDown={handleKey}
          tabIndex={disabled ? -1 : 0}
          role="listbox"
          aria-disabled={disabled}
        >
          <div style={{ height: padY, flexShrink: 0 }} />
          {options.map((opt, i) => (
            <div
              key={opt.value}
              ref={el => { itemRefs.current[i] = el; }}
              className={`dui_picker__item${opt.value === value ? ' dui_picker__item--selected' : ''}${opt.disabled ? ' dui_picker__item--disabled' : ''}`}
              style={{ height: itemHeight, fontSize }}
              role="option"
              aria-selected={opt.value === value}
              onClick={() => !disabled && !opt.disabled && (opt.value === value ? undefined : onChange(opt.value))}
            >
              {opt.label}
            </div>
          ))}
          <div style={{ height: padY, flexShrink: 0 }} />
        </div>
      </div>
      {label && <div className="dui_picker__label">{label}</div>}
    </div>
  );
}

/**
 * Scrollable wheel picker. Single column via `options`/`value`/`onChange`,
 * or multiple synchronized wheels (hour/min/meridiem-style) via `columns`.
 */
export function PickerView({
  options,
  value,
  onChange,
  columns,
  size,
  visibleRows = 5,
  width,
  borderRadius,
  color,
  disabled = false,
  className = '',
  style,
}: PickerViewProps) {
  const ctx = useDui();
  const base = useSelectBase(size, { width, borderRadius, color });
  const accent = color ?? ctx.activeColor ?? 'var(--color-primary)';
  const rows = visibleRows % 2 === 0 ? visibleRows + 1 : visibleRows;
  const itemHeight = parseInt(base.height, 10) + 6;

  const resolvedColumns: PickerColumn[] = useMemo(() => {
    if (columns && columns.length) return columns;
    if (options && onChange !== undefined) {
      return [{ options, value: value ?? options[0]?.value ?? '', onChange }];
    }
    return [];
  }, [columns, options, value, onChange]);

  return (
    <div
      className={`dui_picker ${className}`}
      style={{
        display: 'flex',
        width: base.width,
        minWidth: base.width === 'auto' ? 160 : undefined,
        borderRadius: base.borderRadius,
        border: '1px solid var(--color-surface-border)',
        background: 'var(--color-input-bg)',
        padding: '0 2px',
        opacity: disabled ? 0.5 : 1,
        pointerEvents: disabled ? 'none' : 'auto',
        ...style,
      }}
    >
      {resolvedColumns.map((col, i) => (
        <Wheel
          key={i}
          column={col}
          itemHeight={itemHeight}
          visibleRows={rows}
          fontSize={base.fontSize}
          accent={accent}
          disabled={disabled}
        />
      ))}
    </div>
  );
}
