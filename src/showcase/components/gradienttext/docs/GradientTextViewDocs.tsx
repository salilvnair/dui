import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference } from '../../../shared/DocComponents';

export function GradientTextViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Animated gradient shift', color: 'var(--color-primary)' },
          { label: '2-3 stop custom colors', color: 'var(--color-success)' },
          { label: 'Configurable animation duration', color: 'var(--color-info)' },
          { label: 'CSS background-clip: text', color: 'var(--color-warning)' },
          { label: 'DuiProvider size context', color: '#a855f7' },
          { label: 'Bold weight by default', color: '#14b8a6' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'children', type: 'ReactNode', required: true, description: 'The text (or inline content) to render with the gradient fill.' },
          { name: 'colors', type: '[string, string, string?]', default: "['var(--color-primary)', 'var(--color-accent)', 'var(--color-success)']", description: 'Two or three CSS colors/variables used as gradient stops, left to right.' },
          { name: 'duration', type: 'number', default: '4', description: 'Animation duration in seconds for one full gradient cycle.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls font size. Falls back to DuiProvider context.' },
          { name: 'className', type: 'string', description: 'Additional class names on the outer span.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the outer span.' },
        ]} />
      </DocSection>

      <DocNote type="info">
        This component only fills text with an animated gradient — it does not manage its own font size beyond the size prop, so wrap it in a heading element or set style.fontSize directly for hero-scale headlines (as shown in the first example).
      </DocNote>

      <DocNote type="tip">
        Because the fill relies on background-clip: text with color: transparent, avoid placing GradientTextView text on top of another background-clip context (e.g. nested inside another gradient-text element) — it won't compose and will render invisible.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="GradientTextView reads its dimensions from the shared display category base hook (useDisplayBase). Omitting size, borderRadius, or color on GradientTextView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every display-category component at once."
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
