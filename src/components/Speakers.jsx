import { motion } from 'framer-motion';
import { CalendarClock, Mail, Mic2, UserRound } from 'lucide-react';
import { C } from '../constants';
import { FadeIn, Section, SectionHeading } from './Shared';

const SPEAKER_CARDS = [
  { topic: 'Keynote Speaker', track: 'Main Stage' },
  { topic: 'Technical Speaker', track: 'Research Track' },
  { topic: 'Workshop Lead', track: 'Hands-on Lab' },
  { topic: 'Community Speaker', track: 'Community Track' },
];

export default function Speakers() {
  return (
    <Section
      id="speakers"
      style={{
        background: 'linear-gradient(180deg, #080b11 0%, #05070D 52%, #07090f 100%)',
      }}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-70">
        <div
          className="absolute inset-x-0 top-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.16), transparent)' }}
        />
        <div
          className="absolute left-1/2 top-28 h-64 w-[620px] -translate-x-1/2 rounded-full blur-[120px]"
          style={{ background: 'rgba(206,32,40,0.08)' }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionHeading
          label="04 / Speakers"
          title="Speakers"
          subtitle="The speaker lineup is currently being finalized. Confirmed speakers and session information will be published soon."
        />

        <FadeIn>
          <div
            className="mx-auto mb-10 flex max-w-3xl flex-col gap-4 rounded-lg border px-5 py-5 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left"
            style={{
              background: 'rgba(255,255,255,0.025)',
              borderColor: 'rgba(255,255,255,0.09)',
            }}
          >
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: C.red }}>
                Speaker lineup
              </p>
              <p className="mt-2 text-sm leading-6" style={{ color: C.muted }}>
                Profiles, photos, and talk titles are under review.
              </p>
            </div>

            <div
              className="mx-auto inline-flex items-center gap-2 rounded-full border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.14em] sm:mx-0"
              style={{
                borderColor: 'rgba(255,255,255,0.1)',
                color: C.muted,
                background: 'rgba(255,255,255,0.03)',
              }}
            >
              <CalendarClock size={14} style={{ color: C.red }} />
              Coming soon
            </div>
          </div>
        </FadeIn>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SPEAKER_CARDS.map((speaker, i) => (
            <FadeIn key={speaker.topic} delay={i * 0.05}>
              <motion.div
                whileHover={{
                  y: -6,
                  borderColor: 'rgba(255,255,255,0.24)',
                  boxShadow:
                    'inset 0 1px 0 rgba(255,255,255,0.22), 0 30px 70px rgba(0,0,0,0.36), 0 0 34px rgba(206,32,40,0.12)',
                }}
                transition={{ duration: 0.22 }}
                className="speaker-glass-card group h-full overflow-hidden rounded-lg border p-5"
              >
                <div
                  className="speaker-portrait-glass aspect-[4/3] w-full overflow-hidden rounded-md border"
                  style={{
                    borderColor: 'rgba(255,255,255,0.13)',
                  }}
                >
                  <div className="relative z-10 flex h-full items-center justify-center">
                    <div
                      className="flex h-20 w-20 items-center justify-center rounded-full border shadow-[inset_0_1px_0_rgba(255,255,255,0.16)] transition duration-300 group-hover:scale-105"
                      style={{
                        background: 'rgba(5,7,13,0.46)',
                        borderColor: 'rgba(255,255,255,0.2)',
                        color: 'rgba(255,255,255,0.58)',
                        backdropFilter: 'blur(10px)',
                      }}
                    >
                      <UserRound size={34} strokeWidth={1.6} />
                    </div>
                  </div>
                </div>

                <div className="pt-5">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <span
                      className="rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em]"
                      style={{
                        borderColor: 'rgba(206,32,40,0.28)',
                        color: 'rgba(248,113,113,0.9)',
                        background: 'rgba(206,32,40,0.08)',
                      }}
                    >
                      {speaker.track}
                    </span>
                    <Mic2 size={16} style={{ color: 'rgba(255,255,255,0.32)' }} />
                  </div>

                  <h3 className="text-lg font-bold" style={{ color: C.white }}>
                    {speaker.topic}
                  </h3>
                  <p className="mt-2 text-sm leading-6" style={{ color: C.dim }}>
                    Speaker profile will be announced soon.
                  </p>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.12}>
          <div
            className="mx-auto mt-10 flex max-w-3xl flex-col items-center justify-between gap-4 rounded-lg border px-5 py-5 text-center sm:flex-row sm:text-left"
            style={{
              background: 'rgba(206,32,40,0.045)',
              borderColor: 'rgba(206,32,40,0.18)',
            }}
          >
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: C.red }}>
                Become a speaker
              </p>
              <p className="mt-2 text-sm leading-6" style={{ color: C.muted }}>
                Have a talk, workshop, or research story to share with the community?
              </p>
            </div>

            <a
              href="mailto:contact@bsidesamman.org?subject=BSides%20Amman%20Speaker%20Submission"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#c81e1e] px-5 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-white transition hover:bg-[#a01515]"
            >
              <Mail size={14} />
              Contact us
            </a>
          </div>
        </FadeIn>
      </div>
    </Section>
  );
}
