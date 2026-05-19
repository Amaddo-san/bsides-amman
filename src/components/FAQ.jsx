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
      <div style={{ border: `1px solid ${open ? C.red + '40' : C.border}`, transition: 'border-color 0.2s' }}>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="flex w-full items-center justify-between p-5 text-left"
          style={{ background: open ? `${C.red}06` : C.bgCard }}
        >
          <span className="pr-4 font-mono text-sm" style={{ color: C.white }}>
            {item.q}
          </span>
          <motion.div animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.25 }}>
            <ChevronRight size={16} style={{ color: C.dim }} />
          </motion.div>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ overflow: 'hidden', background: C.bgCard }}
            >
              <div className="px-5 pb-5">
                <div className="mb-4 h-px" style={{ background: C.border }} />
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
    <Section id="faq" className="flex-1 !pb-10 md:!pb-12" style={{ background: C.bg }}>
      <SectionHeading
        label="08 / FAQ"
        title="Got Questions?"
        subtitle="Answers to the most common questions about BSides Amman."
      />
      <div className="mx-auto max-w-3xl space-y-2">
        {FAQS.map((item, i) => (
          <FAQItem key={item.q} item={item} idx={i} />
        ))}
      </div>
    </Section>
  );
}
