import { DocSection, PropTable, FeatureGrid, DocNote } from '../../../shared/DocComponents';

export function QRCodeViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Deterministic module grid per value', color: 'var(--color-primary)' },
          { label: 'Authentic finder-pattern corners', color: 'var(--color-success)' },
          { label: 'Pure SVG, no runtime dependency', color: 'var(--color-info)' },
          { label: 'Custom module color + background', color: 'var(--color-warning)' },
          { label: 'Configurable pixel size', color: '#a855f7' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'value', type: 'string', required: true, description: 'Source string used as the deterministic seed for the module grid.' },
          { name: 'size', type: 'number', default: '140', description: 'Width and height in pixels of the square SVG.' },
          { name: 'color', type: 'string', default: 'var(--color-text-primary)', description: 'Color of the QR modules and finder patterns.' },
          { name: 'background', type: 'string', default: "'#fff'", description: 'Background fill color behind the modules and inside the finder-pattern rings.' },
          { name: 'className', type: 'string', description: 'Additional class names applied to the SVG element.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the SVG element.' },
        ]} />
      </DocSection>

      <DocNote type="danger">
        QRCodeView is visually representative only — it does not implement the QR spec's Reed-Solomon error correction, so it is not guaranteed scannable by real QR readers. For a spec-compliant, scannable code, encode server-side (or via a dedicated encoding library) and render the result as a plain img.
      </DocNote>

      <DocNote type="tip">
        Same value always produces the same module grid, making it safe as a stable visual identifier for invite links, pairing codes, or environment share URLs in mockups and demos.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="QRCodeView does not read size, width, color, or borderRadius from the DuiProvider context — it is not part of the sized-component system and has no size prop to fall back to a provider default."
      >
        <DocNote type="info">
          QRCodeView is unaffected by <code>{'<DuiProvider>'}</code> size/color context. Style it directly via its own props (and CSS variables where documented above) rather than expecting provider-level sizing to apply.
        </DocNote>
      </DocSection>
      </div>
  );
}
