import { ImageZoomView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function ImageZoomViewExamples() {
  return (
    <div>
      <ExampleCard
        title="Default Thumbnail"
        description="Click the image to open a full-screen lightbox; press Escape or click the backdrop to close"
        code={`<ImageZoomView src="https://picsum.photos/seed/3/500/400" alt="Product photo" />`}
      >
        <ImageZoomView src="https://picsum.photos/seed/3/500/400" alt="Product photo" style={{ width: 220, borderRadius: 8 }} />
      </ExampleCard>

      <ExampleCard
        title="Custom Thumbnail Style"
        description="Style the thumbnail independently from the full lightbox view via thumbnailStyle"
        code={`<ImageZoomView
  src="https://picsum.photos/seed/7/500/400"
  alt="Dashboard screenshot"
  thumbnailStyle={{ width: 120, height: 90, objectFit: 'cover', borderRadius: 6, border: '1px solid var(--color-surface-border)' }}
/>`}
      >
        <ImageZoomView
          src="https://picsum.photos/seed/7/500/400"
          alt="Dashboard screenshot"
          thumbnailStyle={{ width: 120, height: 90, objectFit: 'cover', borderRadius: 6, border: '1px solid var(--color-surface-border)' }}
        />
      </ExampleCard>

      <ExampleCard
        title="Thumbnail Grid"
        description="Multiple independent zoom targets side by side — each manages its own open state"
        code={`{['seed/10', 'seed/11', 'seed/12'].map(seed => (
  <ImageZoomView
    key={seed}
    src={\`https://picsum.photos/\${seed}/300/300\`}
    alt="Gallery image"
    thumbnailStyle={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 6 }}
  />
))}`}
      >
        <div style={{ display: 'flex', gap: 8 }}>
          {['seed/10', 'seed/11', 'seed/12'].map(seed => (
            <ImageZoomView
              key={seed}
              src={`https://picsum.photos/${seed}/300/300`}
              alt="Gallery image"
              thumbnailStyle={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 6 }}
            />
          ))}
        </div>
      </ExampleCard>

      <ExampleCard
        title="Response Body Screenshot Preview (API-testing use case)"
        description="Zoom into a screenshot attached to a bug report or test run artifact"
        code={`<ImageZoomView
  src="https://picsum.photos/seed/21/900/600"
  alt="Failed test run screenshot — checkout flow"
  thumbnailStyle={{ width: 200, borderRadius: 8, border: '1px solid var(--color-error)' }}
/>`}
      >
        <ImageZoomView
          src="https://picsum.photos/seed/21/900/600"
          alt="Failed test run screenshot — checkout flow"
          thumbnailStyle={{ width: 200, borderRadius: 8, border: '1px solid var(--color-error)' }}
        />
      </ExampleCard>

      <ExampleCard
        title="Missing alt Text (edge case)"
        description="alt is optional — falls back to an empty string, which is acceptable for purely decorative images but should be avoided for meaningful content"
        code={`<ImageZoomView src="https://picsum.photos/seed/30/400/300" />`}
      >
        <ImageZoomView src="https://picsum.photos/seed/30/400/300" style={{ width: 160, borderRadius: 8 }} />
      </ExampleCard>
    </div>
  );
}
