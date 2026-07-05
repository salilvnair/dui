import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference } from '../../../shared/DocComponents';

export function NotificationCenterViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Bell trigger + unread-count dot', color: 'var(--color-primary)' },
          { label: 'Portal-rendered dropdown, auto-positioned', color: 'var(--color-success)' },
          { label: 'Click-outside to close', color: 'var(--color-info)' },
          { label: 'Per-item icon, description, and onClick', color: 'var(--color-warning)' },
          { label: 'Mark-all-read header action', color: '#a855f7' },
          { label: 'Empty state message', color: '#ec4899' },
          { label: 'DuiProvider size context', color: '#14b8a6' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'notifications', type: 'NotificationItem[]', required: true, description: 'List of notifications to render in the dropdown.' },
          { name: 'onMarkAllRead', type: '() => void', description: 'When provided, shows a "Mark all read" button in the dropdown header.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls font sizes inside the dropdown. Falls back to DuiProvider context.' },
          { name: 'color', type: 'string', default: 'var(--color-primary)', description: 'Accent color used for icons, the "Mark all read" link, and unread dots.' },
          { name: 'className', type: 'string', description: 'Additional class names on the outer wrapper.' },
        ]} />
      </DocSection>

      <DocSection title="NotificationItem shape">
        <PropTable props={[
          { name: 'id', type: 'string', required: true, description: 'Unique identifier for the notification.' },
          { name: 'title', type: 'string', required: true, description: 'Primary bold text.' },
          { name: 'description', type: 'string', description: 'Optional secondary line of detail.' },
          { name: 'timestamp', type: 'string', required: true, description: 'Relative or absolute time string.' },
          { name: 'read', type: 'boolean', description: 'When true, renders with regular weight and no unread dot.' },
          { name: 'icon', type: 'ReactNode', description: 'Optional leading icon, tinted with the accent color.' },
          { name: 'onClick', type: '() => void', description: 'Called when the notification row is clicked.' },
        ]} />
      </DocSection>

      <DocNote type="warning">
        The dropdown renders via a React portal to document.body and computes its position from the trigger button's bounding rect on open — if you render this inside a transformed or overflow:hidden ancestor, positioning still works correctly since it escapes that container.
      </DocNote>

      <DocNote type="tip">
        Unread count is derived automatically from notifications.filter(n =&gt; !n.read).length — there's no separate unreadCount prop, so keep the read flag in sync with your backend/websocket state.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="NotificationCenterView reads its dimensions from the shared overlay category base hook (useOverlayBase). Omitting size, borderRadius, or color on NotificationCenterView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every overlay-category component at once."
      >
        <FeatureGrid features={[
          { label: 'useOverlayBase', color: 'var(--color-primary)' },
          { label: 'Falls back to DuiProvider context', color: 'var(--color-success)' },
          { label: 'size / borderRadius / color', color: 'var(--color-info)' },
        ]} />
        <SizeReference sizes={[
          { size: 'xxs', height: '—', font: '15px', desc: 'padX 24px, radius 4px' },
          { size: 'xs', height: '—', font: '15px', desc: 'padX 24px, radius 5px' },
          { size: 'sm', height: '—', font: '12px', desc: 'padX 12px, radius 6px' },
          { size: 'md', height: '—', font: '13px', desc: 'padX 16px, radius 8px' },
          { size: 'lg', height: '—', font: '14px', desc: 'padX 20px, radius 10px' },
          { size: 'xl', height: '—', font: '15px', desc: 'padX 24px, radius 12px' },
          { size: 'xxl', height: '—', font: '15px', desc: 'padX 24px, radius 14px' },
          { size: 'xxxl', height: '—', font: '15px', desc: 'padX 24px, radius 16px' },
        ]} />
        <DocNote type="info">
          These values come from the Overlay category tokens in <code>DuiTokens.ts</code>. Set a local <code>size</code> prop to override the provider default for this instance only, or change <code>{'<DuiProvider size="...">'}</code> to restyle every overlay-category component in the tree.
        </DocNote>
      </DocSection>
      </div>
  );
}
