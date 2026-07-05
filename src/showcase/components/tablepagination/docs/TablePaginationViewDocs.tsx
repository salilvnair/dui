import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference } from '../../../shared/DocComponents';

export function TablePaginationViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Rows-per-page selector', color: 'var(--color-primary)' },
          { label: 'Page-number footer', color: 'var(--color-success)' },
          { label: 'Auto-computed "from–to of total" range', color: 'var(--color-info)' },
          { label: 'Configurable rowsPerPageOptions', color: 'var(--color-warning)' },
          { label: 'Built on PaginationView + SelectInputView', color: '#a855f7' },
          { label: 'Rows-per-page + page footer layout', color: '#ec4899' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'page', type: 'number', required: true, description: 'Current 1-indexed page number.' },
          { name: 'totalRows', type: 'number', required: true, description: 'Total row count across all pages.' },
          { name: 'rowsPerPage', type: 'number', required: true, description: 'Number of rows shown per page.' },
          { name: 'onPageChange', type: '(page: number) => void', required: true, description: 'Called when the user navigates to a different page.' },
          { name: 'onRowsPerPageChange', type: '(rowsPerPage: number) => void', required: true, description: 'Called when the user changes the rows-per-page selector. Consider resetting page to 1 in this handler.' },
          { name: 'rowsPerPageOptions', type: 'number[]', default: '[10, 25, 50, 100]', description: 'Options shown in the rows-per-page dropdown.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls font size and padding density.' },
          { name: 'color', type: 'string', description: 'Accent color for the page control; defaults to var(--color-primary) via useTableBase.' },
          { name: 'className', type: 'string', description: 'Additional class names on the outer footer container.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override on the outer footer container.' },
        ]} />
      </DocSection>

      <DocNote type="tip">
        TablePaginationView does not slice your data itself — it is purely a controlled footer UI. Compute the visible slice in the parent using page and rowsPerPage (or forward them to a server-side query).
      </DocNote>

      <DocNote type="warning">
        When onRowsPerPageChange fires, the current page number is not automatically reset. If page 5 no longer exists after switching to a larger page size, reset page to 1 in your handler.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="TablePaginationView reads its dimensions from the shared table category base hook (useTableBase). Omitting size or color on TablePaginationView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every table-category component at once."
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
