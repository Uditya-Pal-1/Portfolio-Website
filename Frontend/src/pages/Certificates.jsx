import { Nav, Footer, Reveal, BackButton, SectionHead } from '../components/chrome';
import { CERT_GROUPS } from '../data/certificates';
import CertThumb from '../components/CertThumb';
import { Award, ExternalLink } from 'lucide-react';

export default function Certificates({ theme, toggleTheme }) {
  const total = CERT_GROUPS.reduce((n, g) => n + g.items.length, 0);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <Nav theme={theme} toggleTheme={toggleTheme} />

      <main className="mx-auto max-w-6xl px-5">
        <section className="pb-10 pt-16 md:pt-24">
          <BackButton />
          <Reveal>
            <p className="font-mono text-xs font-medium uppercase tracking-[0.25em] text-[var(--accent)]">Credentials</p>
            <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-6xl">
              Certificates & <span className="italic text-[var(--accent)]">Credentials</span>
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--text-secondary)]">
              {total}+ certificates and internship documents — IBM SkillsBuild, Infosys SPR, Oracle, Cisco and more. Click any card to view the document.
            </p>
          </Reveal>
        </section>

        {CERT_GROUPS.map((group, gi) => (
          <section key={group.category} className="pb-14">
            <SectionHead index={`0${gi + 1}`} title={group.category} />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {group.items.map((cert, i) => (
                <Reveal key={cert.title} delay={i * 0.05}>
                  <a
                    href={cert.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-[var(--bg-card)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${cert.premium ? 'border-[var(--accent)]/60 shadow-[0_0_35px_-12px_var(--accent)] hover:border-[var(--accent)]' : 'border-[var(--border)] hover:border-[var(--accent)]/50'}`}
                  >
                    {cert.premium && (
                      <span className="absolute left-3 top-3 z-10 flex items-center gap-1 rounded-full bg-[var(--accent)] px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-widest text-white shadow-lg">
                        <Award size={10} /> Milestone
                      </span>
                    )}
                    <div className="relative h-44 overflow-hidden bg-[var(--bg-subtle)]">
                      <CertThumb file={cert.file} title={cert.title} className="transition-transform duration-500 group-hover:scale-[1.04]" />
                      <span className={`absolute top-3 flex h-8 w-8 items-center justify-center rounded-lg bg-black/55 text-white backdrop-blur-sm ${cert.premium ? 'left-24' : 'left-3'}`}>
                        <Award size={15} />
                      </span>
                      <span className="absolute right-3 top-3 rounded-full bg-black/60 px-2.5 py-1 font-mono text-[10px] font-medium text-white backdrop-blur-sm">{cert.year}</span>
                    </div>
                    <div className="flex flex-1 flex-col p-4">
                      <h3 className="text-sm font-bold tracking-tight transition-colors group-hover:text-[var(--accent)] md:text-base">
                        {cert.title}
                      </h3>
                      <p className="mt-1 text-xs text-[var(--text-muted)]">{cert.issuer}</p>
                      <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--accent)]">
                        View certificate <ExternalLink size={12} className="transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </a>
                </Reveal>
              ))}
            </div>
          </section>
        ))}
      </main>

      <Footer />
    </div>
  );
}
