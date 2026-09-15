import { DocSection, PropTable, FeatureGrid } from '../../../shared/DocComponents';

export function LaneChartViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'One lane per series, each with its own scale', color: 'var(--color-primary)' },
          { label: 'Markers drawn through every lane at once', color: 'var(--color-warning)' },
          { label: 'Filled or line, per series', color: 'var(--color-success)' },
          { label: 'Axis clamped by window, or derived from the data', color: 'var(--color-info)' },
        ]} />
      </DocSection>

      <DocSection
        title="Overview"
        description="Several metrics over the same period, stacked. Giving each series its own lane and its own scale is the point: overlaid on one axis, a line that moves between 2 and 6 disappears beside one that moves between 0 and 400."
      >
        <></>
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'series', type: 'LaneSeries[]', required: true, description: 'One per lane.' },
          { name: 'markers', type: 'LaneMarker[]', description: 'Vertical marks across every lane — a deploy, a GC, a restart.' },
          { name: 'laneHeight', type: 'number', description: 'Height of one lane.' },
          { name: 'window', type: 'Span', description: 'Clamp the axis instead of deriving it from the data.' },
          { name: 'className', type: 'string', description: 'Additional classes.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline styles.' },
        ]} />
      </DocSection>

      <DocSection title="LaneSeries">
        <PropTable props={[
          { name: 'id', type: 'string', required: true, description: 'Stable key.' },
          { name: 'label', type: 'string', required: true, description: 'Shown in the gutter.' },
          { name: 'points', type: '{ at: number; value: number }[]', required: true, description: 'Samples, in whatever unit the caller is using — milliseconds, usually.' },
          { name: 'color', type: 'string', description: 'Line and fill colour.' },
          { name: 'filled', type: 'boolean', description: 'Fill under the line.' },
          { name: 'readout', type: 'string', description: 'The current value, drawn beside the label.' },
        ]} />
      </DocSection>
    </div>
  );
}
