import { DocSection, PropTable, FeatureGrid, SizeReference, DocNote } from '../../../shared/DocComponents';

export function CopyButtonViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'One-click clipboard copy', color: 'var(--color-primary)' },
          { label: 'CheckIcon feedback for 1.5s', color: 'var(--color-success)' },
          { label: 'DUI size token (height + icon)', color: 'var(--color-info)' },
          { label: 'Accent color for copied state', color: 'var(--color-warning)' },
          { label: 'Hover background animation', color: '#a855f7' },
          { label: 'stopPropagation on click', color: '#ec4899' },
          { label: 'Tooltip (Copy / Copied!)', color: '#14b8a6' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'text', type: 'string', required: true, description: 'The text to copy to clipboard when clicked.' },
          { name: 'size', type: 'DuiSize', default: "'md'", description: 'DUI size token — controls button height and icon size.' },
          { name: 'title', type: 'string', default: "'Copy'", description: 'Tooltip text shown on hover. Changes to "Copied!" for 1.5s after clicking.' },
          { name: 'accentColor', type: 'string', description: 'Color of the CheckIcon shown after copying. Defaults to var(--color-success).' },
          { name: 'className', type: 'string', description: 'Extra CSS class on the button element.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline styles on the button element.' },
        ]} />
      </DocSection>

      <DocSection title="Sizes">
        <SizeReference sizes={[
          { size: 'xxs', height: '18px', font: '10px', desc: 'Micro' },
          { size: 'xs', height: '22px', font: '11px', desc: 'Compact' },
          { size: 'sm', height: '26px', font: '11px', desc: 'Small' },
          { size: 'md', height: '30px', font: '12px', desc: 'Default' },
          { size: 'lg', height: '34px', font: '13px', desc: 'Large' },
          { size: 'xl', height: '38px', font: '14px', desc: 'XL' },
        ]} />
      </DocSection>

      <DocSection title="Notes">
        <DocNote type="info">
          CopyButtonView is a square button (width === height from DUI token). It uses <code>navigator.clipboard.writeText()</code> which requires a secure context (HTTPS or localhost).
        </DocNote>
        <DocNote type="tip">
          The copied feedback resets automatically after 1500ms. No external state is needed — the component manages this internally.
        </DocNote>
      </DocSection>
    </div>
  );
}
