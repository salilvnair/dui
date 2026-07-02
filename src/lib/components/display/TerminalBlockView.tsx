import { useState, type ReactNode } from 'react';

const SHELL_TOOLS = new Set([
  'curl', 'wget', 'psql', 'uvicorn', 'python', 'python3', 'pip', 'pip3',
  'npm', 'npx', 'node', 'brew', 'apt', 'apt-get', 'sudo', 'export', 'cd',
  'ls', 'mkdir', 'rm', 'cat', 'grep', 'chmod', 'source', 'which', 'echo',
]);

const HTTP_VERBS = new Set(['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS']);

function highlightLine(line: string, dark: boolean): ReactNode {
  if (!line) return <br />;
  const commentColor = dark ? '#6b7280' : '#94a3b8';
  if (line.trimStart().startsWith('#')) return <span style={{ color: commentColor }}>{line}</span>;

  const defaultText = dark ? '#e2e8f0' : '#334155';
  const cmdColor    = dark ? '#4ade80' : '#15803d';
  const subcmdColor = dark ? '#4ade80' : '#15803d';
  const flagColor   = dark ? '#60a5fa' : '#2563eb';
  const strColor    = dark ? '#fbbf24' : '#b45309';
  const urlColor    = dark ? '#38bdf8' : '#0369a1';
  const httpColor   = dark ? '#f97316' : '#c2410c';
  const envKeyColor = dark ? '#a78bfa' : '#7c3aed';
  const numColor    = dark ? '#f97316' : '#c2410c';

  const out: ReactNode[] = [];
  let rest = line;
  let key = 0;

  const push = (text: string, color?: string) => {
    if (!text) return;
    out.push(<span key={key++} style={{ color: color ?? defaultText }}>{text}</span>);
  };

  const leadMatch = rest.match(/^(\s+)/);
  if (leadMatch) { push(leadMatch[1]); rest = rest.slice(leadMatch[1].length); }

  const envLine = rest.match(/^(export\s+)?([A-Z][A-Z0-9_]*)(=)(.*)/);
  if (envLine) {
    if (envLine[1]) push(envLine[1], cmdColor);
    push(envLine[2], envKeyColor);
    push(envLine[3], commentColor);
    const rawVal = envLine[4];
    const ci = rawVal.search(/\s+#/);
    if (ci >= 0) {
      push(rawVal.slice(0, ci), strColor);
      push(rawVal.slice(ci), commentColor);
    } else {
      push(rawVal, strColor);
    }
    return <>{out}</>;
  }

  const tokenRe = /(https?:\/\/\S+)|(--[\w-]+=?)|("(?:[^"\\]|\\.)*")|('(?:[^'\\]|\\.)*')|(\S+)/g;
  let prevToken = '';
  let afterCmd = false;
  let subcmdSeen = false;
  let match: RegExpExecArray | null;
  let pos = 0;

  while ((match = tokenRe.exec(rest)) !== null) {
    if (match.index > pos) push(rest.slice(pos, match.index));
    const t = match[0];

    if (match[1]) {
      push(t, urlColor);
    } else if (match[2]) {
      push(t, flagColor);
      prevToken = t;
      pos = match.index + t.length;
      continue;
    } else if (match[3] || match[4]) {
      push(t, strColor);
    } else {
      const bare = t.replace(/[\\;|&]$/, '');
      if (SHELL_TOOLS.has(bare)) {
        push(t, cmdColor); afterCmd = true; subcmdSeen = false;
      } else if (afterCmd && !subcmdSeen && !t.startsWith('-')) {
        push(t, subcmdColor); subcmdSeen = true; afterCmd = false;
      } else if (HTTP_VERBS.has(bare) && (prevToken === '-X' || prevToken === '--request')) {
        push(t, httpColor);
      } else if (/^-?\d+(\.\d+)?$/.test(bare)) {
        push(t, numColor);
      } else {
        push(t, defaultText);
      }
    }

    prevToken = t;
    pos = match.index + t.length;
  }
  if (pos < rest.length) push(rest.slice(pos));
  return <>{out}</>;
}

export interface TerminalBlockViewProps {
  code: string;
  title?: string;
  /** Defaults to following DuiProvider's data-theme */
  dark?: boolean;
  className?: string;
}

export function TerminalBlockView({ code, title, dark = true, className = '' }: TerminalBlockViewProps) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const lines = code.split('\n');

  return (
    <div
      className={className}
      style={{
        margin: '16px 0', borderRadius: '12px', overflow: 'hidden',
        border: '1px solid var(--color-elevated-border)', background: 'var(--color-surface)',
        color: 'var(--color-text-primary)',
      }}
    >
      {title && (
        <div
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '8px 16px', borderBottom: '1px solid var(--color-elevated-border)',
            background: 'var(--color-elevated)',
          }}
        >
          <span style={{ fontSize: '12px', fontFamily: 'monospace', color: 'var(--color-text-muted)' }}>{title}</span>
          <span
            style={{
              fontSize: '10px', padding: '2px 8px', borderRadius: 4, textTransform: 'uppercase',
              letterSpacing: '0.06em', background: 'var(--color-elevated-border)', color: 'var(--color-text-muted)',
            }}
          >
            TERMINAL
          </span>
        </div>
      )}
      <div style={{ position: 'relative' }}>
        <button
          type="button"
          onClick={copy}
          style={{
            position: 'absolute', top: 12, right: 12, zIndex: 10,
            fontSize: '10px', padding: '4px 8px', borderRadius: 4, border: 'none', cursor: 'pointer',
            background: copied ? 'color-mix(in srgb, var(--color-info) 20%, transparent)' : 'var(--color-elevated)',
            color: copied ? 'var(--color-info)' : 'var(--color-text-muted)',
          }}
        >
          {copied ? '✓ copied' : 'copy'}
        </button>
        <pre style={{ margin: 0, padding: '16px', overflowX: 'auto', fontSize: '13px', fontFamily: 'monospace', lineHeight: 1.6 }}>
          {lines.map((l, i) => <div key={i}>{highlightLine(l, dark)}</div>)}
        </pre>
      </div>
    </div>
  );
}
