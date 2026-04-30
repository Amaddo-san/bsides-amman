import { motion } from "framer-motion";
import { Calendar, MapPin, ArrowRight, ChevronDown, ShieldCheck } from "lucide-react";
import { C } from "../constants";
import logo from "../assets/logo.png";
import AbbasCard from "./AbbasCard";

function HeroBackground() {
  return (
    <>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(220,38,38,0.22),transparent_35%),radial-gradient(circle_at_20%_80%,rgba(22,163,74,0.12),transparent_30%)]" />

      <div className="absolute inset-0 opacity-[0.13] bg-[linear-gradient(to_right,rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.18)_1px,transparent_1px)] bg-[size:42px_42px]" />

      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(5,7,13,0.25),rgba(5,7,13,0.95))]" />

      <div className="absolute top-0 left-0 right-0 h-[3px] flex z-10">
        <div className="flex-1 bg-red-600" />
        <div className="flex-1 bg-white/20" />
        <div className="flex-1 bg-green-600" />
      </div>
    </>
  );
}
const REGISTER_LINK = "PUT_GOOGLE_FORM_LINK_HERE";
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden bg-[#05070D] px-6 pt-28"
    >
      <HeroBackground />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto flex min-h-[calc(100vh-7rem)] max-w-7xl items-center"
      >
        <div className="grid w-full items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          
          {/* Left content */}
          <div className="text-center lg:text-left">
            <motion.div
              variants={item}
              className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 text-xs font-mono uppercase tracking-[0.22em] text-red-300 lg:mx-0"
            >
              <span className="h-2 w-2 rounded-full bg-red-500 shadow-[0_0_14px_rgba(239,68,68,0.9)]" />
              Coming Soon — 2026
            </motion.div>

            <img
  src={logo}
  alt="BSides Amman Logo"
  className="mx-auto lg:mx-0 w-64 md:w-80 lg:w-96 drop-shadow-[0_0_30px_rgba(220,38,38,0.35)]"
/>

            <motion.p
              variants={item}
              className="mx-auto mt-6 max-w-2xl text-base leading-8 text-zinc-400 md:text-lg lg:mx-0"
            >
              Jordan&apos;s premier InfoSec and hacking conference — bringing together
              hackers, builders, researchers, and security leaders.
            </motion.p>

            <motion.div
              variants={item}
              className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start"
            >
              <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-mono text-zinc-300 backdrop-blur-xl">
                <Calendar size={16} className="text-red-400" />
                TBA — 2026
              </div>

             <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-mono text-zinc-300 backdrop-blur-xl">
  <MapPin size={16} className="text-green-400" />
  we dont know
</div>
            </motion.div>

            <motion.div
              variants={item}
              className="mt-10 flex flex-wrap justify-center gap-4 lg:justify-start"
            >
              <a
  href="https://docs.google.com/forms/d/e/1FAIpQLSe5WdkDYhMmDKODqt65zJa0tlV_VX6C0XR_kAR1B9EEkcK5zQ/viewform?usp=publish-editor"
  target="_blank"
  rel="noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-red-600 px-7 py-4 text-sm font-mono font-bold uppercase tracking-widest text-white shadow-[0_0_35px_rgba(220,38,38,0.35)] transition-all duration-300 hover:-translate-y-1 hover:bg-red-500 hover:shadow-[0_0_45px_rgba(220,38,38,0.55)]"
              >
                Register Now
                <ArrowRight size={16} className="transition group-hover:translate-x-1" />
              </a>

              <a
                href="#about"
                className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-7 py-4 text-sm font-mono font-bold uppercase tracking-widest text-zinc-300 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.07] hover:text-white"
              >
                Learn More
              </a>
            </motion.div>
          </div>

          {/* Right logo card */}
          <motion.div
  variants={item}
  className="relative mx-auto flex w-full max-w-[520px] items-center justify-center"
>
  <AbbasCard />
</motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1.5 text-zinc-600"
      >
        <span className="text-[10px] font-mono tracking-[0.3em]">SCROLL</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>
          <ChevronDown size={14} />
        </motion.div>
      </motion.div>
    </section>
  );
}