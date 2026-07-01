/**
 * MarkdownView — DUI wrapper of the Daakia markdown renderer.
 * Renders AI/markdown content with syntax-highlighted code blocks,
 * GFM tables, task lists, blockquotes, and copy-buttons on code blocks.
 *
 * Depends on: marked (v14), highlight.js (v11) — both already bundled.
 */
import { useMemo, useEffect, useRef, useCallback } from 'react';
import { marked, Renderer, type MarkedExtension } from 'marked';
import hljs from 'highlight.js/lib/core';
import type { LanguageFn } from 'highlight.js';
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import json from 'highlight.js/lib/languages/json';
import xml from 'highlight.js/lib/languages/xml';
import css from 'highlight.js/lib/languages/css';
import bash from 'highlight.js/lib/languages/bash';
import yaml from 'highlight.js/lib/languages/yaml';
import python from 'highlight.js/lib/languages/python';
import sql from 'highlight.js/lib/languages/sql';
import ruby from 'highlight.js/lib/languages/ruby';
import rust from 'highlight.js/lib/languages/rust';
import csharp from 'highlight.js/lib/languages/csharp';
import kotlin from 'highlight.js/lib/languages/kotlin';
import graphql from 'highlight.js/lib/languages/graphql';
import markdown from 'highlight.js/lib/languages/markdown';

// Curated set — covers AI/assistant code output plus everything MarkdownView's
// ALIASES map below can resolve to. highlightAuto() only detects among these,
// not highlight.js's full ~190-language corpus (which used to be pulled in
// wholesale via a bare `import hljs from 'highlight.js'`).
let _languagesRegistered = false;
function ensureLanguages() {
  if (_languagesRegistered) return;
  _languagesRegistered = true;
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
  hljs.registerLanguage('ruby', ruby);
  hljs.registerLanguage('rb', ruby);
  hljs.registerLanguage('rust', rust);
  hljs.registerLanguage('rs', rust);
  hljs.registerLanguage('csharp', csharp);
  hljs.registerLanguage('cs', csharp);
  hljs.registerLanguage('kotlin', kotlin);
  hljs.registerLanguage('kt', kotlin);
  hljs.registerLanguage('graphql', graphql);
  hljs.registerLanguage('markdown', markdown);
  hljs.registerLanguage('md', markdown);
}

/**
 * Register an additional highlight.js language for MarkdownView's code
 * blocks (and its `highlightAuto()` fallback) without waiting on a dui
 * version bump. Call once at app startup, before any MarkdownView renders:
 *
 *   import lua from 'highlight.js/lib/languages/lua';
 *   registerMarkdownLanguage('lua', lua);
 *
 * Safe to call multiple times / re-register the same name (highlight.js
 * itself is idempotent about this).
 */
export function registerMarkdownLanguage(name: string, definition: LanguageFn): void {
  hljs.registerLanguage(name, definition);
}

// ─── Singleton guard ──────────────────────────────────────────────────────────

let _configured = false;

// ─── Marked renderer ─────────────────────────────────────────────────────────

function buildRenderer(): Renderer {
  const r = new Renderer();

  r.code = ({ text, lang }: { text: string; lang?: string }) => {
    const safeLang = (lang || '').replace(/[<>"'&]/g, '');
    let highlighted = text;
    let resolvedLang = safeLang || 'plaintext';
    try {
      if (safeLang && hljs.getLanguage(safeLang)) {
        highlighted = hljs.highlight(text, { language: safeLang }).value;
      } else if (safeLang) {
        const ALIASES: Record<string, string> = {
          js: 'javascript', ts: 'typescript', sh: 'bash', py: 'python',
          yml: 'yaml', rb: 'ruby', rs: 'rust', cs: 'csharp', kt: 'kotlin',
        };
        const alias = ALIASES[safeLang.toLowerCase()];
        if (alias && hljs.getLanguage(alias)) {
          highlighted = hljs.highlight(text, { language: alias }).value;
        } else {
          const auto = hljs.highlightAuto(text);
          highlighted = auto.value;
        }
      } else {
        const auto = hljs.highlightAuto(text);
        highlighted = auto.value;
        resolvedLang = auto.language || 'plaintext';
      }
    } catch { /* noop */ }
    const encoded = encodeURIComponent(text);
    // Inline SVG strings — safe because they live in a dangerouslySetInnerHTML template
    const copyIcon = `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="dui-mdv-copy-icon"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`;
    return [
      `<div class="dui-mdv-code-block">`,
        `<div class="dui-mdv-code-header">`,
          `<span class="dui-mdv-lang-pill">${resolvedLang}</span>`,
          `<button class="dui-mdv-copy-btn" data-code="${encoded}" title="Copy code">${copyIcon}<span class="dui-mdv-copy-label">Copy</span></button>`,
        `</div>`,
        `<pre><code class="hljs language-${resolvedLang}">${highlighted}</code></pre>`,
      `</div>`,
    ].join('');
  };

  r.codespan = ({ text }: { text: string }) =>
    `<code class="dui-mdv-inline-code">${text}</code>`;

  return r;
}

function ensureConfig() {
  if (_configured) return;
  _configured = true;
  ensureLanguages();
  const ext: MarkedExtension = { renderer: buildRenderer(), breaks: true, gfm: true };
  marked.use(ext);
}

function parseMarkdown(content: string): string {
  ensureConfig();
  try {
    const result = marked.parse(content);
    return typeof result === 'string' ? result : content;
  } catch {
    const escaped = content.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return `<p>${escaped}</p>`;
  }
}

// ─── Copy-button wiring ──────────────────────────────────────────────────────

const COPY_HTML = `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="dui-mdv-copy-icon"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg><span class="dui-mdv-copy-label">Copy</span>`;
const CHECK_HTML = `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="dui-mdv-copy-icon dui-mdv-check-icon"><polyline points="20 6 9 17 4 12"/></svg><span class="dui-mdv-copy-label">Copied</span>`;

function wireCopyButtons(root: HTMLElement) {
  root.querySelectorAll<HTMLButtonElement>('.dui-mdv-copy-btn:not([data-wired])').forEach(btn => {
    btn.dataset.wired = '1';
    btn.addEventListener('click', () => {
      const code = decodeURIComponent(btn.dataset.code ?? '');
      navigator.clipboard?.writeText(code).catch(() => {});
      btn.innerHTML = CHECK_HTML;
      btn.classList.add('dui-mdv-copied');
      setTimeout(() => { btn.innerHTML = COPY_HTML; btn.classList.remove('dui-mdv-copied'); }, 2000);
    });
  });
}

// ─── Component ───────────────────────────────────────────────────────────────

export interface MarkdownViewProps {
  content: string;
  className?: string;
  style?: React.CSSProperties;
}

export function MarkdownView({ content, className = '', style }: MarkdownViewProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const html = useMemo(() => parseMarkdown(content), [content]);

  const attachButtons = useCallback(() => {
    if (rootRef.current) wireCopyButtons(rootRef.current);
  }, []);

  useEffect(() => { attachButtons(); }, [html, attachButtons]);

  return (
    <div
      ref={rootRef}
      className={`dui-mdv-root${className ? ` ${className}` : ''}`}
      style={style}
      // Safe: content is markdown parsed by marked — not raw user HTML
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
