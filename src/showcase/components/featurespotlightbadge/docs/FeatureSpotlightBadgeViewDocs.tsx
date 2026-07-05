import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference } from '../../../shared/DocComponents';

export function FeatureSpotlightBadgeViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Pulsing animation', color: 'var(--color-primary)' },
          { label: 'Solid fill badge', color: 'var(--color-success)' },
          { label: 'Custom label text', color: 'var(--color-info)' },
          { label: 'Custom accent color', color: 'var(--color-warning)' },
          { label: 'Uppercase, bold typography', color: '#a855f7' },
          { label: 'DuiSize chip scaling', color: '#14b8a6' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'label', type: 'string', default: '"New"', description: 'Text displayed inside the badge, rendered uppercase.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls badge height, padding, and font size via the DUI chip base.' },
          { name: 'color', type: 'string', default: 'var(--color-primary)', description: 'Fill color of the badge. Text is always white.' },
          { name: 'className', type: 'string', description: 'Additional class names on the outer span.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the outer span.' },
        ]} />
      </DocSection>

      <DocNote type="tip">
        Reach for FeatureSpotlightBadgeView specifically when you want to draw attention with motion (it includes a CSS pulse animation) — for a static, non-animated status tag next to text, ChipView is usually the better fit.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="FeatureSpotlightBadgeView reads its dimensions from the shared chip category base hook (useChipBase). Omitting size, borderRadius, or color on FeatureSpotlightBadgeView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every chip-category component at once."
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
