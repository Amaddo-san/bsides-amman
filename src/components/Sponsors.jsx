import { motion } from 'framer-motion';
import { C } from '../constants';
import { FadeIn, Section, SectionHeading } from './Shared';

const TIERS = [
  { tier: 'Platinum', color: '#e8e8e8', count: 2 },
  { tier: 'Gold',     color: C.amber,   count: 3 },
  { tier: 'Silver',   color: '#9ca3af', count: 4 },
  { tier: 'Community',color: C.green,   count: 5 },
];

export default function Sponsors() {
  return (
    <Section id="sponsors" style={{ background: C.bgCardAlt }}>
      <SectionHeading
        label="07 / Sponsors"
        title="Our Supporters"
        subtitle="Made possible by organizations that believe in community-driven security education."
      />
      <div className="space-y-12">
        {TIERS.map((tier, ti) => (
          <FadeIn key={tier.tier} delay={ti * 0.1}>
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-2 h-2 rotate-45" style={{ background: tier.color }} />
                <span className="text-xs font-mono tracking-widest" style={{ color: tier.color }}>
                  {tier.tier.toUpperCase()} SPONSORS
                </span>
                <div className="flex-1 h-px" style={{ background: C.border }} />
              </div>
              <div
                className="grid gap-3"
                style={{ gridTemplateColumns: `repeat(${Math.min(tier.count, 5)}, 1fr)` }}
              >
                {Array.from({ length: tier.count }).map((_, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ borderColor: tier.color, scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center justify-center"
                    style={{
                      background: C.bgCard,
                      border:     `1px solid ${C.border}`,
                      minHeight:  tier.count <= 2 ? '90px' : '64px',
                    }}
                  >
                    <span className="text-xs font-mono" style={{ color: C.dim }}>YOUR LOGO</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
      <FadeIn delay={0.5} className="text-center mt-14">
        <p className="text-sm font-mono mb-4" style={{ color: C.muted }}>
          Interested in sponsoring BSides Amman?
        </p>
        <a
          href="mailto:info@bsidesamman.org"
          className="inline-block px-8 py-3 font-mono text-sm transition-all duration-300"
          style={{ border: `1px solid ${C.amber}`, color: C.amber }}
          onMouseEnter={e => { e.currentTarget.style.background = C.amber; e.currentTarget.style.color = C.bg; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = C.amber; }}
        >
          BECOME A SPONSOR →
        </a>
      </FadeIn>
    </Section>
  );
}
