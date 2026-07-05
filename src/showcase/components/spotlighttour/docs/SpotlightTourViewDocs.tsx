import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference } from '../../../shared/DocComponents';

export function SpotlightTourViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Spotlight cutout around a CSS-selector target', color: 'var(--color-primary)' },
          { label: 'Step tooltip with title + content', color: 'var(--color-success)' },
          { label: 'Progress dots per step', color: 'var(--color-info)' },
          { label: 'Next / Back / Skip controls', color: 'var(--color-warning)' },
          { label: 'Recalculates on resize/scroll', color: '#a855f7' },
          { label: 'Graceful fallback if target is missing', color: '#ec4899' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'open', type: 'boolean', required: true, description: 'Controls visibility. Renders null when false or when the current step is out of range.' },
          { name: 'steps', type: 'SpotlightTourStep[]', required: true, description: 'Ordered tour steps.' },
          { name: 'stepIndex', type: 'number', required: true, description: 'Index of the currently active step. The component is fully controlled — you own this state.' },
          { name: 'onNext', type: '() => void', required: true, description: 'Called when "Next" is clicked (or "Done" is clicked on the last step, which typically should also call onClose).' },
          { name: 'onPrev', type: '() => void', required: true, description: 'Called when "Back" is clicked. Back is only rendered when stepIndex > 0.' },
          { name: 'onClose', type: '() => void', required: true, description: 'Called when "Skip" is clicked, or "Done" on the final step.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls tooltip font sizes and border radius.' },
          { name: 'color', type: 'string', default: 'var(--color-primary)', description: 'Accent color for the spotlight ring, active progress dot, and primary Next/Done button.' },
        ]} />
      </DocSection>

      <DocSection title="SpotlightTourStep shape">
        <PropTable props={[
          { name: 'target', type: 'string', required: true, description: 'CSS selector for the DOM element to spotlight, e.g. "#send-btn".' },
          { name: 'title', type: 'string', required: true, description: 'Step tooltip heading.' },
          { name: 'content', type: 'string', required: true, description: 'Step tooltip body text.' },
        ]} />
      </DocSection>

      <DocNote type="tip">
        The component is fully controlled: it does not track stepIndex internally. Wire onNext/onPrev to increment/decrement your own state, and check stepIndex === steps.length - 1 in onNext (or watch for it) to know when to also close the tour.
      </DocNote>

      <DocNote type="warning">
        target selectors are re-queried on every step change and on resize/scroll — make sure the target element is actually mounted and stable in the DOM before opening the tour, otherwise the cutout is silently skipped for that step.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="SpotlightTourView reads its dimensions from the shared overlay category base hook (useOverlayBase). Omitting size, borderRadius, or color on SpotlightTourView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every overlay-category component at once."
      >
        <FeatureGrid features={[
          { label: 'useOverlayBase', color: 'var(--color-primary)' },
          { label: 'Falls back to DuiProvider context', color: 'var(--color-success)' },
          { label: 'size / borderRadius / color', color: 'var(--color-info)' },
        ]} />
        <SizeReference sizes={[
          { size: 'xxs', height: '—', font: '15px', desc: 'padX 24px, radius 4px' },
          { size: 'xs', height: '—', font: '15px', desc: 'padX 24px, radius 5px' },
          { size: 'sm', height: '—', font: '12px', desc: 'padX 12px, radius 6px' },
          { size: 'md', height: '—', font: '13px', desc: 'padX 16px, radius 8px' },
          { size: 'lg', height: '—', font: '14px', desc: 'padX 20px, radius 10px' },
          { size: 'xl', height: '—', font: '15px', desc: 'padX 24px, radius 12px' },
          { size: 'xxl', height: '—', font: '15px', desc: 'padX 24px, radius 14px' },
          { size: 'xxxl', height: '—', font: '15px', desc: 'padX 24px, radius 16px' },
        ]} />
        <DocNote type="info">
          These values come from the Overlay category tokens in <code>DuiTokens.ts</code>. Set a local <code>size</code> prop to override the provider default for this instance only, or change <code>{'<DuiProvider size="...">'}</code> to restyle every overlay-category component in the tree.
        </DocNote>
      </DocSection>
      </div>
  );
}
