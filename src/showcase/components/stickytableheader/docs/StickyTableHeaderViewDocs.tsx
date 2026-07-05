import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference } from '../../../shared/DocComponents';

export function StickyTableHeaderViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Sticky header row', color: 'var(--color-primary)' },
          { label: 'Optional frozen first column', color: 'var(--color-success)' },
          { label: 'Scrollable max-height container', color: 'var(--color-info)' },
          { label: 'Generic — works with any row type', color: 'var(--color-warning)' },
          { label: 'Per-column custom render', color: '#a855f7' },
          { label: 'DUI size context (font/padding)', color: '#ec4899' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'columns', type: 'StickyTableColumn<T>[]', required: true, description: 'Column definitions: { key, label, width?, render(row) }.' },
          { name: 'rows', type: 'T[]', required: true, description: 'Row data to render, one <tr> per item.' },
          { name: 'keyField', type: 'keyof T', required: true, description: 'Property on each row used as the React key.' },
          { name: 'freezeFirstColumn', type: 'boolean', default: 'true', description: 'Pin the first column while scrolling horizontally.' },
          { name: 'maxHeight', type: 'number', default: '360', description: 'Max pixel height of the scroll container before the header sticks.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls header/cell font size and padding. Falls back to DuiProvider context.' },
          { name: 'className', type: 'string', description: 'Additional class names on the outer scroll container.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override on the outer scroll container.' },
        ]} />
      </DocSection>

      <DocNote type="tip">
        StickyTableHeaderView uses the same useTableBase hook as SortableHeaderView, TablePaginationView, and EditableCellView — pass a matching size/color across all four for a visually consistent data grid.
      </DocNote>

      <DocNote type="info">
        For very large row counts (thousands+), pair this with VirtualizedListView-style windowing at the row-rendering layer, since StickyTableHeaderView mounts every row in the rows array.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="StickyTableHeaderView reads its dimensions from the shared table category base hook (useTableBase). Omitting size or color on StickyTableHeaderView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every table-category component at once."
      >
        <FeatureGrid features={[
          { label: 'useTableBase', color: 'var(--color-primary)' },
          { label: 'Falls back to DuiProvider context', color: 'var(--color-success)' },
          { label: 'size / color', color: 'var(--color-info)' },
        ]} />
        <SizeReference sizes={[
          { size: 'xxs', height: '18px', font: '8px', desc: 'header 10px' },
          { size: 'xs', height: '22px', font: '9px', desc: 'header 10px' },
          { size: 'sm', height: '26px', font: '10px', desc: 'header 9px' },
          { size: 'md', height: '30px', font: '11px', desc: 'header 9px' },
          { size: 'lg', height: '36px', font: '12px', desc: 'header 10px' },
          { size: 'xl', height: '40px', font: '13px', desc: 'header 10px' },
          { size: 'xxl', height: '46px', font: '14px', desc: 'header 10px' },
          { size: 'xxxl', height: '54px', font: '16px', desc: 'header 10px' },
        ]} />
        <DocNote type="info">
          These values come from the Table category tokens in <code>DuiTokens.ts</code>. Set a local <code>size</code> prop to override the provider default for this instance only, or change <code>{'<DuiProvider size="...">'}</code> to restyle every table-category component in the tree.
        </DocNote>
      </DocSection>
      </div>
  );
}
