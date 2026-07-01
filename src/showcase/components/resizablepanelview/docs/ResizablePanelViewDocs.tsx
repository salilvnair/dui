import { DocSection, PropTable, FeatureGrid, DocNote } from '../../../shared/DocComponents';

export function ResizablePanelViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Bottom-edge drag to resize', color: 'var(--color-primary)' },
          { label: 'Pointer capture API (works outside browser window)', color: 'var(--color-success)' },
          { label: 'Min and max height constraints', color: 'var(--color-info)' },
          { label: 'Dashed grip indicator with hover reveal', color: 'var(--color-warning)' },
          { label: 'Configurable border-radius', color: '#a855f7' },
          { label: 'Absolute-inset children (border + overflow:hidden)', color: '#ec4899' },
        ]} />
      </DocSection>

      <DocSection
        title="Overview"
        description="ResizablePanelView wraps children in a container of controlled height. A transparent 10px drag zone at the bottom edge allows the user to pull the panel taller or shorter. The grip indicator (a dashed pill) fades in on hover."
      >
        <></>
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'defaultHeight', type: 'number', required: true, description: 'Initial height of the panel in pixels.' },
          { name: 'minHeight', type: 'number', default: '40', description: 'Minimum height in pixels. The user cannot drag below this value.' },
          { name: 'maxHeight', type: 'number', default: '600', description: 'Maximum height in pixels. The user cannot drag above this value.' },
          { name: 'borderRadius', type: 'number', default: '8', description: 'Border radius in pixels applied to the inner content border and overflow clip.' },
          { name: 'children', type: 'ReactNode', required: true, description: 'Content rendered inside the resizable panel. Children are absolutely positioned to fill the panel (inset: 0).' },
          { name: 'className', type: 'string', description: 'Additional class names for the outer positioning div.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline styles for the outer div (merged with height and position: relative).' },
        ]} />
      </DocSection>

      <DocNote type="info">
        The drag handle uses the Pointer Capture API (setPointerCapture / releasePointerCapture) to continue tracking pointer movement even if the cursor leaves the handle element. This prevents the drag from sticking or releasing unexpectedly.
      </DocNote>

      <DocNote type="tip">
        For a two-panel split that resizes left/right or top/bottom, use SplitPanelView instead. ResizablePanelView is for a single panel with a user-adjustable bottom edge — for example a request body editor that the user can make taller.
      </DocNote>
    </div>
  );
}
