/**
 * The title card — a typed name, a tagline, and the badges under it.
 *
 * Rendered as a real page in the Playwright browser rather than through
 * ffmpeg's drawtext, because drawtext needs a libfreetype build that is not
 * reliably there, and a real page gets the animation for free.
 *
 * ── Three things this gets right, having got them wrong first ──
 *
 * 1. It reads as typing. A CSS width animation with steps(n) divides the width
 *    into n equal slices, and no proportional font has equal letters — a D is
 *    nearly three times an i. The edge lands mid-letter and it looks like a
 *    wipe with a cursor parked on the end. Nothing in CSS knows where one
 *    letter stops; the script at the bottom does, because it appends them.
 *
 * 2. Only the right edge moves. A centred reveal pushes the whole word outward
 *    from the middle, which reads as a zoom rather than a keyboard. The box is
 *    fixed at the finished width, measured from a hidden clone, with the text
 *    left-aligned inside it.
 *
 * 3. The finished card is actually on screen. `introAnimationSec` measures the
 *    animation so `holdSec` can be a hold rather than a hope.
 *
 * Editing note: the markup below is a template literal, so a backtick anywhere
 * inside it — a CSS comment included — ends the string.
 */

/** Per badge, so the row is not six grey pills. */
const BADGE_COLORS = {
  'React 19':      '#61dafb',
  'TypeScript':    '#3178c6',
  'Tailwind v4':   '#38bdf8',
  'Themeable':     '#a78bfa',
  'Monaco':        '#2ad4a8',
  'Tree-shakeable':'#fbbf24',
  'Zero lock-in':  '#fb923c',
  'MIT':           '#34d399',
};

/** How long a keystroke takes. Five a second reads as typing; eleven does not. */
const PER_CHAR = 0.2;
const TYPE_START = 0.35;

/** When the badges begin, relative to page load. */
const BADGES_AT = 2.45;
const BADGE_STAGGER = 0.07;
const BADGE_FADE = 0.5;

function badgeHtml(name, i) {
  const color = BADGE_COLORS[name] || '#8a93a3';
  const at = (BADGES_AT + i * BADGE_STAGGER).toFixed(2);
  return `<span class="badge" style="color:${color};animation-delay:${at}s">${name}</span>`;
}

/** How long the whole animation runs, so the caller can hold the end of it. */
export function introAnimationSec(badgeCount) {
  return BADGES_AT + Math.max(0, badgeCount - 1) * BADGE_STAGGER + BADGE_FADE;
}

export function buildIntroHtml({ title, tagline, badges, accentColor = '#7c8cff', width = 1440, height = 900 }) {
  const taglineAt = (TYPE_START + title.length * PER_CHAR + 0.15).toFixed(2);

  return `<!doctype html>
<html><head><meta charset="utf-8"><style>
  html, body {
    margin: 0; padding: 0; width: ${width}px; height: ${height}px;
    background: radial-gradient(circle at 50% 45%, #15171d 0%, #0a0b0d 70%);
    display: flex; align-items: center; justify-content: center;
    font-family: -apple-system, "SF Pro Display", "Segoe UI", Helvetica, Arial, sans-serif;
    overflow: hidden;
  }
  .stage { text-align: center; }

  /* Fixed at the finished width, text left-aligned inside it, so the first
     letter starts where it ends up and only the right edge moves. */
  .title {
    width: calc(var(--brand-w, 400px) + 16px);
    margin: 0 auto;
    text-align: left;
    white-space: nowrap;
  }
  .brand { font-size: 132px; font-weight: 800; letter-spacing: 4px; color: #ffffff; }
  .caret {
    display: inline-block; width: 6px; height: 100px;
    background: ${accentColor};
    vertical-align: -10px; margin-left: 6px;
    animation: blink 0.75s step-end infinite;
  }
  @keyframes blink { 50% { opacity: 0; } }

  .tagline {
    margin-top: 26px; font-size: 27px; font-weight: 400; color: #8a93a3;
    opacity: 0; animation: fadeUp 0.6s ease-out ${taglineAt}s forwards;
  }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

  .badges { margin-top: 44px; display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
  .badge {
    font-size: 13px; font-weight: 700; padding: 7px 16px; border-radius: 999px;
    border: 1px solid currentColor; background: color-mix(in srgb, currentColor 12%, transparent);
    opacity: 0; animation: fadeUp ${BADGE_FADE}s ease-out forwards;
  }
</style></head>
<body>
  <div class="stage">
    <div class="title"><span class="brand" id="brand"></span><span class="caret"></span></div>
    <div class="tagline">${tagline}</div>
    <div class="badges">${badges.map(badgeHtml).join('\n      ')}</div>
  </div>
  <script>
    (function () {
      var text = ${JSON.stringify(title)};
      var brand = document.getElementById('brand');

      // Reserve the finished width from a hidden clone first, so the word does
      // not drift sideways as it grows.
      var ghost = brand.cloneNode(false);
      ghost.textContent = text;
      ghost.style.cssText = 'position:absolute;visibility:hidden;white-space:nowrap';
      document.body.appendChild(ghost);
      document.documentElement.style.setProperty(
        '--brand-w', Math.ceil(ghost.getBoundingClientRect().width) + 'px');
      ghost.remove();

      var i = 0;
      function tick() {
        brand.textContent = text.slice(0, ++i);
        if (i < text.length) setTimeout(tick, ${Math.round(PER_CHAR * 1000)});
      }
      setTimeout(tick, ${Math.round(TYPE_START * 1000)});
    })();
  </script>
</body></html>`;
}
