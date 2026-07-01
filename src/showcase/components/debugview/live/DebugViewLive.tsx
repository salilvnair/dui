import { useState } from 'react';
import { DebugView } from '@/dui';
import type { DebugSession, DebugActions } from '@/dui';
import { Row } from '../../../shared/Row';

const INITIAL_DEBUG_SESSION: DebugSession = {
  active: true,
  status: 'paused',
  pausedLine: 5,
  variables: [
    { name: 'userId', value: 42, type: 'number' },
    { name: 'user', value: { name: 'Alice', role: 'admin', active: true }, type: 'object' },
    { name: 'token', value: 'eyJhbGci...', type: 'string' },
    { name: 'dk', value: { env: {}, request: {}, response: {} }, type: 'object' },
  ],
  callStack: [
    { fn: 'handleResponse', file: 'post-response.js', line: 5, col: 3, isUser: true },
    { fn: 'runScript', file: 'runtime.js', line: 142, col: 8 },
    { fn: 'executeTab', file: 'executor.js', line: 88, col: 4 },
  ],
  breakpoints: [
    { key: 'tab1:pre',  line: 3, disabled: false, label: 'GET /users' },
    { key: 'tab1:pre',  line: 7, disabled: true,  label: 'GET /users' },
    { key: 'tab1:post', line: 5, disabled: false,  label: 'GET /users', condition: 'userId > 10' },
  ],
  breakpointsMuted: false,
};

export function DebugViewLive() {
  const [session, setSession] = useState<DebugSession>(INITIAL_DEBUG_SESSION);
  const [watchExprs, setWatchExprs] = useState<string[]>(['user.name', 'token']);

  const actions: DebugActions = {
    onContinue:   () => setSession(s => ({ ...s, status: 'running' as const })),
    onStepOver:   () => {},
    onStepInto:   () => {},
    onStepOut:    () => {},
    onRestart:    () => setSession(INITIAL_DEBUG_SESSION),
    onStop:       () => setSession(s => ({ ...s, active: false, status: 'idle' as const })),
    onAddWatchExpression:     expr => setWatchExprs(prev => [...prev, expr]),
    onRemoveWatchExpression:  expr => setWatchExprs(prev => prev.filter(e => e !== expr)),
    onClearWatchExpressions:  () => setWatchExprs([]),
    onToggleBreakpoint: (key, line, currently) => setSession(s => ({
      ...s,
      breakpoints: s.breakpoints?.map(bp =>
        bp.key === key && bp.line === line ? { ...bp, disabled: !currently } : bp,
      ),
    })),
    onRemoveBreakpoint: (key, line) => setSession(s => ({
      ...s,
      breakpoints: s.breakpoints?.filter(bp => !(bp.key === key && bp.line === line)),
    })),
    onToggleMuteBreakpoints: () => setSession(s => ({ ...s, breakpointsMuted: !s.breakpointsMuted })),
    onClearAllBreakpoints:   () => setSession(s => ({ ...s, breakpoints: [] })),
  };

  return (
    <div>
      <Row label="DebugView — full VS Code-style Run & Debug panel" noPad
        code={`<DebugView\n  session={session}\n  watchExpressions={watchExprs}\n  actions={{\n    onContinue, onStop, onStepOver, onStepInto,\n    onAddWatchExpression, onRemoveWatchExpression,\n    onToggleBreakpoint, onRemoveBreakpoint,\n    onToggleMuteBreakpoints, onClearAllBreakpoints,\n  }}\n/>`}>
        <div style={{ height: 500, width: '100%', border: '1px solid var(--color-surface-border)', borderRadius: 8, overflow: 'hidden' }}>
          <DebugView session={session} watchExpressions={watchExprs} actions={actions} accentColor="var(--color-protocol-rest)" />
        </div>
      </Row>
      <Row label="Inactive session (status=idle)" noPad code={`<DebugView session={{ active: false, status: 'idle' }} />`}>
        <div style={{ height: 200, width: '100%', border: '1px solid var(--color-surface-border)', borderRadius: 8, overflow: 'hidden' }}>
          <DebugView session={{ active: false, status: 'idle' }} accentColor="var(--color-protocol-rest)" />
        </div>
      </Row>
    </div>
  );
}
