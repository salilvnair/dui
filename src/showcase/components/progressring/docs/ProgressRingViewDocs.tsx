import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference } from '../../../shared/DocComponents';

export function ProgressRingViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Determinate (0-100) and indeterminate modes', color: 'var(--color-primary)' },
          { label: 'SVG stroke-based circular fill', color: 'var(--color-success)' },
          { label: 'Optional centered percentage label', color: 'var(--color-info)' },
          { label: 'Custom accent + track colors', color: 'var(--color-warning)' },
          { label: 'DuiProvider size context', color: '#a855f7' },
          { label: 'Smooth transition on value change', color: '#ec4899' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'value', type: 'number', description: '0-100. Omit entirely for indeterminate (spinning) mode.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls ring diameter and stroke thickness.' },
          { name: 'color', type: 'string', default: 'var(--color-primary)', description: 'Stroke color of the filled arc.' },
          { name: 'trackColor', type: 'string', default: 'var(--color-surface-border)', description: 'Stroke color of the unfilled background circle.' },
          { name: 'showLabel', type: 'boolean', default: 'true', description: 'Shows the rounded percentage in the center. Ignored (hidden) in indeterminate mode regardless of this prop.' },
          { name: 'className', type: 'string', description: 'Additional class names on the outer container.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the outer container.' },
        ]} />
      </DocSection>

      <DocNote type="tip">
        ProgressRingView is for circular progress (uploads, imports, sync spinners). For a labeled metric gauge with thresholds/zones, use GaugeView instead — they share a circular look but serve different purposes.
      </DocNote>

      <DocNote type="info">
        Passing value={undefined} (simply omitting the prop) switches the ring to indeterminate mode — it spins via a CSS animation rather than tracking dash-offset, and the percentage label is suppressed even if showLabel is true.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="ProgressRingView reads its dimensions from the shared feedback category base hook (useFeedbackBase). Omitting size, width, borderRadius, or color on ProgressRingView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every feedback-category component at once."
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
