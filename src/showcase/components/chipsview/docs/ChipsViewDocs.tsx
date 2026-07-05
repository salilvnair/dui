import { DocSection, PropTable, FeatureGrid, EnumTable, DocNote, SizeReference } from '../../../shared/DocComponents';

export function ChipsViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: '5 sizes (xs → xl)', color: 'var(--color-primary)' },
          { label: 'Custom color + auto bg derivation', color: 'var(--color-success)' },
          { label: 'Active / filled state', color: 'var(--color-info)' },
          { label: 'Rounded or square border-radius', color: 'var(--color-warning)' },
          { label: 'Click handler', color: '#a855f7' },
          { label: 'Background override (bg prop)', color: '#ec4899' },
          { label: 'DuiProvider size context', color: '#14b8a6' },
          { label: 'xs sub-sm alias for dense badges', color: '#f97316' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'label', type: 'string', required: true, description: 'Text displayed inside the chip.' },
          { name: 'color', type: 'string', default: 'var(--color-primary)', description: 'CSS variable or raw color value. Drives text, border, and auto-derived translucent background.' },
          { name: 'bg', type: 'string', description: 'Override the background explicitly instead of deriving it from color.' },
          { name: 'size', type: 'ChipViewSize', default: 'context', description: 'Size of the chip. Falls back to DuiProvider context when omitted. xs is a sub-sm alias for dense protocol badges.' },
          { name: 'rounded', type: 'boolean', default: 'true', description: 'true = rounded-full (pill shape). false = small token border-radius (4px).' },
          { name: 'active', type: 'boolean', default: 'false', description: 'When true, fills the chip with the accent color instead of a translucent tint. Text shifts to var(--color-chip-active-text).' },
          { name: 'onClick', type: '() => void', description: 'Click handler. When provided, cursor changes to pointer.' },
          { name: 'className', type: 'string', description: 'Additional Tailwind or CSS class names.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the outer span.' },
        ]} />
      </DocSection>

      <DocSection title="ChipViewSize enum">
        <EnumTable name="ChipViewSize" values={[
          { value: 'xs', description: 'Sub-sm fixed preset — 16px height, 9px font. For dense protocol badges.', color: '#f97316' },
          { value: 'sm', description: 'Small chip for tight UIs.', color: 'var(--color-success)' },
          { value: 'md', description: 'Default medium chip.', color: 'var(--color-primary)' },
          { value: 'lg', description: 'Large chip.', color: 'var(--color-info)' },
          { value: 'xl', description: 'Extra-large chip for prominent labels.', color: '#a855f7' },
        ]} />
      </DocSection>

      <DocSection title="Sizes">
        <SizeReference sizes={[
          { size: 'xs', height: '16px', font: '9px', desc: 'Dense badge' },
          { size: 'sm', height: '20px', font: '10px', desc: 'Compact' },
          { size: 'md', height: '24px', font: '11px', desc: 'Default' },
          { size: 'lg', height: '28px', font: '12px', desc: 'Large' },
          { size: 'xl', height: '32px', font: '13px', desc: 'XL label' },
        ]} />
      </DocSection>

      <DocNote type="tip">
        The xs size bypasses the DUI size system — it is a fixed-dimension preset specifically for dense protocol badges (e.g. REST, GQL, WS). For all other usage, prefer sm or md.
      </DocNote>

      <DocNote type="info">
        When color is a CSS variable like var(--color-primary), the background is automatically derived as a 12% translucent mix. You can override the background independently with the bg prop without affecting text or border color.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="ChipView reads its dimensions from the shared chip category base hook (useChipBase). Omitting size, borderRadius, or color on ChipView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every chip-category component at once."
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
