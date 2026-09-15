import { DocSection, PropTable, FeatureGrid } from '../../../shared/DocComponents';

export function SetupOptionViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'One card per route to getting installed', color: 'var(--color-primary)' },
          { label: 'Command block built in', color: 'var(--color-success)' },
          { label: 'recommended marks the one to take', color: 'var(--color-info)' },
          { label: 'Action slot for a link or a button', color: 'var(--color-warning)' },
        ]} />
      </DocSection>

      <DocSection
        title="Overview"
        description="The card in a setup screen offering one of several ways to install something — winget, Homebrew, apt, or signing in through a browser. Stacked, they turn a wall of platform-specific instructions into a list you pick from."
      >
        <></>
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'title', type: 'string', required: true, description: 'The route name — winget, Homebrew, Sign in with a browser.' },
          { name: 'tag', type: 'string', description: 'A short marker beside the title: recommended, apt, needs admin.' },
          { name: 'recommended', type: 'boolean', description: 'Marks this as the one to take.' },
          { name: 'command', type: 'string', description: 'The command, rendered as a copyable block.' },
          { name: 'language', type: 'string', default: "'shell'", description: 'Language for the command block.' },
          { name: 'note', type: 'ReactNode', description: 'Why you would pick this route, or what it will ask you for.' },
          { name: 'action', type: 'ReactNode', description: 'A control in the header: a link out, a picker, a button.' },
          { name: 'children', type: 'ReactNode', description: 'Anything further below the command.' },
          { name: 'accentColor', type: 'string', description: 'Tints the recommended marker.' },
          { name: 'className', type: 'string', description: 'Additional classes.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline styles.' },
        ]} />
      </DocSection>
    </div>
  );
}
