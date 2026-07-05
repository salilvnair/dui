import { useState, type CSSProperties } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { useLayoutBase } from '../../core/LayoutBase';
import { CheckIcon, ChevronDownIcon } from '../../../icons';

export interface OnboardingStep {
  id: string;
  label: string;
  done: boolean;
  onClick?: () => void;
}

export interface OnboardingChecklistViewProps {
  title?: string;
  steps: OnboardingStep[];
  defaultExpanded?: boolean;
  size?: DuiSize;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

/** Collapsible "getting started" progress checklist. */
export function OnboardingChecklistView({
  title = 'Getting started',
  steps,
  defaultExpanded = true,
  size,
  color,
  className = '',
  style,
}: OnboardingChecklistViewProps) {
  const base = useLayoutBase(size, { color });
  const accent = color ?? 'var(--color-primary)';
  const [expanded, setExpanded] = useState(defaultExpanded);
  const doneCount = steps.filter(s => s.done).length;
  const ratio = steps.length > 0 ? doneCount / steps.length : 0;

  return (
    <div className={className} style={{ border: '1px solid var(--color-surface-border)', borderRadius: base.borderRadius, overflow: 'hidden', ...style }}>
      <button
        type="button"
        onClick={() => setExpanded(e => !e)}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: `10px ${base.padding}`, border: 'none', background: 'transparent', cursor: 'pointer' }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 4, flex: 1 }}>
          <span style={{ fontSize: base.fontSize, fontWeight: 700, color: 'var(--color-text-primary)' }}>{title} ({doneCount}/{steps.length})</span>
          <div style={{ width: '100%', height: 4, borderRadius: 2, background: 'var(--color-surface-border)', overflow: 'hidden' }}>
            <div style={{ width: `${ratio * 100}%`, height: '100%', background: accent, transition: 'width 300ms ease-out' }} />
          </div>
        </div>
        <ChevronDownIcon size={12} style={{ marginLeft: 8, transition: 'transform 140ms', transform: expanded ? 'rotate(180deg)' : 'none', color: 'var(--color-text-muted)' }} />
      </button>
      {expanded && (
        <div style={{ borderTop: '1px solid var(--color-surface-border)' }}>
          {steps.map(step => (
            <button
              key={step.id}
              type="button"
              onClick={step.onClick}
              style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%', textAlign: 'left', padding: `8px ${base.padding}`, border: 'none', background: 'transparent', cursor: step.onClick ? 'pointer' : 'default' }}
            >
              <span style={{ width: 16, height: 16, borderRadius: '999px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: step.done ? accent : 'transparent', border: step.done ? 'none' : '1.5px solid var(--color-surface-border)' }}>
                {step.done && <CheckIcon size={10} style={{ color: '#fff' }} />}
              </span>
              <span style={{ fontSize: base.fontSize, color: step.done ? 'var(--color-text-muted)' : 'var(--color-text-primary)', textDecoration: step.done ? 'line-through' : 'none' }}>{step.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
