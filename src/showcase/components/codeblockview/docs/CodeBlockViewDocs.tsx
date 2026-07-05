import { DocSection, PropTable, FeatureGrid, DocNote } from '../../../shared/DocComponents';

export function CodeBlockViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Syntax highlighting via highlight.js', color: 'var(--color-primary)' },
          { label: 'Auto language detection (highlightAuto)', color: 'var(--color-success)' },
          { label: 'Copy-to-clipboard button with feedback', color: 'var(--color-info)' },
          { label: 'Optional line numbers', color: 'var(--color-warning)' },
          { label: 'Configurable maxHeight + scroll overflow', color: '#a855f7' },
          { label: 'Language label in header bar', color: '#ec4899' },
          { label: 'Custom accent color for copy button hover', color: '#14b8a6' },
          { label: '11 pre-registered languages', color: '#f97316' },
        ]} />
      </DocSection>

      <DocSection title="Supported languages">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {['javascript (js, jsx)', 'typescript (ts, tsx)', 'json', 'xml (html)', 'css', 'bash (shell, sh)', 'yaml (yml)', 'python (py)'].map((lang, i) => {
            const colors = ['var(--color-primary)', 'var(--color-success)', 'var(--color-info)', 'var(--color-warning)', '#a855f7', '#ec4899', '#14b8a6', '#f97316'];
            const c = colors[i % colors.length];
            return (
              <span key={lang} style={{
                padding: '3px 10px', borderRadius: 99, fontSize: 11, fontWeight: 600,
                background: `color-mix(in srgb, ${c} 14%, transparent)`,
                color: c, border: `1px solid color-mix(in srgb, ${c} 30%, transparent)`,
              }}>
                {lang}
              </span>
            );
          })}
        </div>
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'code', type: 'string', required: true, description: 'The source code string to display.' },
          { name: 'language', type: 'string', description: 'Language identifier for syntax highlighting (e.g. "json", "typescript"). When omitted, highlightAuto is used.' },
          { name: 'showCopyButton', type: 'boolean', default: 'true', description: 'When true, shows a Copy button in the top bar that copies the code to the clipboard.' },
          { name: 'showLineNumbers', type: 'boolean', default: 'false', description: 'When true, renders line numbers to the left of each code line.' },
          { name: 'maxHeight', type: 'string', default: "'300px'", description: 'CSS max-height for the scrollable code area. The block scrolls vertically when content exceeds this height.' },
          { name: 'accentColor', type: 'string', description: 'Color used for the copy button success state and hover. Defaults to var(--color-primary).' },
          { name: 'className', type: 'string', description: 'Additional class names for the outer container div.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline styles for the outer container div (merged before overflow:hidden).' },
        ]} />
      </DocSection>

      <DocNote type="info">
        {'When showLineNumbers=true, each line is highlighted individually using hljs.highlight(line, { language }). When false (default), the entire code string is highlighted in one pass, which is faster for large files.'}
      </DocNote>

      <DocNote type="tip">
        The copy button shows a green "Copied" state with a check icon for 1500ms after a successful copy, then reverts. The success color is var(--color-success) regardless of accentColor.
      </DocNote>

      <DocNote type="warning">
        When language is set but not registered with highlight.js, the component falls back to highlightAuto on that specific code string. Unknown language values are silently ignored.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="CodeBlockView does not read size, width, color, or borderRadius from the DuiProvider context — it is not part of the sized-component system and has no size prop to fall back to a provider default."
      >
        <DocNote type="info">
          CodeBlockView is unaffected by <code>{'<DuiProvider>'}</code> size/color context. Style it directly via its own props (and CSS variables where documented above) rather than expecting provider-level sizing to apply.
        </DocNote>
      </DocSection>
      </div>
  );
}
