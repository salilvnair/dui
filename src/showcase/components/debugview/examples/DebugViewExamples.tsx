import { useState } from 'react';
import { DebugView } from '@/dui';
import type { DebugSession, DebugActions, DebugBreakpoint } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

// ── Shared sample data ────────────────────────────────────────────────────────

const ACTIVE_SESSION: DebugSession = {
  active: true,
  status: 'paused',
  pausedLine: 42,
  variables: [
    { name: 'userId',   value: 42,                     type: 'number' },
    { name: 'email',    value: 'alice@example.com',    type: 'string' },
    { name: 'roles',    value: ['admin', 'editor'],    type: 'Array' },
    { name: 'response', value: { status: 200, ok: true }, type: 'Object' },
  ],
  callStack: [
    { fn: 'fetchUser',     file: 'api.ts',    line: 42, isUser: true },
    { fn: 'loadDashboard', file: 'page.tsx',  line: 88, isUser: true },
    { fn: 'renderApp',     file: 'main.tsx',  line: 12, isUser: false },
  ],
  breakpoints: [
    { key: 'api.ts:42',   line: 42, label: 'api.ts' },
    { key: 'page.tsx:88', line: 88, label: 'page.tsx', disabled: true },
    { key: 'auth.ts:15',  line: 15, label: 'auth.ts', condition: 'user.id > 0' },
  ],
};

const IDLE_SESSION: DebugSession = {
  active: false,
  status: 'idle',
  variables:   [],
  callStack:   [],
  breakpoints: [
    { key: 'api.ts:42',   line: 42, label: 'api.ts' },
    { key: 'auth.ts:15',  line: 15, label: 'auth.ts' },
  ],
};

const RUNNING_SESSION: DebugSession = {
  active: true,
  status: 'running',
  variables:   [],
  callStack:   [],
  breakpoints: [],
};

