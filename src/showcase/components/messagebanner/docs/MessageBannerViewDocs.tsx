import { DocSection, PropTable, FeatureGrid, EnumTable, DocNote, SizeReference } from '../../../shared/DocComponents';

export function MessageBannerViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: '4 semantic variants with matching icons', color: 'var(--color-primary)' },
          { label: 'Left border accent + tinted background', color: 'var(--color-success)' },
          { label: 'Optional dismiss button', color: 'var(--color-info)' },
          { label: 'role="status" for screen readers', color: 'var(--color-warning)' },
          { label: 'DuiProvider size context', color: '#a855f7' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'variant', type: 'MessageBannerVariant', default: "'info'", description: 'Determines the icon, border color, and tint.' },
          { name: 'children', type: 'ReactNode', required: true, description: 'Message content.' },
          { name: 'onDismiss', type: '() => void', description: 'When provided, renders a close button that calls this handler.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls padding and font size. Falls back to DuiProvider context.' },
          { name: 'className', type: 'string', description: 'Additional class names on the outer strip.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the outer strip.' },
        ]} />
      </DocSection>

      <DocSection title="MessageBannerVariant enum">
        <EnumTable name="MessageBannerVariant" values={[
          { value: 'success', description: 'Green accent with a check-circle icon.', color: 'var(--color-success)' },
          { value: 'error', description: 'Red accent with a close icon.', color: 'var(--color-error)' },
          { value: 'warning', description: 'Amber accent with a warning-triangle icon.', color: 'var(--color-warning)' },
          { value: 'info', description: 'Blue accent with an info-circle icon. Default.', color: 'var(--color-info)' },
        ]} />
      </DocSection>

      <DocNote type="info">
        MessageBannerView is form-adjacent and meant for inline, non-dismissive-by-default status strips (e.g. under a form field or in a request builder). For page-level dismissible banners consider BannerView, and for modal-blocking alerts consider AlertDialogView.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="MessageBannerView reads its dimensions from the shared display category base hook (useDisplayBase). Omitting size, borderRadius, or color on MessageBannerView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every display-category component at once."
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
