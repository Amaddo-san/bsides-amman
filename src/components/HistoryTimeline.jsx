import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import abbasSprite from "../assets/abbas-sprite.png";

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
    desc: "The next operation is classified. CFP and registration details incoming.",
    tags: ["Coming Soon"],
    date: "2026",
    location: "TBA",
    status: "Classified",
    future: true,
    pos: { x: 83, y: 38 },
  },
];

const SPRITE_SETS = {
  idle: [[-3, -3]],
  alert: [[-7, -3]],
  scratchSelf: [[-5, 0], [-6, 0], [-7, 0]],
  tired: [[-3, -2]],
  sleeping: [[-2, 0], [-2, -1]],
  N: [[-1, -2], [-1, -3]],
  NE: [[0, -2], [0, -3]],
  E: [[-3, 0], [-3, -1]],
  SE: [[-5, -1], [-5, -2]],
  S: [[-6, -3], [-7, -2]],
  SW: [[-5, -3], [-6, -1]],
  W: [[-4, -2], [-4, -3]],
  NW: [[-1, 0], [-1, -1]],
};

const MAP_HEIGHT = 260;
const MAP_HEIGHT_MOBILE = 300;
const ROUTE_PATH = "M 13 60 C 20 52, 27 40, 35 33 S 52 50, 62 65 S 75 45, 83 38";
const ABBAS_TARGET_OFFSET_Y = -34;
const ABBAS_MAX_SPEED = 20;
const ABBAS_EASING_SPEED = 0.50;

function getDirection(dx, dy) {
  const angle = (Math.atan2(dy, dx) * 180) / Math.PI;

  if (angle > -22.5 && angle <= 22.5) return "E";
  if (angle > 22.5 && angle <= 67.5) return "SE";
  if (angle > 67.5 && angle <= 112.5) return "S";
  if (angle > 112.5 && angle <= 157.5) return "SW";
  if (angle > 157.5 || angle <= -157.5) return "W";
  if (angle > -157.5 && angle <= -112.5) return "NW";
  if (angle > -112.5 && angle <= -67.5) return "N";
  return "NE";
}

function HistoryNode({ edition, isActive, onClick }) {
  const muted = edition.future;
  const ringColor = muted
    ? "rgba(255,255,255,0.12)"
    : isActive
      ? "rgba(200,30,30,0.5)"
      : "rgba(200,30,30,0.25)";
  const coreGlow = isActive ? "0 0 24px rgba(200,30,30,0.72)" : "0 0 14px rgba(200,30,30,0.36)";

  return (
    <button
      type="button"
      onClick={onClick}
      className="group absolute z-20 -translate-x-1/2 -translate-y-1/2 focus:outline-none"
      style={{ left: `${edition.pos.x}%`, top: `${edition.pos.y}%` }}
      aria-label={`BSides Amman ${edition.edition} ${edition.year}`}
    >
      <div
        className="relative flex h-11 w-11 items-center justify-center rounded-full border bg-[#07090f]/80 transition duration-300 sm:h-14 sm:w-14"
        style={{ borderColor: ringColor }}
      >
        <span
          className="absolute inset-[6px] rounded-full border"
          style={{ borderColor: muted ? "rgba(255,255,255,0.08)" : "rgba(200,30,30,0.22)", borderWidth: 0.5 }}
        />

        {!muted && (
          <>
            <span
              className="absolute inset-0 rounded-full border"
              style={{
                animation: "historyNodeRipple 2s ease-out infinite",
                borderColor: isActive ? "rgba(200,30,30,0.45)" : "rgba(200,30,30,0.2)",
              }}
            />
            <span
              className="absolute inset-0 rounded-full border"
              style={{
                animation: "historyNodeRipple 2s ease-out infinite 0.7s",
                borderColor: isActive ? "rgba(200,30,30,0.32)" : "rgba(200,30,30,0.14)",
              }}
            />
          </>
        )}

        <span
          className="relative z-10 flex h-6 w-6 items-center justify-center rounded-full font-mono text-[9px] font-bold sm:h-7 sm:w-7 sm:text-[10px]"
          style={{
            background: muted ? "#111" : "#c81e1e",
            color: muted ? "rgba(255,255,255,0.28)" : "#fff",
            boxShadow: muted ? "none" : coreGlow,
          }}
        >
          {edition.year.slice(2)}
        </span>
      </div>

      <div className="absolute left-1/2 top-full mt-1.5 -translate-x-1/2 whitespace-nowrap text-center sm:mt-2">
        <span
          className="block font-mono text-[11px] font-bold leading-none sm:text-[13px]"
          style={{ color: muted ? "rgba(255,255,255,0.22)" : "#c81e1e" }}
        >
          {edition.year}
        </span>
        <span className="mt-1 hidden font-mono text-[8px] uppercase tracking-[0.2em] text-white/20 sm:block">
          {edition.edition}
        </span>
      </div>
    </button>
  );
}

