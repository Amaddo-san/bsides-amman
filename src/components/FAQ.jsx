import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { C } from '../constants';
import { FadeIn, Section, SectionHeading } from './Shared';

const FAQS = [
  {
    q: 'Who can attend BSides Amman?',
    a: 'Anyone interested in cybersecurity is welcome, including students, researchers, builders, professionals, and first-time attendees.',
  },
  {
    q: 'Can I submit a talk or workshop?',
    a: 'Yes. If you want to speak, run a workshop, or suggest a session, email contact@bsidesamman.org. CFP details will also be announced on our social channels.',
  },
  {
    q: 'When will the schedule be announced?',
    a: 'The schedule is still under process. Talks, workshops, activities, and timing will be published once confirmed.',
  },
  {
    q: 'Where exactly is the venue?',
    a: 'The venue details are not confirmed yet. Location, maps, parking, and access information will be shared closer to the event date.',
  },
  {
    q: 'How do I stay updated?',
    a: 'Follow BSides Amman on LinkedIn, X, YouTube, and Instagram, or email contact@bsidesamman.org for questions and updates.',
  },
];

function FAQItem({ item, idx }) {
  const [open, setOpen] = useState(false);

  return (
    <FadeIn delay={idx * 0.05}>
      <div className={`faq-glass-item overflow-hidden rounded-lg border ${open ? 'is-open' : ''}`}>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="relative z-10 flex w-full items-center justify-between gap-4 p-5 text-left"
        >
          <span className="pr-4 font-mono text-sm" style={{ color: C.white }}>
            {item.q}
          </span>
          <motion.div
            animate={{ rotate: open ? 90 : 0 }}
            transition={{ duration: 0.25 }}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border"
            style={{
              borderColor: open ? 'rgba(206,32,40,0.34)' : 'rgba(255,255,255,0.11)',
              background: open ? 'rgba(206,32,40,0.12)' : 'rgba(255,255,255,0.04)',
              color: open ? C.red : C.dim,
            }}
          >
            <ChevronRight size={16} />
          </motion.div>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ overflow: 'hidden' }}
            >
              <div className="relative z-10 px-5 pb-5">
                <div
                  className="mb-4 h-px"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.16), rgba(206,32,40,0.28), transparent)',
                  }}
                />
                <p className="text-sm leading-relaxed" style={{ color: C.muted }}>
                  {item.a}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </FadeIn>
  );
}

export default function FAQ() {
  return (
    <Section
      id="faq"
      className="flex-1 !pb-10 md:!pb-12"
      style={{
        background: 'linear-gradient(180deg, #07090f 0%, #05070D 54%, #080b11 100%)',
      }}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute left-1/2 top-16 h-72 w-[680px] -translate-x-1/2 rounded-full blur-[130px]"
          style={{ background: 'rgba(206,32,40,0.07)' }}
        />
        <div
          className="absolute inset-x-0 top-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.14), transparent)' }}
        />
      </div>

      <div className="relative z-10">
        <SectionHeading
          label="08 / FAQ"
          title="Got Questions?"
          subtitle="Answers to the most common questions about BSides Amman."
        />
        <div className="mx-auto max-w-3xl space-y-3">
          {FAQS.map((item, i) => (
            <FAQItem key={item.q} item={item} idx={i} />
          ))}
        </div>
      </div>
    </Section>
  );
}
