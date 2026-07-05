import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference } from '../../../shared/DocComponents';

export function StatTrendCardViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Animated count-up value', color: 'var(--color-primary)' },
          { label: 'Embedded sparkline trend', color: 'var(--color-success)' },
          { label: 'Prefix / suffix formatting', color: 'var(--color-info)' },
          { label: 'Decimal precision control', color: 'var(--color-warning)' },
          { label: 'Composes StatisticView + SparklineView', color: '#a855f7' },
          { label: 'DUI card size + color context', color: '#ec4899' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'label', type: 'string', required: true, description: 'Metric name shown above the value.' },
          { name: 'value', type: 'number', required: true, description: 'Current value, animated as a count-up via the underlying StatisticView.' },
          { name: 'trend', type: 'number[]', required: true, description: 'Series of historical values rendered as a sparkline next to the number.' },
          { name: 'prefix', type: 'string', description: 'Text prepended to the formatted value, e.g. "$".' },
          { name: 'suffix', type: 'string', description: 'Text appended to the formatted value, e.g. "%".' },
          { name: 'precision', type: 'number', description: 'Number of decimal places to show.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Card padding, font size, and border radius. Falls back to DuiProvider context when omitted.' },
          { name: 'color', type: 'string', description: 'Accent color forwarded to both the StatisticView value and the sparkline stroke.' },
          { name: 'className', type: 'string', description: 'Additional class names applied to the outer card.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the outer card.' },
        ]} />
      </DocSection>

      <DocNote type="info">
        StatTrendCardView is intentionally distinct from the static StatsCardView — this variant always animates the number on mount/update and always shows a trend line. Use StatsCardView instead for a simpler, non-animated stat display without history.
      </DocNote>

      <DocNote type="tip">
        The trend array's last value is not automatically synced to `value` — keep them consistent yourself (typically trend.at(-1) === value) so the sparkline visually ends where the headline number lands.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="StatTrendCardView reads its dimensions from the shared card category base hook (useCardBase). Omitting size, borderRadius, or color on StatTrendCardView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every card-category component at once."
      >
        <FeatureGrid features={[
          { label: 'useCardBase', color: 'var(--color-primary)' },
          { label: 'Falls back to DuiProvider context', color: 'var(--color-success)' },
          { label: 'size / borderRadius / color', color: 'var(--color-info)' },
        ]} />
        <SizeReference sizes={[
          { size: 'xxs', height: '28px', font: '8px', desc: 'pad 10px 16px' },
          { size: 'xs', height: '36px', font: '9px', desc: 'pad 10px 16px' },
          { size: 'sm', height: '48px', font: '10px', desc: 'pad 4px 8px' },
          { size: 'md', height: '64px', font: '11px', desc: 'pad 6px 10px' },
          { size: 'lg', height: '80px', font: '12px', desc: 'pad 8px 12px' },
          { size: 'xl', height: '96px', font: '13px', desc: 'pad 10px 16px' },
          { size: 'xxl', height: '112px', font: '14px', desc: 'pad 10px 16px' },
          { size: 'xxxl', height: '128px', font: '16px', desc: 'pad 10px 16px' },
        ]} />
        <DocNote type="info">
          These values come from the Card category tokens in <code>DuiTokens.ts</code>. Set a local <code>size</code> prop to override the provider default for this instance only, or change <code>{'<DuiProvider size="...">'}</code> to restyle every card-category component in the tree.
        </DocNote>
      </DocSection>
      </div>
  );
}
