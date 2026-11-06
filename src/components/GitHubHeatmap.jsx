import { useEffect, useState } from 'react';
import { Github } from 'lucide-react';

/* Site-themed levels: subtle -> accent orange */
const LEVELS = [
  'color-mix(in srgb, var(--accent) 22%, var(--bg-card))',
  'color-mix(in srgb, var(--accent) 45%, var(--bg-card))',
  'color-mix(in srgb, var(--accent) 70%, var(--bg-card))',
  'color-mix(in srgb, var(--accent) 88%, var(--bg-card))',
  'var(--accent)'
];
const EMPTY = 'color-mix(in srgb, var(--text) 16%, var(--bg-card))';
const CELL = 16, GAP = 4;

export default function GitHubHeatmap() {
  const [data, setData] = useState(null);
  const [failed, setFailed] = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetch('https://github-contributions-api.jogruber.de/v4/Uditya-Pal-1?y=2026')
      .then(r => (r.ok ? r.json() : Promise.reject()))
      .then(j => setData(j))
      .catch(() => setFailed(true));
  }, []);

  if (failed) {
    return (
      <a href="https://github.com/Uditya-Pal-1" target="_blank" rel="noopener noreferrer"
        className="mt-10 flex items-center justify-center gap-2 rounded-xl border border-dashed border-[var(--border)] py-8 text-sm font-semibold text-[var(--text-secondary)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]">
        <Github size={16} /> View my GitHub activity
      </a>
    );
  }
  if (!data) {
    return <div className="mt-10 h-36 animate-pulse rounded-xl bg-[var(--bg-subtle)]" />;
  }

  const days = data.contributions;
  // pad to whole weeks and show complete year
  while (days.length % 7 !== 0) days.push(null);
  const weeks = [];
  for (let i = 0; i < days.length; i += 7) weeks.push(days.slice(i, i + 7));

  const yearTotal = data.contributions.reduce((s, d) => s + (d?.count || 0), 0);

  return (
    <div className="mt-12">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#161b22] text-white">
            <Github size={18} />
          </span>
          <div>
            <p className="text-sm font-bold">GitHub Activity</p>
            <p className="text-xs text-[var(--text-muted)]">
              {yearTotal} contributions in 2026 — live from GitHub
            </p>
          </div>
        </div>
        <a href="https://github.com/Uditya-Pal-1" target="_blank" rel="noopener noreferrer"
          className="text-xs font-semibold text-[var(--accent)] hover:underline">
          github.com/Uditya-Pal-1 →
        </a>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-5">
        <div className="flex w-max gap-[4px]">
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-[4px]">
              {Array.from({ length: 7 }).map((_, di) => {
                const d = week[di];
                const hasDay = !!d;
                const active = selected && hasDay && selected.date === d.date;
                return (
                  <button
                    key={di}
                    disabled={!hasDay}
                    onClick={() => hasDay && setSelected(active ? null : d)}
                    title={hasDay ? `${d.date} — ${d.count} contributions` : ''}
                    className={`rounded-[4px] transition-all duration-200 ${hasDay ? 'cursor-pointer hover:scale-125 hover:ring-2 hover:ring-[var(--accent)]' : 'cursor-default'}`}
                    style={{
                      width: CELL, height: CELL,
                      backgroundColor: hasDay ? (d.count > 0 ? LEVELS[Math.min(d.level, 4)] : EMPTY) : 'transparent',
                      opacity: hasDay ? 1 : 0,
                      outline: active ? '2px solid var(--accent)' : 'none',
                      outlineOffset: '1px'
                    }}
                  />
                );
              })}
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
            {selected ? (
              <span className="font-semibold text-[var(--text)]">
                {new Date(selected.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                {' — '}<span className="text-[var(--accent)]">{selected.count} contribution{selected.count === 1 ? '' : 's'}</span>
                {selected.count > 0 && <span className="ml-2 text-xs font-normal text-emerald-500">completions, pushes &amp; PRs</span>}
              </span>
            ) : (
              <span>Hover a day for details · click to pin</span>
            )}
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-[var(--text-muted)]">
            Less
            {LEVELS.map((c, i) => <span key={i} className="h-3 w-3 rounded-[4px] border border-[var(--border)]" style={{ backgroundColor: c }} />)}
            More
          </div>
        </div>
      </div>
    </div>
  );
}
