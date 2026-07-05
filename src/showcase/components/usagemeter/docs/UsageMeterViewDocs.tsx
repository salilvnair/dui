import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference, WidthReference } from '../../../shared/DocComponents';

export function UsageMeterViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Used / limit ratio bar', color: 'var(--color-primary)' },
          { label: 'Auto warning color at 75%', color: 'var(--color-warning)' },
          { label: 'Auto danger color at 90%', color: 'var(--color-error)' },
          { label: 'Configurable thresholds', color: 'var(--color-info)' },
          { label: 'DuiSize + DuiWidth theming', color: '#a855f7' },
          { label: 'Safe against zero-limit division', color: '#14b8a6' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'used', type: 'number', required: true, description: 'Current consumed amount.' },
          { name: 'limit', type: 'number', required: true, description: 'Maximum quota. When 0, the bar renders empty and avoids a division-by-zero.' },
          { name: 'label', type: 'string', description: 'Text shown above the bar, left-aligned next to the used/limit count.' },
          { name: 'warningAt', type: 'number', default: '0.75', description: 'Fraction (0-1) of the limit at which the bar turns warning-colored.' },
          { name: 'dangerAt', type: 'number', default: '0.9', description: 'Fraction (0-1) of the limit at which the bar turns error-colored.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls bar thickness and label font size via the DUI feedback base.' },
          { name: 'width', type: 'DuiWidth', description: 'Controls the overall width of the component.' },
          { name: 'className', type: 'string', description: 'Additional class names on the outer container.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the outer container.' },
        ]} />
      </DocSection>

      <DocNote type="tip">
        UsageMeterView uses useFeedbackBase for its sizing, the same hook used by progress and status components — pass size to keep it visually consistent with nearby ProgressBarView or RateLimitMeterView instances.
      </DocNote>

      <DocNote type="info">
        The color transitions happen automatically based on the used/limit ratio versus warningAt and dangerAt — there is no manual color override prop, so thresholds are the only lever for changing when the bar shifts to warning or danger colors.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="UsageMeterView reads its dimensions from the shared feedback category base hook (useFeedbackBase). Omitting size, width, borderRadius, or color on UsageMeterView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every feedback-category component at once."
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
        <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 4, marginBottom: 8 }}>
          Width presets, resolved via the <code>width</code> prop or the nearest <code>{'<DuiProvider width="...">'}</code>:
        </div>
        <WidthReference widths={[
          { width: 'sm', value: '80px' },
          { width: 'md', value: '120px' },
          { width: 'default', value: 'auto' },
          { width: 'lg', value: '200px' },
          { width: 'fullWidth', value: '100%' },
          { width: 'maxContent', value: 'max-content' },
          { width: 'fw', value: '100%' },
          { width: 'mx', value: 'max-content' },
        ]} />
        <DocNote type="info">
          These values come from the Feedback category tokens in <code>DuiTokens.ts</code>. Set a local <code>size</code> prop to override the provider default for this instance only, or change <code>{'<DuiProvider size="...">'}</code> to restyle every feedback-category component in the tree.
        </DocNote>
      </DocSection>
      </div>
  );
}
