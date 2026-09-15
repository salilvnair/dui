import { PriorityMarkView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function PriorityMarkViewExamples() {
  return (
    <>
      <ExampleCard
        title="Five levels"
        description="A ring whose fill says how urgent, and the word beside it"
        code={'<PriorityMarkView level="urgent" />'}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
          {(['urgent', 'high', 'medium', 'low', 'none'] as const).map(l => (
            <PriorityMarkView key={l} level={l} />
          ))}
        </div>
      </ExampleCard>

      <ExampleCard
        title="The ring alone"
        description="In a dense table the word is noise — the ring still carries the level"
        code={'<PriorityMarkView level="high" showLabel={false} />'}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
          {(['urgent', 'high', 'medium', 'low', 'none'] as const).map(l => (
            <PriorityMarkView key={l} level={l} showLabel={false} />
          ))}
        </div>
      </ExampleCard>

      <ExampleCard
        title="Your own words"
        description="For a tracker that calls Urgent something else"
        code={'<PriorityMarkView level="urgent" label="P0" />'}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
          <PriorityMarkView level="urgent" label="P0" />
          <PriorityMarkView level="high" label="P1" />
          <PriorityMarkView level="medium" label="P2" />
          <PriorityMarkView level="low" label="P3" />
        </div>
      </ExampleCard>
    </>
  );
}
