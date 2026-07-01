import { useState } from 'react';
import { LoaderView, ButtonView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

// ─── Spinner in button loading state ──────────────────────────────────────────
function ButtonLoadingDemo() {
  const [loading, setLoading] = useState(false);
  const trigger = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <ButtonView variant="primary" size="sm" loading={loading} onClick={trigger}>
        {loading ? 'Sending…' : 'Send Request'}
      </ButtonView>
      {loading && <LoaderView variant="spinner" size="sm" label="Awaiting response…" />}
    </div>
  );
}

// ─── Dots as inline indicator ─────────────────────────────────────────────────
function DotsInlineDemo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--color-text-secondary)' }}>
        <LoaderView variant="dots" size="sm" accentColor="var(--color-protocol-websocket)" />
        <span>Establishing WebSocket connection…</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--color-text-secondary)' }}>
        <LoaderView variant="dots" size="md" accentColor="var(--color-protocol-grpc)" />
        <span>Streaming gRPC response…</span>
      </div>
    </div>
  );
}

// ─── Skeleton placeholder card ────────────────────────────────────────────────
function SkeletonDemo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 320 }}>
      <div style={{
        padding: 14,
        border: '1px solid var(--color-surface-border)',
        borderRadius: 8,
        background: 'var(--color-surface)',
      }}>
        <div style={{ marginBottom: 10, fontSize: 10, fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Loading response…
        </div>
        <LoaderView variant="skeleton" size="md" />
      </div>
      <div style={{
        padding: 14,
        border: '1px solid var(--color-surface-border)',
        borderRadius: 8,
        background: 'var(--color-surface)',
      }}>
        <div style={{ marginBottom: 10, fontSize: 10, fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Large skeleton (lg)
        </div>
        <LoaderView variant="skeleton" size="lg" />
      </div>
    </div>
  );
}

// ─── Progress bar ─────────────────────────────────────────────────────────────
function ProgressBarDemo() {
  const [progress, setProgress] = useState(40);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 300 }}>
      <LoaderView variant="progress-bar" size="md" progress={progress} label={`${progress}% uploaded`} />
      <div style={{ display: 'flex', gap: 8 }}>
        <ButtonView variant="secondary" size="sm" onClick={() => setProgress(p => Math.max(0, p - 10))}>−10</ButtonView>
        <ButtonView variant="primary"   size="sm" onClick={() => setProgress(p => Math.min(100, p + 10))}>+10</ButtonView>
      </div>
    </div>
  );
}

// ─── Pulse overlay ────────────────────────────────────────────────────────────
function PulseOverlayDemo() {
  return (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      {(['var(--color-protocol-rest)', 'var(--color-protocol-graphql)', 'var(--color-error)'] as const).map((color, i) => (
        <div key={i} style={{
          position: 'relative',
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '8px 12px',
          border: '1px solid var(--color-surface-border)',
          borderRadius: 8,
          background: 'var(--color-surface)',
          fontSize: 12,
          color: 'var(--color-text-secondary)',
        }}>
          <LoaderView variant="pulse" size="sm" accentColor={color} />
          <span>{i === 0 ? 'REST active' : i === 1 ? 'GraphQL streaming' : 'Error detected'}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Size variants row ────────────────────────────────────────────────────────
function SizeVariantsDemo() {
  const sizes = ['sm', 'md', 'lg'] as const;
  return (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
      {sizes.map(s => (
        <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <LoaderView variant="spinner" size={s} />
          <span style={{ fontSize: 10, color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>{s}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Export ───────────────────────────────────────────────────────────────────
export function LoaderViewExamples() {
  return (
    <div>
      <ExampleCard
        title="Spinner in Button Loading State"
        description="Spinner appears inline beside a button while request is in-flight"
        code={`<ButtonView variant="primary" loading={loading} onClick={send}>Send Request</ButtonView>
{loading && <LoaderView variant="spinner" size="sm" label="Awaiting response…" />}`}
      >
        <ButtonLoadingDemo />
      </ExampleCard>

      <ExampleCard
        title="Dots — Inline Connection Indicator"
        description="Bouncing dots signal streaming or connection activity"
        code={`<LoaderView variant="dots" size="sm" accentColor="var(--color-protocol-websocket)" />
<LoaderView variant="dots" size="md" accentColor="var(--color-protocol-grpc)" />`}
      >
        <DotsInlineDemo />
      </ExampleCard>

      <ExampleCard
        title="Skeleton — Placeholder Response Card"
        description="Three animated bars mimic content loading at sm / md / lg sizes"
        code={`<LoaderView variant="skeleton" size="md" />
<LoaderView variant="skeleton" size="lg" />`}
      >
        <SkeletonDemo />
      </ExampleCard>

      <ExampleCard
        title="Progress Bar"
        description="Determinate progress — pass progress={0–100}; adjust with buttons"
        code={`<LoaderView variant="progress-bar" size="md" progress={40} label="40% uploaded" />`}
      >
        <ProgressBarDemo />
      </ExampleCard>

      <ExampleCard
        title="Pulse — Status Dot Overlay"
        description="Pulsing circle for connection / error states on cards"
        code={`<LoaderView variant="pulse" size="sm" accentColor="var(--color-protocol-rest)" />
<LoaderView variant="pulse" size="sm" accentColor="var(--color-error)" />`}
      >
        <PulseOverlayDemo />
      </ExampleCard>

      <ExampleCard
        title="Spinner Size Variants"
        description="sm (16px) · md (24px) · lg (36px)"
        code={`<LoaderView variant="spinner" size="sm" />
<LoaderView variant="spinner" size="md" />
<LoaderView variant="spinner" size="lg" />`}
      >
        <SizeVariantsDemo />
      </ExampleCard>
    </div>
  );
}
