import { DocSection, PropTable, FeatureGrid, DocNote } from '../../../shared/DocComponents';

export function TagInputViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Pill-style tag chips', color: 'var(--color-primary)' },
          { label: 'Enter or comma to add', color: 'var(--color-success)' },
          { label: 'Backspace removes last tag', color: 'var(--color-info)' },
          { label: 'Add on blur', color: 'var(--color-warning)' },
          { label: 'Duplicate prevention', color: '#a855f7' },
          { label: 'maxTags limit', color: '#ec4899' },
          { label: 'Disabled state', color: '#14b8a6' },
          { label: 'Custom accent color', color: '#f97316' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'tags', type: 'string[]', required: true, description: 'Controlled array of current tag values.' },
          { name: 'onChange', type: '(tags: string[]) => void', required: true, description: 'Called with the updated tag array whenever a tag is added or removed.' },
          { name: 'placeholder', type: 'string', default: "'Add tag…'", description: 'Placeholder shown in the input when no tags exist.' },
          { name: 'accentColor', type: 'string', description: 'Custom color for tag chips. Defaults to var(--color-tag-bg) / var(--color-tag-text) theme variables.' },
          { name: 'maxTags', type: 'number', description: 'Maximum number of tags allowed. Input is hidden once the limit is reached.' },
          { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables adding and removing tags. Reduces opacity to 0.6.' },
          { name: 'className', type: 'string', description: 'Extra CSS class applied to the container.' },
        ]} />
      </DocSection>

      <DocSection title="Keyboard interactions">
        <PropTable props={[
          { name: 'Enter', type: 'key', description: 'Confirms the current input text as a new tag.' },
          { name: 'Comma (,)', type: 'key', description: 'Also confirms the current input as a new tag.' },
          { name: 'Backspace', type: 'key', description: 'When the input is empty, removes the last tag in the list.' },
          { name: 'Blur', type: 'event', description: 'Automatically adds the current input text as a tag if non-empty.' },
        ]} />
      </DocSection>

      <DocSection title="Notes">
        <DocNote type="info">
          Duplicate tags are silently rejected — adding a tag value that already exists in the array does nothing.
        </DocNote>
        <DocNote type="tip">
          When <code>accentColor</code> is set, both the chip background and border are derived from that color using <code>color-mix</code> at 15% and 25% opacity respectively.
        </DocNote>
      </DocSection>
    </div>
  );
}
