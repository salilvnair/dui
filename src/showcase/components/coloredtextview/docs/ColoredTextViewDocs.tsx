import { DocSection, PropTable, FeatureGrid, DocNote } from '../../../shared/DocComponents';

export function ColoredTextViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Per-token color', color: 'var(--color-primary)' },
          { label: 'Bold, italic, underline, monospace per token', color: 'var(--color-success)' },
          { label: 'Click-to-copy per token', color: 'var(--color-info)' },
          { label: 'Hover tooltip on copyable tokens', color: 'var(--color-warning)' },
          { label: 'configurable fontSize + lineHeight', color: '#a855f7' },
          { label: 'parseXmlTokens helper (XML syntax highlighting)', color: '#ec4899' },
          { label: 'Inline span-based rendering (no block wrapping)', color: '#14b8a6' },
        ]} />
      </DocSection>

      <DocSection
        title="Overview"
        description="ColoredTextView renders an array of ColorToken objects as adjacent inline spans. Each token can have its own color, font weight, style, family, underline, and click-to-copy behaviour. It is ideal for syntax-highlighted inline text, status messages with mixed colors, and labeled values."
      >
        <></>
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'tokens', type: 'ColorToken[]', required: true, description: 'Array of token objects. Each is rendered as an inline span.' },
          { name: 'fontSize', type: 'string', default: "'12px'", description: 'Font size applied to the outer span (inherited by all tokens).' },
          { name: 'lineHeight', type: 'number', default: '1.6', description: 'Line height applied to the outer span.' },
          { name: 'className', type: 'string', description: 'Additional class names for the outer span element.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline styles for the outer span element.' },
        ]} />
      </DocSection>

      <DocSection title="ColorToken shape">
        <PropTable props={[
          { name: 'text', type: 'string', required: true, description: 'The string content of this token.' },
          { name: 'color', type: 'string', description: 'CSS color or variable. Defaults to var(--color-text-primary) when omitted.' },
          { name: 'bold', type: 'boolean', description: 'When true, fontWeight: 700.' },
          { name: 'italic', type: 'boolean', description: 'When true, fontStyle: italic.' },
          { name: 'mono', type: 'boolean', description: 'When true, fontFamily: monospace.' },
          { name: 'underline', type: 'boolean', description: 'When true, textDecoration: underline.' },
          { name: 'copyable', type: 'boolean', description: "When true, clicking the span copies token.text to clipboard via navigator.clipboard.writeText. Shows a 'Click to copy: ...' browser tooltip." },
        ]} />
      </DocSection>

      <DocSection title="parseXmlTokens helper">
        <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: 8 }}>
          The exported <code style={{ fontFamily: 'monospace', color: 'var(--color-primary)' }}>parseXmlTokens(xml: string)</code> function parses an XML/HTML string into a ColorToken array with syntax highlighting colors:
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {[
            { part: 'Tag brackets (<, >, />', color: 'var(--color-text-muted)' },
            { part: 'Tag names (e.g. soap:Envelope)', color: 'var(--color-protocol-soap)' },
            { part: 'Attribute names', color: 'var(--color-info)' },
            { part: 'Attribute values', color: 'var(--color-success)' },
            { part: 'Text nodes', color: 'var(--color-text-primary)' },
          ].map(r => (
            <div key={r.part} style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: r.color, flexShrink: 0 }} />
              <span style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>{r.part}</span>
            </div>
          ))}
        </div>
      </DocSection>

      <DocNote type="tip">
        Use parseXmlTokens to render SOAP/XML envelopes with color-coded tags in a compact inline view. Pass the returned token array directly to ColoredTextView tokens prop.
      </DocNote>

      <DocNote type="info">
        All tokens render as inline spans — ColoredTextView itself is an inline span. Wrap it in a block element (div, p) if you need block layout. This keeps the component composition flexible.
      </DocNote>
    </div>
  );
}
