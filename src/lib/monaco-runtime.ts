import { useSyncExternalStore, type ComponentType } from 'react';

/**
 * Shared registry Monaco-backed components register into.
 *
 * The main package entry never references '@monaco-editor/react' or
 * 'monaco-editor' — not even via lazy()/dynamic import, since bundlers still
 * resolve every module reachable from an always-loaded entry point regardless
 * of runtime conditionals (verified empirically; a computed dynamic-import
 * specifier avoids that resolution but then can't be turned into a loadable
 * chunk URL either, and fails at runtime with "Failed to resolve module
 * specifier" in the browser).
 *
 * Instead, '@salilvnair/dui/monaco-setup' — a separate subpath only reached
 * when a consumer explicitly imports it — statically imports the real
 * Monaco-backed implementations (safe: importing that subpath is already an
 * explicit opt-in requiring Monaco to be installed) and registers them here.
 * EditorView/DiffEditorView read from this registry and fall back to their
 * lightweight implementation until something has registered.
 */
type MonacoRuntimeStatus = 'idle' | 'ready' | 'unavailable';

let status: MonacoRuntimeStatus = 'idle';
let editorImpl: ComponentType<any> | null = null;
let diffEditorImpl: ComponentType<any> | null = null;
const listeners = new Set<() => void>();

function notify() {
  for (const l of listeners) l();
}

export function getMonacoRuntimeStatus(): MonacoRuntimeStatus {
  return status;
}

export function registerMonacoEditorImpl(impl: ComponentType<any>) {
  editorImpl = impl;
}

export function registerMonacoDiffEditorImpl(impl: ComponentType<any>) {
  diffEditorImpl = impl;
}

export function getMonacoEditorImpl(): ComponentType<any> | null {
  return editorImpl;
}

export function getMonacoDiffEditorImpl(): ComponentType<any> | null {
  return diffEditorImpl;
}

export function markMonacoReady() {
  status = 'ready';
  notify();
}

export function markMonacoUnavailable() {
  status = 'unavailable';
  notify();
}

export function useMonacoRuntimeStatus(): MonacoRuntimeStatus {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    getMonacoRuntimeStatus,
    getMonacoRuntimeStatus,
  );
}
