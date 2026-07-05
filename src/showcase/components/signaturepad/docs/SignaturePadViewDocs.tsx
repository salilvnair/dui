import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference } from '../../../shared/DocComponents';

export function SignaturePadViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Mouse / touch / pen capture via Pointer Events', color: 'var(--color-primary)' },
          { label: 'PNG data URL export', color: 'var(--color-success)' },
          { label: 'Built-in Clear button', color: 'var(--color-info)' },
          { label: 'DPI-aware canvas scaling', color: 'var(--color-warning)' },
          { label: 'Custom stroke color', color: '#a855f7' },
          { label: 'Configurable height', color: '#ec4899' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'onChange', type: '(dataUrl: string | null) => void', description: 'Called on pointer-up with a PNG data URL of the current drawing, or null after Clear / when the pad is empty.' },
          { name: 'strokeColor', type: 'string', default: 'var(--color-text-primary)', description: 'Color of the drawn stroke.' },
          { name: 'height', type: 'number', default: '160', description: 'Height in pixels of the canvas. Width fills the container (100%).' },
          { name: 'className', type: 'string', description: 'Additional class names applied to the outer wrapper.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the outer wrapper.' },
        ]} />
      </DocSection>

      <DocNote type="info">
        The canvas is scaled by window.devicePixelRatio on mount for crisp strokes on high-DPI displays. Resizing the container after mount does not re-scale the canvas — remount the component (e.g. via a key) if the container size changes significantly.
      </DocNote>

      <DocNote type="warning">
        onChange only fires on pointer-up (stroke completion) and on Clear — it is not a per-frame callback. Read the exported data URL from the last onChange call when you need the signature, e.g. on form submit.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="SignaturePadView reads its dimensions from the shared media category base hook (useMediaBase). Omitting size, borderRadius, or color on SignaturePadView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every media-category component at once."
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
