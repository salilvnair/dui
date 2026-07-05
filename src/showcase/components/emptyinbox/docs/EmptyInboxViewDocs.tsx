import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference } from '../../../shared/DocComponents';

export function EmptyInboxViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Pre-styled bell icon', color: 'var(--color-primary)' },
          { label: 'Default caught-up copy', color: 'var(--color-success)' },
          { label: 'Overridable title & message', color: 'var(--color-info)' },
          { label: 'Centered column layout', color: 'var(--color-warning)' },
          { label: 'DuiSize scaling', color: '#a855f7' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'title', type: 'string', default: `"You're all caught up"`, description: 'Bold headline text.' },
          { name: 'message', type: 'string', default: '"No new notifications right now."', description: 'Supporting muted text below the title. Pass an empty string to hide it visually.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls icon and text scale via the DUI display base.' },
          { name: 'className', type: 'string', description: 'Additional class names on the outer container.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the outer container.' },
        ]} />
      </DocSection>

      <DocNote type="tip">
        EmptyInboxView is a fixed, pre-styled variant of the general EmptyStateView shape — use it specifically for notification/inbox contexts. For other empty states (empty search results, no collections, etc.) use EmptyStateView directly so you can customize the icon.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="EmptyInboxView reads its dimensions from the shared display category base hook (useDisplayBase). Omitting size, borderRadius, or color on EmptyInboxView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every display-category component at once."
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
