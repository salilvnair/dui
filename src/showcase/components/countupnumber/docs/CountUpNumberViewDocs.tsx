import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference } from '../../../shared/DocComponents';

export function CountUpNumberViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Eased count-up animation (cubic ease-out)', color: 'var(--color-primary)' },
          { label: 'Re-animates from previous value on change', color: 'var(--color-success)' },
          { label: 'Prefix / suffix', color: 'var(--color-info)' },
          { label: 'Decimal precision control', color: 'var(--color-warning)' },
          { label: 'Tabular numerals (no width jitter)', color: '#a855f7' },
          { label: 'DuiProvider size context', color: '#14b8a6' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'value', type: 'number', required: true, description: 'Target number to count up (or down) to. Changing this re-triggers the animation from the last displayed value.' },
          { name: 'duration', type: 'number', default: '1200', description: 'Animation duration in milliseconds.' },
          { name: 'prefix', type: 'string', default: "''", description: 'Text prepended before the number, e.g. "$".' },
          { name: 'suffix', type: 'string', default: "''", description: 'Text appended after the number, e.g. " reqs" or "%".' },
          { name: 'precision', type: 'number', default: '0', description: 'Number of decimal places shown (via toFixed).' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls the base font size; the rendered number is scaled 1.6x that size. Falls back to DuiProvider context.' },
          { name: 'color', type: 'string', default: 'var(--color-text-primary)', description: 'Text color.' },
          { name: 'className', type: 'string', description: 'Additional class names on the outer span.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the outer span.' },
        ]} />
      </DocSection>

      <DocNote type="info">
        The component animates from whatever value it last settled on, not from 0 every time — so updating value on a live-polling dashboard produces a smooth incremental count rather than a jarring reset-and-recount.
      </DocNote>

      <DocNote type="tip">
        Font size is intentionally larger than the size token (1.6x) and weight 800, tuned for standalone KPI display. If you need count-up text inline with body copy, wrap it in a smaller size or override style.fontSize directly.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="CountUpNumberView reads its dimensions from the shared display category base hook (useDisplayBase). Omitting size, borderRadius, or color on CountUpNumberView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every display-category component at once."
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
