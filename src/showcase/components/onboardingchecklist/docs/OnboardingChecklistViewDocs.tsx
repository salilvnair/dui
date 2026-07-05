import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference } from '../../../shared/DocComponents';

export function OnboardingChecklistViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Collapsible progress checklist', color: 'var(--color-primary)' },
          { label: 'Animated progress bar (done/total)', color: 'var(--color-success)' },
          { label: 'Per-step click handler', color: 'var(--color-info)' },
          { label: 'Strikethrough styling for completed steps', color: 'var(--color-warning)' },
          { label: 'Custom accent color', color: '#a855f7' },
          { label: 'DuiProvider size context', color: '#14b8a6' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'title', type: 'string', default: "'Getting started'", description: 'Header text, shown alongside the "(done/total)" count.' },
          { name: 'steps', type: 'OnboardingStep[]', required: true, description: 'List of checklist steps.' },
          { name: 'defaultExpanded', type: 'boolean', default: 'true', description: 'Initial expanded state. Uncontrolled — toggled internally by clicking the header.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls padding and font size. Falls back to DuiProvider context.' },
          { name: 'color', type: 'string', default: 'var(--color-primary)', description: 'Accent color for the progress bar fill and completed-step checkmarks.' },
          { name: 'className', type: 'string', description: 'Additional class names on the outer card.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the outer card.' },
        ]} />
      </DocSection>

      <DocSection title="OnboardingStep shape">
        <PropTable props={[
          { name: 'id', type: 'string', required: true, description: 'Unique identifier for the step.' },
          { name: 'label', type: 'string', required: true, description: 'Step description text.' },
          { name: 'done', type: 'boolean', required: true, description: 'Whether the step is complete. Drives checkmark, strikethrough, and progress bar percentage.' },
          { name: 'onClick', type: '() => void', description: 'Optional click handler on the step row, e.g. to toggle completion or navigate to that task.' },
        ]} />
      </DocSection>

      <DocNote type="tip">
        The component is uncontrolled for expand/collapse (internal useState seeded by defaultExpanded) but fully controlled for step completion — you own the steps array and must update done yourself in each step's onClick, as shown in the interactive example.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="OnboardingChecklistView reads its dimensions from the shared layout category base hook (useLayoutBase). Omitting size, width, borderRadius, or color on OnboardingChecklistView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every layout-category component at once."
      >
        <FeatureGrid features={[
          { label: 'useLayoutBase', color: 'var(--color-primary)' },
          { label: 'Falls back to DuiProvider context', color: 'var(--color-success)' },
          { label: 'size / width / borderRadius / color', color: 'var(--color-info)' },
        ]} />
        <SizeReference sizes={[
          { size: 'xxs', height: '—', font: '8px', desc: 'pad 32px' },
          { size: 'xs', height: '—', font: '9px', desc: 'pad 32px' },
          { size: 'sm', height: '—', font: '10px', desc: 'pad 12px' },
          { size: 'md', height: '—', font: '11px', desc: 'pad 16px' },
          { size: 'lg', height: '—', font: '12px', desc: 'pad 24px' },
          { size: 'xl', height: '—', font: '13px', desc: 'pad 32px' },
          { size: 'xxl', height: '—', font: '14px', desc: 'pad 32px' },
          { size: 'xxxl', height: '—', font: '16px', desc: 'pad 32px' },
        ]} />
        <DocNote type="info">
          These values come from the Layout category tokens in <code>DuiTokens.ts</code>. Set a local <code>size</code> prop to override the provider default for this instance only, or change <code>{'<DuiProvider size="...">'}</code> to restyle every layout-category component in the tree.
        </DocNote>
      </DocSection>
      </div>
  );
}
