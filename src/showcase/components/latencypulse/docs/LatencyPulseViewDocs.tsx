import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference } from '../../../shared/DocComponents';

export function LatencyPulseViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'EKG/vitals-monitor style live pulse line', color: 'var(--color-primary)' },
          { label: 'Beat speed scales inversely with latency', color: 'var(--color-success)' },
          { label: 'Auto success/error coloring vs a critical threshold', color: 'var(--color-info)' },
          { label: 'Numeric latency readout', color: 'var(--color-warning)' },
          { label: 'Configurable width/height', color: '#a855f7' },
          { label: 'DUI-original, no direct prior art', color: '#14b8a6' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'latencyMs', type: 'number', required: true, description: 'Latest latency sample in milliseconds. Higher values beat slower and taller spikes are drawn proportionally.' },
          { name: 'criticalMs', type: 'number', default: '500', description: 'Threshold above which the beat is treated as critical — auto color switches to var(--color-error) when color is not explicitly set.' },
          { name: 'width', type: 'number', default: '240', description: 'SVG width in pixels.' },
          { name: 'height', type: 'number', default: '64', description: 'SVG height in pixels.' },
          { name: 'color', type: 'string', description: 'Explicit stroke/text color override. When omitted, auto-derives from latencyMs vs criticalMs (success below, error at/above).' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls the latency readout font size. Falls back to DuiProvider context.' },
          { name: 'className', type: 'string', description: 'Additional class names on the outer container.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the outer container.' },
        ]} />
      </DocSection>

      <DocNote type="info">
        Beat duration is computed as clamp(0.5, 2.2, 1400 / latencyMs) seconds per cycle — very low latencies beat near the 0.5s cap rather than becoming imperceptibly fast, and very high latencies beat no slower than 2.2s so the line never looks frozen.
      </DocNote>

      <DocNote type="tip">
        Pass a rolling/smoothed latency value (e.g. an EMA of recent samples) rather than raw per-request jitter if you want the beat rhythm to read as a trend rather than flicker between every single request's number.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="LatencyPulseView reads its dimensions from the shared display category base hook (useDisplayBase). Omitting size, borderRadius, or color on LatencyPulseView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every display-category component at once."
      >
        <FeatureGrid features={[
          { label: 'useDisplayBase', color: 'var(--color-primary)' },
          { label: 'Falls back to DuiProvider context', color: 'var(--color-success)' },
          { label: 'size / borderRadius / color', color: 'var(--color-info)' },
        ]} />
        <SizeReference sizes={[
          { size: 'xxs', height: '—', font: '8px', desc: 'icon 8px' },
          { size: 'xs', height: '—', font: '9px', desc: 'icon 10px' },
          { size: 'sm', height: '—', font: '10px', desc: 'icon 11px' },
          { size: 'md', height: '—', font: '11px', desc: 'icon 12px' },
          { size: 'lg', height: '—', font: '12px', desc: 'icon 14px' },
          { size: 'xl', height: '—', font: '13px', desc: 'icon 16px' },
          { size: 'xxl', height: '—', font: '14px', desc: 'icon 18px' },
          { size: 'xxxl', height: '—', font: '16px', desc: 'icon 20px' },
        ]} />
        <DocNote type="info">
          These values come from the Display category tokens in <code>DuiTokens.ts</code>. Set a local <code>size</code> prop to override the provider default for this instance only, or change <code>{'<DuiProvider size="...">'}</code> to restyle every display-category component in the tree.
        </DocNote>
      </DocSection>
      </div>
  );
}
