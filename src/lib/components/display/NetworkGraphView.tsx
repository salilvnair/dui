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
  /** Bump this (e.g. a counter incremented on each click) to re-fit the
   *  camera to show every node — the "reset zoom" affordance a host app
   *  shows after a selectedId focus has zoomed in. Ignored if unset;
   *  each change fits once, same one-shot-trigger pattern as selectedId. */
  fitTrigger?: number;
  /** Fires once the physics layout has fully settled (including the
   *  cluster-separation burst when enableClustering finds 2+ communities)
   *  and the camera has been positioned — the point at which the canvas
   *  looks intentional rather than mid-reflow. A host app can keep a
   *  skeleton/loading overlay on top of this component until onReady
   *  fires, instead of showing nodes and labels visibly settling into
   *  place. Fires on every mount/rebuild (new nodes/edges), not just once. */
  onReady?: () => void;
  /** Overrides the communityId-based default palette */
  colorBy?: (node: NetworkGraphNode) => string;
  /** Overrides the degree-based default sizing (10–40px) */
  sizeBy?: (node: NetworkGraphNode, degree: number, maxDegree: number) => number;
  className?: string;
  style?: React.CSSProperties;
  /** Auto-cluster nodes by communityId on load; double-click a cluster to expand it,
   *  double-click a leaf node to re-collapse its community. Off by default. */
  enableClustering?: boolean;
  /** Dim non-neighbor nodes/edges while hovering a node. Off by default. */
  enableHoverDim?: boolean;
  /** Small corner overview canvas with a draggable/clickable viewport rectangle. Off by default. */
  enableMinimap?: boolean;
  /** Drives cluster-label color/background so it stays legible in both
   *  themes — canvas can't resolve CSS variables, so the resolved theme
   *  name is passed in explicitly. Defaults to 'dark'. */
  theme?: 'dark' | 'light';
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
