import { useMemo, useState } from 'react';
import { Nav, Footer, Reveal, BackButton } from '../components/chrome';
import { PostCard } from '../components/PostCard';
import { usePosts } from '../data/usePosts';

const FILTERS = ["All", "Blog", "CSS", "Tailwind", "Animation", "Three.js"];

export default function Blogs({ theme, toggleTheme }) {
  const [filter, setFilter] = useState("All");
  const POSTS = usePosts();

  const posts = useMemo(
    () => (filter === "All" ? POSTS : POSTS.filter(p => p.tag === filter)),
    [filter, POSTS]
  );

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <Nav theme={theme} toggleTheme={toggleTheme} />

      <main className="mx-auto max-w-6xl px-5">
        <section className="pb-8 pt-16 md:pt-24">
          <BackButton />
          <Reveal>
            <p className="font-mono text-xs font-medium uppercase tracking-[0.25em] text-[var(--accent)]">
              Writing
            </p>
            <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-6xl">
              Articles & <span className="italic text-[var(--accent)]">Notes</span>
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--text-secondary)]">
              Deep dives on CSS, animation, and modern web development — things I learn while building.
            </p>
          </Reveal>
        </section>

        {/* Filter chips */}
        <Reveal delay={0.1}>
          <div className="mb-10 flex flex-wrap gap-2">
            {FILTERS.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-all ${
                  filter === f
                    ? 'border-[var(--accent)] bg-[var(--accent)] text-white'
                    : 'border-[var(--border)] bg-[var(--bg-card)] text-[var(--text-secondary)] hover:border-[var(--accent)]/50 hover:text-[var(--accent)]'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </Reveal>

        {posts.length > 0 ? (
          <div className="grid gap-6 pb-24 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <PostCard key={post.slug} post={post} index={i} />
            ))}
          </div>
        ) : (
          <p className="pb-24 text-sm text-[var(--text-muted)]">No articles in this category yet.</p>
        )}
      </main>

      <Footer />
    </div>
  );
}
