import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Menu, X } from 'lucide-react';
import { C, NAV_LINKS } from '../constants';
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const REGISTER_LINK = "PUT_GOOGLE_FORM_LINK_HERE";

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(10,12,14,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? `1px solid ${C.border}` : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        {/* Logo mark */}
        <div className="flex items-center gap-3">
  <img 
    src={logo}
    alt="BSides Amman Logo" 
    className="h-16 w-22 object-contain"
  />

</div>

       {/* Desktop links */}
<div className="hidden md:flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-2 py-2 backdrop-blur-xl">
  {NAV_LINKS.map(l => (
    <Link
      key={l.href}
      to={l.href}
      className="group relative rounded-full px-4 py-2 text-sm font-mono tracking-wide text-zinc-400 transition-all duration-300 hover:text-white"
    >
      <span className="relative z-10">{l.label}</span>

      <span className="absolute inset-0 rounded-full bg-white/[0.06] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <span className="absolute bottom-1 left-1/2 h-[2px] w-0 -translate-x-1/2 rounded-full bg-red-500 transition-all duration-300 group-hover:w-6" />
    </Link>
  ))}

  <a
  href="https://docs.google.com/forms/d/e/1FAIpQLSe5WdkDYhMmDKODqt65zJa0tlV_VX6C0XR_kAR1B9EEkcK5zQ/viewform?usp=publish-editor"
  target="_blank"
  rel="noreferrer"
    className="ml-2 rounded-full bg-red-600 px-5 py-2 text-sm font-mono font-bold text-white shadow-[0_0_20px_rgba(220,38,38,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-red-500 hover:shadow-[0_0_30px_rgba(220,38,38,0.55)]"
  >
    Register →
  </a>
</div>

        {/* Mobile toggle */}
        <button className="md:hidden" onClick={() => setOpen(o => !o)} style={{ color: C.white }}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ background: 'rgba(10,12,14,0.98)', borderTop: `1px solid ${C.border}` }}
            className="md:hidden overflow-hidden"
          >
           <div className="px-4 py-4 flex flex-col gap-2">
  {NAV_LINKS.map(l => (
    <a
      key={l.href}
      href={l.href}
      onClick={() => setOpen(false)}
      className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-mono text-zinc-300 transition-all duration-300 hover:border-red-500/40 hover:bg-red-500/10 hover:text-white"
    >
      {l.label}
    </a>
  ))}

  <a
    href="mailto:info@bsidesamman.org"
    className="mt-2 rounded-xl bg-red-600 px-4 py-3 text-center text-sm font-mono font-bold text-white shadow-[0_0_20px_rgba(220,38,38,0.35)] transition-all duration-300 hover:bg-red-500"
  >
    Register →
  </a>
</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
