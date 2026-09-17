export const clamp = (value, min = 0, max = 1) => Math.max(min, Math.min(max, value));

// Short vertical approaches and a single chamfer between stops: restrained
// angular turns, with monotonic Y for reliable scroll-to-route mapping.
export function createRoute(points) {
  if (!points.length) return '';
  return points.slice(1).reduce((path, point, index) => {
    const previous = points[index];
    const bend = Math.round((point.y - previous.y) * 0.3 / 4) * 4;
    return `${path} L ${previous.x},${previous.y + bend} L ${point.x},${point.y - bend} L ${point.x},${point.y}`;
  }, `M ${points[0].x},${points[0].y}`);
}

// Lookup by vertical position: unequal title heights must not make Abbas drift
// away from the session at the viewport center. Geometry is sampled only on resize.
export function sampleRoute(path) {
  const length = path.getTotalLength();
  const count = Math.max(2, Math.ceil(length / 3));
  return Array.from({ length: count + 1 }, (_, index) => {
    const distance = (index / count) * length;
    const point = path.getPointAtLength(distance);
    return { x: point.x, y: point.y, distance };
  });
}

export function pointAtY(samples, y) {
  let low = 0;
  let high = samples.length - 1;
  while (high - low > 1) {
    const middle = Math.floor((low + high) / 2);
    if (samples[middle].y < y) low = middle;
    else high = middle;
  }
  const a = samples[low];
  const b = samples[high];
  const t = clamp((y - a.y) / (b.y - a.y || 1));
  return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t, distance: a.distance + (b.distance - a.distance) * t };
}

const rgb = (hex) => hex.match(/[a-f\d]{2}/gi).map((v) => parseInt(v, 16));
const mix = (a, b, t) => a.map((v, i) => Math.round(v + (b[i] - v) * t));
const color = (values) => `rgb(${values.join(', ')})`;
export function luminance(values) {
  const linear = values.map((v) => { const s = v / 255; return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4; });
  return linear[0] * 0.2126 + linear[1] * 0.7152 + linear[2] * 0.0722;
}
export function contrast(a, b) {
  const values = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (values[0] + 0.05) / (values[1] + 0.05);
}
const INK = rgb('151319');
const CREAM = rgb('fefcf6');
// The site remains dark throughout. Only the distant sky carries daylight.
const STOPS = [
  { at: 0, bg: '10121f', sky: '222237', horizon: '513847', accent: 'f0aeb9' },
  { at: 0.24, bg: '111c29', sky: '293e53', horizon: '4e606a', accent: 'ebc493' },
  { at: 0.49, bg: '211c26', sky: '453644', horizon: '775445', accent: 'f5c491' },
  { at: 0.70, bg: '211a2c', sky: '463246', horizon: '664155', accent: 'efb1b4' },
  { at: 0.86, bg: '111727', sky: '24293f', horizon: '3b354c', accent: 'e9b3c5' },
  { at: 1, bg: '0c1220', sky: '111a2d', horizon: '252840', accent: 'e5aebf' },
];

function readable(candidate, backgrounds, foreground, minimum = 4.6) {
  let result = candidate;
  for (let step = 0; step <= 20; step += 1) {
    result = mix(candidate, foreground, step / 20);
    if (backgrounds.every((background) => contrast(result, background) >= minimum)) break;
  }
  return result;
}

export function themeAt(progress) {
  const p = clamp(progress);
  const index = Math.max(1, STOPS.findIndex(({ at }) => at >= p));
  const a = STOPS[index - 1];
  const b = STOPS[index];
  const blend = (key) => mix(rgb(a[key]), rgb(b[key]), (p - a.at) / (b.at - a.at));
  const background = blend('bg');
  const sky = blend('sky');
  const horizon = blend('horizon');
  const surface = mix(background, sky, 0.26);
  const focusedSurface = mix(surface, CREAM, 0.055);
  const backgrounds = [background, surface, focusedSurface, sky, horizon];
  const foreground = CREAM;
  const accent = readable(blend('accent'), backgrounds, foreground);
  const muted = readable(mix(foreground, background, 0.25), backgrounds, foreground);
  let onAccent = contrast(INK, accent) >= contrast(CREAM, accent) ? INK : CREAM;
  if (contrast(onAccent, accent) < 4.5) onAccent = contrast([0, 0, 0], accent) >= contrast([255, 255, 255], accent) ? [0, 0, 0] : [255, 255, 255];
  return {
    '--day-bg': color(background), '--day-surface': color(surface),
    '--day-focused-surface': color(focusedSurface),
    '--day-ink': color(foreground), '--day-muted': color(muted),
    '--day-accent': color(accent), '--day-on-accent': color(onAccent),
    '--day-line': color(mix(background, foreground, 0.22)),
    '--day-sky': color(sky), '--day-horizon': color(horizon),
    '--world-far': color(mix(horizon, background, 0.38)),
    '--world-near': color(mix(background, rgb('070c17'), 0.32)),
    '--day-night': String(clamp((p - 0.76) / 0.20)),
  };
}

export function moodAt(progress) {
  if (progress < 0.12) return 'Dawn';
  if (progress < 0.38) return 'Morning';
  if (progress < 0.62) return 'Afternoon';
  if (progress < 0.88) return 'Sunset';
  return 'Night';
}

export function environmentAt(progress) {
  const p = clamp(progress);
  const sunProgress = clamp(p / 0.84);
  return {
    sunY: 58 + 8 * sunProgress - 42 * Math.sin(sunProgress * Math.PI),
    sunOpacity: 1 - clamp((p - 0.74) / 0.12),
    moonOpacity: clamp((p - 0.83) / 0.13),
    farY: -Math.round(p * 12) * 2,
    nearY: -Math.round(p * 26) * 2,
    cloudX: Math.round(p * 20) * 2,
  };
}
