// Event opening in Amman, independent of the unpublished schedule page.
export const EVENT_START_AT = '2026-09-19T09:00:00+03:00';
const eventStart = Date.parse(EVENT_START_AT);

export function getEventCountdown(now = Date.now()) {
  const totalSeconds = Math.max(0, Math.ceil((eventStart - now) / 1000));

  return {
    totalSeconds,
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}
