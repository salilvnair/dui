import { DocSection, PropTable, FeatureGrid, DocNote } from '../../../shared/DocComponents';

export function HeatmapCalendarViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'GitHub-style contribution grid', color: 'var(--color-primary)' },
          { label: 'Auto week-column layout from date range', color: 'var(--color-success)' },
          { label: 'Opacity scaled relative to max count', color: 'var(--color-info)' },
          { label: 'Hover tooltip with exact count + date', color: 'var(--color-warning)' },
          { label: 'Configurable cell size', color: '#a855f7' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'data', type: 'HeatmapDay[]', required: true, description: 'Array of { date, count } entries. Missing days within the spanned range are auto-filled with count 0.' },
          { name: 'color', type: 'string', default: 'var(--color-success)', description: 'Base fill color; opacity is scaled per cell relative to the max count in data.' },
          { name: 'cellSize', type: 'number', default: '11', description: 'Width/height in pixels of each day cell.' },
          { name: 'className', type: 'string', description: 'Additional class names applied to the outer wrapper.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the outer wrapper.' },
        ]} />
      </DocSection>

      <DocSection title="HeatmapDay shape">
        <PropTable props={[
          { name: 'date', type: 'string', required: true, description: 'ISO date string, e.g. "2026-07-01".' },
          { name: 'count', type: 'number', required: true, description: 'Activity count for that day. 0 renders at a fixed low opacity (0.08); higher counts scale up to full opacity relative to the data\'s max.' },
        ]} />
      </DocSection>

      <DocNote type="info">
        Week columns are computed from the earliest to latest date in `data`, starting each column on Sunday — you don't need to pre-fill gaps or align dates to week boundaries yourself.
      </DocNote>

      <DocNote type="tip">
        Since data isn't required to be sorted, pass it in any order — HeatmapCalendarView sorts internally when computing the date range.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="HeatmapCalendarView does not read size, width, color, or borderRadius from the DuiProvider context — it is not part of the sized-component system and has no size prop to fall back to a provider default."
      >
        <DocNote type="info">
          HeatmapCalendarView is unaffected by <code>{'<DuiProvider>'}</code> size/color context. Style it directly via its own props (and CSS variables where documented above) rather than expecting provider-level sizing to apply.
        </DocNote>
      </DocSection>
      </div>
  );
}
