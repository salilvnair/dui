import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference, WidthReference, RadiusReference } from '../../../shared/DocComponents';

export function SnackbarViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Single-line bottom bar', color: 'var(--color-primary)' },
          { label: 'Auto-dismiss timer', color: 'var(--color-success)' },
          { label: 'Timer pauses on hover', color: 'var(--color-info)' },
          { label: 'Optional action button', color: 'var(--color-warning)' },
          { label: 'Explicit close button', color: '#a855f7' },
          { label: 'Configurable width', color: '#ec4899' },
          { label: 'Persistent mode (duration=0)', color: '#14b8a6' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'open', type: 'boolean', required: true, description: 'Controls visibility. Renders null when false.' },
          { name: 'message', type: 'string', required: true, description: 'The single-line message text.' },
          { name: 'onClose', type: '() => void', required: true, description: 'Called when the timer expires, the action is clicked, or the close (x) button is clicked.' },
          { name: 'actionLabel', type: 'string', description: 'Text for an optional inline action button (e.g. "Undo", "Retry"). Omit to hide the action.' },
          { name: 'onAction', type: '() => void', description: 'Called when the action button is clicked, immediately before onClose also fires.' },
          { name: 'duration', type: 'number', default: '4000', description: 'Auto-dismiss delay in ms. Set to 0 to disable auto-dismiss (persistent until manually closed). Timer pauses while the mouse hovers the bar.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls padding, gap, and font size.' },
          { name: 'width', type: 'DuiWidth', description: 'Named width preset (e.g. "sm", "lg", "fullWidth").' },
          { name: 'borderRadius', type: 'DuiRadius | number', description: 'Border radius preset or raw px value.' },
          { name: 'color', type: 'string', default: 'var(--color-primary)', description: 'Accent color for the action button text.' },
          { name: 'className', type: 'string', description: 'Additional class names on the outer container.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the outer container.' },
        ]} />
      </DocSection>

      <DocNote type="tip">
        SnackbarView is a single-line bottom bar meant for one message at a time — it does not stack. For multiple simultaneous notifications in a stacked corner layout, use ToastView instead.
      </DocNote>

      <DocNote type="warning">
        The component always renders inline where it's placed (it is not portaled). If you want it fixed to the viewport bottom, wrap it in a fixed-position container yourself.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="SnackbarView reads its dimensions from the shared feedback category base hook (useFeedbackBase). Omitting size, width, borderRadius, or color on SnackbarView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every feedback-category component at once."
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
        <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 4, marginBottom: 8 }}>
          Border radius presets, resolved via the <code>borderRadius</code> prop:
        </div>
        <RadiusReference radii={[
          { radius: 'none', value: '0px' },
          { radius: 'sm', value: '3px' },
          { radius: 'md', value: '4px' },
          { radius: 'lg', value: '6px' },
          { radius: 'full', value: 'full' },
        ]} />
        <DocNote type="info">
          These values come from the Feedback category tokens in <code>DuiTokens.ts</code>. Set a local <code>size</code> prop to override the provider default for this instance only, or change <code>{'<DuiProvider size="...">'}</code> to restyle every feedback-category component in the tree.
        </DocNote>
      </DocSection>
      </div>
  );
}
