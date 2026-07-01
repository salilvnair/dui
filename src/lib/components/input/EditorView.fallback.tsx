import { useMemo } from 'react';
import { useEditorBase } from '../../core/EditorBase';
import { EditorShell } from './EditorView.shell';
import type { EditorViewProps } from './EditorView';

/**
 * Plain-textarea stand-in for EditorView, used whenever Monaco isn't
 * available (not installed, or '@salilvnair/dui/monaco-setup' was never
 * imported). Deliberately minimal — no IntelliSense, no breakpoints, no
 * folding, no format-on-save. Those are Monaco-specific concepts; anything
 * that needs them should treat the fallback as a degraded, read/write-only
 * text box rather than try to emulate Monaco's feature set.
 */
export function EditorViewFallback({
  value,
  onChange,
  language = 'json',
  height = '200px',
  minHeight,
  readOnly = false,
  placeholder,
  wordWrap = true,
  size,
  fontSize,
  className = '',
  bordered = false,
  accentColor,
}: EditorViewProps) {
  const base = useEditorBase(size);
  const resolvedFontSize = fontSize ?? base.fontSize;
  const resolvedHeight = typeof height === 'number' ? `${height}px` : height;
  const containerHeight = minHeight ? `max(${resolvedHeight}, ${minHeight}px)` : resolvedHeight;
  const ariaLabel = useMemo(() => `${language} editor (plain-text fallback — Monaco not available)`, [language]);

  return (
    <EditorShell bordered={bordered} containerHeight={containerHeight} accentColor={accentColor}>
      <textarea
        className={`dui-editor-fallback ${className}`}
        aria-label={ariaLabel}
        value={value}
        onChange={e => onChange?.(e.target.value)}
        readOnly={readOnly}
        placeholder={placeholder}
        spellCheck={false}
        autoCorrect="off"
        autoCapitalize="off"
        style={{
          width: '100%',
          height: '100%',
          resize: 'none',
          border: 'none',
          outline: 'none',
          padding: '8px 10px',
          margin: 0,
          background: 'var(--color-codeblock-bg, transparent)',
          color: 'var(--color-text-primary)',
          fontFamily: 'Menlo, Monaco, "Courier New", monospace',
          fontSize: resolvedFontSize,
          lineHeight: 1.55,
          whiteSpace: wordWrap ? 'pre-wrap' : 'pre',
          overflowWrap: wordWrap ? 'break-word' : 'normal',
          overflow: 'auto',
        }}
      />
    </EditorShell>
  );
}
