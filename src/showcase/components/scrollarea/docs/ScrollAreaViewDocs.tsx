import { DocSection, PropTable, FeatureGrid, EnumTable, DocNote } from '../../../shared/DocComponents';

export function ScrollAreaViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Slim custom scrollbar', color: 'var(--color-primary)' },
          { label: 'Accent-tinted thumb via color prop', color: 'var(--color-success)' },
          { label: 'Vertical, horizontal, or both directions', color: 'var(--color-info)' },
          { label: 'maxHeight constraint (number or CSS string)', color: 'var(--color-warning)' },
          { label: 'Pure CSS, no scroll-hijacking JS', color: '#a855f7' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'children', type: 'ReactNode', required: true, description: 'Scrollable content.' },
          { name: 'direction', type: "'vertical' | 'horizontal' | 'both'", default: "'vertical'", description: 'Which axes are scrollable/overflow: auto.' },
          { name: 'maxHeight', type: 'number | string', description: 'Caps the container height (px number or any CSS length string) before scrolling kicks in.' },
          { name: 'color', type: 'string', default: 'var(--color-primary)', description: 'Accent color applied to the custom scrollbar thumb via the --dui-scrollarea-accent CSS variable.' },
          { name: 'className', type: 'string', description: 'Additional class names applied to the container.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the container.' },
        ]} />
      </DocSection>

      <DocSection title="direction enum">
        <EnumTable name="direction" values={[
          { value: 'vertical', description: 'overflow-y: auto, overflow-x: hidden (default).', color: 'var(--color-primary)' },
          { value: 'horizontal', description: 'overflow-x: auto, overflow-y: hidden.', color: 'var(--color-info)' },
          { value: 'both', description: 'Both axes scrollable.', color: 'var(--color-warning)' },
        ]} />
      </DocSection>

      <DocNote type="info">
        The custom scrollbar styling comes from ScrollAreaView.css and reads the --dui-scrollarea-accent CSS variable set inline by the color prop — no external scrollbar library is used.
      </DocNote>

      <DocNote type="tip">
        Set maxHeight explicitly whenever the content length is unbounded (logs, history, long lists) — without it the container simply grows with its content and never scrolls.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="ScrollAreaView does not read size, width, color, or borderRadius from the DuiProvider context — it is not part of the sized-component system and has no size prop to fall back to a provider default."
      >
        <DocNote type="info">
          ScrollAreaView is unaffected by <code>{'<DuiProvider>'}</code> size/color context. Style it directly via its own props (and CSS variables where documented above) rather than expecting provider-level sizing to apply.
        </DocNote>
      </DocSection>
      </div>
  );
}