export function DebugViewExamples() {
  // ── Example 1: Active paused session ──────────────────────────────────────
  const [session1, setSession1] = useState<DebugSession>(ACTIVE_SESSION);

  const actions1: DebugActions = {
    onContinue:  () => setSession1(s => ({ ...s, status: 'running', pausedLine: null })),
    onStepOver:  () => setSession1(s => ({ ...s, pausedLine: (s.pausedLine ?? 42) + 1 })),
    onStepInto:  () => {},
    onStepOut:   () => {},
    onRestart:   () => setSession1(ACTIVE_SESSION),
    onStop:      () => setSession1(IDLE_SESSION),
    onToggleBreakpoint: (key, _line, disabled) => {
      setSession1(s => ({
        ...s,
        breakpoints: (s.breakpoints ?? []).map(bp =>
          bp.key === key ? { ...bp, disabled: !disabled } : bp
        ),
      }));
    },
    onRemoveBreakpoint: (key) => {
      setSession1(s => ({
        ...s,
        breakpoints: (s.breakpoints ?? []).filter(bp => bp.key !== key),
      }));
    },
  };

  // ── Example 2: Watch expressions ──────────────────────────────────────────
  const [watches, setWatches] = useState<string[]>(['req.headers.authorization', 'res.statusCode']);

  const actions2: DebugActions = {
    onAddWatchExpression:    (expr)  => setWatches(w => [...w, expr]),
    onRemoveWatchExpression: (expr)  => setWatches(w => w.filter(e => e !== expr)),
    onClearWatchExpressions: ()      => setWatches([]),
    onContinue: () => {},
    onStop:     () => {},
  };

  // ── Example 3: Breakpoints enable/disable ─────────────────────────────────
  const [bpSession, setBpSession] = useState<DebugSession>({
    active: false,
    status: 'idle',
    breakpoints: [
      { key: 'auth.ts:15',   line: 15,  label: 'auth.ts',   disabled: false },
      { key: 'api.ts:42',    line: 42,  label: 'api.ts',    disabled: false },
      { key: 'page.tsx:88',  line: 88,  label: 'page.tsx',  disabled: true  },
      { key: 'index.ts:5',   line: 5,   label: 'index.ts',  disabled: false },
    ] as DebugBreakpoint[],
  });

  const bpActions: DebugActions = {
    onToggleBreakpoint: (key, _line, disabled) => {
      setBpSession(s => ({
        ...s,
        breakpoints: (s.breakpoints ?? []).map(bp =>
          bp.key === key ? { ...bp, disabled: !disabled } : bp
        ),
      }));
    },
    onRemoveBreakpoint: (key) => {
      setBpSession(s => ({
        ...s,
        breakpoints: (s.breakpoints ?? []).filter(bp => bp.key !== key),
      }));
    },
  };

  return (
    <div>
      <ExampleCard
        title="Active Debug Session — Variables + Call Stack"
        description="Paused state with variables and call stack populated — use Continue/Step buttons in the toolbar"
        code={`<DebugView
  session={session}
  actions={actions}
  accentColor="var(--color-primary)"
/>`}
      >
        <div style={{ height: 440, border: '1px solid var(--color-surface-border)', borderRadius: 6, overflow: 'hidden' }}>
          <DebugView
            session={session1}
            actions={actions1}
            accentColor="var(--color-primary)"
          />
        </div>
        <div style={{ marginTop: 6, fontSize: 11, color: 'var(--color-text-muted)' }}>
          Status: <strong style={{ color: 'var(--color-text-primary)' }}>{session1.status}</strong>
          {session1.pausedLine !== null && session1.pausedLine !== undefined && ` — paused at line ${session1.pausedLine}`}
        </div>
      </ExampleCard>

      <ExampleCard
        title="Paused State with Watch Expressions"
        description="Add/remove watch expressions live — type an expression and press Enter"
        code={`const [watches, setWatches] = useState(['req.headers.authorization']);

<DebugView
  session={pausedSession}
  actions={{
    onAddWatchExpression:    expr => setWatches(w => [...w, expr]),
    onRemoveWatchExpression: expr => setWatches(w => w.filter(e => e !== expr)),
  }}
  watchExpressions={watches}
/>`}
      >
        <div style={{ height: 380, border: '1px solid var(--color-surface-border)', borderRadius: 6, overflow: 'hidden' }}>
          <DebugView
            session={{ ...ACTIVE_SESSION, variables: [], callStack: [] }}
            actions={actions2}
            watchExpressions={watches}
            accentColor="var(--color-protocol-graphql)"
          />
        </div>
        <div style={{ marginTop: 6, fontSize: 11, color: 'var(--color-text-muted)' }}>
          Watching: {watches.length > 0 ? watches.join(', ') : 'none'} — add more via the Watch section
        </div>
      </ExampleCard>

      <ExampleCard
        title="Breakpoints List — Enable/Disable"
        description="Enable or disable individual breakpoints; remove them via the × button"
        code={`<DebugView
  session={{ active: false, status: 'idle', breakpoints: [...] }}
  actions={{
    onToggleBreakpoint: (key, line, disabled) => { /* flip disabled */ },
    onRemoveBreakpoint: (key) => { /* remove from list */ },
  }}
/>`}
      >
        <div style={{ height: 300, border: '1px solid var(--color-surface-border)', borderRadius: 6, overflow: 'hidden' }}>
          <DebugView
            session={bpSession}
            actions={bpActions}
            accentColor="var(--color-warning)"
          />
        </div>
        <div style={{ marginTop: 6, fontSize: 11, color: 'var(--color-text-muted)' }}>
          {(bpSession.breakpoints ?? []).filter(b => !b.disabled).length} active / {(bpSession.breakpoints ?? []).length} total breakpoints
        </div>
      </ExampleCard>

      <ExampleCard
        title="Running State — No Active Pause"
        description="Session is active but not paused — toolbar shows Continue disabled, Stop enabled"
        code={`<DebugView
  session={{ active: true, status: 'running' }}
  actions={{ onStop: () => setSession(idleSession) }}
/>`}
      >
        <div style={{ height: 260, border: '1px solid var(--color-surface-border)', borderRadius: 6, overflow: 'hidden' }}>
          <DebugView
            session={RUNNING_SESSION}
            actions={{ onStop: () => {} }}
            accentColor="var(--color-success)"
          />
        </div>
      </ExampleCard>

      <ExampleCard
        title="No Active Session — Empty State"
        description="session.active=false — shows the empty 'Run and Debug' panel with no toolbar"
        code={`<DebugView
  session={{ active: false, status: 'idle' }}
  accentColor="var(--color-primary)"
/>`}
      >
        <div style={{ height: 240, border: '1px solid var(--color-surface-border)', borderRadius: 6, overflow: 'hidden' }}>
          <DebugView
            session={{ active: false, status: 'idle' }}
            accentColor="var(--color-primary)"
          />
        </div>
      </ExampleCard>
    </div>
  );
}
