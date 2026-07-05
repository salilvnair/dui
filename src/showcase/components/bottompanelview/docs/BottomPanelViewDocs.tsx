import { DocSection, PropTable, FeatureGrid, DocNote } from '../../../shared/DocComponents';

export function BottomPanelViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Multi-tab bottom panel', color: 'var(--color-primary)' },
          { label: 'Drag-to-resize handle', color: 'var(--color-success)' },
          { label: 'Collapse / expand toggle', color: 'var(--color-info)' },
          { label: 'Tab icons support', color: 'var(--color-warning)' },
          { label: 'Configurable min/max height', color: '#a855f7' },
          { label: 'Clicking tab auto-expands', color: '#ec4899' },
          { label: 'Accent color per panel', color: '#14b8a6' },
        ]} />
      </DocSection>

      <DocSection title="BottomPanelTab">
        <PropTable props={[
          { name: 'id', type: 'string', required: true, description: 'Unique tab identifier.' },
          { name: 'label', type: 'string', required: true, description: 'Tab label text.' },
          { name: 'icon', type: 'ReactNode', description: 'Optional icon rendered left of the label.' },
          { name: 'content', type: 'ReactNode', required: true, description: 'Content rendered in the panel body when this tab is active.' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'tabs', type: 'BottomPanelTab[]', required: true, description: 'Array of tabs. The first tab is active on mount.' },
          { name: 'defaultHeight', type: 'number', default: '200', description: 'Initial panel height in px.' },
          { name: 'minHeight', type: 'number', default: '80', description: 'Minimum panel height when dragging to resize.' },
          { name: 'maxHeight', type: 'number', default: '600', description: 'Maximum panel height when dragging to resize.' },
          { name: 'defaultCollapsed', type: 'boolean', default: 'false', description: 'Whether the panel starts collapsed.' },
          { name: 'accentColor', type: 'string', description: 'Color for the active tab indicator underline and text.' },
          { name: 'className', type: 'string', description: 'Extra CSS class on the root element.' },
        ]} />
      </DocSection>

      <DocSection title="Resize behavior">
        <DocNote type="info">
          The drag handle is a 4px strip at the top of the panel. Dragging upward increases height; dragging downward decreases it. Height is clamped between <code>minHeight</code> and <code>maxHeight</code>. Text selection is disabled during drag.
        </DocNote>
        <DocNote type="tip">
          Clicking a tab while the panel is collapsed automatically expands it. The collapse toggle button in the tab bar always stays accessible.
        </DocNote>
      </DocSection>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="BottomPanelView does not read size, width, color, or borderRadius from the DuiProvider context — it is not part of the sized-component system and has no size prop to fall back to a provider default."
      >
        <DocNote type="info">
          BottomPanelView is unaffected by <code>{'<DuiProvider>'}</code> size/color context. Style it directly via its own props (and CSS variables where documented above) rather than expecting provider-level sizing to apply.
        </DocNote>
      </DocSection>
      </div>
  );
}
