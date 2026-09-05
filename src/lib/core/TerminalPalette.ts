/**
 * Terminal palettes, for both grounds.
 *
 * The sixteen ANSI slots are a compatibility table, not a design. Left at
 * their defaults a shell renders `ls` in fluorescent green on pure blue, and
 * `LS_COLORS` leans on exactly those slots — which is why an ordinary listing
 * comes back looking like a 1988 BBS.
 *
 * ── What a palette owns, and what it does not ──
 *
 * It owns the sixteen colours and the FOREGROUND, because the two have to be
 * chosen together: a palette's plain text is the tone everything else is
 * contrasted against, and taking it from elsewhere gives you a bright white
 * body under muted syntax, which reads as unfinished.
 *
 * It does NOT own the background. The terminal should look like part of the
 * panel it sits in rather than a themed box dropped into it, so the ground
 * comes from the surface and these adapt to it.
 *
 * ── Why each has a light variant ──
 *
 * Because the same colours do not work on both. Tokyo Night's `#9ece6a` green
 * is legible on `#16161e` and nearly invisible on white; a light palette needs
 * darker, more saturated ink for the same contrast. Every entry here is the
 * published light counterpart of its dark one, not a mechanical darkening.
 */

export interface TerminalAnsi {
  foreground: string;
  black: string; red: string; green: string; yellow: string;
  blue: string; magenta: string; cyan: string; white: string;
  brightBlack: string; brightRed: string; brightGreen: string; brightYellow: string;
  brightBlue: string; brightMagenta: string; brightCyan: string; brightWhite: string;
  cursor: string;
  selectionBackground: string;
}

export interface TerminalPalette {
  id: string;
  label: string;
  /** The colour that stands for this palette in a picker. */
  swatch: string;
  dark: TerminalAnsi;
  light: TerminalAnsi;
}

/**
 * Six, in the order they suit reading a shell.
 *
 * All are palettes people already recognise from their own editors, which is
 * the point: a terminal in someone else's tool should be able to look like the
 * one they configured for themselves.
 */
