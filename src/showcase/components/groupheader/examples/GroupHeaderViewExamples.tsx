import { GroupHeaderView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function GroupHeaderViewExamples() {
  return (
    <>
      <ExampleCard
        title="A label over a pile"
        description="Small caps, because it is a label rather than a heading"
        code={'<GroupHeaderView name="In progress" count={4} />'}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, width: '100%' }}>
          <GroupHeaderView name="In progress" count={4} />
          <GroupHeaderView name="Blocked" count={2} tone="var(--color-error)" />
          <GroupHeaderView name="Done" count={31} tone="var(--color-success)" />
        </div>
      </ExampleCard>

      <ExampleCard
        title="With a summary"
        description="Something the group is worth saying beyond its size"
        code={'<GroupHeaderView name="Unassigned" count={7} summary="oldest 42 days" />'}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, width: '100%' }}>
          <GroupHeaderView
            name="Unassigned"
            count={7}
            tone="var(--color-warning)"
            summary={<span>oldest <b>42 days</b></span>}
          />
          <GroupHeaderView name="This sprint" count="12 of 18" summary="closes Friday" />
        </div>
      </ExampleCard>
    </>
  );
}
