import { useState } from 'react';
import { IssueCardView, IssueCardSkeletonView, BadgeChipView, PriorityMarkView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function IssueCardViewExamples() {
  const [selected, setSelected] = useState('41');

  return (
    <>
      <ExampleCard
        title="A card on a board"
        description="Reference, title, chips, and a footer split between who owns it and what it is"
        code={'<IssueCardView reference="#41" title="…" owner={<Avatar />} mark={<PriorityMarkView level="high" />} />'}
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 12, width: '100%' }}>
          <IssueCardView
            reference="#41"
            title="Editor drops the last character on paste"
            selected={selected === '41'}
            onClick={() => setSelected('41')}
            chips={<>
              <BadgeChipView size="2xs" tone="var(--color-error)">bug</BadgeChipView>
              <BadgeChipView size="2xs" tone="var(--color-info)">editor</BadgeChipView>
            </>}
            owner={<span style={{ fontSize: 11 }}>salil</span>}
            mark={<PriorityMarkView level="high" showLabel={false} />}
            meta={<span style={{ fontSize: 11 }}>4d · 3 comments</span>}
          />
          <IssueCardView
            reference="PROJ-8"
            title="Add a props table to every panel"
            selected={selected === 'PROJ-8'}
            onClick={() => setSelected('PROJ-8')}
            chips={<BadgeChipView size="2xs" tone="var(--color-success)">docs</BadgeChipView>}
            owner={<span style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>unassigned</span>}
            mark={<PriorityMarkView level="medium" showLabel={false} />}
            meta={<span style={{ fontSize: 11 }}>42d</span>}
          />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Before it arrives"
        description="IssueCardSkeletonView stands in with the same shape, so the board does not reflow when the data lands"
        code={'<IssueCardSkeletonView titleFill={0.7} />'}
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 12, width: '100%' }}>
          <IssueCardSkeletonView titleFill={0.8} />
          <IssueCardSkeletonView titleFill={0.5} />
          <IssueCardSkeletonView media titleFill={0.65} />
        </div>
      </ExampleCard>
    </>
  );
}
