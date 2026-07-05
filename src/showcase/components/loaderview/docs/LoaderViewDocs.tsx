import { DocSection, PropTable, FeatureGrid, EnumTable, DocNote, SizeReference } from '../../../shared/DocComponents';

export function LoaderViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: '5 variants: spinner, dots, skeleton, pulse, progress-bar', color: 'var(--color-primary)' },
          { label: 'Fullscreen overlay mode', color: 'var(--color-success)' },
          { label: 'Custom accent color', color: 'var(--color-info)' },
          { label: 'Optional text label', color: 'var(--color-warning)' },
          { label: 'Progress bar controlled value (0–100)', color: '#a855f7' },
          { label: '3 sizes (sm, md, lg)', color: '#ec4899' },
          { label: 'Tailwind animate-spin / animate-bounce / animate-pulse / animate-ping', color: '#14b8a6' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'variant', type: 'LoaderVariant', default: "'spinner'", description: 'The loader animation type.' },
          { name: 'size', type: 'LoaderSize', default: "'md'", description: 'Controls dimensions of the spinner, dots, and pulse variants.' },
          { name: 'accentColor', type: 'string', description: 'Override color for the animation. Defaults to var(--color-loader-accent).' },
          { name: 'label', type: 'string', description: 'Optional text shown beside (or below for progress-bar) the loader. Not shown for the skeleton variant.' },
          { name: 'fullscreen', type: 'boolean', default: 'false', description: 'When true, wraps the loader in a fixed-position full-screen overlay with a dark backdrop (rgba(0,0,0,0.4)).' },
          { name: 'progress', type: 'number', description: '0–100 progress value. Only used by the progress-bar variant. Clamped automatically.' },
          { name: 'className', type: 'string', description: 'Additional class names for the inner wrapper div.' },
        ]} />
      </DocSection>

      <DocSection title="LoaderVariant enum">
        <EnumTable name="LoaderVariant" values={[
          { value: 'spinner', description: 'Circular spinning arc (animate-spin)', color: 'var(--color-primary)' },
          { value: 'dots', description: 'Three bouncing dots in sequence (animate-bounce)', color: 'var(--color-success)' },
          { value: 'skeleton', description: 'Three lines at 100% / 80% / 60% width (animate-pulse)', color: 'var(--color-info)' },
          { value: 'pulse', description: 'Single pulsing circle (animate-pulse)', color: 'var(--color-warning)' },
          { value: 'progress-bar', description: 'Horizontal fill bar with progress prop', color: '#a855f7' },
        ]} />
      </DocSection>

      <DocSection title="Sizes">
        <SizeReference sizes={[
          { size: 'sm', height: '16px', font: '10px label', desc: 'Inline use' },
          { size: 'md', height: '24px', font: '11px label', desc: 'Default' },
          { size: 'lg', height: '36px', font: '12px label', desc: 'Prominent' },
        ]} />
      </DocSection>

      <DocNote type="info">
        The skeleton variant renders three lines and ignores the label prop. The skeleton fills 100% of its container width and is useful for content placeholder UI patterns.
      </DocNote>

      <DocNote type="tip">
        The progress-bar variant requires the progress prop (0–100). The fill width transitions smoothly via CSS (300ms ease). Pair it with label for a "Loading 42%" style indicator.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="LoaderView does not read size, width, color, or borderRadius from the DuiProvider context — it is not part of the sized-component system and has no size prop to fall back to a provider default."
      >
        <DocNote type="info">
          LoaderView is unaffected by <code>{'<DuiProvider>'}</code> size/color context. Style it directly via its own props (and CSS variables where documented above) rather than expecting provider-level sizing to apply.
        </DocNote>
      </DocSection>
      </div>
  );
}
