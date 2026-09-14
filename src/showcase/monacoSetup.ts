/**
 * Monaco for the showcase — the same setup, with workers that are fetched
 * rather than inlined.
 *
 * The published `@salilvnair/dui/monaco-setup` builds Monaco's four workers
 * into the bundle as blobs, because a consumer inside a VS Code webview cannot
 * fetch a worker script past the CSP. The showcase is an ordinary page on the
 * open web and has no such problem, and importing the published entry made it
 * pay for one anyway: `ts.worker` is the entire TypeScript compiler, and
 * base64-inlining it plus the other three put roughly nine megabytes into the
 * one chunk that must arrive before the app renders a single component.
 *
 * Dropping `&inline` makes Vite emit them as separate files that the browser
 * fetches when an editor first mounts. Same editor, same IntelliSense, same
 * themes — the bytes simply stop blocking the first paint, and a reader who
 * never opens a code panel never downloads them at all.
 *
 * Everything that is not worker delivery comes from the shared core, so the
 * showcase and the published entry cannot drift apart.
 */
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';

(window as any).MonacoEnvironment = {
  getWorker(_: string, label: string) {
    if (label === 'json') return new jsonWorker();
    if (label === 'html' || label === 'handlebars' || label === 'razor') return new htmlWorker();
    if (label === 'typescript' || label === 'javascript') return new tsWorker();
    return new editorWorker();
  },
};

export * from '@/monaco-setup.core';
