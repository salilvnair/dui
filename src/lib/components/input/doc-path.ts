/**
 * The path to whatever the cursor is sitting on.
 *
 * Reading a value out of a response and then writing the expression that
 * selects it is a transcription job: you can see `id` on screen and still have
 * to count array indices and retype four ancestor names to say where it lives.
 * Right-click, and the editor says it.
 *
 * ── Why a scanner rather than a parse ──
 *
 * `JSON.parse` gives a tree with no offsets, so it cannot answer "which node is
 * at character 4,812". It also refuses the case this is most useful in: a body
 * being edited is malformed for as long as you are typing it, and a feature
 * that stops working while you type is one you stop reaching for. A scanner
 * tracks the enclosing stack as it goes and can answer from wherever it got to,
 * whether or not the rest of the document is well formed.
 */

/** A brace-and-bracket frame. `key` is the member currently being read. */
interface JsonFrame {
  kind: 'object' | 'array';
  key?: string;
  index: number;
}

/** Reads a JSON string literal starting at the opening quote. */
function readString(text: string, start: number): { value: string; end: number } {
  let out = '';
  let i = start + 1;
  while (i < text.length) {
    const c = text[i];
    if (c === '\\') {
      // Only the escapes that can appear inside a key matter for the path; the
      // rest are copied through, because an unrecognised escape in a value
      // must not desynchronise the scan.
      const n = text[i + 1];
      out += n === 'n' ? '\n' : n === 't' ? '\t' : n === 'r' ? '\r'
        : n === 'u' ? String.fromCharCode(parseInt(text.slice(i + 2, i + 6), 16) || 0)
          : n ?? '';
      i += n === 'u' ? 6 : 2;
      continue;
    }
    if (c === '"') return { value: out, end: i };
    out += c;
    i++;
  }
  // Unterminated — the document is mid-edit. Treat the rest as the string.
  return { value: out, end: text.length };
}

/** A key that is a plain identifier reads better as `.name` than `["name"]`. */
const BARE = /^[A-Za-z_$][A-Za-z0-9_$]*$/;

function renderJson(stack: JsonFrame[]): string {
  let out = '$';
  for (const f of stack) {
    if (f.kind === 'array') {
      out += `[${f.index}]`;
    } else if (f.key !== undefined) {
      out += BARE.test(f.key) ? `.${f.key}` : `[${JSON.stringify(f.key)}]`;
    }
  }
  return out;
}

/**
 * The JSONPath of the value at `offset`, in the `$.a.b[0].c` dialect every
 * JSONPath implementation accepts.
 *
 * On a key, the path names that key — asking for the path of `"total"` and
 * getting its parent's path back would be the wrong answer to the obvious
 * question.
 */
export function jsonPathAt(text: string, offset: number): string | undefined {
  const stack = jsonStackAt(text, offset);
  return stack && renderJson(stack);
}

/**
 * Every level from the root down to the cursor.
 *
 * The innermost path is the one usually wanted and not the one always wanted:
 * standing on `id` you may want the object that holds it, or the array, or the
 * collection above that — and each is a different assertion to write. Offering
 * the whole chain costs one submenu and saves re-deriving an ancestor by hand.
 */
export function jsonPathLevels(text: string, offset: number): string[] {
  const stack = jsonStackAt(text, offset);
  if (!stack) return [];
  const out: string[] = [];
  for (let i = 0; i <= stack.length; i++) {
    const path = renderJson(stack.slice(0, i));
    // A frame contributes nothing until its key is read — between a brace and
    // the first key, say — and a level identical to its parent is not a level.
    if (path !== out[out.length - 1]) out.push(path);
  }
  return out;
}

function jsonStackAt(text: string, offset: number): JsonFrame[] | undefined {
  if (!text) return undefined;
  const at = Math.max(0, Math.min(offset, text.length));
  const stack: JsonFrame[] = [];
  let i = 0;

  while (i < text.length) {
    if (i >= at) break;
    const c = text[i]!;

    if (c === '"') {
      const { value, end } = readString(text, i);
      const top = stack[stack.length - 1];
      // A string followed by a colon is a key, not a value.
      let j = end + 1;
      while (j < text.length && /\s/.test(text[j]!)) j++;
      if (text[j] === ':' && top?.kind === 'object') top.key = value;
      // The cursor inside this token means the answer is the stack as it
      // stands, with the key above already applied if it was one.
      if (at <= end) return stack;
      i = end + 1;
      continue;
    }

    if (c === '{') { stack.push({ kind: 'object', index: 0 }); i++; continue; }
    if (c === '[') { stack.push({ kind: 'array', index: 0 }); i++; continue; }
    if (c === '}' || c === ']') { stack.pop(); i++; continue; }
    if (c === ',') {
      const top = stack[stack.length - 1];
      if (top?.kind === 'array') top.index++;
      // A new member has no key until its key is read; carrying the previous
      // one would name the wrong field for anything between the comma and it.
      else if (top) top.key = undefined;
      i++;
      continue;
    }
    i++;
  }

  return stack;
}

