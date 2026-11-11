import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars -- `motion` is used via JSX member expressions (e.g. <motion.nav>)
import { motion, AnimatePresence } from 'framer-motion';
import {
  Github, Linkedin, Mail, Moon, Sun, Download, Menu, X,
  ArrowUp, ArrowUpRight, MapPin
} from 'lucide-react';
import { SiX } from 'react-icons/si';
import TimeDisplay from './TimeDisplay';
import { NAV_LINKS, SOCIALS } from '../data/content';

const ICONS = {
  github: <Github size={18} />,
  linkedin: <Linkedin size={18} />,
  x: <SiX size={16} />,
  mail: <Mail size={18} />
};

export const SocialIcon = ({ href, icon, label }) => {
  const isMailto = href?.startsWith('mailto:');
  return (
    <a
      href={href}
      target={isMailto ? undefined : "_blank"}
      rel={isMailto ? undefined : "noopener noreferrer"}
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] text-[var(--text-secondary)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--accent)] hover:text-[var(--accent)]"
    >
      {icon}
    </a>
  );
};

export const SocialRow = () => (
  <div className="flex items-center gap-2.5">
    {SOCIALS.map(s => (
      <SocialIcon key={s.label} href={s.href} label={s.label} icon={ICONS[s.icon]} />
    ))}
  </div>
);

/* ---------- Nav ---------- */