export const TERMINAL_PALETTES: TerminalPalette[] = [
  {
    id: 'tokyo',
    label: 'Tokyo Night',
    swatch: '#7aa2f7',
    dark: {
      foreground: '#a9b1d6', cursor: '#7aa2f7',
      selectionBackground: 'rgba(122,162,247,.28)',
      black: '#32344a', red: '#f7768e', green: '#9ece6a', yellow: '#e0af68',
      blue: '#7aa2f7', magenta: '#ad8ee6', cyan: '#449dab', white: '#787c99',
      brightBlack: '#444b6a', brightRed: '#ff7a93', brightGreen: '#b9f27c',
      brightYellow: '#ff9e64', brightBlue: '#7da6ff', brightMagenta: '#bb9af7',
      brightCyan: '#0db9d7', brightWhite: '#acb0d0',
    },
    light: {
      foreground: '#343b58', cursor: '#34548a',
      selectionBackground: 'rgba(52,84,138,.20)',
      black: '#0f0f14', red: '#8c4351', green: '#485e30', yellow: '#8f5e15',
      blue: '#34548a', magenta: '#5a4a78', cyan: '#0f4b6e', white: '#343b58',
      brightBlack: '#9699a3', brightRed: '#8c4351', brightGreen: '#485e30',
      brightYellow: '#8f5e15', brightBlue: '#34548a', brightMagenta: '#5a4a78',
      brightCyan: '#0f4b6e', brightWhite: '#343b58',
    },
  },
  {
    id: 'catppuccin',
    label: 'Catppuccin',
    swatch: '#cba6f7',
    dark: {
      foreground: '#bac2de', cursor: '#f5e0dc',
      selectionBackground: 'rgba(203,166,247,.28)',
      black: '#45475a', red: '#f38ba8', green: '#a6e3a1', yellow: '#f9e2af',
      blue: '#89b4fa', magenta: '#f5c2e7', cyan: '#94e2d5', white: '#a6adc8',
      brightBlack: '#585b70', brightRed: '#f38ba8', brightGreen: '#a6e3a1',
      brightYellow: '#f9e2af', brightBlue: '#89b4fa', brightMagenta: '#f5c2e7',
      brightCyan: '#94e2d5', brightWhite: '#bac2de',
    },
    light: {
      foreground: '#4c4f69', cursor: '#dc8a78',
      selectionBackground: 'rgba(136,57,239,.18)',
      black: '#5c5f77', red: '#d20f39', green: '#40a02b', yellow: '#df8e1d',
      blue: '#1e66f5', magenta: '#ea76cb', cyan: '#179299', white: '#acb0be',
      brightBlack: '#6c6f85', brightRed: '#d20f39', brightGreen: '#40a02b',
      brightYellow: '#df8e1d', brightBlue: '#1e66f5', brightMagenta: '#ea76cb',
      brightCyan: '#179299', brightWhite: '#bcc0cc',
    },
  },
  {
    id: 'onedark',
    label: 'One Dark',
    swatch: '#61afef',
    dark: {
      foreground: '#abb2bf', cursor: '#528bff',
      selectionBackground: 'rgba(97,175,239,.26)',
      black: '#3f4451', red: '#e06c75', green: '#98c379', yellow: '#e5c07b',
      blue: '#61afef', magenta: '#c678dd', cyan: '#56b6c2', white: '#abb2bf',
      brightBlack: '#4f5666', brightRed: '#ff616e', brightGreen: '#a5e075',
      brightYellow: '#f0a45d', brightBlue: '#4dc4ff', brightMagenta: '#de73ff',
      brightCyan: '#4cd1e0', brightWhite: '#d7dae0',
    },
    light: {
      foreground: '#383a42', cursor: '#526fff',
      selectionBackground: 'rgba(82,111,255,.18)',
      black: '#383a42', red: '#e45649', green: '#50a14f', yellow: '#c18401',
      blue: '#4078f2', magenta: '#a626a4', cyan: '#0184bc', white: '#a0a1a7',
      brightBlack: '#4f525d', brightRed: '#e45649', brightGreen: '#50a14f',
      brightYellow: '#c18401', brightBlue: '#4078f2', brightMagenta: '#a626a4',
      brightCyan: '#0184bc', brightWhite: '#383a42',
    },
  },
  {
    id: 'nord',
    label: 'Nord',
    swatch: '#88c0d0',
    dark: {
      foreground: '#d8dee9', cursor: '#d8dee9',
      selectionBackground: 'rgba(136,192,208,.26)',
      black: '#3b4252', red: '#bf616a', green: '#a3be8c', yellow: '#ebcb8b',
      blue: '#81a1c1', magenta: '#b48ead', cyan: '#88c0d0', white: '#e5e9f0',
      brightBlack: '#4c566a', brightRed: '#bf616a', brightGreen: '#a3be8c',
      brightYellow: '#ebcb8b', brightBlue: '#81a1c1', brightMagenta: '#b48ead',
      brightCyan: '#8fbcbb', brightWhite: '#eceff4',
    },
    light: {
      foreground: '#2e3440', cursor: '#2e3440',
      selectionBackground: 'rgba(94,129,172,.18)',
      black: '#3b4252', red: '#99324b', green: '#4f894c', yellow: '#9a7500',
      blue: '#3b6ea8', magenta: '#97365b', cyan: '#398eac', white: '#d8dee9',
      brightBlack: '#4c566a', brightRed: '#99324b', brightGreen: '#4f894c',
      brightYellow: '#9a7500', brightBlue: '#3b6ea8', brightMagenta: '#97365b',
      brightCyan: '#398eac', brightWhite: '#2e3440',
    },
  },
  {
    id: 'gruvbox',
    label: 'Gruvbox',
    swatch: '#d79921',
    dark: {
      foreground: '#d5c4a1', cursor: '#ebdbb2',
      selectionBackground: 'rgba(215,153,33,.24)',
      black: '#3c3836', red: '#cc241d', green: '#98971a', yellow: '#d79921',
      blue: '#458588', magenta: '#b16286', cyan: '#689d6a', white: '#a89984',
      brightBlack: '#665c54', brightRed: '#fb4934', brightGreen: '#b8bb26',
      brightYellow: '#fabd2f', brightBlue: '#83a598', brightMagenta: '#d3869b',
      brightCyan: '#8ec07c', brightWhite: '#ebdbb2',
    },
    light: {
      foreground: '#3c3836', cursor: '#282828',
      selectionBackground: 'rgba(215,153,33,.20)',
      black: '#3c3836', red: '#9d0006', green: '#79740e', yellow: '#b57614',
      blue: '#076678', magenta: '#8f3f71', cyan: '#427b58', white: '#7c6f64',
      brightBlack: '#928374', brightRed: '#9d0006', brightGreen: '#79740e',
      brightYellow: '#b57614', brightBlue: '#076678', brightMagenta: '#8f3f71',
      brightCyan: '#427b58', brightWhite: '#3c3836',
    },
  },
  {
    id: 'solarized',
    label: 'Solarized',
    swatch: '#268bd2',
    dark: {
      foreground: '#93a1a1', cursor: '#93a1a1',
      selectionBackground: 'rgba(38,139,210,.26)',
      black: '#073642', red: '#dc322f', green: '#859900', yellow: '#b58900',
      blue: '#268bd2', magenta: '#d33682', cyan: '#2aa198', white: '#eee8d5',
      brightBlack: '#586e75', brightRed: '#cb4b16', brightGreen: '#586e75',
      brightYellow: '#657b83', brightBlue: '#839496', brightMagenta: '#6c71c4',
      brightCyan: '#93a1a1', brightWhite: '#fdf6e3',
    },
    light: {
      foreground: '#586e75', cursor: '#586e75',
      selectionBackground: 'rgba(38,139,210,.18)',
      black: '#073642', red: '#dc322f', green: '#859900', yellow: '#b58900',
      blue: '#268bd2', magenta: '#d33682', cyan: '#2aa198', white: '#eee8d5',
      brightBlack: '#002b36', brightRed: '#cb4b16', brightGreen: '#93a1a1',
      brightYellow: '#839496', brightBlue: '#657b83', brightMagenta: '#6c71c4',
      brightCyan: '#586e75', brightWhite: '#fdf6e3',
    },
  },
];

/**
 * A palette resolved for the ground it will sit on.
 *
 * The background is passed in rather than chosen: whoever owns the surface
 * knows what colour it is, and a terminal that picks its own would stop
 * matching the panel the moment the panel changed.
 */
export function resolveTerminalTheme(
  palette: TerminalPalette,
  mode: 'dark' | 'light',
  background: string,
): Record<string, string> {
  const ansi = mode === 'light' ? palette.light : palette.dark;
  return { ...ansi, background, cursorAccent: background };
}

/** Which variant a surface wants, from the colour of the surface itself. */
export function groundMode(background: string): 'dark' | 'light' {
  const m = /^#?([0-9a-f]{6})$/i.exec(background.trim());
  if (!m) return 'dark';
  const n = parseInt(m[1], 16);
  // Rec. 601 luma, which is the cheap standard for this and agrees with the
  // eye closely enough to pick one of two palettes.
  const luma = (0.299 * ((n >> 16) & 255) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255;
  return luma > 0.5 ? 'light' : 'dark';
}
