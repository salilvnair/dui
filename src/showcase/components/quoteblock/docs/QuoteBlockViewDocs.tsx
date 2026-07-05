import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference } from '../../../shared/DocComponents';

export function QuoteBlockViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Styled blockquote with left border accent', color: 'var(--color-primary)' },
          { label: 'Optional attribution + role footer', color: 'var(--color-success)' },
          { label: 'Optional avatar', color: 'var(--color-info)' },
          { label: 'Custom accent color', color: 'var(--color-warning)' },
          { label: 'DuiProvider size context', color: '#a855f7' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'children', type: 'ReactNode', required: true, description: 'The quoted text, automatically wrapped in curly quotes.' },
          { name: 'attribution', type: 'string', description: 'Name of the person being quoted, shown in the footer.' },
          { name: 'role', type: 'string', description: 'Optional secondary line under attribution, e.g. job title or company.' },
          { name: 'avatar', type: 'ReactNode', description: 'Optional avatar rendered next to the attribution.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls quote font size. Falls back to DuiProvider context.' },
          { name: 'color', type: 'string', default: 'var(--color-primary)', description: 'Accent color for the left border.' },
          { name: 'className', type: 'string', description: 'Additional class names on the outer blockquote.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the outer blockquote.' },
        ]} />
      </DocSection>

      <DocNote type="tip">
        The footer (avatar/attribution/role) only renders when at least one of attribution or avatar is provided — a bare quote with neither renders as a clean pull-quote with no footer space reserved.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="QuoteBlockView reads its dimensions from the shared display category base hook (useDisplayBase). Omitting size, borderRadius, or color on QuoteBlockView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every display-category component at once."
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
