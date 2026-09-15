import { TableSkeletonView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function TableSkeletonViewExamples() {
  return (
    <>
      <ExampleCard
        title="Standing in for a table"
        description="Columns are declared the same way the real table declares them, so the skeleton does not jump when the data lands"
        code={'<TableSkeletonView rows={5} columns={[{ width: 60 }, { width: "flex" }, { width: 70, align: "right" }]} />'}
      >
        <div style={{ width: '100%', border: '1px solid var(--color-surface-border)', borderRadius: 8, padding: 8 }}>
          <TableSkeletonView
            rows={5}
            rowHeight={34}
            columns={[
              { width: 60 },
              { width: 'flex', fill: 0.7 },
              { width: 70, align: 'right', fill: 0.5 },
              { width: 60, align: 'right', fill: 0.4 },
            ]}
          />
        </div>
      </ExampleCard>

      <ExampleCard
        title="With a leading icon"
        description="A small square before the first column, for a file or status glyph"
        code={'<TableSkeletonView leadingIcon rows={4} … />'}
      >
        <div style={{ width: '100%', border: '1px solid var(--color-surface-border)', borderRadius: 8, padding: 8 }}>
          <TableSkeletonView
            rows={4}
            leadingIcon
            rowHeight={30}
            columns={[{ width: 'flex', fill: 0.6 }, { width: 90, align: 'right', fill: 0.5 }]}
          />
        </div>
      </ExampleCard>
    </>
  );
}
