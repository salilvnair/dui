import { DocSection, PropTable, FeatureGrid, DocNote } from '../../../shared/DocComponents';

export function ConfettiBurstViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Imperative ref API (fire())', color: 'var(--color-primary)' },
          { label: 'Canvas-based particle physics', color: 'var(--color-success)' },
          { label: 'Custom origin point support', color: 'var(--color-info)' },
          { label: 'Custom color palette', color: 'var(--color-warning)' },
          { label: 'Configurable particle count', color: '#a855f7' },
          { label: 'Zero-cost when idle (no particles rendered)', color: '#ec4899' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'colors', type: 'string[]', default: "['#6366F1', '#22C55E', '#F59E0B', '#EF4444', '#EC4899', '#06B6D4']", description: 'Palette particles are randomly drawn from.' },
          { name: 'particleCount', type: 'number', default: '80', description: 'Number of particles spawned per fire() call.' },
        ]} />
      </DocSection>

      <DocSection title="ConfettiBurstHandle (ref)">
        <PropTable props={[
          { name: 'fire', type: '(origin?: { x: number; y: number }) => void', required: true, description: 'Spawns a burst. Origin defaults to viewport center; pass a point (e.g. from getBoundingClientRect()) to burst from a specific button or element.' },
        ]} />
      </DocSection>

      <DocNote type="tip">
        ConfettiBurstView renders a fixed, full-viewport, pointer-events-none canvas that stays mounted (invisible) until fired — mount it once near the root of the tree you want celebrations in, then call ref.current.fire() from any event handler, e.g. after a collection run finishes 100% green.
      </DocNote>

      <DocNote type="warning">
        This component has no open/visible prop — visibility is entirely driven by whether particles are alive. Don't try to control it declaratively; always trigger it via the ref handle.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="ConfettiBurstView does not read size, width, color, or borderRadius from the DuiProvider context — it is not part of the sized-component system and has no size prop to fall back to a provider default."
      >
        <DocNote type="info">
          ConfettiBurstView is unaffected by <code>{'<DuiProvider>'}</code> size/color context. Style it directly via its own props (and CSS variables where documented above) rather than expecting provider-level sizing to apply.
        </DocNote>
      </DocSection>
      </div>
  );
}
