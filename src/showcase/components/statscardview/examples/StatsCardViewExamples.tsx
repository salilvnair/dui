import { StatsCardView } from '@/dui';
import { ClockIcon, DownloadIcon, CheckCircleIcon, RefreshIcon } from '@/icons/daakia-icons';
import { ExampleCard } from '../../../shared/ExampleCard';

// ─── Individual card demos ────────────────────────────────────────────────────
function ResponseTimeCardDemo() {
  return (
    <StatsCardView
      label="Response Time"
      value={142}
      unit="ms"
      icon={<ClockIcon size={13} />}
      trend="down"
      trendValue="−18ms vs prev"
      subValue="avg over last 5 runs"
      accentColor="var(--color-success)"
    />
  );
}

function RequestSizeCardDemo() {
  return (
    <StatsCardView
      label="Request Size"
      value="1.2"
      unit="KB"
      icon={<DownloadIcon size={13} />}
      trend="neutral"
      trendValue="unchanged"
      accentColor="var(--color-protocol-rest)"
    />
  );
}

function StatusCodeCardDemo() {
  return (
    <StatsCardView
      label="Status Code"
      value={200}
      icon={<CheckCircleIcon size={13} />}
      trend="neutral"
      trendValue="OK"
      subValue="200 OK — Success"
      accentColor="var(--color-success)"
    />
  );
}

function ErrorRateCardDemo() {
  return (
    <StatsCardView
      label="Error Rate"
      value="12"
      unit="%"
      icon={<RefreshIcon size={13} />}
      trend="up"
      trendValue="+4% since last run"
      subValue="3 of 25 requests failed"
      accentColor="var(--color-error)"
    />
  );
}

// ─── Row of 4 stats cards ─────────────────────────────────────────────────────
function StatsRowDemo() {
  return (
    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
      <StatsCardView
        label="Time"
        value={142}
        unit="ms"
        trend="down"
        trendValue="−18ms"
        accentColor="var(--color-success)"
        compact
      />
      <StatsCardView
        label="Size"
        value="1.2"
        unit="KB"
        trend="neutral"
        trendValue="stable"
        accentColor="var(--color-protocol-rest)"
        compact
      />
      <StatsCardView
        label="Status"
        value={200}
        trend="neutral"
        trendValue="OK"
        accentColor="var(--color-success)"
        compact
      />
      <StatsCardView
        label="Cache"
        value="HIT"
        trend="down"
        trendValue="from cache"
        accentColor="var(--color-info)"
        compact
      />
    </div>
  );
}

// ─── Compact vs full size comparison ─────────────────────────────────────────
function CompactComparisonDemo() {
  return (
    <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', flexWrap: 'wrap' }}>
      <div>
        <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-text-muted)', marginBottom: 8 }}>
          compact=false (default)
        </div>
        <StatsCardView
          label="Response Time"
          value={142}
          unit="ms"
          trend="down"
          trendValue="−18ms"
          accentColor="var(--color-protocol-graphql)"
        />
      </div>
      <div>
        <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-text-muted)', marginBottom: 8 }}>
          compact=true
        </div>
        <StatsCardView
          label="Response Time"
          value={142}
          unit="ms"
          trend="down"
          trendValue="−18ms"
          accentColor="var(--color-protocol-graphql)"
          compact
        />
      </div>
    </div>
  );
}

// ─── Export ───────────────────────────────────────────────────────────────────
export function StatsCardViewExamples() {
  return (
    <div>
      <ExampleCard
        title="Response Time Card"
        description="Down trend = good (green) · shows sub-value and trend delta"
        code={`<StatsCardView
  label="Response Time" value={142} unit="ms"
  icon={<ClockIcon size={13} />}
  trend="down" trendValue="−18ms vs prev"
  accentColor="var(--color-success)"
/>`}
      >
        <ResponseTimeCardDemo />
      </ExampleCard>

      <ExampleCard
        title="Request Size Card"
        description="Neutral trend — value unchanged between runs"
        code={`<StatsCardView label="Request Size" value="1.2" unit="KB"
  trend="neutral" trendValue="unchanged"
  accentColor="var(--color-protocol-rest)" />`}
      >
        <RequestSizeCardDemo />
      </ExampleCard>

      <ExampleCard
        title="Status Code Card"
        description="200 OK with success green accent and neutral trend indicator"
        code={`<StatsCardView label="Status Code" value={200}
  trend="neutral" trendValue="OK"
  accentColor="var(--color-success)" />`}
      >
        <StatusCodeCardDemo />
      </ExampleCard>

      <ExampleCard
        title="Error Rate Card"
        description="Up trend = bad (red) · highlights failure count in subValue"
        code={`<StatsCardView label="Error Rate" value="12" unit="%"
  trend="up" trendValue="+4% since last run"
  subValue="3 of 25 requests failed"
  accentColor="var(--color-error)" />`}
      >
        <ErrorRateCardDemo />
      </ExampleCard>

      <ExampleCard
        title="Row of 4 Stats Cards — compact"
        description="Time · Size · Status · Cache — all compact=true for dashboard layout"
        code={`<div style={{ display: 'flex', gap: 10 }}>
  <StatsCardView label="Time"   value={142} unit="ms" compact ... />
  <StatsCardView label="Size"   value="1.2" unit="KB" compact ... />
  <StatsCardView label="Status" value={200}            compact ... />
  <StatsCardView label="Cache"  value="HIT"            compact ... />
</div>`}
      >
        <StatsRowDemo />
      </ExampleCard>

      <ExampleCard
        title="compact vs full Size Comparison"
        description="Same card data — compact reduces padding and value font size"
        code={`<StatsCardView value={142} unit="ms" ... />
<StatsCardView value={142} unit="ms" ... compact />`}
      >
        <CompactComparisonDemo />
      </ExampleCard>
    </div>
  );
}
