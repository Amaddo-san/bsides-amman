import test from 'node:test';
import assert from 'node:assert/strict';
import { EVENT_START_AT, getEventCountdown } from '../src/components/countdownTime.js';

test('countdown targets the agenda opening in Amman, not the visitor timezone', () => {
  assert.equal(new Date(EVENT_START_AT).toISOString(), '2026-09-19T06:30:00.000Z');
  assert.deepEqual(getEventCountdown(Date.parse('2026-09-12T04:57:56Z')), {
    totalSeconds: 610324,
    days: 7,
    hours: 1,
    minutes: 32,
    seconds: 4,
  });
});

test('countdown rolls over days and stays positive until the actual start', () => {
  const start = Date.parse(EVENT_START_AT);
  assert.deepEqual(getEventCountdown(start - 86400000), {
    totalSeconds: 86400, days: 1, hours: 0, minutes: 0, seconds: 0,
  });
  assert.deepEqual(getEventCountdown(start - 86399000), {
    totalSeconds: 86399, days: 0, hours: 23, minutes: 59, seconds: 59,
  });
  assert.equal(getEventCountdown(start - 1).totalSeconds, 1);
});

test('countdown stops at zero on and after the event start', () => {
  for (const now of [Date.parse(EVENT_START_AT), Date.parse('2027-01-01T00:00:00Z')]) {
    assert.deepEqual(getEventCountdown(now), {
      totalSeconds: 0, days: 0, hours: 0, minutes: 0, seconds: 0,
    });
  }
});
