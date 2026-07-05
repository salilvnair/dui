import { StatusPageRowView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function StatusPageRowViewExamples() {
  return (
    <div>
      <ExampleCard
        title="Basic Status Row"
        description="Service name, status dot, and uptime percentage"
        code={`<StatusPageRowView service="API" status="operational" uptime={99.98} />`}
      >
        <div style={{ border: '1px solid var(--color-surface-border)', borderRadius: 8 }}>
          <StatusPageRowView service="API" status="operational" uptime={99.98} />
        </div>
      </ExampleCard>

      <ExampleCard
        title="All Status Variants"
        description="operational / degraded / outage / maintenance — each with its own color and label"
        code={`<StatusPageRowView service="API Gateway"       status="operational" uptime={99.99} />
<StatusPageRowView service="Webhook Delivery"   status="degraded"    uptime={98.42} />
<StatusPageRowView service="Mock Server Engine" status="outage"      uptime={91.02} />
<StatusPageRowView service="Docs Site"          status="maintenance" uptime={99.50} />`}
      >
        <div style={{ border: '1px solid var(--color-surface-border)', borderRadius: 8 }}>
          <StatusPageRowView service="API Gateway" status="operational" uptime={99.99} />
          <StatusPageRowView service="Webhook Delivery" status="degraded" uptime={98.42} />
          <StatusPageRowView service="Mock Server Engine" status="outage" uptime={91.02} />
          <StatusPageRowView service="Docs Site" status="maintenance" uptime={99.5} />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Size Variants"
        description="sm / md / lg row density for embedding in a sidebar widget vs. a full status page"
        code={`<StatusPageRowView size="sm" service="API" status="operational" uptime={99.98} />
<StatusPageRowView size="lg" service="API" status="operational" uptime={99.98} />`}
      >
        <div style={{ border: '1px solid var(--color-surface-border)', borderRadius: 8 }}>
          <StatusPageRowView size="sm" service="API" status="operational" uptime={99.98} />
          <StatusPageRowView size="lg" service="API" status="operational" uptime={99.98} />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Public Status Page (Daakia Platform)"
        description="A realistic status.daakia.app style list of monitored services"
        code={`const services = [
  { name: 'REST Proxy',       status: 'operational', uptime: 99.99 },
  { name: 'GraphQL Gateway',  status: 'operational', uptime: 99.97 },
  { name: 'WebSocket Relay',  status: 'degraded',     uptime: 97.88 },
  { name: 'Mock Server Farm', status: 'operational', uptime: 99.95 },
  { name: 'Auth Service',     status: 'outage',       uptime: 89.31 },
];

{services.map(s => (
  <StatusPageRowView key={s.name} service={s.name} status={s.status} uptime={s.uptime} />
))}`}
      >
        <div style={{ border: '1px solid var(--color-surface-border)', borderRadius: 8 }}>
          <StatusPageRowView service="REST Proxy" status="operational" uptime={99.99} />
          <StatusPageRowView service="GraphQL Gateway" status="operational" uptime={99.97} />
          <StatusPageRowView service="WebSocket Relay" status="degraded" uptime={97.88} />
          <StatusPageRowView service="Mock Server Farm" status="operational" uptime={99.95} />
          <StatusPageRowView service="Auth Service" status="outage" uptime={89.31} />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Edge Case — Low Uptime Formatting"
        description="uptime is always formatted to 2 decimal places, even for whole numbers or very low values"
        code={`<StatusPageRowView service="Legacy Batch Importer" status="outage" uptime={12} />`}
      >
        <div style={{ border: '1px solid var(--color-surface-border)', borderRadius: 8 }}>
          <StatusPageRowView service="Legacy Batch Importer" status="outage" uptime={12} />
        </div>
      </ExampleCard>
    </div>
  );
}
