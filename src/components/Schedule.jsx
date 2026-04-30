import { motion } from 'framer-motion';
import { Lock, Terminal, Radio, Mic, Hammer, Trophy, Users } from 'lucide-react';
import { C } from '../constants';
import { FadeIn, Section, SectionHeading } from './Shared';

const TEASERS = [
  { title: 'Keynotes', desc: 'Main-stage cybersecurity talks.', icon: Mic, color: '#ef4444' },
  { title: 'Workshops', desc: 'Hands-on technical sessions.', icon: Hammer, color: '#22d3ee' },
  { title: 'CTF Challenges', desc: 'Competitive hacking activities.', icon: Trophy, color: '#a855f7' },
  { title: 'Networking', desc: 'Community, booths, and connections.', icon: Users, color: '#facc15' },
];

export default function Schedule() {
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
          title="Schedule Is Loading"
          subtitle="The full BSidesAmman 2026 agenda is currently being prepared. Talks, workshops, CTF activities, and community sessions will be announced soon."
        />

        <FadeIn>
          <div
            className="mx-auto mb-10 max-w-3xl overflow-hidden rounded-2xl border p-5"
            style={{
              background: 'rgba(5,7,13,0.72)',
              borderColor: C.border,
            }}
          >
            <div className="mb-4 flex items-center gap-3 font-mono text-xs" style={{ color: C.red }}>
              <Terminal size={16} />
              <span>SCHEDULE_STATUS: CLASSIFIED</span>
            </div>

            <div className="space-y-2 font-mono text-xs" style={{ color: C.dim }}>
              <p>&gt; initializing agenda.exe</p>
              <p>&gt; loading speakers... pending</p>
              <p>&gt; syncing workshops... pending</p>
              <p>&gt; release date: coming soon</p>
            </div>
          </div>
        </FadeIn>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TEASERS.map((item, i) => {
            const Icon = item.icon;

            return (
              <FadeIn key={item.title} delay={i * 0.06}>
                <motion.div
                  whileHover={{
                    y: -8,
                    boxShadow: `0 0 24px ${item.color}55`,
                    borderColor: item.color,
                  }}
                  transition={{ duration: 0.25 }}
                  className="group relative overflow-hidden rounded-2xl border p-6"
                  style={{
                    background: 'rgba(10,15,25,0.68)',
                    borderColor: 'rgba(255,255,255,0.1)',
                  }}
                >
                  <div
                    className="absolute left-0 top-0 h-[2px] w-full"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${item.color}, transparent)`,
                    }}
                  />

                  <div className="mb-6 flex items-center justify-between">
                    <div
                      className="flex h-11 w-11 items-center justify-center rounded-xl border"
                      style={{
                        borderColor: item.color,
                        color: item.color,
                        boxShadow: `0 0 16px ${item.color}44`,
                      }}
                    >
                      <Icon size={19} />
                    </div>

                    <div className="flex items-center gap-1 font-mono text-[10px]" style={{ color: C.dim }}>
                      <Lock size={12} />
                      LOCKED
                    </div>
                  </div>

                  <h3 className="mb-2 text-lg font-bold" style={{ color: C.white }}>
                    {item.title}
                  </h3>

                  <p className="text-sm leading-relaxed" style={{ color: C.dim }}>
                    {item.desc}
                  </p>

                  <div className="mt-5 flex items-center gap-2 font-mono text-xs" style={{ color: item.color }}>
                    <Radio size={13} />
                    Access pending
                  </div>
                </motion.div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </Section>
  );
}