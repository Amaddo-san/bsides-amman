import { motion } from 'framer-motion';
import { CalendarDays, Clock, MapPin, Radio, ShieldCheck } from 'lucide-react';
import { C } from '../constants';
import { FadeIn, Section, SectionHeading } from './Shared';

const DAYS = [
  {
    id: 'day-1',
    label: 'Event Day',
    date: '19 SEP 2026',
    status: 'Schedule under process',
    accent: '#ef4444',
    location: 'Rooms TBA',
    events: [
      { time: '--:--', title: 'Loading schedule block', desc: 'Day one timeline is being prepared.' },
      { time: '--:--', title: 'Session details pending', desc: 'Talks, rooms, and timing will be announced soon.' },
      { time: '--:--', title: 'Workshop queue syncing', desc: 'Workshop information is still under process.' },
      { time: '--:--', title: 'Community slots loading', desc: 'More event day activities are coming soon.' },
    ],
  },
];

export default function Schedule() {
  const activeDay = DAYS[0];

  return (
    <Section
      id="schedule"
      style={{
        background: 'radial-gradient(circle at top, #0a0f1a 0%, #05070D 55%, #000 100%)',
      }}
    >
      {/* Cyber background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)
            `,
            backgroundSize: '44px 44px',
          }}
        />
        <div
          className="absolute left-1/2 top-20 h-[420px] w-[420px] -translate-x-1/2 rounded-full blur-[100px]"
          style={{ background: 'rgba(239,68,68,0.14)' }}
        />
      </div>

      <div className="relative z-10">
        <SectionHeading
          label="03 / Schedule"
          title="One-Day Schedule"
          subtitle="The full agenda for September 19 is still being prepared and will be announced soon."
        />

        <FadeIn>
          <div className="mx-auto max-w-5xl">
            <div className="grid gap-4">
              {DAYS.map((day) => {
                return (
                  <motion.div
                    key={day.id}
                    whileHover={{ y: -5 }}
                    className="group relative overflow-hidden rounded-lg border p-5 text-left transition duration-300 sm:p-6"
                    style={{
                      background: 'rgba(12,18,30,0.9)',
                      borderColor: day.accent,
                      boxShadow: `0 0 28px ${day.accent}33`,
                    }}
                  >
                    <div
                      className="absolute left-0 top-0 h-[2px] w-full"
                      style={{ background: `linear-gradient(90deg, transparent, ${day.accent}, transparent)` }}
                    />
                    <div
                      className="pointer-events-none absolute -right-10 -top-16 h-36 w-36 rounded-full blur-3xl transition-opacity"
                      style={{ background: day.accent, opacity: 0.16 }}
                    />

                    <div className="relative flex items-start justify-between gap-4">
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.24em]" style={{ color: day.accent }}>
                          {day.date}
                        </p>
                        <h3
                          className="mt-3 text-3xl font-black uppercase sm:text-4xl"
                          style={{ fontFamily: "'Bebas Neue', cursive", color: C.white }}
                        >
                          {day.label}
                        </h3>
                      </div>

                      <div
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border"
                        style={{
                          borderColor: day.accent,
                          color: day.accent,
                          boxShadow: `0 0 18px ${day.accent}55`,
                        }}
                      >
                        <CalendarDays size={20} />
                      </div>
                    </div>

                    <div className="relative mt-6 grid gap-3 font-mono text-[11px] uppercase tracking-[0.12em] text-zinc-500 sm:grid-cols-2">
                      <span className="flex items-center gap-2">
                        <Radio size={13} style={{ color: day.accent }} />
                        {day.status}
                      </span>
                      <span className="flex items-center gap-2 sm:justify-end">
                        <MapPin size={13} style={{ color: day.accent }} />
                        {day.location}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.08}>
            <motion.div
              key={activeDay.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.28 }}
              className="mx-auto mt-6 max-w-5xl overflow-hidden rounded-lg border"
              style={{
                background: 'rgba(5,7,13,0.82)',
                borderColor: 'rgba(255,255,255,0.1)',
                boxShadow: `0 0 42px ${activeDay.accent}1f`,
              }}
            >
              <div className="border-b border-white/[0.08] p-5 sm:p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.24em]" style={{ color: activeDay.accent }}>
                      Timeline Details
                    </p>
                    <h3
                      className="mt-2 text-3xl font-black uppercase sm:text-4xl"
                      style={{ fontFamily: "'Bebas Neue', cursive", color: C.white }}
                    >
                      {activeDay.label}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-2 font-mono text-[10px] uppercase tracking-[0.14em]">
                    <span className="inline-flex items-center gap-2 border border-white/10 bg-white/[0.03] px-3 py-2 text-zinc-400">
                      <ShieldCheck size={13} style={{ color: activeDay.accent }} />
                      Under process
                    </span>
                    <span className="inline-flex items-center gap-2 border border-white/10 bg-white/[0.03] px-3 py-2 text-zinc-400">
                      <MapPin size={13} style={{ color: activeDay.accent }} />
                      {activeDay.location}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-5 sm:p-6">
                <div className="relative">
                  <div
                    className="absolute bottom-5 left-[58px] top-5 hidden w-px sm:block"
                    style={{ background: `linear-gradient(${activeDay.accent}, rgba(255,255,255,0.08))` }}
                  />

                  <div className="space-y-4">
                    {activeDay.events.map((event, index) => (
                      <div key={`${activeDay.id}-${event.time}`} className="relative grid gap-3 sm:grid-cols-[116px_1fr]">
                        <div className="flex items-center gap-3 font-mono text-xs" style={{ color: activeDay.accent }}>
                          <span className="hidden h-3 w-3 rounded-full border bg-[#05070D] sm:block" style={{ borderColor: activeDay.accent }} />
                          <Clock size={14} />
                          {event.time}
                        </div>

                        <motion.div
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.04 }}
                          className="border border-white/[0.08] bg-white/[0.025] p-4"
                        >
                          <h4 className="text-base font-bold" style={{ color: C.white }}>
                            {event.title}
                          </h4>
                          <p className="mt-2 text-sm leading-6" style={{ color: C.dim }}>
                            {event.desc}
                          </p>
                        </motion.div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
        </FadeIn>
      </div>
    </Section>
  );
}
