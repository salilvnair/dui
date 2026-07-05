import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference } from '../../../shared/DocComponents';

export function ColumnVisibilityMenuViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Checkbox dropdown menu', color: 'var(--color-primary)' },
          { label: 'Portal-rendered to document.body', color: 'var(--color-success)' },
          { label: 'Auto-positioned under trigger', color: 'var(--color-info)' },
          { label: 'Closes on outside click', color: 'var(--color-warning)' },
          { label: 'Controlled visible-keys array', color: '#a855f7' },
          { label: 'Built on useMenuBase', color: '#ec4899' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'columns', type: 'ColumnVisibilityOption[]', required: true, description: 'All available columns, each { key, label }.' },
          { name: 'visible', type: 'string[]', required: true, description: 'Keys of currently-visible columns.' },
          { name: 'onChange', type: '(visible: string[]) => void', required: true, description: 'Called with the updated visible-keys array whenever a checkbox is toggled.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls trigger button and menu item font size / icon size.' },
          { name: 'color', type: 'string', description: 'Accent color forwarded to useMenuBase for the trigger and menu styling.' },
          { name: 'className', type: 'string', description: 'Additional class names on the outer trigger wrapper (merged with the internal dui_colvis class).' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override on the outer trigger wrapper.' },
        ]} />
      </DocSection>

      <DocNote type="tip">
        The dropdown menu is rendered via a React portal into document.body and positioned with fixed coordinates computed from the trigger's bounding rect, so it always escapes overflow:hidden ancestors like scrollable table containers.
      </DocNote>

      <DocNote type="warning">
        onChange receives the full next array, not a single toggled key — build it as visible.filter/concat inside the component. If you need this same picker embedded in a toolbar rather than standalone, use DataGridToolbarView's columns/visibleColumns/onVisibleColumnsChange props instead, which render this component internally.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="ColumnVisibilityMenuView reads its dimensions from the shared menu category base hook (useMenuBase). Omitting size, borderRadius, or color on ColumnVisibilityMenuView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every menu-category component at once."
      >
        <FeatureGrid features={[
          { label: 'useMenuBase', color: 'var(--color-primary)' },
          { label: 'Falls back to DuiProvider context', color: 'var(--color-success)' },
          { label: 'size / borderRadius / color', color: 'var(--color-info)' },
        ]} />
        <SizeReference sizes={[
          { size: 'xxs', height: '14px', font: '8px', desc: 'padX 14px' },
          { size: 'xs', height: '18px', font: '9px', desc: 'padX 14px' },
          { size: 'sm', height: '22px', font: '10px', desc: 'padX 8px' },
          { size: 'md', height: '26px', font: '11px', desc: 'padX 10px' },
          { size: 'lg', height: '30px', font: '12px', desc: 'padX 12px' },
          { size: 'xl', height: '36px', font: '13px', desc: 'padX 14px' },
          { size: 'xxl', height: '42px', font: '14px', desc: 'padX 14px' },
          { size: 'xxxl', height: '48px', font: '16px', desc: 'padX 14px' },
        ]} />
        <DocNote type="info">
          These values come from the Menu category tokens in <code>DuiTokens.ts</code>. Set a local <code>size</code> prop to override the provider default for this instance only, or change <code>{'<DuiProvider size="...">'}</code> to restyle every menu-category component in the tree.
        </DocNote>
      </DocSection>
      </div>
  );
}
