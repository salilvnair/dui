import type { CSSProperties, ReactNode } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { useTabBase } from '../../core/TabBase';
import { CheckIcon } from '../../../icons';

export interface WizardStep {
  id: string;
  label: string;
  description?: string;
}

export interface WizardStepperViewProps {
  steps: WizardStep[];
  activeStep: string;
  completedSteps?: string[];
  onStepClick?: (id: string) => void;
  size?: DuiSize;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

/** Multi-step form wizard progress header — numbered step indicator pattern. Distinct from `StepperInputView` (numeric +/-). */
export function WizardStepperView({
  steps,
  activeStep,
  completedSteps = [],
  onStepClick,
  size,
  color,
  className = '',
  style,
}: WizardStepperViewProps) {
  const base = useTabBase(size, { activeColor: color });
  const accent = base.activeColor ?? 'var(--color-primary)';
  const completedSet = new Set(completedSteps);
  const activeIdx = steps.findIndex(s => s.id === activeStep);

  return (
    <div className={className} style={{ display: 'flex', alignItems: 'flex-start', width: '100%', ...style }}>
      {steps.map((step, i) => {
        const isCompleted = completedSet.has(step.id);
        const isActive = step.id === activeStep;
        const isClickable = !!onStepClick && (isCompleted || i <= activeIdx);
        const circle: ReactNode = isCompleted
          ? <CheckIcon size={12} style={{ color: '#fff' }} />
          : <span style={{ fontSize: base.fontSize, fontWeight: 700, color: isActive ? '#fff' : 'var(--color-text-muted)' }}>{i + 1}</span>;

        return (
          <div key={step.id} style={{ display: 'flex', alignItems: 'center', flex: i < steps.length - 1 ? 1 : undefined }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, cursor: isClickable ? 'pointer' : 'default' }} onClick={() => isClickable && onStepClick?.(step.id)}>
              <div
                style={{
                  width: 26, height: 26, borderRadius: '999px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: isCompleted || isActive ? accent : 'var(--color-surface)',
                  border: `1.5px solid ${isCompleted || isActive ? accent : 'var(--color-surface-border)'}`,
                  transition: 'background 140ms, border-color 140ms', flexShrink: 0,
                }}
              >
                {circle}
              </div>
              <div style={{ textAlign: 'center', maxWidth: 90 }}>
                <div style={{ fontSize: base.fontSize, fontWeight: isActive ? 700 : 500, color: isActive ? accent : 'var(--color-text-secondary)' }}>{step.label}</div>
                {step.description && <div style={{ fontSize: base.fontSize, color: 'var(--color-text-muted)' }}>{step.description}</div>}
              </div>
            </div>
            {i < steps.length - 1 && (
              <div style={{ flex: 1, height: 1.5, marginTop: 13, background: isCompleted ? accent : 'var(--color-surface-border)', transition: 'background 140ms' }} />
            )}
          </div>
        );
      })}
    </div>
  );
}
