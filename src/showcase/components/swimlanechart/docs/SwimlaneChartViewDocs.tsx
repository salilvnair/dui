import { DocSection, PropTable, FeatureGrid } from '../../../shared/DocComponents';

export function SwimlaneChartViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'One lane per row, coloured by state', color: 'var(--color-primary)' },
          { label: 'State colours supplied by the caller', color: 'var(--color-success)' },
          { label: 'Markers across every lane', color: 'var(--color-warning)' },
          { label: 'Click a segment to get it back, meta included', color: 'var(--color-info)' },
        ]} />
      </DocSection>

      <DocSection
        title="Overview"
        description="What each of several things was doing over the same period — threads by state, pods by phase, jobs by status. A state with no entry in colors is drawn in the muted default, so an unexpected state shows up as grey rather than crashing."
      >
        <></>
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'rows', type: 'SwimlaneRow[]', required: true, description: 'One lane each.' },
          { name: 'colors', type: 'Record<string, string>', required: true, description: 'state to colour. A state with no entry is drawn in the muted default.' },
          { name: 'markers', type: 'SwimlaneMarker[]', description: 'Vertical marks across every lane — a dump taken, a GC, a deploy.' },
          { name: 'rowHeight', type: 'number', description: 'Height of one lane.' },
          { name: 'labelWidth', type: 'number', description: 'Width of the label gutter.' },
          { name: 'window', type: 'Span', description: 'Clamp the axis instead of deriving it from the data.' },
          { name: 'format', type: '(span: Span) => string', description: 'Formats the tooltip for a segment.' },
          { name: 'onSelect', type: '(row, segment) => void', description: 'A segment was clicked.' },
          { name: 'className', type: 'string', description: 'Additional classes.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline styles.' },
        ]} />
      </DocSection>

      <DocSection title="SwimlaneRow and SwimlaneSegment">
        <PropTable props={[
          { name: 'row.id', type: 'string', required: true, description: 'Stable key.' },
          { name: 'row.label', type: 'string', required: true, description: 'Shown in the gutter.' },
          { name: 'row.segments', type: 'SwimlaneSegment[]', required: true, description: 'The stretches.' },
          { name: 'segment.from / to', type: 'number', required: true, description: 'The span, in the caller unit.' },
          { name: 'segment.state', type: 'string', required: true, description: 'What this stretch was in. Drives the colour via colors.' },
          { name: 'segment.meta', type: 'unknown', description: 'Anything the caller wants back on hover or click.' },
        ]} />
      </DocSection>
    </div>
  );
}
