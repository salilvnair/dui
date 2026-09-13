/**
 * HTML back to Markdown.
 *
 * The rich view is a `contenteditable` rendering of the Markdown document, so
 * every edit has to come back the other way. This is the half where fidelity is
 * lost if it is lost at all, which is why it is written out rather than pulled
 * in: a dependency here is a dependency whose idea of "close enough" you inherit.
 *
 * It handles exactly what the toolbar can produce and what `marked` renders from
 * the Markdown it is given: headings, paragraphs, bold, italic, strikethrough,
 * inline and block code, links, images, bullet, ordered and task lists,
 * blockquotes, tables and rules. Anything else — raw HTML somebody pasted — is
 * reduced to its text, because silently emitting HTML into a Markdown document
 * makes the next round trip worse, not better.
 */

/**
 * Characters that would otherwise turn plain text into markup.
 *
 * Escaped only where they would ACTUALLY be markup, which is narrower than
 * "at the start of a line" and the difference matters.
 *
 * CommonMark needs a space after the marker: `# Title` is a heading, `#14` is
 * the text `#14`. Escaping the second produced `\#14`, which renders as `#14`
 * and so looked right — while GitHub quietly stopped linking it to issue 14. A
 * reference typed into a comment box arrived dead on github.com and dead in
 * dkgh, for a heading nobody was writing.
 *
 * Same rule for the list markers: `- item` is a bullet, `-5` is a number.
 * `>` is the exception — a blockquote needs no space, so it always escapes.
 */
export function escapeText(text: string): string {
  return text
    .replace(/([\\`*_[\]])/g, '\\$1')
    // A heading is one to six hashes followed by a space, or nothing at all.
    .replace(/^(\s*)(#{1,6})(?=\s|$)/gm, '$1\\$2')
    // A bullet is the marker followed by a space.
    .replace(/^(\s*)([+-])(?=\s)/gm, '$1\\$2')
    // A blockquote needs no space after it, so it is always markup.
    .replace(/^(\s*)(>)/gm, '$1\\$2')
    // An ordered list is digits, a dot, and a space.
    .replace(/^(\s*\d+)\. /gm, '$1\\. ');
}

function isBlock(node: Node): boolean {
  return node.nodeType === 1
    && /^(P|DIV|H[1-6]|UL|OL|LI|PRE|BLOCKQUOTE|TABLE|THEAD|TBODY|TR|HR|BR)$/
      .test((node as HTMLElement).tagName);
}

/** Inline runs — everything that stays on one line. */
function inline(node: Node): string {
  if (node.nodeType === 3) return escapeText(node.textContent ?? '');
  if (node.nodeType !== 1) return '';

  const el = node as HTMLElement;
  const kids = () => Array.from(el.childNodes).map(inline).join('');

  switch (el.tagName) {
    case 'BR': return '  \n';
    case 'STRONG': case 'B': {
      const body = kids().trim();
      return body ? `**${body}**` : '';
    }
    case 'EM': case 'I': {
      const body = kids().trim();
      return body ? `*${body}*` : '';
    }
    case 'S': case 'STRIKE': case 'DEL': {
      const body = kids().trim();
      return body ? `~~${body}~~` : '';
    }
    case 'CODE': {
      // Inside a <pre> the block handler owns it; alone it is inline code, and
      // its content is literal so it must not be escaped.
      const body = el.textContent ?? '';
      return body ? `\`${body.replace(/`/g, '\\`')}\`` : '';
    }
    case 'A': {
      const href = el.getAttribute('href') ?? '';
      const body = kids().trim() || href;
      return href ? `[${body}](${href})` : body;
    }
    case 'IMG': {
      const src = el.getAttribute('src') ?? '';
      const alt = el.getAttribute('alt') ?? '';
      return src ? `![${alt}](${src})` : '';
    }
    case 'INPUT':
      // The checkbox in a task item; the list handler reads it and emits the
      // marker itself, so it contributes nothing here.
      return '';
    default:
      return kids();
  }
}

