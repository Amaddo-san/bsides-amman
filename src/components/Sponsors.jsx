import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink, Handshake, Mail } from 'lucide-react';
import { C } from '../constants';
import { FadeIn, Section, SectionHeading } from './Shared';

const TIERS = [
  {
    tier: 'Diamond',
    price: '2500$',
    color: '#7dd3fc',
    summary: 'Maximum visibility across talks, event materials, booths, and social media.',
    benefits: [
      'Recognition in the event opening talks and between sessions',
      'Largest booth available during the event',
      '10 VIP seats',
      "Registration bag swag participation. You provide the swag, and we'll take care of the rest",
      'Largest size logo on the ticket, website, organizer t-shirts, and social media posts',
      'Mention in all social media posts',
      'Thank you post on social media accounts',
      'Strong promotional presence through BSidesAmman community visibility',
    ],
  },
  {
    tier: 'Gold',
    color: C.amber,
    price: '1500$',
    summary: 'High-impact sponsor presence throughout the event and communication channels.',
    benefits: [
      'Recognition in the event opening talks and between sessions',
      'Booth available during the event',
      '5 VIP seats',
      "Registration bag swag participation. You provide the swag, and we'll take care of the rest",
      'Logo on the ticket, website, organizer t-shirts, and social media posts',
      'Mention in all social media posts',
      'Thank you post on social media accounts',
      'Strong promotional presence through BSidesAmman community visibility',
    ],
  },
  {
    tier: 'Silver',
    color: '#cbd5e1',
    price: '1000$',
    summary: 'A practical package for visible support during the event and online promotion.',
    benefits: [
      'Recognition in the event opening talks and between sessions',
      'Small booth available during the event',
      '3 VIP seats',
      "Registration bag swag participation. You provide the swag, and we'll take care of the rest",
      'Small size logo on the ticket, website, organizer t-shirts, and social media posts',
      'Mention in all social media posts',
      'Thank you post on social media accounts',
      'Strong promotional presence through BSidesAmman community visibility',
    ],
  },
  {
    tier: 'Bronze',
    color: '#d97706',
    price: '500$',
    summary: 'An accessible sponsorship option for supporting the BSides Amman community.',
    benefits: [
      'Recognition in the event opening talks and between sessions',
      'Booth available during the event',
      '2 VIP seats',
      "Registration bag swag participation. You provide the swag, and we'll take care of the rest",
      'Small logo on the ticket, website, organizer t-shirts, and social media posts',
      'Mention in all social media posts',
      'Thank you post on social media accounts',
      'Strong promotional presence through BSidesAmman community visibility',
    ],
  },
];

const SUPPORTER_GROUPS = [
  {
    label: 'Strategic Partners',
    title: 'Community & Academic Partners',
    description: 'Partners helping us build a stronger local ecosystem for security learning, open knowledge, and student communities.',
    columns: 'lg:grid-cols-2',
    supporters: [
      {
        name: 'National Cyber Security Center',
        role: 'Strategic Partner',
        image: 'NCSC.png',
        tier: 'Strategic Partner',
        accent: C.red,
        href: 'https://ncsc.jo/Default/Ar',
        description:
          'Jordan\'s national cybersecurity center, supporting cyber resilience, awareness, and stronger coordination across the local security ecosystem.',
      },
      {
        name: 'Jordan Open Source Association',
        role: 'Strategic Partner',
        image: 'JOSA.png',
        tier: 'Strategic Partner',
        accent: C.red,
        href: 'https://josa.ngo/',
        description:
          'A Jordanian not-for-profit working toward a better Jordan through openness in technology, open knowledge, privacy, and digital security.',
      },
      {
        name: 'University of Jordan',
        role: 'Academic Partner',
        image: 'University of Jordan.png',
        tier: 'Partnership',
        accent: C.green,
        href: 'https://www.ju.edu.jo/',
        description:
          'Jordan\'s oldest public university, supporting academic growth, research, and student communities from its campus in Amman.',
      },
    ],
  },
  {
    label: 'Diamond Sponsors',
    title: 'Diamond Sponsors',
    description: 'Top-tier sponsors supporting the conference experience, community reach, and practical cybersecurity education.',
    columns: 'lg:grid-cols-2',
    supporters: [
      {
        name: 'Maza',
        role: 'Diamond Sponsor',
        image: 'maza.png',
        tier: 'Diamond',
        accent: '#7dd3fc',
        href: 'https://www.maza.vc/',
        description:
          'A venture capital firm investing in technical teams building global products in SaaS, enterprise software, AI infrastructure, robotics, and biotech.',
      },
      {
        name: 'Modern Security',
        role: 'Diamond Sponsor',
        image: 'modern.jpg',
        tier: 'Diamond',
        accent: '#7dd3fc',
        href: 'https://www.modernsecurity.io/',
        description:
          'An AI and cybersecurity training institute focused on practical security education, including hands-on AI security, secure design, and threat modeling.',
      },
      {
        name: 'OffSec',
        role: 'Diamond Sponsor',
        image: 'offsec.png',
        tier: 'Diamond',
        accent: '#7dd3fc',
        href: 'https://www.offsec.com/',
        description:
          'A global cybersecurity training and certification provider known for hands-on security education, OSCP, Kali Linux, and practical learning paths.',
      },
    ],
  },
  {
    label: 'Gold Sponsor',
    title: 'Gold Sponsor',
    description: 'A high-impact sponsor backing hands-on cybersecurity learning for the next generation of practitioners.',
    columns: 'lg:grid-cols-1',
    supporters: [
      {
        name: 'Hack Defender Academy',
        role: 'Gold Sponsor',
        image: 'hackdefender.png',
        tier: 'Gold',
        accent: C.amber,
        href: 'https://www.linkedin.com/company/hack-defender-academy/',
        description:
          'A cybersecurity training academy preparing future malware analysts, red team members, reverse engineers, and threat intelligence analysts through CCWD and region-based CTFs.',
      },
    ],
  },
  {
    label: 'Bronze Sponsor',
    title: 'Bronze Sponsor',
    description: 'A community supporter helping make practical cybersecurity learning more accessible to the BSides Amman audience.',
    columns: 'lg:grid-cols-1',
    supporters: [
      {
        name: 'CyberDefenders',
        role: 'Bronze Sponsor',
        image: 'cyberdef.png',
        tier: 'Bronze',
        accent: '#d97706',
        href: 'https://cyberdefenders.org/',
        description:
          'A blue-team training platform helping SOC analysts and defenders build practical skills through cyber ranges, investigations, and certifications.',
      },
    ],
  },
];

