import { useState } from 'react';
import { DebugEditorView } from '@/dui';
import { Row } from '../../../shared/Row';

export function DebugEditorViewLive() {
  const [code, setCode] = useState(
    `// Pre-request script\nconst userId = dk.env.get('userId');\ndk.request.setHeader('X-User-ID', userId);\nconsole.log('userId:', userId);\nconst token = dk.env.get('token');\ndk.request.setHeader('Authorization', 'Bearer ' + token);`,
  );
  const [breakpoints, setBreakpoints] = useState<number[]>([3, 5]);
  const [pausedLine] = useState<number | null>(3);

  return (
    <div>
      <Row label="DebugEditorView — breakpoint gutter, paused-line highlight, toggle on click" noPad
        code={`<DebugEditorView\n  value={code}\n  onChange={setCode}\n  language="javascript"\n  height={200}\n  breakpoints={breakpoints}\n  pausedLine={3}\n  adapter={{ onToggleBreakpoint: (line) => setBreakpoints(prev =>\n    prev.includes(line) ? prev.filter(l => l !== line) : [...prev, line]\n  )}}\n/>`}>
        <div style={{ width: '100%' }}>
          <DebugEditorView
            value={code} onChange={setCode} language="javascript" height="200px"
            breakpoints={breakpoints} pausedLine={pausedLine}
            adapter={{
              onToggleBreakpoint: (line) =>
                setBreakpoints(prev => prev.includes(line) ? prev.filter(l => l !== line) : [...prev, line]),
            }}
          />
          <div style={{ marginTop: 6, fontSize: 11, color: 'var(--color-text-muted)' }}>
            Click gutter to toggle breakpoints · Yellow = paused line · Active: {breakpoints.join(', ') || 'none'}
          </div>
        </div>
      </Row>
    </div>
  );
}
