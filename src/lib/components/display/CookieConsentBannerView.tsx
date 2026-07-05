import type { CSSProperties } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { useLayoutBase } from '../../core/LayoutBase';

export interface CookieConsentBannerViewProps {
  open: boolean;
  message?: string;
  onAccept: () => void;
  onCustomize?: () => void;
  size?: DuiSize;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

/** Fixed bottom cookie-consent bar with accept/customize actions. */
export function CookieConsentBannerView({
  open,
  message = 'We use cookies to improve your experience and analyze usage.',
  onAccept,
  onCustomize,
  size,
  color,
  className = '',
  style,
}: CookieConsentBannerViewProps) {
  const base = useLayoutBase(size, { color });
  const accent = color ?? 'var(--color-primary)';

  if (!open) return null;

  return (
    <div
      className={className}
      style={{
        position: 'fixed', bottom: 16, left: 16, right: 16, zIndex: 9000, maxWidth: 640, margin: '0 auto',
        display: 'flex', alignItems: 'center', gap: 12, padding: base.padding,
        background: 'var(--color-elevated, #1f2430)', borderRadius: base.borderRadius,
        boxShadow: '0 12px 40px rgba(0,0,0,.35)', ...style,
      }}
    >
      <span style={{ flex: 1, fontSize: base.fontSize, color: '#fff' }}>{message}</span>
      {onCustomize && (
        <button type="button" onClick={onCustomize} style={{ border: 'none', background: 'transparent', color: 'rgba(255,255,255,0.7)', fontSize: base.fontSize, fontWeight: 700, cursor: 'pointer', flexShrink: 0 }}>
          Customize
        </button>
      )}
      <button type="button" onClick={onAccept} style={{ border: 'none', borderRadius: 6, padding: '6px 14px', background: accent, color: '#fff', fontSize: base.fontSize, fontWeight: 700, cursor: 'pointer', flexShrink: 0 }}>
        Accept
      </button>
    </div>
  );
}
