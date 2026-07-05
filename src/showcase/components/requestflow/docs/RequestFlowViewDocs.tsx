import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference } from '../../../shared/DocComponents';

export function RequestFlowViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Animated network waterfall', color: 'var(--color-primary)' },
          { label: 'Particle speed mapped to real phase duration', color: 'var(--color-success)' },
          { label: 'Arbitrary phase list (DNS/TCP/TLS/custom)', color: 'var(--color-info)' },
          { label: 'Configurable particle count', color: 'var(--color-warning)' },
          { label: 'Per-phase color', color: '#a855f7' },
          { label: 'DUI-original, no direct prior art', color: '#14b8a6' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'phases', type: 'RequestFlowPhase[]', required: true, description: 'Ordered list of pipeline phases. Segment width is proportional to each phase\'s share of the total duration.' },
          { name: 'particleCount', type: 'number', default: '3', description: 'Number of particles in flight simultaneously, evenly spaced along the full animation cycle.' },
          { name: 'width', type: 'number', default: '480', description: 'Total pixel width of the waterfall track.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls the phase label font size. Falls back to DuiProvider context.' },
          { name: 'className', type: 'string', description: 'Additional class names on the outer container.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the outer container.' },
        ]} />
      </DocSection>

      <DocSection title="RequestFlowPhase shape">
        <PropTable props={[
          { name: 'id', type: 'string', required: true, description: 'Stable key for the phase.' },
          { name: 'label', type: 'string', required: true, description: 'Label rendered under the phase segment.' },
          { name: 'duration', type: 'number', required: true, description: 'Duration of this phase, in the same relative unit as the other phases (e.g. ms). Drives both segment width and particle speed.' },
          { name: 'color', type: 'string', description: 'Segment and particle color for this phase. Falls back to a neutral border/muted color when omitted.' },
        ]} />
      </DocSection>

      <DocNote type="info">
        Total animation cycle length is derived from the sum of all phase durations (clamped to a minimum of 1.2s), so passing real millisecond timings from an actual request trace produces a proportionally accurate — not just decorative — waterfall.
      </DocNote>

      <DocNote type="tip">
        This is a visualization primitive, not a live network tracer — feed it phase timings you've already captured (e.g. from the Resource Timing API or your own instrumentation) rather than expecting it to measure anything itself.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="RequestFlowView reads its dimensions from the shared display category base hook (useDisplayBase). Omitting size, borderRadius, or color on RequestFlowView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every display-category component at once."
      >
        <FeatureGrid features={[
          { label: 'useDisplayBase', color: 'var(--color-primary)' },
          { label: 'Falls back to DuiProvider context', color: 'var(--color-success)' },
          { label: 'size / borderRadius / color', color: 'var(--color-info)' },
        ]} />
        <SizeReference sizes={[
          { size: 'xxs', height: '—', font: '8px', desc: 'icon 8px' },
          { size: 'xs', height: '—', font: '9px', desc: 'icon 10px' },
          { size: 'sm', height: '—', font: '10px', desc: 'icon 11px' },
          { size: 'md', height: '—', font: '11px', desc: 'icon 12px' },
          { size: 'lg', height: '—', font: '12px', desc: 'icon 14px' },
          { size: 'xl', height: '—', font: '13px', desc: 'icon 16px' },
          { size: 'xxl', height: '—', font: '14px', desc: 'icon 18px' },
          { size: 'xxxl', height: '—', font: '16px', desc: 'icon 20px' },
        ]} />
        <DocNote type="info">
          These values come from the Display category tokens in <code>DuiTokens.ts</code>. Set a local <code>size</code> prop to override the provider default for this instance only, or change <code>{'<DuiProvider size="...">'}</code> to restyle every display-category component in the tree.
        </DocNote>
      </DocSection>
      </div>
  );
}
