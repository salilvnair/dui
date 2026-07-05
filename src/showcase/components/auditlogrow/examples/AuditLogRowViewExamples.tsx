import { AuditLogRowView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function AuditLogRowViewExamples() {
  return (
    <div>
      <ExampleCard
        title="Basic Log Row"
        description="A single audit entry — timestamp, actor, action, target"
        code={`<AuditLogRowView timestamp="2026-07-02 09:14" actor="Jordan Lee" action="deleted" target="Users API" />`}
      >
        <div style={{ border: '1px solid var(--color-surface-border)', borderRadius: 8, overflow: 'hidden' }}>
          <AuditLogRowView timestamp="2026-07-02 09:14" actor="Jordan Lee" action="deleted" target="Users API" />
        </div>
      </ExampleCard>

      <ExampleCard
        title="With Actor Avatar"
        description="Pass a rendered avatar node to identify the actor visually"
        code={`<AuditLogRowView
  timestamp="2026-07-02 09:10"
  actor="Priya Sharma"
  actorAvatar={<span style={{ width: 20, height: 20, borderRadius: '999px', background: 'var(--color-info)' }} />}
  action="updated"
  target="Environment: Production"
/>`}
      >
        <div style={{ border: '1px solid var(--color-surface-border)', borderRadius: 8, overflow: 'hidden' }}>
          <AuditLogRowView
            timestamp="2026-07-02 09:10"
            actor="Priya Sharma"
            actorAvatar={<span style={{ width: 20, height: 20, borderRadius: '999px', background: 'var(--color-info)', display: 'inline-block' }} />}
            action="updated"
            target="Environment: Production"
          />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Full Audit Trail List"
        description="A realistic timeline of workspace activity, stacked as rows"
        code={`const events = [
  { ts: '2026-07-02 11:02', actor: 'Jordan Lee', action: 'created', target: 'Collection: Payments v2' },
  { ts: '2026-07-02 10:44', actor: 'Alex Kim',   action: 'invited', target: 'sam@daakia.app' },
  { ts: '2026-07-02 09:55', actor: 'System',     action: 'rotated', target: 'API Key: prod-key-01' },
  { ts: '2026-07-02 09:14', actor: 'Jordan Lee', action: 'deleted', target: 'Users API' },
];

{events.map(e => (
  <AuditLogRowView key={e.ts} timestamp={e.ts} actor={e.actor} action={e.action} target={e.target} />
))}`}
      >
        <div style={{ border: '1px solid var(--color-surface-border)', borderRadius: 8, overflow: 'hidden' }}>
          <AuditLogRowView timestamp="2026-07-02 11:02" actor="Jordan Lee" action="created" target="Collection: Payments v2" />
          <AuditLogRowView timestamp="2026-07-02 10:44" actor="Alex Kim" action="invited" target="sam@daakia.app" />
          <AuditLogRowView timestamp="2026-07-02 09:55" actor="System" action="rotated" target="API Key: prod-key-01" />
          <AuditLogRowView timestamp="2026-07-02 09:14" actor="Jordan Lee" action="deleted" target="Users API" />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Compact Size for Dense Panels"
        description="size='sm' shrinks padding and font for high-density audit panels"
        code={`<AuditLogRowView timestamp="2026-07-02 08:30" actor="Sam Patel" action="disabled" target="Webhook: deploy-notify" size="sm" />`}
      >
        <div style={{ border: '1px solid var(--color-surface-border)', borderRadius: 8, overflow: 'hidden' }}>
          <AuditLogRowView timestamp="2026-07-02 08:30" actor="Sam Patel" action="disabled" target="Webhook: deploy-notify" size="sm" />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Long Target Name (Truncation)"
        description="Target text overflows with ellipsis rather than wrapping or breaking the row height"
        code={`<AuditLogRowView
  timestamp="2026-07-02 07:12"
  actor="Jordan Lee"
  action="renamed"
  target="Very Long Collection Name That Exceeds The Available Row Width In The Audit Trail Panel"
/>`}
      >
        <div style={{ border: '1px solid var(--color-surface-border)', borderRadius: 8, overflow: 'hidden', maxWidth: 420 }}>
          <AuditLogRowView
            timestamp="2026-07-02 07:12"
            actor="Jordan Lee"
            action="renamed"
            target="Very Long Collection Name That Exceeds The Available Row Width In The Audit Trail Panel"
          />
        </div>
      </ExampleCard>
    </div>
  );
}
