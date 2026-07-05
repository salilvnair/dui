import { ScrollAreaView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function ScrollAreaViewExamples() {
  return (
    <div>
      <ExampleCard
        title="Vertical Scroll List (default)"
        description="Default usage — accent-tinted vertical scrollbar with a maxHeight"
        code={`<ScrollAreaView maxHeight={140}>
  <div>Row 1</div>
  <div>Row 2</div>
</ScrollAreaView>`}
      >
        <ScrollAreaView maxHeight={140}>
          <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', lineHeight: 2.2, padding: '0 4px' }}>
            {Array.from({ length: 14 }).map((_, i) => <div key={i}>Row {i + 1}</div>)}
          </div>
        </ScrollAreaView>
      </ExampleCard>

      <ExampleCard
        title="Request History Log"
        description="Scrollable list of recent API calls in a request panel sidebar"
        code={`<ScrollAreaView maxHeight={180} color="var(--color-info)">
  {history.map(h => <HistoryRow key={h.id} {...h} />)}
</ScrollAreaView>`}
      >
        <ScrollAreaView maxHeight={180} color="var(--color-info)">
          <div style={{ fontSize: 11, lineHeight: 2, padding: '0 4px' }}>
            {[
              { m: 'GET', p: '/v1/users/42', s: 200 },
              { m: 'POST', p: '/v1/auth/login', s: 200 },
              { m: 'GET', p: '/v1/orders', s: 200 },
              { m: 'DELETE', p: '/v1/sessions/9', s: 204 },
              { m: 'POST', p: '/v1/webhooks', s: 500 },
              { m: 'GET', p: '/v1/orders/1001', s: 404 },
              { m: 'PATCH', p: '/v1/users/42', s: 200 },
              { m: 'GET', p: '/v1/teams', s: 200 },
            ].map((r, i) => (
              <div key={i} style={{ display: 'flex', gap: 8 }}>
                <span style={{ color: 'var(--color-primary)', fontWeight: 600, width: 44 }}>{r.m}</span>
                <span style={{ color: 'var(--color-text-secondary)', flex: 1 }}>{r.p}</span>
                <span style={{ color: r.s < 400 ? 'var(--color-success)' : 'var(--color-error)' }}>{r.s}</span>
              </div>
            ))}
          </div>
        </ScrollAreaView>
      </ExampleCard>

      <ExampleCard
        title="Direction Variants"
        description="direction controls whether vertical, horizontal, or both scrollbars are enabled"
        code={`<ScrollAreaView direction="horizontal" maxHeight={60}>
  <div style={{ display: 'flex', gap: 8, width: 600 }}>...</div>
</ScrollAreaView>`}
      >
        <ScrollAreaView direction="horizontal" maxHeight={60}>
          <div style={{ display: 'flex', gap: 8, width: 700 }}>
            {['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'].map(m => (
              <div key={m} style={{
                flexShrink: 0, padding: '6px 14px', borderRadius: 6, fontSize: 11,
                background: 'var(--color-surface)', border: '1px solid var(--color-surface-border)',
              }}>
                {m}
              </div>
            ))}
          </div>
        </ScrollAreaView>
      </ExampleCard>

      <ExampleCard
        title="Environment Variables Table (both directions)"
        description="A wide table that scrolls both ways inside a fixed-height panel"
        code={`<ScrollAreaView direction="both" maxHeight={140} color="var(--color-warning)">
  <table style={{ minWidth: 500 }}>...</table>
</ScrollAreaView>`}
      >
        <ScrollAreaView direction="both" maxHeight={140} color="var(--color-warning)">
          <table style={{ minWidth: 520, fontSize: 11, borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['Key', 'Value', 'Scope', 'Type', 'Locked'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '4px 10px', color: 'var(--color-text-muted)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody style={{ color: 'var(--color-text-secondary)' }}>
              {[
                ['API_BASE_URL', 'https://staging.api.daakia.dev', 'Environment', 'string', 'no'],
                ['AUTH_TOKEN', '••••••••', 'Environment', 'secret', 'yes'],
                ['TIMEOUT_MS', '8000', 'Global', 'number', 'no'],
              ].map((row, i) => (
                <tr key={i}>
                  {row.map((c, j) => <td key={j} style={{ padding: '4px 10px' }}>{c}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </ScrollAreaView>
      </ExampleCard>

      <ExampleCard
        title="Empty Content (edge case)"
        description="No overflow — scrollbar styling has no effect when content fits"
        code={`<ScrollAreaView maxHeight={80}>
  <div>No response body</div>
</ScrollAreaView>`}
      >
        <ScrollAreaView maxHeight={80}>
          <div style={{ fontSize: 12, color: 'var(--color-text-muted)', padding: 8 }}>
            No response body
          </div>
        </ScrollAreaView>
      </ExampleCard>
    </div>
  );
}
