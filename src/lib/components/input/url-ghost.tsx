import { useCallback, useMemo, useState } from 'react';
import { getCaretOffset } from '../../core/VariableToken';
import { suggestFor, type Suggested } from './url-suggest';

/**
 * The greyed completion drawn after the caret, and the caret tracking it needs.
 *
 * Shared by the two inputs that take `suggestions` — SelectTextInputView
 * (REST, SOAP) and HighlightedInputView (GraphQL, gRPC, MCP, WebSocket, SSE,
 * Socket.IO, MQTT). They are the same editor twice over: the same token
 * engine, the same undo stack, the same caret helpers. Writing the completion
 * into each of them separately would have made it two features that drift.
 */

/** Where the caret is, kept in state so suggestions can follow it. */
export function useCaret(
  editorRef: React.RefObject<HTMLDivElement | null>,
  initial: number,
): { caret: number; syncCaret: () => void; setCaret: (n: number) => void } {
  const [caret, setCaret] = useState(initial);
  const syncCaret = useCallback(() => {
    const el = editorRef.current;
    if (el) setCaret(getCaretOffset(el));
  }, [editorRef]);
  return { caret, syncCaret, setCaret };
}

export function useSuggested(value: string, caret: number, suggestions: string[]): Suggested {
  return useMemo(() => suggestFor(value, caret, suggestions), [value, caret, suggestions]);
}

/**
 * The completion itself, laid over the editor.
 *
 * It draws the whole line — the typed part invisible, the completion greyed —
 * so the browser's own text layout puts the grey text exactly where the caret
 * is. Measuring the typed text and offsetting by hand is the usual way to do
 * this, and it is wrong by a fraction of a pixel per character.
 *
 * Every box-model value is passed in by the caller rather than guessed, since
 * the two hosts size their editors differently; a ghost one pixel out of step
 * with the real text reads as a rendering fault.
 */
export function GhostText({ value, ghost, style }: {
  value: string;
  ghost: string;
  style: React.CSSProperties;
}) {
  if (!ghost) return null;
  return (
    <div
      aria-hidden
      data-dui-ghost
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        whiteSpace: 'pre',
        overflow: 'hidden',
        boxSizing: 'border-box',
        // Matches the editor's own border so the first character lines up; a
        // transparent border is the only way to keep the box models identical.
        border: '1px solid transparent',
        ...style,
      }}
    >
      {/* Present for its width alone — the real text is already on screen. */}
      <span style={{ visibility: 'hidden' }}>{value}</span>
      <span style={{ color: 'var(--color-text-muted)', opacity: 0.85 }}>{ghost}</span>
    </div>
  );
}

/** Tab, or Right at the end of the line — the two keys that mean "take it". */
export function isAcceptGhostKey(e: React.KeyboardEvent): boolean {
  if (e.key === 'Tab' && !e.shiftKey) return true;
  // The ghost only ever exists with the caret at the end, so Right cannot be
  // asking to move within the text.
  return e.key === 'ArrowRight';
}
