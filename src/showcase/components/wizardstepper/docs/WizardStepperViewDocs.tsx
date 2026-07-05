import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference } from '../../../shared/DocComponents';

export function WizardStepperViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Multi-step progress header', color: 'var(--color-primary)' },
          { label: 'Completed / active / pending states', color: 'var(--color-success)' },
          { label: 'Optional per-step click navigation', color: 'var(--color-info)' },
          { label: 'Connecting progress lines', color: 'var(--color-warning)' },
          { label: 'Optional step descriptions', color: '#a855f7' },
          { label: 'Multi-step wizard header pattern', color: '#ec4899' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'steps', type: 'WizardStep[]', required: true, description: 'Ordered steps: { id, label, description? }.' },
          { name: 'activeStep', type: 'string', required: true, description: 'id of the currently active step.' },
          { name: 'completedSteps', type: 'string[]', default: '[]', description: 'ids of steps considered complete — rendered with a checkmark instead of a number.' },
          { name: 'onStepClick', type: '(id: string) => void', description: 'When provided, steps become clickable. The component computes clickability internally (completed steps or steps at/before the active index) — the handler still receives every click on an eligible step.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls label/description font size.' },
          { name: 'color', type: 'string', default: 'var(--color-primary)', description: 'Accent color for active/completed circles and connecting lines.' },
          { name: 'className', type: 'string', description: 'Additional class names on the outer row container.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override on the outer row container.' },
        ]} />
      </DocSection>

      <DocNote type="tip">
        WizardStepperView is distinct from StepperInputView, which is a numeric +/- input. Use WizardStepperView for multi-page form/flow progress, not for adjusting a quantity.
      </DocNote>

      <DocNote type="info">
        Clickability is computed automatically: a step is only clickable if it's already in completedSteps or its index is less than or equal to the active step's index. You cannot skip ahead to an unvisited future step even if onStepClick is provided.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="WizardStepperView reads its dimensions from the shared tab category base hook (useTabBase). Omitting size, width, borderRadius, or color on WizardStepperView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every tab-category component at once."
      >
        <FeatureGrid features={[
          { label: 'useTabBase', color: 'var(--color-primary)' },
          { label: 'Falls back to DuiProvider context', color: 'var(--color-success)' },
          { label: 'size / width / borderRadius / color', color: 'var(--color-info)' },
        ]} />
        <SizeReference sizes={[
          { size: 'xxs', height: '16px', font: '8px', desc: 'padX 18px' },
          { size: 'xs', height: '20px', font: '9px', desc: 'padX 18px' },
          { size: 'sm', height: '24px', font: '10px', desc: 'padX 10px' },
          { size: 'md', height: '28px', font: '11px', desc: 'padX 12px' },
          { size: 'lg', height: '36px', font: '12px', desc: 'padX 14px' },
          { size: 'xl', height: '40px', font: '13px', desc: 'padX 18px' },
          { size: 'xxl', height: '48px', font: '14px', desc: 'padX 18px' },
          { size: 'xxxl', height: '56px', font: '16px', desc: 'padX 18px' },
        ]} />
        <DocNote type="info">
          These values come from the Tab category tokens in <code>DuiTokens.ts</code>. Set a local <code>size</code> prop to override the provider default for this instance only, or change <code>{'<DuiProvider size="...">'}</code> to restyle every tab-category component in the tree.
        </DocNote>
      </DocSection>
      </div>
  );
}
