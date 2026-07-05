import { DocSection, PropTable, FeatureGrid, DocNote } from '../../../shared/DocComponents';

export function EmptyStateViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Optional icon slot', color: 'var(--color-primary)' },
          { label: 'Title + message text', color: 'var(--color-success)' },
          { label: 'Optional action button', color: 'var(--color-info)' },
          { label: 'Compact mode (reduced padding)', color: 'var(--color-warning)' },
          { label: 'Custom accent color for action button', color: '#a855f7' },
          { label: 'Centered flex layout', color: '#ec4899' },
          { label: 'Max-width 320px on message for readability', color: '#14b8a6' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'title', type: 'string', required: true, description: 'Primary heading text. Shown at 13px (12px in compact mode).' },
          { name: 'icon', type: 'ReactNode', description: 'Optional icon rendered above the title. Shown at 50% opacity using var(--color-emptystate-icon).' },
          { name: 'message', type: 'string', description: 'Secondary descriptive text shown below the title. Max width 320px for readability.' },
          { name: 'action', type: 'EmptyStateAction', description: 'Optional call-to-action button. Rendered as a small tinted button using accentColor.' },
          { name: 'accentColor', type: 'string', description: 'Color override for the action button border, background tint, and text. Defaults to var(--color-primary).' },
          { name: 'compact', type: 'boolean', default: 'false', description: 'When true, reduces padding (20px vs 40px) and font sizes for use in dense panels or table cells.' },
          { name: 'className', type: 'string', description: 'Additional class names for the outer container div.' },
        ]} />
      </DocSection>

      <DocSection title="EmptyStateAction shape">
        <PropTable props={[
          { name: 'label', type: 'string', required: true, description: 'Button text.' },
          { name: 'onClick', type: '() => void', required: true, description: 'Called when the action button is clicked.' },
        ]} />
      </DocSection>

      <DocNote type="tip">
        For a truly centered empty state inside a scrollable container, wrap the parent in h-full flex flex-col and make EmptyStateView fill the remaining space. Never use py-12 on the empty state itself — let the flex centering do the work.
      </DocNote>

      <DocNote type="info">
        EmptyStateView is used internally by DataTableView when the rows array is empty. Pass emptyTitle and emptyMessage to DataTableView to customize the message without rendering EmptyStateView directly.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="EmptyStateView does not read size, width, color, or borderRadius from the DuiProvider context — it is not part of the sized-component system and has no size prop to fall back to a provider default."
      >
        <DocNote type="info">
          EmptyStateView is unaffected by <code>{'<DuiProvider>'}</code> size/color context. Style it directly via its own props (and CSS variables where documented above) rather than expecting provider-level sizing to apply.
        </DocNote>
      </DocSection>
      </div>
  );
}
