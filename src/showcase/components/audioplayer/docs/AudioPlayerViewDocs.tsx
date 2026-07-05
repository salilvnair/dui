import { DocSection, PropTable, FeatureGrid, DocNote } from '../../../shared/DocComponents';

export function AudioPlayerViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Play / pause toggle', color: 'var(--color-primary)' },
          { label: 'Click-to-seek waveform', color: 'var(--color-success)' },
          { label: 'Live elapsed / total time', color: 'var(--color-info)' },
          { label: 'Custom accent color', color: 'var(--color-warning)' },
          { label: 'Optional fixed waveform samples', color: '#a855f7' },
          { label: 'Native <audio> element under the hood', color: '#ec4899' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'src', type: 'string', required: true, description: 'URL of the audio file to play. Passed directly to a native <audio> element.' },
          { name: 'samples', type: 'number[]', description: 'Fixed amplitude values to render as the waveform bars. When omitted, AudioWaveformView generates a deterministic pseudo-random waveform.' },
          { name: 'color', type: 'string', default: 'var(--color-primary)', description: 'Accent color for the play/pause button background and the waveform progress fill.' },
          { name: 'className', type: 'string', description: 'Additional class names applied to the outer container.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the outer container.' },
        ]} />
      </DocSection>

      <DocNote type="info">
        Playback state, elapsed time, and duration are tracked internally via the native audio element's timeupdate, loadedmetadata, and ended events — no controlled props are needed for playback state.
      </DocNote>

      <DocNote type="tip">
        Clicking anywhere along the waveform seeks to that position proportionally, computed from the click's x-offset against the container width and the audio's duration.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="AudioPlayerView does not read size, width, color, or borderRadius from the DuiProvider context — it is not part of the sized-component system and has no size prop to fall back to a provider default."
      >
        <DocNote type="info">
          AudioPlayerView is unaffected by <code>{'<DuiProvider>'}</code> size/color context. Style it directly via its own props (and CSS variables where documented above) rather than expecting provider-level sizing to apply.
        </DocNote>
      </DocSection>
      </div>
  );
}
