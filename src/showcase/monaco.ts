/**
 * Monaco, fetched in the background instead of blocking the first paint.
 *
 * `showcase/monacoSetup` pulls in `monaco-editor`, which is 4.2 MB — about
 * seventy per cent of everything the showcase used to download before it could
 * draw anything. Importing it statically from `main.tsx` meant nobody saw a
 * component until the whole editor had arrived, including the majority of
 * readers who never open a code panel at all.
 *
 * So the import is dynamic, and started immediately rather than on demand: the
 * download runs in parallel with the app's own chunks, and the app renders as
 * soon as it is ready without waiting for it.
 *
 * ── The one thing that must not race ──
 *
 * `@monaco-editor/react` lazy-loads Monaco from a public CDN unless
 * `loader.config({ monaco })` has run first. This package's whole position on
 * Monaco is that the CDN path must never be taken — it is unreachable under a
 * webview CSP, on an intranet, or offline — so "probably loaded by now" is not
 * good enough.
 *
 * Nothing here guesses. `monaco-setup.core` calls `loader.config({ monaco })`
 * and then `markMonacoReady()`, and every Monaco-backed component in the
 * library already waits on that same registry through `useMonacoRuntimeStatus`.
 * The playground now waits on it too. Until it flips, no editor mounts, so
 * there is no window in which one could reach for the CDN.
 */

let pending: Promise<typeof import('./monacoSetup')> | null = null;

/**
 * Start fetching Monaco, or return the fetch already in flight.
 *
 * Safe to call from anywhere, as often as you like — the promise is created
 * once and reused, which is also what stops two callers racing to evaluate the
 * module twice.
 */
export function loadMonaco() {
  if (!pending) {
    pending = import('./monacoSetup').then((mod) => {
      /* A flag for the screenshot and demo-video runs, which have to know the
         editor is real before they photograph a panel containing one — the
         components fall back to plain text until it is, and a catalog image of
         the fallback would be a picture of the wrong thing. */
      (window as unknown as Record<string, unknown>).__DUI_MONACO_READY__ = true;
      return mod;
    });
  }
  return pending;
}

/**
 * Re-theme any open editors, once there are any.
 *
 * The showcase sets its theme on mount and on every toggle, which is now
 * usually before Monaco has arrived. Those calls are not lost and not
 * discarded: each one is queued onto the load promise, so the last theme asked
 * for is applied the moment the module resolves.
 *
 * That queueing is doing real work. `monaco-setup.core` defines both themes but
 * never selects one — until this ran, the selection came from the showcase
 * calling `applyMonacoTheme` on mount, which worked only because the module was
 * already imported by then. Call it directly now and a light-mode reader would
 * get a dark editor.
 */
export function applyMonacoThemeWhenReady(theme: 'dark' | 'light') {
  loadMonaco()
    .then((mod) => mod.applyMonacoTheme(theme))
    /* A failed chunk means no editor, not a broken page — every component that
       uses one renders its plain-text fallback. */
    .catch(() => {});
}
