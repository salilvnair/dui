import { DocSection, PropTable, FeatureGrid, EnumTable, DocNote } from '../../../shared/DocComponents';

export function StatsCardViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Label + value + unit layout', color: 'var(--color-primary)' },
          { label: 'Trend indicator (up ↑ / down ↓ / neutral →)', color: 'var(--color-success)' },
          { label: 'Sub-value secondary text', color: 'var(--color-info)' },
          { label: 'Optional icon in header', color: 'var(--color-warning)' },
          { label: 'Custom accent color tints the card border and bg', color: '#a855f7' },
          { label: 'Compact mode (reduced size + padding)', color: '#ec4899' },
          { label: 'Theme tokens for bg, border, trend colors', color: '#14b8a6' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'label', type: 'string', required: true, description: 'Uppercase label shown at the top of the card (e.g. "REQUESTS", "LATENCY").' },
          { name: 'value', type: 'string | number', required: true, description: 'Primary metric value shown prominently.' },
          { name: 'subValue', type: 'string', description: 'Secondary smaller text shown below the value row.' },
          { name: 'icon', type: 'ReactNode', description: 'Icon rendered in the top-right of the card at 70% opacity in the accent color.' },
          { name: 'unit', type: 'string', description: 'Unit label shown beside the value in muted smaller text (e.g. "ms", "req/s").' },
          { name: 'trend', type: 'StatsTrend', description: "Trend direction. 'up' = green ↑. 'down' = red ↓. 'neutral' = muted →." },
          { name: 'trendValue', type: 'string', description: 'Trend magnitude text shown beside the trend arrow (e.g. "+12%"). Only rendered when trend is also set.' },
          { name: 'accentColor', type: 'string', description: 'Overrides the value color and tints the card border and background. Defaults to var(--color-primary).' },
          { name: 'compact', type: 'boolean', default: 'false', description: 'Reduces padding (10px vs 14px) and value font size (18px vs 22px) for dense dashboards.' },
          { name: 'className', type: 'string', description: 'Additional class names for the card div.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline styles for the card div.' },
        ]} />
      </DocSection>

      <DocSection title="StatsTrend enum">
        <EnumTable name="StatsTrend" values={[
          { value: 'up', description: '↑ arrow — var(--color-statscard-trend-up) (green)', color: 'var(--color-success)' },
          { value: 'down', description: '↓ arrow — var(--color-statscard-trend-down) (red)', color: 'var(--color-error)' },
          { value: 'neutral', description: '→ arrow — var(--color-text-muted)', color: 'var(--color-text-muted)' },
        ]} />
      </DocSection>

      <DocNote type="info">
        When accentColor is set, the card renders with a tinted border (20% opacity) and a tinted background (8% mix into surface). When no accentColor is set, theme tokens var(--color-statscard-bg) and var(--color-statscard-border) are used instead.
      </DocNote>

      <DocNote type="tip">
        Combine trend and trendValue for change indicators: trend="up" trendValue="+5%" renders a green "↑ +5%" line below the value. trendValue is only displayed when trend is also provided.
      </DocNote>
    </div>
  );
}
