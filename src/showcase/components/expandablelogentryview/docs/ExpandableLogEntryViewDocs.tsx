import { DocSection, PropTable, FeatureGrid, DocNote } from '../../../shared/DocComponents';

export function ExpandableLogEntryViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Expandable log row with chevron', color: 'var(--color-primary)' },
          { label: 'Icon slot (left)', color: 'var(--color-success)' },
          { label: 'Colored badge label', color: 'var(--color-info)' },
          { label: 'Unix timestamp rendered as HH:MM:SS', color: 'var(--color-warning)' },
          { label: 'Default expanded state', color: '#a855f7' },
          { label: 'Arbitrary children in body', color: '#ec4899' },
          { label: 'CSS custom property for badge color', color: '#14b8a6' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'icon', type: 'ReactNode', required: true, description: 'Icon rendered on the left side of the header row.' },
          { name: 'title', type: 'string', required: true, description: 'Main log entry title text.' },
          { name: 'badge', type: 'string', description: 'Short colored label shown after the title (e.g. "GET", "200").' },
          { name: 'badgeColor', type: 'string', description: 'CSS color or var() for the badge text and tinted background. Sets --dui-logentry-badge.' },
          { name: 'timestamp', type: 'number', description: 'Unix timestamp in milliseconds. Renders as localized HH:MM:SS AM/PM string.' },
          { name: 'defaultExpanded', type: 'boolean', default: 'false', description: 'Whether the entry starts expanded.' },
          { name: 'children', type: 'ReactNode', required: true, description: 'Content rendered in the expandable body area.' },
          { name: 'className', type: 'string', description: 'Extra CSS class on the root element.' },
        ]} />
      </DocSection>

      <DocSection title="Layout structure">
        <DocNote type="info">
          The header row is: <code>[icon] [title] [badge?] — [timestamp?] [chevron]</code>. The chevron rotates 180° when expanded. The content area appears below the header when expanded.
        </DocNote>
        <DocNote type="tip">
          Use JsonTreeView or a pre-styled code block as children to display structured log data. The content area has no built-in padding — add padding inside the children as needed.
        </DocNote>
      </DocSection>
    </div>
  );
}
