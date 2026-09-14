#!/usr/bin/env node
/**
 * One segment's raw take, cut down to the part worth watching.
 *
 * `compose.js` builds the whole video; this builds a single segment, so a
 * reshoot can be looked at on its own before it goes anywhere near the rest.
 * Everything lands in `.output/refined/`, one file per segment named for the
 * segment — so the folder is always "the current good take of each thing",
 * whatever order they were shot in. `gif.js` reads it.
 *
 * The trim comes from `config.snapshot.json`, which `record.js` writes: the
 * window between "the app finished booting" and "the segment verified". No
 * guessing, and none of the boot in the result.
 *
 *   node scripts/demo-video/refine.js                  # every segment on disk
 *   node scripts/demo-video/refine.js playground docs  # just these
 */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(ROOT, '.output');
const RAW_DIR = path.join(OUT_DIR, 'raw');
const REFINED_DIR = path.join(OUT_DIR, 'refined');

const wanted = process.argv.slice(2).filter(a => !a.startsWith('-'));

const snapshotPath = path.join(OUT_DIR, 'config.snapshot.json');
if (!fs.existsSync(snapshotPath)) {
  console.error('No config.snapshot.json — record something first:\n  node scripts/demo-video/record.js');
  process.exit(1);
}
const snapshot = JSON.parse(fs.readFileSync(snapshotPath, 'utf8'));

fs.mkdirSync(REFINED_DIR, { recursive: true });

/*
  The intro is a clip but not a segment.

  `record.js` writes `raw/intro.webm` and `compose.js` plans it, but it is not
  in `config.segments` — so without this nothing ever produces `refined/intro.mp4`,
  and the GIFs built from this folder all open mid-scroll with no title card in
  front of them.
*/
const introClip = { id: 'intro', trimStartSec: 0 };
const all = fs.existsSync(path.join(RAW_DIR, 'intro.webm'))
  ? [introClip, ...snapshot.segments]
  : snapshot.segments;

const segments = all.filter(s => !wanted.length || wanted.includes(s.id));
if (!segments.length) {
  console.error(`Nothing to do. Available: ${all.map(s => s.id).join(', ')}`);
  process.exit(1);
}

let made = 0;
for (const seg of segments) {
  const raw = path.join(RAW_DIR, `${seg.id}.webm`);
  if (!fs.existsSync(raw)) {
    console.log(`  ${seg.id}: no raw take on disk, skipped`);
    continue;
  }
  const start = seg.trimStartSec ?? 0;
  const out = path.join(REFINED_DIR, `${seg.id}.mp4`);
  const args = ['-y', '-loglevel', 'error', '-ss', String(start), '-i', raw];
  /* An end mark is what keeps the idle tail out. A take whose driver never
     marked one has none; keep all of it. */
  if (typeof seg.endAtSec === 'number') args.push('-t', String(Math.max(0.5, seg.endAtSec - start)));
  args.push('-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '18', out);
  execFileSync('ffmpeg', args, { stdio: ['ignore', 'ignore', 'inherit'] });

  const secs = execFileSync('ffprobe',
    ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', out],
    { encoding: 'utf8' }).trim();
  console.log(`  ${seg.id.padEnd(16)} ${Number(secs).toFixed(1)}s  ->  ${path.relative(process.cwd(), out)}`);
  made++;
}

console.log(`\n${made} segment${made === 1 ? '' : 's'} in ${path.relative(process.cwd(), REFINED_DIR)}`);
