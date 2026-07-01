import { DocSection, PropTable, FeatureGrid, EnumTable, DocNote } from '../../../shared/DocComponents';

export function DebugViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Overview">
        <DocNote type="info">
          DebugView is a VS Code-style "Run and Debug" side panel as a standalone DUI component. It is fully abstract — the consumer provides session data and action callbacks. No daakia store imports are required.
        </DocNote>
      </DocSection>

      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'VARIABLES section with scope groups', color: 'var(--color-primary)' },
          { label: 'Recursive variable value tree', color: 'var(--color-success)' },
          { label: 'WATCH expressions with live evaluation', color: 'var(--color-info)' },
          { label: 'CALL STACK with frame restart', color: 'var(--color-warning)' },
          { label: 'BREAKPOINTS with enable/disable/mute', color: '#a855f7' },
          { label: 'Debug toolbar (Continue/Step Over/Into/Out/Restart/Stop)', color: '#ec4899' },
          { label: 'VS Code-style value colors', color: '#14b8a6' },
          { label: 'CollapsibleSectionView for all sections', color: '#f97316' },
        ]} />
      </DocSection>

      <DocSection title="DebugSession">
        <PropTable props={[
          { name: 'active', type: 'boolean', required: true, description: 'Whether a debug session is running.' },
          { name: 'status', type: "'idle' | 'running' | 'paused'", required: true, description: 'Current session status. Paused enables the step toolbar buttons.' },
          { name: 'pausedLine', type: 'number | null', description: 'Current paused line number.' },
          { name: 'variables', type: 'DebugVariable[]', description: 'Array of { name, value, type? } captured at the current pause point.' },
          { name: 'callStack', type: 'DebugCallFrame[]', description: 'Call stack frames at the current pause point.' },
          { name: 'breakpoints', type: 'DebugBreakpoint[]', description: 'All breakpoints across all files.' },
          { name: 'breakpointsMuted', type: 'boolean', description: 'When true, all breakpoints are muted (the toolbar mute icon turns red).' },
        ]} />
      </DocSection>

      <DocSection title="DebugActions">
        <PropTable props={[
          { name: 'onContinue', type: '() => void', description: 'Resume execution (F5).' },
          { name: 'onStepOver', type: '() => void', description: 'Step over current line (F10).' },
          { name: 'onStepInto', type: '() => void', description: 'Step into function (F11).' },
          { name: 'onStepOut', type: '() => void', description: 'Step out of function (⇧F11).' },
          { name: 'onRestart', type: '() => void', description: 'Restart the debug session.' },
          { name: 'onStop', type: '() => void', description: 'Stop the debug session.' },
          { name: 'onAddWatchExpression', type: '(expr: string) => void', description: 'Add a watch expression.' },
          { name: 'onRemoveWatchExpression', type: '(expr: string) => void', description: 'Remove a specific watch expression.' },
          { name: 'onClearWatchExpressions', type: '() => void', description: 'Remove all watch expressions.' },
          { name: 'onToggleBreakpoint', type: '(key, line, currentlyDisabled) => void', description: 'Toggle a breakpoint enable/disable state.' },
          { name: 'onRemoveBreakpoint', type: '(key, line) => void', description: 'Remove a breakpoint.' },
          { name: 'onNavigateBreakpoint', type: '(key, line) => void', description: 'Navigate editor to a breakpoint location.' },
          { name: 'onToggleMuteBreakpoints', type: '() => void', description: 'Toggle muting all breakpoints.' },
          { name: 'onClearAllBreakpoints', type: '() => void', description: 'Remove all breakpoints.' },
          { name: 'onRestartFrame', type: '(frameIndex: number) => void', description: 'Restart a call stack frame.' },
        ]} />
      </DocSection>

      <DocSection title="DebugViewProps">
        <PropTable props={[
          { name: 'session', type: 'DebugSession', required: true, description: 'Current debug session state.' },
          { name: 'actions', type: 'DebugActions', description: 'Action callbacks. Omit any to hide the corresponding UI.' },
          { name: 'watchExpressions', type: 'string[]', default: '[]', description: 'Controlled list of watch expressions managed externally.' },
          { name: 'accentColor', type: 'string', default: "'var(--color-primary)'", description: 'Accent color for section headers and highlights.' },
          { name: 'title', type: 'string', default: "'Run and Debug'", description: 'Panel title shown in the toolbar.' },
          { name: 'className', type: 'string', description: 'Extra CSS class on the root element.' },
        ]} />
      </DocSection>

      <DocSection title="Value type colors (VS Code style)">
        <EnumTable name="value type" values={[
          { value: 'string', description: "#ce9178 — orange-red", color: '#ce9178' },
          { value: 'number', description: '#b5cea8 — soft green', color: '#b5cea8' },
          { value: 'boolean', description: '#569cd6 — blue', color: '#569cd6' },
          { value: 'null/undefined', description: '#808080 — grey', color: '#808080' },
          { value: 'array', description: '#dcdcaa — yellow', color: '#dcdcaa' },
          { value: 'object', description: '#9cdcfe — light blue', color: '#9cdcfe' },
        ]} />
      </DocSection>
    </div>
  );
}
