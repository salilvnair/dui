import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference } from '../../../shared/DocComponents';

export function StatisticViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Animated count-up on mount/change', color: 'var(--color-primary)' },
          { label: 'Ease-out cubic easing', color: 'var(--color-success)' },
          { label: 'Configurable duration', color: 'var(--color-info)' },
          { label: 'Prefix / suffix text', color: 'var(--color-warning)' },
          { label: 'Decimal precision control', color: '#a855f7' },
          { label: 'Custom accent color', color: '#ec4899' },
          { label: 'DuiProvider size context', color: '#14b8a6' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'label', type: 'string', required: true, description: 'Small muted label above the number, describing what is being measured.' },
          { name: 'value', type: 'number', required: true, description: 'The numeric value to display. Changing it re-triggers the count-up animation from the previous displayed value.' },
          { name: 'prefix', type: 'string', description: 'Text prepended to the value, e.g. "$" for currency.' },
          { name: 'suffix', type: 'string', description: 'Text appended to the value, e.g. "%" or " ms".' },
          { name: 'precision', type: 'number', default: '0', description: 'Number of decimal places shown via toFixed.' },
          { name: 'animate', type: 'boolean', default: 'true', description: 'When true, animates from the previous value to the new value using requestAnimationFrame. When false, value is applied immediately.' },
          { name: 'duration', type: 'number', default: '800', description: 'Animation duration in milliseconds.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls the base font size — the value renders at 2x this size. Falls back to DuiProvider context.' },
          { name: 'color', type: 'string', description: 'Overrides the value text color. Defaults to var(--color-text-primary) when omitted.' },
          { name: 'className', type: 'string', description: 'Additional class names on the outer container.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the outer flex container.' },
        ]} />
      </DocSection>

      <DocNote type="info">
        The count-up animation uses requestAnimationFrame internally and is cancelled and restarted whenever value changes, so rapid successive updates always animate smoothly toward the latest value rather than queuing.
      </DocNote>

      <DocNote type="tip">
        Set animate={'{false}'} for values that update very frequently (e.g. a live request counter ticking every few hundred milliseconds) to avoid animation churn — reserve the count-up effect for values that change occasionally, like dashboard summaries on load.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="StatisticView reads its dimensions from the shared display category base hook (useDisplayBase). Omitting size, borderRadius, or color on StatisticView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every display-category component at once."
      >
        <FeatureGrid features={[
          { label: 'useDisplayBase', color: 'var(--color-primary)' },
          { label: 'Falls back to DuiProvider context', color: 'var(--color-success)' },
          { label: 'size / borderRadius / color', color: 'var(--color-info)' },
        ]} />
        <SizeReference sizes={[
          { size: 'xxs', height: '—', font: '8px', desc: 'icon 8px' },
          { size: 'xs', height: '—', font: '9px', desc: 'icon 10px' },
          { size: 'sm', height: '—', font: '10px', desc: 'icon 11px' },
          { size: 'md', height: '—', font: '11px', desc: 'icon 12px' },
          { size: 'lg', height: '—', font: '12px', desc: 'icon 14px' },
          { size: 'xl', height: '—', font: '13px', desc: 'icon 16px' },
          { size: 'xxl', height: '—', font: '14px', desc: 'icon 18px' },
          { size: 'xxxl', height: '—', font: '16px', desc: 'icon 20px' },
        ]} />
        <DocNote type="info">
          These values come from the Display category tokens in <code>DuiTokens.ts</code>. Set a local <code>size</code> prop to override the provider default for this instance only, or change <code>{'<DuiProvider size="...">'}</code> to restyle every display-category component in the tree.
        </DocNote>
      </DocSection>
      </div>
  );
}
