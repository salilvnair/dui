import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference } from '../../../shared/DocComponents';

export function DiffMorphViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Word-level LCS diff', color: 'var(--color-primary)' },
          { label: 'FLIP-animated reflow for unchanged words', color: 'var(--color-success)' },
          { label: 'Fade/strike styling for changed words', color: 'var(--color-info)' },
          { label: 'DuiProvider size context', color: 'var(--color-warning)' },
          { label: 'No external diff library dependency', color: '#a855f7' },
          { label: 'DUI-original interaction pattern', color: '#14b8a6' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'text', type: 'string', required: true, description: 'The current text. Changing this prop (uncontrolled — no "old text" prop needed) triggers the diff against the previously rendered text and animates the transition.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls font size. Falls back to DuiProvider context.' },
          { name: 'className', type: 'string', description: 'Additional class names on the outer container.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the outer container.' },
        ]} />
      </DocSection>

      <DocNote type="info">
        There is no separate "previous text" prop — the component internally remembers the last rendered word list in a ref and diffs against it automatically whenever text changes. Just update text like any other controlled string; the diff and FLIP animation happen for you.
      </DocNote>

      <DocNote type="warning">
        The word-level LCS diff is O(n*m) in word count, which is fine for prose-length strings (comments, descriptions, short schema snippets) but not intended for diffing large JSON payloads or full file contents — use a dedicated diff view for that.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="DiffMorphView reads its dimensions from the shared display category base hook (useDisplayBase). Omitting size, borderRadius, or color on DiffMorphView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every display-category component at once."
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
