import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference } from '../../../shared/DocComponents';

export function DialKnobInputViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Drag-in-a-circle rotary gesture', color: 'var(--color-primary)' },
          { label: 'Configurable snap-ticks', color: 'var(--color-success)' },
          { label: 'Haptic-style micro-bounce per notch', color: 'var(--color-info)' },
          { label: 'Custom min/max range', color: 'var(--color-warning)' },
          { label: 'DuiProvider size context (diameter scales)', color: '#a855f7' },
          { label: 'Custom accent color', color: '#ec4899' },
          { label: 'Optional value label readout', color: '#14b8a6' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'value', type: 'number', required: true, description: 'Current knob value, controlled by the parent.' },
          { name: 'onChange', type: '(value: number) => void', required: true, description: 'Called continuously while dragging with the new snapped value.' },
          { name: 'min', type: 'number', default: '0', description: 'Minimum value of the sweep.' },
          { name: 'max', type: 'number', default: '100', description: 'Maximum value of the sweep.' },
          { name: 'ticks', type: 'number', default: '10', description: 'Number of discrete snap-ticks across the full 270° sweep. Value always snaps to the nearest tick.' },
          { name: 'label', type: 'string', description: 'Optional caption rendered below the knob, showing "label: value".' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls the knob diameter (40px at xxs up to 112px at xxxl). Falls back to DuiProvider context.' },
          { name: 'color', type: 'string', default: 'var(--color-primary)', description: 'Accent color for the active ticks and the pointer needle.' },
          { name: 'className', type: 'string', description: 'Additional class names applied to the outer wrapper.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the outer wrapper.' },
        ]} />
      </DocSection>

      <DocNote type="tip">
        The sweep spans -135deg to +135deg (270deg total, matching a real analog dial). Dragging computes the pointer angle from the knob's center and snaps to the nearest of `ticks` steps between `min` and `max` — it does not track raw pixel deltas, so a fast flick that crosses the sweep boundary still clamps correctly.
      </DocNote>

      <DocNote type="info">
        Each time the snapped tick index changes, the knob briefly applies a `dui_dialknob--bounce` CSS class for a haptic-style micro animation. Keep `ticks` reasonably low (5-20) for a satisfying discrete feel — very high tick counts approach continuous dragging and the bounce becomes imperceptible.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="DialKnobInputView reads its dimensions from the shared input category base hook (useInputBase). Omitting size, width, borderRadius, or color on DialKnobInputView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every input-category component at once."
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
