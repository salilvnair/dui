import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference } from '../../../shared/DocComponents';

export function NotificationBadgeViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Overlay anchor for any child', color: 'var(--color-primary)' },
          { label: 'Count or plain dot mode', color: 'var(--color-success)' },
          { label: 'Overflow cap ("99+")', color: 'var(--color-info)' },
          { label: 'Force-hidden state', color: 'var(--color-warning)' },
          { label: 'Custom accent color', color: '#a855f7' },
          { label: 'Surface-colored ring for contrast', color: '#ec4899' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'children', type: 'ReactNode', required: true, description: 'The anchor element the badge overlays (icon, avatar, button, etc).' },
          { name: 'count', type: 'number', description: 'Omit or 0 for a plain dot badge (only shown if dot is also true). When provided and > 0, renders the number (or "{max}+" if it exceeds max).' },
          { name: 'hidden', type: 'boolean', default: 'false', description: 'Force-hides the badge entirely, overriding count/dot.' },
          { name: 'dot', type: 'boolean', default: 'false', description: 'Show a small dot indicator even without a count — e.g. "has unsaved changes."' },
          { name: 'max', type: 'number', default: '99', description: 'Counts above this render as "{max}+".' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls badge diameter and font size.' },
          { name: 'color', type: 'string', default: 'var(--color-error)', description: 'Badge background color.' },
          { name: 'className', type: 'string', description: 'Additional class names on the outer wrapper span.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the outer wrapper span.' },
        ]} />
      </DocSection>

      <DocNote type="tip">
        Passing count={undefined} (i.e. simply omitting count) is treated the same as dot mode — a bare dot renders with no digits. Pass an explicit count of 0 with dot unset to hide the badge for a "zero unread" state.
      </DocNote>

      <DocNote type="info">
        The badge wraps children in a position: relative span, so children don't need any positioning setup themselves — just drop in an IconButtonView, AvatarView, or any other element as-is.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="NotificationBadgeView reads its dimensions from the shared feedback category base hook (useFeedbackBase). Omitting size, width, borderRadius, or color on NotificationBadgeView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every feedback-category component at once."
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
        <DocNote type="info">
          These values come from the Feedback category tokens in <code>DuiTokens.ts</code>. Set a local <code>size</code> prop to override the provider default for this instance only, or change <code>{'<DuiProvider size="...">'}</code> to restyle every feedback-category component in the tree.
        </DocNote>
      </DocSection>
      </div>
  );
}
