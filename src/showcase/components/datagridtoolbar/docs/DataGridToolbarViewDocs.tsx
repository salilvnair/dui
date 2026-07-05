import { DocSection, PropTable, FeatureGrid, EnumTable, DocNote, SizeReference } from '../../../shared/DocComponents';

export function DataGridToolbarViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Built-in search input', color: 'var(--color-primary)' },
          { label: 'Optional column-visibility menu', color: 'var(--color-success)' },
          { label: 'Optional density cycle button', color: 'var(--color-info)' },
          { label: 'Optional export action', color: 'var(--color-warning)' },
          { label: 'All extras are opt-in via props', color: '#a855f7' },
          { label: 'Composes ColumnVisibilityMenuView', color: '#ec4899' },
          { label: 'Built on useTableBase', color: '#14b8a6' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'search', type: 'string', required: true, description: 'Current search input value (controlled).' },
          { name: 'onSearchChange', type: '(value: string) => void', required: true, description: 'Called on every keystroke in the search field.' },
          { name: 'columns', type: 'ColumnVisibilityOption[]', description: 'Column definitions for the column-visibility menu. Menu only renders when columns, visibleColumns, and onVisibleColumnsChange are all provided.' },
          { name: 'visibleColumns', type: 'string[]', description: 'Keys of currently-visible columns, forwarded to ColumnVisibilityMenuView.' },
          { name: 'onVisibleColumnsChange', type: '(visible: string[]) => void', description: 'Called when the user toggles a column in the visibility menu.' },
          { name: 'density', type: 'DataGridDensity', default: "'default'", description: 'Current grid density. Used to label the density button tooltip.' },
          { name: 'onDensityChange', type: '(density: DataGridDensity) => void', description: 'When provided, renders a density-cycle icon button that steps through compact → default → comfortable.' },
          { name: 'onExport', type: '() => void', description: 'When provided, renders an export icon button.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls padding and control sizing across the toolbar.' },
          { name: 'color', type: 'string', description: 'Accent color forwarded to internal controls (e.g. the column-visibility trigger).' },
          { name: 'className', type: 'string', description: 'Additional class names on the outer toolbar container.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override on the outer toolbar container.' },
        ]} />
      </DocSection>

      <DocSection title="DataGridDensity enum">
        <EnumTable name="DataGridDensity" values={[
          { value: 'compact', description: 'Tightest row height and padding.', color: 'var(--color-warning)' },
          { value: 'default', description: 'Standard row height.', color: 'var(--color-primary)' },
          { value: 'comfortable', description: 'Extra vertical padding for readability.', color: 'var(--color-success)' },
        ]} />
      </DocSection>

      <DocNote type="tip">
        The column-visibility menu, density button, and export button are each independently opt-in — omit their related props to drop them from the toolbar. Only the search field is always rendered.
      </DocNote>

      <DocNote type="info">
        DataGridToolbarView renders ColumnVisibilityMenuView internally rather than reimplementing it — import ColumnVisibilityMenuView directly from '@/dui' only if you need a standalone column picker outside of a toolbar.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="DataGridToolbarView reads its dimensions from the shared table category base hook (useTableBase). Omitting size or color on DataGridToolbarView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every table-category component at once."
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
