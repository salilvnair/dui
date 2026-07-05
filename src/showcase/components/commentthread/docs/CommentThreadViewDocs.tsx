import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference } from '../../../shared/DocComponents';

export function CommentThreadViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Recursive nested replies', color: 'var(--color-primary)' },
          { label: 'Per-comment avatar with fallback placeholder', color: 'var(--color-success)' },
          { label: 'Optional Reply action per node', color: 'var(--color-info)' },
          { label: 'Depth-based indentation (24px per level)', color: 'var(--color-warning)' },
          { label: 'DuiProvider size context', color: '#a855f7' },
          { label: 'GitHub/PR-style visual language', color: '#ec4899' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'comments', type: 'CommentNode[]', required: true, description: 'Top-level list of comment nodes. Each node may recursively include a replies array.' },
          { name: 'onReply', type: '(id: string) => void', description: 'Called with the comment id when its Reply button is clicked. Omit to hide the Reply action entirely.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls font size and spacing. Falls back to DuiProvider context.' },
          { name: 'color', type: 'string', default: 'var(--color-primary)', description: 'Accent color used for the Reply action text.' },
          { name: 'className', type: 'string', description: 'Additional class names on the outer container.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the outer container.' },
        ]} />
      </DocSection>

      <DocSection title="CommentNode shape">
        <PropTable props={[
          { name: 'id', type: 'string', required: true, description: 'Unique identifier, passed to onReply.' },
          { name: 'author', type: 'string', required: true, description: 'Display name of the commenter.' },
          { name: 'avatar', type: 'ReactNode', description: 'Optional avatar; falls back to a neutral circle placeholder.' },
          { name: 'timestamp', type: 'string', required: true, description: 'Relative or absolute time string (e.g. "2h ago").' },
          { name: 'content', type: 'string', required: true, description: 'The comment body text.' },
          { name: 'replies', type: 'CommentNode[]', description: 'Nested child comments, rendered indented beneath this node.' },
        ]} />
      </DocSection>

      <DocNote type="tip">
        Reply composition UI is intentionally not built in — onReply only reports which comment was targeted. Render your own inline textarea or open a modal keyed on that id.
      </DocNote>

      <DocNote type="warning">
        There is no built-in depth limit — deeply nested reply chains will keep indenting 24px per level. Consider flattening past 3-4 levels in very active threads to avoid horizontal overflow.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="CommentThreadView reads its dimensions from the shared card category base hook (useCardBase). Omitting size, borderRadius, or color on CommentThreadView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every card-category component at once."
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
