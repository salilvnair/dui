import { DocSection, PropTable, FeatureGrid } from '../../../shared/DocComponents';

export function IssueCardViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Reference, title, chips, media, footer', color: 'var(--color-primary)' },
          { label: 'Footer split — owner and mark left, meta right', color: 'var(--color-success)' },
          { label: 'Selected lifts the card, for drag and for focus', color: 'var(--color-info)' },
          { label: 'A matching skeleton, so a board does not reflow', color: 'var(--color-warning)' },
        ]} />
      </DocSection>

      <DocSection
        title="Overview"
        description="The card a tracker board is built from. Everything but the title is a slot, because the things that go on an issue card — an avatar, a priority ring, a stale chip — differ per tracker, and a component that tried to own them would be wrong everywhere."
      >
        <></>
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'title', type: 'string', required: true, description: 'The issue title.' },
          { name: 'reference', type: 'string', description: 'The identifier, shown as given — #41, PROJ-8.' },
          { name: 'chips', type: 'ReactNode', description: 'Labels under the title.' },
          { name: 'media', type: 'ReactNode', description: 'Evidence: a screenshot strip, a thumbnail.' },
          { name: 'owner', type: 'ReactNode', description: 'The left of the footer: an avatar, or the word for having no owner.' },
          { name: 'mark', type: 'ReactNode', description: 'Beside the owner: priority, state.' },
          { name: 'meta', type: 'ReactNode', description: 'The right of the footer: age, comment count, a stale chip.' },
          { name: 'selected', type: 'boolean', description: 'Lift the card — selected, or dragged over.' },
          { name: 'onClick', type: '() => void', description: 'Card clicked.' },
          { name: 'tooltip', type: 'string', description: 'Native tooltip.' },
          { name: 'accentColor', type: 'string', description: 'Selection accent.' },
        ]} />
      </DocSection>

      <DocSection title="IssueCardSkeletonView">
        <PropTable props={[
          { name: 'media', type: 'boolean', description: 'Leave room for the evidence strip, when the board shows screenshots.' },
          { name: 'titleFill', type: 'number', description: 'How much of the title line to draw — vary it across a column so the placeholder does not look printed.' },
        ]} />
      </DocSection>
    </div>
  );
}
