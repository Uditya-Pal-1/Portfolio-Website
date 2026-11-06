// eslint-disable-next-line no-unused-vars -- `motion` is used via JSX member expressions
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, Plus } from 'lucide-react';

export default function ProjectModal({ project, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <motion.div
        initial={{ scale: 0.96, opacity: 0, y: 12 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.96, opacity: 0, y: 12 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] shadow-2xl"
      >
        <div className={`h-2 w-full bg-gradient-to-r ${project.gradient}`} />
        <div className="p-6 md:p-8">
          <div className="mb-6 flex items-start justify-between">
            <div>
              <p className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--accent)]">{project.category} · {project.year}</p>
              <h2 className="mt-1 font-display text-2xl font-semibold tracking-tight md:text-3xl">{project.title}</h2>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {project.tags.map(tag => (
                  <span key={tag} className="rounded-md bg-[var(--bg-subtle)] px-2 py-1 text-[11px] font-semibold text-[var(--text-secondary)]">{tag}</span>
                ))}
              </div>
            </div>
            <button onClick={onClose} className="rounded-full p-2 text-[var(--text-muted)] transition-colors hover:bg-[var(--bg-subtle)] hover:text-[var(--text)]" aria-label="Close">
              <Plus size={20} className="rotate-45" />
            </button>
          </div>
          <p className="mb-8 leading-relaxed text-[var(--text-secondary)]">{project.details || project.desc}</p>
          <div className="flex gap-3 border-t border-[var(--border)] pt-6">
            {project.codeUrl && project.codeUrl !== "#" && (
              <a href={project.codeUrl} target="_blank" rel="noopener noreferrer" className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-[var(--border)] py-3 text-sm font-semibold transition-colors hover:bg-[var(--bg-subtle)]">
                <Github size={16} /> View Code
              </a>
            )}
            {project.liveUrl && project.liveUrl !== "#" && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[var(--accent)] py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90">
                Live Preview <ExternalLink size={15} />
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
