import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference } from '../../../shared/DocComponents';

export function DataTableViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Sortable columns (client-side)', color: 'var(--color-primary)' },
          { label: 'Expandable rows with custom renderer', color: 'var(--color-success)' },
          { label: 'Row click handler', color: 'var(--color-info)' },
          { label: 'Striped rows', color: 'var(--color-warning)' },
          { label: 'Custom cell renderer per column', color: '#a855f7' },
          { label: 'Column alignment (left, center, right)', color: '#ec4899' },
          { label: 'Custom column widths (CSS or 1fr)', color: '#14b8a6' },
          { label: 'Empty state via EmptyStateView', color: '#f97316' },
          { label: 'DuiProvider size context', color: 'var(--color-primary)' },
          { label: 'maxHeight with scroll overflow', color: 'var(--color-success)' },
          { label: 'Push mode for expand (expanded rows push siblings)', color: 'var(--color-info)' },
          { label: 'Generic type parameter T for row data', color: 'var(--color-warning)' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'columns', type: 'DataTableColumn<T>[]', required: true, description: 'Column definitions.' },
          { name: 'rows', type: 'T[]', required: true, description: 'Data rows. T must extend Record<string, unknown>.' },
          { name: 'keyField', type: 'string', default: "'id'", description: "The row property used as the React key and for expand/collapse state tracking." },
          { name: 'onRowClick', type: '(row: T) => void', description: 'Called when the user clicks a data row. Makes rows visually clickable (pointer cursor + hover highlight).' },
          { name: 'renderExpanded', type: '(row: T) => ReactNode', description: 'When provided, each row gets an expand chevron in the first column. Clicking it shows the returned node below that row.' },
          { name: 'emptyTitle', type: 'string', default: "'No data'", description: 'Title shown in the EmptyStateView when rows is empty.' },
          { name: 'emptyMessage', type: 'string', description: 'Description text shown in the EmptyStateView when rows is empty.' },
          { name: 'striped', type: 'boolean', default: 'false', description: 'When true, alternates row backgrounds using var(--color-table-stripe).' },
          { name: 'compact', type: 'boolean', default: 'false', description: 'Forces sm-size row heights. Prefer size prop for token-aligned sizing.' },
          { name: 'size', type: 'DuiSize', description: 'Row height and font size. Falls back to DuiProvider context when omitted.' },
          { name: 'sortable', type: 'boolean', description: 'Reserved prop (currently client-side sort is configured per-column via column.sortable).' },
          { name: 'maxHeight', type: 'string', description: 'CSS max-height for the table body scroll container (only active when renderExpanded is not set).' },
          { name: 'className', type: 'string', description: 'Additional class names for the outer border container div.' },
        ]} />
      </DocSection>

      <DocSection title="DataTableColumn shape">
        <PropTable props={[
          { name: 'key', type: 'string', required: true, description: 'The row property key to read the cell value from.' },
          { name: 'label', type: 'string', required: true, description: 'Header label text (rendered uppercase).' },
          { name: 'width', type: 'string | number', description: "CSS column width for the grid-template-columns. Defaults to '1fr'." },
          { name: 'sortable', type: 'boolean', description: 'When true, clicking the column header sorts the table by this column. Clicking again reverses the sort order.' },
          { name: 'renderCell', type: '(row: T, value: unknown) => ReactNode', description: 'Custom cell renderer. When omitted, String(value) is rendered with ellipsis overflow.' },
          { name: 'align', type: "'left' | 'center' | 'right'", description: "Text alignment of header and cells. Defaults to 'left'." },
        ]} />
      </DocSection>

      <DocSection title="Sizes (row heights)">
        <SizeReference sizes={[
          { size: 'xs', height: '24px row', font: '10px', desc: 'Dense' },
          { size: 'sm', height: '28px row', font: '11px', desc: 'Compact' },
          { size: 'md', height: '32px row', font: '12px', desc: 'Default' },
          { size: 'lg', height: '36px row', font: '13px', desc: 'Large' },
          { size: 'xl', height: '40px row', font: '14px', desc: 'XL' },
        ]} />
      </DocSection>

      <DocNote type="info">
        When renderExpanded is provided, the table operates in "push mode": expanded row content is rendered inline below the row, pushing siblings down. maxHeight scroll is disabled in push mode because the body grows naturally with the expanded rows.
      </DocNote>

      <DocNote type="tip">
        Use the renderCell prop to render custom cell content such as status badges, action buttons, or ChipView components. The function receives both the full row object and the specific cell value.
      </DocNote>
    </div>
  );
}
