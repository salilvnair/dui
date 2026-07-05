import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference, RadiusReference } from '../../../shared/DocComponents';

export function MentionInputViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: '@mention autocomplete', color: 'var(--color-primary)' },
          { label: 'Caret-aware @mention matching', color: 'var(--color-success)' },
          { label: 'Portal-rendered suggestion menu', color: 'var(--color-info)' },
          { label: 'Fully controlled value', color: 'var(--color-warning)' },
          { label: 'Disabled state', color: '#a855f7' },
          { label: 'Custom borderRadius + accent color', color: '#ec4899' },
          { label: 'DuiProvider size context', color: '#14b8a6' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'value', type: 'string', required: true, description: 'Controlled textarea value.' },
          { name: 'onChange', type: '(value: string) => void', required: true, description: 'Called with the new text on every keystroke, including after a mention is inserted.' },
          { name: 'users', type: 'MentionUser[]', required: true, description: 'Candidate list to search against. Filtered client-side, case-insensitively, on the text typed after @.' },
          { name: 'placeholder', type: 'string', default: "'Write a comment… use @ to mention'", description: 'Placeholder text shown when empty.' },
          { name: 'rows', type: 'number', default: '3', description: 'Initial textarea row count. The field is vertically resizable by the user.' },
          { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the textarea.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls font size and padding. Falls back to DuiProvider context.' },
          { name: 'borderRadius', type: 'DuiRadius | number', description: 'Named radius preset or raw px number for the textarea corners.' },
          { name: 'color', type: 'string', default: 'var(--color-primary)', description: 'Accent color used for mention entries in the suggestion menu.' },
          { name: 'className', type: 'string', description: 'Additional class names on the outer wrapper.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the outer wrapper.' },
        ]} />
      </DocSection>

      <DocSection title="MentionUser shape">
        <PropTable props={[
          { name: 'id', type: 'string', required: true, description: 'Stable identifier for the user/entity.' },
          { name: 'label', type: 'string', required: true, description: 'Display name inserted after @ and shown in the suggestion list.' },
        ]} />
      </DocSection>

      <DocNote type="info">
        The suggestion menu is rendered via a React portal into document.body and positioned with getBoundingClientRect, so it escapes overflow:hidden ancestors (e.g. a scrollable comment panel) without any z-index wrangling on your part.
      </DocNote>

      <DocNote type="tip">
        Matching is triggered by a trailing @word pattern up to the caret, not the whole string — so users can type multiple mentions or continue typing after inserting one without the menu reopening unexpectedly.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="MentionInputView reads its dimensions from the shared input category base hook (useInputBase). Omitting size, width, borderRadius, or color on MentionInputView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every input-category component at once."
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
          These values come from the Input category tokens in <code>DuiTokens.ts</code>. Set a local <code>size</code> prop to override the provider default for this instance only, or change <code>{'<DuiProvider size="...">'}</code> to restyle every input-category component in the tree.
        </DocNote>
      </DocSection>
      </div>
  );
}
