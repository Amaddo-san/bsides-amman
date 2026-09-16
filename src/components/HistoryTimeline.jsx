import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { CalendarDays, Users } from "lucide-react";
import abbasSprite from "../assets/abbas-sprite.png";
import { ABBAS_FRAMES as SPRITE_SETS, getAbbasDirection as getDirection } from './abbasAnimation';

const EDITIONS = [
  {
    year: "2019",
    edition: "Edition I",
    desc: "Held at ASU Campus with over 100 attendees. The edition spanned 2 days, with the first day featuring a local on-site CTF.",
    tags: ["ASU Campus", "100+ Attendees", "2 Days", "On-site CTF"],
    date: "2019",
    location: "ASU Campus",
    status: "Archived",
    future: false,
    pos: { x: 13, y: 60 },
  },
  {
    year: "2021",
    edition: "Edition II",
    desc: "A virtual conference due to COVID. It spanned 1 day and contained online workshops and sessions.",
    tags: ["Virtual", "COVID", "1 Day", "Online Sessions"],
    date: "2021",
    location: "Virtual",
    status: "Archived",
    future: false,
    pos: { x: 35, y: 33 },
  },
  {
    year: "2025",
    edition: "Edition III",
    desc: "Held at ASU with over 800 attendees. The edition spanned 2 days and featured interactive, competitive workshops with wide collaboration across different bodies.",
    tags: ["ASU", "800+ Attendees", "2 Days", "Competitive Workshops"],
    date: "2025",
    location: "ASU",
    status: "Archived",
    future: false,
    pos: { x: 62, y: 65 },
  },
  {
    year: "2026",
    edition: "Edition IV",
    desc: "The fourth edition brings Jordan’s security community together for technical talks, hands-on villages, and practical research.",
    tags: ["Technical Talks", "Hands-on Villages", "Security Research"],
    date: "19 September 2026",
    location: "University of Jordan, IT College — Amman",
    status: "Upcoming",
    future: true,
    pos: { x: 83, y: 38 },
  },
];

const MAP_HEIGHT = 260;
const MAP_HEIGHT_MOBILE = 300;
const ROUTE_PATH = "M 13 60 C 20 52, 27 40, 35 33 S 52 50, 62 65 S 75 45, 83 38";
const ABBAS_TARGET_OFFSET_Y = -34;
const ABBAS_MAX_SPEED = 20;
const ABBAS_EASING_SPEED = 0.50;

function HistoryNode({ edition, isActive, onClick }) {
  const accent = edition.future ? '#f4bd50' : '#f87171';
  return (
    <button
      type="button"
      onClick={onClick}
      className="group absolute z-20 -translate-x-1/2 -translate-y-1/2 rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-white"
      style={{ left: edition.pos.x + '%', top: edition.pos.y + '%' }}
      aria-label={'BSides Amman ' + edition.edition + ' ' + edition.year}
      aria-pressed={isActive}
      aria-controls="history-edition-details"
    >
      <div
        className="relative flex h-11 w-11 items-center justify-center rounded-full border bg-[#090c13] transition duration-300 group-hover:scale-110 sm:h-14 sm:w-14 motion-reduce:transition-none"
        style={{ borderColor: isActive ? accent : edition.future ? '#80602c' : '#703337', boxShadow: isActive ? '0 0 26px ' + accent + '30' : 'none' }}
      >
        <span className="absolute inset-[5px] rounded-full border" style={{ borderColor: accent + '40' }} />
        {edition.future && <span className="history-node-pulse absolute inset-0 rounded-full border border-[#f4bd50]/40" />}
        <span
          className="relative z-10 flex h-7 w-7 items-center justify-center rounded-full font-mono text-[11px] font-bold sm:h-8 sm:w-8"
          style={{ background: edition.future ? '#f4bd50' : '#c81e1e', color: edition.future ? '#171007' : '#fff' }}
        >
          {edition.year.slice(2)}
        </span>
      </div>
      <div className="absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap text-center">
        <span className="block font-mono text-xs font-bold leading-none sm:text-sm" style={{ color: accent }}>{edition.year}</span>
        <span className="mt-1.5 block font-mono text-[8px] uppercase tracking-[0.1em] text-zinc-400 sm:text-[10px]">
          {edition.future ? 'Next edition' : edition.edition}
        </span>
        {isActive && <span className="mx-auto mt-2 block h-0.5 w-5 rounded-full" style={{ background: accent }} />}
      </div>
    </button>
  );
}

