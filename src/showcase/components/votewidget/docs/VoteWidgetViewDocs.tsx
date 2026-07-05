import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference } from '../../../shared/DocComponents';

export function VoteWidgetViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Up/down vote counter', color: 'var(--color-primary)' },
          { label: 'Single active vote direction', color: 'var(--color-success)' },
          { label: 'Click active arrow again to clear vote', color: 'var(--color-info)' },
          { label: 'Controlled score display', color: 'var(--color-warning)' },
          { label: 'Custom accent color', color: '#a855f7' },
          { label: 'Built on useButtonBase', color: '#ec4899' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'score', type: 'number', required: true, description: 'The current net score to display. VoteWidgetView does not compute this — the parent must update it in onVote.' },
          { name: 'userVote', type: "'up' | 'down' | null", required: true, description: "The current user's vote direction, or null if they haven't voted." },
          { name: 'onVote', type: "(vote: 'up' | 'down' | null) => void", required: true, description: 'Called with the new vote direction. Fires with null when the user clicks the already-active direction again (un-voting).' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls arrow icon size and score font size.' },
          { name: 'color', type: 'string', description: 'Accent color for the active arrow. Defaults to var(--color-primary) via useButtonBase.' },
          { name: 'className', type: 'string', description: 'Additional class names on the outer column container.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override on the outer column container.' },
        ]} />
      </DocSection>

      <DocNote type="warning">
        VoteWidgetView is fully controlled and does not do score arithmetic internally — your onVote handler is responsible for incrementing/decrementing score to match the vote transition (e.g. switching from downvote directly to upvote should add 2, not 1).
      </DocNote>

      <DocNote type="tip">
        For a simpler binary like/heart interaction without a numeric score axis, use LikeButtonView instead — VoteWidgetView is specifically for the three-state up/neutral/down pattern.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="VoteWidgetView reads its dimensions from the shared button category base hook (useButtonBase). Omitting size, width, borderRadius, or color on VoteWidgetView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every button-category component at once."
      >
        <FeatureGrid features={[
          { label: 'useButtonBase', color: 'var(--color-primary)' },
          { label: 'Falls back to DuiProvider context', color: 'var(--color-success)' },
          { label: 'size / width / borderRadius / color', color: 'var(--color-info)' },
        ]} />
        <SizeReference sizes={[
          { size: 'xxs', height: '16px', font: '8px', desc: 'padX 4px' },
          { size: 'xs', height: '20px', font: '9px', desc: 'padX 6px' },
          { size: 'sm', height: '24px', font: '10px', desc: 'padX 8px' },
          { size: 'md', height: '28px', font: '11px', desc: 'padX 10px' },
          { size: 'lg', height: '36px', font: '12px', desc: 'padX 12px' },
          { size: 'xl', height: '40px', font: '13px', desc: 'padX 16px' },
          { size: 'xxl', height: '48px', font: '14px', desc: 'padX 20px' },
          { size: 'xxxl', height: '56px', font: '16px', desc: 'padX 24px' },
        ]} />
        <DocNote type="info">
          These values come from the Button category tokens in <code>DuiTokens.ts</code>. Set a local <code>size</code> prop to override the provider default for this instance only, or change <code>{'<DuiProvider size="...">'}</code> to restyle every button-category component in the tree.
        </DocNote>
      </DocSection>
      </div>
  );
}
