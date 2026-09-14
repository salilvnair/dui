/**
 * Camera moves, as ffmpeg `zoompan` filters.
 *
 * Every effect is the same shot: the crop window eases toward a focal point
 * given as a fraction of the frame (fx, fy — 0,0 top-left, 1,1 bottom-right).
 * The named presets are convenient (fx, fy, zoomTo) triples; config.json can
 * pass those three directly for a shot no preset covers.
 *
 * ── Two things that matter on a screen recording ──
 *
 * A zoompan over *video* is not a zoompan over a photograph. It recomputes the
 * crop with swscale every output frame, and rounding the window to the pixel
 * grid means a hair's change between frames can land on a different pixel —
 * which on a photo is invisible and on 11px type with 1px borders reads as
 * shake. Two fixes, both load-bearing:
 *
 *   1. Ease in and out (smoothstep) rather than linearly, so the shot starts
 *      and stops gently instead of moving at a constant robotic speed.
 *   2. Render at `supersample`x the final size and let the caller scale back
 *      down, so each frame's rounding error is a fraction of a real pixel.
 *
 * And the zoom range is small on purpose — 1.05–1.10x. A product video is
 * alive without the viewer ever consciously noticing the camera.
 *
 * Adapted from the same generator in the daakia repo.
 */

/** name → { fx, fy, zoomTo } — the vocabulary config.json writes in. */
export const PRESETS = {
  'static':               { fx: 0.5,  fy: 0.5,  zoomTo: 1.0 },
  'zoom-in':              { fx: 0.5,  fy: 0.5,  zoomTo: 1.06 },
  'zoom-out':             { fx: 0.5,  fy: 0.5,  zoomTo: 1.06, direction: 'out' },
  'pan-left-right':       { fx: 0.68, fy: 0.5,  zoomTo: 1.07 },
  'pan-right-left':       { fx: 0.32, fy: 0.5,  zoomTo: 1.07 },
  'tilt-top-down':        { fx: 0.5,  fy: 0.68, zoomTo: 1.07 },
  'tilt-bottom-up':       { fx: 0.5,  fy: 0.32, zoomTo: 1.07 },
  'zoom-in-top-left':     { fx: 0.32, fy: 0.32, zoomTo: 1.10 },
  'zoom-in-top-right':    { fx: 0.68, fy: 0.32, zoomTo: 1.10 },
  'zoom-in-bottom-left':  { fx: 0.32, fy: 0.68, zoomTo: 1.10 },
  'zoom-in-bottom-right': { fx: 0.68, fy: 0.68, zoomTo: 1.10 },
};

/** A preset name, or an object that names one and overrides part of it. */
export function resolveEffect(effectConfig) {
  if (typeof effectConfig === 'string') {
    const preset = PRESETS[effectConfig];
    if (!preset) throw new Error(`Unknown camera effect "${effectConfig}". Known: ${Object.keys(PRESETS).join(', ')}`);
    return { direction: 'in', ...preset };
  }
  const base = effectConfig.preset ? PRESETS[effectConfig.preset] : { fx: 0.5, fy: 0.5, zoomTo: 1.06 };
  if (effectConfig.preset && !base) throw new Error(`Unknown camera effect "${effectConfig.preset}"`);
  return { direction: 'in', ...base, ...effectConfig };
}

/**
 * The `-vf zoompan` string for a clip of `totalFrames` output frames.
 *
 * Works on video, not only stills, because `d=1` advances exactly one input
 * frame per output frame: the position is a pure function of the output frame
 * index, so it scales to any clip length and can zoom back out.
 *
 * Returns null for a static shot — there is nothing for ffmpeg to do, and the
 * caller should skip the filter rather than pay for a no-op rescale.
 */
export function buildZoompanFilter(effectConfig, totalFrames, { width = 1440, height = 900, fps = 25, supersample = 2 } = {}) {
  const { fx, fy, zoomTo, direction } = resolveEffect(effectConfig);
  const N = Math.max(1, totalFrames);
  if (zoomTo === 1.0) return null;

  const rawT = direction === 'out' ? `(1-on/${N})` : `(on/${N})`;
  /* Smoothstep, 3t²-2t³: zero velocity at both ends. */
  const t = `(3*pow(${rawT},2)-2*pow(${rawT},3))`;
  const zExpr = `1+${zoomTo - 1}*${t}`;
  const cx = `(iw*0.5+(iw*${fx}-iw*0.5)*${t})`;
  const cy = `(ih*0.5+(ih*${fy}-ih*0.5)*${t})`;
  /* clip() keeps the window in bounds for a custom fx/fy/zoomTo that would
     otherwise push it off the edge of the frame. */
  const xExpr = `clip(${cx}-(iw/zoom/2),0,iw-iw/zoom)`;
  const yExpr = `clip(${cy}-(ih/zoom/2),0,ih-ih/zoom)`;

  return `zoompan=z='${zExpr}':x='${xExpr}':y='${yExpr}':d=1:s=${width * supersample}x${height * supersample}:fps=${fps}`;
}
