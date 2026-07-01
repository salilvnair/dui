import { useState, type ReactNode } from 'react';
import { CodeBlockView } from '@/dui';

interface ExampleCardProps {
  title: string;
  description?: string;
  code?: string;
  language?: string;
  children?: ReactNode;
  noPad?: boolean;
}

export function ExampleCard({ title, description, code, language = 'tsx', children, noPad }: ExampleCardProps) {
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
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '7px 14px',
        background: 'color-mix(in srgb, var(--color-surface-border) 30%, transparent)',
        borderBottom: '1px solid var(--color-surface-border)',
      }}>
        <div>
          <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-text-primary)' }}>{title}</span>
          {description && (
            <span style={{ marginLeft: 8, fontSize: 11, color: 'var(--color-text-muted)' }}>{description}</span>
          )}
        </div>
        {code && (
          <button
            type="button"
            onClick={() => setShowCode(v => !v)}
            style={{
              fontSize: 11, color: 'var(--color-primary)',
              border: 'none', cursor: 'pointer', padding: '2px 8px',
              borderRadius: 4,
              background: 'color-mix(in srgb, var(--color-primary) 10%, transparent)',
            }}
          >
            {showCode ? 'Hide code' : 'Show code'}
          </button>
        )}
      </div>
      {showCode && code && (
        <div style={{ borderBottom: children !== undefined ? '1px solid var(--color-surface-border)' : undefined }}>
          <CodeBlockView
            code={code}
            language={language}
            showCopyButton
            maxHeight="400px"
            style={{ border: 'none', borderRadius: 0 }}
          />
        </div>
      )}
      {children !== undefined && (
        <div style={{ padding: noPad ? 0 : '14px 16px' }}>{children}</div>
      )}
    </div>
  );
}

export function ExamplesGrid({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}
