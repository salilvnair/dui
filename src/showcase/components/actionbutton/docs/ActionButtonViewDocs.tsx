import { DocSection, PropTable, FeatureGrid } from '../../../shared/DocComponents';

export function ActionButtonViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Quieter than ButtonView — built for toolbars', color: 'var(--color-primary)' },
          { label: 'Icon, label, or both', color: 'var(--color-success)' },
          { label: 'Icon can be a function of the resolved icon size', color: 'var(--color-info)' },
          { label: 'Shares the DUI size, width and radius scales', color: 'var(--color-warning)' },
        ]} />
      </DocSection>

      <DocSection
        title="Overview"
        description="The button that sits in a row of other buttons above a panel. Less emphatic than ButtonView, which is for the one action a screen is about, and more than IconButtonView, which carries no word at all."
      >
        <></>
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'label', type: 'ReactNode', description: 'The word. Omit for an icon-only square.' },
          { name: 'children', type: 'ReactNode', description: 'Alternative to label.' },
          { name: 'icon', type: 'ReactNode | (iconSize: number) => ReactNode', description: 'A glyph. As a function it receives the size resolved from the scale, so the icon matches without being told twice.' },
          { name: 'onClick', type: '(e: MouseEvent) => void', description: 'Click handler.' },
          { name: 'disabled', type: 'boolean', description: 'Non-interactive.' },
          { name: 'title', type: 'string', description: 'Native tooltip — worth setting on an icon-only button.' },
          { name: 'size', type: 'DuiSize', description: 'Falls back to the DuiProvider size when omitted.' },
          { name: 'accentColor', type: 'string', description: 'Hover and focus accent.' },
          { name: 'color', type: 'string', description: 'Text colour override.' },
          { name: 'width', type: 'DuiWidth', description: 'Shared width scale.' },
          { name: 'borderRadius', type: 'DuiRadius | number', description: 'Radius override.' },
          { name: 'fontStyle', type: 'DuiFontStyle', description: 'Shared font style.' },
          { name: 'testId', type: 'string', description: 'Lands on the root as data-testid.' },
        ]} />
      </DocSection>
    </div>
  );
}
