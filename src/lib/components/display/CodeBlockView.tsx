import { useState, useMemo } from 'react';
import { CopyIcon, CheckIcon } from '../../../icons';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import json from 'highlight.js/lib/languages/json';
import xml from 'highlight.js/lib/languages/xml';
import css from 'highlight.js/lib/languages/css';
import bash from 'highlight.js/lib/languages/bash';
import yaml from 'highlight.js/lib/languages/yaml';
import python from 'highlight.js/lib/languages/python';
import sql from 'highlight.js/lib/languages/sql';
import powershell from 'highlight.js/lib/languages/powershell';
import ini from 'highlight.js/lib/languages/ini';
import java from 'highlight.js/lib/languages/java';
import http from 'highlight.js/lib/languages/http';
// No fixed hljs theme stylesheet here — `.dui-hljs` token colours are defined
// in index.css against the host app's own `--color-*` theme vars, so syntax
// highlighting stays legible in both light and dark themes instead of always
// forcing a dark-editor palette.
//
// IMPORTANT for consumer apps: `highlight.js` is a regular dependency here,
// not a peerDependency — Vite bundles dui's own copy into dist/index.js, so
// it is a SEPARATE module instance from whatever `highlight.js/lib/core` a
// host app imports directly. Calling `hljs.registerLanguage(...)` from
// consumer code (e.g. ns9-ui's NodeCard.tsx used to) registers onto THAT
// app's own copy and never reaches the instance CodeBlockView actually
// calls `.highlight()` on — the added language silently never highlights,
// with no error (canHighlight just stays false). Any language this
// component needs to support must be registered HERE instead.

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('js', javascript);
hljs.registerLanguage('jsx', javascript);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('ts', typescript);
hljs.registerLanguage('tsx', typescript);
hljs.registerLanguage('json', json);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('html', xml);
hljs.registerLanguage('css', css);
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('shell', bash);
hljs.registerLanguage('sh', bash);
hljs.registerLanguage('yaml', yaml);
hljs.registerLanguage('yml', yaml);
hljs.registerLanguage('python', python);
hljs.registerLanguage('py', python);
hljs.registerLanguage('sql', sql);
hljs.registerLanguage('powershell', powershell);
hljs.registerLanguage('ps1', powershell);
// hljs's ini grammar covers KEY=VALUE and [section] files — exactly what
// .env and TOML snippets need, so alias all three to it.
hljs.registerLanguage('ini', ini);
hljs.registerLanguage('env', ini);
hljs.registerLanguage('toml', ini);
hljs.registerLanguage('properties', ini);
hljs.registerLanguage('java', java);
hljs.registerLanguage('http', http);

export interface CodeBlockViewProps {
  code: string;
  language?: string;
  /** Optional filename/title row rendered above the language + copy bar */
  title?: string;
  showCopyButton?: boolean;
  showLineNumbers?: boolean;
  maxHeight?: string;
  /**
   * Stretch to fill the height of a flex/grid parent instead of sizing to
   * content — for callers embedding this in a flex-1 container that should
   * be fully spanned (e.g. a detail panel's sole content block) rather than
   * left with empty space below a content-sized box. Switches the root to
   * `display:flex, flexDirection:column, height:100%` and the scrollable
   * code area to `flex:1` instead of relying on `maxHeight` alone — `
   * maxHeight` only caps growth, it can't force a short block to grow, which
   * is exactly what "span available height" needs. `maxHeight` is ignored
   * when this is set.
   */
  fill?: boolean;
  accentColor?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function CodeBlockView({
  code,
  language,
  title,
  showCopyButton = true,
  showLineNumbers = false,
  maxHeight = '300px',
  fill = false,
  accentColor,
  className = '',
  style,
}: CodeBlockViewProps) {
  const [copied, setCopied] = useState(false);
  const accent = accentColor || 'var(--color-primary)';

  // Only highlight when the caller names a language we actually registered
  // above. Plain prose (language="text"/"plaintext", or no language at all)
  // is rendered as-is — auto-detection on non-code text (e.g. an LLM system
  // prompt) reliably misfires, painting random English words as keywords.
  const canHighlight = !!(language && hljs.getLanguage(language));

  const highlighted = useMemo(() => {
    if (!canHighlight) return null;
    try {
      return hljs.highlight(code, { language: language! });
    } catch {
      return null;
    }
  }, [code, language, canHighlight]);

  const escapeHtml = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch { /* ignore */ }
  };

  const lines = code.split('\n');

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        minWidth: 320,
        background: 'var(--color-codeblock-bg)',
        border: '1px solid var(--color-codeblock-border)',
        borderRadius: '6px',
        ...(fill ? { display: 'flex', flexDirection: 'column' as const, height: '100%' } : {}),
        ...style,
        overflow: 'hidden',
        fontSize: '12px',
        fontFamily: 'monospace',
      }}
    >
      {/* Optional title/filename row */}
      {title && (
        <div style={{
          padding: '5px 10px',
          borderBottom: '1px solid var(--color-surface-border)',
          background: 'var(--color-codeblock-header-bg)',
          fontSize: '11px',
          fontFamily: 'monospace',
          color: 'var(--color-text-muted)',
        }}>
          {title}
        </div>
      )}

      {/* Top bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '5px 10px',
        borderBottom: '1px solid var(--color-surface-border)',
        background: 'var(--color-codeblock-header-bg)',
      }}>
        {language ? (
          <span style={{ fontSize: '10px', color: 'var(--color-text-muted)', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            {language}
          </span>
        ) : <span />}
        {showCopyButton && (
          <button
            type="button"
            onClick={handleCopy}
            style={{
              display: 'flex', alignItems: 'center', gap: '4px',
              padding: '2px 6px', borderRadius: '4px', border: 'none',
              background: copied ? `color-mix(in srgb, var(--color-success) 12%, transparent)` : 'transparent',
              color: copied ? 'var(--color-success)' : 'var(--color-text-muted)',
              cursor: 'pointer', fontSize: '10px', transition: 'all 120ms',
            }}
          >
            {copied ? <CheckIcon size={10} /> : <CopyIcon size={10} />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        )}
      </div>

      {/* Code — hljs highlighted, word-wrapped */}
      <div style={fill ? { overflowY: 'auto', flex: 1, minHeight: 0 } : { overflowY: 'auto', maxHeight }}>
        {showLineNumbers ? (
          <pre style={{ margin: 0, padding: '10px 0', lineHeight: 1.55, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
            {lines.map((line, i) => (
              <div key={i} style={{ display: 'flex', gap: '0' }}>
                <span style={{
                  color: 'var(--color-text-muted)', userSelect: 'none',
                  minWidth: '3ch', textAlign: 'right', opacity: 0.4,
                  padding: '0 12px 0 0', flexShrink: 0,
                }}>
                  {i + 1}
                </span>
                <code
                  className="dui-hljs"
                  dangerouslySetInnerHTML={{
                    __html: canHighlight ? hljs.highlight(line, { language: language! }).value : escapeHtml(line),
                  }}
                  style={{ background: 'transparent', padding: 0, flex: 1 }}
                />
              </div>
            ))}
          </pre>
        ) : highlighted ? (
          <pre style={{ margin: 0, lineHeight: 1.55, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
            <code
              className="dui-hljs"
              dangerouslySetInnerHTML={{ __html: highlighted.value }}
              style={{ background: 'transparent', padding: '10px 12px', display: 'block' }}
            />
          </pre>
        ) : (
          <pre style={{ margin: 0, padding: '10px 12px', color: 'var(--color-text-primary)', lineHeight: 1.55, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
            {code}
          </pre>
        )}
      </div>
    </div>
  );
}
