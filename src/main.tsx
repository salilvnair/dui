import { createRoot } from 'react-dom/client';
import { lazy, Suspense } from 'react';
import './index.css';
import 'highlight.js/styles/github-dark.css';
import { loadMonaco } from './showcase/monaco';

/* Start Monaco downloading now, and render without waiting for it. Importing
   it statically here put 4.2 MB in front of the first component anybody saw,
   including the readers who never open a code panel. Nothing mounts an editor
   until the shared readiness gate flips, so there is no CDN race. */
loadMonaco();

const DuiShowcase = lazy(() =>
  import('./showcase/DuiShowcase').then(m => ({ default: m.DuiShowcase }))
);

createRoot(document.getElementById('root')!).render(
  <Suspense fallback={<div style={{ padding: 20, color: 'var(--color-text-muted)', fontSize: 12 }}>Loading…</div>}>
    <DuiShowcase />
  </Suspense>
);
