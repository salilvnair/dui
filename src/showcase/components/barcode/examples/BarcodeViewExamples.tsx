import { useState } from 'react';
import { BarcodeView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function BarcodeViewExamples() {
  const [productId, setProductId] = useState('8901234567890');

  return (
    <div>
      <ExampleCard
        title="Default Barcode"
        description="Deterministic bar pattern with the value printed underneath"
        code={`<BarcodeView value="8901234567890" />`}
      >
        <BarcodeView value="8901234567890" />
      </ExampleCard>

      <ExampleCard
        title="Without Value Label"
        description="Hide the printed value text to use purely as a decorative pattern"
        code={`<BarcodeView value="API-KEY-9F3A21" showValue={false} />`}
      >
        <BarcodeView value="API-KEY-9F3A21" showValue={false} />
      </ExampleCard>

      <ExampleCard
        title="Custom Color and Height"
        description="Theme the bars and adjust height for a compact inline badge"
        code={`<BarcodeView value="REQ-2026-0417" color="var(--color-primary)" height={32} />`}
      >
        <BarcodeView value="REQ-2026-0417" color="var(--color-primary)" height={32} />
      </ExampleCard>

      <ExampleCard
        title="API Key / Request ID Badge (domain use case)"
        description="Type an identifier — e.g. a request trace ID — and see the barcode regenerate deterministically"
        code={`const [productId, setProductId] = useState('8901234567890');

<input value={productId} onChange={e => setProductId(e.target.value)} />
<BarcodeView value={productId} color="var(--color-info)" height={44} />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-start' }}>
          <input
            value={productId}
            onChange={e => setProductId(e.target.value)}
            style={{ fontSize: 12, padding: '4px 8px', borderRadius: 6, border: '1px solid var(--color-surface-border)', background: 'var(--color-surface)', color: 'var(--color-text-primary)' }}
          />
          <BarcodeView value={productId || ' '} color="var(--color-info)" height={44} />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Empty / Whitespace Value (edge case)"
        description="An empty string still renders a (short, seed-0) bar pattern rather than crashing — always pass a non-empty identifier in real usage"
        code={`<BarcodeView value="" showValue={false} height={40} />`}
      >
        <BarcodeView value="" showValue={false} height={40} />
      </ExampleCard>
    </div>
  );
}
