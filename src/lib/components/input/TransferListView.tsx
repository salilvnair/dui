import { useState, type CSSProperties } from 'react';
import type { DuiSize, DuiRadius } from '../../core/DuiTypes';
import { useSelectBase } from '../../core/SelectBase';
import { ChevronLeftIcon, ChevronRightIcon } from '../../../icons';
import './TransferListView.css';

export interface TransferItem {
  value: string;
  label: string;
}

export interface TransferListViewProps {
  items: TransferItem[];
  /** Values currently on the right ("selected") side. */
  value: string[];
  onChange: (value: string[]) => void;
  leftTitle?: string;
  rightTitle?: string;
  size?: DuiSize;
  borderRadius?: DuiRadius | number;
  color?: string;
  height?: number;
  className?: string;
  style?: CSSProperties;
}

function Panel({
  title, items, checked, onToggle, fontSize,
}: { title: string; items: TransferItem[]; checked: Set<string>; onToggle: (v: string) => void; fontSize: string }) {
  return (
    <div className="dui_transferlist__panel">
      <div className="dui_transferlist__header" style={{ fontSize }}>{title} · {items.length}</div>
      <div className="dui_transferlist__list">
        {items.map(item => (
          <label key={item.value} className="dui_transferlist__row" style={{ fontSize }}>
            <input type="checkbox" checked={checked.has(item.value)} onChange={() => onToggle(item.value)} />
            {item.label}
          </label>
        ))}
        {items.length === 0 && <div className="dui_transferlist__empty" style={{ fontSize }}>Empty</div>}
      </div>
    </div>
  );
}

export function TransferListView({
  items,
  value,
  onChange,
  leftTitle = 'Available',
  rightTitle = 'Selected',
  size,
  borderRadius,
  color,
  height = 220,
  className = '',
  style,
}: TransferListViewProps) {
  const base = useSelectBase(size, { borderRadius, color });
  const accent = color ?? 'var(--color-primary)';
  const [leftChecked, setLeftChecked] = useState<Set<string>>(new Set());
  const [rightChecked, setRightChecked] = useState<Set<string>>(new Set());

  const selectedSet = new Set(value);
  const leftItems = items.filter(i => !selectedSet.has(i.value));
  const rightItems = items.filter(i => selectedSet.has(i.value));

  const toggle = (set: Set<string>, setSet: (s: Set<string>) => void, v: string) => {
    const next = new Set(set);
    next.has(v) ? next.delete(v) : next.add(v);
    setSet(next);
  };

  const moveRight = () => {
    onChange([...value, ...Array.from(leftChecked)]);
    setLeftChecked(new Set());
  };
  const moveLeft = () => {
    onChange(value.filter(v => !rightChecked.has(v)));
    setRightChecked(new Set());
  };
  const moveAllRight = () => { onChange(items.map(i => i.value)); setLeftChecked(new Set()); };
  const moveAllLeft = () => { onChange([]); setRightChecked(new Set()); };

  return (
    <div className={`dui_transferlist ${className}`} style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 460, ...style }}>
      <div style={{ height, borderRadius: base.borderRadius, border: '1px solid var(--color-surface-border)', overflow: 'hidden', flex: 1 }}>
        <Panel title={leftTitle} items={leftItems} checked={leftChecked} onToggle={v => toggle(leftChecked, setLeftChecked, v)} fontSize={base.fontSize} />
      </div>
      <div className="dui_transferlist__controls">
        <button type="button" className="dui_transferlist__btn" style={{ '--dui-tl-accent': accent } as CSSProperties} onClick={moveRight} disabled={!leftChecked.size} aria-label="Move selected right">
          <ChevronRightIcon size={12} />
        </button>
        <button type="button" className="dui_transferlist__btn" style={{ '--dui-tl-accent': accent } as CSSProperties} onClick={moveAllRight} disabled={!leftItems.length} aria-label="Move all right">
          <ChevronRightIcon size={12} /><ChevronRightIcon size={12} style={{ marginLeft: -6 }} />
        </button>
        <button type="button" className="dui_transferlist__btn" style={{ '--dui-tl-accent': accent } as CSSProperties} onClick={moveLeft} disabled={!rightChecked.size} aria-label="Move selected left">
          <ChevronLeftIcon size={12} />
        </button>
        <button type="button" className="dui_transferlist__btn" style={{ '--dui-tl-accent': accent } as CSSProperties} onClick={moveAllLeft} disabled={!rightItems.length} aria-label="Move all left">
          <ChevronLeftIcon size={12} /><ChevronLeftIcon size={12} style={{ marginLeft: -6 }} />
        </button>
      </div>
      <div style={{ height, borderRadius: base.borderRadius, border: '1px solid var(--color-surface-border)', overflow: 'hidden', flex: 1 }}>
        <Panel title={rightTitle} items={rightItems} checked={rightChecked} onToggle={v => toggle(rightChecked, setRightChecked, v)} fontSize={base.fontSize} />
      </div>
    </div>
  );
}
