import { DocSection, PropTable, FeatureGrid, EnumTable, DocNote, SizeReference } from '../../../shared/DocComponents';

export function PresenceDotViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: '4 semantic statuses', color: 'var(--color-primary)' },
          { label: 'Optional surface-colored ring', color: 'var(--color-success)' },
          { label: 'DuiProvider size context', color: 'var(--color-info)' },
          { label: 'aria-label matching status', color: 'var(--color-warning)' },
          { label: 'Tiny, composable primitive', color: '#a855f7' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'status', type: 'PresenceStatus', required: true, description: 'Which presence state to display.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls dot diameter.' },
          { name: 'ring', type: 'boolean', default: 'false', description: 'Adds a 2px var(--color-surface) border, useful when overlapping an avatar image or colored surface for contrast.' },
          { name: 'className', type: 'string', description: 'Additional class names.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the dot element.' },
        ]} />
      </DocSection>

      <DocSection title="PresenceStatus enum">
        <EnumTable name="PresenceStatus" values={[
          { value: 'online', description: 'Active now. Uses var(--color-success).', color: 'var(--color-success)' },
          { value: 'away', description: 'Idle / stepped away. Uses var(--color-warning).', color: 'var(--color-warning)' },
          { value: 'busy', description: 'Do not disturb. Uses var(--color-error).', color: 'var(--color-error)' },
          { value: 'offline', description: 'Not connected. Uses var(--color-text-muted).', color: 'var(--color-text-muted)' },
        ]} />
      </DocSection>

      <DocNote type="tip">
        PresenceDotView is the primitive AvatarView uses internally for its status prop — reach for it directly when you need a status indicator that isn't attached to an avatar, e.g. in a team member list row or a server/connection health strip.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="PresenceDotView reads its dimensions from the shared avatar category base hook (useAvatarBase). Omitting size or color on PresenceDotView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every avatar-category component at once."
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
