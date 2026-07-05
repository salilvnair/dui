import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference } from '../../../shared/DocComponents';

export function ImageCropperViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Drag-to-pan crop frame', color: 'var(--color-primary)' },
          { label: 'Zoom slider (1x-3x)', color: 'var(--color-info)' },
          { label: 'Configurable aspect ratio', color: 'var(--color-success)' },
          { label: 'Pointer-capture based dragging', color: 'var(--color-warning)' },
          { label: 'Fully controlled value', color: '#a855f7' },
          { label: 'Grid overlay for composition', color: '#14b8a6' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'src', type: 'string', required: true, description: 'Source image URL to crop.' },
          { name: 'value', type: 'ImageCropperValue', required: true, description: 'Controlled { x, y, zoom } state. x/y are pan offsets as a fraction of container size (e.g. -0.5..0.5).' },
          { name: 'onChange', type: '(value: ImageCropperValue) => void', required: true, description: 'Called with the updated value on drag or zoom-slider change.' },
          { name: 'aspectRatio', type: 'number', default: '1', description: 'Crop frame aspect ratio, expressed as width/height. 1 = square, 3 = wide banner.' },
          { name: 'height', type: 'number', default: '260', description: 'Fixed pixel height of the crop frame; width is derived from aspectRatio.' },
          { name: 'className', type: 'string', description: 'Additional class names on the outer container.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the outer container.' },
        ]} />
      </DocSection>

      <DocSection title="ImageCropperValue shape">
        <PropTable props={[
          { name: 'x', type: 'number', required: true, description: 'Horizontal pan offset as a fraction of container size.' },
          { name: 'y', type: 'number', required: true, description: 'Vertical pan offset as a fraction of container size.' },
          { name: 'zoom', type: 'number', required: true, description: 'Zoom scale factor, typically constrained to 1-3 by the paired zoom slider.' },
        ]} />
      </DocSection>

      <DocNote type="tip">
        ImageCropperView only tracks pan/zoom state — it does not export a cropped image itself. Read the final value (x, y, zoom, plus your known aspectRatio and source dimensions) and perform the actual pixel crop server-side or via a canvas draw when the user confirms.
      </DocNote>

      <DocNote type="info">
        The zoom control is a real SliderView instance rendered underneath the frame, min 1 and max 3 — reset both pan and zoom together by setting value back to {'{ x: 0, y: 0, zoom: 1 }'}.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="ImageCropperView reads its dimensions from the shared media category base hook (useMediaBase). Omitting size, borderRadius, or color on ImageCropperView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every media-category component at once."
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
