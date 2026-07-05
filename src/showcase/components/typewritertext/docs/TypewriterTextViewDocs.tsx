import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference } from '../../../shared/DocComponents';

export function TypewriterTextViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Character-by-character typing animation', color: 'var(--color-primary)' },
          { label: 'Single string or cycling array', color: 'var(--color-success)' },
          { label: 'Configurable speed & pause', color: 'var(--color-info)' },
          { label: 'Loop on/off', color: 'var(--color-warning)' },
          { label: 'Blinking cursor', color: '#a855f7' },
          { label: 'Monospace by default', color: '#14b8a6' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'text', type: 'string | string[]', required: true, description: 'A single string to type once, or an array of strings that cycle: type → pause → delete → next.' },
          { name: 'speed', type: 'number', default: '45', description: 'Milliseconds per character typed. Deletion happens at half this speed.' },
          { name: 'pause', type: 'number', default: '1500', description: 'Milliseconds to hold the fully-typed string before deleting/cycling, when text is an array.' },
          { name: 'loop', type: 'boolean', default: 'true', description: 'When false and text is an array, stops after typing the last string instead of deleting and cycling back.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls font size. Falls back to DuiProvider context.' },
          { name: 'color', type: 'string', default: 'var(--color-text-primary)', description: 'Text color.' },
          { name: 'className', type: 'string', description: 'Additional class names on the outer span.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the outer span.' },
        ]} />
      </DocSection>

      <DocNote type="info">
        With a single string and loop={false}, the component types once and simply stops with the cursor left blinking at the end — useful for a one-shot reveal (e.g. an onboarding tip) rather than an ambient looping animation.
      </DocNote>

      <DocNote type="tip">
        Font is monospace (var(--font-mono)) by default so character width stays constant during typing, avoiding layout jitter. Override via style.fontFamily if you need a proportional font, but expect minor width shifts per character.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="TypewriterTextView reads its dimensions from the shared display category base hook (useDisplayBase). Omitting size, borderRadius, or color on TypewriterTextView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every display-category component at once."
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
