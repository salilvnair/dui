import { SplitPanelView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

// ─── Panel placeholder helper ─────────────────────────────────────────────────
function Pane({ label, color }: { label: string; color?: string }) {
  return (
    <div style={{
      height: '100%', width: '100%',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 12, fontWeight: 500,
      color: color || 'var(--color-text-muted)',
      background: 'var(--color-panel)',
      border: '1px solid var(--color-surface-border)',
    }}>
      {label}
    </div>
  );
}

// ─── Vertical split: Request / Response ──────────────────────────────────────
function VerticalSplitDemo() {
  return (
    <div style={{ height: 300 }}>
      <SplitPanelView
        direction="vertical"
        defaultSplit={45}
        first={<Pane label="Request (top)" color="var(--color-protocol-rest)" />}
        second={<Pane label="Response (bottom)" color="var(--color-text-secondary)" />}
        accentColor="var(--color-protocol-rest)"
      />
    </div>
  );
}

// ─── Horizontal split: Sidebar / Content ─────────────────────────────────────
function HorizontalSplitDemo() {
  return (
    <div style={{ height: 260 }}>
      <SplitPanelView
        direction="horizontal"
        defaultSplit={25}
        minFirst={80}
        minSecond={120}
        first={<Pane label="Sidebar" color="var(--color-text-muted)" />}
        second={<Pane label="Main Content" color="var(--color-protocol-graphql)" />}
        accentColor="var(--color-protocol-graphql)"
      />
    </div>
  );
}

// ─── 30/70 left-heavy split ───────────────────────────────────────────────────
function LeftHeavySplitDemo() {
  return (
    <div style={{ height: 180 }}>
      <SplitPanelView
        direction="horizontal"
        defaultSplit={30}
        first={<Pane label="Params (30%)" color="var(--color-text-muted)" />}
        second={<Pane label="Editor (70%)" color="var(--color-protocol-rest)" />}
      />
    </div>
  );
}

// ─── 70/30 right-heavy split ──────────────────────────────────────────────────
function RightHeavySplitDemo() {
  return (
    <div style={{ height: 180 }}>
      <SplitPanelView
        direction="horizontal"
        defaultSplit={70}
        first={<Pane label="Response (70%)" color="var(--color-protocol-grpc)" />}
        second={<Pane label="Metadata (30%)" color="var(--color-text-muted)" />}
        accentColor="var(--color-protocol-grpc)"
      />
    </div>
  );
}

// ─── Nested split panels ──────────────────────────────────────────────────────
function NestedSplitDemo() {
  return (
    <div style={{ height: 300 }}>
      <SplitPanelView
        direction="horizontal"
        defaultSplit={28}
        first={<Pane label="Collections" color="var(--color-text-muted)" />}
        second={
          <SplitPanelView
            direction="vertical"
            defaultSplit={55}
            first={<Pane label="Request Editor" color="var(--color-protocol-rest)" />}
            second={<Pane label="Response Viewer" color="var(--color-text-secondary)" />}
            accentColor="var(--color-protocol-rest)"
          />
        }
      />
    </div>
  );
}

// ─── Export ───────────────────────────────────────────────────────────────────
export function SplitPanelViewExamples() {
  return (
    <div>
      <ExampleCard
        title="Vertical Split — Request / Response"
        description="direction=&quot;vertical&quot; — top panel (Request) / bottom panel (Response)"
        code={`<SplitPanelView
  direction="vertical"
  defaultSplit={45}
  first={<RequestEditor />}
  second={<ResponseViewer />}
  accentColor="var(--color-protocol-rest)"
/>`}
      >
        <VerticalSplitDemo />
      </ExampleCard>

      <ExampleCard
        title="Horizontal Split — Sidebar / Content"
        description="direction=&quot;horizontal&quot; defaultSplit=25 — narrow sidebar, wide content"
        code={`<SplitPanelView
  direction="horizontal"
  defaultSplit={25}
  minFirst={80} minSecond={120}
  first={<Sidebar />}
  second={<MainContent />}
/>`}
      >
        <HorizontalSplitDemo />
      </ExampleCard>

      <ExampleCard
        title="defaultSplit 30/70 — Left Heavy"
        description="Params panel takes 30%, editor takes 70%"
        code={`<SplitPanelView direction="horizontal" defaultSplit={30}
  first={<Params />} second={<Editor />} />`}
      >
        <LeftHeavySplitDemo />
      </ExampleCard>

      <ExampleCard
        title="defaultSplit 70/30 — Right Heavy"
        description="Response takes 70%, metadata panel takes 30%"
        code={`<SplitPanelView direction="horizontal" defaultSplit={70}
  first={<Response />} second={<Metadata />} />`}
      >
        <RightHeavySplitDemo />
      </ExampleCard>

      <ExampleCard
        title="Nested Split Panels"
        description="Horizontal outer (sidebar/editor) with vertical inner (request/response)"
        code={`<SplitPanelView direction="horizontal" defaultSplit={28}
  first={<Collections />}
  second={
    <SplitPanelView direction="vertical" defaultSplit={55}
      first={<RequestEditor />}
      second={<ResponseViewer />}
    />
  }
/>`}
      >
        <NestedSplitDemo />
      </ExampleCard>
    </div>
  );
}
