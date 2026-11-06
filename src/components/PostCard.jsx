import { Link } from 'react-router-dom';
import { ArrowUpRight, Clock } from 'lucide-react';
import { Reveal } from './chrome';

/* Generated cover art — gradient + editorial typography, no external images needed */
export const BlogBanner = ({ post, className = '' }) => (
  <div className={`relative overflow-hidden bg-gradient-to-br ${post.gradient} ${className}`}>
    {/* decorative grid */}
    <div
      className="absolute inset-0 opacity-[0.15]"
      style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.4) 1px, transparent 1px)',
        backgroundSize: '28px 28px'
      }}
    />
    {/* big ghost letter */}
    <span className="absolute -bottom-8 -right-4 select-none font-display text-[7rem] font-bold leading-none text-white/15">
      {post.title.charAt(0)}
    </span>
    {/* top row: tag + date */}
    <div className="absolute left-4 top-4 flex items-center gap-2">
      <span className="rounded-full bg-black/30 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-sm">
        {post.tag}
      </span>
    </div>
    <div className="absolute bottom-4 left-4 right-4">
      <p className="font-mono text-[10px] font-medium uppercase tracking-widest text-white/70">
        {post.date} · {post.readTime}
      </p>
    </div>
  </div>
);

export const PostCard = ({ post, index = 0 }) => {
  const inner = (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[var(--accent)]/50 hover:shadow-xl">
      <BlogBanner post={post} className="aspect-[16/9] w-full transition-transform duration-500 group-hover:scale-[1.03]" />
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-base font-bold tracking-tight transition-colors group-hover:text-[var(--accent)] md:text-lg">
          {post.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--text-secondary)]">{post.excerpt}</p>
        {(post.readTime || post.views) && (
          <div className="mt-4 flex items-center justify-between border-t border-[var(--border)] pt-4">
            {post.readTime && (
              <span className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
                <Clock size={12} /> {post.readTime}
              </span>
            )}
            {post.views && (
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--accent)]">
                {post.views}
                <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            )}
          </div>
        )}
      </div>
    </article>
  );

  if (post.link && post.link !== '#') {
    return (
      <Reveal delay={index * 0.07} className="h-full">
        <a href={post.link} target="_blank" rel="noopener noreferrer" className="block h-full">
          {inner}
        </a>
      </Reveal>
    );
  }

  return <Reveal delay={index * 0.07} className="h-full">{inner}</Reveal>;
};
