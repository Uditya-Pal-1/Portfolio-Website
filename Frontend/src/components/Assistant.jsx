import { useState, useRef, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars -- `motion` is used via JSX member expressions
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, User, Sparkles, MessageCircle } from 'lucide-react';
import { SOCIALS, PROJECTS, EDUCATION, JOURNEY } from '../data/content';

const featured = PROJECTS.filter(p => p.featured);

const AUDIENCES = [
  { id: 'guest', label: 'New here?' },
  { id: 'recruiter', label: "I'm a recruiter" }
];

const QUICK = [
  { label: 'Summarize me', q: 'summarize' },
  { label: 'My socials', q: 'socials' },
  { label: 'Resume', q: 'resume' },
  { label: 'Projects', q: 'projects' },
  { label: 'Stack', q: 'stack' },
  { label: 'Education', q: 'education' },
  { label: 'Contact', q: 'contact' },
  { label: 'Learning journey', q: 'journey' }
];

function answer(raw, audience) {
  const q = raw.toLowerCase();

  if (/summar|about|who are you|intro/.test(q))
    return {
      text: "I'm Uditya Pal (Aman Pal) — a Full-Stack Developer from Greater Noida, India. I build fast, accessible web products with React, Next.js, Node.js, Express, MongoDB and Three.js. Currently doing my MCA at Galgotias University and open to SWE roles.",
      actions: [{ label: 'View projects', href: '/projects' }, { label: 'My resume', href: '/latest%20Resume.pdf' }]
    };
  if (/social|linkedin|github|twitter|connect/.test(q))
    return {
      text: "You can find me on:",
      links: SOCIALS.filter(s => !s.href.startsWith('mailto:')).map(s => ({ label: s.label, href: s.href }))
    };
  if (/resume|cv|download/.test(q))
    return { text: "Here's my latest resume — PDF download.", actions: [{ label: 'Download Resume', href: '/latest%20Resume.pdf' }] };
  if (/project|work|portfolio|leetlab|leet/.test(q))
    return {
      text: `Featured work: ${featured.map(p => p.title).join(', ')} — plus clones and experiments. LeetLab is my flagship full-stack build (React + Node + Prisma + Judge0).`,
      actions: [{ label: 'See all projects', href: '/projects' }]
    };
  if (/stack|tech|skill|language/.test(q))
    return { text: "React, Next.js, Node.js, Express, MongoDB, MySQL, TypeScript, Python, Java, Tailwind CSS, Three.js, GSAP, Figma, Git." };
  if (/educat|degree|college|university|cgpa/.test(q))
    return {
      text: EDUCATION.map(e => `${e.school} — ${e.degree}${e.cgpa ? ` (${e.cgpa})` : ''} · ${e.period}`).join('\n')
    };
  if (/journey|cohort|learning|chai/.test(q))
    return {
      text: `${JOURNEY.program} — a ${JOURNEY.duration} by ${JOURNEY.mentor}. ${JOURNEY.path}. All assignments and builds are public on GitHub.`,
      links: [{ label: 'Chai aur Code Cohort repo', href: JOURNEY.link }]
    };
  if (/contact|email|hire|job|intern|freelance|available/.test(q))
    return {
      text: audience === 'recruiter'
        ? "I'm open to full-time SWE roles and selective freelance work. Email is fastest: Uditya2024@gmail.com — I typically reply within 24 hours. Resume is one click away."
        : "Say hello at Uditya2024@gmail.com or grab my resume — I usually reply within 24 hours.",
      actions: [
        { label: 'Email me', href: 'mailto:Uditya2024@gmail.com' },
        { label: 'Download Resume', href: '/latest%20Resume.pdf' }
      ]
    };
  if (/where|location|based|city|country/.test(q))
    return { text: "Greater Noida, Uttar Pradesh, India. Timezone: IST (UTC+5:30). Comfortable with remote and async work." };
  if (/help|what can you do|commands/.test(q))
    return {
      text: "I can tell you about my work, stack, education, learning journey and how to reach me. Try the quick shortcuts below, or pick an audience mode.",
      actions: [{ label: 'See projects', href: '/projects' }, { label: 'Read my writing', href: '/blogs' }]
    };
  if (/blog|article|write|post/.test(q))
    return { text: "I write about CSS, animation and modern web dev on my Writing page — most-read post has 5.4k views.", actions: [{ label: 'Read articles', href: '/blogs' }] };
  if (/hello|hi|hey|namaste/.test(q))
    return {
      text: audience === 'recruiter'
        ? "Hello! Thanks for checking out my portfolio. Quick links: resume ↓, projects →, or ask me anything — e.g. 'summarize me' or 'my stack'."
        : "Hey! Ask me anything — try 'summarize me', 'my projects', or 'download resume'."
    };

  return {
    text: "Hmm, I didn't quite get that. I can help with: summary, socials, resume, projects, stack, education, learning journey, contact, blogs, or location. Or pick a shortcut below.",
    actions: [{ label: 'See projects', href: '/projects' }, { label: 'Contact', href: 'mailto:Uditya2024@gmail.com' }]
  };
}

