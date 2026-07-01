import { DocSection, PropTable, FeatureGrid, DocNote } from '../../../shared/DocComponents';

export function DottedCardViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Dashed accent border', color: 'var(--color-primary)' },
          { label: 'Optional title header', color: 'var(--color-success)' },
          { label: 'Expandable / collapsible mode', color: 'var(--color-info)' },
          { label: 'defaultExpanded state', color: 'var(--color-warning)' },
          { label: 'Chevron toggle icon', color: '#a855f7' },
          { label: 'Custom accent color', color: '#ec4899' },
          { label: 'Tinted header background (5% accent)', color: '#14b8a6' },
          { label: 'Children slot', color: '#f97316' },
        ]} />
      </DocSection>

      <DocSection
        title="Overview"
        description="DottedCardView is a decorative container with a dashed border at a translucent accent color. It optionally shows a title bar and can be made collapsible. Commonly used for optional/advanced settings sections, embedded notes, and placeholder content areas."
      >
        <></>
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'children', type: 'ReactNode', required: true, description: 'Content rendered inside the card body (padded at 12px on all sides).' },
          { name: 'title', type: 'string', description: 'When provided, renders a header bar with the title text in the accent color.' },
          { name: 'expandable', type: 'boolean', default: 'false', description: 'When true, clicking the header toggles the body visibility. A chevron icon is shown in the header.' },
          { name: 'defaultExpanded', type: 'boolean', default: 'true', description: 'Initial expanded/collapsed state when expandable=true.' },
          { name: 'accentColor', type: 'string', description: 'Color for the dashed border, header background, title text, and chevron. Defaults to var(--color-primary).' },
          { name: 'className', type: 'string', description: 'Additional class names for the outer container div.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline styles for the outer container div.' },
        ]} />
      </DocSection>

      <DocNote type="info">
        The dashed border uses color-mix(in srgb, accent 30%, transparent) so it stays visible but subtle. The header background uses a lighter 5% tint. The dashed body divider uses a 20% tint.
      </DocNote>

      <DocNote type="tip">
        When expandable=false (default), the chevron is not rendered even if a title is provided. The title bar is purely decorative in non-expandable mode.
      </DocNote>
    </div>
  );
}
