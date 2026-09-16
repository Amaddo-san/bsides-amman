// Extracted unchanged from HistoryTimeline: the existing 32px Abbas sprite atlas.
// History keeps its original movement/idle behavior; the agenda supplies position.
export const ABBAS_FRAMES = {
  idle: [[-3, -3]],
  alert: [[-7, -3]],
  scratchSelf: [[-5, 0], [-6, 0], [-7, 0]],
  tired: [[-3, -2]],
  sleeping: [[-2, 0], [-2, -1]],
  N: [[-1, -2], [-1, -3]],
  NE: [[0, -2], [0, -3]],
  E: [[-3, 0], [-3, -1]],
  SE: [[-5, -1], [-5, -2]],
  S: [[-6, -3], [-7, -2]],
  SW: [[-5, -3], [-6, -1]],
  W: [[-4, -2], [-4, -3]],
  NW: [[-1, 0], [-1, -1]],
};

export function getAbbasDirection(dx, dy) {
  const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
  if (angle > -22.5 && angle <= 22.5) return 'E';
  if (angle > 22.5 && angle <= 67.5) return 'SE';
  if (angle > 67.5 && angle <= 112.5) return 'S';
  if (angle > 112.5 && angle <= 157.5) return 'SW';
  if (angle > 157.5 || angle <= -157.5) return 'W';
  if (angle > -157.5 && angle <= -112.5) return 'NW';
  if (angle > -112.5 && angle <= -67.5) return 'N';
  return 'NE';
}

export function spritePosition(state, frame) {
  const frames = ABBAS_FRAMES[state];
  const [x, y] = frames[frame % frames.length];
  return `${x * 32}px ${y * 32}px`;
}

// Bottom occupied pixel in each atlas cell (measured from abbas-sprite.png).
// This keeps the feet on the route when a running frame has extra blank rows.
const FOOT_ROWS = [[30, 32, 30, 26, 27, 29, 29, 29], [30, 28, 30, 27, 27, 30, 28, 31], [32, 30, 27, 29, 26, 28, 31, 27], [28, 30, 27, 29, 27, 30, 31, 29]];

// The character's clock always runs forward, independently of scroll direction.
// No position, rotation, or scaling is applied here, only original atlas frames.
export function createAbbasAnimator(sprite, clock = {
  now: () => performance.now(),
  schedule: (tick) => setInterval(tick, 120),
  cancel: (timer) => clearInterval(timer),
}) {
  let timer = null;
  let frame = 0;
  let direction = 'S';
  let lastMovement = 0;
  let destroyed = false;

  function paint(state) {
    if (destroyed) return;
    sprite.dataset.state = state;
    sprite.style.backgroundPosition = spritePosition(state, frame);
    const frames = ABBAS_FRAMES[state];
    const [x, y] = frames[frame % frames.length];
    sprite.style.setProperty('--abbas-foot-lift', `${32 - FOOT_ROWS[-y][-x]}px`);
  }
  function stop() {
    if (timer !== null) clock.cancel(timer);
    timer = null;
    frame = 0;
    paint('idle');
  }
  function tick() {
    if (destroyed) return;
    if (clock.now() - lastMovement >= 160) { stop(); return; }
    frame += 1;
    paint(direction);
  }
  paint('idle');
  return {
    move(dx, dy) {
      if (destroyed || Math.hypot(dx, dy) < 0.1) return;
      direction = getAbbasDirection(dx, dy);
      lastMovement = clock.now();
      paint(direction);
      if (timer === null) timer = clock.schedule(tick);
    },
    stop,
    destroy() { stop(); destroyed = true; },
  };
}