function SupporterCard({ supporter, index, featured = false }) {
  return (
    <FadeIn delay={index * 0.08}>
      <motion.article
        whileHover={{
          y: -5,
          borderColor: `${supporter.accent}80`,
          boxShadow: `0 18px 45px ${supporter.accent}18`,
        }}
        transition={{ duration: 0.22 }}
        className="flex h-full flex-col overflow-hidden rounded-lg border"
        style={{
          background: 'rgba(10,12,18,0.78)',
          borderColor: 'rgba(255,255,255,0.08)',
        }}
      >
        <div
          className={`${featured ? 'min-h-52' : 'min-h-44'} flex items-center justify-center border-b bg-white p-7`}
          style={{ borderColor: 'rgba(255,255,255,0.08)' }}
        >
          <img
            src={`${import.meta.env.BASE_URL}${supporter.image}`}
            alt={`${supporter.name} logo`}
            className={`${featured ? 'max-h-32 max-w-sm' : 'max-h-28 max-w-[220px]'} w-full object-contain`}
          />
        </div>

        <div className="flex flex-1 flex-col p-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: supporter.accent }}>
            {supporter.tier}
          </p>
          <h3 className="mt-2 text-xl font-bold" style={{ color: C.white }}>
            {supporter.name}
          </h3>
          <p className="mt-2 text-sm" style={{ color: C.muted }}>
            {supporter.role}
          </p>
          <p className="mt-4 flex-1 text-sm leading-6" style={{ color: C.muted }}>
            {supporter.description}
          </p>
          <a
            href={supporter.href}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex w-fit items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.16em] transition hover:text-white"
            style={{ color: supporter.accent }}
          >
            Visit
            <ExternalLink size={13} />
          </a>
        </div>
      </motion.article>
    </FadeIn>
  );
}

function SupporterGroup({ group, index }) {
  return (
    <div className={index === 0 ? 'mb-8' : 'mb-8 border-t border-white/[0.08] pt-8'}>
      <FadeIn>
        <div className="mb-5 grid gap-3 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.24em]" style={{ color: C.red }}>
              {group.label}
            </p>
            <h3
              className="mt-2 text-3xl font-black leading-tight md:text-4xl"
              style={{ fontFamily: "'Bebas Neue', cursive", color: C.white }}
            >
              {group.title}
            </h3>
          </div>
          <p className="max-w-3xl text-sm leading-6 lg:justify-self-end" style={{ color: C.muted }}>
            {group.description}
          </p>
        </div>
      </FadeIn>

      <div className={`grid gap-5 ${group.columns}`}>
        {group.supporters.map((supporter, supporterIndex) => (
          <SupporterCard
            key={supporter.name}
            supporter={supporter}
            index={supporterIndex}
            featured={group.supporters.length <= 2}
          />
        ))}
      </div>
    </div>
  );
}

