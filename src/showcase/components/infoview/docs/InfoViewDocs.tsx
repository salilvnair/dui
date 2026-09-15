import { DocSection, PropTable, FeatureGrid } from '../../../shared/DocComponents';

export function InfoViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Icon in a soft badge above the title', color: 'var(--color-primary)' },
          { label: 'File paths as monospace pills, not prose', color: 'var(--color-success)' },
          { label: 'Chip badges under the paths', color: 'var(--color-info)' },
          { label: 'Compact mode for a panel that already has a heading', color: 'var(--color-warning)' },
        ]} />
      </DocSection>

      <DocSection
        title="Overview"
        description="An explanatory block for settings screens and empty states — what this thing is, and where on disk it lives. The paths prop exists because a file path inside a sentence is unreadable and unselectable; as a pill it is both."
      >
        <></>
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'title', type: 'string', required: true, description: 'The heading.' },
          { name: 'description', type: 'string', description: 'Plain prose. Use paths for code and file paths instead of embedding them here.' },
          { name: 'paths', type: 'string[]', description: 'Rendered as monospace pills, the same treatment as InfoPopupView item code.' },
          { name: 'badges', type: '{ label: string; color?: string }[]', description: 'Small chips below the paths — a count or a status word.' },
          { name: 'icon', type: 'ReactNode', description: 'Rendered inside a soft coloured badge above the title.' },
          { name: 'accentColor', type: 'string', description: 'Tints the badge and the pills.' },
          { name: 'compact', type: 'boolean', description: 'Tighter, for a panel that already has a heading.' },
          { name: 'className', type: 'string', description: 'Additional classes.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline styles.' },
        ]} />
      </DocSection>
    </div>
  );
}
