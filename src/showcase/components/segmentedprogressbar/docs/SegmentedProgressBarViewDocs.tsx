import { DocSection, PropTable, FeatureGrid, EnumTable, DocNote, SizeReference, WidthReference } from '../../../shared/DocComponents';

export function SegmentedProgressBarViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Multi-segment progress', color: 'var(--color-primary)' },
          { label: '4 semantic statuses', color: 'var(--color-success)' },
          { label: 'Optional per-segment labels', color: 'var(--color-info)' },
          { label: 'Independent segment colors', color: 'var(--color-warning)' },
          { label: 'Optional color override', color: '#a855f7' },
          { label: 'DUI size + width context', color: '#ec4899' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'segments', type: 'ProgressSegment[]', required: true, description: 'Ordered segments: { label?, status }.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls bar thickness and label font size.' },
          { name: 'width', type: 'DuiWidth', description: 'Overall bar width. Falls back to DuiProvider context.' },
          { name: 'color', type: 'string', description: 'When set, applied to every non-pending segment instead of the per-status semantic color.' },
          { name: 'className', type: 'string', description: 'Additional class names on the outer container.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override on the outer container.' },
        ]} />
      </DocSection>

      <DocSection title="SegmentStatus enum">
        <EnumTable name="SegmentStatus" values={[
          { value: 'pending', description: 'Not yet started — rendered in a neutral border color.', color: 'var(--color-text-muted)' },
          { value: 'active', description: 'Currently in progress — rendered in the warning color.', color: 'var(--color-warning)' },
          { value: 'done', description: 'Completed successfully — rendered in the success color.', color: 'var(--color-success)' },
          { value: 'error', description: 'Failed — rendered in the error color.', color: 'var(--color-error)' },
        ]} />
      </DocSection>

      <DocNote type="tip">
        Omit label on every segment for a compact unlabeled status strip (e.g. inline next to a request row). Add labels only when the bar has room to show a caption row beneath it.
      </DocNote>

      <DocNote type="info">
        The color prop overrides the status palette for done/active/error segments but pending segments always stay the neutral border color, so partially-complete pipelines remain readable at a glance.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="SegmentedProgressBarView reads its dimensions from the shared feedback category base hook (useFeedbackBase). Omitting size, width, borderRadius, or color on SegmentedProgressBarView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every feedback-category component at once."
      >
        <FeatureGrid features={[
          { label: 'useFeedbackBase', color: 'var(--color-primary)' },
          { label: 'Falls back to DuiProvider context', color: 'var(--color-success)' },
          { label: 'size / width / borderRadius / color', color: 'var(--color-info)' },
        ]} />
        <SizeReference sizes={[
          { size: 'xxs', height: '2px thick', font: '8px', desc: 'ring 40px' },
          { size: 'xs', height: '3px thick', font: '9px', desc: 'ring 52px' },
          { size: 'sm', height: '4px thick', font: '10px', desc: 'ring 64px' },
          { size: 'md', height: '5px thick', font: '11px', desc: 'ring 80px' },
          { size: 'lg', height: '6px thick', font: '12px', desc: 'ring 100px' },
          { size: 'xl', height: '8px thick', font: '13px', desc: 'ring 120px' },
          { size: 'xxl', height: '10px thick', font: '14px', desc: 'ring 144px' },
          { size: 'xxxl', height: '12px thick', font: '16px', desc: 'ring 168px' },
        ]} />
        <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 4, marginBottom: 8 }}>
          Width presets, resolved via the <code>width</code> prop or the nearest <code>{'<DuiProvider width="...">'}</code>:
        </div>
        <WidthReference widths={[
          { width: 'sm', value: '80px' },
          { width: 'md', value: '120px' },
          { width: 'default', value: 'auto' },
          { width: 'lg', value: '200px' },
          { width: 'fullWidth', value: '100%' },
          { width: 'maxContent', value: 'max-content' },
          { width: 'fw', value: '100%' },
          { width: 'mx', value: 'max-content' },
        ]} />
        <DocNote type="info">
          These values come from the Feedback category tokens in <code>DuiTokens.ts</code>. Set a local <code>size</code> prop to override the provider default for this instance only, or change <code>{'<DuiProvider size="...">'}</code> to restyle every feedback-category component in the tree.
        </DocNote>
      </DocSection>
      </div>
  );
}
