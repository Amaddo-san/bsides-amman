import { motion } from 'framer-motion';
import { Linkedin } from 'lucide-react';
import { C } from '../constants';
import { FadeIn, Section, SectionHeading } from './Shared';

const TEAM = [
  { name: 'Mohammad Al-Adwan', role: 'Lead Organizer', photo: '/adwan.jpg', linkedin: 'https://www.linkedin.com/in/mohammad-al-adwan-9a6457260?utm_source=share_via&utm_content=profile&utm_medium=member_ios#' },
  { name: 'Laila Alzoubi', role: 'Advisor', photo: '/layla.jpg', linkedin: 'https://www.linkedin.com/in/laylaalzoubi?utm_source=share_via&utm_content=profile&utm_medium=member_ios' },
  { name: 'Rami Ahmad', role: 'Advisor', photo: '/rami.jpg', linkedin: 'https://www.linkedin.com/in/ramiahmad?utm_source=share_via&utm_content=profile&utm_medium=member_ios' },
  { name: 'Abdallah Al-Abbadi', role: 'Advisor', photo: '/abdnawaf.jpg', linkedin: 'https://www.linkedin.com/in/abdullah-nawaf-6ab7301b0?utm_source=share_via&utm_content=profile&utm_medium=member_ios' },
  { name: 'Orwa Atyat', role: 'Advisor', photo: '/urwah.jpg', linkedin: 'https://www.linkedin.com/in/urwah-atiyat-1b9800198?utm_source=share_via&utm_content=profile&utm_medium=member_ios' },
  { name: 'Abdalhameed Dradkeh', role: 'Organizer', photo: '/abd.jpg', linkedin: 'https://www.linkedin.com/in/abdalhmeeddradkeh?utm_source=share_via&utm_content=profile&utm_medium=member_ios' },
  { name: 'Hamza Nour', role: 'Organizer', photo: '/hamza.jpg', linkedin: 'https://www.linkedin.com/in/hussein-abuali?utm_source=share_via&utm_content=profile&utm_medium=member_ios' },
  { name: 'Hussein Abu Ali', role: 'Organizer', photo: '/hussen.jpg', linkedin: 'https://www.linkedin.com/in/hussein-abuali?utm_source=share_via&utm_content=profile&utm_medium=member_ios' },
  { name: 'Abdulrahman Nahhas', role: 'Organizer', photo: '/nahhas.jpg', linkedin: 'https://www.linkedin.com/in/abdelrahman-al-nahhas-a48564208?utm_source=share_via&utm_content=profile&utm_medium=member_ios' },
  { name: 'Yousof Nahya', role: 'Organizer', photo: '/yousof.jpg', linkedin: 'https://www.linkedin.com/in/yousof-nahya?utm_source=share_via&utm_content=profile&utm_medium=member_ios' },
  { name: 'Farah Qamhawi', role: 'Oraganizer', photo: '/farah.jpg', linkedin: 'https://www.linkedin.com/in/farah-qamhawi?utm_source=share_via&utm_content=profile&utm_medium=member_ios' },
  { name: 'Lana Barakat', role: 'Organizer', photo: '/lana.jpg', linkedin: 'https://www.linkedin.com/in/lana-barakat-748a7b241?utm_source=share_via&utm_content=profile&utm_medium=member_ios' },
  { name: 'Shahed Mehdawi', role: 'Media', photo: '/shahed.jpg', linkedin: 'https://www.linkedin.com/in/shahedmehdawi?utm_source=share_via&utm_content=profile&utm_medium=member_ios' },
  { name: 'Ahmad Abu Tair', role: 'Media', photo: '/ahmad.jpg', linkedin: 'https://www.linkedin.com/in/ahmad-abu-tair-935209311?utm_source=share_via&utm_content=profile&utm_medium=member_ios' },
];

const ROLE_STYLES = {
  'Lead Organizer': { color: '#ef4444', glow: 'rgba(239,68,68,0.4)' },
  'Advisor': { color: '#22d3ee', glow: 'rgba(34,211,238,0.4)' },
  'Organizer': { color: '#a855f7', glow: 'rgba(168,85,247,0.4)' },
  'Media': { color: '#d4af37', glow: 'rgba(212,175,55,0.2)' },
};

export default function Team() {
  return (
    <Section id="team" style={{ background: C.black}}>
      {/* Cyber background */}
<div className="pointer-events-none absolute inset-0 overflow-hidden">
  <div
    className="absolute inset-0 opacity-[0.18]"
    style={{
      backgroundImage: `
        linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)
      `,
      backgroundSize: '42px 42px',
    }}
  />

  <div
    className="absolute left-1/2 top-10 h-[420px] w-[420px] -translate-x-1/2 rounded-full blur-[90px]"
    style={{
      background: 'rgba(239,68,68,0.16)',
    }}
  />

  <div
    className="absolute -left-32 top-1/3 h-[360px] w-[360px] rounded-full blur-[100px]"
    style={{
      background: 'rgba(34,211,238,0.12)',
    }}
  />

  <div
    className="absolute -right-32 bottom-20 h-[360px] w-[360px] rounded-full blur-[100px]"
    style={{
      background: 'rgba(168,85,247,0.12)',
    }}
  />
</div>
<div className="relative z-10">

      <SectionHeading
        label="05 / Team"
        title="Meet The Team"
        subtitle="The BSidesAmman 2026 team is made up of experienced cybersecurity enthusiasts with previous experience in organizing Jordan’s largest CTF competitions and cybersecurity events."
      />

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {TEAM.map((member, i) => {
  const style = ROLE_STYLES[member.role] || ROLE_STYLES['Organizer'];

  return (
    <FadeIn key={member.name} delay={i * 0.04}>
      <motion.div
        whileHover={{
          y: -8,
          boxShadow: `0 0 25px ${style.glow}`,
          borderColor: style.color,
        }}
        transition={{ duration: 0 }}
        className="group relative overflow-hidden rounded-2xl p-5 text-center transition-all duration-300"
        style={{
          background: 'rgba(10,15,25,0.65)',
          border: `1px solid ${style.color}`,
        }}
      >
          <div
    className="absolute top-0 left-0 w-full h-[2px]"
    style={{
      background: `linear-gradient(90deg, transparent, ${style.color}, transparent)`
    }}
  />
              <div
  className="relative mx-auto mb-4 h-28 w-28 rounded-full overflow-hidden"
  style={{
    boxShadow: `0 0 20px ${style.glow}`,
    border: `2px solid ${style.color}`,
  }}
>
  <img
    src={member.photo}
    alt={member.name}
    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
  />
</div>

              <h3 className="mb-1 text-sm font-bold" style={{ color: C.white }}>
                {member.name}
              </h3>

             <p
  className="mb-4 text-xs font-mono"
  style={{ color: style.color }}
>
  {member.role}
</p>

<a
  href={member.linkedin}
  target="_blank"
  rel="noreferrer"
  className="group/link inline-flex items-center gap-2 px-3 py-1.5 text-xs rounded-full border transition-all duration-300"
  style={{
    borderColor: 'rgba(255,255,255,0.15)',
    color: '#9ca3af', // gray-400
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.borderColor = style.color;
    e.currentTarget.style.color = style.color;
    e.currentTarget.style.boxShadow = `0 0 10px ${style.glow}`;
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
    e.currentTarget.style.color = '#9ca3af';
    e.currentTarget.style.boxShadow = 'none';
  }}
>
  <Linkedin size={13} />
  LinkedIn
</a>
            </motion.div>
          </FadeIn>
  );
})}
</div>
      </div>
    </Section>
  );
}