import { useState } from 'react';
import { SignaturePadView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function SignaturePadViewExamples() {
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const [agreementSigned, setAgreementSigned] = useState<string | null>(null);

  return (
    <div>
      <ExampleCard
        title="Default Pad"
        description="Draw with mouse, touch, or pen — onChange fires a PNG data URL on pointer up"
        code={`function Preview() {
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  return <SignaturePadView onChange={setDataUrl} height={160} />;
}`}
      >
        <SignaturePadView onChange={setDataUrl} height={160} />
        <div style={{ marginTop: 8, fontSize: 11, color: 'var(--color-text-muted)' }}>
          Captured: {dataUrl ? 'yes (PNG data URL stored)' : 'empty'}
        </div>
      </ExampleCard>

      <ExampleCard
        title="Custom Stroke Color"
        description="Theme the pen stroke to match a brand or a dark-canvas signature panel"
        code={`<SignaturePadView strokeColor="var(--color-primary)" height={140} />`}
      >
        <SignaturePadView strokeColor="var(--color-primary)" height={140} />
      </ExampleCard>

      <ExampleCard
        title="Compact Height"
        description="Shrink the canvas for embedding inside a modal footer or inline form field"
        code={`<SignaturePadView height={90} />`}
      >
        <SignaturePadView height={90} />
      </ExampleCard>

      <ExampleCard
        title="Team Access Agreement (domain use case)"
        description="Require a captured signature before enabling a 'Confirm' action, e.g. accepting a workspace API usage policy"
        code={`function Preview() {
  const [signed, setSigned] = useState<string | null>(null);
  return (
    <div>
      <SignaturePadView onChange={setSigned} height={130} strokeColor="var(--color-success)" />
      <button disabled={!signed}>Accept API Usage Policy</button>
    </div>
  );
}`}
      >
        <SignaturePadView onChange={setAgreementSigned} height={130} strokeColor="var(--color-success)" />
        <button
          type="button"
          disabled={!agreementSigned}
          style={{
            marginTop: 8, fontSize: 12, padding: '6px 14px', borderRadius: 6, border: 'none',
            background: agreementSigned ? 'var(--color-success)' : 'var(--color-surface-border)',
            color: agreementSigned ? '#fff' : 'var(--color-text-muted)',
            cursor: agreementSigned ? 'pointer' : 'not-allowed',
          }}
        >
          Accept API Usage Policy
        </button>
      </ExampleCard>

      <ExampleCard
        title="Empty State — Clear Action"
        description="The built-in Clear button resets the canvas and calls onChange(null); useful to reset a rejected signature"
        code={`<SignaturePadView onChange={val => console.log(val)} height={110} />
// Clicking "Clear" wipes the canvas and calls onChange(null)`}
      >
        <SignaturePadView onChange={() => {}} height={110} />
      </ExampleCard>
    </div>
  );
}