function DetailPanel({ edition }) {
  return (
    <div className="relative overflow-hidden border border-[#141414] border-l-[#c81e1e] bg-[#0a0c12] px-4 py-4 sm:px-5" style={{ borderLeftWidth: 2 }}>
      <span
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 -rotate-12 text-5xl font-black uppercase sm:right-8 sm:text-7xl"
        style={{ fontFamily: "'Bebas Neue', cursive", color: "rgba(200,30,30,0.04)" }}
      >
        Classified
      </span>

      <div className="relative z-10 flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-5">
        <span
          className="shrink-0 text-[54px] font-black leading-none sm:text-[64px]"
          style={{ fontFamily: "'Bebas Neue', cursive", color: "rgba(200,30,30,0.2)" }}
        >
          {edition.year}
        </span>

        <div className="min-w-0 flex-1 pt-0 sm:pt-1">
          <p className="font-mono text-[9px] uppercase tracking-[0.26em] text-[#c81e1e]">
            {edition.edition}
          </p>
          <p className="mt-2 max-w-3xl text-[12px] leading-6 text-zinc-500 sm:text-[13px]">
            {edition.desc}
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            {edition.tags.map((tag) => (
              <span
                key={tag}
                className="border border-red-500/25 bg-red-950/20 px-2 py-1 font-mono text-[8px] uppercase tracking-wider text-red-300/70 sm:px-2.5 sm:text-[9px]"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-4 grid gap-2 font-mono text-[8px] uppercase tracking-[0.16em] text-white/15 sm:grid-cols-3 sm:text-[9px] sm:tracking-[0.18em]">
            <span>DATE <b className="font-normal text-white/25">{edition.date}</b></span>
            <span>LOCATION <b className="font-normal text-white/25">{edition.location}</b></span>
            <span>
              STATUS{" "}
              <b className={`font-normal ${edition.future ? "text-red-400/70" : "text-white/25"}`}>
                {edition.status}
              </b>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HistoryTimeline() {
  const [activeIndex, setActiveIndex] = useState(0);
  const mapRef = useRef(null);
  const canvasRef = useRef(null);
  const abbasRef = useRef(null);
  const rafRef = useRef(null);
  const activeIndexRef = useRef(0);
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

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return undefined;

    const initialize = () => {
      const start = getNodePixelPosition(EDITIONS[0]);
      posRef.current = start;
      targetRef.current = start;
      paintAbbas();
      setSprite("idle", 0);
      drawCanvas();
    };

    const timeoutId = window.setTimeout(initialize, 150);
    const resizeObserver = new ResizeObserver(() => {
      drawCanvas();
      targetRef.current = getNodePixelPosition(EDITIONS[activeIndexRef.current]);
    });
    resizeObserver.observe(map);

    return () => {
      window.clearTimeout(timeoutId);
      resizeObserver.disconnect();
    };
  }, [drawCanvas, getNodePixelPosition, paintAbbas, setSprite]);

  useEffect(() => {
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
  }, [paintAbbas, setSprite]);

  const handleNodeClick = (index) => {
    setActiveIndex(index);
    targetRef.current = getNodePixelPosition(EDITIONS[index]);
    idleTimeRef.current = 0;
    idleAnimationRef.current = null;
    idleAnimationFrameRef.current = 0;
  };

  return (
    <div className="relative z-10 w-full border-y border-white/[0.06] bg-[#07090f]/85">
      <style>
        {`
          @keyframes historyScan {
            0% { transform: translateY(-12px); opacity: 0; }
            12% { opacity: 1; }
            100% { transform: translateY(calc(var(--history-map-height) + 12px)); opacity: 0; }
          }

          @keyframes historyRouteSignal {
            from { stroke-dashoffset: 36; }
            to { stroke-dashoffset: 0; }
          }

          @keyframes historyNodeRipple {
            from { transform: scale(0.85); opacity: 0.8; }
            to { transform: scale(1.7); opacity: 0; }
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
        <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/25">
          // Event History
        </span>
        <div className="h-px flex-1 bg-white/[0.05]" />
        <span className="font-mono text-[8px] tracking-[0.16em] text-white/20 sm:text-[9px] sm:tracking-[0.2em]">
          2019 - 2026
        </span>
      </div>

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
          <span
            className="pointer-events-none absolute left-0 right-0 top-0 z-10 h-0.5 bg-red-500/10"
            style={{ animation: "historyScan 4s linear infinite" }}
          />

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
              stroke="rgba(200,30,30,0.58)"
              strokeDasharray="12 24"
              strokeWidth="1.6"
              strokeLinecap="round"
              style={{ animation: "historyRouteSignal 2.8s linear infinite", willChange: "stroke-dashoffset" }}
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

      <div className="mx-auto max-w-7xl px-3 py-4 sm:px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeEdition.year}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3 }}
          >
            <DetailPanel edition={activeEdition} />
          </motion.div>
        </AnimatePresence>
      </div>


        </div>
    
    
  );
}
