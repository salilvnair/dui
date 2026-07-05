import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference } from '../../../shared/DocComponents';

export function EditableCellViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Click to enter edit mode', color: 'var(--color-primary)' },
          { label: 'Enter commits, Escape cancels', color: 'var(--color-success)' },
          { label: 'Auto-focus + select on edit', color: 'var(--color-info)' },
          { label: 'Blur commits the draft value', color: 'var(--color-warning)' },
          { label: 'Placeholder for empty values', color: '#a855f7' },
          { label: 'Hover border affordance', color: '#ec4899' },
          { label: 'Built on useTableBase', color: '#14b8a6' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'value', type: 'string', required: true, description: 'Current committed value shown in display mode.' },
          { name: 'onChange', type: '(value: string) => void', required: true, description: 'Called with the new value on commit (Enter key or blur).' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls cell font size and padding.' },
          { name: 'color', type: 'string', default: 'var(--color-primary)', description: 'Accent color for the edit-mode input border.' },
          { name: 'placeholder', type: 'string', description: 'Text shown in place of an empty value in display mode. Falls back to "—" if omitted.' },
          { name: 'className', type: 'string', description: 'Additional class names on the display <div> or edit <input>.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override on the display <div> or edit <input>.' },
        ]} />
      </DocSection>

      <DocNote type="tip">
        The draft value is local component state — onChange only fires on commit (Enter or blur), not on every keystroke. If you need live validation while typing, you'll need to build a custom cell rather than reuse EditableCellView.
      </DocNote>

      <DocNote type="warning">
        Pressing Escape discards the draft without calling onChange, reverting the display back to the last committed value. Blur, however, always commits — clicking away from the cell is treated the same as pressing Enter.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="EditableCellView reads its dimensions from the shared table category base hook (useTableBase). Omitting size or color on EditableCellView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every table-category component at once."
      >
        <FeatureGrid features={[
          { label: 'useTableBase', color: 'var(--color-primary)' },
          { label: 'Falls back to DuiProvider context', color: 'var(--color-success)' },
          { label: 'size / color', color: 'var(--color-info)' },
        ]} />
        <SizeReference sizes={[
          { size: 'xxs', height: '18px', font: '8px', desc: 'header 10px' },
          { size: 'xs', height: '22px', font: '9px', desc: 'header 10px' },
          { size: 'sm', height: '26px', font: '10px', desc: 'header 9px' },
          { size: 'md', height: '30px', font: '11px', desc: 'header 9px' },
          { size: 'lg', height: '36px', font: '12px', desc: 'header 10px' },
          { size: 'xl', height: '40px', font: '13px', desc: 'header 10px' },
          { size: 'xxl', height: '46px', font: '14px', desc: 'header 10px' },
          { size: 'xxxl', height: '54px', font: '16px', desc: 'header 10px' },
        ]} />
        <DocNote type="info">
          These values come from the Table category tokens in <code>DuiTokens.ts</code>. Set a local <code>size</code> prop to override the provider default for this instance only, or change <code>{'<DuiProvider size="...">'}</code> to restyle every table-category component in the tree.
        </DocNote>
      </DocSection>
      </div>
  );
}
