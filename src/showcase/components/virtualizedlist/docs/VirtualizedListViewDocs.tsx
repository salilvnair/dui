import { DocSection, PropTable, FeatureGrid, DocNote } from '../../../shared/DocComponents';

export function VirtualizedListViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Windowed rendering', color: 'var(--color-primary)' },
          { label: 'Configurable overscan', color: 'var(--color-success)' },
          { label: 'Fixed row height', color: 'var(--color-info)' },
          { label: 'Generic — works with any item type', color: 'var(--color-warning)' },
          { label: 'Absolute-positioned rows', color: '#a855f7' },
          { label: 'Scroll-driven recompute', color: '#ec4899' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'items', type: 'T[]', required: true, description: 'Full array of data to render. Only a windowed slice is mounted at a time.' },
          { name: 'itemHeight', type: 'number', required: true, description: 'Fixed pixel height of every row. Required for absolute positioning math — variable heights are not supported.' },
          { name: 'height', type: 'number', required: true, description: 'Pixel height of the scrollable viewport.' },
          { name: 'renderItem', type: '(item: T, index: number) => ReactNode', required: true, description: 'Renders a single row given the item and its index in the full array.' },
          { name: 'overscan', type: 'number', default: '4', description: 'Extra rows rendered above/below the visible window, to reduce blank flashes on fast scroll.' },
          { name: 'className', type: 'string', description: 'Additional class names applied to the scroll container.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the scroll container.' },
        ]} />
      </DocSection>

      <DocNote type="tip">
        Because row height is fixed, VirtualizedListView is ideal for uniform rows like request logs, environment variable lists, or search results. If your rows have variable heights, measure and cap them at a fixed itemHeight, or the positioning math will be wrong.
      </DocNote>

      <DocNote type="info">
        Increase overscan when users scroll fast (e.g. with a trackpad or scrollbar drag) to hide the blank-row flash; keep it low (2-4) for large datasets to minimize the number of mounted DOM nodes.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="VirtualizedListView does not read size, width, color, or borderRadius from the DuiProvider context — it is not part of the sized-component system and has no size prop to fall back to a provider default."
      >
        <DocNote type="info">
          VirtualizedListView is unaffected by <code>{'<DuiProvider>'}</code> size/color context. Style it directly via its own props (and CSS variables where documented above) rather than expecting provider-level sizing to apply.
        </DocNote>
      </DocSection>
      </div>
  );
}
