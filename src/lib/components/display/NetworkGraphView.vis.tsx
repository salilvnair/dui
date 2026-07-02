import { useEffect, useRef } from 'react';
import { DataSet } from 'vis-data/peer';
import { Network } from 'vis-network/peer';
import type { Edge as VisEdge, Node as VisNode, Options } from 'vis-network/peer';
import type { NetworkGraphViewProps, NetworkGraphNode } from './NetworkGraphView';

const DEFAULT_PALETTE = [
  '#4E79A7', '#F28E2B', '#E15759', '#76B7B2', '#59A14F',
  '#EDC948', '#B07AA1', '#FF9DA7', '#9C755F', '#BAB0AC',
];

function defaultColor(n: NetworkGraphNode): string {
  if (n.color) return n.color;
  if (n.communityId != null) return DEFAULT_PALETTE[n.communityId % DEFAULT_PALETTE.length];
  return '#6B7280';
}

export function NetworkGraphViewImpl({
  nodes, edges, onNodeClick, selectedId, colorBy, sizeBy, className = '', style,
}: NetworkGraphViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const networkRef = useRef<Network | null>(null);
  const nodesById = useRef<Map<string, NetworkGraphNode>>(new Map());

  useEffect(() => {
    if (!containerRef.current) return;

    nodesById.current = new Map(nodes.map(n => [n.id, n]));

    const degree: Record<string, number> = {};
    edges.forEach(e => {
      degree[e.source] = (degree[e.source] ?? 0) + 1;
      degree[e.target] = (degree[e.target] ?? 0) + 1;
    });
    const maxDeg = Math.max(1, ...Object.values(degree));

    const visNodes: VisNode[] = nodes.map(n => {
      const color = colorBy ? colorBy(n) : defaultColor(n);
      const deg = degree[n.id] ?? 1;
      const size = sizeBy ? sizeBy(n, deg, maxDeg) : 10 + 30 * (deg / maxDeg);
      return {
        id: n.id,
        label: n.label,
        title: n.label,
        color: { background: color, border: color, highlight: { background: '#ffffff', border: color } },
        size: Math.round(size * 10) / 10,
        font: { size: deg >= maxDeg * 0.15 ? 12 : 0, color: '#ffffff' },
        shape: 'dot',
      };
    });

    const visEdges: VisEdge[] = edges.map((e, i) => ({
      id: e.id ?? i,
      from: e.source,
      to: e.target,
      title: e.type,
      color: { opacity: 0.5 },
      arrows: { to: { enabled: true, scaleFactor: 0.5 } },
    }));

    const options: Options = {
      physics: {
        enabled: true,
        solver: 'forceAtlas2Based',
        forceAtlas2Based: {
          gravitationalConstant: -60,
          centralGravity: 0.005,
          springLength: 120,
          springConstant: 0.08,
          damping: 0.4,
          avoidOverlap: 0.8,
        },
        stabilization: { iterations: 200, fit: true },
      },
      interaction: { hover: true, tooltipDelay: 100, hideEdgesOnDrag: true, navigationButtons: false },
      nodes: { shape: 'dot', borderWidth: 1.5 },
      edges: { smooth: { enabled: true, type: 'continuous', roundness: 0.2 }, selectionWidth: 3 },
    };

    const network = new Network(
      containerRef.current,
      { nodes: new DataSet(visNodes), edges: new DataSet(visEdges) },
      options,
    );
    networkRef.current = network;

    network.once('stabilizationIterationsDone', () => {
      network.setOptions({ physics: { enabled: false } });
    });

    network.on('click', (params) => {
      if (params.nodes.length > 0) {
        const n = nodesById.current.get(params.nodes[0]);
        if (n) onNodeClick?.(n);
      }
    });

    return () => {
      network.destroy();
      networkRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodes, edges]);

  useEffect(() => {
    const network = networkRef.current;
    if (!network || !selectedId) return;
    if (nodesById.current.has(selectedId)) {
      network.selectNodes([selectedId]);
      network.focus(selectedId, { scale: 1.4, animation: true });
    }
  }, [selectedId]);

  return <div ref={containerRef} className={className} style={{ width: '100%', height: '100%', ...style }} />;
}
