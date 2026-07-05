import { DocSection, PropTable, FeatureGrid, DocNote } from '../../../shared/DocComponents';

export function SparklineViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'No axes, minimal inline footprint', color: 'var(--color-primary)' },
          { label: 'Optional filled area under the line', color: 'var(--color-success)' },
          { label: 'Auto-scaled to data min/max', color: 'var(--color-info)' },
          { label: 'Custom color and stroke width', color: 'var(--color-warning)' },
          { label: 'Pure SVG, no runtime dependency', color: '#a855f7' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'data', type: 'number[]', required: true, description: 'Series of numeric values to plot left to right. Needs at least 2 points to render a visible line.' },
          { name: 'width', type: 'number', default: '80', description: 'SVG viewport width in pixels.' },
          { name: 'height', type: 'number', default: '24', description: 'SVG viewport height in pixels.' },
          { name: 'color', type: 'string', default: 'var(--color-primary)', description: 'Stroke (and, when filled, area fill) color.' },
          { name: 'filled', type: 'boolean', default: 'true', description: 'Whether to fill the area under the line at 12% opacity.' },
          { name: 'strokeWidth', type: 'number', default: '1.5', description: 'Width of the line stroke in pixels.' },
          { name: 'className', type: 'string', description: 'Additional class names applied to the SVG element.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the SVG element.' },
        ]} />
      </DocSection>

      <DocNote type="info">
        Y-values are normalized against the min/max of the data array itself (not a fixed scale), so two sparklines with different data ranges are not visually comparable in absolute terms — only their own internal trend shape is meaningful.
      </DocNote>

      <DocNote type="tip">
        For a labeled, animated version with a headline number, use StatTrendCardView — it composes SparklineView alongside a count-up StatisticView.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="SparklineView does not read size, width, color, or borderRadius from the DuiProvider context — it is not part of the sized-component system and has no size prop to fall back to a provider default."
      >
        <DocNote type="info">
          SparklineView is unaffected by <code>{'<DuiProvider>'}</code> size/color context. Style it directly via its own props (and CSS variables where documented above) rather than expecting provider-level sizing to apply.
        </DocNote>
      </DocSection>
      </div>
  );
}