export default function Assistant() {
  const [open, setOpen] = useState(false);
  const [audience, setAudience] = useState('guest');
  const [messages, setMessages] = useState([
    { role: 'bot', text: "Hi, I'm UP — your guide to this portfolio. Pick an audience or tap a shortcut below." }
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  const send = (text) => {
    const q = text.trim();
    if (!q) return;
    setMessages(prev => [...prev, { role: 'user', text: q }]);
    setInput('');
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'bot', ...answer(q, audience) }]);
    }, 350);
  };

  const setMode = (id) => {
    setAudience(id);
    setMessages(prev => [...prev, {
      role: 'bot',
      text: id === 'recruiter'
        ? "Recruiter mode on — I can share my resume, highlight LeetLab & PrepConnect, or answer anything about experience and availability."
        : "Guest mode — I'll show you around: projects, writing, learning journey and how to reach me."
    }]);
  };

  return (
    <>
      {/* FAB */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 200 }}
        onClick={() => setOpen(!open)}
        aria-label="Open assistant"
        className="group fixed bottom-6 right-6 z-50"
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-[var(--accent)]/30 [animation-duration:2.5s]" />
        <span className={`relative flex h-14 items-center justify-center gap-2 overflow-hidden rounded-full bg-[var(--accent)] px-5 text-white shadow-2xl transition-all duration-300 group-hover:shadow-[var(--accent)]/40 group-hover:brightness-110 ${open ? 'w-14' : 'w-auto'}`}>
          {open ? <X size={22} /> : (
            <>
              <MessageCircle size={20} />
              <span className="hidden text-sm font-bold sm:inline">Ask me</span>
            </>
          )}
        </span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 right-4 z-50 flex h-[30rem] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] shadow-2xl sm:right-6"
          >
            {/* Header */}
            <div className="relative overflow-hidden border-b border-[var(--border)] bg-gradient-to-r from-[var(--accent)]/15 via-[var(--bg-subtle)] to-[var(--accent)]/10 px-4 py-3.5">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--accent)] text-white shadow-md">
                    <Sparkles size={16} />
                  </span>
                  <div>
                    <p className="text-sm font-bold leading-tight">Portfolio Assistant</p>
                    <p className="flex items-center gap-1 text-[10px] text-emerald-500">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Online — replies instantly
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-2.5 flex gap-1">
                {AUDIENCES.map(a => (
                  <button
                    key={a.id}
                    onClick={() => setMode(a.id)}
                    className={`rounded-full px-3 py-1 text-[10px] font-semibold transition-all ${
                      audience === a.id
                        ? 'bg-[var(--accent)] text-white shadow-sm'
                        : 'border border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--accent)]/50 hover:text-[var(--accent)]'
                    }`}
                  >
                    {a.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {messages.map((m, i) => (
                <div key={i} className={`flex gap-2 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <span className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${m.role === 'user' ? 'bg-[var(--bg-subtle)] text-[var(--text-secondary)]' : 'bg-[var(--accent-soft)] text-[var(--accent)]'}`}>
                    {m.role === 'user' ? <User size={12} /> : <Sparkles size={12} />}
                  </span>
                  <div className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${m.role === 'user' ? 'rounded-tr-sm bg-[var(--accent)] text-white' : 'rounded-tl-sm bg-[var(--bg-subtle)] text-[var(--text)]'}`}>
                    <p className="whitespace-pre-line">{m.text}</p>
                    {m.actions && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {m.actions.map(a => (
                          <a key={a.label} href={a.href} className="rounded-full bg-[var(--bg-card)] px-3 py-1 text-xs font-semibold text-[var(--accent)] shadow-sm transition-transform hover:scale-105">
                            {a.label}
                          </a>
                        ))}
                      </div>
                    )}
                    {m.links && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {m.links.map(l => (
                          <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className="rounded-full bg-[var(--bg-card)] px-3 py-1 text-xs font-semibold text-[var(--accent)] shadow-sm transition-transform hover:scale-105">
                            {l.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Quick shortcuts */}
            <div className="border-t border-[var(--border)] px-3 pb-1 pt-2.5">
              <div className="flex gap-1.5 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {QUICK.map(chip => (
                  <button
                    key={chip.label}
                    onClick={() => send(chip.q)}
                    className="shrink-0 rounded-full border border-[var(--border)] px-3 py-1.5 text-[11px] font-semibold text-[var(--text-secondary)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
                  >
                    {chip.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <form
              onSubmit={e => { e.preventDefault(); send(input); }}
              className="flex items-center gap-2 border-t border-[var(--border)] p-3"
            >
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Ask about projects, stack, resume..."
                className="flex-1 rounded-full border border-[var(--border)] bg-[var(--bg-subtle)] px-4 py-2.5 text-sm outline-none transition-colors placeholder:text-[var(--text-muted)] focus:border-[var(--accent)]"
              />
              <button type="submit" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-white transition-transform hover:scale-105" aria-label="Send">
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
