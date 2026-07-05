import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference } from '../../../shared/DocComponents';

export function ListViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Avatar / title / subtitle / actions layout', color: 'var(--color-primary)' },
          { label: 'Per-item click handler', color: 'var(--color-success)' },
          { label: 'Renders as button when clickable, div otherwise', color: 'var(--color-info)' },
          { label: 'Automatic row dividers', color: 'var(--color-warning)' },
          { label: 'Text truncation with ellipsis', color: '#a855f7' },
          { label: 'DuiProvider size context', color: '#ec4899' },
          { label: 'Accepts arbitrary ReactNode content', color: '#14b8a6' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'items', type: 'ListViewItem[]', required: true, description: 'Ordered rows to render, each independently interactive or static.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls row padding, gap, and font size. Falls back to DuiProvider context.' },
          { name: 'color', type: 'string', description: 'Accent color passed to the internal card base (available for downstream theming).' },
          { name: 'className', type: 'string', description: 'Additional class names on the outer container.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the outer flex column container.' },
        ]} />
      </DocSection>

      <DocSection title="ListViewItem shape">
        <PropTable props={[
          { name: 'id', type: 'string', required: true, description: 'Unique key for the row.' },
          { name: 'avatar', type: 'ReactNode', description: 'Leading visual, typically an AvatarView or icon.' },
          { name: 'title', type: 'ReactNode', required: true, description: 'Primary row text, bold and truncated with ellipsis on overflow.' },
          { name: 'subtitle', type: 'ReactNode', description: 'Secondary muted text below the title.' },
          { name: 'actions', type: 'ReactNode', description: 'Trailing content — chips, icon buttons, timestamps.' },
          { name: 'onClick', type: '() => void', description: 'When provided, the row renders as a <button> and becomes keyboard-focusable and clickable.' },
        ]} />
      </DocSection>

      <DocNote type="info">
        Rows without onClick render as a plain div (not a button), so static informational lists stay fully accessible without stealing tab focus or implying interactivity.
      </DocNote>

      <DocNote type="tip">
        ListView has no built-in empty state — an empty items array renders nothing. Wrap it with your own conditional empty-state message (e.g. via ResultView) when the underlying collection might be empty.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="ListView reads its dimensions from the shared card category base hook (useCardBase). Omitting size, borderRadius, or color on ListView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every card-category component at once."
      >
        <FeatureGrid features={[
          { label: 'useCardBase', color: 'var(--color-primary)' },
          { label: 'Falls back to DuiProvider context', color: 'var(--color-success)' },
          { label: 'size / borderRadius / color', color: 'var(--color-info)' },
        ]} />
        <SizeReference sizes={[
          { size: 'xxs', height: '28px', font: '8px', desc: 'pad 10px 16px' },
          { size: 'xs', height: '36px', font: '9px', desc: 'pad 10px 16px' },
          { size: 'sm', height: '48px', font: '10px', desc: 'pad 4px 8px' },
          { size: 'md', height: '64px', font: '11px', desc: 'pad 6px 10px' },
          { size: 'lg', height: '80px', font: '12px', desc: 'pad 8px 12px' },
          { size: 'xl', height: '96px', font: '13px', desc: 'pad 10px 16px' },
          { size: 'xxl', height: '112px', font: '14px', desc: 'pad 10px 16px' },
          { size: 'xxxl', height: '128px', font: '16px', desc: 'pad 10px 16px' },
        ]} />
        <DocNote type="info">
          These values come from the Card category tokens in <code>DuiTokens.ts</code>. Set a local <code>size</code> prop to override the provider default for this instance only, or change <code>{'<DuiProvider size="...">'}</code> to restyle every card-category component in the tree.
        </DocNote>
      </DocSection>
      </div>
  );
}
