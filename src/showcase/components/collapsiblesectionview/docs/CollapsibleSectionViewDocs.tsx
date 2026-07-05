import { DocSection, PropTable, FeatureGrid, DocNote } from '../../../shared/DocComponents';

export function CollapsibleSectionViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Controlled expand/collapse', color: 'var(--color-primary)' },
          { label: 'Animated chevron rotation', color: 'var(--color-success)' },
          { label: 'Count badge next to title', color: 'var(--color-info)' },
          { label: 'headerRight slot for action buttons', color: 'var(--color-warning)' },
          { label: 'Accent color via CSS custom property', color: '#a855f7' },
          { label: 'Click-outside safe header actions', color: '#ec4899' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'title', type: 'string', required: true, description: 'Section title shown in the header.' },
          { name: 'expanded', type: 'boolean', required: true, description: 'Controlled expanded state.' },
          { name: 'onToggle', type: '() => void', required: true, description: 'Called when the header is clicked to toggle expand state.' },
          { name: 'badge', type: 'number', description: 'Count badge shown next to the title. Hidden when 0 or undefined.' },
          { name: 'accentColor', type: 'string', description: 'Sets --dui-collapse-accent CSS custom property used in CSS for chip and badge colors.' },
          { name: 'headerRight', type: 'ReactNode', description: 'Slot rendered on the far right of the header. Click events are stopped from propagating to the toggle.' },
          { name: 'children', type: 'ReactNode', required: true, description: 'Content rendered in the body when expanded.' },
          { name: 'className', type: 'string', description: 'Extra CSS class on the root element.' },
        ]} />
      </DocSection>

      <DocSection title="Usage notes">
        <DocNote type="info">
          CollapsibleSectionView is fully controlled — you manage <code>expanded</code> state externally. This makes it easy to sync multiple sections or implement "expand all / collapse all" actions.
        </DocNote>
        <DocNote type="tip">
          The <code>headerRight</code> slot is ideal for icon buttons (add, clear, mute). They receive a <code>stopPropagation</code> wrapper so clicking them doesn't toggle the section.
        </DocNote>
        <DocNote type="info">
          Used internally by <strong>DebugView</strong> for the Variables, Watch, Call Stack, and Breakpoints sections.
        </DocNote>
      </DocSection>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="CollapsibleSectionView does not read size, width, color, or borderRadius from the DuiProvider context — it is not part of the sized-component system and has no size prop to fall back to a provider default."
      >
        <DocNote type="info">
          CollapsibleSectionView is unaffected by <code>{'<DuiProvider>'}</code> size/color context. Style it directly via its own props (and CSS variables where documented above) rather than expecting provider-level sizing to apply.
        </DocNote>
      </DocSection>
      </div>
  );
}
