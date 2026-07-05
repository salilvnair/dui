import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference } from '../../../shared/DocComponents';

export function AvatarGroupViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Stacked overlapping avatars', color: 'var(--color-primary)' },
          { label: '"+N" overflow bubble', color: 'var(--color-success)' },
          { label: 'Configurable max visible count', color: 'var(--color-info)' },
          { label: 'Mixed image + initials members', color: 'var(--color-warning)' },
          { label: 'Surface-colored separator ring', color: '#a855f7' },
          { label: 'DuiProvider size context', color: '#ec4899' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'members', type: 'AvatarGroupMember[]', required: true, description: 'Members to display. Each: { src?, name?, initials? } — same shape as AvatarView minus status.' },
          { name: 'max', type: 'number', default: '4', description: 'Max avatars shown before collapsing the remainder into a "+N" bubble.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls avatar diameter, overlap amount, and overflow bubble font size.' },
          { name: 'color', type: 'string', description: 'Accent color passed through to each AvatarView for initials fallback styling.' },
          { name: 'className', type: 'string', description: 'Additional class names on the outer container.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the outer container.' },
        ]} />
      </DocSection>

      <DocNote type="tip">
        Each visible avatar renders as a real AvatarView instance internally, so image loading, initials derivation, and color all work exactly as documented on AvatarView — AvatarGroupView only adds the overlap/stacking and overflow bubble logic.
      </DocNote>

      <DocNote type="info">
        Overlap amount scales with size (28% of the current diameter) so the stack stays proportional at any DuiSize — you don't need to hand-tune spacing per size.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="AvatarGroupView reads its dimensions from the shared avatar category base hook (useAvatarBase). Omitting size or color on AvatarGroupView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every avatar-category component at once."
      >
        <FeatureGrid features={[
          { label: 'useAvatarBase', color: 'var(--color-primary)' },
          { label: 'Falls back to DuiProvider context', color: 'var(--color-success)' },
          { label: 'size / color', color: 'var(--color-info)' },
        ]} />
        <SizeReference sizes={[
          { size: 'xxs', height: '16px', font: '8px', desc: 'dot 6px' },
          { size: 'xs', height: '20px', font: '9px', desc: 'dot 7px' },
          { size: 'sm', height: '24px', font: '10px', desc: 'dot 8px' },
          { size: 'md', height: '32px', font: '11px', desc: 'dot 10px' },
          { size: 'lg', height: '40px', font: '12px', desc: 'dot 12px' },
          { size: 'xl', height: '48px', font: '13px', desc: 'dot 14px' },
          { size: 'xxl', height: '56px', font: '14px', desc: 'dot 16px' },
          { size: 'xxxl', height: '72px', font: '16px', desc: 'dot 20px' },
        ]} />
        <DocNote type="info">
          These values come from the Avatar category tokens in <code>DuiTokens.ts</code>. Set a local <code>size</code> prop to override the provider default for this instance only, or change <code>{'<DuiProvider size="...">'}</code> to restyle every avatar-category component in the tree.
        </DocNote>
      </DocSection>
      </div>
  );
}
