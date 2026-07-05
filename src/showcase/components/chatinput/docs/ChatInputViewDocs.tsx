import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference, RadiusReference } from '../../../shared/DocComponents';

export function ChatInputViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Auto-growing textarea (up to 96px)', color: 'var(--color-primary)' },
          { label: 'Enter to send, Shift+Enter for newline', color: 'var(--color-success)' },
          { label: 'Optional file attach button', color: 'var(--color-info)' },
          { label: 'Send button disables when empty', color: 'var(--color-warning)' },
          { label: 'Disabled state', color: '#a855f7' },
          { label: 'Custom border radius + accent color', color: '#ec4899' },
          { label: 'DuiProvider size context', color: '#14b8a6' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'value', type: 'string', required: true, description: 'Current textarea value (controlled).' },
          { name: 'onChange', type: '(value: string) => void', required: true, description: 'Called with the new textarea value on every keystroke.' },
          { name: 'onSend', type: '() => void', required: true, description: 'Called when the user presses the send button or hits Enter (without Shift) with non-blank content.' },
          { name: 'onAttach', type: '(files: FileList) => void', description: 'When provided, shows a paperclip button that opens a hidden multi-file input; called with the selected FileList.' },
          { name: 'placeholder', type: 'string', default: "'Type a message…'", description: 'Textarea placeholder text.' },
          { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the textarea and send button.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls height, font size, and icon size. Falls back to DuiProvider context.' },
          { name: 'borderRadius', type: 'DuiRadius | number', description: 'Override the container border radius.' },
          { name: 'color', type: 'string', default: 'var(--color-primary)', description: 'Accent color used for the send button background when the input is non-empty.' },
          { name: 'className', type: 'string', description: 'Additional class names on the outer container.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the outer container.' },
        ]} />
      </DocSection>

      <DocNote type="tip">
        The Enter key sends the message and Shift+Enter inserts a newline — this matches the convention used by most chat apps. There is no built-in max-length or markdown preview; layer those on top if needed.
      </DocNote>

      <DocNote type="warning">
        onSend does not clear value automatically — the parent owns state, so you must reset value (typically to an empty string) inside your onSend handler.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="ChatInputView reads its dimensions from the shared input category base hook (useInputBase). Omitting size, width, borderRadius, or color on ChatInputView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every input-category component at once."
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
