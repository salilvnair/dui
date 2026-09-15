import { DocSection, PropTable, FeatureGrid } from '../../../shared/DocComponents';

export function LoadingStateViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'The subject drawn large, rather than a generic spinner', color: 'var(--color-primary)' },
          { label: 'Says so itself once the wait stops being ordinary', color: 'var(--color-warning)' },
          { label: 'Offers an escape only after it has gone long', color: 'var(--color-error)' },
          { label: 'Step hints under the message', color: 'var(--color-info)' },
          { label: 'Sized to match EmptyStateView', color: 'var(--color-success)' },
        ]} />
      </DocSection>

      <DocSection
        title="Overview"
        description="The screen shown while something is being fetched. The design position is that a spinner tells the reader nothing: the icon is the thing being waited for, and if the wait runs long the component says so rather than leaving them to guess whether it has hung."
      >
        <></>
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'title', type: 'string', required: true, description: 'What is happening.' },
          { name: 'message', type: 'string', description: 'A sentence under it.' },
          { name: 'icon', type: 'ReactNode', description: 'The thing being waited for, drawn large.' },
          { name: 'slowAfterSeconds', type: 'number', description: 'Seconds after which the wait stops being ordinary. 0 disables it.' },
          { name: 'slowMessage', type: 'string', description: 'What to say once it has been slow. Replaces message.' },
          { name: 'action', type: '{ label: string; onClick: () => void }', description: 'Offered only once the wait has gone long — Cancel, Try again, Go back.' },
          { name: 'hints', type: '{ key: ReactNode; text: string }[]', description: 'Shown under the message: what is being fetched, step by step.' },
          { name: 'compact', type: 'boolean', description: 'Matches EmptyStateView, so the two swap without the layout moving.' },
          { name: 'medallionSize', type: 'number', description: 'The medallion box in px. Worth raising for a state that owns a whole panel — 54px centred in an empty tab reads as something that failed to load.' },
          { name: 'messageWidth', type: 'number | string', default: "'52ch'", description: 'How wide the message may run. In ch, so it stays a measure rather than a pixel guess.' },
          { name: 'accentColor', type: 'string', description: 'Medallion tint.' },
          { name: 'className', type: 'string', description: 'Additional classes.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline styles.' },
        ]} />
      </DocSection>
    </div>
  );
}
