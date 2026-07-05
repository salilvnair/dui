import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference } from '../../../shared/DocComponents';

export function AIStreamingTextViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Per-token fade-in as text grows', color: 'var(--color-primary)' },
          { label: 'Pre-first-token thinking shimmer', color: 'var(--color-success)' },
          { label: 'Soft blinking cursor', color: 'var(--color-info)' },
          { label: 'Only animates newly-appended tokens', color: 'var(--color-warning)' },
          { label: 'DuiProvider size context', color: '#a855f7' },
          { label: 'Custom accent color', color: '#14b8a6' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'text', type: 'string', required: true, description: 'Full text to reveal. Feed it a growing string (append tokens as they stream in) — already-rendered tokens are not re-animated on each update.' },
          { name: 'thinking', type: 'boolean', default: 'false', description: 'When true and text is empty, renders a shimmering "Thinking…" placeholder instead of nothing.' },
          { name: 'streaming', type: 'boolean', default: 'true', description: 'Shows a blinking cursor after the last revealed token. Set to false once the response is complete.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls font size. Falls back to DuiProvider context.' },
          { name: 'color', type: 'string', default: 'var(--color-text-primary)', description: 'Text color.' },
          { name: 'className', type: 'string', description: 'Additional class names on the outer span.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the outer span.' },
        ]} />
      </DocSection>

      <DocNote type="info">
        Only tokens beyond the previous render's token count get the fade-in class — so appending text.length incrementally (as a real SSE/streaming response does) animates smoothly, but replacing the whole string with unrelated content re-fades everything since there's no stable prefix to diff against.
      </DocNote>

      <DocNote type="tip">
        Use thinking together with an empty text while waiting on the first token from your LLM call, then flip to passing the growing string once tokens start arriving — this avoids a jarring empty-to-full jump.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="AIStreamingTextView reads its dimensions from the shared display category base hook (useDisplayBase). Omitting size, borderRadius, or color on AIStreamingTextView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every display-category component at once."
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
