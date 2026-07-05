import { VideoPlayerView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

const SAMPLE_SRC = 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4';

export function VideoPlayerViewExamples() {
  return (
    <div>
      <ExampleCard
        title="Basic Player"
        description="Custom play/pause, seek bar, and volume controls over a native <video> element"
        code={`<VideoPlayerView src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" />`}
      >
        <div style={{ maxWidth: 420 }}>
          <VideoPlayerView src={SAMPLE_SRC} />
        </div>
      </ExampleCard>

      <ExampleCard
        title="With Poster Image"
        description="Shows a poster frame before playback starts"
        code={`<VideoPlayerView
  src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
  poster="https://picsum.photos/seed/poster/640/360"
/>`}
      >
        <div style={{ maxWidth: 420 }}>
          <VideoPlayerView src={SAMPLE_SRC} poster="https://picsum.photos/seed/poster/640/360" />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Custom Accent Color"
        description="Theme the seek bar and controls to match a brand or protocol color"
        code={`<VideoPlayerView src="..." color="var(--color-protocol-graphql)" />`}
      >
        <div style={{ maxWidth: 420 }}>
          <VideoPlayerView src={SAMPLE_SRC} color="var(--color-protocol-graphql)" />
        </div>
      </ExampleCard>

      <ExampleCard
        title="API Docs Embed (Tutorial Walkthrough)"
        description="Embedding a short walkthrough clip inside API documentation, a realistic Daakia docs use case"
        code={`<div style={{ maxWidth: 480 }}>
  <p>Watch how to configure a mock server in under a minute:</p>
  <VideoPlayerView src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" />
</div>`}
      >
        <div style={{ maxWidth: 420 }}>
          <p style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginBottom: 8 }}>
            Watch how to configure a mock server in under a minute:
          </p>
          <VideoPlayerView src={SAMPLE_SRC} />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Narrow Container (Responsive)"
        description="The player maintains a 16:9 aspect ratio at any container width, down to very narrow layouts"
        code={`<div style={{ width: 220 }}>
  <VideoPlayerView src="..." />
</div>`}
      >
        <div style={{ width: 220 }}>
          <VideoPlayerView src={SAMPLE_SRC} />
        </div>
      </ExampleCard>
    </div>
  );
}
