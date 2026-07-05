import { useState } from 'react';
import { QRCodeView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function QRCodeViewExamples() {
  const [url, setUrl] = useState('https://daakia.app');

  return (
    <div>
      <ExampleCard
        title="Default QR Code"
        description="Deterministic module grid with finder-pattern corners"
        code={`<QRCodeView value="https://daakia.app" size={140} />`}
      >
        <QRCodeView value="https://daakia.app" size={140} />
      </ExampleCard>

      <ExampleCard
        title="Custom Colors"
        description="Theme the module color and background independently"
        code={`<QRCodeView value="https://daakia.app/invite/team-42" color="var(--color-primary)" background="#0b0f19" size={120} />`}
      >
        <QRCodeView value="https://daakia.app/invite/team-42" color="var(--color-primary)" background="#0b0f19" size={120} />
      </ExampleCard>

      <ExampleCard
        title="Small Inline Size"
        description="Shrink for embedding next to text, e.g. a mobile app pairing code"
        code={`<QRCodeView value="pair:8F2C-91AA" size={64} />`}
      >
        <QRCodeView value="pair:8F2C-91AA" size={64} />
      </ExampleCard>

      <ExampleCard
        title="Shareable Environment Link (domain use case)"
        description="Type a workspace invite URL and regenerate the code live"
        code={`const [url, setUrl] = useState('https://daakia.app');

<input value={url} onChange={e => setUrl(e.target.value)} />
<QRCodeView value={url} size={130} color="var(--color-info)" />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-start' }}>
          <input
            value={url}
            onChange={e => setUrl(e.target.value)}
            style={{ fontSize: 12, padding: '4px 8px', borderRadius: 6, border: '1px solid var(--color-surface-border)', background: 'var(--color-surface)', color: 'var(--color-text-primary)', width: 220 }}
          />
          <QRCodeView value={url || ' '} size={130} color="var(--color-info)" />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Empty Value (edge case)"
        description="An empty string still renders a grid (seed 0) — always pass a real, non-empty value in production so the code is meaningful"
        code={`<QRCodeView value="" size={90} />`}
      >
        <QRCodeView value="" size={90} />
      </ExampleCard>
    </div>
  );
}
