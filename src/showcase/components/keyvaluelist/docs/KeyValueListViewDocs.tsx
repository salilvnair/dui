import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference } from '../../../shared/DocComponents';

export function KeyValueListViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Lightweight stacked label:value rows', color: 'var(--color-primary)' },
          { label: 'ReactNode values (not just strings)', color: 'var(--color-success)' },
          { label: 'No edit UI or toolbar', color: 'var(--color-info)' },
          { label: 'DuiProvider size context', color: 'var(--color-warning)' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'entries', type: 'KeyValueListEntry[]', required: true, description: 'List of { key, value } pairs to render.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls font size. Falls back to DuiProvider context.' },
          { name: 'className', type: 'string', description: 'Additional class names on the outer wrapper.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the outer wrapper.' },
        ]} />
      </DocSection>

      <DocSection title="KeyValueListEntry shape">
        <PropTable props={[
          { name: 'key', type: 'string', required: true, description: 'Left-aligned label text.' },
          { name: 'value', type: 'ReactNode', required: true, description: 'Right-aligned value — accepts any ReactNode, not just strings.' },
        ]} />
      </DocSection>

      <DocNote type="info">
        This is intentionally the "read-only" counterpart to KeyValueTableView — use KeyValueListView for static summary panels (request metadata, plan details) and KeyValueTableView when you need inline editing, add/remove rows, or a toolbar.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="KeyValueListView reads its dimensions from the shared display category base hook (useDisplayBase). Omitting size, borderRadius, or color on KeyValueListView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every display-category component at once."
      >
        <FeatureGrid features={[
          { label: 'useDisplayBase', color: 'var(--color-primary)' },
          { label: 'Falls back to DuiProvider context', color: 'var(--color-success)' },
          { label: 'size / borderRadius / color', color: 'var(--color-info)' },
        ]} />
        <SizeReference sizes={[
          { size: 'xxs', height: '—', font: '8px', desc: 'icon 8px' },
          { size: 'xs', height: '—', font: '9px', desc: 'icon 10px' },
          { size: 'sm', height: '—', font: '10px', desc: 'icon 11px' },
          { size: 'md', height: '—', font: '11px', desc: 'icon 12px' },
          { size: 'lg', height: '—', font: '12px', desc: 'icon 14px' },
          { size: 'xl', height: '—', font: '13px', desc: 'icon 16px' },
          { size: 'xxl', height: '—', font: '14px', desc: 'icon 18px' },
          { size: 'xxxl', height: '—', font: '16px', desc: 'icon 20px' },
        ]} />
        <DocNote type="info">
          These values come from the Display category tokens in <code>DuiTokens.ts</code>. Set a local <code>size</code> prop to override the provider default for this instance only, or change <code>{'<DuiProvider size="...">'}</code> to restyle every display-category component in the tree.
        </DocNote>
      </DocSection>
      </div>
  );
}
