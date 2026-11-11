import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars -- `motion` is used via JSX member expressions (e.g. <motion.article>)
import { motion, AnimatePresence, animate, useInView } from 'framer-motion';
import {
  Github, ExternalLink, ArrowRight, ArrowUpRight, Plus, FileText,
  MapPin, Download
} from 'lucide-react';
import { Nav, Footer, SectionHead, Reveal, Ticker, SocialRow } from '../components/chrome';
import { PostCard } from '../components/PostCard';
import ProjectModal from '../components/ProjectModal';
import Assistant from '../components/Assistant';
import CertThumb from '../components/CertThumb';
import { TECH_ICONS, CAP_ICONS } from '../components/icons';
import { PROJECTS, CAPABILITIES, TECH, EDUCATION, EXPERIENCE, FAQS, STATS, JOURNEY } from '../data/content';
import { usePosts } from '../data/usePosts';
import { FEATURED_CERTS } from '../data/certificates';
import GitHubHeatmap from '../components/GitHubHeatmap';

export default function Home({ theme, toggleTheme }) {
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedResult, setSelectedResult] = useState(null);
  const [openFaq, setOpenFaq] = useState(0);
  const allPosts = usePosts();
  const featuredPosts = allPosts.slice(0, 4);
  const featuredProjects = PROJECTS.filter(p => p.featured);
  const tickerItems = TECH.map(t => ({ icon: TECH_ICONS[t.name], label: t.name }));

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <Nav theme={theme} toggleTheme={toggleTheme} />

      <main className="mx-auto max-w-6xl px-5">
        {/* ================= HERO ================= */}
        <section className="relative overflow-hidden pb-16 pt-14 md:pb-20 md:pt-20">
          <div
            className="pointer-events-none absolute -top-40 right-[-10%] h-[30rem] w-[30rem] rounded-full opacity-[0.13] blur-3xl"
            style={{ background: 'radial-gradient(circle, var(--accent), transparent 70%)' }}
          />

          <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
            {/* Left — type */}
            <div>
              <Reveal>
                <div className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-[var(--border)] bg-[var(--bg-card)] px-4 py-2 text-xs font-semibold text-[var(--text-secondary)]">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                  Open to full-time roles & freelance
                </div>
              </Reveal>

              <Reveal delay={0.08}>
                <p className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.25em] text-[var(--accent)]">
                  Uditya Pal — aka Aman Pal
                </p>
                <h1 className="font-display text-[3.2rem] font-semibold leading-[1.02] tracking-tight sm:text-6xl md:text-7xl">
                  Full-Stack
                  <br />
                  <span className="italic text-[var(--accent)]">Developer</span>
                  <span className="text-[var(--accent)]">.</span>
                </h1>
              </Reveal>

              <Reveal delay={0.16}>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-[var(--text-secondary)] md:text-lg">
                  I design and ship fast, accessible web products — pixel-perfect interfaces,
                  solid Node.js backends, and creative touches with Three.js & GSAP.
                </p>
              </Reveal>

              <Reveal delay={0.24}>
                <div className="mt-9 flex flex-wrap items-center gap-4">
                  <a
                    href="#work"
                    className="group inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-7 py-3.5 text-sm font-semibold text-white transition-all hover:brightness-110"
                  >
                    View my work
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                  </a>
                  <Link
                    to="/projects"
                    className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg-card)] px-7 py-3.5 text-sm font-semibold transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
                  >
                    All projects
                  </Link>
                </div>
                <div className="mt-8">
                  <SocialRow />
                </div>
              </Reveal>
            </div>

            {/* Right — portrait */}
            <Reveal delay={0.2} className="mx-auto w-full max-w-xs lg:max-w-sm">
              <div className="relative">
                <div className="absolute -inset-3 rounded-[1.75rem] border border-[var(--accent)]/30" />
                <img
                  src="/profile.jpg"
                  alt="Uditya Pal"
                  className="relative aspect-[4/5] w-full rounded-3xl border border-[var(--border)] object-cover shadow-2xl"
                />
                <div className="absolute -bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full border border-[var(--border)] bg-[var(--bg-card)] px-4 py-2 text-xs font-semibold shadow-lg">
                  <MapPin size={12} className="text-emerald-500" /> Greater Noida, IN · IST
                </div>
              </div>
            </Reveal>
          </div>

          {/* Stats strip */}
          <Reveal delay={0.3}>
            <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--border)] md:grid-cols-4">
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="bg-[var(--bg-card)] px-6 py-6"
                >
                  <StatValue value={stat.value} />
                  <div className="mt-1 text-xs font-medium text-[var(--text-muted)]">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </Reveal>
        </section>

        <Ticker items={tickerItems} />

        {/* ================= WORK ================= */}
        <section id="work" className="scroll-mt-24 py-20">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <SectionHead
              index="01"
              title="Selected Work"
              subtitle="Flagship builds and experiments — each designed and engineered end-to-end."
            />
            <Link
              to="/projects"
              className="group mb-2 inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)]"
            >
              View all projects
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project, i) => (
              <CompactProjectCard key={project.title} project={project} index={i} onClick={() => setSelectedProject(project)} />
            ))}
          </div>
        </section>

        {/* ================= CAPABILITIES ================= */}
        <section id="capabilities" className="scroll-mt-24 border-t border-[var(--border)] py-20">
          <SectionHead
            index="02"
            title="What I Do"
            subtitle="Three pillars of how I approach every product I touch."
          />
          <div className="grid gap-5 md:grid-cols-3">
            {CAPABILITIES.map((cap, i) => (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.12, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent)]/50 hover:shadow-xl"
              >
                {/* hover accent sweep */}
                <span className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-[var(--accent)] transition-transform duration-500 group-hover:scale-x-100" />
                <div className="mb-5 flex items-center justify-between">
                  <motion.span
                    initial={{ scale: 0.6, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.12, type: 'spring', stiffness: 200 }}
                    className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)] transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6"
                  >
                    {CAP_ICONS[cap.icon]}
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.25 + i * 0.12 }}
                    className="font-display text-4xl font-semibold italic text-[var(--border)] transition-colors group-hover:text-[var(--accent)]/40"
                  >
                    0{i + 1}
                  </motion.span>
                </div>
                <h3 className="text-lg font-bold tracking-tight">{cap.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--text-secondary)]">{cap.desc}</p>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {cap.stack.map(s => (
                    <span key={s} className="rounded-md bg-[var(--bg-subtle)] px-2.5 py-1 text-[11px] font-semibold text-[var(--text-secondary)] transition-colors group-hover:bg-[var(--accent-soft)] group-hover:text-[var(--accent)]">
                      {s}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ================= STACK ================= */}
        <section id="stack" className="scroll-mt-24 border-t border-[var(--border)] py-20">
          <SectionHead
            index="03"
            title="Tech Stack"
            subtitle="Tools I use daily to design, build and ship."
          />
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7">
            {TECH.map((tech, i) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03, duration: 0.35 }}
                className="group flex flex-col items-center gap-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] px-3 py-5 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent)]/50 hover:shadow-md"
              >
                <span className="text-[var(--text-secondary)] transition-all duration-300 group-hover:scale-110 group-hover:text-[var(--accent)]">
                  {TECH_ICONS[tech.name]}
                </span>
                <span className="text-[11px] font-semibold text-[var(--text-secondary)]">{tech.name}</span>
              </motion.div>
            ))}
          </div>

          <GitHubHeatmap />
        </section>

        {/* ================= EDUCATION + JOURNEY ================= */}
        <section id="education" className="scroll-mt-24 border-t border-[var(--border)] py-20">
          <SectionHead index="04" title="Education" subtitle="My academic journey." />
          <div className="overflow-hidden rounded-2xl border border-[var(--border)]">
            {EDUCATION.map((edu, i) => (
              <motion.div
                key={edu.school}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                className="group relative flex flex-col gap-4 overflow-hidden bg-[var(--bg-card)] p-6 transition-colors hover:bg-[var(--bg-subtle)] sm:flex-row sm:items-center sm:justify-between"
              >
                <span className="absolute inset-y-0 left-0 w-1 origin-top scale-y-0 bg-[var(--accent)] transition-transform duration-300 group-hover:scale-y-100" />
                <div className="pl-2 sm:pl-4">
                  <h3 className="font-bold tracking-tight transition-colors group-hover:text-[var(--accent)]">{edu.school}</h3>
                  <p className="mt-0.5 text-sm text-[var(--text-secondary)]">{edu.degree}</p>
                  {edu.cgpa && <p className="mt-0.5 font-mono text-xs text-[var(--text-muted)]">{edu.cgpa}</p>}
                </div>
                <div className="flex items-center gap-4 pl-2 sm:pl-4">
                  <span className="font-mono text-xs text-[var(--text-muted)]">{edu.period}</span>
                  <button
                    onClick={() => setSelectedResult(edu.result)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] px-3.5 py-1.5 text-xs font-semibold transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
                  >
                    <FileText size={13} />
                    View Result
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Learning journey */}
          <motion.a
            href={JOURNEY.link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55 }}
            className="group relative mt-6 block overflow-hidden rounded-2xl border border-[var(--accent)]/30 transition-all hover:border-[var(--accent)]/60 hover:shadow-2xl"
          >
            <img
              src={JOURNEY.banner}
              alt="Chai aur Code Cohort banner"
              loading="lazy"
              className="h-36 w-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105 md:h-44"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-center gap-1.5 p-6 md:flex-row md:items-center md:justify-between md:gap-6 md:p-8">
              <div>
                <p className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-orange-400">Learning Journey</p>
                <h3 className="mt-1 font-display text-2xl font-semibold italic text-white md:text-3xl">{JOURNEY.program}</h3>
                <p className="mt-1 max-w-xl text-sm text-white/75">
                  {JOURNEY.duration} by {JOURNEY.mentor} — {JOURNEY.path}
                </p>
              </div>
              <span className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-orange-400">
                View on GitHub <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </div>
          </motion.a>
        </section>

        {/* ================= EXPERIENCE ================= */}
        <section id="experience" className="scroll-mt-24 border-t border-[var(--border)] py-20">
          <SectionHead index="05" title="Experience" subtitle="Internships and industry programs I've completed." />
          <div className="relative ml-3 space-y-8 border-l-2 border-[var(--border)] pl-8 md:ml-6">
            {EXPERIENCE.map((exp, i) => (
              <motion.div
                key={exp.role}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                className="group relative"
              >
                {/* timeline node */}
                <span className="absolute -left-[41px] top-1.5 flex h-4 w-4 items-center justify-center">
                  <span className="absolute h-4 w-4 rounded-full border-2 border-[var(--accent)] bg-[var(--bg)] transition-transform duration-300 group-hover:scale-125" />
                  <span className="relative h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                </span>
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--accent)]/50 hover:shadow-lg">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-bold tracking-tight transition-colors group-hover:text-[var(--accent)]">{exp.role}</h3>
                      <p className="mt-0.5 text-sm font-semibold text-[var(--text-secondary)]">{exp.org}</p>
                    </div>
                    <span className="rounded-full bg-[var(--accent-soft)] px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--accent)]">
                      {exp.period}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">{exp.desc}</p>
                  {exp.did && (
                    <ul className="mt-3 space-y-1.5">
                      {exp.did.map(d => (
                        <motion.li
                          key={d}
                          initial={{ opacity: 0, x: -8 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 + i * 0.1 }}
                          className="flex items-start gap-2 text-xs text-[var(--text-secondary)]"
                        >
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[var(--accent)]" />
                          {d}
                        </motion.li>
                      ))}
                    </ul>
                  )}
                  <a
                    href={exp.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] px-3.5 py-1.5 text-xs font-semibold transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
                  >
                    <FileText size={13} /> View certificate
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ================= CERTIFICATES ================= */}
        <section className="scroll-mt-24 border-t border-[var(--border)] py-20">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <SectionHead
              index="06"
              title="Top Certificates"
              subtitle="Credentials from IBM, Infosys, Oracle and more — verified documents."
            />
            <Link
              to="/certificates"
              className="group mb-2 inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)]"
            >
              View all certificates
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURED_CERTS.map((cert, i) => (
              <motion.a
                key={cert.title}
                href={cert.file}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className={`group relative flex flex-col overflow-hidden rounded-2xl border bg-[var(--bg-card)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${cert.premium ? 'border-[var(--accent)]/60 shadow-[0_0_35px_-12px_var(--accent)] hover:border-[var(--accent)]' : 'border-[var(--border)] hover:border-[var(--accent)]/50'}`}
              >
                {cert.premium && (
                  <span className="absolute left-3 top-3 z-10 rounded-full bg-[var(--accent)] px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-widest text-white shadow-lg">
                    Milestone
                  </span>
                )}
                <div className="relative h-36 overflow-hidden bg-[var(--bg-subtle)]">
                  <CertThumb file={cert.file} title={cert.title} className="transition-transform duration-500 group-hover:scale-105" />
                  <span className={`absolute rounded-full px-2.5 py-0.5 font-mono text-[10px] font-medium text-white backdrop-blur-sm ${cert.premium ? 'right-3 top-9 bg-black/70' : 'right-3 top-3 bg-black/60'}`}>{cert.year}</span>
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <h3 className="text-sm font-bold tracking-tight transition-colors group-hover:text-[var(--accent)]">{cert.title}</h3>
                  <p className="mt-1 text-xs text-[var(--text-muted)]">{cert.issuer}</p>
                  <span className="mt-3 text-xs font-semibold text-[var(--accent)]">View certificate →</span>
                </div>
              </motion.a>
            ))}
          </div>
        </section>

        {/* ================= WRITING ================= */}
        <section className="scroll-mt-24 border-t border-[var(--border)] py-20">
          <SectionHead
            index="07"
            title="Latest Writing"
            subtitle="Articles on CSS, animation and modern web development."
          />
          <div className="grid gap-6 sm:grid-cols-2">
            {featuredPosts.map((post, i) => (
              <PostCard key={post.slug} post={post} index={i} />
            ))}
          </div>
          <Reveal delay={0.2}>
            <Link
              to="/blogs"
              className="group mt-10 inline-flex items-center gap-2.5 rounded-full border border-[var(--border)] bg-[var(--bg-card)] px-7 py-3.5 text-sm font-semibold transition-all hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              View all articles
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </section>

        {/* ================= FAQ ================= */}
        <section className="scroll-mt-24 border-t border-[var(--border)] py-20">
          <SectionHead index="08" title="FAQ" />
          <Reveal>
            <div className="divide-y divide-[var(--border)] overflow-hidden rounded-2xl border border-[var(--border)]">
              {FAQS.map((faq, i) => (
                <div key={faq.q} className="bg-[var(--bg-card)]">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-[var(--bg-subtle)]"
                  >
                    <span className="text-sm font-semibold tracking-tight md:text-base">{faq.q}</span>
                    <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[var(--border)] text-[var(--accent)] transition-transform duration-300 ${openFaq === i ? 'rotate-45' : ''}`}>
                      <Plus size={15} />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-5 text-sm leading-relaxed text-[var(--text-secondary)]">{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </Reveal>
        </section>
      </main>

      <div id="contact">
        <Footer />
      </div>

      <Assistant />

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
      <ResultModal image={selectedResult} isOpen={!!selectedResult} onClose={() => setSelectedResult(null)} />
    </div>
  );
}

/* Count-up stat value — parses leading number, animates on scroll into view */
const StatValue = ({ value }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const match = String(value).match(/^([\d.]+)(.*)$/);

  useEffect(() => {
    if (!inView || !match) return;
    const target = parseFloat(match[1]);
    const suffix = match[2] || '';
    const controls = animate(0, target, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: v => {
        if (ref.current) {
          const decimals = match[1].includes('.') ? 1 : 0;
          ref.current.textContent = (Math.round(v * 10) / 10).toFixed(decimals).replace(/\.0$/, '') + suffix;
        }
      }
    });
    return () => controls.stop();
  }, [inView, match]);

  return (
    <div ref={ref} className="font-display text-3xl font-semibold tracking-tight text-[var(--accent)] md:text-4xl">
      {match ? '0' + (match[2] || '') : value}
    </div>
  );
};

/* ================= Compact project card (home) ================= */

const CompactProjectCard = ({ project, index, onClick }) => (
  <motion.article
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{ delay: index * 0.1, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
    onClick={onClick}
    className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[var(--accent)]/50 hover:shadow-2xl"
  >
    {/* Visual */}
    <div className={`relative h-36 overflow-hidden bg-gradient-to-br ${project.gradient}`}>
      {project.image ? (
        <>
          <img src={project.image} alt={`${project.title} homepage`} loading="lazy" className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        </>
      ) : (
        <>
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,.35) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.35) 1px, transparent 1px)',
              backgroundSize: '24px 24px'
            }}
          />
          <div className="absolute -right-6 -top-8 h-24 w-24 rounded-full bg-white/15 blur-2xl transition-transform duration-500 group-hover:scale-125" />
        </>
      )}
      <div className="absolute bottom-3 left-4 right-4">
        <p className="font-mono text-[9px] font-medium uppercase tracking-[0.2em] text-white/60">{project.category}</p>
        <p className="font-display text-xl font-semibold italic text-white">{project.title}</p>
      </div>
      <span className="absolute right-3 top-3 rounded-full bg-black/25 px-2.5 py-0.5 font-mono text-[10px] text-white backdrop-blur-sm">{project.year}</span>
    </div>

    <div className="flex flex-1 flex-col p-5">
      <p className="flex-1 text-sm leading-relaxed text-[var(--text-secondary)]">{project.desc}</p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.tags.slice(0, 3).map(tag => (
          <span key={tag} className="rounded-md bg-[var(--bg-subtle)] px-2 py-1 text-[11px] font-semibold text-[var(--text-secondary)]">{tag}</span>
        ))}
      </div>
      <div className="mt-5 flex items-center justify-between border-t border-[var(--border)] pt-4 text-xs font-semibold">
        <div className="flex gap-4">
          {project.codeUrl !== "#" && (
            <a href={project.codeUrl} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="inline-flex items-center gap-1.5 text-[var(--text-secondary)] transition-colors hover:text-[var(--text)]">
              <Github size={13} /> Code
            </a>
          )}
          {project.liveUrl !== "#" && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="inline-flex items-center gap-1.5 text-[var(--text-secondary)] transition-colors hover:text-[var(--text)]">
              <ExternalLink size={13} /> Live
            </a>
          )}
        </div>
        <span className="inline-flex items-center gap-1 text-[var(--accent)]">
          Details <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </div>
  </motion.article>
);

const ResultModal = ({ image, isOpen, onClose }) => {
  if (!isOpen || !image) return null;
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.92, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-h-[90vh] max-w-4xl overflow-hidden rounded-2xl shadow-2xl"
        >
          <a
            href={image}
            download={image.split('/').pop() || 'Academic-Result'}
            className="absolute left-4 top-4 z-10 flex items-center gap-1.5 rounded-full bg-black/60 px-3.5 py-2 text-xs font-semibold text-white backdrop-blur-md transition-colors hover:bg-black/80"
          >
            <Download size={14} /> Download
          </a>
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-10 rounded-full bg-black/60 p-2 text-white backdrop-blur-md transition-colors hover:bg-black/80"
            aria-label="Close"
          >
            <Plus size={20} className="rotate-45" />
          </button>
          {image.toLowerCase().endsWith('.pdf') ? (
            <iframe src={image} title="Academic Result" className="h-[80vh] w-full bg-white" />
          ) : (
            <img src={image} alt="Academic Result" loading="lazy" className="h-auto max-h-[90vh] w-full bg-white object-contain" />
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
