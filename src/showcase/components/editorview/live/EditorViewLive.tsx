import { useState } from 'react';
import {
  EditorView,
  EditorLineNumbers,
  EditorCursorStyle,
  EditorCursorBlinking,
  EditorRenderWhitespace,
  EditorFoldingControls,
} from '@/dui';
import { CodeIcon, CopyIcon, SparkleIcon, InfoCircleIcon, WandIcon, TrashIcon } from '@/icons/daakia-icons';

const SAMPLE_JSON = `{
  "userId": 42,
  "name": "Alice Wonderland",
  "role": "admin",
  "active": true,
  "tags": ["beta", "power-user"],
  "meta": { "joined": "2024-01-15", "requests": 1248 }
}`;

function Row({ label, children, noPad, code }: {
  label: string;
  children: React.ReactNode;
  noPad?: boolean;
  code?: string;
}) {
  const [showCode, setShowCode] = useState(false);
  return (
    <div style={{
      marginBottom: 16,
      border: '1px solid var(--color-surface-border)',
      borderRadius: 10,
      background: 'var(--color-surface)',
      overflow: 'hidden',
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '7px 14px',
        background: 'color-mix(in srgb, var(--color-surface-border) 30%, transparent)',
        borderBottom: '1px solid var(--color-surface-border)',
      }}>
        <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--color-text-muted)' }}>{label}</span>
        {code && (
          <button
            type="button"
            onClick={() => setShowCode(v => !v)}
            style={{ fontSize: 10, color: 'var(--color-primary)', background: 'none', border: 'none', cursor: 'pointer', padding: '2px 6px' }}
          >
            {showCode ? 'Hide code' : 'Show code'}
          </button>
        )}
      </div>
      {showCode && code && (
        <pre style={{ margin: 0, padding: '10px 14px', fontSize: 11, lineHeight: 1.6, background: 'var(--color-panel)', overflow: 'auto', borderBottom: '1px solid var(--color-surface-border)' }}>
          <code style={{ color: 'var(--color-text-secondary)', fontFamily: 'monospace' }}>{code}</code>
        </pre>
      )}
      <div style={{ padding: noPad ? 0 : '12px 14px' }}>{children}</div>
    </div>
  );
}

function EditorContextMenuDemo() {
  const [body, setBody] = useState('{\n  "userId": 42,\n  "name": "Alice",\n  "role": "admin"\n}');
  const [lastAction, setLastAction] = useState('');
  return (
    <div style={{ width: '100%' }}>
      <EditorView
        value={body} onChange={setBody} language="json" height="160px"
        contextMenuMode="dui"
        contextMenuItems={[
          { id: 'format', label: 'Format Document', icon: <CodeIcon size={13} />, onClick: () => setLastAction('Format Document') },
          { id: 'copy',   label: 'Copy All',        icon: <CopyIcon size={13} />, onClick: () => { navigator.clipboard.writeText(body); setLastAction('Copied'); } },
          { id: 'sep',    label: '',                separator: true },
          { id: 'ai',     label: 'AI Assist',       icon: <SparkleIcon size={13} />,
            children: [
              { id: 'ai-explain', label: 'Explain',    icon: <InfoCircleIcon size={13} />, onClick: () => setLastAction('AI → Explain') },
              { id: 'ai-fix',     label: 'Fix issues', icon: <WandIcon size={13} />,       onClick: () => setLastAction('AI → Fix') },
            ],
          },
          { id: 'clear', label: 'Clear', icon: <TrashIcon size={13} />, danger: true, onClick: () => { setBody(''); setLastAction('Cleared'); } },
        ]}
      />
      {lastAction && (
        <div style={{ marginTop: 6, fontSize: 11, color: 'var(--color-text-muted)' }}>
          Last action: <strong style={{ color: 'var(--color-text-primary)' }}>{lastAction}</strong>
        </div>
      )}
      <div style={{ marginTop: 4, fontSize: 11, color: 'var(--color-text-muted)' }}>
        Right-click in the editor to open the custom DUI context menu
      </div>
    </div>
  );
}

export function EditorViewLive() {
  const [json, setJson] = useState(SAMPLE_JSON);

  return (
    <div>
      <Row label="JSON editor (editable)" noPad code={`<EditorView value={body} onChange={setBody} language="json" height="200px" />`}>
        <EditorView value={json} onChange={setJson} language="json" height="200px" />
      </Row>

      <Row label="GraphQL (placeholder shown when empty)" noPad code={`<EditorView value="" language="graphql" height="120px" placeholder="query { ... }" />`}>
        <EditorView value="" language="graphql" height="120px" placeholder="query { ... }" />
      </Row>

      <Row label="readOnly=true" noPad code={`<EditorView value='{ "status": "read-only" }' language="json" height="80px" readOnly />`}>
        <EditorView value='{ "status": "read-only" }' language="json" height="80px" readOnly />
      </Row>

      <Row
        label='contextMenuMode="dui" — right-click shows DUI ContextMenuView (submenus, icons, danger, separators)'
        noPad
        code={`<EditorView\n  contextMenuMode="dui"\n  contextMenuItems={[\n    { id: 'format', label: 'Format Document', icon: <CodeIcon />, onClick: () => {} },\n    { id: 'sep', label: '', separator: true },\n    { id: 'ai', label: 'AI Assist', icon: <SparkleIcon />,\n      children: [\n        { id: 'ai-explain', label: 'Explain', onClick: () => {} },\n      ] },\n    { id: 'clear', label: 'Clear', danger: true, onClick: () => {} },\n  ]}\n/>`}
      >
        <EditorContextMenuDemo />
      </Row>

      <Row label='contextMenuMode="native" (default) — Monaco built-in context menu' noPad code={`<EditorView value={body} language="json" height="100px" />`}>
        <EditorView value='{ "mode": "native — right-click me" }' language="json" height="100px" />
      </Row>

      <Row
        label="editorOptions — fine-grained Monaco options via DUI enums (block cursor, relative lines, whitespace visible)"
        noPad
        code={`import { EditorLineNumbers, EditorCursorStyle, EditorCursorBlinking, EditorRenderWhitespace, EditorFoldingControls } from 'dui';\n\n<EditorView\n  language="javascript"\n  height="160px"\n  editorOptions={{\n    lineNumbers: EditorLineNumbers.RELATIVE,\n    cursorStyle: EditorCursorStyle.BLOCK,\n    cursorBlinking: EditorCursorBlinking.SOLID,\n    renderWhitespace: EditorRenderWhitespace.ALL,\n    minimap: true,\n    smoothScrolling: true,\n    tabSize: 4,\n    folding: true,\n    showFoldingControls: EditorFoldingControls.ALWAYS,\n  }}\n/>`}
      >
        <EditorView
          value={'function greet(name) {\n  const msg = `Hello, ${name}!`;\n  console.log(msg);\n  return msg;\n}'}
          language="javascript"
          height="160px"
          editorOptions={{
            lineNumbers: EditorLineNumbers.RELATIVE,
            cursorStyle: EditorCursorStyle.BLOCK,
            cursorBlinking: EditorCursorBlinking.SOLID,
            renderWhitespace: EditorRenderWhitespace.ALL,
            minimap: true,
            smoothScrolling: true,
            tabSize: 4,
            folding: true,
            showFoldingControls: EditorFoldingControls.ALWAYS,
          }}
        />
      </Row>
    </div>
  );
}
