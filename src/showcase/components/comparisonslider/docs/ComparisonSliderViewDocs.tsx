import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference } from '../../../shared/DocComponents';

export function ComparisonSliderViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Drag or click to reveal', color: 'var(--color-primary)' },
          { label: 'Pointer-capture based dragging', color: 'var(--color-success)' },
          { label: 'Corner before/after tags', color: 'var(--color-info)' },
          { label: 'Configurable height', color: 'var(--color-warning)' },
          { label: 'CSS clip-path reveal, no canvas', color: '#a855f7' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'beforeSrc', type: 'string', required: true, description: 'Image URL shown on the left / underneath.' },
          { name: 'afterSrc', type: 'string', required: true, description: 'Image URL revealed on the right as the handle is dragged.' },
          { name: 'beforeLabel', type: 'string', default: "'Before'", description: 'Tag text shown in the bottom-left corner.' },
          { name: 'afterLabel', type: 'string', default: "'After'", description: 'Tag text shown in the bottom-right corner.' },
          { name: 'height', type: 'number', default: '260', description: 'Height in pixels of the comparison area. Width fills the container.' },
          { name: 'className', type: 'string', description: 'Additional class names applied to the outer container.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the outer container.' },
        ]} />
      </DocSection>

      <DocNote type="info">
        The two images should share the same aspect ratio and dimensions for a clean reveal — mismatched sizes will cause the after image to appear stretched or misaligned relative to the before image since both are laid out with the same CSS box.
      </DocNote>

      <DocNote type="tip">
        The slider position defaults to 50% and is not controllable via props — it's fully internal, pointer-driven state. If you need to read or set the position programmatically, this component is not the right fit; compose your own clip-path reveal instead.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="ComparisonSliderView reads its dimensions from the shared media category base hook (useMediaBase). Omitting size, borderRadius, or color on ComparisonSliderView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every media-category component at once."
      >
        <FeatureGrid features={[
          { label: 'useMediaBase', color: 'var(--color-primary)' },
          { label: 'Falls back to DuiProvider context', color: 'var(--color-success)' },
          { label: 'size / borderRadius / color', color: 'var(--color-info)' },
        ]} />
        <SizeReference sizes={[
          { size: 'xxs', height: '—', font: '8px', desc: 'aspect ratio 16:9 default' },
          { size: 'xs', height: '—', font: '9px', desc: 'aspect ratio 16:9 default' },
          { size: 'sm', height: '—', font: '10px', desc: 'aspect ratio 16:9 default' },
          { size: 'md', height: '—', font: '11px', desc: 'aspect ratio 16:9 default' },
          { size: 'lg', height: '—', font: '12px', desc: 'aspect ratio 16:9 default' },
          { size: 'xl', height: '—', font: '13px', desc: 'aspect ratio 16:9 default' },
          { size: 'xxl', height: '—', font: '14px', desc: 'aspect ratio 16:9 default' },
          { size: 'xxxl', height: '—', font: '16px', desc: 'aspect ratio 16:9 default' },
        ]} />
        <DocNote type="info">
          These values come from the Media category tokens in <code>DuiTokens.ts</code>. Set a local <code>size</code> prop to override the provider default for this instance only, or change <code>{'<DuiProvider size="...">'}</code> to restyle every media-category component in the tree.
        </DocNote>
      </DocSection>
      </div>
  );
}
