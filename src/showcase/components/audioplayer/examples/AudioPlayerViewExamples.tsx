import { useState } from 'react';
import { AudioPlayerView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function AudioPlayerViewExamples() {
  const [lastPlayedId, setLastPlayedId] = useState<string | null>(null);

  const recordings = [
    { id: 'rec-1', name: 'Webhook payload — order.created.mp3', src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3' },
    { id: 'rec-2', name: 'Support call — auth timeout.mp3', src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3' },
  ];

  return (
    <div>
      <ExampleCard
        title="Default Player"
        description="Basic waveform player with a single audio source"
        code={`<AudioPlayerView src="https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3" />`}
      >
        <AudioPlayerView src="https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3" />
      </ExampleCard>

      <ExampleCard
        title="Custom Accent Color"
        description="Pass a color to theme the play button and waveform progress"
        code={`<AudioPlayerView
  src="https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3"
  color="var(--color-success)"
/>`}
      >
        <AudioPlayerView src="https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3" color="var(--color-success)" />
      </ExampleCard>

      <ExampleCard
        title="Explicit Waveform Samples"
        description="Pass a fixed samples array instead of the built-in random waveform, useful when you already have amplitude data from a recording API"
        code={`<AudioPlayerView
  src="https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3"
  samples={[2, 6, 10, 14, 9, 5, 12, 16, 8, 4, 11, 13, 6, 3, 9]}
  color="var(--color-info)"
/>`}
      >
        <AudioPlayerView
          src="https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3"
          samples={[2, 6, 10, 14, 9, 5, 12, 16, 8, 4, 11, 13, 6, 3, 9]}
          color="var(--color-info)"
        />
      </ExampleCard>

      <ExampleCard
        title="Attached Response Recordings (API-testing use case)"
        description="Track which webhook/call recording a user last opened in a request's attachment list"
        code={`const recordings = [
  { id: 'rec-1', name: 'Webhook payload — order.created.mp3', src: '...' },
  { id: 'rec-2', name: 'Support call — auth timeout.mp3', src: '...' },
];

{recordings.map(r => (
  <div key={r.id}>
    <div>{r.name}</div>
    <AudioPlayerView src={r.src} color="var(--color-protocol-websocket)" />
  </div>
))}`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {recordings.map(r => (
            <div key={r.id} onClickCapture={() => setLastPlayedId(r.id)}>
              <div style={{ fontSize: 11, color: 'var(--color-text-muted)', marginBottom: 4 }}>{r.name}</div>
              <AudioPlayerView src={r.src} color="var(--color-protocol-websocket)" />
            </div>
          ))}
        </div>
        <div style={{ marginTop: 8, fontSize: 11, color: 'var(--color-text-muted)' }}>
          Last interacted: {lastPlayedId ?? 'none'}
        </div>
      </ExampleCard>

      <ExampleCard
        title="Compact Row Layout"
        description="Constrain width to embed the player inline in a narrow sidebar or table cell"
        code={`<div style={{ maxWidth: 260 }}>
  <AudioPlayerView
    src="https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3"
    color="var(--color-warning)"
  />
</div>`}
      >
        <div style={{ maxWidth: 260 }}>
          <AudioPlayerView src="https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3" color="var(--color-warning)" />
        </div>
      </ExampleCard>
    </div>
  );
}
