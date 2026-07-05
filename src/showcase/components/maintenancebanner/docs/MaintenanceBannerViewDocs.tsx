import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference } from '../../../shared/DocComponents';

export function MaintenanceBannerViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Warning-tinted strip', color: 'var(--color-warning)' },
          { label: 'Warning triangle icon', color: 'var(--color-warning)' },
          { label: 'Bold maintenance window text', color: 'var(--color-text-primary)' },
          { label: 'Optional dismiss action', color: 'var(--color-info)' },
          { label: 'Full-width, non-fixed strip', color: '#a855f7' },
          { label: 'DuiSize scaling', color: '#14b8a6' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'open', type: 'boolean', required: true, description: 'Whether the banner is visible. When false, renders null.' },
          { name: 'window', type: 'string', required: true, description: 'Human-readable maintenance window text, rendered bold inside the message.' },
          { name: 'onDismiss', type: '() => void', description: 'When provided, renders a "Dismiss" text button. Omit to make the banner non-dismissible.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls padding and font size via the DUI layout base.' },
          { name: 'className', type: 'string', description: 'Additional class names on the outer strip.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the outer strip.' },
        ]} />
      </DocSection>

      <DocNote type="tip">
        Unlike CookieConsentBannerView, MaintenanceBannerView is not position: fixed by default — it's a normal-flow strip meant to sit at the top of a layout (e.g. above a navbar), so it pushes content down rather than overlaying it.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="MaintenanceBannerView reads its dimensions from the shared layout category base hook (useLayoutBase). Omitting size, width, borderRadius, or color on MaintenanceBannerView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every layout-category component at once."
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
