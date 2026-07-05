import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference } from '../../../shared/DocComponents';

export function RateLimitMeterViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'SVG ring gauge', color: 'var(--color-primary)' },
          { label: 'Auto color by remaining ratio', color: 'var(--color-warning)' },
          { label: 'Center remaining-count label', color: 'var(--color-info)' },
          { label: 'Reset countdown text', color: 'var(--color-success)' },
          { label: 'Animated stroke transitions', color: '#a855f7' },
          { label: 'DuiSize ring diameter', color: '#14b8a6' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'remaining', type: 'number', required: true, description: 'Requests remaining in the current window.' },
          { name: 'limit', type: 'number', required: true, description: 'Total requests allowed in the window.' },
          { name: 'resetLabel', type: 'string', required: true, description: 'Human-readable reset time, e.g. "in 12m". Rendered as "Resets {resetLabel}".' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls ring diameter, stroke thickness, and font size via the DUI feedback base.' },
          { name: 'className', type: 'string', description: 'Additional class names on the outer container.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the outer container.' },
        ]} />
      </DocSection>

      <DocNote type="tip">
        Color thresholds are fixed (≤10% remaining is danger, ≤30% is warning, above that is success) and are not configurable via props — if you need custom thresholds, use UsageMeterView's warningAt/dangerAt instead and adapt it to a ring visually, or wrap RateLimitMeterView's ratio calculation yourself.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="RateLimitMeterView reads its dimensions from the shared feedback category base hook (useFeedbackBase). Omitting size, width, borderRadius, or color on RateLimitMeterView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every feedback-category component at once."
      >
        <FeatureGrid features={[
          { label: 'useFeedbackBase', color: 'var(--color-primary)' },
          { label: 'Falls back to DuiProvider context', color: 'var(--color-success)' },
          { label: 'size / width / borderRadius / color', color: 'var(--color-info)' },
        ]} />
        <SizeReference sizes={[
          { size: 'xxs', height: '2px thick', font: '8px', desc: 'ring 40px' },
          { size: 'xs', height: '3px thick', font: '9px', desc: 'ring 52px' },
          { size: 'sm', height: '4px thick', font: '10px', desc: 'ring 64px' },
          { size: 'md', height: '5px thick', font: '11px', desc: 'ring 80px' },
          { size: 'lg', height: '6px thick', font: '12px', desc: 'ring 100px' },
          { size: 'xl', height: '8px thick', font: '13px', desc: 'ring 120px' },
          { size: 'xxl', height: '10px thick', font: '14px', desc: 'ring 144px' },
          { size: 'xxxl', height: '12px thick', font: '16px', desc: 'ring 168px' },
        ]} />
        <DocNote type="info">
          These values come from the Feedback category tokens in <code>DuiTokens.ts</code>. Set a local <code>size</code> prop to override the provider default for this instance only, or change <code>{'<DuiProvider size="...">'}</code> to restyle every feedback-category component in the tree.
        </DocNote>
      </DocSection>
      </div>
  );
}
