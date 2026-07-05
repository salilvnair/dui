import { DocSection, PropTable, FeatureGrid, EnumTable, DocNote, SizeReference } from '../../../shared/DocComponents';

export function LicenseBadgeViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: '3 built-in plan tiers', color: 'var(--color-primary)' },
          { label: 'Gradient fill for paid tiers', color: 'var(--color-success)' },
          { label: 'Outlined neutral style for free tier', color: 'var(--color-info)' },
          { label: 'Uppercase, letter-spaced label', color: 'var(--color-warning)' },
          { label: 'DuiProvider size context', color: '#a855f7' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'tier', type: 'LicenseTier', required: true, description: "Which plan tier to render — controls the label text and color." },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls badge height, padding, and font size. Falls back to DuiProvider context.' },
          { name: 'className', type: 'string', description: 'Additional class names on the badge.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the badge.' },
        ]} />
      </DocSection>

      <DocSection title="LicenseTier enum">
        <EnumTable name="LicenseTier" values={[
          { value: 'free', description: 'Neutral outlined badge with muted text color — no gradient fill.', color: 'var(--color-text-muted)' },
          { value: 'pro', description: 'Primary-colored gradient fill.', color: 'var(--color-primary)' },
          { value: 'enterprise', description: 'Purple gradient fill, reserved for the top tier.', color: '#a855f7' },
        ]} />
      </DocSection>

      <DocNote type="tip">
        There is no color override prop — colors are fixed per tier by design, so a Pro badge always looks the same across the whole app. If you need a custom-colored ribbon, use ChipView or VersionBadgeView instead.
      </DocNote>

      <DocNote type="info">
        Unlike EnvironmentBadgeView (which uses a flat translucent tint), LicenseBadgeView fills paid tiers with a diagonal linear-gradient for a more premium, marketing-oriented look — reserve it for plan/billing UI rather than general status chips.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="LicenseBadgeView reads its dimensions from the shared chip category base hook (useChipBase). Omitting size, borderRadius, or color on LicenseBadgeView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every chip-category component at once."
      >
        <FeatureGrid features={[
          { label: 'useChipBase', color: 'var(--color-primary)' },
          { label: 'Falls back to DuiProvider context', color: 'var(--color-success)' },
          { label: 'size / borderRadius / color', color: 'var(--color-info)' },
        ]} />
        <SizeReference sizes={[
          { size: 'xxs', height: '10px', font: '12px', desc: 'padX 11px, radius full' },
          { size: 'xs', height: '12px', font: '12px', desc: 'padX 11px, radius full' },
          { size: 'sm', height: '16px', font: '9px', desc: 'padX 5px, radius full' },
          { size: 'md', height: '20px', font: '10px', desc: 'padX 7px, radius full' },
          { size: 'lg', height: '24px', font: '11px', desc: 'padX 9px, radius full' },
          { size: 'xl', height: '28px', font: '12px', desc: 'padX 11px, radius full' },
          { size: 'xxl', height: '32px', font: '12px', desc: 'padX 11px, radius full' },
          { size: 'xxxl', height: '38px', font: '12px', desc: 'padX 11px, radius full' },
        ]} />
        <DocNote type="info">
          These values come from the Chip category tokens in <code>DuiTokens.ts</code>. Set a local <code>size</code> prop to override the provider default for this instance only, or change <code>{'<DuiProvider size="...">'}</code> to restyle every chip-category component in the tree.
        </DocNote>
      </DocSection>
      </div>
  );
}
