import { useState } from 'react';
import { ImageCropperView } from '@/dui';
import type { ImageCropperValue } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function ImageCropperViewExamples() {
  const [value, setValue] = useState<ImageCropperValue>({ x: 0, y: 0, zoom: 1.2 });
  const [avatarValue, setAvatarValue] = useState<ImageCropperValue>({ x: 0, y: 0, zoom: 1 });

  return (
    <div>
      <ExampleCard
        title="Basic Crop + Zoom"
        description="Drag to pan, use the zoom slider to scale — value is fully controlled"
        code={`function Preview() {
  const [value, setValue] = useState({ x: 0, y: 0, zoom: 1.2 });
  return <ImageCropperView src="https://picsum.photos/seed/2/600/400" value={value} onChange={setValue} height={220} />;
}`}
      >
        <ImageCropperView src="https://picsum.photos/seed/2/600/400" value={value} onChange={setValue} height={220} />
      </ExampleCard>

      <ExampleCard
        title="Interactive — Reset Button"
        description="Pair the cropper with a reset control that snaps pan/zoom back to defaults"
        code={`const [value, setValue] = useState({ x: 0, y: 0, zoom: 1 });

<ImageCropperView src="..." value={value} onChange={setValue} height={200} />
<button onClick={() => setValue({ x: 0, y: 0, zoom: 1 })}>Reset</button>`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <ImageCropperView src="https://picsum.photos/seed/reset/600/400" value={avatarValue} onChange={setAvatarValue} height={200} />
          <button
            type="button"
            onClick={() => setAvatarValue({ x: 0, y: 0, zoom: 1 })}
            style={{ alignSelf: 'flex-start', fontSize: 11, padding: '4px 10px', borderRadius: 6, border: '1px solid var(--color-surface-border)', background: 'var(--color-surface)', cursor: 'pointer', color: 'var(--color-text-secondary)' }}
          >
            Reset crop
          </button>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Square Aspect Ratio (Avatar Upload)"
        description="Default aspectRatio=1 for a profile picture upload flow — a common Daakia team-settings use case"
        code={`<ImageCropperView src="https://picsum.photos/seed/avatar/500/500" value={value} onChange={setValue} aspectRatio={1} height={180} />`}
      >
        <div style={{ maxWidth: 220 }}>
          <ImageCropperView src="https://picsum.photos/seed/avatar/500/500" value={value} onChange={setValue} aspectRatio={1} height={180} />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Wide Aspect Ratio (Banner Upload)"
        description="aspectRatio=3 for a wide workspace banner or cover image crop"
        code={`<ImageCropperView src="https://picsum.photos/seed/banner/800/300" value={value} onChange={setValue} aspectRatio={3} height={140} />`}
      >
        <ImageCropperView src="https://picsum.photos/seed/banner/800/300" value={value} onChange={setValue} aspectRatio={3} height={140} />
      </ExampleCard>

      <ExampleCard
        title="Max Zoom Edge Case"
        description="Zoom is clamped between 1x and 3x by the underlying slider — panning still works at max zoom"
        code={`<ImageCropperView src="..." value={{ x: 0.1, y: -0.05, zoom: 3 }} onChange={() => {}} height={180} />`}
      >
        <ImageCropperView src="https://picsum.photos/seed/maxzoom/600/400" value={{ x: 0.1, y: -0.05, zoom: 3 }} onChange={() => {}} height={180} />
      </ExampleCard>
    </div>
  );
}
