import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { C } from '../constants';
import { FadeIn, Section, SectionHeading } from './Shared';

const FAQS = [
  { q: 'Who can attend BSides Amman?',
    a: 'Anyone with an interest in cybersecurity — from students and enthusiasts to seasoned professionals. BSides events are famously welcoming and community-driven.' },
  { q: 'Is the event free?',
    a: 'BSides Amman aims to keep costs as low as possible. Some editions are completely free; others charge a small token fee. Check registration details once tickets open.' },
  { q: 'Can I submit a talk or workshop?',
    a: 'Absolutely. Our CFP (Call for Papers) is open to all practitioners. We value technical depth and real-world experience. Details published on social channels soon.' },
  { q: 'What is the Physical Security Village?',
    a: 'A hands-on lockpicking and physical penetration testing area where attendees can learn and practice bypassing physical security controls under expert guidance.' },
  { q: 'Where exactly is the venue?',
    a: 'Applied Science University (ASU), Amman, Jordan. Detailed venue maps and parking information will be shared closer to the event date.' },
  { q: 'How do I stay updated?',
    a: 'Follow us on LinkedIn, X (Twitter), YouTube, and Instagram — or email info@bsidesamman.org to join our mailing list.' },
];

function FAQItem({ item, idx }) {
  const [open, setOpen] = useState(false);
  return (
    <FadeIn delay={idx * 0.05}>
      <div style={{ border: `1px solid ${open ? C.red + '40' : C.border}`, transition: 'border-color 0.2s' }}>
        <button
          onClick={() => setOpen(o => !o)}
          className="w-full flex items-center justify-between p-5 text-left"
          style={{ background: open ? `${C.red}06` : C.bgCard }}
        >
          <span className="text-sm font-mono pr-4" style={{ color: C.white }}>{item.q}</span>
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
                <div className="h-px mb-4" style={{ background: C.border }} />
                <p className="text-sm leading-relaxed" style={{ color: C.muted }}>{item.a}</p>
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
    <Section id="faq" style={{ background: C.bg }}>
      <SectionHeading label="08 / FAQ" title="Got Questions?" subtitle="Answers to the most common questions about BSides Amman." />
      <div className="max-w-3xl mx-auto space-y-2">
        {FAQS.map((item, i) => <FAQItem key={i} item={item} idx={i} />)}
      </div>
    </Section>
  );
}
