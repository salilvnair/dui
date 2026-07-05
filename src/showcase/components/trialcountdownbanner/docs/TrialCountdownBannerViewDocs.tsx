import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference } from '../../../shared/DocComponents';

export function TrialCountdownBannerViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Days-left copy with pluralization', color: 'var(--color-primary)' },
          { label: 'Auto urgent styling at ≤3 days', color: 'var(--color-error)' },
          { label: 'Upgrade CTA button', color: 'var(--color-success)' },
          { label: '"Ends today" special-case copy', color: 'var(--color-warning)' },
          { label: 'Custom accent color', color: '#a855f7' },
          { label: 'DuiSize scaling', color: '#14b8a6' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'daysLeft', type: 'number', required: true, description: 'Days remaining in the trial. 0 shows "Your trial ends today"; otherwise "N day(s) left in your trial".' },
          { name: 'onUpgrade', type: '() => void', required: true, description: 'Called when the Upgrade now button is clicked.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls padding and font size via the DUI layout base.' },
          { name: 'color', type: 'string', default: 'var(--color-primary)', description: 'Accent color for the background tint and Upgrade button when not urgent. Ignored once daysLeft ≤ 3, where error styling takes over.' },
          { name: 'className', type: 'string', description: 'Additional class names on the outer strip.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the outer strip.' },
        ]} />
      </DocSection>

      <DocNote type="tip">
        The "urgent" error styling (daysLeft ≤ 3) automatically overrides the color prop — you can't force a non-urgent color scheme in the final days of a trial, which is by design to keep the upgrade nudge visually consistent.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="TrialCountdownBannerView reads its dimensions from the shared layout category base hook (useLayoutBase). Omitting size, width, borderRadius, or color on TrialCountdownBannerView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every layout-category component at once."
      >
        <FeatureGrid features={[
          { label: 'useLayoutBase', color: 'var(--color-primary)' },
          { label: 'Falls back to DuiProvider context', color: 'var(--color-success)' },
          { label: 'size / width / borderRadius / color', color: 'var(--color-info)' },
        ]} />
        <SizeReference sizes={[
          { size: 'xxs', height: '—', font: '8px', desc: 'pad 32px' },
          { size: 'xs', height: '—', font: '9px', desc: 'pad 32px' },
          { size: 'sm', height: '—', font: '10px', desc: 'pad 12px' },
          { size: 'md', height: '—', font: '11px', desc: 'pad 16px' },
          { size: 'lg', height: '—', font: '12px', desc: 'pad 24px' },
          { size: 'xl', height: '—', font: '13px', desc: 'pad 32px' },
          { size: 'xxl', height: '—', font: '14px', desc: 'pad 32px' },
          { size: 'xxxl', height: '—', font: '16px', desc: 'pad 32px' },
        ]} />
        <DocNote type="info">
          These values come from the Layout category tokens in <code>DuiTokens.ts</code>. Set a local <code>size</code> prop to override the provider default for this instance only, or change <code>{'<DuiProvider size="...">'}</code> to restyle every layout-category component in the tree.
        </DocNote>
      </DocSection>
      </div>
  );
}
