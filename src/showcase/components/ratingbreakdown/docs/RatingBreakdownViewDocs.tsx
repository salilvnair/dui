import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference } from '../../../shared/DocComponents';

export function RatingBreakdownViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: '5-star distribution bars', color: 'var(--color-primary)' },
          { label: 'App Store-style layout (5 star row on top)', color: 'var(--color-success)' },
          { label: 'Bars scaled relative to the max count', color: 'var(--color-info)' },
          { label: 'Animated width transition', color: 'var(--color-warning)' },
          { label: 'DUI feedback size + color context', color: '#a855f7' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'counts', type: '[number, number, number, number, number]', required: true, description: 'Count per star level. Index 0 = number of 1-star ratings … index 4 = number of 5-star ratings.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls bar thickness and font size. Falls back to DuiProvider context when omitted.' },
          { name: 'color', type: 'string', default: 'var(--color-warning)', description: 'Fill color of the rating bars.' },
          { name: 'className', type: 'string', description: 'Additional class names applied to the outer container.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the outer container.' },
        ]} />
      </DocSection>

      <DocNote type="warning">
        The counts tuple is index-based, not star-number-based: counts[0] is 1-star, not 0-star. It's easy to accidentally reverse this array — double-check ordering when mapping from an API response.
      </DocNote>

      <DocNote type="tip">
        Rows are always rendered 5-star to 1-star top-to-bottom regardless of array order, matching the familiar App Store / Play Store convention.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="RatingBreakdownView reads its dimensions from the shared feedback category base hook (useFeedbackBase). Omitting size, width, borderRadius, or color on RatingBreakdownView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every feedback-category component at once."
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
        <DocNote type="info">
          These values come from the Feedback category tokens in <code>DuiTokens.ts</code>. Set a local <code>size</code> prop to override the provider default for this instance only, or change <code>{'<DuiProvider size="...">'}</code> to restyle every feedback-category component in the tree.
        </DocNote>
      </DocSection>
      </div>
  );
}
