import { useLayoutEffect, useRef, type CSSProperties } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { useDisplayBase } from '../../core/DisplayBase';
import './DiffMorphView.css';

export interface DiffMorphViewProps {
  text: string;
  size?: DuiSize;
  className?: string;
  style?: CSSProperties;
}

interface Token { key: string; word: string; kind: 'same' | 'added' | 'removed'; }

/** Word-level LCS diff — cheap O(n*m) table, fine for prose-length strings. */
function diffWords(a: string[], b: string[]): Token[] {
  const m = a.length, n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = m - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      dp[i][j] = a[i] === b[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
    }
  }
  const tokens: Token[] = [];
  let i = 0, j = 0, k = 0;
  while (i < m && j < n) {
    if (a[i] === b[j]) { tokens.push({ key: `s${k++}`, word: a[i], kind: 'same' }); i++; j++; }
    else if (dp[i + 1][j] >= dp[i][j + 1]) { tokens.push({ key: `r${k++}`, word: a[i], kind: 'removed' }); i++; }
    else { tokens.push({ key: `a${k++}`, word: b[j], kind: 'added' }); j++; }
  }
  while (i < m) tokens.push({ key: `r${k++}`, word: a[i++], kind: 'removed' });
  while (j < n) tokens.push({ key: `a${k++}`, word: b[j++], kind: 'added' });
  return tokens;
}

/**
 * Old→new text isn't cross-faded — unchanged words FLIP-animate into their new
 * position while changed words fade/strike, so an edit visually "reflows".
 */
export function DiffMorphView({ text, size, className = '', style }: DiffMorphViewProps) {
  const base = useDisplayBase(size);
  const prevWordsRef = useRef<string[]>(text.split(/(\s+)/).filter(Boolean));
  const prevRectsRef = useRef<Map<string, DOMRect>>(new Map());
  const containerRef = useRef<HTMLDivElement>(null);
  const words = text.split(/(\s+)/).filter(Boolean);
  const tokens = diffWords(prevWordsRef.current, words);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const nodes = container.querySelectorAll<HTMLElement>('[data-diff-key]');
    nodes.forEach(node => {
      const key = node.dataset.diffKey!;
      const prevRect = prevRectsRef.current.get(key);
      const rect = node.getBoundingClientRect();
      if (prevRect) {
        const dx = prevRect.left - rect.left;
        const dy = prevRect.top - rect.top;
        if (dx || dy) {
          node.style.transition = 'none';
          node.style.transform = `translate(${dx}px, ${dy}px)`;
          requestAnimationFrame(() => {
            node.style.transition = '';
            node.style.transform = '';
          });
        }
      }
    });
    const newRects = new Map<string, DOMRect>();
    nodes.forEach(node => newRects.set(node.dataset.diffKey!, node.getBoundingClientRect()));
    prevRectsRef.current = newRects;
    prevWordsRef.current = words.filter((_, idx) => tokens[idx]?.kind !== 'removed');
  }, [text]);

  return (
    <div ref={containerRef} className={className} style={{ fontSize: base.fontSize, color: 'var(--color-text-primary)', lineHeight: 1.6, ...style }}>
      {tokens.map(t => (
        /^\s+$/.test(t.word) ? (
          <span key={t.key} data-diff-key={t.key} style={{ whiteSpace: 'pre' }}>{t.word}</span>
        ) : (
          <span
            key={t.key}
            data-diff-key={t.key}
            className={`dui_diffmorph__token ${t.kind !== 'same' ? `dui_diffmorph__token--${t.kind}` : ''}`}
          >
            {t.word}
          </span>
        )
      ))}
    </div>
  );
}
