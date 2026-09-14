declare module 'monaco-editor/esm/vs/language/typescript/monaco.contribution' {
  import type * as monaco from 'monaco-editor';

  interface LanguageServiceDefaults {
    setCompilerOptions(options: any): void;
    setDiagnosticsOptions(options: any): void;
    setEagerModelSync(value: boolean): void;
    addExtraLib(content: string, filePath?: string): { dispose(): void };
  }

  export const javascriptDefaults: LanguageServiceDefaults;
  export const typescriptDefaults: LanguageServiceDefaults;
  export const ScriptTarget: {
    ES2020: number;
    ESNext: number;
    Latest: number;
  };
  export const ModuleKind: {
    ESNext: number;
    CommonJS: number;
  };
  export const ModuleResolutionKind: {
    NodeJs: number;
  };
  export const JsxEmit: {
    React: number;
    ReactJSX: number;
  };
  export function getJavaScriptWorker(): Promise<(...uris: any[]) => Promise<any>>;
  export function getTypeScriptWorker(): Promise<(...uris: any[]) => Promise<any>>;
}

// `?worker` and `?worker&inline` are Vite's own import-suffix conventions for
// building a module as a Web Worker — not real subpaths monaco-editor ships
// types for. Only the consuming bundler (Vite) needs to understand the suffix
// at build time; TypeScript just needs to know the import resolves to a Worker
// constructor.
//
// Both forms are declared because the two are a deliberate pair: `&inline`
// builds the worker into the bundle as a blob, which is the only thing that
// works inside a VS Code webview's CSP, and plain `?worker` emits it as a file
// the browser fetches, which is what any ordinary web page should do. See
// monaco-setup.ts and showcase/monacoSetup.ts.
declare module 'monaco-editor/esm/vs/editor/editor.worker?worker&inline' {
  const WorkerFactory: new () => Worker;
  export default WorkerFactory;
}
declare module 'monaco-editor/esm/vs/language/json/json.worker?worker&inline' {
  const WorkerFactory: new () => Worker;
  export default WorkerFactory;
}
declare module 'monaco-editor/esm/vs/language/html/html.worker?worker&inline' {
  const WorkerFactory: new () => Worker;
  export default WorkerFactory;
}
declare module 'monaco-editor/esm/vs/language/typescript/ts.worker?worker&inline' {
  const WorkerFactory: new () => Worker;
  export default WorkerFactory;
}

declare module 'monaco-editor/esm/vs/editor/editor.worker?worker' {
  const WorkerFactory: new () => Worker;
  export default WorkerFactory;
}
declare module 'monaco-editor/esm/vs/language/json/json.worker?worker' {
  const WorkerFactory: new () => Worker;
  export default WorkerFactory;
}
declare module 'monaco-editor/esm/vs/language/html/html.worker?worker' {
  const WorkerFactory: new () => Worker;
  export default WorkerFactory;
}
declare module 'monaco-editor/esm/vs/language/typescript/ts.worker?worker' {
  const WorkerFactory: new () => Worker;
  export default WorkerFactory;
}
