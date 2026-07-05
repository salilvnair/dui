import type { CSSProperties, ReactNode } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { useDisplayBase } from '../../core/DisplayBase';
import { CheckCircleIcon, CloseIcon, WarningTriangleIcon, InfoCircleIcon } from '../../../icons';

export type ResultStatus = 'success' | 'error' | '404' | '403' | 'warning' | 'info';

export interface ResultViewProps {
  status: ResultStatus;
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  size?: DuiSize;
  className?: string;
  style?: CSSProperties;
}

const STATUS_CONFIG: Record<ResultStatus, { icon: ReactNode; color: string; code?: string }> = {
  success: { icon: <CheckCircleIcon size={40} />, color: 'var(--color-success)' },
  error: { icon: <CloseIcon size={40} />, color: 'var(--color-error)' },
  warning: { icon: <WarningTriangleIcon size={40} />, color: 'var(--color-warning)' },
  info: { icon: <InfoCircleIcon size={40} />, color: 'var(--color-info)' },
  '404': { icon: null, color: 'var(--color-text-muted)', code: '404' },
  '403': { icon: null, color: 'var(--color-text-muted)', code: '403' },
};

/** Full-page outcome state — success / error / 404 / 403 / warning / info. */
export function ResultView({
  status,
  title,
  subtitle,
  actions,
  size,
  className = '',
  style,
}: ResultViewProps) {
  const base = useDisplayBase(size);
  const cfg = STATUS_CONFIG[status];

  return (
    <div className={className} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: 40, gap: base.gap, ...style }}>
      {cfg.code
        ? <div style={{ fontSize: 56, fontWeight: 800, color: cfg.color, letterSpacing: '-0.03em' }}>{cfg.code}</div>
        : <div style={{ color: cfg.color }}>{cfg.icon}</div>}
      <div style={{ fontSize: `calc(${base.fontSize} * 1.4)`, fontWeight: 700, color: 'var(--color-text-primary)' }}>{title}</div>
      {subtitle && <div style={{ fontSize: base.fontSize, color: 'var(--color-text-muted)', maxWidth: 360 }}>{subtitle}</div>}
      {actions && <div style={{ display: 'flex', gap: base.gap, marginTop: 8 }}>{actions}</div>}
    </div>
  );
}
