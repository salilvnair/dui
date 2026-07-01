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

// `?worker&inline` is Vite's own import-suffix convention for bundling a
// module as an inline Web Worker — not a real subpath monaco-editor ships
// types for. Only the consuming bundler (Vite) needs to understand the
// suffix at build time; TypeScript just needs to know the import resolves
// to a Worker constructor.
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
