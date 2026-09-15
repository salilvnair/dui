import { DocSection, PropTable, FeatureGrid, DocNote } from '../../../shared/DocComponents';

export function SearchFieldViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Enter runs a search, rather than filtering as you type', color: 'var(--color-primary)' },
          { label: 'History offered on focus', color: 'var(--color-success)' },
          { label: 'Drop one entry, or clear the lot from the heading', color: 'var(--color-info)' },
          { label: 'Suggestions carry meta text and icons', color: 'var(--color-warning)' },
          { label: 'Trailing slot for a count or a spinner', color: '#a855f7' },
        ]} />
      </DocSection>

      <DocSection
        title="Overview"
        description="The filter box's sibling that runs something. FilterInputView narrows a list on every keystroke and never leaves the page; this one collects a term, acts on it when you press Enter, and remembers what you asked for last time."
      >
        <></>
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'value', type: 'string', required: true, description: 'Current text.' },
          { name: 'onChange', type: '(value: string) => void', required: true, description: 'Fired on every keystroke.' },
          { name: 'onSearch', type: '(value: string) => void', description: 'Enter, and the icon tooltip. Omit for a box that only holds a term.' },
          { name: 'onClear', type: '() => void', description: 'Fired by the clear button, in addition to onChange with an empty string.' },
          { name: 'suggestions', type: '(string | SearchSuggestion)[]', description: 'Offered under the box on focus. Strings are entries with no detail.' },
          { name: 'suggestionsLabel', type: 'string', description: 'Heading over them — what they are, in a word or two.' },
          { name: 'onPick', type: '(value: string) => void', description: 'A suggestion was chosen.' },
          { name: 'onForget', type: '(value: string) => void', description: 'Given, each row gets an X that drops that entry.' },
          { name: 'onClearAll', type: '() => void', description: 'Given, the heading gets a control that clears the whole history.' },
          { name: 'maxSuggestions', type: 'number', description: 'Most to offer at once. Beyond this the list stops being a shortcut.' },
          { name: 'suggestionZIndex', type: 'number', description: 'Above modals by default, which is where this is usually used.' },
          { name: 'trailing', type: 'ReactNode', description: 'Sits between the text and the clear button — a count, a spinner.' },
          { name: 'size', type: 'DuiSize', default: "'md'", description: 'Shared size scale.' },
          { name: 'width', type: 'string | number', description: 'Explicit width.' },
          { name: 'accentColor', type: 'string', description: 'Accent for the icon and focus ring.' },
          { name: 'autoFocus', type: 'boolean', description: 'Focus on mount.' },
          { name: 'testId', type: 'string', description: 'Lands on the root as data-testid.' },
        ]} />
      </DocSection>

      <DocSection title="SearchSuggestion">
        <PropTable props={[
          { name: 'value', type: 'string', required: true, description: 'The term, and what onPick receives.' },
          { name: 'meta', type: 'string', description: 'A dimmed second line — a count, a date, a source.' },
          { name: 'icon', type: 'ReactNode', description: 'Glyph before the value.' },
        ]} />
      </DocSection>

      <DocSection title="Filter or search?">
        <DocNote type="tip">
          If typing narrows something already on screen, use FilterInputView. If typing collects a
          term you then act on, use this.
        </DocNote>
      </DocSection>
    </div>
  );
}
