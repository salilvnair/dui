/**
 * Opt-in setup for NetworkGraphView — import this once at app startup after
 * installing 'vis-network' + 'vis-data' (both peerDependenciesMeta.optional):
 *
 *   import '@salilvnair/dui/vis-setup';
 *
 * Registers the real vis-network-backed implementation; NetworkGraphView
 * renders a static fallback until this has run.
 */
import { registerNetworkGraphImpl, markVisReady } from './lib/vis-runtime';
import { NetworkGraphViewImpl } from './lib/components/display/NetworkGraphView.vis';

registerNetworkGraphImpl(NetworkGraphViewImpl);
markVisReady();
