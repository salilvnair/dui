/**
 * Self-host Monaco Editor — no CDN required.
 *
 * This is the published entry point: `import '@salilvnair/dui/monaco-setup'`.
 * Its behaviour has not changed. It wires Monaco's four web workers **inline**,
 * as blobs built into the bundle, so a consumer running inside a VS Code
 * webview — where the CSP forbids fetching a worker script over the network —
 * gets a working editor with no external requests at all.
 *
 * Everything else about self-hosting Monaco (the two themes, the TypeScript
 * language-service configuration, registering the real editor implementations)
 * lives in `./monaco-setup.core`, because none of it depends on how the
 * workers arrive. The showcase pairs that same core with ordinary fetched
 * workers instead — see `showcase/monacoSetup.ts` for why.
 *
 * ── On the cost, and who pays it ──
 *
 * Inlining is not free: `ts.worker` alone is close to seven megabytes, and
 * base64 makes it larger still. The library build never pays it, because
 * `vite.publish.config.ts` externalises everything matching `monaco-editor/`
 * — the `?worker&inline` query is a directive the *consumer's* bundler
 * honours, not something baked into `dist/`. So the choice stays where it
 * belongs: with the app doing the bundling.
 */
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker&inline';
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker&inline';
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker&inline';
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker&inline';

/* Set before the core is imported, though the ordering is not load-bearing:
   Monaco reads MonacoEnvironment when the first editor mounts, not when its
   module is evaluated. */
(window as any).MonacoEnvironment = {
  getWorker(_: string, label: string) {
    if (label === 'json') return new jsonWorker();
    if (label === 'html' || label === 'handlebars' || label === 'razor') return new htmlWorker();
    if (label === 'typescript' || label === 'javascript') return new tsWorker();
    return new editorWorker();
  },
};

export * from './monaco-setup.core';
