import { useState } from 'react';
import { ImageGalleryView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

const PHOTOS = Array.from({ length: 6 }, (_, i) => ({ src: `https://picsum.photos/seed/gallery${i}/300/200`, alt: `Photo ${i + 1}` }));

export function ImageGalleryViewExamples() {
  const [columns, setColumns] = useState(3);

  return (
    <div>
      <ExampleCard
        title="Basic Grid Gallery"
        description="Click any thumbnail to open the lightbox, with prev/next navigation and Escape to close"
        code={`<ImageGalleryView images={[{ src: 'https://picsum.photos/seed/1/300/200', alt: 'Photo' }]} columns={3} />`}
      >
        <ImageGalleryView images={PHOTOS} columns={3} />
      </ExampleCard>

      <ExampleCard
        title="Interactive Column Count"
        description="Adjust the columns prop to reflow the grid density"
        code={`const [columns, setColumns] = useState(3);

<input type="range" min={2} max={6} value={columns} onChange={e => setColumns(Number(e.target.value))} />
<ImageGalleryView images={photos} columns={columns} />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <input type="range" min={2} max={6} value={columns} onChange={e => setColumns(Number(e.target.value))} />
          <ImageGalleryView images={PHOTOS} columns={columns} />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Size Variants"
        description="sm / lg control the lightbox chrome and thumbnail border radius"
        code={`<ImageGalleryView images={photos} columns={4} size="sm" />
<ImageGalleryView images={photos} columns={4} size="lg" />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <ImageGalleryView images={PHOTOS.slice(0, 4)} columns={4} size="sm" />
          <ImageGalleryView images={PHOTOS.slice(0, 4)} columns={4} size="lg" />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Request Attachments Preview (API Testing Context)"
        description="Screenshots attached to a bug report or API response, shown as a compact grid"
        code={`<ImageGalleryView
  images={[
    { src: 'https://picsum.photos/seed/req1/300/200', alt: 'Request payload screenshot' },
    { src: 'https://picsum.photos/seed/req2/300/200', alt: 'Response body screenshot' },
  ]}
  columns={2}
/>`}
      >
        <div style={{ maxWidth: 320 }}>
          <ImageGalleryView
            images={[
              { src: 'https://picsum.photos/seed/req1/300/200', alt: 'Request payload screenshot' },
              { src: 'https://picsum.photos/seed/req2/300/200', alt: 'Response body screenshot' },
            ]}
            columns={2}
          />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Single Image (No Navigation Arrows)"
        description="With only one image, prev/next controls are hidden in the lightbox"
        code={`<ImageGalleryView images={[{ src: 'https://picsum.photos/seed/solo/400/260', alt: 'Diagram' }]} columns={1} />`}
      >
        <div style={{ maxWidth: 240 }}>
          <ImageGalleryView images={[{ src: 'https://picsum.photos/seed/solo/400/260', alt: 'Diagram' }]} columns={1} />
        </div>
      </ExampleCard>
    </div>
  );
}
