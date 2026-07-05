import { ComparisonSliderView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function ComparisonSliderViewExamples() {
  return (
    <div>
      <ExampleCard
        title="Default Slider"
        description="Drag (or click) anywhere across the image to reveal the before/after split"
        code={`<ComparisonSliderView
  beforeSrc="https://picsum.photos/seed/4/500/300"
  afterSrc="https://picsum.photos/seed/5/500/300"
  beforeLabel="Before"
  afterLabel="After"
/>`}
      >
        <ComparisonSliderView
          beforeSrc="https://picsum.photos/seed/4/500/300"
          afterSrc="https://picsum.photos/seed/5/500/300"
          beforeLabel="Before"
          afterLabel="After"
        />
      </ExampleCard>

      <ExampleCard
        title="Custom Labels"
        description="Rename the corner tags to fit your comparison — e.g. dashboard theme redesign"
        code={`<ComparisonSliderView
  beforeSrc="https://picsum.photos/seed/40/500/300"
  afterSrc="https://picsum.photos/seed/41/500/300"
  beforeLabel="v1 Dashboard"
  afterLabel="v2 Dashboard"
/>`}
      >
        <ComparisonSliderView
          beforeSrc="https://picsum.photos/seed/40/500/300"
          afterSrc="https://picsum.photos/seed/41/500/300"
          beforeLabel="v1 Dashboard"
          afterLabel="v2 Dashboard"
        />
      </ExampleCard>

      <ExampleCard
        title="Compact Height"
        description="Shrink the comparison area for embedding inside a changelog entry or PR description card"
        code={`<ComparisonSliderView
  beforeSrc="https://picsum.photos/seed/50/500/300"
  afterSrc="https://picsum.photos/seed/51/500/300"
  height={140}
/>`}
      >
        <ComparisonSliderView beforeSrc="https://picsum.photos/seed/50/500/300" afterSrc="https://picsum.photos/seed/51/500/300" height={140} />
      </ExampleCard>

      <ExampleCard
        title="API Response Diff Screenshot (domain use case)"
        description="Compare a UI screenshot before and after a backend response schema change flagged a regression"
        code={`<ComparisonSliderView
  beforeSrc="https://picsum.photos/seed/60/500/300"
  afterSrc="https://picsum.photos/seed/61/500/300"
  beforeLabel="Before schema change"
  afterLabel="After schema change"
  height={220}
/>`}
      >
        <ComparisonSliderView
          beforeSrc="https://picsum.photos/seed/60/500/300"
          afterSrc="https://picsum.photos/seed/61/500/300"
          beforeLabel="Before schema change"
          afterLabel="After schema change"
          height={220}
        />
      </ExampleCard>

      <ExampleCard
        title="Tall Aspect Ratio"
        description="Increase height for full-page mobile screenshot comparisons"
        code={`<ComparisonSliderView
  beforeSrc="https://picsum.photos/seed/70/400/700"
  afterSrc="https://picsum.photos/seed/71/400/700"
  height={380}
/>`}
      >
        <ComparisonSliderView beforeSrc="https://picsum.photos/seed/70/400/700" afterSrc="https://picsum.photos/seed/71/400/700" height={380} />
      </ExampleCard>
    </div>
  );
}
