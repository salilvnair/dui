import { DocSection, PropTable, FeatureGrid, DocNote } from '../../../shared/DocComponents';

export function MarkdownViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Marked v14 rendering', color: 'var(--color-primary)' },
          { label: 'highlight.js syntax highlighting', color: 'var(--color-success)' },
          { label: 'Language alias resolution (js→javascript, ts→typescript)', color: 'var(--color-info)' },
          { label: 'Auto-language detection via highlightAuto', color: 'var(--color-warning)' },
          { label: 'Copy button per code block', color: '#a855f7' },
          { label: 'GFM tables and task lists', color: '#ec4899' },
          { label: 'Blockquotes and inline code', color: '#14b8a6' },
          { label: 'Singleton marked config (configured once)', color: '#f97316' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'content', type: 'string', required: true, description: 'Markdown string to render.' },
          { name: 'className', type: 'string', description: 'Extra CSS class on the root div. Add mdv-root to scope styles.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline styles on the root div.' },
        ]} />
      </DocSection>

      <DocSection title="Code block features">
        <PropTable props={[
          { name: 'language pill', type: 'span.mdv-lang-pill', description: 'Shows the detected/specified language name above the code block.' },
          { name: 'copy button', type: 'button.mdv-copy-btn', description: 'Copies raw code to clipboard. Shows a checkmark for 2s after clicking.' },
          { name: 'inline code', type: 'code.mdv-inline-code', description: 'Backtick-wrapped code styled with mdv-inline-code class.' },
        ]} />
      </DocSection>

      <DocSection title="Dependencies">
        <DocNote type="warning">
          MarkdownView depends on <code>marked</code> (v14) and <code>highlight.js</code> (v11) being bundled. These are already included in the DUI package. The marked instance is configured once via a singleton guard — subsequent renders reuse the same renderer.
        </DocNote>
        <DocNote type="info">
          Language aliases supported: <code>js→javascript</code>, <code>ts→typescript</code>, <code>sh→bash</code>, <code>py→python</code>, <code>yml→yaml</code>, <code>rb→ruby</code>, <code>rs→rust</code>, <code>cs→csharp</code>, <code>kt→kotlin</code>. Unknown languages fall back to <code>highlightAuto</code>.
        </DocNote>
      </DocSection>

      <DocSection title="Styling">
        <DocNote type="tip">
          All MarkdownView styles live in a single CSS file scoped to <code>.mdv-root</code>. Override specific elements by adding rules targeting <code>.mdv-root p</code>, <code>.mdv-root pre</code>, etc. in your app stylesheet.
        </DocNote>
      </DocSection>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="MarkdownView does not read size, width, color, or borderRadius from the DuiProvider context — it is not part of the sized-component system and has no size prop to fall back to a provider default."
      >
        <DocNote type="info">
          MarkdownView is unaffected by <code>{'<DuiProvider>'}</code> size/color context. Style it directly via its own props (and CSS variables where documented above) rather than expecting provider-level sizing to apply.
        </DocNote>
      </DocSection>
      </div>
  );
}
