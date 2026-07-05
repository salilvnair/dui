import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference } from '../../../shared/DocComponents';

export function StickyHeaderViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Sticky section header', color: 'var(--color-primary)' },
          { label: 'Shadow grows automatically once pinned', color: 'var(--color-success)' },
          { label: 'DuiProvider size context (padding)', color: 'var(--color-info)' },
          { label: 'Configurable offsetTop for stacked sticky elements', color: 'var(--color-warning)' },
          { label: 'Works for repeated group headers in a list', color: '#a855f7' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'children', type: 'ReactNode', required: true, description: 'Header content — usually a section title string.' },
          { name: 'offsetTop', type: 'number', default: '0', description: 'Distance from the scroll container top before the header pins and its shadow appears.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls horizontal padding via the DUI layout token scale. Falls back to DuiProvider context when omitted.' },
          { name: 'className', type: 'string', description: 'Additional class names applied to the header.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the header.' },
        ]} />
      </DocSection>

      <DocNote type="info">
        The shadow transition is purely visual feedback — the header is always position: sticky, so it never actually leaves the top of its scroll container once it reaches offsetTop.
      </DocNote>

      <DocNote type="tip">
        Stack multiple StickyHeaderView instances as group dividers inside one scrollable list (e.g. "Auth Endpoints", "Webhook Endpoints") — each one pins independently as it reaches the top, giving a native-feeling grouped list without extra layout code.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="StickyHeaderView reads its dimensions from the shared layout category base hook (useLayoutBase). Omitting size, width, borderRadius, or color on StickyHeaderView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every layout-category component at once."
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
