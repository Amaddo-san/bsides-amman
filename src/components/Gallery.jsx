import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { C } from '../constants';
import { FadeIn, Section, SectionHeading } from './Shared';

const HERO = {
  type: 'image',
  src: '/img5.png',
  title: 'BSides Amman 2025',
};

const MEDIA = [
  { type: 'image', src: '/img1.png', title: 'BSides Amman 2025' },
  { type: 'image', src: '/img2.png', title: 'Community Moments' },
  { type: 'image', src: '/img3.png', title: 'Talks & Sessions' },
  { type: 'image', src: '/img4.png', title: 'Networking' },
  { type: 'image', src: '/img6.png', title: 'Group Photo' },
  { type: 'video', src: '/vid1.png.mp4', title: 'Event Highlights' },
  { type: 'video', src: '/vid3.mb3.mp4', title: 'BSides Moments' },
];

const ALL_MEDIA = [HERO, ...MEDIA];

export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState(null);
  const activeItem = activeIndex !== null ? ALL_MEDIA[activeIndex] : null;

  const openItem = (index) => setActiveIndex(index);
  const closeItem = () => setActiveIndex(null);

  const nextItem = () => {
    setActiveIndex((prev) => (prev + 1) % ALL_MEDIA.length);
  };

  const prevItem = () => {
    setActiveIndex((prev) => (prev - 1 + ALL_MEDIA.length) % ALL_MEDIA.length);
  };

  return (
    <Section
      id="gallery"
      style={{
        background: 'radial-gradient(circle at top, #0a0f1a 0%, #05070D 60%, #000 100%)',
      }}
    >
      <div className="relative z-10">
        <SectionHeading
          label="06 / Gallery"
          title="BSides Amman 2025"
          subtitle="A glimpse into last year's event — moments, talks, and community energy."
        />

        {/* Big image */}
        <FadeIn>
          <motion.button
            type="button"
            onClick={() => openItem(0)}
            whileHover={{ scale: 1.01 }}
            className="group relative mb-8 h-[800px] w-full overflow-hidden rounded-2xl border text-left"
            style={{ borderColor: 'rgba(239,68,68,0.45)' }}
          >
            <img
              src={HERO.src}
              alt={HERO.title}
              className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />

            <div className="absolute left-6 top-6 rounded-full border border-red-500/40 bg-black/50 px-3 py-1 font-mono text-xs text-red-400">
              FEATURED MEMORY
            </div>

            <div className="absolute bottom-6 left-6">
              <h3 className="text-2xl font-bold text-white">BSides Amman 2025</h3>
              <p className="text-sm text-gray-300">Click to open gallery</p>
            </div>
          </motion.button>
        </FadeIn>

        {/* Media grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-7">
          {MEDIA.map((item, i) => (
            <FadeIn key={item.src} delay={i * 0.04}>
              <motion.button
                type="button"
                onClick={() => openItem(i + 1)}
                whileHover={{ y: -6 }}
                className="group relative h-[300px] w-full overflow-hidden rounded-xl border bg-black text-left"
                style={{ borderColor: 'rgba(255,255,255,0.1)' }}
              >
                {item.type === 'image' ? (
                  <img
                    src={item.src}
                    alt={item.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />
                ) : (
                  <video
                    src={item.src}
                    muted
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />
                )}

                <div className="absolute inset-0 bg-black/35 transition group-hover:bg-black/15" />

                {item.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-500/90 text-white shadow-[0_0_25px_rgba(239,68,68,0.7)]">
                      <Play size={24} fill="white" />
                    </div>
                  </div>
                )}

                <div className="absolute bottom-4 left-4">
                  <p className="font-mono text-xs text-white">{item.title}</p>
                </div>
              </motion.button>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            className="fixed inset-0 z-[999] flex items-center justify-center bg-black/90 p-5 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              onClick={closeItem}
              className="absolute right-6 top-6 rounded-full border border-white/15 bg-white/5 p-3 text-white hover:bg-red-500"
            >
              <X size={22} />
            </button>

            <button
              onClick={prevItem}
              className="absolute left-6 top-1/2 -translate-y-1/2 rounded-full border border-white/15 bg-white/5 p-3 text-white hover:bg-red-500"
            >
              <ChevronLeft size={26} />
            </button>

            <button
              onClick={nextItem}
              className="absolute right-6 top-1/2 -translate-y-1/2 rounded-full border border-white/15 bg-white/5 p-3 text-white hover:bg-red-500"
            >
              <ChevronRight size={26} />
            </button>

            <motion.div
              className="relative max-h-[85vh] w-full max-w-6xl overflow-hidden rounded-2xl border border-white/10 bg-black"
              initial={{ scale: 0.94, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.94, y: 20 }}
            >
              {activeItem.type === 'image' ? (
                <img
                  src={activeItem.src}
                  alt={activeItem.title}
                  className="max-h-[85vh] w-full object-contain"
                />
              ) : (
                <video
                  src={activeItem.src}
                  controls
                  autoPlay
                  className="max-h-[85vh] w-full bg-black object-contain"
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}