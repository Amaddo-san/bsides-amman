import { motion } from 'framer-motion';
import { Lock, Terminal, Cpu, Code2, Users } from 'lucide-react';
import { C } from '../constants';
import { FadeIn, Section, SectionHeading } from './Shared';

const VILLAGES = [
  { icon: Lock,    color: C.red,    title: 'Physical Security Village',  desc: 'Master lockpicking and physical penetration testing. Hands-on challenges for all skill levels.' },
  { icon: Terminal,color: C.green,  title: 'Offensive Security Village', desc: 'Red team tactics, exploitation techniques, and CTF challenges in a live attack-defense environment.' },
  { icon: Cpu,     color: C.amber,  title: 'Game Hacking Village',       desc: 'Reverse-engineer games, exploit memory vulnerabilities, and explore gaming meets security.' },
  { icon: Code2,   color: '#7c6fcd',title: 'Modern Technical Sessions',  desc: 'Practitioner-led talks on emerging threats and research — no vendor pitches, pure knowledge.' },
  { icon: Users,   color: '#3b9ede',title: 'Community Collaborations',   desc: 'Open space for networking, mentoring, and building the Jordanian cybersecurity ecosystem.' },
];

export default function About() {
  return (
    <Section
  id="about"
  className="relative overflow-hidden"
style={{ background: "#05070D" }}>
{/* Background blend */}
<div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_20%_10%,rgba(220,38,38,0.08),transparent_30%),radial-gradient(circle_at_85%_15%,rgba(22,163,74,0.06),transparent_28%),linear-gradient(to_bottom,rgba(5,7,13,1),rgba(5,7,13,0.96))]" />

{/* Top fade for smooth transition */}
<div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#05070D] to-transparent pointer-events-none" />

<div className="relative z-10">
      {/* Intro */}
      <div className="grid lg:grid-cols-2 gap-20 items-center mb-28">
        <FadeIn direction="right">
          <p className="text-xs font-mono tracking-[0.4em] uppercase mb-4" style={{ color: C.green }}>
            ▸ 01 / About
          </p>
          <h2
            className="text-5xl md:text-6xl font-black mb-6 leading-none"
            style={{ fontFamily: "'Bebas Neue', cursive", letterSpacing: '0.04em', color: C.white }}
          >
            Jordan's First<br />
            <span style={{ color: C.red }}>InfoSec</span> Conference
          </h2>
          <p className="text-base leading-relaxed mb-4" style={{ color: C.muted }}>
            BSides Amman is the <strong style={{ color: C.white }}>official Amman chapter</strong> of
            the global Security BSides community — the world's most grassroots information security
            event platform, and the{' '}
            <strong style={{ color: C.white }}>first infosec and hacking conference of its kind in Jordan</strong>.
          </p>
          <p className="text-base leading-relaxed mb-8" style={{ color: C.muted }}>
            Organized by the community, for the community. We create real opportunities to{' '}
            <strong style={{ color: C.white }}>present, participate, and educate</strong> in a
            vendor-neutral, intimate atmosphere that puts people over products.
          </p>
          <div className="flex flex-wrap gap-2">
            {['#VendorNeutral', '#CommunityDriven', '#OpenToAll', '#Jordan'].map(tag => (
              <span
                key={tag}
                className="text-xs font-mono px-3 py-1.5"
                style={{ border: `1px solid ${C.border}`, color: C.dim }}
              >
                {tag}
              </span>
            ))}
          </div>
        </FadeIn>

        {/* Stats block */}
        <FadeIn direction="left" delay={0.1}>
          <div
            className="grid grid-cols-2 gap-3"
            style={{ border: `1px solid ${C.border}`, padding: '2rem', background: C.bgCard }}
          >
            {[
              { value: '#1',   label: 'InfoSec Conf in Jordan', color: C.red   },
              { value: '5+',   label: 'Specialized Villages',   color: C.amber },
              { value: '100%', label: 'Vendor Neutral',         color: C.green },
              { value: '∞',    label: 'Community Knowledge',    color: '#7c6fcd' },
            ].map(s => (
           <motion.div
  key={s.label}
  whileHover={{ y: -6, scale: 1.03 }}
  transition={{ duration: 0.25 }}
  className="p-8 rounded-2xl cursor-default"
  style={{
    border: `1px solid ${C.border}`,
    background: `linear-gradient(135deg, ${C.bgCardAlt}, rgba(255,255,255,0.03))`,
    boxShadow: `0 0 0 rgba(0,0,0,0)`,
  }}
>
                <div
                  className="text-3xl font-black mb-1"
                  style={{ fontFamily: "'Bebas Neue', cursive", color: s.color }}
                >
                  {s.value}
                </div>
                <div className="text-xs font-mono" style={{ color: C.muted }}>{s.label}</div>
              </motion.div>
            ))}
          </div>
        </FadeIn>
      </div>

      {/* Villages */}
      <SectionHeading
        label="02 / Villages"
        title="Hack Every Domain"
        subtitle="Five specialized villages covering every corner of the security landscape."
      />
<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {VILLAGES.map((v, i) => {
          const Icon = v.icon;
          return (
            <FadeIn key={v.title} delay={i * 0.07}>
         <motion.div
  whileHover={{
    y: -8,
    scale: 1.02,
    borderColor: v.color,
    boxShadow: `0 0 35px ${v.color}26`,
  }}
  transition={{ duration: 0.28 }}
  className="group relative p-8 h-full rounded-2xl overflow-hidden cursor-default"
  style={{
    background: `linear-gradient(135deg, ${C.bgCard}, rgba(255,255,255,0.025))`,
    border: `1px solid ${C.border}`,
  }}
>
  <div
    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
    style={{
      background: `radial-gradient(circle at top left, ${v.color}18, transparent 45%)`,
    }}
  />
  <div className="relative z-10">
                <div
                  className="w-10 h-10 flex items-center justify-center mb-4"
                  style={{ border: `1px solid ${v.color}30`, background: `${v.color}12` }}
                >
                  <Icon size={18} style={{ color: v.color }} />
                </div>
                <h3 className="text-base font-bold mb-2" style={{ color: C.white }}>{v.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: C.muted }}>{v.desc}</p>
                </div>
              </motion.div>
            </FadeIn>
          );
        })}
        </div>
    </div>
  </Section>
);
}
