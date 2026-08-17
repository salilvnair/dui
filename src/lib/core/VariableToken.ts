/** Shared `{{var}}` / `${var}` token highlighting — used by any contentEditable-based
 * text field that needs to color variable references inline (HighlightedInputView,
 * SelectTextInputView). Single source of truth so the token pattern and DOM caret
 * math never drift between call sites. */

export const TOKEN_RE = /(\{\{[\w.\-]+\}\}|\$\{[\w.\-]+\})/g;
export const ESCAPE_RE = /(\$daakia_\{[\w.\-]+\}_\$)/g;

export function buildHighlightedHTML(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(ESCAPE_RE, '<span class="dui-var-token--escape">$1</span>')
    .replace(TOKEN_RE, '<span class="dui-var-token">$1</span>');
}

export function getCaretOffset(el: HTMLElement): number {
  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0) return 0;
  const range = sel.getRangeAt(0);
  const pre = range.cloneRange();
  pre.selectNodeContents(el);
  pre.setEnd(range.endContainer, range.endOffset);
  return pre.toString().length;
}

// ── Undo / redo ──────────────────────────────────────────────────────────────
//
// These fields repaint the token chips by reassigning `innerHTML` on every input event.
// That wipes the browser's native undo stack: Cmd+Z then replays a DOM state that no
// longer matches the text, producing corrupted results (typing `{{baseUrl}}/test`,
// deleting back to `{{base`, then undoing yielded `{{base/test` — the `}}` never
// returned). Since we destroyed the native history, we have to keep our own.

export interface EditableHistoryEntry {
  text: string;
  caret: number;
}

export interface EditableHistory {
  reset(text: string, caret: number): void;
  push(text: string, caret: number): void;
  undo(): EditableHistoryEntry | null;
  redo(): EditableHistoryEntry | null;
}

/** Coalesce window (ms): consecutive single-character edits inside this window collapse
 *  into one history entry, so undo steps back by a word-ish chunk rather than one letter
 *  at a time — matching what a native input does. */
const COALESCE_MS = 400;
const MAX_ENTRIES = 200;

export function createEditableHistory(): EditableHistory {
  let stack: EditableHistoryEntry[] = [];
  let index = -1;
  let lastPushAt = 0;

  return {
    reset(text, caret) {
      stack = [{ text, caret }];
      index = 0;
      lastPushAt = 0;
    },
    push(text, caret) {
      if (index >= 0 && stack[index].text === text) {
        stack[index] = { text, caret };
        return;
      }
      // Any new edit invalidates the redo tail.
      if (index < stack.length - 1) stack = stack.slice(0, index + 1);

      const now = Date.now();
      const singleCharEdit = index >= 0 && Math.abs(text.length - stack[index].text.length) === 1;
      if (index > 0 && singleCharEdit && now - lastPushAt < COALESCE_MS) {
        stack[index] = { text, caret };
      } else {
        stack.push({ text, caret });
        index = stack.length - 1;
        if (stack.length > MAX_ENTRIES) { stack.shift(); index--; }
      }
      lastPushAt = now;
    },
    undo() {
      if (index <= 0) return null;
      index -= 1;
      lastPushAt = 0;   // never coalesce across an undo
      return stack[index];
    },
    redo() {
      if (index >= stack.length - 1) return null;
      index += 1;
      lastPushAt = 0;
      return stack[index];
    },
  };
}

/** True for Cmd/Ctrl+Z. */
export function isUndoKey(e: { key: string; metaKey: boolean; ctrlKey: boolean; shiftKey: boolean }): boolean {
  return (e.metaKey || e.ctrlKey) && !e.shiftKey && e.key.toLowerCase() === 'z';
}

/** True for Cmd/Ctrl+Shift+Z and Ctrl+Y. */
export function isRedoKey(e: { key: string; metaKey: boolean; ctrlKey: boolean; shiftKey: boolean }): boolean {
  const k = e.key.toLowerCase();
  return ((e.metaKey || e.ctrlKey) && e.shiftKey && k === 'z') || (e.ctrlKey && !e.metaKey && k === 'y');
}

export function setCaretOffset(el: HTMLElement, offset: number): void {
  const sel = window.getSelection();
  if (!sel) return;
  const range = document.createRange();
  let remaining = offset;
  const walk = (node: Node): boolean => {
    if (node.nodeType === Node.TEXT_NODE) {
      const len = node.textContent?.length ?? 0;
      if (remaining <= len) { range.setStart(node, remaining); range.collapse(true); return true; }
      remaining -= len;
      return false;
    }
    for (const child of Array.from(node.childNodes)) { if (walk(child)) return true; }
    return false;
  };
  if (!walk(el)) { range.selectNodeContents(el); range.collapse(false); }
  sel.removeAllRanges();
  sel.addRange(range);
}
