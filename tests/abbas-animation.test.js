import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { ABBAS_FRAMES, getAbbasDirection, createAbbasAnimator, spritePosition } from '../src/components/abbasAnimation.js';

test('the shared atlas mapping matches the existing cursor character exactly', () => {
  const cursor = readFileSync(new URL('../public/oneko/oneko.js', import.meta.url), 'utf8');
  for (const [state, frames] of Object.entries(ABBAS_FRAMES)) {
    const source = cursor.match(new RegExp(`^\\s+${state}: (\\[\\[.*\\]\\]),$`, 'm'));
    assert.ok(source, `Existing ${state} animation`);
    assert.deepEqual(frames, JSON.parse(source[1]));
  }
});

test('facing uses all eight existing directional animations', () => {
  for (const [dx, dy, expected] of [[1, 0, 'E'], [1, 1, 'SE'], [0, 1, 'S'], [-1, 1, 'SW'], [-1, 0, 'W'], [-1, -1, 'NW'], [0, -1, 'N'], [1, -1, 'NE']]) {
    assert.equal(getAbbasDirection(dx, dy), expected);
  }
});

test('running advances by time through scroll reversals, then settles into idle', () => {
  let now = 0;
  let tick;
  let cancelled = 0;
  const sprite = { dataset: {}, style: { setProperty(key, value) { this[key] = value; } } };
  const actor = createAbbasAnimator(sprite, {
    now: () => now,
    schedule: (callback) => { tick = callback; return 1; },
    cancel: () => { cancelled++; tick = null; },
  });
  assert.equal(sprite.dataset.state, 'idle');
  actor.move(10, 0);
  assert.equal(sprite.style.backgroundPosition, spritePosition('E', 0));
  assert.equal(sprite.style['--abbas-foot-lift'], '6px');
  now = 120;
  tick();
  assert.equal(sprite.style.backgroundPosition, spritePosition('E', 1));
  actor.move(-10, 0);
  assert.equal(sprite.style.backgroundPosition, spritePosition('W', 1));
  now = 240;
  tick();
  assert.equal(sprite.style.backgroundPosition, spritePosition('W', 2));
  actor.move(0, -10);
  assert.equal(sprite.dataset.state, 'N');
  now = 420;
  tick();
  assert.equal(sprite.dataset.state, 'idle');
  assert.equal(tick, null);
  assert.equal(cancelled, 1);
  actor.move(10, 0);
  const staleTick = tick;
  actor.destroy();
  sprite.dataset.state = 'unmounted';
  staleTick();
  actor.move(10, 0);
  assert.equal(tick, null);
  assert.equal(sprite.dataset.state, 'unmounted');
});
