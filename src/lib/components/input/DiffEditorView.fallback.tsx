import { useMemo } from 'react';
import type { DiffEditorViewProps } from './DiffEditorView';

type DiffOp = { type: 'equal' | 'add' | 'remove'; line: string };

/**
 * Small LCS-based line diff — good enough for the config/JSON-sized text this
 * fallback typically sees. Not Monaco's diff engine (no inline char-level
 * highlighting, no side-by-side alignment), just enough to see what changed.
 */
function diffLines(original: string, modified: string): DiffOp[] {
  const a = original.split('\n');
  const b = modified.split('\n');
  const n = a.length;
  const m = b.length;
  const dp: number[][] = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      dp[i][j] = a[i] === b[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
    }
  }
  const ops: DiffOp[] = [];
  let i = 0, j = 0;
  while (i < n && j < m) {
    if (a[i] === b[j]) {
      ops.push({ type: 'equal', line: a[i] });
      i++; j++;
    } else if (dp[i + 1][j] >= dp[i][j + 1]) {
      ops.push({ type: 'remove', line: a[i] });
      i++;
    } else {
      ops.push({ type: 'add', line: b[j] });
      j++;
    }
  }
  while (i < n) { ops.push({ type: 'remove', line: a[i] }); i++; }
  while (j < m) { ops.push({ type: 'add', line: b[j] }); j++; }
  return ops;
}

const OP_STYLES: Record<DiffOp['type'], { bg: string; prefix: string }> = {
  equal: { bg: 'transparent', prefix: '  ' },
  add: { bg: 'color-mix(in srgb, var(--color-success, #22c55e) 15%, transparent)', prefix: '+ ' },
  remove: { bg: 'color-mix(in srgb, var(--color-danger, #ef4444) 15%, transparent)', prefix: '- ' },
};

export function DiffEditorViewFallback({
  original,
  modified,
  height = 300,
  fontSize = 12,
  wordWrap = false,
}: DiffEditorViewProps) {
  const ops = useMemo(() => diffLines(original, modified), [original, modified]);
  const h = typeof height === 'number' ? `${height}px` : height;

  return (
    <div
      className="dui-diffeditor-fallback"
      style={{
        height: h,
        width: '100%',
        overflow: 'auto',
        fontFamily: 'Menlo, Monaco, "Courier New", monospace',
        fontSize,
        lineHeight: 1.55,
        background: 'var(--color-codeblock-bg, transparent)',
        border: '1px solid var(--color-surface-border)',
        borderRadius: '6px',
      }}
    >
      {ops.map((op, i) => (
        <div
          key={i}
          style={{
            background: OP_STYLES[op.type].bg,
            whiteSpace: wordWrap ? 'pre-wrap' : 'pre',
            overflowWrap: wordWrap ? 'break-word' : 'normal',
            padding: '0 8px',
            color: 'var(--color-text-primary)',
          }}
        >
          {OP_STYLES[op.type].prefix}{op.line}
        </div>
      ))}
    </div>
  );
}
