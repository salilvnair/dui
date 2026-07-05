import { DocSection, PropTable, FeatureGrid, DocNote } from '../../../shared/DocComponents';

export function HudViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Floating draggable toolbar', color: 'var(--color-primary)' },
          { label: 'Fixed position by default', color: 'var(--color-success)' },
          { label: 'Contained mode for showcase/preview', color: 'var(--color-info)' },
          { label: 'Active toggle state per item', color: 'var(--color-warning)' },
          { label: 'Separator lines between items', color: '#a855f7' },
          { label: 'Status text after items', color: '#ec4899' },
          { label: 'Drag handle grip', color: '#14b8a6' },
          { label: 'CSS custom property theming', color: '#f97316' },
        ]} />
      </DocSection>

      <DocSection title="HudItem">
        <PropTable props={[
          { name: 'id', type: 'string', required: true, description: 'Unique item identifier (used as React key).' },
          { name: 'icon', type: 'ReactNode', required: true, description: 'Icon rendered inside the button.' },
          { name: 'onClick', type: '() => void', description: 'Called when the button is clicked.' },
          { name: 'title', type: 'string', description: 'Tooltip shown on hover.' },
          { name: 'disabled', type: 'boolean', description: 'Disables the button (reduces opacity, no cursor pointer).' },
          { name: 'active', type: 'boolean', description: 'Renders a highlighted active state (toggled-on style).' },
          { name: 'separator', type: 'boolean', description: 'Renders a separator line before this item.' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'items', type: 'HudItem[]', required: true, description: 'Array of HUD action items.' },
          { name: 'status', type: 'string', description: 'Optional short status text rendered after the last item.' },
          { name: 'accentColor', type: 'string', description: 'Sets --dui-hud-accent CSS custom property.' },
          { name: 'activeColor', type: 'string', description: 'Sets --dui-hud-active-color CSS custom property for toggled-on items.' },
          { name: 'className', type: 'string', description: 'Extra CSS class on the root element.' },
          { name: 'onDragEnd', type: '(x: number, y: number) => void', description: 'Called when the user releases the drag handle. Receives the final left/top position in px.' },
          { name: 'contained', type: 'boolean', default: 'false', description: 'When true, uses position:relative instead of fixed and disables drag. For embedded/showcase use.' },
        ]} />
      </DocSection>

      <DocSection title="Drag behavior">
        <DocNote type="info">
          HudView uses <code>position: fixed</code> by default, centered horizontally via CSS transform. When the user drags, the element switches to an absolute left/top and the transform is cleared. The <code>onDragEnd</code> callback receives the final screen coordinates so you can persist the position.
        </DocNote>
        <DocNote type="tip">
          Set <code>contained={true}</code> in the DUI showcase or any preview pane so the HUD stays inside its container without escaping to the screen edge.
        </DocNote>
      </DocSection>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="HudView does not read size, width, color, or borderRadius from the DuiProvider context — it is not part of the sized-component system and has no size prop to fall back to a provider default."
      >
        <DocNote type="info">
          HudView is unaffected by <code>{'<DuiProvider>'}</code> size/color context. Style it directly via its own props (and CSS variables where documented above) rather than expecting provider-level sizing to apply.
        </DocNote>
      </DocSection>
      </div>
  );
}
