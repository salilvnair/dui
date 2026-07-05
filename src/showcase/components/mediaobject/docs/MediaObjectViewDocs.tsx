import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference } from '../../../shared/DocComponents';

export function MediaObjectViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Media / content / actions three-slot layout', color: 'var(--color-primary)' },
          { label: 'Media and actions accept any ReactNode', color: 'var(--color-success)' },
          { label: 'Content area flexes and truncates safely', color: 'var(--color-info)' },
          { label: 'Composable — nests for threaded replies', color: 'var(--color-warning)' },
          { label: 'Size-driven gap and font scale', color: '#a855f7' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'media', type: 'ReactNode', required: true, description: 'Fixed-width leading element — typically an AvatarView or an icon badge.' },
          { name: 'children', type: 'ReactNode', required: true, description: 'Main content area. Flexes to fill available width; min-width: 0 so long text wraps/truncates instead of overflowing.' },
          { name: 'actions', type: 'ReactNode', description: 'Trailing controls, e.g. an IconButtonView overflow menu or inline action buttons.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls the gap between media/content/actions and the content font size. Falls back to DuiProvider context when omitted.' },
          { name: 'className', type: 'string', description: 'Additional class names on the outer container.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override merged onto the outer container.' },
        ]} />
      </DocSection>

      <DocNote type="info">
        This is the classic "Media Object" layout primitive — align-items: flex-start keeps the media pinned to the top even when content wraps to multiple lines, which suits comment threads and notification feeds.
      </DocNote>

      <DocNote type="tip">
        Nest MediaObjectView inside its own children slot to build threaded reply UIs. Use a smaller size and omit actions on nested replies to visually de-emphasize them.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="MediaObjectView reads its dimensions from the shared layout category base hook (useLayoutBase). Omitting size, width, borderRadius, or color on MediaObjectView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every layout-category component at once."
      >
        <FeatureGrid features={[
          { label: 'useLayoutBase', color: 'var(--color-primary)' },
          { label: 'Falls back to DuiProvider context', color: 'var(--color-success)' },
          { label: 'size / width / borderRadius / color', color: 'var(--color-info)' },
        ]} />
        <SizeReference sizes={[
          { size: 'xxs', height: '—', font: '8px', desc: 'pad 32px' },
          { size: 'xs', height: '—', font: '9px', desc: 'pad 32px' },
          { size: 'sm', height: '—', font: '10px', desc: 'pad 12px' },
          { size: 'md', height: '—', font: '11px', desc: 'pad 16px' },
          { size: 'lg', height: '—', font: '12px', desc: 'pad 24px' },
          { size: 'xl', height: '—', font: '13px', desc: 'pad 32px' },
          { size: 'xxl', height: '—', font: '14px', desc: 'pad 32px' },
          { size: 'xxxl', height: '—', font: '16px', desc: 'pad 32px' },
        ]} />
        <DocNote type="info">
          These values come from the Layout category tokens in <code>DuiTokens.ts</code>. Set a local <code>size</code> prop to override the provider default for this instance only, or change <code>{'<DuiProvider size="...">'}</code> to restyle every layout-category component in the tree.
        </DocNote>
      </DocSection>
      </div>
  );
}