function TierCard({ tier, index }) {
  return (
    <FadeIn delay={index * 0.08}>
      <motion.article
        whileHover={{
          y: -6,
          borderColor: tier.color,
          boxShadow: `0 18px 45px ${tier.color}14`,
        }}
        transition={{ duration: 0.22 }}
        className="flex h-full flex-col overflow-hidden rounded-lg border"
        style={{
          background: 'rgba(10,12,18,0.78)',
          borderColor: 'rgba(255,255,255,0.08)',
        }}
      >
        <div
          className="flex min-h-[118px] items-center justify-center border-b"
          style={{
            background: 'rgba(5,7,13,0.72)',
            borderColor: 'rgba(255,255,255,0.06)',
          }}
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: C.dim }}>
            Partner slot open
          </span>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: tier.color }}>
                {tier.tier}
              </p>
              <h3 className="mt-2 text-xl font-bold" style={{ color: C.white }}>
                Sponsor Tier
              </h3>
            </div>
            <div
              className="flex h-10 min-w-20 items-center justify-center rounded-lg border px-3 font-mono text-sm font-bold"
              style={{
                color: tier.color,
                borderColor: `${tier.color}55`,
                background: `${tier.color}0d`,
              }}
            >
              {tier.price}
            </div>
          </div>

          <p className="text-sm leading-6" style={{ color: C.muted }}>
            {tier.summary}
          </p>

          <div className="my-5 h-px" style={{ background: C.border }} />

          <ul className="space-y-3">
            {tier.benefits.map((benefit) => (
              <li key={benefit} className="flex items-center gap-3 text-sm" style={{ color: C.muted }}>
                <span className="h-1.5 w-1.5 rotate-45" style={{ background: tier.color }} />
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      </motion.article>
    </FadeIn>
  );
}

export default function Sponsors() {
  return (
    <Section
      id="sponsors"
      style={{
        background: 'linear-gradient(180deg, #07090f 0%, #05070D 54%, #080b11 100%)',
      }}
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          label="07 / Sponsors"
          title="Our Supporters"
          subtitle="Made possible by organizations that believe in community-driven security education."
        />

        {SUPPORTER_GROUPS.map((group, index) => (
          <SupporterGroup key={group.title} group={group} index={index} />
        ))}

        <FadeIn>
          <div
            className="mb-8 grid overflow-hidden rounded-lg border lg:grid-cols-[1.1fr_0.9fr]"
            style={{
              background: 'rgba(5,7,13,0.72)',
              borderColor: 'rgba(255,255,255,0.08)',
            }}
          >
            <div className="p-6 sm:p-8">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg border border-red-500/25 bg-red-500/10 text-red-400">
                <Handshake size={22} />
              </div>
              <p className="font-mono text-[10px] uppercase tracking-[0.24em]" style={{ color: C.red }}>
                Become a sponsor
              </p>
              <h3
                className="mt-3 text-3xl font-black leading-tight md:text-4xl"
                style={{ fontFamily: "'Bebas Neue', cursive", color: C.white }}
              >
                Support Jordan's Security Community
              </h3>
              <p className="mt-4 max-w-2xl text-sm leading-7" style={{ color: C.muted }}>
                Sponsorship tiers are available for companies, communities, universities, and partners who want to support practical security education in Amman.
              </p>
              <ul className="mt-5 space-y-2 text-sm leading-6" style={{ color: C.muted }}>
                <li className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45" style={{ background: C.red }} />
                  Below tiers regard sponsorship only.
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45" style={{ background: C.red }} />
                  Support is preferably through indirectly helping the conference, such as paying tickets for speakers, providing swag, or providing infrastructure.
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45" style={{ background: C.red }} />
                  If the above option is not feasible, cash support is available.
                </li>
              </ul>
            </div>

            <div
              className="flex flex-col justify-center gap-4 border-t p-6 sm:p-8 lg:border-l lg:border-t-0"
              style={{ borderColor: 'rgba(255,255,255,0.08)' }}
            >
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                <div className="border border-white/[0.08] bg-white/[0.025] p-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: C.dim }}>
                    Packages
                  </p>
                  <p className="mt-2 text-sm" style={{ color: C.muted }}>
                    Diamond, Gold, Silver, and Bronze tiers.
                  </p>
                </div>
                <div className="border border-white/[0.08] bg-white/[0.025] p-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: C.dim }}>
                    Contact
                  </p>
                  <p className="mt-2 text-sm" style={{ color: C.muted }}>
                    contact@bsidesamman.org
                  </p>
                </div>
              </div>

              <a
                href="mailto:contact@bsidesamman.org?subject=BSides%20Amman%20Sponsorship"
                className="inline-flex w-fit items-center gap-2 rounded-full bg-[#c81e1e] px-5 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-white transition hover:bg-[#a01515]"
              >
                <Mail size={14} />
                Sponsor us
                <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </FadeIn>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {TIERS.map((tier, index) => (
            <TierCard key={tier.tier} tier={tier} index={index} />
          ))}
        </div>
      </div>
    </Section>
  );
}
