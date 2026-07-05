import { DocSection, PropTable, FeatureGrid, DocNote } from '../../../shared/DocComponents';

export function WatermarkViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Repeated diagonal tiling', color: 'var(--color-primary)' },
          { label: 'Configurable rotation angle', color: 'var(--color-success)' },
          { label: 'Adjustable tile gap', color: 'var(--color-info)' },
          { label: 'Custom color + opacity', color: 'var(--color-warning)' },
          { label: 'Pointer-events: none overlay', color: '#a855f7' },
          { label: 'SVG data-URI generation, no external assets', color: '#ec4899' },
          { label: 'Wraps any children as an overlay host', color: '#14b8a6' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'children', type: 'ReactNode', required: true, description: 'Content the watermark is stamped over. WatermarkView positions itself as an absolute overlay on top of this.' },
          { name: 'text', type: 'string', required: true, description: 'The stamp text repeated across the tiled background.' },
          { name: 'angle', type: 'number', default: '-22', description: 'Rotation angle in degrees applied to each text tile.' },
          { name: 'gap', type: 'number', default: '120', description: 'Gap between repeated tiles in pixels. Also sets the SVG tile width/height, so smaller values produce denser patterns.' },
          { name: 'fontSize', type: 'number', default: '14', description: 'Font size in pixels of the watermark text.' },
          { name: 'color', type: 'string', default: 'var(--color-text-primary)', description: 'Fill color of the watermark text. Accepts CSS variables or raw color values.' },
          { name: 'opacity', type: 'number', default: '0.12', description: 'Fill opacity of the text, from 0 to 1. Kept low so the underlying content stays legible.' },
          { name: 'className', type: 'string', description: 'Additional class names applied to the outer wrapper.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the outer wrapper (which is position: relative).' },
        ]} />
      </DocSection>

      <DocNote type="info">
        The watermark is rendered as a background-tiled SVG data URI on an absolutely positioned, pointer-events-none div layered above children. It does not intercept clicks or affect layout of the wrapped content.
      </DocNote>

      <DocNote type="tip">
        Use a small gap (40–60px) with low opacity for a fine security-paper texture (e.g. NDA-protected data), and a large gap (120–160px) with a bigger fontSize for a bold single-line stamp like STAGING or CONFIDENTIAL.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="WatermarkView does not read size, width, color, or borderRadius from the DuiProvider context — it is not part of the sized-component system and has no size prop to fall back to a provider default."
      >
        <DocNote type="info">
          WatermarkView is unaffected by <code>{'<DuiProvider>'}</code> size/color context. Style it directly via its own props (and CSS variables where documented above) rather than expecting provider-level sizing to apply.
        </DocNote>
      </DocSection>
      </div>
  );
}
