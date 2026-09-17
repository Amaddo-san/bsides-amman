import test from 'node:test';
import assert from 'node:assert/strict';
import { SCHEDULE } from '../src/data/schedule.js';
import { themeAt, contrast, createRoute, pointAtY, environmentAt, luminance } from '../src/components/scheduleJourney.js';
import { scheduleFallback } from '../scripts/schedule-fallback.js';

test('all 14 supplied local time ranges and distinct stops are preserved', () => {
  assert.equal(SCHEDULE.length, 14);
  assert.equal(new Set(SCHEDULE.map((s) => s.id)).size, 14);
  assert.deepEqual(SCHEDULE.map((s) => `${s.start}–${s.end}`), ['09:30–10:00', '10:05–10:40', '10:45–11:20', '11:25–12:00', '12:05–12:40', '12:45–13:20', '13:25–14:05', '14:10–15:00', '15:05–15:40', '15:45–16:20', '16:25–17:00', '17:05–17:40', '17:45–18:20', '18:25–19:00']);
  assert.deepEqual(SCHEDULE.filter((s) => s.kind).map((s) => s.title), ['Welcoming', 'Lunch & Networking', 'Closing Ceremony']);
});

test('text and controls retain WCAG AA contrast throughout the Day Arc', () => {
  const parse = (value) => value.match(/\d+/g).map(Number);
  for (let step = 0; step <= 1000; step++) {
    const tokens = themeAt(step / 1000);
    for (const bg of ['--day-bg', '--day-surface', '--day-focused-surface', '--day-sky', '--day-horizon']) {
      for (const fg of ['--day-ink', '--day-muted', '--day-accent']) {
        assert.ok(contrast(parse(tokens[fg]), parse(tokens[bg])) >= 4.5, `${fg} on ${bg} at ${step / 1000}`);
      }
    }
    assert.ok(contrast(parse(tokens['--day-on-accent']), parse(tokens['--day-accent'])) >= 4.5, `toggle at ${step / 1000}`);
    assert.ok(luminance(parse(tokens['--day-bg'])) < 0.045, `dark site identity at ${step / 1000}`);
  }
});

test('route passes through every measured stop, including unequal row heights', () => {
  const points = [{ x: 30, y: 80 }, { x: 90, y: 280 }, { x: 30, y: 600 }];
  const route = createRoute(points);
  assert.equal((route.match(/ L /g) || []).length, (points.length - 1) * 3);
  assert.ok(!route.includes(' C '));
  assert.ok(route.startsWith('M 30,80'));
  assert.ok(route.includes('90,280'));
  assert.ok(route.endsWith('30,600'));
  const samples = points.map((p, i) => ({ ...p, distance: i * 300 }));
  assert.deepEqual(pointAtY(samples, 80), samples[0]);
  assert.deepEqual(pointAtY(samples, 280), samples[1]);
  assert.deepEqual(pointAtY(samples, 600), samples[2]);
  assert.deepEqual(pointAtY(samples, -500), samples[0]);
  assert.deepEqual(pointAtY(samples, 900), samples[2]);
});

test('the sun rises and sets; night and parallax reverse without random state', () => {
  assert.ok(environmentAt(0.42).sunY < environmentAt(0).sunY);
  assert.ok(environmentAt(0.84).sunY > environmentAt(0.42).sunY);
  assert.equal(environmentAt(1).sunOpacity, 0);
  assert.equal(environmentAt(1).moonOpacity, 1);
  const forward = [0, 0.25, 0.50, 0.75, 1].map((p) => [themeAt(p), environmentAt(p)]);
  const backward = [1, 0.75, 0.50, 0.25, 0].map((p) => [themeAt(p), environmentAt(p)]).reverse();
  assert.deepEqual(forward, backward);
  assert.ok(Math.abs(environmentAt(1).farY) < Math.abs(environmentAt(1).nearY));
});

test('the standalone fallback contains the complete readable agenda without JavaScript', () => {
  const html = scheduleFallback();
  assert.equal((html.match(/<li /g) || []).length, 14);
  assert.equal((html.match(/<time /g) || []).length, 28);
  for (const s of SCHEDULE) {
    assert.ok(html.includes(s.start));
    if (s.speaker) assert.ok(html.includes(s.speaker));
  }
  assert.ok(html.includes('LLM Randomness &amp; Fingerprinting'));
  assert.ok(html.includes('Closing Ceremony'));
});
