import { DocSection, PropTable, FeatureGrid, EnumTable, DocNote, SizeReference, VariantRow } from '../../../shared/DocComponents';

export function IconButtonViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Square icon-only button', color: 'var(--color-primary)' },
          { label: 'ghost + filled variants', color: 'var(--color-success)' },
          { label: 'Active state with accent fill', color: 'var(--color-info)' },
          { label: 'Tooltip via title attribute', color: 'var(--color-warning)' },
          { label: 'Custom accent + active colors', color: '#a855f7' },
          { label: 'Rounded or square corners', color: '#ec4899' },
          { label: '5 fixed pixel sizes', color: '#14b8a6' },
          { label: 'DuiProvider color context', color: '#f97316' },
          { label: 'Extends native button attributes', color: 'var(--color-primary)' },
        ]} />
      </DocSection>

      <DocSection title="Variants">
        <VariantRow variants={[
          { label: 'ghost', description: 'Transparent background. Dim icon, brightens on hover. Default variant.', color: 'var(--color-text-muted)' },
          { label: 'filled', description: 'Translucent accent background at rest, solid on active.', color: 'var(--color-primary)' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'icon', type: 'ReactNode', required: true, description: 'The icon element to render. Use DUI icon components for consistent sizing.' },
          { name: 'size', type: 'IconButtonSize', default: "'default'", description: 'Fixed pixel size for the button square.' },
          { name: 'rounded', type: 'boolean', default: 'true', description: 'true = 4px border-radius. false = 0px square.' },
          { name: 'tooltip', type: 'string', description: 'Native browser tooltip via the title attribute. Shown on hover.' },
          { name: 'variant', type: 'IconButtonVariant', default: "'ghost'", description: 'Visual style. ghost = transparent at rest. filled = tinted background.' },
          { name: 'accentColor', type: 'string', description: 'Override the accent color used for hover highlight and active state.' },
          { name: 'activeColor', type: 'string', description: 'Color used specifically when active=true. Falls back to accentColor.' },
          { name: 'active', type: 'boolean', default: 'false', description: 'Shows the active state — filled tint on ghost variant, solid fill on filled variant.' },
          { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the button and reduces opacity to 45%.' },
          { name: 'borderRadius', type: 'DuiRadius | number', description: 'Override border-radius (takes effect when rounded=true).' },
          { name: 'color', type: 'string', description: 'Icon color override (applies at rest state).' },
          { name: '...rest', type: 'ButtonHTMLAttributes<HTMLButtonElement>', description: 'All native button attributes forwarded to the button element.' },
        ]} />
      </DocSection>

      <DocSection title="IconButtonVariant enum">
        <EnumTable name="IconButtonVariant" values={[
          { value: 'ghost', description: 'No background, subtle muted icon', color: 'var(--color-text-muted)' },
          { value: 'filled', description: 'Translucent accent tinted background', color: 'var(--color-primary)' },
        ]} />
      </DocSection>

      <DocSection title="Sizes (fixed pixel dimensions)">
        <SizeReference sizes={[
          { size: 'default', height: '26px', font: '—', desc: 'Context default' },
          { size: 'sm', height: '22px', font: '—', desc: 'Compact toolbar' },
          { size: 'md', height: '28px', font: '—', desc: 'Standard' },
          { size: 'lg', height: '32px', font: '—', desc: 'Large' },
          { size: 'xl', height: '36px', font: '—', desc: 'XL' },
        ]} />
      </DocSection>

      <DocNote type="info">
        Unlike ButtonView, IconButtonView uses fixed pixel dimensions rather than DuiTokens height values. The five sizes (default, sm, md, lg, xl) map to 26, 22, 28, 32, 36px squares respectively.
      </DocNote>

      <DocNote type="tip">
        Use the active prop for toggle-style icon buttons (e.g. a mute button, a filter toggle). The active state shifts the icon color to accentColor and adds a tinted background so the state is visually obvious.
      </DocNote>
    </div>
  );
}
