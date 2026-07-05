import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference } from '../../../shared/DocComponents';

export function TeamMemberRowViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Avatar slot with placeholder fallback', color: 'var(--color-primary)' },
          { label: 'Name + role two-line layout', color: 'var(--color-info)' },
          { label: 'Optional remove action', color: 'var(--color-error)' },
          { label: 'DuiSize card spacing', color: 'var(--color-warning)' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'name', type: 'string', required: true, description: 'Member display name.' },
          { name: 'role', type: 'string', required: true, description: 'Member role or title, shown muted below the name.' },
          { name: 'avatar', type: 'ReactNode', description: 'Custom avatar element. Falls back to a plain gray circle placeholder when omitted.' },
          { name: 'onRemove', type: '() => void', description: 'When provided, renders a remove (trash) icon button. Omit for read-only member lists.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls padding, gap, and font size via the DUI card base.' },
          { name: 'className', type: 'string', description: 'Additional class names on the outer row.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the outer row.' },
        ]} />
      </DocSection>

      <DocNote type="tip">
        Compose TeamMemberRowView with AvatarView or AvatarGroup for the avatar prop to get consistent initials/image handling instead of building a custom avatar span each time.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="TeamMemberRowView reads its dimensions from the shared card category base hook (useCardBase). Omitting size, borderRadius, or color on TeamMemberRowView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every card-category component at once."
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
