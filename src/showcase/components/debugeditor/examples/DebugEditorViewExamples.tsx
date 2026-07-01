import { useState } from 'react';
import { DebugEditorView } from '@/dui';
import type { DebugEditorAdapter } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

const JS_SNIPPET = `async function fetchUser(userId) {
  const token = getAuthToken();
  const response = await fetch(\`/api/users/\${userId}\`, {
    headers: { Authorization: \`Bearer \${token}\` },
  });
  if (!response.ok) {
    throw new Error(\`HTTP \${response.status}\`);
  }
  return response.json();
}

async function loadDashboard() {
  const user = await fetchUser(42);
  console.log('Loaded:', user.name);
  return user;
}`;

const PYTHON_SNIPPET = `import httpx

def fetch_user(user_id: int) -> dict:
    token = get_auth_token()
    headers = {"Authorization": f"Bearer {token}"}
    response = httpx.get(f"https://api.example.com/users/{user_id}", headers=headers)
    response.raise_for_status()
    return response.json()

def load_dashboard():
    user = fetch_user(42)
    print(f"Loaded: {user['name']}")
    return user`;

export function DebugEditorViewExamples() {
  const [breakpoints1, setBreakpoints1] = useState<number[]>([3, 7]);
  const [breakpoints2, setBreakpoints2] = useState<number[]>([3, 7]);
  const [pausedLine,   setPausedLine]   = useState<number | null>(5);
  const [hoverLog,     setHoverLog]     = useState<string | null>(null);

  const adapter1: DebugEditorAdapter = {
    onToggleBreakpoint: (line) => {
      setBreakpoints1(prev =>
        prev.includes(line) ? prev.filter(l => l !== line) : [...prev, line]
      );
    },
  };

  const adapter2: DebugEditorAdapter = {
    onToggleBreakpoint: (line) => {
      setBreakpoints2(prev =>
        prev.includes(line) ? prev.filter(l => l !== line) : [...prev, line]
      );
    },
  };

  const adapterWithHover: DebugEditorAdapter = {
    onToggleBreakpoint: (line) => {
      setBreakpoints2(prev =>
        prev.includes(line) ? prev.filter(l => l !== line) : [...prev, line]
      );
    },
    onEditorMount: (_editor, _monaco) => {
      setHoverLog('Editor mounted — hover adapter ready');
    },
  };

  return (
    <div>
      <ExampleCard
        title="JavaScript with Breakpoints (lines 3 and 7)"
        description="Click in the gutter to toggle breakpoints — red dots appear on active breakpoint lines"
        code={`const [breakpoints, setBreakpoints] = useState([3, 7]);

<DebugEditorView
  value={jsSnippet}
  language="javascript"
  breakpoints={breakpoints}
  adapter={{
    onToggleBreakpoint: line =>
      setBreakpoints(prev =>
        prev.includes(line) ? prev.filter(l => l !== line) : [...prev, line]
      ),
  }}
/>`}
      >
        <div style={{ height: 260, border: '1px solid var(--color-surface-border)', borderRadius: 6, overflow: 'hidden' }}>
          <DebugEditorView
            value={JS_SNIPPET}
            language="javascript"
            breakpoints={breakpoints1}
            adapter={adapter1}
            editorOptions={{ minimap: false }}
          />
        </div>
        <div style={{ marginTop: 6, fontSize: 11, color: 'var(--color-text-muted)' }}>
          Active breakpoints: {breakpoints1.length > 0 ? breakpoints1.map(l => `line ${l}`).join(', ') : 'none'} — click gutter to toggle
        </div>
      </ExampleCard>

      <ExampleCard
        title="Paused at Line 5 — Highlighted"
        description="pausedLine renders a yellow highlight bar across the current execution line"
        code={`<DebugEditorView
  value={jsSnippet}
  language="javascript"
  breakpoints={[3, 7]}
  pausedLine={5}
  adapter={adapter}
/>`}
      >
        <div style={{ height: 260, border: '1px solid var(--color-surface-border)', borderRadius: 6, overflow: 'hidden' }}>
          <DebugEditorView
            value={JS_SNIPPET}
            language="javascript"
            breakpoints={breakpoints2}
            pausedLine={pausedLine}
            adapter={adapter2}
            editorOptions={{ minimap: false }}
          />
        </div>
        <div style={{ marginTop: 6, display: 'flex', gap: 8, alignItems: 'center' }}>
          <span style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>
            Paused at: {pausedLine !== null ? `line ${pausedLine}` : 'none'}
          </span>
          <button
            type="button"
            onClick={() => setPausedLine(p => p === 5 ? 9 : 5)}
            style={{ fontSize: 11, padding: '2px 8px', borderRadius: 4, border: '1px solid var(--color-surface-border)', background: 'var(--color-panel)', color: 'var(--color-text-secondary)', cursor: 'pointer' }}
          >
            Toggle paused line (5 ↔ 9)
          </button>
          <button
            type="button"
            onClick={() => setPausedLine(null)}
            style={{ fontSize: 11, padding: '2px 8px', borderRadius: 4, border: '1px solid var(--color-surface-border)', background: 'var(--color-panel)', color: 'var(--color-text-secondary)', cursor: 'pointer' }}
          >
            Clear
          </button>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Variable Hover Tooltip (onEditorMount adapter)"
        description="adapter.onEditorMount gives access to the Monaco editor instance for hover tooltips and plugins"
        code={`const adapter = {
  onEditorMount: (editor, monaco) => {
    editor.addAction({
      id: 'show-hover',
      label: 'Show Variable Value',
      run: () => editor.trigger('', 'editor.action.showHover', {}),
    });
  },
};
<DebugEditorView value={snippet} language="javascript" adapter={adapter} />`}
      >
        <div style={{ height: 240, border: '1px solid var(--color-surface-border)', borderRadius: 6, overflow: 'hidden' }}>
          <DebugEditorView
            value={JS_SNIPPET}
            language="javascript"
            breakpoints={[3]}
            pausedLine={3}
            adapter={adapterWithHover}
            editorOptions={{ minimap: false }}
          />
        </div>
        {hoverLog && (
          <div style={{ marginTop: 6, fontSize: 11, color: 'var(--color-success)', fontFamily: 'monospace' }}>
            {hoverLog}
          </div>
        )}
      </ExampleCard>

      <ExampleCard
        title="Read-Only Debug Viewer"
        description="readOnly=true — shows breakpoints and paused line for inspection without editing"
        code={`<DebugEditorView
  value={jsSnippet}
  language="javascript"
  breakpoints={[3, 7]}
  pausedLine={7}
  options={{ readOnly: true }}
/>`}
      >
        <div style={{ height: 200, border: '1px solid var(--color-surface-border)', borderRadius: 6, overflow: 'hidden' }}>
          <DebugEditorView
            value={JS_SNIPPET}
            language="javascript"
            breakpoints={[3, 7]}
            pausedLine={7}
            readOnly editorOptions={{ minimap: false }}
          />
        </div>
        <div style={{ marginTop: 6, fontSize: 11, color: 'var(--color-text-muted)' }}>Read-only — editing is disabled, breakpoints visible</div>
      </ExampleCard>

      <ExampleCard
        title="Python Snippet with Breakpoints"
        description="DebugEditorView supports any Monaco language — here with a Python HTTP snippet"
        code={`<DebugEditorView
  value={pythonSnippet}
  language="python"
  breakpoints={[2, 8]}
  pausedLine={2}
  adapter={adapter}
/>`}
      >
        <div style={{ height: 240, border: '1px solid var(--color-surface-border)', borderRadius: 6, overflow: 'hidden' }}>
          <DebugEditorView
            value={PYTHON_SNIPPET}
            language="python"
            breakpoints={[2, 8]}
            pausedLine={2}
            adapter={{
              onToggleBreakpoint: () => {},
            }}
            editorOptions={{ minimap: false }}
          />
        </div>
      </ExampleCard>
    </div>
  );
}
