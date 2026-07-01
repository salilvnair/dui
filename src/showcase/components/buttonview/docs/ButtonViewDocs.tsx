import { DocSection, PropTable, FeatureGrid, EnumTable, DocNote, SizeReference, VariantRow } from '../../../shared/DocComponents';

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
        All buttons in the same toolbar or row must use the same size. Never mix xs (20px) and sm (24px) buttons side by side — the height difference is visually jarring on macOS-style UIs.
      </DocNote>

      <DocNote type="info">
        When loading=true, the button is automatically disabled and iconLeft is replaced by a spinner. The label text (children or label prop) remains visible so the user knows what operation is in progress.
      </DocNote>
    </div>
  );
}
