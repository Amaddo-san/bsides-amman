import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import logo from "../assets/logo.png";
import soonMark from "../assets/1.png";
import AbbasCard from "./AbbasCard";
import HistoryTimeline from "./HistoryTimeline";

const EVENT_DATE = "SEPTEMBER - 2026";
const EVENT_LOCATION = "UNIVERSITY OF JORDAN - Amman";

function HeroBackground() {
  return (
    <>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(220,38,38,0.22),transparent_35%),radial-gradient(circle_at_20%_80%,rgba(22,163,74,0.12),transparent_30%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(5,7,13,0.25),rgba(5,7,13,0.95))]" />
      <div className="absolute left-0 right-0 top-0 z-10 flex h-[3px]">
        <div className="flex-1 bg-red-600" />
        <div className="flex-1 bg-white/20" />
        <div className="flex-1 bg-green-600" />
      </div>
    </>
  );
}

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

function ComingSoonMarquee() {
  const marqueeItems = Array.from({ length: 8 });

  return (
    <div className="pointer-events-none relative z-10 -mx-6 mt-10 overflow-hidden py-2 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] md:py-3 lg:absolute lg:bottom-0 lg:left-0 lg:right-0 lg:mx-0 lg:mt-0 lg:py-4">
      <motion.div
        className="flex w-max items-center gap-5 md:gap-9 lg:gap-12"
        animate={{ x: ["0%", "-35%"] }}
        transition={{ duration: 22, ease: "linear", repeat: Infinity }}
      >
        {[0, 1].map((track) => (
          <div key={track} className="flex items-center gap-5 md:gap-9 lg:gap-12">
            {marqueeItems.map((_, index) => (
              <div key={`${track}-${index}`} className="flex items-center gap-5 md:gap-9 lg:gap-12">
                <span
                  className="whitespace-nowrap text-2xl font-black uppercase leading-none text-white/95 drop-shadow-[0_0_12px_rgba(255,255,255,0.12)] md:text-4xl lg:text-6xl"
                  style={{ fontFamily: "'Bebas Neue', cursive" }}
                >
                  BSidesAmman 2026
                </span>
                <img
                  src={soonMark}
                  alt=""
                  className="h-7 w-7 shrink-0 object-contain drop-shadow-[0_0_10px_rgba(220,38,38,0.3)] md:h-10 md:w-10 lg:h-20 lg:w-20"
                  aria-hidden="true"
                />
                <span
                  className="whitespace-nowrap text-2xl font-black uppercase leading-none text-white/95 drop-shadow-[0_0_12px_rgba(255,255,255,0.12)] md:text-4xl lg:text-6xl"
                  style={{ fontFamily: "'Bebas Neue', cursive" }}
                >
                  Coming Soon
                </span>
              </div>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function RegisterNotice({ onClose }) {
  return (
    <div className="fixed inset-x-4 bottom-6 z-[60]">
      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="mx-auto max-w-md rounded-2xl border border-red-500/30 bg-[#0A0C0E]/95 p-4 text-center shadow-[0_0_35px_rgba(220,38,38,0.25)] backdrop-blur-xl sm:p-5"
      >
        <p className="text-xs font-mono font-bold uppercase tracking-[0.16em] text-red-300 sm:text-sm">
          Registration Coming Soon
        </p>
        <p className="mt-3 text-xs leading-6 text-zinc-300 sm:text-sm">
          Registration will open when the event date and venue are confirmed. Stay tuned for the official BSides Amman 2026 announcement.
        </p>
        <button
          type="button"
          onClick={onClose}
          className="mt-4 rounded-full border border-white/10 bg-white/[0.04] px-5 py-2 text-xs font-mono font-bold uppercase tracking-widest text-zinc-300 transition hover:border-red-500/40 hover:bg-red-500/10 hover:text-white"
        >
          Got it
        </button>
      </motion.div>
    </div>
  );
}

export default function Hero() {
  const [showRegistrationNotice, setShowRegistrationNotice] = useState(false);

  useEffect(() => {
    if (!showRegistrationNotice) return undefined;

    const timeoutId = window.setTimeout(() => {
      setShowRegistrationNotice(false);
    }, 5000);

    return () => window.clearTimeout(timeoutId);
  }, [showRegistrationNotice]);

  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden bg-[#05070D] px-6 pb-10 pt-24 md:pt-28 lg:pb-0"
    >
      <HeroBackground />

      <div className="relative z-10 mx-auto flex max-w-[520px] flex-col gap-8 lg:hidden">
        <HistoryTimeline />

        <div className="text-center">
          <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 text-[11px] font-mono uppercase tracking-[0.18em] text-red-300">
            <span className="h-2 w-2 rounded-full bg-red-500 shadow-[0_0_14px_rgba(239,68,68,0.9)]" />
            Coming Soon - 2026
          </div>

          <img
            src={logo}
            alt="BSides Amman Logo"
            className="mx-auto w-56 drop-shadow-[0_0_30px_rgba(220,38,38,0.35)]"
          />

          <p className="mx-auto mt-5 max-w-sm text-sm leading-7 text-zinc-400">
            Jordan&apos;s premier InfoSec and hacking conference, bringing together
            hackers, builders, researchers, and security leaders.
          </p>

          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-xs font-mono text-zinc-300 backdrop-blur-xl">
              <Calendar size={15} className="text-red-400" />
              {EVENT_DATE}
            </div>
            <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-xs font-mono text-zinc-300 backdrop-blur-xl">
              <MapPin size={15} className="text-green-400" />
              {EVENT_LOCATION}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => setShowRegistrationNotice(true)}
              className="group inline-flex items-center gap-2 rounded-full bg-red-600 px-6 py-3.5 text-xs font-mono font-bold uppercase tracking-widest text-white shadow-[0_0_35px_rgba(220,38,38,0.35)] transition-all duration-300 hover:bg-red-500"
            >
              Register Now
              <ArrowRight size={15} className="transition group-hover:translate-x-1" />
            </button>

            <a
              href="#about"
              className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-6 py-3.5 text-xs font-mono font-bold uppercase tracking-widest text-zinc-300 backdrop-blur-xl transition-all duration-300 hover:border-white/25 hover:bg-white/[0.07] hover:text-white"
            >
              Learn More
            </a>
          </div>
        </div>

        <AbbasCard />
        <ComingSoonMarquee />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto hidden max-w-7xl lg:flex lg:min-h-[calc(100vh-7rem)] lg:flex-col lg:gap-10 lg:pb-44 lg:pt-8"
      >
        <motion.div variants={item} className="w-full">
          <HistoryTimeline />
        </motion.div>

        <div className="grid w-full flex-1 items-center gap-8 md:gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="text-center lg:text-left">
            <motion.div
              variants={item}
              className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 text-xs font-mono uppercase tracking-[0.22em] text-red-300 lg:mx-0"
            >
              <span className="h-2 w-2 rounded-full bg-red-500 shadow-[0_0_14px_rgba(239,68,68,0.9)]" />
              Coming Soon - 2026
            </motion.div>

            <img
              src={logo}
              alt="BSides Amman Logo"
              className="mx-auto w-64 drop-shadow-[0_0_30px_rgba(220,38,38,0.35)] md:w-80 lg:mx-0 lg:w-96"
            />

            <motion.p
              variants={item}
              className="mx-auto mt-6 max-w-2xl text-base leading-8 text-zinc-400 md:text-lg lg:mx-0"
            >
              Jordan&apos;s premier InfoSec and hacking conference, bringing together
              hackers, builders, researchers, and security leaders.
            </motion.p>

            <motion.div
              variants={item}
              className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start"
            >
              <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-mono text-zinc-300 backdrop-blur-xl">
                <Calendar size={16} className="text-red-400" />
                {EVENT_DATE}
              </div>
              <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-mono text-zinc-300 backdrop-blur-xl">
                <MapPin size={16} className="text-green-400" />
                {EVENT_LOCATION}
              </div>
            </motion.div>

            <motion.div
              variants={item}
              className="mt-10 flex flex-wrap justify-center gap-4 lg:justify-start"
            >
              <button
                type="button"
                onClick={() => setShowRegistrationNotice(true)}
                className="group inline-flex items-center gap-2 rounded-full bg-red-600 px-7 py-4 text-sm font-mono font-bold uppercase tracking-widest text-white shadow-[0_0_35px_rgba(220,38,38,0.35)] transition-all duration-300 hover:-translate-y-1 hover:bg-red-500 hover:shadow-[0_0_45px_rgba(220,38,38,0.55)]"
              >
                Register Now
                <ArrowRight size={16} className="transition group-hover:translate-x-1" />
              </button>

              <a
                href="#about"
                className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-7 py-4 text-sm font-mono font-bold uppercase tracking-widest text-zinc-300 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.07] hover:text-white"
              >
                Learn More
              </a>
            </motion.div>
          </div>

          <motion.div
            variants={item}
            className="relative mx-auto flex w-full max-w-[520px] items-center justify-center"
          >
            <AbbasCard />
          </motion.div>
        </div>
      </motion.div>

      <div className="hidden lg:block">
        <ComingSoonMarquee />
      </div>

      {showRegistrationNotice && (
        <RegisterNotice onClose={() => setShowRegistrationNotice(false)} />
      )}
    </section>
  );
}
