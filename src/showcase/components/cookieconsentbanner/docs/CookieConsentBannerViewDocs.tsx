import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference } from '../../../shared/DocComponents';

export function CookieConsentBannerViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Fixed bottom-of-viewport bar', color: 'var(--color-primary)' },
          { label: 'Controlled open/closed state', color: 'var(--color-info)' },
          { label: 'Accept action (required)', color: 'var(--color-success)' },
          { label: 'Optional customize action', color: 'var(--color-warning)' },
          { label: 'Custom accent color', color: '#a855f7' },
          { label: 'Renders null when closed', color: '#14b8a6' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'open', type: 'boolean', required: true, description: 'Whether the banner is visible. When false, the component renders null entirely.' },
          { name: 'message', type: 'string', default: '"We use cookies to improve your experience and analyze usage."', description: 'Body copy shown in the banner.' },
          { name: 'onAccept', type: '() => void', required: true, description: 'Called when the Accept button is clicked. Typically sets open to false.' },
          { name: 'onCustomize', type: '() => void', description: 'When provided, renders a "Customize" text button, e.g. to open a preferences modal.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls padding and font size via the DUI layout base.' },
          { name: 'color', type: 'string', default: 'var(--color-primary)', description: 'Accent color for the Accept button.' },
          { name: 'className', type: 'string', description: 'Additional class names on the outer bar.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the outer bar. Uses position: fixed by default — override position if embedding inline (as done in these examples for preview purposes).' },
        ]} />
      </DocSection>

      <DocNote type="warning">
        By default the banner uses position: fixed with a high z-index intended to sit above all page content. In embedded previews (like this showcase) the style prop is overridden to position: absolute — in production usage you typically want the default fixed positioning untouched.
      </DocNote>

      <DocNote type="tip">
        This component does not persist consent itself — pair it with localStorage or a cookie check in the parent so open is derived from whether consent was already given, avoiding the banner reappearing on every page load.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="CookieConsentBannerView reads its dimensions from the shared layout category base hook (useLayoutBase). Omitting size, width, borderRadius, or color on CookieConsentBannerView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every layout-category component at once."
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
