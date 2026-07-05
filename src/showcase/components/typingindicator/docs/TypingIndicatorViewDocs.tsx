import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference } from '../../../shared/DocComponents';

export function TypingIndicatorViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Animated 3-dot pulse', color: 'var(--color-primary)' },
          { label: 'Optional "is typing…" label', color: 'var(--color-success)' },
          { label: 'Custom dot color', color: 'var(--color-info)' },
          { label: 'DuiProvider size context', color: 'var(--color-warning)' },
          { label: 'Pill-shaped surface, no layout shift', color: '#a855f7' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'label', type: 'string', description: 'Optional text shown next to the dots (e.g. "Jordan is typing…"). Omit for a bare dot indicator.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls label font size. Falls back to DuiProvider context.' },
          { name: 'color', type: 'string', default: 'var(--color-text-muted)', description: 'Color of the animated dots.' },
          { name: 'className', type: 'string', description: 'Additional class names on the outer wrapper.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the outer wrapper.' },
        ]} />
      </DocSection>

      <DocNote type="tip">
        Place TypingIndicatorView at the bottom of a MessageBubbleView list — conditionally render it while a websocket "typing" event is active, and remove it as soon as the message arrives or a short timeout elapses.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="TypingIndicatorView reads its dimensions from the shared display category base hook (useDisplayBase). Omitting size, borderRadius, or color on TypingIndicatorView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every display-category component at once."
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
