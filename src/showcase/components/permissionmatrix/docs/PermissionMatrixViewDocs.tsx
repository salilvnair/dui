import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference } from '../../../shared/DocComponents';

export function PermissionMatrixViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Role x permission checkbox grid', color: 'var(--color-primary)' },
          { label: 'Per-cell click toggling', color: 'var(--color-success)' },
          { label: 'Custom accent color', color: 'var(--color-info)' },
          { label: 'DuiSize table density', color: 'var(--color-warning)' },
          { label: 'Horizontal scroll on overflow', color: '#a855f7' },
          { label: 'Controlled matrix[][] state', color: '#14b8a6' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'roles', type: 'string[]', required: true, description: 'Column headers — one per role.' },
          { name: 'permissions', type: 'string[]', required: true, description: 'Row labels — one per permission.' },
          { name: 'matrix', type: 'boolean[][]', required: true, description: 'Checked state indexed as matrix[roleIdx][permissionIdx].' },
          { name: 'onChange', type: '(roleIdx: number, permissionIdx: number, value: boolean) => void', required: true, description: 'Fired when a cell checkbox is toggled. The component is fully controlled — update your own matrix state in this handler.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls table cell padding and font size via the DUI table base.' },
          { name: 'color', type: 'string', default: 'var(--color-primary)', description: 'Accent color used to fill checked cells.' },
          { name: 'className', type: 'string', description: 'Additional class names on the outer scroll container.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the outer scroll container.' },
        ]} />
      </DocSection>

      <DocNote type="tip">
        The matrix indexing is [roleIdx][permissionIdx], not the other way around — mismatching the axes is the most common integration bug. Build the initial matrix by mapping roles to an array of permissions.length false values, to guarantee correct dimensions.
      </DocNote>

      <DocNote type="warning">
        This component is fully controlled: clicking a cell only calls onChange, it does not mutate matrix internally. If you forget to update state in the handler, the grid will appear unresponsive.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="PermissionMatrixView reads its dimensions from the shared table category base hook (useTableBase). Omitting size or color on PermissionMatrixView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every table-category component at once."
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
