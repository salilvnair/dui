import { DocSection, PropTable, FeatureGrid, EnumTable, DocNote, SizeReference, RadiusReference } from '../../../shared/DocComponents';

export function BannerViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Persistent top strip', color: 'var(--color-primary)' },
          { label: '4 semantic variants', color: 'var(--color-success)' },
          { label: 'Optional dismiss button', color: 'var(--color-info)' },
          { label: 'Optional action button', color: 'var(--color-warning)' },
          { label: 'Custom icon override', color: '#a855f7' },
          { label: 'Auto-tinted background per variant', color: '#ec4899' },
          { label: 'Full-width, responsive layout', color: '#14b8a6' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'open', type: 'boolean', required: true, description: 'Controls visibility. Renders null when false.' },
          { name: 'message', type: 'ReactNode', required: true, description: 'Banner body content — accepts plain text or rich JSX.' },
          { name: 'variant', type: 'BannerVariant', default: "'info'", description: 'Semantic color variant driving the background tint, border, and default icon accent.' },
          { name: 'onDismiss', type: '() => void', description: 'Shows a close (x) button when provided. Called when clicked.' },
          { name: 'actionLabel', type: 'string', description: 'Text for an optional inline action button.' },
          { name: 'onAction', type: '() => void', description: 'Called when the action button is clicked.' },
          { name: 'icon', type: 'ReactNode', default: '<InfoCircleIcon />', description: 'Overrides the default leading icon.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls padding, gap, and font size.' },
          { name: 'borderRadius', type: 'DuiRadius | number', description: 'Border radius preset or raw px value.' },
          { name: 'className', type: 'string', description: 'Additional class names on the outer container.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the outer container.' },
        ]} />
      </DocSection>

      <DocSection title="BannerVariant enum">
        <EnumTable name="BannerVariant" values={[
          { value: 'info', description: 'Neutral informational message. Uses var(--color-info).', color: 'var(--color-info)' },
          { value: 'success', description: 'Positive confirmation. Uses var(--color-success).', color: 'var(--color-success)' },
          { value: 'warning', description: 'Needs attention but not broken. Uses var(--color-warning).', color: 'var(--color-warning)' },
          { value: 'danger', description: 'Failure or blocking issue. Uses var(--color-error).', color: 'var(--color-error)' },
        ]} />
      </DocSection>

      <DocNote type="tip">
        BannerView is for persistent, page-level messages (rate limits, outages, version notices) that stay put until dismissed. For transient, auto-dismissing feedback after a user action, use SnackbarView or ToastView instead.
      </DocNote>

      <DocNote type="info">
        Background and border are derived from the variant's accent color via color-mix — no separate background prop is exposed, so pick the variant that matches the semantic intent rather than trying to force a custom background.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="BannerView reads its dimensions from the shared feedback category base hook (useFeedbackBase). Omitting size, width, borderRadius, or color on BannerView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every feedback-category component at once."
      >
        <FeatureGrid features={[
          { label: 'useFeedbackBase', color: 'var(--color-primary)' },
          { label: 'Falls back to DuiProvider context', color: 'var(--color-success)' },
          { label: 'size / width / borderRadius / color', color: 'var(--color-info)' },
        ]} />
        <SizeReference sizes={[
          { size: 'xxs', height: '2px thick', font: '8px', desc: 'ring 40px' },
          { size: 'xs', height: '3px thick', font: '9px', desc: 'ring 52px' },
          { size: 'sm', height: '4px thick', font: '10px', desc: 'ring 64px' },
          { size: 'md', height: '5px thick', font: '11px', desc: 'ring 80px' },
          { size: 'lg', height: '6px thick', font: '12px', desc: 'ring 100px' },
          { size: 'xl', height: '8px thick', font: '13px', desc: 'ring 120px' },
          { size: 'xxl', height: '10px thick', font: '14px', desc: 'ring 144px' },
          { size: 'xxxl', height: '12px thick', font: '16px', desc: 'ring 168px' },
        ]} />
        <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 4, marginBottom: 8 }}>
          Border radius presets, resolved via the <code>borderRadius</code> prop:
        </div>
        <RadiusReference radii={[
          { radius: 'none', value: '0px' },
          { radius: 'sm', value: '3px' },
          { radius: 'md', value: '4px' },
          { radius: 'lg', value: '6px' },
          { radius: 'full', value: 'full' },
        ]} />
        <DocNote type="info">
          These values come from the Feedback category tokens in <code>DuiTokens.ts</code>. Set a local <code>size</code> prop to override the provider default for this instance only, or change <code>{'<DuiProvider size="...">'}</code> to restyle every feedback-category component in the tree.
        </DocNote>
      </DocSection>
      </div>
  );
}
