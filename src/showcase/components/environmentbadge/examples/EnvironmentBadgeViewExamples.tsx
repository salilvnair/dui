import { EnvironmentBadgeView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function EnvironmentBadgeViewExamples() {
  return (
    <div>
      <ExampleCard
        title="All Three Environments"
        description="dev / staging / prod each have a distinct semantic color"
        code={`<EnvironmentBadgeView env="dev" />
<EnvironmentBadgeView env="staging" />
<EnvironmentBadgeView env="prod" />`}
      >
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <EnvironmentBadgeView env="dev" />
          <EnvironmentBadgeView env="staging" />
          <EnvironmentBadgeView env="prod" />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Live Indicator (production)"
        description="live shows a pulsing dot — typically reserved for the active/prod environment"
        code={`<EnvironmentBadgeView env="prod" live />`}
      >
        <EnvironmentBadgeView env="prod" live />
      </ExampleCard>

      <ExampleCard
        title="Environment Selector Row"
        description="A realistic API-testing use case — the current environment shown next to a request URL bar"
        code={`<div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
  <EnvironmentBadgeView env="staging" />
  <span>https://staging-api.daakia.app/v2/users</span>
</div>`}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--color-text-secondary)', fontFamily: 'ui-monospace, monospace' }}>
          <EnvironmentBadgeView env="staging" />
          <span>https://staging-api.daakia.app/v2/users</span>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Size Variants"
        description="Badge height and font size scale with the DUI size system"
        code={`<EnvironmentBadgeView env="prod" live size="sm" />
<EnvironmentBadgeView env="prod" live size="md" />
<EnvironmentBadgeView env="prod" live size="lg" />`}
      >
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <EnvironmentBadgeView env="prod" live size="sm" />
          <EnvironmentBadgeView env="prod" live size="md" />
          <EnvironmentBadgeView env="prod" live size="lg" />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Dev vs Staging without Live Dot"
        description="live defaults to false — non-prod environments typically omit the pulsing indicator"
        code={`<EnvironmentBadgeView env="dev" />
<EnvironmentBadgeView env="staging" />`}
      >
        <div style={{ display: 'flex', gap: 8 }}>
          <EnvironmentBadgeView env="dev" />
          <EnvironmentBadgeView env="staging" />
        </div>
      </ExampleCard>
    </div>
  );
}
