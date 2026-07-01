/**
 * useAppTheme — returns 'dark' | 'light' and re-renders on change.
 *
 * Detects theme from (in priority order):
 *   1. VS Code webview: data-vscode-theme-kind on <body> (set by VS Code host)
 *   2. Generic: data-theme on <html> (daakia / other web apps)
 *   3. Fallback: 'dark'
 */
import { useState, useEffect } from 'react';

function resolveTheme(): 'dark' | 'light' {
  const vsKind =
    document.body?.getAttribute('data-vscode-theme-kind') ||
    document.documentElement.getAttribute('data-vscode-theme-kind');
  if (vsKind) return vsKind === 'vscode-light' ? 'light' : 'dark';
  return (document.documentElement.getAttribute('data-theme') as 'dark' | 'light') || 'dark';
}

export function useAppTheme(): 'dark' | 'light' {
  const [theme, setTheme] = useState<'dark' | 'light'>(resolveTheme);

  useEffect(() => {
    const update = () => setTheme(resolveTheme());
    const htmlObs = new MutationObserver(update);
    htmlObs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme', 'data-vscode-theme-kind'] });
    const bodyObs = new MutationObserver(update);
    if (document.body) bodyObs.observe(document.body, { attributes: true, attributeFilter: ['data-vscode-theme-kind'] });
    return () => { htmlObs.disconnect(); bodyObs.disconnect(); };
  }, []);

  return theme;
}
