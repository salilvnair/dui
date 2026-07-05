import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference } from '../../../shared/DocComponents';

export function TimeTravelSliderViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Draggable playhead scrubber', color: 'var(--color-primary)' },
          { label: 'Background sparkline of historical states', color: 'var(--color-success)' },
          { label: 'Generic over any state shape via toValue', color: 'var(--color-info)' },
          { label: 'Optional per-index label extractor', color: 'var(--color-warning)' },
          { label: 'Click-and-drag anywhere on the track', color: '#a855f7' },
          { label: 'Time-travel state scrubber, generalized', color: '#14b8a6' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'states', type: 'T[]', required: true, description: 'Historical states, oldest first. T can be any shape — a plain number or a rich object.' },
          { name: 'index', type: 'number', required: true, description: 'Index of the currently-scrubbed state. Fully controlled.' },
          { name: 'onScrub', type: '(index: number) => void', required: true, description: 'Called with the new index while dragging or clicking the track.' },
          { name: 'toValue', type: '(state: T) => number', required: true, description: 'Extracts a plottable number from each state, used to draw the background sparkline.' },
          { name: 'toLabel', type: '(state: T, index: number) => string', description: 'Extracts a short label shown above the playhead for the active state. Omit for a label-less sparkline.' },
          { name: 'width', type: 'number', default: '320', description: 'SVG track width in pixels.' },
          { name: 'height', type: 'number', default: '64', description: 'SVG track height in pixels.' },
          { name: 'color', type: 'string', default: 'var(--color-primary)', description: 'Playhead line and dot color.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls the label font size. Falls back to DuiProvider context.' },
          { name: 'className', type: 'string', description: 'Additional class names on the outer wrapper.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the outer wrapper.' },
        ]} />
      </DocSection>

      <DocNote type="info">
        states.length === 1 is handled gracefully — the divisor n is clamped to at least 1, so a single-state array renders a flat playhead at the left edge instead of throwing on a divide-by-zero.
      </DocNote>

      <DocNote type="tip">
        Because toValue and toLabel are plain functions rather than a fixed key name, this component works equally well over raw metric arrays (number[]) or rich snapshot objects (e.g. a Redux state history) — just adapt the two extractor functions to your data shape.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="TimeTravelSliderView reads its dimensions from the shared input category base hook (useInputBase). Omitting size, width, borderRadius, or color on TimeTravelSliderView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every input-category component at once."
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
