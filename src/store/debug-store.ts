// Stub — debug store is daakia-specific.
interface DebugState {
  navigateLine: number | null;
  setNavigateLine: (line: number | null) => void;
  active: boolean;
  status: 'idle' | 'running' | 'paused';
  variables: { name: string; value: unknown; type: string }[];
}

const state: DebugState = {
  navigateLine: null,
  setNavigateLine: () => {},
  active: false,
  status: 'idle',
  variables: [],
};

export function useDebugStore<T>(selector: (s: DebugState) => T): T {
  return selector(state);
}
useDebugStore.getState = () => state;
