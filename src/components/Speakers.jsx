import { motion } from 'framer-motion';
import { Lock, Radio, Shield, Terminal, UserRound } from 'lucide-react';
import { C } from '../constants';
import { FadeIn, Section, SectionHeading } from './Shared';

const SPEAKER_TOPICS = [
  { title: 'Red Team', color: '#ef4444' },
  { title: 'Blue Team', color: '#22d3ee' },
  { title: 'Cloud Security', color: '#a855f7' },
  { title: 'GRC', color: '#facc15' },
];

export default function Speakers() {
  return (
    <Section
      id="speakers"
      style={{
        background: 'radial-gradient(circle at top, #0a0f1a 0%, #05070D 55%, #000 100%)',
      }}
    >
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
          style={{ background: 'rgba(34,211,238,0.12)' }}
        />
      </div>

      <div className="relative z-10">
        <SectionHeading
          label="04 / Speakers"
          title="Speaker Lineup Loading"
          subtitle="Our speaker lineup is being curated. Expect technical talks, real-world cybersecurity stories, and community-driven sessions from different security domains."
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
              <span>SPEAKER_DATABASE: ENCRYPTED</span>
            </div>

            <div className="space-y-2 font-mono text-xs" style={{ color: C.dim }}>
              <p>&gt; scanning submissions... pending</p>
              <p>&gt; validating sessions... pending</p>
              <p>&gt; decrypting speaker identities... soon</p>
              <p>&gt; announcement status: standby</p>
            </div>
          </div>
        </FadeIn>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SPEAKER_TOPICS.map((topic, i) => (
            <FadeIn key={topic.title} delay={i * 0.06}>
              <motion.div
                whileHover={{
                  y: -8,
                  boxShadow: `0 0 24px ${topic.color}55`,
                  borderColor: topic.color,
                }}
                transition={{ duration: 0.25 }}
                className="group relative overflow-hidden rounded-2xl border p-6 text-center"
                style={{
                  background: 'rgba(10,15,25,0.68)',
                  borderColor: 'rgba(255,255,255,0.1)',
                }}
              >
                <div
                  className="absolute left-0 top-0 h-[2px] w-full"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${topic.color}, transparent)`,
                  }}
                />

                <div
                  className="mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-full border"
                  style={{
                    borderColor: topic.color,
                    color: topic.color,
                    boxShadow: `0 0 22px ${topic.color}44`,
                    background: 'rgba(255,255,255,0.03)',
                  }}
                >
                  <UserRound size={34} />
                </div>

                <div className="mb-4 flex justify-center">
                  <span
                    className="inline-flex items-center gap-1 rounded-full border px-3 py-1 font-mono text-[10px]"
                    style={{
                      borderColor: topic.color,
                      color: topic.color,
                    }}
                  >
                    <Lock size={11} />
                    CLASSIFIED SPEAKER
                  </span>
                </div>

                <h3 className="mb-2 text-lg font-bold" style={{ color: C.white }}>
                  {topic.title}
                </h3>

                <p className="mx-auto max-w-[220px] text-sm leading-relaxed" style={{ color: C.dim }}>
                  Speaker details will be revealed once the official lineup is announced.
                </p>

                <div className="mt-5 flex items-center justify-center gap-2 font-mono text-xs" style={{ color: topic.color }}>
                  <Radio size={13} />
                  Access pending
                </div>

                <Shield
                  size={90}
                  className="absolute -bottom-8 -right-8 opacity-[0.04]"
                  style={{ color: topic.color }}
                />
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </Section>
  );
}