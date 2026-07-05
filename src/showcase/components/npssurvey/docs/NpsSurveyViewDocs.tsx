import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference } from '../../../shared/DocComponents';

export function NpsSurveyViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: '0-10 Net Promoter Score grid', color: 'var(--color-primary)' },
          { label: 'Automatic detractor/passive/promoter coloring', color: 'var(--color-success)' },
          { label: 'Hover preview before commit', color: 'var(--color-info)' },
          { label: 'Optional follow-up text + submit', color: 'var(--color-warning)' },
          { label: 'Custom question text', color: '#a855f7' },
          { label: 'DuiProvider size context', color: '#14b8a6' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'question', type: 'string', default: "'How likely are you to recommend us to a friend?'", description: 'The survey prompt shown above the score grid.' },
          { name: 'score', type: 'number | null', required: true, description: 'Currently selected score, 0-10 (controlled). null means unanswered.' },
          { name: 'onScoreChange', type: '(score: number) => void', required: true, description: 'Called when the user clicks a score cell. Selecting a score reveals the follow-up field.' },
          { name: 'followUp', type: 'string', description: 'Current follow-up text value (controlled).' },
          { name: 'onFollowUpChange', type: '(text: string) => void', description: 'Called on follow-up input change. The field only renders once a score is set and this handler is provided.' },
          { name: 'onSubmit', type: '() => void', description: 'When provided (alongside onFollowUpChange), renders a Submit button next to the follow-up field.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls font size. Falls back to DuiProvider context.' },
          { name: 'color', type: 'string', default: 'var(--color-primary)', description: 'Accent color used only for the Submit button — score cells use a fixed red/amber/green scale regardless of this prop.' },
          { name: 'className', type: 'string', description: 'Additional class names on the outer wrapper.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the outer wrapper.' },
        ]} />
      </DocSection>

      <DocNote type="info">
        Score coloring is fixed and not themeable via the color prop: 0-6 uses var(--color-error) (detractor), 7-8 uses var(--color-warning) (passive), 9-10 uses var(--color-success) (promoter) — this follows the standard NPS convention.
      </DocNote>

      <DocNote type="tip">
        For a lighter-weight binary reaction (thumbs up/down) instead of a 0-10 scale, use FeedbackWidgetView — both share the same "reveal a comment field after answering" pattern.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="NpsSurveyView reads its dimensions from the shared button category base hook (useButtonBase). Omitting size, width, borderRadius, or color on NpsSurveyView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every button-category component at once."
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
