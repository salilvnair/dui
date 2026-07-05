import { DocSection, PropTable, FeatureGrid, DocNote } from '../../../shared/DocComponents';

export function AudioWaveformViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Static or animated bar waveform', color: 'var(--color-primary)' },
          { label: 'Deterministic placeholder pattern', color: 'var(--color-info)' },
          { label: 'Played vs. unplayed color split', color: 'var(--color-success)' },
          { label: 'Custom amplitude samples', color: 'var(--color-warning)' },
          { label: 'Gentle bounce animation for live recording', color: '#a855f7' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'samples', type: 'number[]', description: 'Normalized amplitude samples, 0-1. If omitted, renders a deterministic placeholder pattern of 48 bars.' },
          { name: 'progress', type: 'number', default: '0', description: 'Playback progress, 0-1. Bars up to this fraction render in color; the rest render muted.' },
          { name: 'height', type: 'number', default: '40', description: 'Height of the waveform container in pixels.' },
          { name: 'color', type: 'string', default: 'var(--color-primary)', description: 'Color used for the "played" portion of the bars.' },
          { name: 'animated', type: 'boolean', default: 'false', description: 'Animates each bar with a gentle staggered bounce — intended for a "live"/recording waveform rather than static playback.' },
          { name: 'className', type: 'string', description: 'Additional class names on the outer container.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the outer container.' },
        ]} />
      </DocSection>

      <DocNote type="tip">
        This is a display-only primitive — it does not read an actual audio file or drive playback. Pair it with AudioPlayerView, or your own audio element and a timeupdate listener, to compute progress in real time.
      </DocNote>

      <DocNote type="info">
        When samples is omitted, the placeholder pattern is generated deterministically from a sine/cosine formula, so the same instance always renders identical bars across renders — useful for skeleton/loading states before real amplitude data arrives.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="AudioWaveformView does not read size, width, color, or borderRadius from the DuiProvider context — it is not part of the sized-component system and has no size prop to fall back to a provider default."
      >
        <DocNote type="info">
          AudioWaveformView is unaffected by <code>{'<DuiProvider>'}</code> size/color context. Style it directly via its own props (and CSS variables where documented above) rather than expecting provider-level sizing to apply.
        </DocNote>
      </DocSection>
      </div>
  );
}
