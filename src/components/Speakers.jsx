import { motion } from 'framer-motion';
import { Linkedin, Mail, Mic2 } from 'lucide-react';
import { C } from '../constants';
import { SPEAKERS } from '../data/speakers';
import { FadeIn, Section, SectionHeading } from './Shared';

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
          subtitle="Meet the BSidesAmman 2026 speakers and explore their sessions on security research, offensive security, AI, and more."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SPEAKERS.map((speaker, i) => (
            <FadeIn key={speaker.linkedin} delay={(i % 3) * 0.05} className="min-w-0">
              <motion.article
                whileHover={{
                  y: -6,
                  borderColor: 'rgba(255,255,255,0.24)',
                  boxShadow:
                    'inset 0 1px 0 rgba(255,255,255,0.22), 0 30px 70px rgba(0,0,0,0.36), 0 0 34px rgba(206,32,40,0.12)',
                }}
                transition={{ duration: 0.22 }}
                className="speaker-glass-card group flex h-full flex-col overflow-hidden rounded-lg border p-5"
              >
                <div
                  className="speaker-portrait-glass aspect-square w-full shrink-0 overflow-hidden rounded-md border"
                  style={{
                    borderColor: 'rgba(255,255,255,0.13)',
                  }}
                >
                  <img
                    src={`${import.meta.env.BASE_URL}bsides%20speakers/${speaker.photo}`}
                    alt={speaker.name}
                    loading="lazy"
                    decoding="async"
                    width="600"
                    height="600"
                    className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-105 motion-reduce:transform-none"
                  />
                </div>

                <div className="flex flex-1 flex-col pt-5">
                  <h3 className="text-xl font-bold" style={{ color: C.white }}>
                    {speaker.name}
                  </h3>
                  <p className="mt-2 text-sm leading-6" style={{ color: C.muted }}>
                    {speaker.role}
                  </p>
                  <div className="mt-5 flex-1 border-t border-white/10 pt-5">
                    <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-red-400">
                      <Mic2 size={14} aria-hidden="true" />
                      Session topic
                    </p>
                    <h4 className="mt-3 text-base font-semibold leading-6" style={{ color: C.white }}>
                      {speaker.title}
                    </h4>
                    {speaker.coPresenter && (
                      <p className="mt-2 text-xs leading-5 text-red-300">Co-presented with {speaker.coPresenter}</p>
                    )}
                    <p className="mt-3 text-sm leading-6" style={{ color: C.muted }}>
                      {speaker.description}
                    </p>
                  </div>
                  <a
                    href={speaker.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${speaker.name} on LinkedIn (opens in a new tab)`}
                    className="relative z-10 mt-6 inline-flex min-h-11 items-center justify-center gap-2 self-start rounded-full border border-white/15 px-4 py-2 text-xs font-semibold text-white transition hover:border-red-400/60 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-400"
                  >
                    <Linkedin size={15} aria-hidden="true" />
                    LinkedIn profile
                  </a>
                </div>
              </motion.article>
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