function listItems(list: HTMLElement, ordered: boolean, depth: number): string {
  const pad = '  '.repeat(depth);
  const out: string[] = [];
  let index = 1;

  for (const li of Array.from(list.children)) {
    if (li.tagName !== 'LI') continue;

    const nested: string[] = [];
    const own: Node[] = [];
    for (const child of Array.from(li.childNodes)) {
      if (child.nodeType === 1 && /^(UL|OL)$/.test((child as HTMLElement).tagName)) {
        nested.push(listItems(child as HTMLElement, (child as HTMLElement).tagName === 'OL', depth + 1));
      } else {
        own.push(child);
      }
    }

    const box = li.querySelector(':scope > input[type="checkbox"]') as HTMLInputElement | null;
    const marker = ordered ? `${index++}. ` : '- ';
    const task = box ? (box.checked ? '[x] ' : '[ ] ') : '';
    const text = own.map(inline).join('').trim();

    out.push(`${pad}${marker}${task}${text}`);
    out.push(...nested);
  }
  return out.filter(Boolean).join('\n');
}

function table(el: HTMLElement): string {
  const rows = Array.from(el.querySelectorAll('tr'));
  if (rows.length === 0) return '';

  const cells = (tr: Element) =>
    Array.from(tr.children).map(td => inline(td).replace(/\|/g, '\\|').trim());

  const head = cells(rows[0]);
  const lines = [
    `| ${head.join(' | ')} |`,
    `| ${head.map(() => '---').join(' | ')} |`,
  ];
  for (const tr of rows.slice(1)) lines.push(`| ${cells(tr).join(' | ')} |`);
  return lines.join('\n');
}

function block(node: Node, depth = 0): string {
  if (node.nodeType === 3) {
    const text = node.textContent ?? '';
    return text.trim() ? escapeText(text.trim()) : '';
  }
  if (node.nodeType !== 1) return '';

  const el = node as HTMLElement;
  const children = () => Array.from(el.childNodes).map(n => block(n, depth)).filter(Boolean).join('\n\n');

  switch (el.tagName) {
    case 'H1': case 'H2': case 'H3': case 'H4': case 'H5': case 'H6': {
      const level = Number(el.tagName[1]);
      const body = inline(el).trim();
      return body ? `${'#'.repeat(level)} ${body}` : '';
    }
    case 'P': case 'DIV': {
      const body = Array.from(el.childNodes).some(isBlock) ? children() : inline(el).trim();
      return body;
    }
    case 'UL': return listItems(el, false, depth);
    case 'OL': return listItems(el, true, depth);
    case 'PRE': {
      // Literal: not escaped, and fenced rather than indented so a language can
      // be carried when one is known.
      const code = el.querySelector('code');
      const lang = code?.className.match(/language-([\w-]+)/)?.[1] ?? '';
      const body = (code ?? el).textContent ?? '';
      return `\`\`\`${lang}\n${body.replace(/\n$/, '')}\n\`\`\``;
    }
    case 'BLOCKQUOTE': {
      const inner = children();
      return inner.split('\n').map(l => (l ? `> ${l}` : '>')).join('\n');
    }
    case 'TABLE': return table(el);
    case 'HR': return '---';
    case 'BR': return '';
    default: {
      const body = Array.from(el.childNodes).some(isBlock) ? children() : inline(el).trim();
      return body;
    }
  }
}

/**
 * Turn a contenteditable's HTML into Markdown.
 *
 * Blank blocks are dropped and runs of blank lines collapsed to one, because a
 * contenteditable emits `<p><br></p>` freely and a document that grows two
 * blank lines every time you press Enter is not one anybody would keep using.
 */
export function htmlToMarkdown(html: string): string {
  if (!html.trim()) return '';

  const host = document.createElement('div');
  host.innerHTML = html;

  const parts = Array.from(host.childNodes).map(n => block(n)).filter(p => p.trim());
  return parts.join('\n\n').replace(/\n{3,}/g, '\n\n').trim();
}
