import { useSyncExternalStore, type ComponentType } from 'react';

/**
 * Shared registry NetworkGraphView reads from — same Monaco-style pattern as
 * monaco-runtime.ts. The main package entry never references 'vis-network' or
 * 'vis-data' (a bundler resolving the always-loaded entry point would then
 * require them installed for every consumer, defeating "optional"). Instead
 * '@salilvnair/dui/vis-setup' — a separate subpath only reached when a
 * consumer explicitly imports it — statically imports the real vis-network
 * implementation and registers it here. NetworkGraphView falls back to a
 * lightweight static rendering until something has registered.
 */
type VisRuntimeStatus = 'idle' | 'ready' | 'unavailable';

let status: VisRuntimeStatus = 'idle';
let networkGraphImpl: ComponentType<any> | null = null;
const listeners = new Set<() => void>();

function notify() {
  for (const l of listeners) l();
}

export function getVisRuntimeStatus(): VisRuntimeStatus {
  return status;
}

export function registerNetworkGraphImpl(impl: ComponentType<any>) {
  networkGraphImpl = impl;
}

export function getNetworkGraphImpl(): ComponentType<any> | null {
  return networkGraphImpl;
}

export function markVisReady() {
  status = 'ready';
  notify();
}

export function markVisUnavailable() {
  status = 'unavailable';
  notify();
}

export function useVisRuntimeStatus(): VisRuntimeStatus {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    getVisRuntimeStatus,
    getVisRuntimeStatus,
  );
}
