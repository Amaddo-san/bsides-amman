import { motion } from 'framer-motion';
import { Mail, MapPin, Linkedin, Twitter, Youtube, Instagram, Shield } from 'lucide-react';
import { C, NAV_LINKS } from '../constants';
import logo from "../assets/logo.png";

const SOCIAL = [
  { icon: Linkedin,  href: 'https://www.linkedin.com/company/bsidesamman/', label: 'LinkedIn', color: '#0077b5'  },
  { icon: Instagram, href: 'https://www.instagram.com/bsides.amman?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==', label: 'Instagram', color: '#e4405f'  },
];

export default function Footer() {
  return (
    <footer style={{ background: C.bgCard, borderTop: `1px solid ${C.border}` }}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-14">
        <div className="grid md:grid-cols-3 gap-10 mb-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
            
                        <img
               src={logo}
               alt="BSides Amman Logo"
               className="mx-auto lg:mx-0 w-40 md:w-22 lg:w-22 "
             />
            </div>
            <p className="text-sm leading-relaxed mb-5" style={{ color: C.muted }}>
              Jordan's first infosec and hacking conference. Official Amman chapter of the global
              Security BSides community.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-4">
              {SOCIAL.map(s => {
                const Icon = s.icon;
                return (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                      whileHover={{ scale: 1.2, color: s.color }}
                    transition={{ duration: 0.18 }}
                    style={{ color: C.dim }}
                  >
                    <Icon size={25} />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Nav links */}
          <div>
            <h4
              className="text-xs font-mono tracking-widest uppercase mb-4"
              style={{ color: C.dim }}
            >
              Navigation
            </h4>
            <div className="grid grid-cols-2 gap-y-2 gap-x-4">
              {NAV_LINKS.map(l => (
               <a
  key={l.href}
  href={l.href}
  className="text-sm font-mono transition-colors duration-200 text-zinc-400 hover:text-white"
>
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="text-xs font-mono tracking-widest uppercase mb-4"
              style={{ color: C.dim }}
            >
              Contact
            </h4>
            <motion.a
              href="mailto:info@bsidesamman.org"
              className="flex items-center gap-2 text-sm font-mono mb-3 transition-colors duration-200 hover:text-white"
              style={{ color: C.muted }}
              whileHover={{ color: C.red }}
              transition={{ duration: 0 }}
            >
              <Mail size={14} style={{ color: C.red }} 
/>
              info@bsidesamman.org
            </motion.a>
            <div
              className="flex items-start gap-2 text-sm font-mono"
              style={{ color: C.muted }}
            >
              <MapPin size={14} className="shrink-0 mt-0.5" style={{ color: C.red }} />
we ddont know            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px mb-6" style={{ background: C.border }} />

        {/* Bottom bar */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs font-mono" style={{ color: C.dim }}>
            © {new Date().getFullYear()} BSides Amman — Organized by the community, for the community.
          </p>
          <p className="text-xs font-mono" style={{ color: C.dim }}>
            Part of the global{' '}
            <a
              href="https://www.securitybsides.com"
              target="_blank"
              rel="noreferrer"
              className="underline"
              style={{ color: C.muted }}
            >
              Security BSides
            </a>{' '}
            network
          </p>
        </div>
      </div>
    </footer>
  );
}
