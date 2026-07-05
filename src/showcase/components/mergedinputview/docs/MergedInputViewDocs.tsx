import { DocSection, PropTable, FeatureGrid, EnumTable, DocNote } from '../../../shared/DocComponents';

export function MergedInputViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Unified border around all segments', color: 'var(--color-primary)' },
          { label: 'Focus ring on any active segment', color: 'var(--color-success)' },
          { label: 'Select segment with portal dropdown', color: 'var(--color-info)' },
          { label: 'Text segment with flex sizing', color: 'var(--color-warning)' },
          { label: 'Button segment (accent-outlined)', color: '#a855f7' },
          { label: 'Divider segment (1px border)', color: '#ec4899' },
          { label: 'Custom ReactNode segment', color: '#14b8a6' },
          { label: 'DUI size token support', color: '#f97316' },
        ]} />
      </DocSection>

      <DocSection title="Segment types">
        <EnumTable name="MergedInputSegment.type" values={[
          { value: 'select', description: 'Dropdown selector with colored option labels and checkmark', color: 'var(--color-primary)' },
          { value: 'text', description: 'Text input with configurable flex and placeholder', color: 'var(--color-success)' },
          { value: 'button', description: 'Accent-outlined action button with optional icon', color: 'var(--color-info)' },
          { value: 'divider', description: '1px vertical separator aligned to input center', color: 'var(--color-warning)' },
          { value: 'custom', description: 'Any ReactNode with optional fixed width', color: '#a855f7' },
        ]} />
      </DocSection>

      <DocSection title="Segment props — select">
        <PropTable props={[
          { name: 'type', type: "'select'", required: true, description: 'Marks this as a select segment.' },
          { name: 'value', type: 'string', required: true, description: 'Currently selected value.' },
          { name: 'options', type: 'MergedSelectOption[]', required: true, description: 'Array of { value, label, color? } option objects.' },
          { name: 'onChange', type: '(value: string) => void', required: true, description: 'Called when an option is selected.' },
          { name: 'width', type: 'number', description: 'Fixed width in px. Defaults to size-derived value (72–106px).' },
        ]} />
      </DocSection>

      <DocSection title="Segment props — text">
        <PropTable props={[
          { name: 'type', type: "'text'", required: true, description: 'Marks this as a text input segment.' },
          { name: 'value', type: 'string', required: true, description: 'Controlled input value.' },
          { name: 'onChange', type: '(value: string) => void', required: true, description: 'Called on input change.' },
          { name: 'placeholder', type: 'string', description: 'Placeholder text.' },
          { name: 'flex', type: 'number', default: '1', description: 'CSS flex value for width distribution.' },
        ]} />
      </DocSection>

      <DocSection title="Segment props — button">
        <PropTable props={[
          { name: 'type', type: "'button'", required: true, description: 'Marks this as a button segment.' },
          { name: 'label', type: 'string', required: true, description: 'Button label text.' },
          { name: 'onClick', type: '() => void', required: true, description: 'Click handler.' },
          { name: 'icon', type: 'ReactNode', description: 'Optional icon rendered before the label.' },
          { name: 'accentColor', type: 'string', description: 'Button accent color (border + text). Defaults to var(--color-primary).' },
        ]} />
      </DocSection>

      <DocSection title="Segment props — custom">
        <PropTable props={[
          { name: 'type', type: "'custom'", required: true, description: 'Marks this as a custom content segment.' },
          { name: 'content', type: 'ReactNode', required: true, description: 'Any ReactNode to render inside the segment.' },
          { name: 'width', type: 'number', description: 'Optional fixed width for the custom segment container.' },
        ]} />
      </DocSection>

      <DocSection title="MergedInputView Props">
        <PropTable props={[
          { name: 'segments', type: 'MergedInputSegment[]', required: true, description: 'Ordered array of segments composing the input.' },
          { name: 'size', type: 'DuiSize', description: 'Size token for all segments. Falls back to DuiProvider.' },
          { name: 'accentColor', type: 'string', description: 'Border highlight and focus ring color.' },
          { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables all segments. Applies 0.5 opacity.' },
          { name: 'className', type: 'string', description: 'Extra CSS class on the root container.' },
        ]} />
      </DocSection>

      <DocSection title="Real-world pattern">
        <DocNote type="tip">
          MergedInputView powers the URL bar in Daakia: <code>[select:method] | [divider] | [text:url] | [button:Send]</code>. The entire row shares one border and one focus ring.
        </DocNote>
      </DocSection>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="MergedInputView reads <code>size</code>, <code>color</code>, and related style props directly from the DuiProvider context via useDui() rather than through a shared category base hook. Omitting a local size or color prop falls back to the nearest <DuiProvider> value."
      >
        <FeatureGrid features={[
          { label: 'useDui() context read', color: 'var(--color-primary)' },
          { label: 'Falls back to DuiProvider context', color: 'var(--color-success)' },
          { label: 'size / color overrides', color: 'var(--color-info)' },
        ]} />
        <DocNote type="info">
          MergedInputView derives its own local size map from the resolved <code>size</code> value rather than sharing one of the category base hooks (e.g. useInputBase, useButtonBase). Behavior is still provider-aware: change <code>{'<DuiProvider size="...">'}</code> to restyle this component along with the rest of the tree.
        </DocNote>
      </DocSection>
      </div>
  );
}
