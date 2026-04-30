import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { C } from '../constants';

/* ── Scroll-triggered fade-in wrapper ─────────────────────────────────────── */
export function FadeIn({ children, delay = 0, direction = 'up', className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up'    ?  40 : direction === 'down'  ? -40 : 0,
      x: direction === 'left'  ?  40 : direction === 'right' ? -40 : 0,
    },
    visible: { opacity: 1, y: 0, x: 0 },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={variants}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Full-width section container ─────────────────────────────────────────── */
export function Section({ id, children, className = '', style = {} }) {
  return (
    <section
      id={id}
      className={`relative py-24 px-6 md:px-10 lg:px-16 xl:px-24 ${className}`}
      style={style}
    >
      <div className="w-full">
        {children}
      </div>
    </section>
  );
}
/* ── Labelled section heading ─────────────────────────────────────────────── */
export function SectionHeading({ label, title, subtitle }) {
  return (
    <FadeIn className="text-center mb-16">
      <p className="text-xs font-mono tracking-[0.3em] uppercase mb-3" style={{ color: C.red }}>
        ▸ {label}
      </p>
      <h2
        className="text-4xl md:text-5xl font-black mb-4"
        style={{ fontFamily: "'Bebas Neue', cursive", letterSpacing: '0.04em', color: C.white }}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="max-w-2xl mx-auto text-base" style={{ color: C.muted }}>
          {subtitle}
        </p>
      )}
      <div className="flex items-center justify-center gap-3 mt-6">
        <div className="h-px w-16" style={{ background: C.border }} />
        <div className="w-2 h-2 rotate-45" style={{ background: C.red }} />
        <div className="h-px w-16" style={{ background: C.border }} />
      </div>
    </FadeIn>
  );
}
