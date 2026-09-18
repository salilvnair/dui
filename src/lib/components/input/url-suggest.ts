/**
 * What to suggest for a URL field that is being EDITED, not just started.
 *
 * ── The bug ──
 *
 * Suggestions only ever appeared when the field was empty. Not by design: the
 * filter ran `suggestion.includes(wholeValue)`, and the whole value of a field
 * somebody is editing is almost never a substring of anything in history.
 *
 * Take `https://azp.prod.com/xyz/abc`, put the caret after `http` and delete
 * the `s`. The reader is clearly asking "what else starts like this?" — but
 * the filter went looking for a history entry containing the entire string,
 * tail and all, found none, and showed nothing. Clearing the field was the
 * only way to get a list back, which is how this looked like a rule.
 *
 * ── What it does instead ──
 *
 * It matches on the text BEFORE THE CARET and ignores the tail. That is the
 * part the reader has committed to; the tail is what they are in the middle
 * of replacing. Entries that start with it come first, entries that merely
 * contain it come after — a prefix match is what somebody typing a URL means,
 * and a substring match is still worth offering when nothing starts that way.
 */

export interface Suggested {
  /**
   * The completion to draw greyed after the caret, or '' when there is none.
   *
   * Only ever the tail of the FIRST prefix match, so accepting it can never
   * produce a URL that was not already in history.
   */
  ghost: string;
  /** What the dropdown lists, best match first. */
  matches: string[];
}

/** Does `text` carry `prefix`, ignoring case? Prefix beats substring. */
export function matchRank(text: string, prefix: string): 0 | 1 | -1 {
  const t = text.toLowerCase();
  if (t.startsWith(prefix)) return 0;
  if (t.includes(prefix)) return 1;
  return -1;
}

/** The text the reader has committed to: everything left of the caret. */
export function prefixAt(value: string, caret: number): string {
  return value.slice(0, Math.max(0, Math.min(caret, value.length)));
}

export function suggestFor(
  value: string,
  caret: number,
  suggestions: string[],
  limit = 8,
): Suggested {
  const pool = [...new Set(suggestions.filter(Boolean))];
  if (pool.length === 0) return { ghost: '', matches: [] };

  const prefix = prefixAt(value, caret);
  /* An empty field still lists recent URLs — that part was never broken. */
  if (!prefix.trim()) return { ghost: '', matches: pool.slice(0, limit) };

  const lower = prefix.toLowerCase();
  const starts: string[] = [];
  const contains: string[] = [];
  for (const s of pool) {
    if (s === value) continue; // Already typed in full; there is nothing to offer.
    const rank = matchRank(s, lower);
    if (rank === 0) starts.push(s);
    else if (rank === 1) contains.push(s);
  }

  return {
    ghost: ghostFor(value, caret, prefix, starts),
    matches: [...starts, ...contains].slice(0, limit),
  };
}

/**
 * The greyed completion, and the two cases that deliberately have none.
 *
 * Mid-string: the ghost is drawn by laying a copy of the text under the real
 * one and hiding the part that is already visible, so it can only sit at the
 * END of the line. With the caret in the middle it would appear past a tail
 * the reader can still see, reading as text that is already there.
 *
 * A value holding `{{var}}`: the editor draws that as a chip, and the
 * measuring copy draws it as plain text. The two are different widths, so the
 * ghost would land visibly off the caret. Misaligned ghost text is worse than
 * none — it looks like the field has a rendering bug.
 */
function ghostFor(value: string, caret: number, prefix: string, starts: string[]): string {
  if (caret !== value.length) return '';
  if (value.includes('{{')) return '';
  const best = starts[0];
  return best ? best.slice(prefix.length) : '';
}
