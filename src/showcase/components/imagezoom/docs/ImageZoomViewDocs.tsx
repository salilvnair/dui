import { DocSection, PropTable, FeatureGrid, DocNote } from '../../../shared/DocComponents';

export function ImageZoomViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Click-to-zoom lightbox', color: 'var(--color-primary)' },
          { label: 'Escape key to close', color: 'var(--color-success)' },
          { label: 'Click backdrop to close', color: 'var(--color-info)' },
          { label: 'Rendered via React portal (document.body)', color: 'var(--color-warning)' },
          { label: 'Independent thumbnail styling', color: '#a855f7' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'src', type: 'string', required: true, description: 'Image URL used for both the thumbnail and the full-screen lightbox view.' },
          { name: 'alt', type: 'string', description: 'Alt text applied to both the thumbnail and lightbox image. Defaults to an empty string.' },
          { name: 'thumbnailStyle', type: 'CSSProperties', description: 'Inline style applied only to the thumbnail <img>, merged after style. Use this to size/crop the thumbnail independently of the lightbox.' },
          { name: 'className', type: 'string', description: 'Class name applied to the thumbnail <img>.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style applied to the thumbnail <img>, merged after thumbnailStyle (style wins on conflicting keys).' },
        ]} />
      </DocSection>

      <DocNote type="info">
        The lightbox is rendered through a React portal into document.body, so it escapes any parent overflow:hidden or z-index stacking context — no extra wiring needed.
      </DocNote>

      <DocNote type="tip">
        For side-by-side before/after image comparison instead of a single-image lightbox, use ComparisonSliderView.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="ImageZoomView does not read size, width, color, or borderRadius from the DuiProvider context — it is not part of the sized-component system and has no size prop to fall back to a provider default."
      >
        <DocNote type="info">
          ImageZoomView is unaffected by <code>{'<DuiProvider>'}</code> size/color context. Style it directly via its own props (and CSS variables where documented above) rather than expecting provider-level sizing to apply.
        </DocNote>
      </DocSection>
      </div>
  );
}
