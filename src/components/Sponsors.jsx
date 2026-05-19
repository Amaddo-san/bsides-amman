import { motion } from 'framer-motion';
import { ArrowRight, Building2, Handshake, Mail } from 'lucide-react';
import { C } from '../constants';
import { FadeIn, Section, SectionHeading } from './Shared';

const TIERS = [
  {
    tier: 'Platinum',
    color: '#e8e8e8',
    summary: 'Maximum visibility for organizations supporting the main conference experience.',
    benefits: ['Main-stage recognition', 'Premium logo placement', 'Sponsor table space'],
  },
  {
    tier: 'Gold',
    color: C.amber,
    summary: 'Strong presence across event communications, community moments, and venue areas.',
    benefits: ['Website logo placement', 'Social announcement', 'Community booth option'],
  },
  {
    tier: 'Community',
    color: C.green,
    summary: 'For local communities, nonprofits, student groups, and ecosystem partners.',
    benefits: ['Community partner listing', 'Shared table presence', 'Event-day mention'],
  },
];

function TierCard({ tier, index }) {
  return (
    <FadeIn delay={index * 0.08}>
      <motion.article
        whileHover={{
          y: -6,
          borderColor: tier.color,
          boxShadow: `0 18px 45px ${tier.color}14`,
        }}
        transition={{ duration: 0.22 }}
        className="flex h-full flex-col overflow-hidden rounded-lg border"
        style={{
          background: 'rgba(10,12,18,0.78)',
          borderColor: 'rgba(255,255,255,0.08)',
        }}
      >
        <div
          className="flex min-h-[118px] items-center justify-center border-b"
          style={{
            background: 'rgba(5,7,13,0.72)',
            borderColor: 'rgba(255,255,255,0.06)',
          }}
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: C.dim }}>
            Partner slot open
          </span>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: tier.color }}>
                {tier.tier}
              </p>
              <h3 className="mt-2 text-xl font-bold" style={{ color: C.white }}>
                Sponsor Package
              </h3>
            </div>
            <div
              className="flex h-10 w-10 items-center justify-center rounded-lg border"
              style={{
                color: tier.color,
                borderColor: `${tier.color}55`,
                background: `${tier.color}0d`,
              }}
            >
              <Building2 size={18} />
            </div>
          </div>

          <p className="text-sm leading-6" style={{ color: C.muted }}>
            {tier.summary}
          </p>

          <div className="my-5 h-px" style={{ background: C.border }} />

          <ul className="space-y-3">
            {tier.benefits.map((benefit) => (
              <li key={benefit} className="flex items-center gap-3 text-sm" style={{ color: C.muted }}>
                <span className="h-1.5 w-1.5 rotate-45" style={{ background: tier.color }} />
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      </motion.article>
    </FadeIn>
  );
}

export default function Sponsors() {
  return (
    <Section id="sponsors" style={{ background: C.bg }}>
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          label="07 / Sponsors"
          title="Our Supporters"
          subtitle="Made possible by organizations that believe in community-driven security education."
        />

        <FadeIn>
          <div
            className="mb-8 grid overflow-hidden rounded-lg border lg:grid-cols-[1.1fr_0.9fr]"
            style={{
              background: 'rgba(5,7,13,0.72)',
              borderColor: 'rgba(255,255,255,0.08)',
            }}
          >
            <div className="p-6 sm:p-8">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg border border-red-500/25 bg-red-500/10 text-red-400">
                <Handshake size={22} />
              </div>
              <p className="font-mono text-[10px] uppercase tracking-[0.24em]" style={{ color: C.red }}>
                Become a sponsor
              </p>
              <h3
                className="mt-3 text-3xl font-black leading-tight md:text-4xl"
                style={{ fontFamily: "'Bebas Neue', cursive", color: C.white }}
              >
                Support Jordan's Security Community
              </h3>
              <p className="mt-4 max-w-2xl text-sm leading-7" style={{ color: C.muted }}>
                Sponsor packages are available for companies, communities, universities, and partners who want to support practical security education in Amman.
              </p>
            </div>

            <div
              className="flex flex-col justify-center gap-4 border-t p-6 sm:p-8 lg:border-l lg:border-t-0"
              style={{ borderColor: 'rgba(255,255,255,0.08)' }}
            >
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                <div className="border border-white/[0.08] bg-white/[0.025] p-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: C.dim }}>
                    Packages
                  </p>
                  <p className="mt-2 text-sm" style={{ color: C.muted }}>
                    Platinum, Gold, and Community tiers.
                  </p>
                </div>
                <div className="border border-white/[0.08] bg-white/[0.025] p-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: C.dim }}>
                    Contact
                  </p>
                  <p className="mt-2 text-sm" style={{ color: C.muted }}>
                    contact@bsidesamman.org
                  </p>
                </div>
              </div>

              <a
                href="mailto:contact@bsidesamman.org?subject=BSides%20Amman%20Sponsorship"
                className="inline-flex w-fit items-center gap-2 rounded-full bg-[#c81e1e] px-5 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-white transition hover:bg-[#a01515]"
              >
                <Mail size={14} />
                Sponsor us
                <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </FadeIn>

        <div className="grid gap-5 md:grid-cols-3">
          {TIERS.map((tier, index) => (
            <TierCard key={tier.tier} tier={tier} index={index} />
          ))}
        </div>
      </div>
    </Section>
  );
}
