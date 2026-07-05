import { BackToTopView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

function ScrollBox({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      height: 160, overflowY: 'auto', position: 'relative',
      border: '1px solid var(--color-surface-border)', borderRadius: 8, padding: 12,
    }}>
      {children}
    </div>
  );
}

export function BackToTopViewExamples() {
  return (
    <div>
      <ExampleCard
        title="Default Threshold"
        description="Default usage — button fades in after scrolling 240px down the page"
        code={`<BackToTopView threshold={240} />`}
      >
        <ScrollBox>
          <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', lineHeight: 2 }}>
            {Array.from({ length: 20 }).map((_, i) => <div key={i}>API reference row {i + 1}</div>)}
          </div>
          <BackToTopView threshold={240} />
        </ScrollBox>
        <div style={{ marginTop: 6, fontSize: 10.5, color: 'var(--color-text-muted)' }}>
          Note: threshold is measured against window scroll — scroll the main showcase page, not just this box, to see it appear in a real app.
        </div>
      </ExampleCard>

      <ExampleCard
        title="Long API Reference Page"
        description="Realistic placement — floating scroll-to-top for a long, single-page endpoint reference doc"
        code={`<article>
  {endpoints.map(e => <EndpointSection key={e.id} {...e} />)}
  <BackToTopView threshold={400} />
</article>`}
      >
        <ScrollBox>
          <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', lineHeight: 1.8 }}>
            <strong>GET /v1/orders</strong><br />Returns a paginated list of orders.<br /><br />
            <strong>POST /v1/orders</strong><br />Creates a new order.<br /><br />
            <strong>GET /v1/orders/:id</strong><br />Fetches a single order by id.<br /><br />
            <strong>DELETE /v1/orders/:id</strong><br />Cancels an order.
          </div>
          <BackToTopView threshold={400} />
        </ScrollBox>
      </ExampleCard>

      <ExampleCard
        title="Custom Color"
        description="color overrides the accent — align it with a team or environment theme"
        code={`<BackToTopView threshold={100} color="var(--color-success)" />`}
      >
        <ScrollBox>
          <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', lineHeight: 2 }}>
            {Array.from({ length: 10 }).map((_, i) => <div key={i}>Log entry {i + 1}</div>)}
          </div>
          <BackToTopView threshold={100} color="var(--color-success)" />
        </ScrollBox>
      </ExampleCard>

      <ExampleCard
        title="Size Variants"
        description="size scales the button diameter and icon size (button height x1.15)"
        code={`<BackToTopView threshold={50} size="sm" />
<BackToTopView threshold={50} size="md" />
<BackToTopView threshold={50} size="lg" />`}
      >
        <div style={{ display: 'flex', gap: 24 }}>
          {(['sm', 'md', 'lg'] as const).map(s => (
            <div key={s} style={{ position: 'relative', width: 60, height: 60, border: '1px dashed var(--color-surface-border)', borderRadius: 8, overflow: 'hidden' }}>
              <div style={{ height: 200, overflowY: 'auto', position: 'relative' }}>
                <div style={{ height: 300 }} />
                <div style={{ position: 'absolute', bottom: 4, right: 4, transform: 'scale(0.9)' }}>
                  <BackToTopView threshold={0} size={s} />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 6, fontSize: 10.5, color: 'var(--color-text-muted)' }}>sm / md / lg (left to right)</div>
      </ExampleCard>

      <ExampleCard
        title="Below Threshold (edge case)"
        description="Component renders null until the scroll threshold is exceeded — nothing shows here since the page hasn't scrolled"
        code={`<BackToTopView threshold={999999} />`}
      >
        <div style={{ fontSize: 12, color: 'var(--color-text-muted)', padding: 12 }}>
          (Nothing rendered — threshold set unrealistically high, so the button stays hidden.)
        </div>
        <BackToTopView threshold={999999} />
      </ExampleCard>
    </div>
  );
}
