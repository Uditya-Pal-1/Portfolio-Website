import { useState } from 'react';
// eslint-disable-next-line no-unused-vars -- `motion` is used via JSX member expressions
import { motion, AnimatePresence } from 'framer-motion';
import { Nav, Footer, Reveal, BackButton } from '../components/chrome';
import ProjectModal from '../components/ProjectModal';
import { PROJECTS } from '../data/content';

export default function Projects({ theme, toggleTheme }) {
  const [selected, setSelected] = useState(null);
  const featured = PROJECTS.filter(p => p.featured);
  const others = PROJECTS.filter(p => !p.featured);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <Nav theme={theme} toggleTheme={toggleTheme} />

      <main className="mx-auto max-w-6xl px-5">
        <section className="pb-10 pt-16 md:pt-24">
          <BackButton />
          <Reveal>
            <p className="font-mono text-xs font-medium uppercase tracking-[0.25em] text-[var(--accent)]">Work</p>
            <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-6xl">
              All <span className="italic text-[var(--accent)]">Projects</span>
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--text-secondary)]">
              Everything I've designed and built — from flagship full-stack platforms to pixel-perfect UI recreations. Click any card for the full story.
            </p>
          </Reveal>
        </section>

        {/* Featured */}
        <section className="pb-8">
          <Reveal>
            <p className="mb-6 font-mono text-xs font-medium uppercase tracking-widest text-[var(--text-muted)]">Featured</p>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((p, i) => (
              <ProjectCard key={p.title} project={p} index={i} onClick={() => setSelected(p)} large />
            ))}
          </div>
        </section>

        {/* Others */}
        <section className="pb-24">
          <Reveal>
            <p className="mb-6 mt-10 font-mono text-xs font-medium uppercase tracking-widest text-[var(--text-muted)]">More experiments</p>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {others.map((p, i) => (
              <ProjectCard key={p.title} project={p} index={i + featured.length} onClick={() => setSelected(p)} />
            ))}
          </div>
        </section>
      </main>

      <Footer />

      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </div>
  );
}

const ProjectCard = ({ project, index, onClick, large = false }) => (
  <motion.article
    initial={{ opacity: 0, y: 32 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{ delay: (index % 3) * 0.1, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
    whileHover={{ y: -6 }}
    onClick={onClick}
    className={`group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] transition-colors duration-300 hover:border-[var(--accent)]/50 hover:shadow-2xl ${large ? 'md:col-span-1' : ''}`}
  >
    {/* Visual */}
    <div className={`relative ${large ? 'h-52' : 'h-40'} overflow-hidden bg-gradient-to-br ${project.gradient}`}>
      {project.image ? (
        <>
          <img src={project.image} alt={`${project.title} homepage`} loading="lazy" className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]" />
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
          <div className="absolute -right-8 -top-10 h-32 w-32 rounded-full bg-white/15 blur-2xl transition-transform duration-700 group-hover:scale-150" />
          <div className="absolute -bottom-10 -left-6 h-24 w-24 rounded-full bg-black/20 blur-2xl" />
        </>
      )}
      <div className="absolute bottom-4 left-5 right-5">
        <motion.p
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 + index * 0.05 }}
          className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-white/60"
        >
          {project.category}
        </motion.p>
        <p className="mt-1 font-display text-2xl font-semibold italic text-white md:text-3xl">{project.title}</p>
      </div>
      <motion.span
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 + index * 0.05 }}
        className="absolute right-4 top-4 rounded-full bg-black/25 px-3 py-1 font-mono text-[10px] font-medium text-white backdrop-blur-sm"
      >
        {project.year}
      </motion.span>
    </div>

    {/* Body */}
    <div className="flex flex-1 flex-col p-5">
      <p className="flex-1 text-sm leading-relaxed text-[var(--text-secondary)]">{project.desc}</p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.tags.map(tag => (
          <span key={tag} className="rounded-md bg-[var(--bg-subtle)] px-2 py-1 text-[11px] font-semibold text-[var(--text-secondary)]">
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-5 flex items-center justify-between border-t border-[var(--border)] pt-4 text-xs font-semibold">
        <span className="text-[var(--text-muted)]">{project.featured ? '★ Featured' : 'Experiment'}</span>
        <span className="text-[var(--accent)] transition-transform duration-300 group-hover:translate-x-1">Read more →</span>
      </div>
    </div>
  </motion.article>
);
