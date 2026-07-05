import { AspectRatioView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

const IMG = 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&auto=format&fit=crop';

export function AspectRatioViewExamples() {
  return (
    <div>
      <ExampleCard
        title="16:9 Video Thumbnail (default)"
        description="Default ratio — 16/9, common for video/demo thumbnails"
        code={`<AspectRatioView ratio={16 / 9}>
  <img src="..." style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
</AspectRatioView>`}
      >
        <div style={{ maxWidth: 280 }}>
          <AspectRatioView ratio={16 / 9}>
            <img src={IMG} alt="API demo thumbnail" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </AspectRatioView>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Square Avatar / Team Logo Grid"
        description="1:1 ratio keeps team logos uniform regardless of source image dimensions"
        code={`<div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
  {teams.map(t => (
    <AspectRatioView key={t.id} ratio={1} borderRadius="md">
      <img src={t.logo} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    </AspectRatioView>
  ))}
</div>`}
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, maxWidth: 320 }}>
          {['Platform', 'Growth', 'Infra', 'Mobile'].map((t, i) => (
            <AspectRatioView key={t} ratio={1} borderRadius="md">
              <div style={{
                width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: ['var(--color-primary)', 'var(--color-success)', 'var(--color-info)', 'var(--color-warning)'][i],
                color: '#fff', fontSize: 11, fontWeight: 700,
              }}>
                {t[0]}
              </div>
            </AspectRatioView>
          ))}
        </div>
      </ExampleCard>

      <ExampleCard
        title="Border Radius Variants"
        description="borderRadius accepts a DuiRadius token or a raw pixel number"
        code={`<AspectRatioView ratio={1} borderRadius="none">…</AspectRatioView>
<AspectRatioView ratio={1} borderRadius="sm">…</AspectRatioView>
<AspectRatioView ratio={1} borderRadius="lg">…</AspectRatioView>
<AspectRatioView ratio={1} borderRadius="full">…</AspectRatioView>
<AspectRatioView ratio={1} borderRadius={24}>…</AspectRatioView>`}
      >
        <div style={{ display: 'flex', gap: 10 }}>
          {(['none', 'sm', 'lg', 'full'] as const).map(r => (
            <div key={r} style={{ width: 56 }}>
              <AspectRatioView ratio={1} borderRadius={r}>
                <div style={{ width: '100%', height: '100%', background: 'var(--color-primary)' }} />
              </AspectRatioView>
              <div style={{ fontSize: 9, textAlign: 'center', marginTop: 4, color: 'var(--color-text-muted)' }}>{r}</div>
            </div>
          ))}
        </div>
      </ExampleCard>

      <ExampleCard
        title="Webhook Payload Preview Panel"
        description="Wide 21:9 ratio to frame a captured request/response screenshot in a webhook delivery log"
        code={`<AspectRatioView ratio={21 / 9} borderRadius="md">
  <div style={{ padding: 12, fontFamily: 'monospace' }}>{JSON.stringify(payload, null, 2)}</div>
</AspectRatioView>`}
      >
        <AspectRatioView ratio={21 / 9} borderRadius="md">
          <div style={{
            width: '100%', height: '100%', padding: 12, background: '#0d1117', color: '#8ee5a8',
            fontFamily: 'monospace', fontSize: 10, overflow: 'auto',
          }}>
            {'{ "event": "payment.succeeded", "id": "evt_8f2a", "amount": 4200 }'}
          </div>
        </AspectRatioView>
      </ExampleCard>

      <ExampleCard
        title="Missing Image (edge case)"
        description="Container keeps its shape even when the child hasn't loaded — good for skeleton/loading states"
        code={`<AspectRatioView ratio={16 / 9} borderRadius="md">
  <div style={{ background: 'var(--color-surface)', width: '100%', height: '100%' }} />
</AspectRatioView>`}
      >
        <div style={{ maxWidth: 220 }}>
          <AspectRatioView ratio={16 / 9} borderRadius="md">
            <div style={{
              width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'var(--color-surface)', color: 'var(--color-text-muted)', fontSize: 11,
            }}>
              No preview available
            </div>
          </AspectRatioView>
        </div>
      </ExampleCard>
    </div>
  );
}
