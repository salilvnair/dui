import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference } from '../../../shared/DocComponents';

export function VersionBadgeViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Monospace version chip ("v" prefix)', color: 'var(--color-primary)' },
          { label: 'Update-available dot indicator', color: 'var(--color-warning)' },
          { label: 'Optional click handler (renders as button)', color: 'var(--color-info)' },
          { label: 'Custom accent color', color: '#a855f7' },
          { label: 'DuiProvider size context', color: '#14b8a6' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'version', type: 'string', required: true, description: 'Version string, rendered prefixed with "v" (e.g. version="2.4.1" renders "v2.4.1").' },
          { name: 'updateAvailable', type: 'boolean', default: 'false', description: 'Shows a small amber dot after the version number.' },
          { name: 'onClick', type: '() => void', description: 'When provided, the badge renders as a <button> instead of a <span> and becomes clickable.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls badge height and font size. Falls back to DuiProvider context.' },
          { name: 'color', type: 'string', default: 'var(--color-text-muted)', description: 'Text color of the version label.' },
          { name: 'className', type: 'string', description: 'Additional class names on the badge.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the badge.' },
        ]} />
      </DocSection>

      <DocNote type="tip">
        Pair updateAvailable with an onClick that opens a changelog or triggers an update flow — the dot alone doesn't do anything interactive on its own.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="VersionBadgeView reads its dimensions from the shared chip category base hook (useChipBase). Omitting size, borderRadius, or color on VersionBadgeView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every chip-category component at once."
      >
        <FeatureGrid features={[
          { label: 'useChipBase', color: 'var(--color-primary)' },
          { label: 'Falls back to DuiProvider context', color: 'var(--color-success)' },
          { label: 'size / borderRadius / color', color: 'var(--color-info)' },
        ]} />
        <SizeReference sizes={[
          { size: 'xxs', height: '10px', font: '12px', desc: 'padX 11px, radius full' },
          { size: 'xs', height: '12px', font: '12px', desc: 'padX 11px, radius full' },
          { size: 'sm', height: '16px', font: '9px', desc: 'padX 5px, radius full' },
          { size: 'md', height: '20px', font: '10px', desc: 'padX 7px, radius full' },
          { size: 'lg', height: '24px', font: '11px', desc: 'padX 9px, radius full' },
          { size: 'xl', height: '28px', font: '12px', desc: 'padX 11px, radius full' },
          { size: 'xxl', height: '32px', font: '12px', desc: 'padX 11px, radius full' },
          { size: 'xxxl', height: '38px', font: '12px', desc: 'padX 11px, radius full' },
        ]} />
        <DocNote type="info">
          These values come from the Chip category tokens in <code>DuiTokens.ts</code>. Set a local <code>size</code> prop to override the provider default for this instance only, or change <code>{'<DuiProvider size="...">'}</code> to restyle every chip-category component in the tree.
        </DocNote>
      </DocSection>
      </div>
  );
}
