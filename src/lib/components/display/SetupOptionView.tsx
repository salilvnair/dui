import type { ReactNode, CSSProperties } from 'react';
import { CodeBlockView } from './CodeBlockView';

export interface SetupOptionViewProps {
  /** The route's name — `winget`, `Homebrew`, `Sign in with a browser`. */
  title: string;
  /** A short marker beside the title: `recommended`, `apt`, `needs admin`. */
  tag?: string;
  /**
   * Lift it as the one to pick.
   *
   * Exactly one option in a set should carry this. A screen where every card is
   * highlighted has no recommendation on it, only decoration.
   */
  recommended?: boolean;
  /**
   * The command to run, shown with a copy button — never a button that runs it.
   *
   * Installing software and authenticating are the reader's actions. A one-click
   * "do it for me" here would be running an installer, or driving a credential
   * flow, on somebody's behalf.
   */
  command?: string;
  /** The language for the command block. Shell by default. */
  language?: string;
  /**
   * What a reader needs in order to choose THIS one over the one beside it —
   * not what the command does, which the command already says.
   */
  note?: ReactNode;
  /** A control in the header: a link out, a picker, a button. */
  action?: ReactNode;
  /**
   * The route's own controls, where a command is not the thing to show — a
   * field to type into, a list to choose from.
   *
   * Sits where the command would, so a set of cards mixing the two still lines
   * up: name, the thing you interact with, then the one line about when to
   * pick it.
   */
  children?: ReactNode;
  accentColor?: string;
  className?: string;
  style?: CSSProperties;
}

/**
 * One way to get something set up, among several.
 *
 * The shape every install or sign-in screen converges on: a name, the exact
 * thing to run, and one line on when to pick it. Fixing that order in a
 * component keeps a grid of routes scannable — a reader compares the same part
 * of each card rather than re-reading whole paragraphs to find the command.
 *
 * The card never performs the route itself. It shows what to run and lets the
 * reader run it, which is the only honest arrangement for actions that install
 * software or reach a credential store.
 */
export function SetupOptionView({
  title,
  tag,
  recommended = false,
  command,
  language = 'bash',
  note,
  action,
  children,
  accentColor = 'var(--color-primary)',
  className = '',
  style,
}: SetupOptionViewProps) {
  return (
    <div
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        padding: 12,
        borderRadius: 12,
        border: `1px solid ${recommended
          ? `color-mix(in srgb, ${accentColor} 50%, transparent)`
          : 'var(--color-surface-border)'}`,
        background: recommended
          ? `color-mix(in srgb, ${accentColor} 7%, transparent)`
          : 'var(--color-surface)',
        ...style,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 11.5, fontWeight: 600, color: 'var(--color-text-primary)' }}>
          {title}
        </span>
        {tag && (
          <span style={{
            fontSize: 8.5,
            fontWeight: 700,
            letterSpacing: '.06em',
            textTransform: 'uppercase',
            padding: '2px 6px',
            borderRadius: 4,
            whiteSpace: 'nowrap',
            color: accentColor,
            background: `color-mix(in srgb, ${accentColor} 16%, transparent)`,
          }}>
            {tag}
          </span>
        )}
        <span style={{ flex: 1 }} />
        {action}
      </div>

      {command && (
        <CodeBlockView
          code={command}
          language={language}
          fill
          showCopyButton
          accentColor={accentColor}
        />
      )}

      {children}

      {note && (
        <div style={{ fontSize: 10, lineHeight: 1.55, color: 'var(--color-text-muted)' }}>
          {note}
        </div>
      )}
    </div>
  );
}