// ── XML ─────────────────────────────────────────────────────────────────────

interface XmlFrame {
  name: string;
  /** How many of each child name have been opened under this element. */
  counts: Map<string, number>;
  /** This element's position among its same-named siblings, 1-based. */
  index: number;
}

/**
 * Emitted only past the first, which is what every browser's "Copy XPath"
 * does: `/a/b` and `/a/b[1]` select the same node, and the index is noise
 * until there is a second one to tell apart.
 */
function renderXml(stack: XmlFrame[]): string {
  return stack.map(f => (f.index > 1 ? `/${f.name}[${f.index}]` : `/${f.name}`)).join('');
}

/** Skips a construct that carries no element, returning the index past it. */
function skipTo(text: string, from: number, close: string): number {
  const end = text.indexOf(close, from);
  return end === -1 ? text.length : end + close.length;
}

/**
 * The XPath of the element containing `offset`.
 *
 * Attributes and text nodes resolve to their element rather than to
 * `/a/b/@id` or `/a/b/text()`: the element is what the path is nearly always
 * wanted for, and a path that sometimes ends in an attribute is one you have
 * to check before pasting.
 */
export function xPathAt(text: string, offset: number): string | undefined {
  const stack = xmlStackAt(text, offset);
  return stack?.length ? renderXml(stack) : undefined;
}

/**
 * Every enclosing element, outermost first.
 *
 * The same reason as JSON, and more often wanted: an XPath is usually written
 * against a container — `/order/items` — rather than against the leaf you
 * happened to right-click.
 */
export function xPathLevels(text: string, offset: number): string[] {
  const stack = xmlStackAt(text, offset) ?? [];
  return stack.map((_, i) => renderXml(stack.slice(0, i + 1)));
}

function xmlStackAt(text: string, offset: number): XmlFrame[] | undefined {
  if (!text) return undefined;
  const at = Math.max(0, Math.min(offset, text.length));
  const stack: XmlFrame[] = [];
  /*
    Root-level siblings need somewhere to be counted.

    A well-formed document has one root, but a fragment — which is what half of
    a body being edited is — can have several, and they still have to be told
    apart. Local to the call: as module state it would carry counts from the
    last document into this one and index the first root as [2].
  */
  const rootCounts = new Map<string, number>();
  let i = 0;

  while (i < text.length && i < at) {
    if (text[i] !== '<') { i++; continue; }

    // Declarations, comments and CDATA hold no elements, and CDATA in
    // particular may contain '<' that would otherwise read as a tag.
    if (text.startsWith('<!--', i)) { i = skipTo(text, i, '-->'); continue; }
    if (text.startsWith('<![CDATA[', i)) { i = skipTo(text, i, ']]>'); continue; }
    if (text.startsWith('<?', i)) { i = skipTo(text, i, '?>'); continue; }
    if (text.startsWith('<!', i)) { i = skipTo(text, i, '>'); continue; }

    const close = text.indexOf('>', i);
    if (close === -1) break;                       // a tag being typed
    const inner = text.slice(i + 1, close);

    if (inner.startsWith('/')) {
      // A closing tag containing the cursor still belongs to its element, so
      // the path is reported before the pop.
      if (at <= close) return stack;
      stack.pop();
      i = close + 1;
      continue;
    }

    const name = inner.match(/^[^\s/>]+/)?.[0];
    if (!name) { i = close + 1; continue; }

    const parent = stack[stack.length - 1];
    const counts = parent ? parent.counts : rootCounts;
    const index = (counts.get(name) ?? 0) + 1;
    counts.set(name, index);

    const selfClosing = inner.endsWith('/');
    stack.push({ name, counts: new Map(), index });

    // The cursor inside the opening tag — on the name or an attribute — is on
    // this element, which has just been pushed.
    if (at <= close) return stack;
    if (selfClosing) stack.pop();
    i = close + 1;
  }

  return stack;
}
