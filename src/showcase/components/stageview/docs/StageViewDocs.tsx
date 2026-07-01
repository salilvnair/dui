import { DocSection, PropTable, FeatureGrid, VariantRow, DocNote } from '../../../shared/DocComponents';

export function StageViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Overview">
        <DocNote type="info">
          StageView provides three indicator components for showing multi-step process status. All three share the same base props and can be used inline or stacked in a progress list.
        </DocNote>
      </DocSection>

      <DocSection title="Variants">
        <VariantRow variants={[
          { label: 'StageCheck', description: 'Completed — green ring with a checkmark', color: 'var(--color-success)' },
          { label: 'StageSpin', description: 'In-progress — rotating spinner ring', color: 'var(--color-info)' },
          { label: 'StagePulse', description: 'Pending — pulsing dot (draws attention)', color: 'var(--color-warning)' },
        ]} />
      </DocSection>

      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'SVG-drawn indicators (no external deps)', color: 'var(--color-primary)' },
          { label: 'CSS keyframe animations', color: 'var(--color-success)' },
          { label: 'Configurable size', color: 'var(--color-info)' },
          { label: 'Label + sublabel text', color: 'var(--color-warning)' },
          { label: 'Accent color override', color: '#a855f7' },
          { label: 'Theme CSS var defaults', color: '#ec4899' },
        ]} />
      </DocSection>

      <DocSection title="Shared Base Props (StageViewBaseProps)">
        <PropTable props={[
          { name: 'label', type: 'string', description: 'Primary label text shown to the right of the indicator.' },
          { name: 'sublabel', type: 'string', description: 'Secondary description shown below the label in muted text.' },
          { name: 'color', type: 'string', description: 'Override accent color for the indicator ring/dot. Defaults to the component-specific CSS var.' },
          { name: 'size', type: 'number', default: '20', description: 'Ring/icon diameter in px. Stroke width auto-adjusts at 16px and below.' },
          { name: 'textSize', type: 'number', default: '12', description: 'Font size in px for the label text.' },
          { name: 'className', type: 'string', description: 'Extra CSS class on the root flex container.' },
        ]} />
      </DocSection>

      <DocSection title="Default CSS variable colors">
        <PropTable props={[
          { name: 'StageCheck', type: 'var(--color-stage-check)', description: 'Usually green — completed state.' },
          { name: 'StageSpin', type: 'var(--color-stage-spin)', description: 'Usually blue — active/in-progress state.' },
          { name: 'StagePulse', type: 'var(--color-stage-pulse)', description: 'Usually amber/orange — pending state.' },
        ]} />
      </DocSection>

      <DocSection title="Animation details">
        <DocNote type="info">
          <strong>StageSpin</strong> uses a 0.9s linear CSS keyframe rotation applied to an SVG circle with a 270° dasharray. <strong>StagePulse</strong> uses a 1.6s ease-out keyframe that simultaneously pulses an outer ring (opacity/scale) and an inner dot (scale). Both animations are defined in <code>StageView.css</code>.
        </DocNote>
      </DocSection>
    </div>
  );
}
