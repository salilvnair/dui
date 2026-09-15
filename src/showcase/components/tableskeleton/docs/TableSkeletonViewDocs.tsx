import { DocSection, PropTable, FeatureGrid } from '../../../shared/DocComponents';

export function TableSkeletonViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Columns declared like the real table', color: 'var(--color-primary)' },
          { label: 'flex column for the one width not known in advance', color: 'var(--color-success)' },
          { label: 'Bars drawn shorter than their column, as content is', color: 'var(--color-info)' },
          { label: 'Fixed rows, or fill the available height', color: 'var(--color-warning)' },
        ]} />
      </DocSection>

      <DocSection
        title="Overview"
        description="The placeholder a table shows while its rows are loading. Declaring the same column widths as the real table is the whole point: a skeleton whose shape differs from what replaces it produces a visible jump, which is worse than showing nothing."
      >
        <></>
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'columns', type: 'TableSkeletonColumn[]', required: true, description: 'The shape being stood in for.' },
          { name: 'rows', type: 'number', description: 'Fixed row count. Omit to fill the available height.' },
          { name: 'rowHeight', type: 'number', description: 'Height of one row, matching the table this stands in for.' },
          { name: 'leadingIcon', type: 'boolean', description: 'A small square before the first column — a file or status icon.' },
          { name: 'fill', type: 'number', description: 'Default bar length as a fraction of the column, when a column does not set its own.' },
          { name: 'className', type: 'string', description: 'Additional classes.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline styles.' },
        ]} />
      </DocSection>

      <DocSection title="TableSkeletonColumn">
        <PropTable props={[
          { name: 'width', type: "number | string | 'flex'", required: true, description: 'A number is fixed px; a string is used as-is; flex takes the remaining space, which is how a name column behaves.' },
          { name: 'fill', type: 'number', description: 'Draw this cell bar shorter than its column, as real content usually is.' },
          { name: 'align', type: "'left' | 'right'", description: 'Which edge the bar sits against.' },
        ]} />
      </DocSection>
    </div>
  );
}
