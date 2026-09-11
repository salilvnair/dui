/**
 * A Markdown editor with two faces.
 *
 * ── One document, two views ──
 *
 * Markdown is the document. "Rich Text" is a `contenteditable` rendering of it
 * that writes back to Markdown on every edit; "Markdown" is the source. The
 * toggle that quietly drops your tables when you switch is what makes these
 * untrustworthy, so there is only ever one document here and the views are two
 * ways of looking at it.
 *
 * Round-tripping is where that promise is kept or broken, and it is kept for
 * exactly what the toolbar can produce: headings, bold, italic, strikethrough,
 * links, bullet and ordered lists, task lists, tables, inline and block code,
 * blockquotes, images and rules. Anything else the user types in Markdown
 * survives untouched *while in Markdown view* — editing it in Rich Text is what
 * would flatten it, which is why the view you are in is always on screen.
 *
 * ── Why not a WYSIWYG library ──
 *
 * ProseMirror or Lexical would each bring more code than the rest of DUI, and
 * a schema of their own to keep in step with Markdown. `marked` is already a
 * dependency for rendering; the reverse direction is a few hundred lines and is
 * the part worth owning, because it is where fidelity is lost.
 */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { marked } from 'marked';
import type { DuiSize } from '../../core/DuiTypes';
import { DUI_HEIGHT, DUI_FONT_SIZE } from '../../core/DuiTokens';
import { SelectInputView } from './SelectInputView';
import {
  BoldIcon, ItalicIcon, StrikethroughIcon, LinkIcon, ListIcon, OrderedListIcon,
  ChecklistIcon, DatabaseTableIcon, CodeIcon, ImageIcon, QuoteIcon, UndoIcon, RedoIcon,
} from '../../../icons';
import { htmlToMarkdown } from './markdown-serialise';
import './MarkdownEditorView.css';

export type MarkdownEditorMode = 'rich' | 'markdown';

export interface MarkdownEditorViewProps {
  value: string;
  onChange: (markdown: string) => void;
  /** Controlled view. Left uncontrolled, the editor keeps its own. */
  mode?: MarkdownEditorMode;
  onModeChange?: (mode: MarkdownEditorMode) => void;
  placeholder?: string;
  /** Hides the Rich Text / Markdown switch when the caller draws its own. */
  showModeToggle?: boolean;
  /** Extra controls in the toolbar's right-hand end — a Save button, say. */
  toolbarRight?: React.ReactNode;
  readOnly?: boolean;
  size?: DuiSize;
  accentColor?: string;
  className?: string;
  style?: CSSProperties;
}

const BLOCKS = [
  { value: 'p', label: 'Normal' },
  { value: 'h1', label: 'Heading 1' },
  { value: 'h2', label: 'Heading 2' },
  { value: 'h3', label: 'Heading 3' },
  { value: 'h4', label: 'Heading 4' },
  { value: 'h5', label: 'Heading 5' },
  { value: 'h6', label: 'Heading 6' },
];

/** Toolbar buttons, in the order they are drawn. */
const TOOLS = [
  { id: 'bold', Icon: BoldIcon, label: 'Bold', cmd: 'bold' },
  { id: 'italic', Icon: ItalicIcon, label: 'Italic', cmd: 'italic' },
  { id: 'strike', Icon: StrikethroughIcon, label: 'Strikethrough', cmd: 'strikeThrough' },
  { id: 'link', Icon: LinkIcon, label: 'Link', cmd: 'createLink' },
  { id: 'ul', Icon: ListIcon, label: 'Bullet list', cmd: 'insertUnorderedList' },
  { id: 'ol', Icon: OrderedListIcon, label: 'Numbered list', cmd: 'insertOrderedList' },
  { id: 'task', Icon: ChecklistIcon, label: 'Task list', cmd: 'daakia:task' },
  { id: 'table', Icon: DatabaseTableIcon, label: 'Table', cmd: 'daakia:table' },
  { id: 'code', Icon: CodeIcon, label: 'Code', cmd: 'daakia:code' },
  { id: 'image', Icon: ImageIcon, label: 'Image', cmd: 'daakia:image' },
  { id: 'quote', Icon: QuoteIcon, label: 'Quote', cmd: 'formatBlock:blockquote' },
  { id: 'undo', Icon: UndoIcon, label: 'Undo', cmd: 'undo' },
  { id: 'redo', Icon: RedoIcon, label: 'Redo', cmd: 'redo' },
] as const;

