import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference } from '../../../shared/DocComponents';

export function FeedbackWidgetViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Thumbs up / down toggle', color: 'var(--color-primary)' },
          { label: 'Comment field reveals after voting', color: 'var(--color-success)' },
          { label: 'Optional submit button', color: 'var(--color-info)' },
          { label: 'Custom question text', color: 'var(--color-warning)' },
          { label: 'Custom accent color', color: '#a855f7' },
          { label: 'DuiProvider size context', color: '#14b8a6' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'question', type: 'string', default: "'Was this helpful?'", description: 'Prompt text shown next to the vote buttons.' },
          { name: 'vote', type: "'up' | 'down' | null", required: true, description: 'Current vote (controlled). null means no vote cast yet.' },
          { name: 'onVote', type: "(vote: 'up' | 'down') => void", required: true, description: 'Called when a thumbs button is clicked. Casting a vote automatically reveals the comment field.' },
          { name: 'comment', type: 'string', description: 'Current comment text (controlled).' },
          { name: 'onCommentChange', type: '(comment: string) => void', description: 'Called on comment input change. The comment field is only rendered when both this and a vote are present.' },
          { name: 'onSubmit', type: '() => void', description: 'When provided (alongside onCommentChange), renders a Send button next to the comment field.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls button size and font size. Falls back to DuiProvider context.' },
          { name: 'color', type: 'string', default: 'var(--color-primary)', description: 'Accent color for the active vote button and Send button.' },
          { name: 'className', type: 'string', description: 'Additional class names on the outer wrapper.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the outer wrapper.' },
        ]} />
      </DocSection>

      <DocNote type="tip">
        The comment field only renders once the user has voted (internal showComment state flips true on first vote) — you don't need to manage that visibility yourself, just supply onCommentChange if you want the field to be possible at all.
      </DocNote>

      <DocNote type="info">
        For a fuller survey with a numeric scale instead of thumbs, use NpsSurveyView — the two share the same comment/follow-up pattern but differ in the primary input (binary vs 0-10).
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="FeedbackWidgetView reads its dimensions from the shared button category base hook (useButtonBase). Omitting size, width, borderRadius, or color on FeedbackWidgetView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every button-category component at once."
      >
        <FeatureGrid features={[
          { label: 'useButtonBase', color: 'var(--color-primary)' },
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
          These values come from the Button category tokens in <code>DuiTokens.ts</code>. Set a local <code>size</code> prop to override the provider default for this instance only, or change <code>{'<DuiProvider size="...">'}</code> to restyle every button-category component in the tree.
        </DocNote>
      </DocSection>
      </div>
  );
}
