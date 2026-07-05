import { StickyHeaderView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function StickyHeaderViewExamples() {
  return (
    <div>
      <ExampleCard
        title="Response Headers Panel"
        description="Default usage — scroll the box, the header grows a shadow once pinned"
        code={`<StickyHeaderView>Response Headers</StickyHeaderView>`}
      >
        <div style={{ height: 160, overflowY: 'auto', border: '1px solid var(--color-surface-border)', borderRadius: 8 }}>
          <StickyHeaderView>Response Headers</StickyHeaderView>
          <div style={{ padding: '0 12px', fontSize: 12, color: 'var(--color-text-secondary)', lineHeight: 2 }}>
            {[
              'content-type: application/json',
              'x-request-id: 8f3a-92c1',
              'cache-control: no-store',
              'x-ratelimit-remaining: 42',
              'set-cookie: session=…; HttpOnly',
            ].map(h => <div key={h}>{h}</div>)}
          </div>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Collection Sidebar Group Header"
        description="Multiple sticky headers stacked in a scrollable collection tree"
        code={`<StickyHeaderView>Auth Endpoints</StickyHeaderView>
{authEndpoints.map(e => <Row key={e.id} {...e} />)}
<StickyHeaderView>Webhook Endpoints</StickyHeaderView>
{webhookEndpoints.map(e => <Row key={e.id} {...e} />)}`}
      >
        <div style={{ height: 200, overflowY: 'auto', border: '1px solid var(--color-surface-border)', borderRadius: 8 }}>
          <StickyHeaderView>Auth Endpoints</StickyHeaderView>
          <div style={{ padding: '0 12px', fontSize: 12, color: 'var(--color-text-secondary)', lineHeight: 2 }}>
            <div>POST /v1/auth/login</div>
            <div>POST /v1/auth/refresh</div>
            <div>POST /v1/auth/logout</div>
          </div>
          <StickyHeaderView>Webhook Endpoints</StickyHeaderView>
          <div style={{ padding: '0 12px', fontSize: 12, color: 'var(--color-text-secondary)', lineHeight: 2 }}>
            <div>POST /v1/webhooks</div>
            <div>GET /v1/webhooks/:id</div>
            <div>DELETE /v1/webhooks/:id</div>
          </div>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Size Variants"
        description="sm / md / lg control the header's padding and font size"
        code={`<StickyHeaderView size="sm">Compact</StickyHeaderView>
<StickyHeaderView size="md">Default</StickyHeaderView>
<StickyHeaderView size="lg">Spacious</StickyHeaderView>`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <StickyHeaderView size="sm" style={{ position: 'static' }}>Compact</StickyHeaderView>
          <StickyHeaderView size="md" style={{ position: 'static' }}>Default</StickyHeaderView>
          <StickyHeaderView size="lg" style={{ position: 'static' }}>Spacious</StickyHeaderView>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Offset Below a Fixed Toolbar"
        description="offsetTop keeps the section header pinned just under a taller fixed toolbar"
        code={`<StickyHeaderView offsetTop={36}>Environment Variables</StickyHeaderView>`}
      >
        <div style={{ height: 160, overflowY: 'auto', border: '1px solid var(--color-surface-border)', borderRadius: 8, position: 'relative' }}>
          <div style={{ position: 'sticky', top: 0, zIndex: 20, padding: '6px 12px', fontSize: 10, background: 'var(--color-primary)', color: '#fff' }}>
            Environment: Staging
          </div>
          <StickyHeaderView offsetTop={28}>Environment Variables</StickyHeaderView>
          <div style={{ padding: '0 12px', fontSize: 12, color: 'var(--color-text-secondary)', lineHeight: 2 }}>
            <div>API_BASE_URL = https://staging.api.daakia.dev</div>
            <div>AUTH_TOKEN = ••••••••</div>
            <div>TIMEOUT_MS = 8000</div>
          </div>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Empty Section (edge case)"
        description="Header renders even when there's nothing beneath it yet"
        code={`<StickyHeaderView>Saved Snapshots</StickyHeaderView>
{snapshots.length === 0 && <EmptyState />}`}
      >
        <div style={{ border: '1px solid var(--color-surface-border)', borderRadius: 8, overflow: 'hidden' }}>
          <StickyHeaderView style={{ position: 'static' }}>Saved Snapshots</StickyHeaderView>
          <div style={{ padding: 16, fontSize: 12, color: 'var(--color-text-muted)', textAlign: 'center' }}>
            No snapshots saved yet.
          </div>
        </div>
      </ExampleCard>
    </div>
  );
}
