#!/usr/bin/env node
/**
 * The raw clips, stitched into the finished showcase.
 *
 *   node scripts/demo-video/compose.js
 *   node scripts/demo-video/compose.js --gif
 *
 * Each clip is trimmed to the window its recipe marked, given its camera move
 * (config.json's `effect`, via effects.js) and chained to the next with an
 * xfade. Always writes an mp4; `--gif` adds a GIF of the whole thing, though
 * `gif.js` is the better way to get one — GIF's 256-colour palette bands badly
 * on a crossfade, and a seven-minute GIF is forty megabytes nobody can put in
 * a README.
 */
import path from 'node:path';
import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { buildZoompanFilter } from './effects.js';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2).filter(a => a !== '--gif');
const makeGif = process.argv.includes('--gif');

const OUT_DIR = path.join(ROOT, '.output');
/*
  The recorder's snapshot in preference to config.json.

  `record.js` writes `config.snapshot.json` listing only the segments that
  actually produced a verified clip, each with the trim it measured for itself.
  Composing from it means a `--only` reshoot stitches what was recorded rather
  than failing on the eleven clips it was never asked to make. With no snapshot
  — someone composing by hand — config.json is still the source.
*/
const snapshot = path.join(OUT_DIR, 'config.snapshot.json');
const configPath = path.resolve(args[0] || (fs.existsSync(snapshot) ? snapshot : path.join(ROOT, 'config.json')));
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
if (configPath === snapshot) console.log('Composing the segments record.js verified.');

const RAW_DIR = path.join(OUT_DIR, 'raw');
const PROC_DIR = path.join(OUT_DIR, 'processed');
fs.mkdirSync(PROC_DIR, { recursive: true });

const ffmpeg = (a) => execFileSync('ffmpeg', ['-y', '-loglevel', 'error', ...a], { stdio: ['ignore', 'ignore', 'inherit'] });

function ffprobeDuration(file) {
  const out = execFileSync('ffprobe', [
    '-v', 'error', '-show_entries', 'format=duration', '-of', 'default=noprint_wrappers=1:nokey=1', file,
  ]).toString().trim();
  return parseFloat(out);
}

try {
  execFileSync('ffmpeg', ['-version'], { stdio: 'ignore' });
} catch {
  console.error('ffmpeg is not on PATH. Install it and re-run.');
  process.exit(1);
}

const { width, height, fps } = config.output;

/* The intro first and untrimmed, then each segment with the trim it recorded. */
const plan = [];
if (config.intro?.enabled && fs.existsSync(path.join(RAW_DIR, 'intro.webm'))) {
  plan.push({ id: 'intro', raw: path.join(RAW_DIR, 'intro.webm'), trimStartSec: 0, effect: config.intro.effect || 'static' });
}
for (const seg of config.segments) {
  plan.push({
    id: seg.id,
    raw: path.join(RAW_DIR, `${seg.id}.webm`),
    trimStartSec: seg.trimStartSec ?? 1.2,
    /* Where the recorder said the segment stopped being interesting. Absent on
       a clip whose driver never marked an end — keep the whole tail. */
    endAtSec: seg.endAtSec,
    effect: seg.effect || 'static',
  });
}

for (const clip of plan) {
  if (!fs.existsSync(clip.raw)) {
    throw new Error(
      `Missing clip for "${clip.id}".\n`
      + 'record.js keeps a clip only when its segment verified, so this segment was '
      + 'either never recorded or failed its check.\n'
      + `Re-record just it:  node scripts/demo-video/record.js --only ${clip.id}`,
    );
  }
}

console.log('Trimming and moving the camera...');
const processed = plan.map((clip, i) => {
  const rawDuration = ffprobeDuration(clip.raw);
  const endAt = typeof clip.endAtSec === 'number' ? Math.min(rawDuration, clip.endAtSec) : rawDuration;
  const duration = Math.max(0.5, endAt - clip.trimStartSec);
  const zoompan = buildZoompanFilter(clip.effect, Math.round(duration * fps), { width, height, fps });
  const outFile = path.join(PROC_DIR, `${String(i).padStart(2, '0')}_${clip.id}.mp4`);

  const ffArgs = ['-ss', String(clip.trimStartSec), '-i', clip.raw, '-t', String(duration)];
  if (zoompan) {
    /* zoompan renders at 2x working resolution — see effects.js for why — so
       it has to come back down here. */
    ffArgs.push('-vf', `${zoompan},scale=${width}:${height}:flags=lanczos`);
  } else {
    /* Even a static clip is normalised: xfade refuses inputs whose size or
       frame rate disagree, and a webm recorded under load does drift. */
    ffArgs.push('-vf', `scale=${width}:${height}:flags=lanczos,fps=${fps}`);
  }
  ffArgs.push('-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '18', outFile);
  ffmpeg(ffArgs);

  const outDuration = ffprobeDuration(outFile);
  console.log(`  ${clip.id.padEnd(16)} ${outDuration.toFixed(1)}s  ${typeof clip.effect === 'string' ? clip.effect : 'custom'}`);
  return { ...clip, outFile, duration: outDuration };
});

console.log('Chaining transitions...');
const transDur = config.transitions?.durationSec ?? 0.55;
const transType = config.transitions?.type ?? 'fade';

const filterParts = [];
let offset = processed[0].duration - transDur;
let running = processed[0].duration;
let lastLabel = '0:v';
for (let i = 1; i < processed.length; i++) {
  const outLabel = i === processed.length - 1 ? 'vout' : `vx${i}`;
  filterParts.push(`[${lastLabel}][${i}:v]xfade=transition=${transType}:duration=${transDur}:offset=${offset.toFixed(3)}[${outLabel}]`);
  running = running + processed[i].duration - transDur;
  offset = running - transDur;
  lastLabel = outLabel;
}

const finalMp4 = path.join(OUT_DIR, `${config.output.name}.mp4`);
if (processed.length === 1) {
  /* One clip is not a chain — xfade needs two inputs and would fail here. */
  fs.copyFileSync(processed[0].outFile, finalMp4);
} else {
  ffmpeg([
    ...processed.flatMap(c => ['-i', c.outFile]),
    '-filter_complex', filterParts.join('; '),
    '-map', '[vout]',
    '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '18', '-r', String(fps),
    finalMp4,
  ]);
}
const mb = (f) => (fs.statSync(f).size / 1024 / 1024).toFixed(1);
console.log(`\n${path.relative(process.cwd(), finalMp4)}  ${running.toFixed(1)}s  ${mb(finalMp4)} MB`);

if (makeGif) {
  const palette = path.join(OUT_DIR, 'palette.png');
  const finalGif = path.join(OUT_DIR, `${config.output.name}.gif`);
  const chain = 'fps=12,scale=800:-1:flags=lanczos';
  ffmpeg(['-i', finalMp4, '-vf', `${chain},palettegen=stats_mode=diff`, palette]);
  ffmpeg(['-i', finalMp4, '-i', palette, '-lavfi', `${chain}[x];[x][1:v]paletteuse=dither=bayer`, '-loop', '0', finalGif]);
  fs.unlinkSync(palette);
  console.log(`${path.relative(process.cwd(), finalGif)}  ${mb(finalGif)} MB`);
}
