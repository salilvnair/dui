import { useState } from 'react';
import { ThemeToggleView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function ThemeToggleViewExamples() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const flip = () => setTheme(t => (t === 'dark' ? 'light' : 'dark'));

  return (
    <>
      <ExampleCard
        title="Sun and moon"
        description="One button that swaps its own glyph — the state is the icon"
        code={'<ThemeToggleView theme={theme} onToggle={flip} />'}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <ThemeToggleView theme={theme} onToggle={flip} />
          <span style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>currently {theme}</span>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Sizes"
        description="Uses the icon-button size scale"
        code={'<ThemeToggleView size="lg" … />'}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {(['sm', 'md', 'lg'] as const).map(s => (
            <ThemeToggleView key={s} size={s} theme={theme} onToggle={flip} />
          ))}
        </div>
      </ExampleCard>

      <ExampleCard
        title="Your own colours"
        description="The two glyphs are tinted separately, because a sun and a moon rarely want the same hue"
        code={'<ThemeToggleView sunColor="#f59e0b" moonColor="#a855f7" … />'}
      >
        <ThemeToggleView theme={theme} onToggle={flip} sunColor="#f59e0b" moonColor="#a855f7" />
      </ExampleCard>
    </>
  );
}
