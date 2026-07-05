import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference } from '../../../shared/DocComponents';

export function HoldToConfirmViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Press-and-hold radial fill gate', color: 'var(--color-primary)' },
          { label: 'Configurable hold duration', color: 'var(--color-success)' },
          { label: 'Mouse and touch support', color: 'var(--color-info)' },
          { label: 'Cancels on release/leave before completion', color: 'var(--color-warning)' },
          { label: 'mix-blend-mode label inversion as fill passes', color: '#a855f7' },
          { label: 'DuiProvider size context', color: '#ec4899' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'children', type: 'ReactNode', required: true, description: 'Button label content.' },
          { name: 'onConfirm', type: '() => void', required: true, description: 'Fires exactly once the hold reaches full duration. Resets progress immediately after.' },
          { name: 'duration', type: 'number', default: '900', description: 'Milliseconds the user must hold before onConfirm fires.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Button height, font size, and padding. Falls back to DuiProvider context.' },
          { name: 'color', type: 'string', default: 'var(--color-error)', description: 'Accent color for the border, text, and radial fill — defaults to error red since this is meant for destructive actions.' },
          { name: 'className', type: 'string', description: 'Additional class names applied to the button.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the button.' },
        ]} />
      </DocSection>

      <DocNote type="tip">
        Releasing the mouse/touch (or the pointer leaving the button) before `duration` elapses cancels the hold and resets the fill to 0 — there is no partial-progress persistence. This is intentional: it prevents accidental confirms from a drive-by click.
      </DocNote>

      <DocNote type="warning">
        `onConfirm` is not debounced — if `duration` is very short (e.g. under ~250ms) it can feel indistinguishable from a normal click, defeating the "are you sure" purpose. Keep it at 700ms or higher for genuinely destructive actions.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="HoldToConfirmView reads its dimensions from the shared button category base hook (useButtonBase). Omitting size, width, borderRadius, or color on HoldToConfirmView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every button-category component at once."
      >
        <FeatureGrid features={[
          { label: 'useButtonBase', color: 'var(--color-primary)' },
          { label: 'Falls back to DuiProvider context', color: 'var(--color-success)' },
          { label: 'size / width / borderRadius / color', color: 'var(--color-info)' },
        ]} />
        <SizeReference sizes={[
          { size: 'xxs', height: '16px', font: '8px', desc: 'padX 4px' },
          { size: 'xs', height: '20px', font: '9px', desc: 'padX 6px' },
          { size: 'sm', height: '24px', font: '10px', desc: 'padX 8px' },
          { size: 'md', height: '28px', font: '11px', desc: 'padX 10px' },
          { size: 'lg', height: '36px', font: '12px', desc: 'padX 12px' },
          { size: 'xl', height: '40px', font: '13px', desc: 'padX 16px' },
          { size: 'xxl', height: '48px', font: '14px', desc: 'padX 20px' },
          { size: 'xxxl', height: '56px', font: '16px', desc: 'padX 24px' },
        ]} />
        <DocNote type="info">
          These values come from the Button category tokens in <code>DuiTokens.ts</code>. Set a local <code>size</code> prop to override the provider default for this instance only, or change <code>{'<DuiProvider size="...">'}</code> to restyle every button-category component in the tree.
        </DocNote>
      </DocSection>
      </div>
  );
}
