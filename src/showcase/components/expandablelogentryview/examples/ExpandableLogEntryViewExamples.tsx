import { ExpandableLogEntryView } from '@/dui';
import {
  ArrowUpRightIcon, ArrowDownLeftIcon, CheckIcon,
  WarningTriangleIcon, InfoCircleIcon, CloseCircleIcon,
} from '@/icons/daakia-icons';
import { ExampleCard } from '../../../shared/ExampleCard';

const NOW = Date.now();

export function ExpandableLogEntryViewExamples() {
  return (
    <div>
      <ExampleCard
        title="Request Sent Entry"
        description="Outbound request log — ArrowUpRight icon, purple method badge"
        code={`<ExpandableLogEntryView
  icon={<ArrowUpRightIcon size={13} />}
  title="POST /api/users"
  badge="POST"
  badgeColor="var(--color-method-post)"
  timestamp={Date.now()}
>
  <pre>{'{ "name": "Alice", "email": "alice@example.com" }'}</pre>
</ExpandableLogEntryView>`}
      >
        <ExpandableLogEntryView
          icon={<ArrowUpRightIcon size={13} />}
          title="POST /api/users"
          badge="POST"
          badgeColor="var(--color-method-post)"
          timestamp={NOW - 3000}
        >
          <pre style={{ margin: 0, fontSize: 11, fontFamily: 'monospace', color: 'var(--color-text-secondary)', padding: '8px 12px' }}>
            {JSON.stringify({ name: 'Alice Nakamura', email: 'alice@example.com', role: 'admin' }, null, 2)}
          </pre>
        </ExpandableLogEntryView>
      </ExampleCard>

      <ExampleCard
        title="Response Received Entry"
        description="Inbound response — ArrowDownLeft icon, green 200 OK badge"
        code={`<ExpandableLogEntryView
  icon={<ArrowDownLeftIcon size={13} />}
  title="200 OK — /api/users"
  badge="200"
  badgeColor="var(--color-success)"
  timestamp={Date.now()}
>
  <pre>{responseBody}</pre>
</ExpandableLogEntryView>`}
      >
        <ExpandableLogEntryView
          icon={<ArrowDownLeftIcon size={13} />}
          title="200 OK — /api/users"
          badge="200"
          badgeColor="var(--color-success)"
          timestamp={NOW - 2800}
          defaultExpanded
        >
          <pre style={{ margin: 0, fontSize: 11, fontFamily: 'monospace', color: 'var(--color-text-secondary)', padding: '8px 12px' }}>
            {JSON.stringify({ id: 42, name: 'Alice Nakamura', createdAt: '2024-01-15T09:30:00Z' }, null, 2)}
          </pre>
        </ExpandableLogEntryView>
      </ExampleCard>

      <ExampleCard
        title="Warning Entry"
        description="Non-critical warning — WarningTriangle icon, yellow badge"
        code={`<ExpandableLogEntryView
  icon={<WarningTriangleIcon size={13} />}
  title="Rate limit approaching (80%)"
  badge="WARN"
  badgeColor="var(--color-warning)"
  timestamp={Date.now()}
>
  <p>429 Too Many Requests will trigger after 20 more requests.</p>
</ExpandableLogEntryView>`}
      >
        <ExpandableLogEntryView
          icon={<WarningTriangleIcon size={13} />}
          title="Rate limit approaching (80%)"
          badge="WARN"
          badgeColor="var(--color-warning)"
          timestamp={NOW - 60000}
        >
          <div style={{ padding: '8px 12px', fontSize: 11, color: 'var(--color-text-secondary)' }}>
            You have used 80 of your 100 requests per minute quota. Slow down or the next request will return 429 Too Many Requests.
          </div>
        </ExpandableLogEntryView>
      </ExampleCard>

      <ExampleCard
        title="Error Entry"
        description="Connection failure — CloseCircle icon, red badge"
        code={`<ExpandableLogEntryView
  icon={<CloseCircleIcon size={13} />}
  title="Connection refused — /api/auth"
  badge="ERR"
  badgeColor="var(--color-error)"
  timestamp={Date.now()}
>
  <pre>ECONNREFUSED 127.0.0.1:3000</pre>
</ExpandableLogEntryView>`}
      >
        <ExpandableLogEntryView
          icon={<CloseCircleIcon size={13} />}
          title="Connection refused — /api/auth"
          badge="ERR"
          badgeColor="var(--color-error)"
          timestamp={NOW - 120000}
          defaultExpanded
        >
          <pre style={{ margin: 0, fontSize: 11, fontFamily: 'monospace', color: 'var(--color-error)', padding: '8px 12px' }}>
            Error: connect ECONNREFUSED 127.0.0.1:3000{'\n'}    at TCPConnectWrap.afterConnect
          </pre>
        </ExpandableLogEntryView>
      </ExampleCard>

      <ExampleCard
        title="Log Feed — Multiple Stacked Entries"
        description="A realistic request/response log feed showing all entry types together"
        code={`entries.map(e => (
  <ExpandableLogEntryView key={e.id} icon={e.icon} title={e.title} badge={e.badge} badgeColor={e.color} timestamp={e.ts}>
    {e.body}
  </ExpandableLogEntryView>
))`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <ExpandableLogEntryView icon={<ArrowUpRightIcon size={13} />}  title="GET /api/collections" badge="GET" badgeColor="var(--color-method-get)"    timestamp={NOW - 5000}>
            <div style={{ padding: '6px 12px', fontSize: 11, color: 'var(--color-text-muted)' }}>No body</div>
          </ExpandableLogEntryView>
          <ExpandableLogEntryView icon={<ArrowDownLeftIcon size={13} />} title="200 OK — /api/collections" badge="200" badgeColor="var(--color-success)" timestamp={NOW - 4800}>
            <pre style={{ margin: 0, padding: '6px 12px', fontSize: 11, fontFamily: 'monospace', color: 'var(--color-text-secondary)' }}>[{'{'}...{'}'}×12]</pre>
          </ExpandableLogEntryView>
          <ExpandableLogEntryView icon={<InfoCircleIcon size={13} />}    title="Cache hit for /api/collections" badge="INFO" badgeColor="var(--color-info)" timestamp={NOW - 4700}>
            <div style={{ padding: '6px 12px', fontSize: 11, color: 'var(--color-text-muted)' }}>Response served from local cache (TTL 30s)</div>
          </ExpandableLogEntryView>
          <ExpandableLogEntryView icon={<ArrowUpRightIcon size={13} />}  title="DELETE /api/collections/7" badge="DELETE" badgeColor="var(--color-method-delete)" timestamp={NOW - 2000}>
            <div style={{ padding: '6px 12px', fontSize: 11, color: 'var(--color-text-muted)' }}>No body</div>
          </ExpandableLogEntryView>
          <ExpandableLogEntryView icon={<CheckIcon size={13} />}         title="204 No Content — /api/collections/7" badge="204" badgeColor="var(--color-success)" timestamp={NOW - 1800}>
            <div style={{ padding: '6px 12px', fontSize: 11, color: 'var(--color-text-muted)' }}>Empty response body</div>
          </ExpandableLogEntryView>
        </div>
      </ExampleCard>
    </div>
  );
}
