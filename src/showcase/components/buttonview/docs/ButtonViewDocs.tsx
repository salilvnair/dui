import { DocSection, PropTable, FeatureGrid, EnumTable, DocNote, SizeReference, VariantRow, WidthReference, RadiusReference } from '../../../shared/DocComponents';

export function ButtonViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: '4 variants', color: 'var(--color-primary)' },
          { label: '8+ sizes via DuiSize', color: 'var(--color-success)' },
          { label: 'Loading spinner state', color: 'var(--color-info)' },
          { label: 'Left + right icon slots', color: 'var(--color-warning)' },
          { label: 'Custom accent color for primary variant', color: '#a855f7' },
          { label: 'label prop alias for children', color: '#ec4899' },
          { label: 'Rounded or square corners', color: '#14b8a6' },
          { label: 'DUI container props (width, borderRadius, color)', color: '#f97316' },
          { label: 'Extends native button HTML attributes', color: 'var(--color-primary)' },
        ]} />
      </DocSection>

      <DocSection title="Variants">
        <VariantRow variants={[
          { label: 'primary', description: 'Filled accent background, white text. Use for the main CTA.', color: 'var(--color-primary)' },
          { label: 'secondary', description: 'Surface background with border. Default variant.', color: 'var(--color-info)' },
          { label: 'ghost', description: 'No background, no visible border. Subtle action.', color: 'var(--color-text-muted)' },
          { label: 'danger', description: 'Red filled background for destructive actions.', color: 'var(--color-error)' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'variant', type: 'ButtonVariant', default: "'secondary'", description: 'Visual style of the button. See variants above.' },
          { name: 'size', type: 'ButtonSize', default: "'default'", description: "'default' resolves to DuiProvider context size. Accepts all DuiSize values." },
          { name: 'rounded', type: 'boolean', default: 'true', description: 'true = token border-radius. false = 0px square.' },
          { name: 'iconLeft', type: 'ReactNode', description: 'Icon rendered to the left of the label. Hidden during loading (replaced by spinner).' },
          { name: 'iconRight', type: 'ReactNode', description: 'Icon rendered to the right of the label. Hidden during loading.' },
          { name: 'loading', type: 'boolean', default: 'false', description: 'When true, replaces iconLeft with a spinner and disables the button. The label text stays visible.' },
          { name: 'accentColor', type: 'string', description: "Override the accent color used in 'primary' variant background and focus ring." },
          { name: 'label', type: 'string', description: 'Alias for children — shown as button label text.' },
          { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the button. Also triggered automatically when loading=true.' },
          { name: 'width', type: 'DuiWidth', description: 'Width override. Useful for full-width buttons.' },
          { name: 'borderRadius', type: 'DuiRadius | number', description: 'Border radius override.' },
          { name: 'color', type: 'string', description: 'Text color override.' },
          { name: 'defaultColor', type: 'string', description: "Primary/accent color alias with context-level support (alias for accentColor)." },
          { name: 'activeColor', type: 'string', description: 'Color for active/focus ring state.' },
          { name: 'fontStyle', type: 'DuiFontStyle', description: 'Font style override.' },
          { name: '...rest', type: 'ButtonHTMLAttributes<HTMLButtonElement>', description: 'All native button attributes (onClick, type, aria-*, etc.) forwarded to the button element.' },
        ]} />
      </DocSection>

      <DocSection title="ButtonVariant enum">
        <EnumTable name="ButtonVariant" values={[
          { value: 'primary', description: 'Filled accent bg, white text', color: 'var(--color-primary)' },
          { value: 'secondary', description: 'Surface bg, border, default text', color: 'var(--color-info)' },
          { value: 'ghost', description: 'Transparent bg, secondary text', color: 'var(--color-text-muted)' },
          { value: 'danger', description: 'Red filled, white text', color: 'var(--color-error)' },
        ]} />
      </DocSection>

      <DocSection title="Sizes">
        <SizeReference sizes={[
          { size: 'xs', height: '20px', font: '10px', desc: 'Dense toolbar' },
          { size: 'sm', height: '24px', font: '11px', desc: 'Compact' },
          { size: 'md', height: '28px', font: '12px', desc: 'Default' },
          { size: 'lg', height: '32px', font: '13px', desc: 'Large' },
          { size: 'xl', height: '36px', font: '14px', desc: 'XL' },
        ]} />
      </DocSection>

      <DocNote type="tip">
        All buttons in the same toolbar or row must use the same size. Never mix xs (20px) and sm (24px) buttons side by side — the height difference is visually jarring in a single UI.
      </DocNote>

      <DocNote type="info">
        When loading=true, the button is automatically disabled and iconLeft is replaced by a spinner. The label text (children or label prop) remains visible so the user knows what operation is in progress.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="ButtonView reads its dimensions from the shared button category base hook (useButtonBase). Omitting size, width, borderRadius, or color on ButtonView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every button-category component at once."
      >
        <FeatureGrid features={[
          { label: 'useButtonBase', color: 'var(--color-primary)' },
          { label: 'Falls back to DuiProvider context', color: 'var(--color-success)' },
          { label: 'size / width / borderRadius / color', color: 'var(--color-info)' },
        ]} />
        <SizeReference sizes={[
          { size: 'xxs', height: '16px', font: '8px', desc: 'padX 4px' },
          { size: 'xs', height: '20px', font: '9px', desc: 'padX 6px' },
          { size: 'sm', height: '24px', font: '10px', desc: 'padX 8px' },
          { size: 'md', height: '28px', font: '11px', desc: 'padX 10px' },
          { size: 'lg', height: '36px', font: '12px', desc: 'padX 12px' },
          { size: 'xl', height: '40px', font: '13px', desc: 'padX 16px' },
          { size: 'xxl', height: '48px', font: '14px', desc: 'padX 20px' },
          { size: 'xxxl', height: '56px', font: '16px', desc: 'padX 24px' },
        ]} />
        <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 4, marginBottom: 8 }}>
          Width presets, resolved via the <code>width</code> prop or the nearest <code>{'<DuiProvider width="...">'}</code>:
        </div>
        <WidthReference widths={[
          { width: 'sm', value: '80px' },
          { width: 'md', value: '120px' },
          { width: 'default', value: 'auto' },
          { width: 'lg', value: '200px' },
          { width: 'fullWidth', value: '100%' },
          { width: 'maxContent', value: 'max-content' },
          { width: 'fw', value: '100%' },
          { width: 'mx', value: 'max-content' },
        ]} />
        <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 4, marginBottom: 8 }}>
          Border radius presets, resolved via the <code>borderRadius</code> prop:
        </div>
        <RadiusReference radii={[
          { radius: 'none', value: '0px' },
          { radius: 'sm', value: '3px' },
          { radius: 'md', value: '4px' },
          { radius: 'lg', value: '6px' },
          { radius: 'full', value: 'full' },
        ]} />
        <DocNote type="info">
          These values come from the Button category tokens in <code>DuiTokens.ts</code>. Set a local <code>size</code> prop to override the provider default for this instance only, or change <code>{'<DuiProvider size="...">'}</code> to restyle every button-category component in the tree.
        </DocNote>
      </DocSection>
      </div>
  );
}
