import { DocSection, PropTable, FeatureGrid, EnumTable, DocNote, SizeReference } from '../../../shared/DocComponents';

export function ChangelogEntryViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Version + date header', color: 'var(--color-primary)' },
          { label: '4 change-type badges', color: 'var(--color-success)' },
          { label: 'ReactNode change descriptions', color: 'var(--color-info)' },
          { label: 'Multiple changes per entry', color: 'var(--color-warning)' },
          { label: 'DuiSize card density', color: '#a855f7' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'version', type: 'string', required: true, description: 'Version string, rendered with a leading "v" prefix.' },
          { name: 'date', type: 'string', required: true, description: 'Release date, shown next to the version.' },
          { name: 'changes', type: '{ type: ChangeType; description: ReactNode }[]', required: true, description: 'List of individual changes in this release, each rendered with a colored type badge.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls entry spacing and font size via the DUI card base.' },
          { name: 'className', type: 'string', description: 'Additional class names on the outer entry.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the outer entry.' },
        ]} />
      </DocSection>

      <DocSection title="ChangeType enum">
        <EnumTable name="ChangeType" values={[
          { value: 'feature', description: 'New capability — green badge.', color: 'var(--color-success)' },
          { value: 'fix', description: 'Bug fix — blue badge.', color: 'var(--color-info)' },
          { value: 'improvement', description: 'Enhancement to existing behavior — primary-colored badge.', color: 'var(--color-primary)' },
          { value: 'breaking', description: 'Breaking change requiring migration — red badge.', color: 'var(--color-error)' },
        ]} />
      </DocSection>

      <DocNote type="tip">
        changes[].description accepts ReactNode, not just strings — use it to embed inline links to migration guides or PR references, as shown in the rich description example.
      </DocNote>

      <DocNote type="info">
        Each entry renders its own bottom border and spacing; stack several ChangelogEntryView instances in a column to build a full /changelog page without extra wrapper styling.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="ChangelogEntryView reads its dimensions from the shared card category base hook (useCardBase). Omitting size, borderRadius, or color on ChangelogEntryView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every card-category component at once."
      >
        <FeatureGrid features={[
          { label: 'useCardBase', color: 'var(--color-primary)' },
          { label: 'Falls back to DuiProvider context', color: 'var(--color-success)' },
          { label: 'size / borderRadius / color', color: 'var(--color-info)' },
        ]} />
        <SizeReference sizes={[
          { size: 'xxs', height: '28px', font: '8px', desc: 'pad 10px 16px' },
          { size: 'xs', height: '36px', font: '9px', desc: 'pad 10px 16px' },
          { size: 'sm', height: '48px', font: '10px', desc: 'pad 4px 8px' },
          { size: 'md', height: '64px', font: '11px', desc: 'pad 6px 10px' },
          { size: 'lg', height: '80px', font: '12px', desc: 'pad 8px 12px' },
          { size: 'xl', height: '96px', font: '13px', desc: 'pad 10px 16px' },
          { size: 'xxl', height: '112px', font: '14px', desc: 'pad 10px 16px' },
          { size: 'xxxl', height: '128px', font: '16px', desc: 'pad 10px 16px' },
        ]} />
        <DocNote type="info">
          These values come from the Card category tokens in <code>DuiTokens.ts</code>. Set a local <code>size</code> prop to override the provider default for this instance only, or change <code>{'<DuiProvider size="...">'}</code> to restyle every card-category component in the tree.
        </DocNote>
      </DocSection>
      </div>
  );
}
