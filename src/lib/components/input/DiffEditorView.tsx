import { useMonacoRuntimeStatus, getMonacoDiffEditorImpl } from '../../monaco-runtime';
import { DiffEditorViewFallback } from './DiffEditorView.fallback';

export interface DiffEditorViewProps {
  original: string;
  modified: string;
  language?: string;
  height?: number | string;
  readOnly?: boolean;
  renderSideBySide?: boolean;
  wordWrap?: boolean;
  fontSize?: number;
  theme?: string;
  onMount?: (editor: any, monaco: any) => void;
}

/**
 * DUI's diff editor. Same optionality contract as EditorView: Monaco-backed
 * once the consumer installs the Monaco packages and imports
 * '@salilvnair/dui/monaco-setup'; a plain-text line diff otherwise.
 */
export function DiffEditorView(props: DiffEditorViewProps) {
  const monacoStatus = useMonacoRuntimeStatus();
  const MonacoDiffEditorView = monacoStatus === 'ready' ? getMonacoDiffEditorImpl() : null;

  if (MonacoDiffEditorView) return <MonacoDiffEditorView {...props} />;
  return <DiffEditorViewFallback {...props} />;
}