function DetailPanel({ edition }) {
  const accent = edition.future ? '#f4bd50' : '#f87171';
  return (
    <div className="relative overflow-hidden rounded-lg border border-white/10 bg-[#0c1018] px-5 py-6 sm:px-7" style={{ borderLeftWidth: 3, borderLeftColor: accent }}>
      <span aria-hidden="true" className="pointer-events-none absolute bottom-0 right-4 text-6xl font-black uppercase sm:right-7 sm:text-8xl" style={{ fontFamily: "'Bebas Neue', cursive", color: 'rgba(255,255,255,0.025)' }}>
        BSides Amman
      </span>
      <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-7">
        <span className="shrink-0 text-6xl font-black leading-none sm:text-7xl" style={{ fontFamily: "'Bebas Neue', cursive", color: accent }}>{edition.year}</span>
        <div className="min-w-0 flex-1 sm:pt-1">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em]" style={{ color: accent }}>
            {edition.edition}{edition.future ? ' / Next edition' : ' / From the archive'}
          </p>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-zinc-300">{edition.desc}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {edition.tags.map((tag) => (
              <span key={tag} className="rounded border border-white/10 bg-white/[0.03] px-2.5 py-1.5 font-mono text-[10px] text-zinc-300">{tag}</span>
            ))}
          </div>
          <dl className="mt-5 grid gap-4 border-t border-white/10 pt-5 sm:grid-cols-[1fr_1.8fr_0.8fr]">
            {[
              ['Date', edition.date],
              ['Location', edition.location],
              ['Status', edition.status],
            ].map(([label, value]) => (
              <div key={label}>
                <dt className="font-mono text-[10px] uppercase tracking-[0.15em] text-zinc-400">{label}</dt>
                <dd className="mt-1.5 text-sm leading-6 text-zinc-200" style={label === 'Status' ? { color: accent } : undefined}>{value}</dd>
              </div>
            ))}
          </dl>
          {edition.future && (
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/schedule" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-[#f4bd50] px-5 py-3 text-sm font-bold text-[#171007] transition hover:bg-[#ffd27d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f4bd50]">
                <CalendarDays size={16} aria-hidden="true" /> Schedule
              </Link>
              <Link to="/speakers" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-white/20 px-5 py-3 text-sm font-semibold text-zinc-100 transition hover:border-white/40 hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
                <Users size={16} aria-hidden="true" /> Meet the speakers
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function HistoryTimeline() {
  const [activeIndex, setActiveIndex] = useState(EDITIONS.length - 1);
  const reducedMotion = useReducedMotion();
  const mapRef = useRef(null);
  const canvasRef = useRef(null);
  const abbasRef = useRef(null);
  const rafRef = useRef(null);
  const activeIndexRef = useRef(EDITIONS.length - 1);
  const posRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const idleTimeRef = useRef(0);
  const idleAnimationRef = useRef(null);
  const idleAnimationFrameRef = useRef(0);
  const frameCountRef = useRef(0);
  const lastTickRef = useRef(0);
  const activeEdition = EDITIONS[activeIndex];

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  const getNodePixelPosition = useCallback((edition) => {
    const rect = mapRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };

    return {
      x: (edition.pos.x / 100) * rect.width,
      y: (edition.pos.y / 100) * rect.height + ABBAS_TARGET_OFFSET_Y,
    };
  }, []);

  const setSprite = useCallback((name, frame) => {
    const sprite = SPRITE_SETS[name][frame % SPRITE_SETS[name].length];
    if (!abbasRef.current) return;
    abbasRef.current.style.backgroundPosition = `${sprite[0] * 32}px ${sprite[1] * 32}px`;
  }, []);

  const paintAbbas = useCallback(() => {
    if (!abbasRef.current) return;
    abbasRef.current.style.visibility = "visible";
    abbasRef.current.style.left = `${posRef.current.x}px`;
    abbasRef.current.style.top = `${posRef.current.y}px`;
  }, []);

  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const map = mapRef.current;
    if (!canvas || !map) return;

    const rect = map.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    const ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, rect.width, rect.height);

    ctx.fillStyle = "rgba(80,20,20,0.13)";
    for (let x = 0; x <= rect.width; x += 60) {
      for (let y = 0; y <= rect.height; y += 60) {
        ctx.beginPath();
        ctx.arc(x, y, 1, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    ctx.strokeStyle = "rgba(200,30,30,0.08)";
    ctx.lineWidth = 1;
    [0.22, 0.78].forEach((ratio) => {
      ctx.beginPath();
      ctx.moveTo(0, rect.height * ratio);
      ctx.lineTo(rect.width, rect.height * ratio);
      ctx.stroke();
    });

    ctx.font = "700 8px monospace";
    ctx.fillStyle = "rgba(200,30,30,0.15)";
    ctx.letterSpacing = "2px";
    ctx.fillText("SECTOR-A", rect.width * 0.2, rect.height * 0.18);
    ctx.fillText("SECTOR-B", rect.width * 0.48, rect.height * 0.88);
    ctx.fillText("SECTOR-C", rect.width * 0.7, rect.height * 0.2);

    ctx.strokeStyle = "rgba(200,30,30,0.18)";
    EDITIONS.forEach((edition) => {
      const x = (edition.pos.x / 100) * rect.width;
      const y = (edition.pos.y / 100) * rect.height;
      ctx.beginPath();
      ctx.moveTo(x - 10, y);
      ctx.lineTo(x + 10, y);
      ctx.moveTo(x, y - 10);
      ctx.lineTo(x, y + 10);
      ctx.stroke();
    });
  }, []);

  useLayoutEffect(() => {
    const map = mapRef.current;
    if (!map) return undefined;

    const initialize = () => {
      const start = getNodePixelPosition(EDITIONS[activeIndexRef.current]);
      posRef.current = start;
      targetRef.current = start;
      paintAbbas();
      setSprite("idle", 0);
      drawCanvas();
    };

    initialize();
    const resizeObserver = new ResizeObserver(() => {
      drawCanvas();
      targetRef.current = getNodePixelPosition(EDITIONS[activeIndexRef.current]);
      if (reducedMotion) {
        posRef.current = targetRef.current;
        paintAbbas();
      }
    });
    resizeObserver.observe(map);

    return () => {
      resizeObserver.disconnect();
    };
  }, [drawCanvas, getNodePixelPosition, paintAbbas, setSprite, reducedMotion]);

  useEffect(() => {
    if (reducedMotion) {
      posRef.current = targetRef.current;
      paintAbbas();
      setSprite("idle", 0);
      return;
    }
    const tick = (now) => {
      rafRef.current = window.requestAnimationFrame(tick);
      if (now - lastTickRef.current < 100) return;
      lastTickRef.current = now;
      frameCountRef.current += 1;

      const dx = targetRef.current.x - posRef.current.x;
      const dy = targetRef.current.y - posRef.current.y;
      const distance = Math.sqrt(dx ** 2 + dy ** 2);

      if (distance < 24) {
        idleTimeRef.current += 1;

        if (
          idleTimeRef.current > 10 &&
          idleAnimationRef.current === null &&
          Math.floor(Math.random() * 180) === 0
        ) {
          idleAnimationRef.current = Math.random() < 0.5 ? "sleeping" : "scratchSelf";
          idleAnimationFrameRef.current = 0;
        }

        if (idleAnimationRef.current === "sleeping") {
          if (idleAnimationFrameRef.current < 8) {
            setSprite("tired", 0);
          } else {
            setSprite("sleeping", Math.floor(idleAnimationFrameRef.current / 4));
          }
          idleAnimationFrameRef.current += 1;
          if (idleAnimationFrameRef.current > 192) {
            idleAnimationRef.current = null;
            idleAnimationFrameRef.current = 0;
          }
          return;
        }

        if (idleAnimationRef.current === "scratchSelf") {
          setSprite("scratchSelf", idleAnimationFrameRef.current);
          idleAnimationFrameRef.current += 1;
          if (idleAnimationFrameRef.current > 9) {
            idleAnimationRef.current = null;
            idleAnimationFrameRef.current = 0;
          }
          return;
        }

        setSprite("idle", 0);
        return;
      }

      idleAnimationRef.current = null;
      idleAnimationFrameRef.current = 0;

      if (idleTimeRef.current > 1) {
        setSprite("alert", 0);
        idleTimeRef.current -= 1;
        return;
      }

      const direction = getDirection(dx, dy);
      setSprite(direction, Math.floor(now / 120));

      const speed = Math.min(ABBAS_MAX_SPEED, distance * ABBAS_EASING_SPEED);
      posRef.current = {
        x: posRef.current.x + (dx / distance) * speed,
        y: posRef.current.y + (dy / distance) * speed,
      };
      paintAbbas();
    };

    rafRef.current = window.requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
    };
  }, [paintAbbas, setSprite, reducedMotion]);

  const handleNodeClick = (index) => {
    setActiveIndex(index);
    targetRef.current = getNodePixelPosition(EDITIONS[index]);
    if (reducedMotion) {
      posRef.current = targetRef.current;
      paintAbbas();
      setSprite("idle", 0);
    }
    idleTimeRef.current = 0;
    idleAnimationRef.current = null;
    idleAnimationFrameRef.current = 0;
  };

  return (
    <div className="relative z-10 w-full border-y border-white/[0.06] bg-[#07090f]/85">
      <style>
        {`
          @keyframes historyNodeRipple {
            from { transform: scale(1); opacity: 0.5; }
            to { transform: scale(1.5); opacity: 0; }
          }

          .history-node-pulse { animation: historyNodeRipple 3.5s ease-out infinite; }
          @media (prefers-reduced-motion: reduce) {
            .history-node-pulse { animation: none; }
          }

          .history-map {
            --history-map-height: ${MAP_HEIGHT_MOBILE}px;
          }

          @media (min-width: 640px) {
            .history-map {
              --history-map-height: ${MAP_HEIGHT}px;
            }
          }
        `}
      </style>

      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 pb-2 pt-4 sm:gap-4 sm:px-6">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400">
          // Event History
        </span>
        <div className="h-px flex-1 bg-white/[0.05]" />
        <span className="font-mono text-[8px] tracking-[0.16em] text-zinc-400 sm:text-[9px] sm:tracking-[0.2em]">
          2019 - 2026
        </span>
      </div>

      <p className="mx-auto max-w-7xl px-4 pb-4 pt-1 text-xs text-zinc-400 sm:px-6">Choose a year to explore</p>

      <div className="mx-auto max-w-7xl px-3 sm:px-6">
        <div
          ref={mapRef}
          className="history-map relative w-full overflow-hidden rounded-lg border border-white/[0.05] bg-[#07090f]"
          style={{
            height: "var(--history-map-height)",
            backgroundImage:
              "linear-gradient(rgba(200,30,30,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(200,30,30,0.05) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        >
          <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 z-0" />
          <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse at 83% 38%, rgba(244,189,80,0.075), transparent 38%)" }} />

          <svg
            className="pointer-events-none absolute inset-0 z-10 h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d={ROUTE_PATH}
              fill="none"
              stroke="#1a0808"
              strokeDasharray="6 6"
              strokeWidth="1.5"
            />
            <path
              d={ROUTE_PATH}
              fill="none"
              stroke="rgba(200,30,30,0.14)"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <path
              d={ROUTE_PATH}
              fill="none"
              stroke="rgba(239,68,68,0.6)"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>

          {EDITIONS.map((edition, index) => (
            <HistoryNode
              key={edition.year}
              edition={edition}
              isActive={activeIndex === index}
              onClick={() => handleNodeClick(index)}
            />
          ))}

          <div
            ref={abbasRef}
            className="pointer-events-none absolute z-30 -translate-x-1/2 -translate-y-1/2"
            aria-hidden="true"
            style={{
              visibility: "hidden",
              width: 32,
              height: 32,
              imageRendering: "pixelated",
              backgroundImage: `url(${abbasSprite})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "auto",
              filter: "drop-shadow(0 0 12px rgba(200,30,30,0.5))",
            }}
          />
        </div>
      </div>

      <div id="history-edition-details" aria-live="polite" aria-atomic="true" className="mx-auto max-w-7xl px-3 py-4 sm:px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeEdition.year}
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reducedMotion ? 0 : -6 }}
            transition={{ duration: reducedMotion ? 0 : 0.2 }}
          >
            <DetailPanel edition={activeEdition} />
          </motion.div>
        </AnimatePresence>
      </div>


        </div>
    
    
  );
}
