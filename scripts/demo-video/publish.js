#!/usr/bin/env node
/**
 * Move the finished video out of `.output/` and into `media/`, which is the
 * part of the repo the README points at.
 *
 *   npm run demo-video:publish
 *
 * Writes:
 *   media/dui-showcase.mp4        the whole walkthrough
 *   media/dui-showcase.gif        the short loop for the top of the README
 *   media/sections/<id>.gif       one per segment, for the paragraph it belongs to
 *
 * `.output/` is scratch — recording writes it, composing rewrites it, and it
 * is gitignored. Anything the README links to has to be committed, and
 * copying by hand is how a README ends up pointing at a video from two
 * releases ago. This is that copy, done the same way every time.
 *
 * ── On the section GIFs ──
 *
 * Narrower and shorter than the headline loop, because there are ten of them
 * and they sit *inside* the page rather than at the top of it: a reader
 * scrolling to "Theming" wants four seconds of a colour changing, not two
 * megabytes of it. GitHub stops rendering a GIF somewhere around ten
 * megabytes, and the budget is the whole page, not each image.
 *
 * The numbers below were tightened once the content pane started scrolling
 * properly: real scrolling is far more inter-frame change than a static panel,
 * GIF has no interframe compression worth the name, and the same ten clips
 * went from 4.9 MB to 11.1 MB without a line of the recipes changing. 640px at
 * 10fps brings the set back to about 8.8 MB, which is under the budget but not
 * comfortably — if more sections get GIFs, drop the width again rather than
 * adding to the page.
 */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '../..');
const OUT_DIR = path.join(HERE, '.output');
const REFINED_DIR = path.join(OUT_DIR, 'refined');
const MEDIA = path.join(ROOT, 'media');
const SECTIONS = path.join(MEDIA, 'sections');
const config = JSON.parse(fs.readFileSync(path.join(HERE, 'config.json'), 'utf8'));

const argv = process.argv.slice(2);
const flag = (name, fallback) => {
  const at = argv.indexOf(name);
  return at === -1 ? fallback : argv[at + 1];
};
const width = Number(flag('--width', 640));
const fps = Number(flag('--fps', 10));
const seconds = Number(flag('--seconds', 4.5));

const ffmpeg = (a) => execFileSync('ffmpeg', ['-y', '-loglevel', 'error', ...a], { stdio: ['ignore', 'ignore', 'inherit'] });
const mb = (f) => (fs.statSync(f).size / 1024 / 1024).toFixed(1);

/**
 * The segments that get their own GIF, and where in each one to start.
 *
 * Not every segment: the four-component tours read fine as a still and cost a
 * megabyte as a loop. These are the ones where the *motion* is the point —
 * something being typed, a colour being dragged, a ground being flipped.
 */
const SECTION_GIFS = [
  ['catalog', 1.0],
  ['playground', 1.4],
  ['theming', 0.6],
  ['themes', 1.2],
  ['data', 1.0],
  ['dashboards', 1.0],
  ['overlays', 0.8],
  ['motion', 1.0],
  ['editor', 0.8],
  ['docs', 0.8],
];

/** Two passes: a palette built from the whole clip, then the encode. */
function toGif(source, dest, { at = 0, secs = null, w = width } = {}) {
  const palette = path.join(OUT_DIR, 'palette.png');
  const chain = `fps=${fps},scale=${w}:-1:flags=lanczos`;
  const input = ['-ss', String(at), '-i', source, ...(secs ? ['-t', String(secs)] : [])];
  ffmpeg([...input, '-vf', `${chain},palettegen=stats_mode=diff`, palette]);
  ffmpeg([...input, '-i', palette, '-lavfi', `${chain}[x];[x][1:v]paletteuse=dither=bayer`, '-loop', '0', dest]);
  fs.unlinkSync(palette);
}

fs.mkdirSync(SECTIONS, { recursive: true });

/* ── The walkthrough ── */
const mp4 = path.join(OUT_DIR, `${config.output.name}.mp4`);
if (!fs.existsSync(mp4)) {
  console.error(`No ${path.relative(ROOT, mp4)} — run:  npm run demo-video`);
  process.exit(1);
}
const destMp4 = path.join(MEDIA, 'dui-showcase.mp4');
fs.copyFileSync(mp4, destMp4);
console.log(`  ${path.relative(ROOT, destMp4).padEnd(34)} ${mb(destMp4)} MB`);

/* ── The headline loop ── */
const highlights = path.join(OUT_DIR, `${config.output.name}_highlights.gif`);
if (fs.existsSync(highlights)) {
  const destGif = path.join(MEDIA, 'dui-showcase.gif');
  fs.copyFileSync(highlights, destGif);
  console.log(`  ${path.relative(ROOT, destGif).padEnd(34)} ${mb(destGif)} MB`);
} else {
  console.log('  (no highlights GIF yet — run: npm run demo-video:gif:short)');
}

/* ── One per section ── */
let total = 0;
for (const [id, at] of SECTION_GIFS) {
  const clip = path.join(REFINED_DIR, `${id}.mp4`);
  if (!fs.existsSync(clip)) {
    console.log(`  ${id}: no refined clip, skipped`);
    continue;
  }
  const dest = path.join(SECTIONS, `${id}.gif`);
  toGif(clip, dest, { at, secs: seconds });
  total += Number(mb(dest));
  console.log(`  ${path.relative(ROOT, dest).padEnd(34)} ${mb(dest)} MB`);
}

console.log(`\nSection GIFs total ${total.toFixed(1)} MB at ${width}px/${fps}fps.`);
