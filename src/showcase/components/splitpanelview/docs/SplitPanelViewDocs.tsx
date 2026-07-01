import { DocSection, PropTable, FeatureGrid, EnumTable, DocNote } from '../../../shared/DocComponents';

export function SplitPanelViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Horizontal and vertical split directions', color: 'var(--color-primary)' },
          { label: 'Uncontrolled (defaultSplit) mode', color: 'var(--color-success)' },
          { label: 'Controlled (split) mode with onResize callback', color: 'var(--color-info)' },
          { label: 'Animated pill handle (grows on hover/drag)', color: 'var(--color-warning)' },
          { label: 'Double-click to reset to defaultSplit', color: '#a855f7' },
          { label: 'Click-without-drag fires onHandleClick', color: '#ec4899' },
          { label: 'Smooth transition when not dragging', color: '#14b8a6' },
          { label: 'Min px constraints for each panel', color: '#f97316' },
          { label: 'Hover tooltip (customizable or null to suppress)', color: 'var(--color-primary)' },
          { label: 'Pointer capture API', color: 'var(--color-success)' },
          { label: 'Custom accent color', color: 'var(--color-info)' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'first', type: 'ReactNode', required: true, description: 'Content for the first (top or left) panel.' },
          { name: 'second', type: 'ReactNode', required: true, description: 'Content for the second (bottom or right) panel.' },
          { name: 'direction', type: 'SplitDirection', default: "'horizontal'", description: "Layout direction. 'horizontal' = left/right split. 'vertical' = top/bottom split." },
          { name: 'defaultSplit', type: 'number', default: '50', description: 'Initial split percentage (0–100) for the first panel. Also the reset target on double-click.' },
          { name: 'split', type: 'number', description: 'Controlled split value (0–100). When provided, overrides internal state. Wire with onResize.' },
          { name: 'minFirst', type: 'number', default: '80', description: 'Minimum pixel size for the first panel.' },
          { name: 'minSecond', type: 'number', default: '80', description: 'Minimum pixel size for the second panel.' },
          { name: 'accentColor', type: 'string', description: 'Color of the drag-handle pill when active (hovered or dragging).' },
          { name: 'onResize', type: '(split: number) => void', description: 'Fired on every drag move and on double-click reset. Provides the current split percentage.' },
          { name: 'onResizeEnd', type: '(split: number) => void', description: 'Fired once when the pointer is released (drag end) or on double-click reset.' },
          { name: 'onHandleClick', type: '() => void', description: 'Fired when the handle is clicked without dragging. Use to implement collapse/expand.' },
          { name: 'pillTooltip', type: 'ReactNode | null', description: 'Tooltip content shown on pill hover. Defaults to keyboard hint. Pass null to suppress.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline styles for the root container div.' },
          { name: 'className', type: 'string', description: 'Additional class names for the root container div.' },
        ]} />
      </DocSection>

      <DocSection title="SplitDirection enum">
        <EnumTable name="SplitDirection" values={[
          { value: 'horizontal', description: 'Left panel | Right panel (col-resize cursor)', color: 'var(--color-primary)' },
          { value: 'vertical', description: 'Top panel / Bottom panel (row-resize cursor)', color: 'var(--color-info)' },
        ]} />
      </DocSection>

      <DocNote type="info">
        The animated pill handle grows from 44px to 80px (in the non-split axis) on hover or drag. It uses a CSS transition on the relevant dimension (height for horizontal, width for vertical).
      </DocNote>

      <DocNote type="tip">
        To implement a collapsible sidebar: wire onHandleClick to toggle a collapsed state, and drive the split prop to 0 when collapsed and the user's last value when expanded. Use onResizeEnd to persist the last user-set split.
      </DocNote>

      <DocNote type="warning">
        When using controlled mode (split prop), always also wire onResize — otherwise the panel will not respond to drag input because internal state is overridden by the prop on every render.
      </DocNote>
    </div>
  );
}
