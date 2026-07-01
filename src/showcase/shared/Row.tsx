import { useState } from 'react';
import { CodeBlockView } from '@/dui';

interface RowProps {
  label: string;
  children: React.ReactNode;
  code?: string;
  noPad?: boolean;
  gap?: number;
  align?: string;
}

export function Row({ label, children, code, noPad, gap = 10, align }: RowProps) {
  const [showCode, setShowCode] = useState(false);
  return (
    <div style={{
      marginBottom: 16,
      border: '1px solid var(--color-surface-border)',
      borderRadius: 10,
      background: 'var(--color-surface)',
      overflow: 'hidden',
    }}>
      <div style={{
        padding: '10px 16px 8px',
        fontSize: '10px', fontWeight: 700, color: 'var(--color-text-muted)',
        textTransform: 'uppercase', letterSpacing: '0.08em',
        borderBottom: '1px solid color-mix(in srgb, var(--color-surface-border) 60%, transparent)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <span>{label}</span>
        {code && (
          <button
            type="button"
            onClick={() => setShowCode(v => !v)}
            style={{
              fontSize: 10, fontWeight: 600, cursor: 'pointer',
              color: 'var(--color-text-muted)', background: 'transparent', border: 'none',
              display: 'flex', alignItems: 'center', gap: 5, fontFamily: 'inherit',
              textTransform: 'none', letterSpacing: 0,
            }}
          >
            {showCode ? 'Hide code' : 'Show code'}
          </button>
        )}
      </div>
      {showCode && code && (
        <CodeBlockView
          language="tsx"
          code={code}
          showCopyButton
          style={{ borderRadius: 0, borderTop: '1px solid var(--color-surface-border)' }}
        />
      )}
      <div style={{
        padding: noPad ? 0 : '16px',
        display: 'flex', alignItems: align || 'center', flexWrap: 'wrap', gap,
      }}>
        {children}
      </div>
    </div>
  );
}
