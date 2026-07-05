import { useState } from 'react';
import { WatermarkView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function WatermarkViewExamples() {
  const [text, setText] = useState('CONFIDENTIAL');
  const [angle, setAngle] = useState(-22);

  return (
    <div>
      <ExampleCard
        title="Confidential Document Overlay"
        description="Diagonal repeated text stamped over sensitive API response content"
        code={`<WatermarkView text="CONFIDENTIAL">
  <div>Protected content...</div>
</WatermarkView>`}
      >
        <WatermarkView text="CONFIDENTIAL">
          <div style={{
            padding: 16, borderRadius: 8, border: '1px solid var(--color-surface-border)',
            background: 'var(--color-surface)', minHeight: 140,
          }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 6 }}>
              Production API Key
            </div>
            <div style={{ fontSize: 11, color: 'var(--color-text-muted)', fontFamily: 'monospace' }}>
              sk_live_••••••••••••••••••••••••••••••
            </div>
            <div style={{ fontSize: 11, color: 'var(--color-text-muted)', marginTop: 8 }}>
              Do not share this key outside the org. Rotate every 90 days.
            </div>
          </div>
        </WatermarkView>
      </ExampleCard>

      <ExampleCard
        title="Interactive Watermark Builder"
        description="Type your own stamp text and rotate the tiling angle live"
        code={`const [text, setText] = useState('CONFIDENTIAL');
const [angle, setAngle] = useState(-22);

<WatermarkView text={text} angle={angle}>
  <div>Preview area</div>
</WatermarkView>`}
      >
        <div style={{ display: 'flex', gap: 8, marginBottom: 10, flexWrap: 'wrap' }}>
          <input
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Watermark text"
            style={{
              flex: 1, minWidth: 140, height: 30, padding: '0 10px', fontSize: 12,
              border: '1px solid var(--color-input-border)', borderRadius: 6,
              background: 'var(--color-input-bg)', color: 'var(--color-text-primary)',
            }}
          />
          <input
            type="range"
            min={-90}
            max={90}
            value={angle}
            onChange={e => setAngle(Number(e.target.value))}
            style={{ width: 140 }}
          />
          <span style={{ fontSize: 11, color: 'var(--color-text-muted)', alignSelf: 'center' }}>{angle}°</span>
        </div>
        <WatermarkView text={text || ' '} angle={angle}>
          <div style={{
            padding: 16, borderRadius: 8, border: '1px solid var(--color-surface-border)',
            background: 'var(--color-surface)', minHeight: 120,
          }}>
            <div style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>
              Adjust the text and angle above to see the tiling update live.
            </div>
          </div>
        </WatermarkView>
      </ExampleCard>

      <ExampleCard
        title="Color & Opacity Variants"
        description="Watermark tuned per severity — brand tint, warning, and low-contrast draft mark"
        code={`<WatermarkView text="DRAFT" color="var(--color-text-muted)" opacity={0.08} />
<WatermarkView text="INTERNAL USE ONLY" color="var(--color-warning)" opacity={0.18} />
<WatermarkView text="Daakia" color="var(--color-primary)" opacity={0.14} gap={90} />`}
      >
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
          <WatermarkView text="DRAFT" color="var(--color-text-muted)" opacity={0.08}>
            <div style={{ height: 100, borderRadius: 8, border: '1px solid var(--color-surface-border)', background: 'var(--color-surface)' }} />
          </WatermarkView>
          <WatermarkView text="INTERNAL USE ONLY" color="var(--color-warning)" opacity={0.18} fontSize={11}>
            <div style={{ height: 100, borderRadius: 8, border: '1px solid var(--color-surface-border)', background: 'var(--color-surface)' }} />
          </WatermarkView>
          <WatermarkView text="Daakia" color="var(--color-primary)" opacity={0.14} gap={90}>
            <div style={{ height: 100, borderRadius: 8, border: '1px solid var(--color-surface-border)', background: 'var(--color-surface)' }} />
          </WatermarkView>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Environment Banner on Response Viewer"
        description="Stamp the active environment across a response body so testers never mistake prod for staging"
        code={`<WatermarkView text="STAGING ENVIRONMENT" color="var(--color-info)" gap={140} fontSize={13}>
  <ResponsePanel />
</WatermarkView>`}
      >
        <WatermarkView text="STAGING ENVIRONMENT" color="var(--color-info)" gap={140} fontSize={13}>
          <div style={{
            padding: 14, borderRadius: 8, border: '1px solid var(--color-surface-border)',
            background: 'var(--color-surface)', fontFamily: 'monospace', fontSize: 11.5,
            color: 'var(--color-text-secondary)', minHeight: 130, whiteSpace: 'pre-wrap',
          }}>
{`{
  "status": 200,
  "team": "platform-eng",
  "webhook": "https://staging.daakia.io/hooks/8271"
}`}
          </div>
        </WatermarkView>
      </ExampleCard>

      <ExampleCard
        title="Dense Tiling on Empty State"
        description="Small gap and tiny font produce a fine security pattern, even over an empty placeholder"
        code={`<WatermarkView text="NDA" gap={40} fontSize={9} opacity={0.16} color="var(--color-error)">
  <EmptyState />
</WatermarkView>`}
      >
        <WatermarkView text="NDA" gap={40} fontSize={9} opacity={0.16} color="var(--color-error)">
          <div style={{
            height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center',
            borderRadius: 8, border: '1px dashed var(--color-surface-border)',
            color: 'var(--color-text-muted)', fontSize: 12,
          }}>
            No requests recorded yet
          </div>
        </WatermarkView>
      </ExampleCard>
    </div>
  );
}
