import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import type { DuiSize } from '../../core/DuiTypes';
import { useOverlayBase } from '../../core/OverlayBase';
import './SpotlightTourView.css';

export interface SpotlightTourStep {
  /** CSS selector for the element to spotlight. */
  target: string;
  title: string;
  content: string;
}

export interface SpotlightTourViewProps {
  open: boolean;
  steps: SpotlightTourStep[];
  stepIndex: number;
  onNext: () => void;
  onPrev: () => void;
  onClose: () => void;
  size?: DuiSize;
  color?: string;
}

export function SpotlightTourView({
  open,
  steps,
  stepIndex,
  onNext,
  onPrev,
  onClose,
  size,
  color,
}: SpotlightTourViewProps) {
  const base = useOverlayBase(size, { color });
  const accent = color ?? 'var(--color-primary)';
  const [rect, setRect] = useState<DOMRect | null>(null);
  const step = steps[stepIndex];

  useEffect(() => {
    if (!open || !step) return;
    const update = () => {
      const el = document.querySelector(step.target);
      setRect(el ? el.getBoundingClientRect() : null);
    };
    update();
    window.addEventListener('resize', update);
    window.addEventListener('scroll', update, true);
    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('scroll', update, true);
    };
  }, [open, step]);

  if (!open || !step) return null;
  const PAD = 8;

  const tooltipTop = rect ? rect.bottom + 16 : window.innerHeight / 2;
  const tooltipLeft = rect ? Math.min(Math.max(16, rect.left), window.innerWidth - 300) : window.innerWidth / 2 - 150;

  return createPortal(
    <div className="dui_spotlight__overlay">
      {rect && (
        <div
          className="dui_spotlight__cutout"
          style={{
            top: rect.top - PAD, left: rect.left - PAD,
            width: rect.width + PAD * 2, height: rect.height + PAD * 2,
            boxShadow: `0 0 0 3px ${accent}, 0 0 0 9999px rgba(0,0,0,0.65)`,
          }}
        />
      )}
      <div className="dui_spotlight__tooltip" style={{ top: tooltipTop, left: tooltipLeft, borderRadius: base.borderRadius }}>
        <div style={{ fontSize: base.headerFontSize, fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 4 }}>{step.title}</div>
        <div style={{ fontSize: base.fontSize, color: 'var(--color-text-secondary)', lineHeight: 1.5, marginBottom: 12 }}>{step.content}</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: 4 }}>
            {steps.map((_, i) => (
              <span key={i} className="dui_spotlight__dot" style={{ background: i === stepIndex ? accent : 'var(--color-surface-border)' }} />
            ))}
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            <button type="button" onClick={onClose} className="dui_spotlight__btn dui_spotlight__btn--ghost">Skip</button>
            {stepIndex > 0 && <button type="button" onClick={onPrev} className="dui_spotlight__btn dui_spotlight__btn--ghost">Back</button>}
            <button type="button" onClick={stepIndex === steps.length - 1 ? onClose : onNext} className="dui_spotlight__btn" style={{ background: accent }}>
              {stepIndex === steps.length - 1 ? 'Done' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
