import { useState, type ReactNode } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { useButtonBase } from '../../core/ButtonBase';
import { PlusIcon, CloseIcon } from '../../../icons';
import './FabView.css';

export interface FabAction {
  icon: ReactNode;
  label: string;
  onClick: () => void;
}

export interface FabViewProps {
  icon?: ReactNode;
  /** Extended FAB: renders `label` beside the icon. */
  label?: string;
  onClick?: () => void;
  /** Speed-dial mode — renders `actions` in a fanned-out menu on click. */
  actions?: FabAction[];
  position?: 'bottom-right' | 'bottom-left';
  size?: DuiSize;
  color?: string;
  className?: string;
}

export function FabView({
  icon,
  label,
  onClick,
  actions,
  position = 'bottom-right',
  size,
  color,
  className = '',
}: FabViewProps) {
  const base = useButtonBase(size, { color });
  const accent = color ?? base.defaultColor ?? 'var(--color-primary)';
  const [open, setOpen] = useState(false);
  const isSpeedDial = !!actions?.length;
  const h = parseInt(base.height, 10) * 1.5;

  return (
    <div className={`dui_fab dui_fab--${position} ${className}`}>
      {isSpeedDial && open && (
        <div className="dui_fab__actions">
          {actions!.map((a, i) => (
            <button
              key={i}
              type="button"
              className="dui_fab__action"
              style={{ animationDelay: `${i * 30}ms` }}
              onClick={() => { a.onClick(); setOpen(false); }}
            >
              <span className="dui_fab__actionlabel">{a.label}</span>
              <span className="dui_fab__actionicon" style={{ background: accent }}>{a.icon}</span>
            </button>
          ))}
        </div>
      )}
      <button
        type="button"
        className="dui_fab__main"
        style={{
          height: h, minWidth: h, borderRadius: h / 2,
          background: isSpeedDial && open ? 'var(--color-error)' : accent, color: 'var(--color-btn-primary-text, #fff)',
          paddingLeft: label ? 20 : 0, paddingRight: label ? 20 : 0,
        }}
        onClick={() => (isSpeedDial ? setOpen(o => !o) : onClick?.())}
      >
        <span className="dui_fab__icon">
          {isSpeedDial ? (open ? <CloseIcon size={20} /> : (icon ?? <PlusIcon size={20} />)) : (icon ?? <PlusIcon size={20} />)}
        </span>
        {label && <span style={{ fontWeight: 700, fontSize: base.fontSize, marginLeft: 8 }}>{label}</span>}
      </button>
    </div>
  );
}
