import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference } from '../../../shared/DocComponents';

export function AvatarViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Image src with initials fallback', color: 'var(--color-primary)' },
          { label: 'Auto-derived initials from name', color: 'var(--color-success)' },
          { label: 'Optional presence-status dot', color: 'var(--color-info)' },
          { label: 'Custom accent color', color: 'var(--color-warning)' },
          { label: 'DuiProvider size context', color: '#a855f7' },
          { label: 'Circular with surface-border ring', color: '#ec4899' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'src', type: 'string | null', description: 'Image URL. When omitted or null, falls back to initials.' },
          { name: 'initials', type: 'string', description: 'Fallback text when no src is given. Auto-derived from name if omitted (first letter of first + last word, or first 2 chars, or "?" if no name).' },
          { name: 'name', type: 'string', description: 'Used to derive initials and as the img alt / title tooltip text.' },
          { name: 'status', type: 'PresenceStatus', description: 'Renders a PresenceDotView anchored to the bottom-right corner. Omit to hide.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls the avatar diameter and font size.' },
          { name: 'color', type: 'string', description: 'Accent color for text and background tint when no src is set. Falls back to the AvatarBase active color, then var(--color-primary).' },
          { name: 'className', type: 'string', description: 'Additional class names on the outer wrapper.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the outer wrapper span.' },
        ]} />
      </DocSection>

      <DocNote type="tip">
        For a stack of overlapping avatars with a "+N" overflow bubble (e.g. request collaborators), use AvatarGroupView — it composes multiple AvatarView instances for you rather than building the overlap manually.
      </DocNote>

      <DocNote type="info">
        status renders via PresenceDotView with ring enabled, which draws a var(--color-surface) border around the dot so it stays legible on top of any avatar image or background color.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="AvatarView reads its dimensions from the shared avatar category base hook (useAvatarBase). Omitting size or color on AvatarView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every avatar-category component at once."
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