export const Nav = ({ theme, toggleTheme }) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--bg)]/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link to="/" className="group flex items-center">
          <img
            src={theme === 'dark' ? '/logo-dark.svg' : '/logo-light.svg'}
            alt="Uditya Pal"
            className="h-9 w-auto transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map(link => {
            const [path, hash] = link.href.split('#');
            const isActive = hash
              ? location.pathname === (path || '/') && location.hash === `#${hash}`
              : location.pathname === path;
            return (
              <NavLink
                key={link.label}
                to={link.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? 'bg-[var(--accent-soft)] text-[var(--accent)]'
                    : 'text-[var(--text-secondary)] hover:bg-[var(--bg-subtle)] hover:text-[var(--text)]'
                }`}
              >
                {link.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="flex items-center gap-1.5">
          <span className="mr-1 hidden items-center gap-1.5 text-xs text-[var(--text-muted)] lg:flex">
            <MapPin size={12} />
            Greater Noida, IN
            <span className="text-[var(--border)]">·</span>
            <TimeDisplay />
          </span>
          <button
            onClick={toggleTheme}
            className="rounded-full p-2 text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-subtle)] hover:text-[var(--text)]"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <div className="ml-1 hidden items-center sm:flex">
            <a
              href="/latest%20Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-l-full bg-[var(--accent)] py-2 pl-4 pr-3 text-sm font-semibold text-white transition-all hover:brightness-110"
            >
              <Download size={15} />
              Resume
            </a>
            <a
              href="/latest%20Resume.pdf"
              download="latest Resume.pdf"
              aria-label="Download resume"
              className="flex items-center rounded-r-full border-l border-white/25 bg-[var(--accent)] py-2 pl-2 pr-3 text-white transition-all hover:brightness-110"
            >
              <Download size={14} className="rotate-180" />
            </a>
          </div>
          <button
            onClick={() => setOpen(!open)}
            className="rounded-full p-2 text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-subtle)] md:hidden"
            aria-label="Menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-[var(--border)] md:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {NAV_LINKS.map(link => (
                <NavLink
                  key={link.label}
                  to={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-subtle)] hover:text-[var(--text)]"
                >
                  {link.label}
                </NavLink>
              ))}
              <a
                href="/latest%20Resume.pdf"
                download="latest Resume.pdf"
                className="mt-2 flex items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-white"
              >
                <Download size={15} /> Resume
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

/* ---------- Section heading ---------- */

export const SectionHead = ({ index, title, subtitle }) => (
  <div className="mb-10">
    <div className="mb-3 flex items-center gap-3">
      <span className="font-mono text-xs font-medium tracking-widest text-[var(--accent)]">
        {index}
      </span>
      <span className="h-px w-10 bg-[var(--accent)]" />
    </div>
    <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">{title}</h2>
    {subtitle && (
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--text-secondary)] md:text-base">{subtitle}</p>
    )}
  </div>
);

/* ---------- Scroll reveal wrapper ---------- */

export const Reveal = ({ children, delay = 0, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

/* ---------- Ticker ---------- */

export const Ticker = ({ items }) => (
  <div className="relative overflow-hidden border-y border-[var(--border)] bg-[var(--bg-subtle)]/50 py-5">
    <div className="flex w-max animate-marquee">
      {[0, 1].map(half => (
        <div key={half} className="flex shrink-0 items-center">
          {items.map((item, i) => (
            <span key={`${half}-${i}`} className="flex items-center gap-2.5 px-7">
              <span className="text-[var(--text-secondary)] transition-colors hover:text-[var(--accent)]">{item.icon}</span>
              <span className="text-sm font-semibold tracking-wide text-[var(--text-secondary)]">{item.label}</span>
              <span className="ml-5 text-[var(--accent)]/60">✦</span>
            </span>
          ))}
        </div>
      ))}
    </div>
  </div>
);

export const BackButton = () => (
  <Link
    to="/"
    className="group mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[var(--text-secondary)] transition-colors hover:text-[var(--accent)]"
  >
    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border)] transition-all group-hover:border-[var(--accent)] group-hover:-translate-x-0.5">
      ←
    </span>
    Back to home
  </Link>
);

/* ---------- Footer ---------- */

export const Footer = () => {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative border-t border-[var(--border)] bg-[var(--bg-subtle)]">
      {/* CTA band */}
      <div className="border-b border-[var(--border)]">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-5 py-14 md:flex-row md:items-center">
          <div>
            <p className="font-mono text-xs font-medium tracking-widest text-[var(--accent)]">CONTACT</p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight md:text-5xl">
              Have a project in mind? <span className="italic text-[var(--accent)]">Let's talk.</span>
            </h2>
          </div>
          <a
            href="mailto:Uditya2024@gmail.com"
            className="group inline-flex items-center gap-2.5 rounded-full bg-[var(--accent)] px-7 py-3.5 text-sm font-semibold text-white transition-all hover:brightness-110"
          >
            Uditya2024@gmail.com
            <ArrowUpRight size={17} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>

      {/* Link columns */}
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--accent)] text-sm font-extrabold text-white md:hidden">UP</span>
            <span className="font-display text-xl font-semibold italic">Uditya Pal</span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-[var(--text-secondary)]">
            Full-Stack Developer based in Greater Noida, India. Building fast, accessible products with React, Node.js and modern web technologies.
          </p>
          <p className="mt-5 font-mono text-xs text-[var(--text-muted)]">
            Local time — <TimeDisplay /> IST
          </p>
        </div>

        <FooterCol title="Sitemap" links={[
          { label: "Work", href: "/#work" },
          { label: "Capabilities", href: "/#capabilities" },
          { label: "Stack", href: "/#stack" },
          { label: "Education", href: "/#education" },
          { label: "Experience", href: "/#experience" },
          { label: "Certificates", href: "/certificates" },
          { label: "Writing", href: "/blogs" },
          { label: "Contact", href: "/#contact" }
        ]} />

        <FooterCol title="Elsewhere" links={SOCIALS.map(s => ({ label: s.label, href: s.href, external: !s.href.startsWith('mailto:') }))} />

        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">Resume</h4>
          <p className="mt-4 text-sm leading-relaxed text-[var(--text-secondary)]">
            Download my latest resume for full work history and education details.
          </p>
          <a
            href="/latest%20Resume.pdf"
            download="latest Resume.pdf"
            className="mt-4 inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-4 py-2 text-xs font-semibold transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            <Download size={13} /> Download PDF
          </a>
        </div>
      </div>

      {/* Giant wordmark */}
      <div className="overflow-hidden border-t border-[var(--border)]">
        <div className="mx-auto max-w-6xl px-5">
          <p className="select-none py-6 text-center font-display text-[13vw] font-bold leading-none tracking-tight text-transparent md:text-[9rem]"
             style={{ WebkitTextStroke: '1.5px color-mix(in srgb, var(--accent) 45%, var(--border))', color: 'color-mix(in srgb, var(--accent) 10%, transparent)' }}>
            UDITYA&nbsp;PAL
          </p>
        </div>
      </div>

      <div className="border-t border-[var(--border)]">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 py-5 text-xs text-[var(--text-muted)] sm:flex-row">
          <span>© {new Date().getFullYear()} Uditya Pal (Aman Pal). All rights reserved.</span>
          <div className="flex items-center gap-4">
            <span>Built with React, Tailwind & Framer Motion</span>
            <button
              onClick={scrollTop}
              className="flex items-center gap-1.5 rounded-full border border-[var(--accent)]/50 px-3 py-1.5 font-semibold text-[var(--accent)] transition-colors hover:bg-[var(--accent)] hover:text-white"
            >
              Back to top <ArrowUp size={12} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterCol = ({ title, links }) => (
  <div>
    <h4 className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">{title}</h4>
    <ul className="mt-4 space-y-2.5 text-sm">
      {links.map(link => (
        <li key={link.label}>
          {link.href.startsWith('/') ? (
            <Link to={link.href} className="text-[var(--text-secondary)] transition-colors hover:text-[var(--accent)]">
              {link.label}
            </Link>
          ) : (
            <a href={link.href} target={link.external ? '_blank' : undefined} rel={link.external ? 'noopener noreferrer' : undefined} className="text-[var(--text-secondary)] transition-colors hover:text-[var(--accent)]">
              {link.label}
            </a>
          )}
        </li>
      ))}
    </ul>
  </div>
);
