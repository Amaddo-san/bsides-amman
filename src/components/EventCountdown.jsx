import { useEffect, useState } from 'react';
import { EVENT_START_AT, getEventCountdown } from './countdownTime';

const units = [
  { key: 'days', label: 'Days' },
  { key: 'hours', label: 'Hours' },
  { key: 'minutes', label: 'Mins' },
  { key: 'seconds', label: 'Secs' },
];

const eventDateLabel = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
  timeZone: 'Asia/Amman',
}).format(new Date(EVENT_START_AT));

export default function EventCountdown() {
  // Keep the ticking state here so Abbas's interaction doesn't rerender each second.
  const [remaining, setRemaining] = useState(() => getEventCountdown());
  const hasStarted = remaining.totalSeconds === 0;

  useEffect(() => {
    let intervalId;

    const update = () => {
      const next = getEventCountdown();
      setRemaining(next);
      if (next.totalSeconds === 0) window.clearInterval(intervalId);
    };

    const resume = () => {
      if (document.visibilityState === 'visible') update();
    };

    if (getEventCountdown().totalSeconds > 0) {
      intervalId = window.setInterval(update, 1000);
    }
    update();
    document.addEventListener('visibilitychange', resume);

    return () => {
      window.clearInterval(intervalId);
      document.removeEventListener('visibilitychange', resume);
    };
  }, []);

  return (
    <div className="mt-6 border-t border-white/10 pt-5 font-mono">
      <p className="mb-3 flex items-center justify-center gap-2 text-center text-[10px] uppercase tracking-[0.14em] text-zinc-300">
        <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.5)]" />
        {hasStarted ? 'BSides Amman has started' : 'Countdown to BSides'}
      </p>

      <div
        role="timer"
        aria-live="off"
        aria-label={hasStarted ? 'BSides Amman has started' : `${remaining.days} days, ${remaining.hours} hours, ${remaining.minutes} minutes, ${remaining.seconds} seconds until BSides Amman`}
        className="grid grid-cols-4 gap-2"
      >
        {units.map(({ key, label }) => (
          <div
            key={key}
            aria-hidden="true"
            className={`min-w-0 rounded-xl border px-1 py-3 text-center ${key === 'seconds' ? 'border-red-500/25 bg-red-500/[0.06]' : 'border-white/10 bg-black/30'}`}
          >
            <span className={`block text-2xl font-bold leading-none tabular-nums sm:text-3xl ${key === 'seconds' ? 'text-red-400' : 'text-zinc-100'}`}>
              {String(remaining[key]).padStart(2, '0')}
            </span>
            <span className="mt-2 block text-[9px] uppercase tracking-[0.1em] text-zinc-400">
              {label}
            </span>
          </div>
        ))}
      </div>

      <p className="mt-3 text-center text-[10px] leading-relaxed text-zinc-400">
        <time dateTime={EVENT_START_AT}>{eventDateLabel}</time> · Amman
      </p>
    </div>
  );
}
