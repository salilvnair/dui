import { useVisRuntimeStatus, getNetworkGraphImpl } from '../../vis-runtime';
import { NetworkGraphViewFallback } from './NetworkGraphView.fallback';

export interface NetworkGraphNode {
  id: string;
  label: string;
  /** Community/cluster id — drives default coloring when colorBy is omitted */
  communityId?: number;
  /** Explicit color override, takes priority over colorBy/communityId */
  color?: string;
}

export interface NetworkGraphEdge {
  id?: string | number;
  source: string;
  target: string;
  type?: string;
}

export interface NetworkGraphViewProps {
  nodes: NetworkGraphNode[];
  edges: NetworkGraphEdge[];
  onNodeClick?: (node: NetworkGraphNode) => void;
  selectedId?: string | null;
  /** Overrides the communityId-based default palette */
  colorBy?: (node: NetworkGraphNode) => string;
  /** Overrides the degree-based default sizing (10–40px) */
  sizeBy?: (node: NetworkGraphNode, degree: number, maxDegree: number) => number;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Force-directed graph (forceAtlas2Based physics, degree-sized nodes,
 * click-to-select, external-selection focus/pan). Requires the consumer to
 * install 'vis-network' + 'vis-data' and import '@salilvnair/dui/vis-setup'
 * once at app startup — see the vis-network peerDependenciesMeta entry.
 * Renders a static placeholder (NetworkGraphViewFallback) until that setup
 * import registers the real implementation.
 */
export function NetworkGraphView(props: NetworkGraphViewProps) {
  useVisRuntimeStatus();
  const Impl = getNetworkGraphImpl();
  if (!Impl) return <NetworkGraphViewFallback className={props.className} style={props.style} />;
  return <Impl {...props} />;
}
