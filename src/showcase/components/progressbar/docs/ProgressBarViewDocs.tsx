import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference, WidthReference } from '../../../shared/DocComponents';

export function ProgressBarViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Determinate and indeterminate modes', color: 'var(--color-primary)' },
          { label: 'Secondary buffer fill', color: 'var(--color-success)' },
          { label: 'Striped animated indeterminate style', color: 'var(--color-info)' },
          { label: 'Configurable width preset', color: 'var(--color-warning)' },
          { label: 'Custom accent + track colors', color: '#a855f7' },
          { label: 'ARIA progressbar role', color: '#ec4899' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'value', type: 'number', description: '0-100. Omit entirely for indeterminate (striped, animated) mode.' },
          { name: 'buffer', type: 'number', description: '0-100. Secondary "buffered" fill drawn behind the primary bar, e.g. video/response buffering ahead of playback. Ignored in indeterminate mode.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls bar thickness.' },
          { name: 'width', type: 'DuiWidth', description: 'Named width preset (e.g. "sm", "lg", "fullWidth").' },
          { name: 'color', type: 'string', default: 'var(--color-primary)', description: 'Fill color of the primary bar.' },
          { name: 'trackColor', type: 'string', default: 'var(--color-surface-border)', description: 'Background color of the unfilled track.' },
          { name: 'className', type: 'string', description: 'Additional class names on the outer container.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the outer container.' },
        ]} />
      </DocSection>

      <DocNote type="tip">
        For circular progress (uploads, sync spinners) use ProgressRingView instead — ProgressBarView is the linear counterpart, better suited to full-width layouts like a top-of-page load bar or a collection-run status line.
      </DocNote>

      <DocNote type="info">
        role="progressbar" and aria-valuenow are set automatically; aria-valuenow is omitted entirely in indeterminate mode per ARIA spec, so no extra accessibility wiring is needed on your end.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="ProgressBarView reads its dimensions from the shared feedback category base hook (useFeedbackBase). Omitting size, width, borderRadius, or color on ProgressBarView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every feedback-category component at once."
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
