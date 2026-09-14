/**
 * The showcase's address bar.
 *
 * Every panel used to be reachable only by clicking it, which is fine for a
 * person and useless for everything else: the screenshot run cannot click its
 * way through two hundred and thirty-eight components reliably, the demo video
 * cannot jump to the one screen a segment is about, and neither the README nor
 * the site can link to `ChipView` — only to "the showcase, then find it".
 *
 * So the selection lives in the URL:
 *
 *     #/chips                  the ChipView panel, as it opens
 *     #/chips/docs             …with the Docs tab up
 *     #/chips?theme=light      …on the light ground
 *
 * The tab and the theme are deliberately part of the address rather than
 * remembered state: a capture asks for exactly one frame, and has to be able
 * to say which one without first putting the app into the right mood.
 *
 * And one address is not a page at all:
 *
 *     #/chips?capture=1        the component alone, no chrome around it
 *
 * which is what the catalog images are photographs of, and what the site
 * embeds one component at a time.
 */

export type ShowcaseTabId = 'live' | 'examples' | 'docs';
export type ShowcaseTheme = 'light' | 'dark' | 'system';

export interface ShowcaseRoute {
  category: string | null;
  tab: ShowcaseTabId;
  theme: ShowcaseTheme | null;
  /** Draw the component and nothing else — no header, sidebar or tab bar. */
  capture: boolean;
}

const TABS: ShowcaseTabId[] = ['live', 'examples', 'docs'];
const THEMES: ShowcaseTheme[] = ['light', 'dark', 'system'];

const EMPTY: ShowcaseRoute = { category: null, tab: 'live', theme: null, capture: false };

/** `#/chips/docs?theme=light` → the three things it says. */
export function parseHash(hash: string): ShowcaseRoute {
  const raw = (hash || '').replace(/^#/, '');
  if (!raw || raw === '/') return EMPTY;

  const [pathPart, queryPart] = raw.split('?');
  const segments = pathPart.split('/').filter(Boolean);
  if (!segments.length) return EMPTY;

  const category = decodeURIComponent(segments[0]);
  /* An unknown second segment is a typo, not a tab — fall back rather than
     showing an empty pane the reader cannot explain. */
  const maybeTab = segments[1] as ShowcaseTabId | undefined;
  const tab = maybeTab && TABS.includes(maybeTab) ? maybeTab : 'live';

  let theme: ShowcaseTheme | null = null;
  let capture = false;
  if (queryPart) {
    const query = new URLSearchParams(queryPart);
    const asked = query.get('theme') as ShowcaseTheme | null;
    if (asked && THEMES.includes(asked)) theme = asked;
    capture = query.get('capture') === '1';
  }

  return { category, tab, theme, capture };
}

/**
 * The address for a state.
 *
 * Defaults are left out — `#/chips` rather than `#/chips/live?theme=dark` — so
 * the URL a reader copies out of the bar is the short one, and so that flipping
 * to a non-default and back leaves no residue behind in the history.
 */
export function formatHash(route: {
  category: string;
  tab?: ShowcaseTabId;
  theme?: ShowcaseTheme | null;
  capture?: boolean;
}): string {
  const tab = route.tab && route.tab !== 'live' ? `/${route.tab}` : '';
  const query = new URLSearchParams();
  if (route.theme) query.set('theme', route.theme);
  if (route.capture) query.set('capture', '1');
  const search = query.toString();
  return `#/${encodeURIComponent(route.category)}${tab}${search ? `?${search}` : ''}`;
}
