import { useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import abbas from "../assets/1.png";

const messages = [
  "Welcome to BSides Amman 👾",
  "Ready to hack the planet?",
  "Check the schedule before it’s too late.",
  "Don’t forget to register.",
  "Cybersecurity is better with community.",
  "See you in Amman!"
];

export default function AbbasCard() {
  const [messageIndex, setMessageIndex] = useState(0);
  const [isTalking, setIsTalking] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

const rotateX = useTransform(mouseY, [-100, 100], [10, -10]);
const rotateY = useTransform(mouseX, [-100, 100], [-10, 10]);

const handleMouseMove = (e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;

  mouseX.set(x);
  mouseY.set(y);
};

const handleMouseLeave = () => {
  mouseX.set(0);
  mouseY.set(0);
};

  const handleTalk = () => {
    const nextIndex = (messageIndex + 1) % messages.length;
    setMessageIndex(nextIndex);
    setIsTalking(true);

    setTimeout(() => {
      setIsTalking(false);
    }, 700);
  };

  return (
    <div className="relative w-full rounded-[2rem] border border-red-500/30 bg-white/[0.04] p-8 shadow-2xl backdrop-blur-2xl overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(220,38,38,0.22),transparent_42%)]" />

      <div className="relative z-10">
        <div className="mb-5 flex items-center justify-between text-xs font-mono text-zinc-400">
          <span>ABBAS_ASSISTANT</span>
          <span className="rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-green-400">
            ONLINE
          </span>
        </div>

        <div className="mb-5 rounded-2xl border border-white/10 bg-black/40 px-4 py-3 font-mono text-sm text-zinc-200">
          <span className="text-green-400">&gt;</span> {messages[messageIndex]}
        </div>

       <motion.button
  type="button"
  onClick={handleTalk}
  onMouseMove={handleMouseMove}
  onMouseLeave={handleMouseLeave}
  style={{
    rotateX,
    rotateY,
    transformStyle: "preserve-3d",
  }}
  className="group mx-auto block cursor-pointer"
  aria-label="Talk with Abbas"
>
  <div className="animate-[float_6s_ease-in-out_infinite]">
    <img
      src={abbas}
      alt="Abbas character"
      draggable={false}
      className={`mx-auto w-64 md:w-80 select-none transition-all duration-300 drop-shadow-[0_0_40px_rgba(220,38,38,0.45)]
        ${isTalking ? "scale-110 rotate-1" : "hover:scale-105"}
      `}
    />
  </div>
</motion.button>

        <p className="mt-5 text-center text-xs font-mono uppercase tracking-[0.25em] text-zinc-500">
          Click Abbas to talk
        </p>
      </div>
    </div>
  );
}