export function MarkdownEditorView({
  value,
  onChange,
  mode: modeProp,
  onModeChange,
  placeholder = 'Write something…',
  showModeToggle = true,
  toolbarRight,
  readOnly = false,
  size = 'sm',
  accentColor = 'var(--color-accent, var(--color-primary))',
  className = '',
  style,
}: MarkdownEditorViewProps) {
  const [ownMode, setOwnMode] = useState<MarkdownEditorMode>('rich');
  const mode = modeProp ?? ownMode;
  const setMode = (m: MarkdownEditorMode) => { onModeChange?.(m); if (!modeProp) setOwnMode(m); };

  const surface = useRef<HTMLDivElement>(null);
  const [block, setBlock] = useState('p');

  /* Which URL the toolbar is asking for, and where the caret was when it
     started asking — focusing the input collapses the selection, so it has to
     be put back before the command runs. */
  const [asking, setAsking] = useState<'link' | 'image' | null>(null);
  const [askValue, setAskValue] = useState('');
  const askRef = useRef<Range | null>(null);

  const applyAsk = () => {
    const url = askValue.trim();
    const kind = asking;
    setAsking(null);
    setAskValue('');
    if (!url || !kind) return;

    const el = surface.current;
    if (!el) return;
    el.focus();
    if (askRef.current) {
      const sel = window.getSelection();
      sel?.removeAllRanges();
      sel?.addRange(askRef.current);
    }
    if (kind === 'link') document.execCommand('createLink', false, url);
    else document.execCommand('insertHTML', false, `<img src="${escapeAttr(url)}" alt="" />`);
    emit();
  };

  /*
    The rendered HTML is only pushed into the surface when it differs from what
    the surface would itself produce. Writing it on every keystroke would move
    the caret to the start of the document on every character typed, which is
    the classic contenteditable bug.
  */
  const html = useMemo(() => {
    try {
      return marked.parse(value || '', { async: false, gfm: true, breaks: false }) as string;
    } catch {
      return '';
    }
  }, [value]);

  useEffect(() => {
    const el = surface.current;
    if (!el || mode !== 'rich') return;
    if (htmlToMarkdown(el.innerHTML).trim() === (value || '').trim()) return;
    el.innerHTML = html;
  }, [html, mode, value]);

  const emit = useCallback(() => {
    const el = surface.current;
    if (!el) return;
    onChange(htmlToMarkdown(el.innerHTML));
  }, [onChange]);

  /** What the caret is sitting in, so the block dropdown can say so. */
  const syncBlock = useCallback(() => {
    const sel = window.getSelection();
    let node = sel?.anchorNode as HTMLElement | null;
    while (node && node !== surface.current) {
      const tag = node.nodeName?.toLowerCase();
      if (tag && /^h[1-6]$|^p$/.test(tag)) { setBlock(tag); return; }
      node = node.parentElement;
    }
    setBlock('p');
  }, []);

  const run = (cmd: string) => {
    if (readOnly) return;
    const el = surface.current;
    if (!el) return;
    el.focus();

    if (cmd === 'createLink' || cmd === 'daakia:image') {
      /* A row in the toolbar, not window.prompt.
         Some hosts run this inside a sandboxed iframe with no `allow-modals`
         — a VS Code webview is one — where prompt() returns null without a
         word, and the button appears to do nothing. The selection is kept
         because asking for the URL steals focus from the surface. */
      const sel = window.getSelection();
      askRef.current = sel && sel.rangeCount ? sel.getRangeAt(0).cloneRange() : null;
      setAsking(cmd === 'createLink' ? 'link' : 'image');
      return;
    } else if (cmd === 'daakia:code') {
      /* A selection becomes inline code; an empty caret opens a fenced block,
         because those are the two things "code" means and guessing between
         them by context is worse than reading the selection. */
      const sel = window.getSelection();
      if (sel && !sel.isCollapsed) {
        document.execCommand('insertHTML', false, `<code>${escapeHtml(sel.toString())}</code>`);
      } else {
        document.execCommand('insertHTML', false, '<pre><code>code</code></pre><p><br></p>');
      }
    } else if (cmd === 'daakia:table') {
      document.execCommand('insertHTML', false, TABLE_SEED);
    } else if (cmd === 'daakia:task') {
      document.execCommand('insertHTML', false,
        '<ul data-task="1"><li><input type="checkbox" disabled /> item</li></ul><p><br></p>');
    } else if (cmd.startsWith('formatBlock:')) {
      document.execCommand('formatBlock', false, cmd.slice('formatBlock:'.length));
    } else {
      document.execCommand(cmd);
    }

    emit();
    syncBlock();
  };

  const disabled = readOnly;

  return (
    <div className={`dui_mde ${className}`} style={style}>
      <div className="dui_mde__toolbar">
        {mode === 'rich' && (
          <>
            <SelectInputView
              size={size}
              value={block}
              options={BLOCKS}
              accentColor={accentColor}
              disabled={disabled}
              onChange={next => { setBlock(next); run(`formatBlock:${next}`); }}
              style={{ minWidth: 108 }}
            />
            <span className="dui_mde__sep" />
            {TOOLS.map(t => (
              <button
                key={t.id}
                type="button"
                className="dui_mde__btn"
                title={t.label}
                aria-label={t.label}
                disabled={disabled}
                // mousedown, not click: click fires after the surface has lost
                // focus and the selection with it, so the command applies to
                // nothing.
                onMouseDown={e => { e.preventDefault(); run(t.cmd); }}
              >
                <t.Icon size={13} />
              </button>
            ))}
          </>
        )}

        <span className="dui_mde__spacer" />
        {toolbarRight}
        {showModeToggle && (
          /* A flat pair sharing one outline, not a pill with a filled thumb.
             This sits in a toolbar of quiet icon buttons and a segmented
             control shouted over all of them — it is a view switch, not the
             action on the screen. */
          /*
            Sized from the same token as everything beside it.

            It was hand-rolled at 3px/9.5px, which left it several pixels
            shorter than the size-driven controls on either side — the block
            select on its left, whatever `toolbarRight` puts on its right — and
            a toolbar whose controls are three different heights reads as
            broken rather than as quiet. `DUI_HEIGHT.tab` is the row this scale
            keeps for segmented controls.
          */
          <div
            className="dui_mde__modes"
            style={{ height: DUI_HEIGHT.tab[size] + 'px', fontSize: DUI_FONT_SIZE[size] }}
          >
            {(['rich', 'markdown'] as const).map(m => (
              <button
                key={m}
                type="button"
                className={mode === m ? 'on' : ''}
                style={mode === m
                  ? { color: accentColor, background: `color-mix(in srgb, ${accentColor} 16%, transparent)` }
                  : undefined}
                onClick={() => setMode(m)}
              >
                {m === 'rich' ? 'Rich Text' : 'Markdown'}
              </button>
            ))}
          </div>
        )}
      </div>

      {asking && (
        <div className="dui_mde__ask">
          <span>{asking === 'link' ? 'Link to' : 'Image URL'}</span>
          <input
            autoFocus
            value={askValue}
            placeholder={asking === 'link' ? 'https://example.com' : 'https://example.com/image.png'}
            onChange={e => setAskValue(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') { e.preventDefault(); applyAsk(); }
              if (e.key === 'Escape') { setAsking(null); setAskValue(''); }
            }}
          />
          <button type="button" style={{ color: accentColor }} onMouseDown={e => { e.preventDefault(); applyAsk(); }}>
            Apply
          </button>
          <button type="button" onMouseDown={e => { e.preventDefault(); setAsking(null); setAskValue(''); }}>
            Cancel
          </button>
        </div>
      )}

      {mode === 'rich' ? (
        <div
          ref={surface}
          className="dui_mde__surface"
          contentEditable={!readOnly}
          suppressContentEditableWarning
          data-placeholder={placeholder}
          onInput={emit}
          onBlur={emit}
          onKeyUp={syncBlock}
          onMouseUp={syncBlock}
        />
      ) : (
        <textarea
          className="dui_mde__source"
          value={value}
          placeholder={placeholder}
          readOnly={readOnly}
          spellCheck={false}
          onChange={e => onChange(e.target.value)}
        />
      )}
    </div>
  );
}

const TABLE_SEED =
  '<table><thead><tr><th>Column</th><th>Column</th></tr></thead>'
  + '<tbody><tr><td>value</td><td>value</td></tr></tbody></table><p><br></p>';

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
function escapeAttr(s: string): string {
  return s.replace(/"/g, '&quot;').replace(/</g, '&lt;');
}
