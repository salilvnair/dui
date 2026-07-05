import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference } from '../../../shared/DocComponents';

export function SpectrumSliderViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Track rendered as a live CSS gradient spectrum', color: 'var(--color-primary)' },
          { label: 'Magnified color-preview bubble follows the handle', color: 'var(--color-success)' },
          { label: 'Click-to-scrub and drag support', color: 'var(--color-info)' },
          { label: 'Custom gradient stops (hue, severity, temperature, etc.)', color: 'var(--color-warning)' },
          { label: 'Configurable range (min/max)', color: '#a855f7' },
          { label: 'DuiProvider size context (track height)', color: '#ec4899' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'value', type: 'number', required: true, description: 'Current slider value, controlled by the parent.' },
          { name: 'onChange', type: '(value: number) => void', required: true, description: 'Fires continuously while dragging or on click-to-scrub, with the value rounded to the nearest whole number.' },
          { name: 'min', type: 'number', default: '0', description: 'Minimum value.' },
          { name: 'max', type: 'number', default: '100', description: 'Maximum value.' },
          { name: 'gradient', type: 'string', default: "rainbow 7-stop linear-gradient", description: 'Any valid CSS gradient (or solid color) string, rendered along the track and used as the preview bubble background.' },
          { name: 'width', type: 'number', default: '240', description: 'Slider track width in pixels.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls the track height via InputBase. Falls back to DuiProvider context.' },
          { name: 'className', type: 'string', description: 'Additional class names applied to the outer wrapper.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the outer wrapper.' },
        ]} />
      </DocSection>

      <DocNote type="tip">
        The preview bubble above the handle shows a "magnified" slice of the gradient by offsetting its own `background-position` — this only looks correct when `gradient` is a horizontal `linear-gradient(90deg, ...)` matching the track's orientation. Radial or angled gradients will look misaligned in the bubble.
      </DocNote>

      <DocNote type="info">
        Great for any control where the value itself has an intuitive color mapping — hue pickers, severity/threshold sliders (green-to-red), or temperature scales — anywhere a plain numeric slider would need an extra legend to convey the same meaning.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="SpectrumSliderView reads its dimensions from the shared input category base hook (useInputBase). Omitting size, width, borderRadius, or color on SpectrumSliderView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every input-category component at once."
      >
        <FeatureGrid features={[
          { label: 'useInputBase', color: 'var(--color-primary)' },
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
        <DocNote type="info">
          These values come from the Input category tokens in <code>DuiTokens.ts</code>. Set a local <code>size</code> prop to override the provider default for this instance only, or change <code>{'<DuiProvider size="...">'}</code> to restyle every input-category component in the tree.
        </DocNote>
      </DocSection>
      </div>
  );
}
