import { createRoot } from 'react-dom/client';
import { lazy, Suspense } from 'react';
import './index.css';
import 'highlight.js/styles/github-dark.css';
import './monaco-setup';

const DuiShowcase = lazy(() =>
  import('./showcase/DuiShowcase').then(m => ({ default: m.DuiShowcase }))
);

createRoot(document.getElementById('root')!).render(
  <Suspense fallback={<div style={{ padding: 20, color: 'var(--color-text-muted)', fontSize: 12 }}>Loading…</div>}>
    <DuiShowcase />
  </Suspense>
);
