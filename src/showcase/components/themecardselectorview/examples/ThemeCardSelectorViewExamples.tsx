import { useState } from 'react';
import { ThemeCardSelectorView } from '@/dui';
import type { ThemeOption } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

const THEMES: ThemeOption[] = [
  {
    value: 'dark',
    label: 'Dark',
    description: 'Easy on the eyes',
    preview: { bg: '#1e1e2e', panel: '#313244', accent: '#89b4fa', text: '#cdd6f4' },
  },
  {
    value: 'light',
    label: 'Light',
    description: 'Crisp and clean',
    preview: { bg: '#eff1f5', panel: '#dce0e8', accent: '#1e66f5', text: '#4c4f69' },
  },
  {
    value: 'high-contrast',
    label: 'Hi-Contrast',
    description: 'Maximum legibility',
    preview: { bg: '#000000', panel: '#1a1a1a', accent: '#ffffff', text: '#ffffff' },
  },
  {
    value: 'monokai',
    label: 'Monokai',
    description: 'Timeless classic',
    preview: { bg: '#272822', panel: '#3e3d32', accent: '#a6e22e', text: '#f8f8f2' },
  },
];

const PROTOCOL_COLORS: ThemeOption[] = [
  {
    value: 'rest',
    label: 'REST',
    preview: { bg: '#1a1a2e', panel: '#16213e', accent: '#4fc3f7', text: '#e0e0e0' },
  },
  {
    value: 'graphql',
    label: 'GraphQL',
    preview: { bg: '#1a1a2e', panel: '#16213e', accent: '#e10098', text: '#e0e0e0' },
  },
  {
    value: 'websocket',
    label: 'WebSocket',
    preview: { bg: '#1a2e1a', panel: '#163e16', accent: '#66bb6a', text: '#e0e0e0' },
  },
  {
    value: 'grpc',
    label: 'gRPC',
    preview: { bg: '#2e1a2e', panel: '#3e163e', accent: '#ab47bc', text: '#e0e0e0' },
  },
];

const FONTS: ThemeOption[] = [
  { value: 'system', label: 'System UI', description: 'OS default' },
  { value: 'inter', label: 'Inter', description: 'Clean & modern' },
  { value: 'fira', label: 'Fira Code', description: 'Ligatures + mono' },
  { value: 'jetbrains', label: 'JetBrains', description: 'Developer friendly' },
];

const LAYOUTS: ThemeOption[] = [
  { value: 'default', label: 'Default', description: 'Sidebar + main' },
  { value: 'compact', label: 'Compact', description: 'Minimal padding' },
  { value: 'minimal', label: 'Minimal', description: 'No chrome' },
];

export function ThemeCardSelectorViewExamples() {
  const [theme, setTheme] = useState('dark');
  const [protocol, setProtocol] = useState('rest');
  const [font, setFont] = useState('inter');
  const [layout, setLayout] = useState('default');

  return (
    <div>
      <ExampleCard
        title="Theme Picker"
        description="Dark / Light / High Contrast / Monokai with color preview swatches"
        code={`<ThemeCardSelectorView options={THEMES} value={theme} onChange={setTheme} />`}
      >
        <ThemeCardSelectorView options={THEMES} value={theme} onChange={setTheme} />
      </ExampleCard>

      <ExampleCard
        title="Protocol Color Scheme Picker"
        description="Choose a protocol accent color for the editor"
        code={`<ThemeCardSelectorView options={PROTOCOL_COLORS} value={protocol} onChange={setProtocol} />`}
      >
        <ThemeCardSelectorView options={PROTOCOL_COLORS} value={protocol} onChange={setProtocol} />
      </ExampleCard>

      <ExampleCard
        title="Font Family Picker"
        description="Select editor font family (no preview swatch needed)"
        code={`<ThemeCardSelectorView options={FONTS} value={font} onChange={setFont} />`}
      >
        <ThemeCardSelectorView options={FONTS} value={font} onChange={setFont} />
      </ExampleCard>

      <ExampleCard
        title="Layout Selector"
        description="Default / Compact / Minimal layout variants"
        code={`<ThemeCardSelectorView options={LAYOUTS} value={layout} onChange={setLayout} />`}
      >
        <ThemeCardSelectorView options={LAYOUTS} value={layout} onChange={setLayout} />
      </ExampleCard>
    </div>
  );
}
