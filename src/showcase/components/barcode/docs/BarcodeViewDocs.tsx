import { DocSection, PropTable, FeatureGrid, DocNote } from '../../../shared/DocComponents';

export function BarcodeViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Deterministic pattern per value', color: 'var(--color-primary)' },
          { label: 'Pure SVG, no runtime dependency', color: 'var(--color-success)' },
          { label: 'Optional printed value label', color: 'var(--color-info)' },
          { label: 'Custom bar color', color: 'var(--color-warning)' },
          { label: 'Configurable height', color: '#a855f7' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'value', type: 'string', required: true, description: 'Source string used both as the seed for the deterministic bar-width pattern and as the printed label text.' },
          { name: 'height', type: 'number', default: '50', description: 'Height in pixels of the SVG bars.' },
          { name: 'showValue', type: 'boolean', default: 'true', description: 'Whether to print the value text underneath the bars.' },
          { name: 'color', type: 'string', default: 'var(--color-text-primary)', description: 'Fill color of the bars.' },
          { name: 'className', type: 'string', description: 'Additional class names applied to the outer wrapper.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the outer wrapper.' },
        ]} />
      </DocSection>

      <DocNote type="danger">
        BarcodeView is visually representative only — it is not a Code128/EAN-compliant encoder and the pattern is not scannable by real barcode readers. For a genuinely scannable barcode, generate the SVG server-side or via a dedicated encoding library and render the result as a plain img.
      </DocNote>

      <DocNote type="tip">
        The same value always produces the same bar pattern (seeded from the string's char codes), so it's safe to use as a stable visual fingerprint for request IDs, SKUs, or API keys in a UI mockup context.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="BarcodeView does not read size, width, color, or borderRadius from the DuiProvider context — it is not part of the sized-component system and has no size prop to fall back to a provider default."
      >
        <DocNote type="info">
          BarcodeView is unaffected by <code>{'<DuiProvider>'}</code> size/color context. Style it directly via its own props (and CSS variables where documented above) rather than expecting provider-level sizing to apply.
        </DocNote>
      </DocSection>
      </div>
  );
}
