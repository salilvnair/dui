import { useState, useRef, useEffect, type CSSProperties } from 'react';
import { createPortal } from 'react-dom';
import type { DuiSize, DuiRadius, DuiWidth } from '../../core/DuiTypes';
import { useSelectBase } from '../../core/SelectBase';
import { ChevronRightIcon, ChevronDownIcon } from '../../../icons';
import './CascaderView.css';

export interface CascaderOption {
  value: string;
  label: string;
  children?: CascaderOption[];
}

export interface CascaderViewProps {
  options: CascaderOption[];
  /** Selected path, e.g. ['us', 'ca', 'sf']. */
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
  size?: DuiSize;
  width?: DuiWidth;
  borderRadius?: DuiRadius | number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

function findPathLabels(options: CascaderOption[], path: string[]): string[] {
  const labels: string[] = [];
  let level = options;
  for (const v of path) {
    const found = level.find(o => o.value === v);
    if (!found) break;
    labels.push(found.label);
    level = found.children ?? [];
  }
  return labels;
}

/** Multi-level cascading select — region/category trees. */
export function CascaderView({
  options,
  value,
  onChange,
  placeholder = 'Select…',
  disabled = false,
  size,
  width,
  borderRadius,
  color,
  className = '',
  style,
}: CascaderViewProps) {
  const base = useSelectBase(size, { width, borderRadius, color });
  const accent = color ?? 'var(--color-primary)';
  const [open, setOpen] = useState(false);
  const [hoverPath, setHoverPath] = useState<string[]>(value);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => { if (open) setHoverPath(value); }, [open, value]);

  useEffect(() => {
    if (!open || !triggerRef.current || !menuRef.current) return;
    const trigger = triggerRef.current;
    const menu = menuRef.current;
    const position = () => {
      const r = trigger.getBoundingClientRect();
      menu.style.top = `${r.bottom + 4}px`;
      menu.style.left = `${Math.min(r.left, window.innerWidth - menu.offsetWidth - 8)}px`;
    };
    position();
    const raf = requestAnimationFrame(position);
    return () => cancelAnimationFrame(raf);
  }, [open, hoverPath]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (triggerRef.current?.contains(e.target as Node)) return;
      if (menuRef.current?.contains(e.target as Node)) return;
      setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const columns: CascaderOption[][] = [options];
  let level = options;
  for (let i = 0; i < hoverPath.length; i++) {
    const found = level.find(o => o.value === hoverPath[i]);
    if (!found?.children) break;
    columns.push(found.children);
    level = found.children;
  }

  const selectAt = (depth: number, opt: CascaderOption) => {
    const nextPath = [...hoverPath.slice(0, depth), opt.value];
    setHoverPath(nextPath);
    if (!opt.children) {
      onChange(nextPath);
      setOpen(false);
    }
  };

  const displayLabel = value.length ? findPathLabels(options, value).join(' / ') : placeholder;

  return (
    <div className={`dui_cascader ${className}`} style={{ display: 'inline-block', ...style }}>
      <button
        ref={triggerRef}
        type="button"
        disabled={disabled}
        onClick={() => setOpen(o => !o)}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: base.gap,
          width: base.width, height: base.height, paddingLeft: base.paddingX, paddingRight: base.paddingX,
          border: `1px solid ${open ? accent : 'var(--color-input-border)'}`, borderRadius: base.borderRadius,
          background: 'var(--color-input-bg)', cursor: disabled ? 'default' : 'pointer', opacity: disabled ? 0.5 : 1,
        }}
      >
        <span style={{ fontSize: base.fontSize, color: value.length ? 'var(--color-text-primary)' : 'var(--color-text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {displayLabel}
        </span>
        <ChevronDownIcon size={base.iconSize - 2} style={{ flexShrink: 0, transition: 'transform 140ms', transform: open ? 'rotate(180deg)' : 'none', color: 'var(--color-text-muted)' }} />
      </button>

      {open && createPortal(
        <div ref={menuRef} className="dui_cascader__menu" style={{ position: 'fixed', zIndex: 99999 }}>
          {columns.map((col, depth) => (
            <div key={depth} className="dui_cascader__column">
              {col.map(opt => {
                const active = hoverPath[depth] === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    className={`dui_cascader__item${active ? ' dui_cascader__item--active' : ''}`}
                    onClick={() => selectAt(depth, opt)}
                    style={{ fontSize: base.fontSize, color: active ? accent : 'var(--color-text-primary)' }}
                  >
                    {opt.label}
                    {opt.children && <ChevronRightIcon size={11} style={{ marginLeft: 'auto', opacity: 0.5 }} />}
                  </button>
                );
              })}
            </div>
          ))}
        </div>,
        document.body
      )}
    </div>
  );
}
