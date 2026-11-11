import { useState } from 'react';
// eslint-disable-next-line no-unused-vars -- `motion` is used via JSX member expressions
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, Loader2, Mail, ArrowUpRight } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || '';
const EMAIL = 'Uditya2024@gmail.com';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [focused, setFocused] = useState(null);

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));
  const bind = k => ({
    value: form[k],
    onChange: set(k),
    onFocus: () => setFocused(k),
    onBlur: () => setFocused(null)
  });

  const submit = async e => {
    e.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');
    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (!res.ok) throw new Error();
      setStatus('sent');
      setForm({ name: '', email: '', message: '' });
    } catch {
      const subject = encodeURIComponent(`Portfolio inquiry from ${form.name || 'a visitor'}`);
      const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
      window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
      setStatus('idle');
    }
  };

  const inputCls = k => `w-full rounded-xl border bg-[var(--bg)] px-4 py-3.5 text-sm text-[var(--text)] placeholder:text-[var(--text-muted)] outline-none transition-all duration-300 ${
    focused === k ? 'border-[var(--accent)] shadow-[0_0_0_3px_var(--accent-soft)]' : 'border-[var(--border)]'
  }`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-2xl"
    >
      <AnimatePresence mode="wait">
        {status === 'sent' ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-4 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 px-6 py-6"
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.1 }}
            >
              <CheckCircle2 size={28} className="shrink-0 text-emerald-500" />
            </motion.span>
            <div>
              <p className="text-base font-bold">Message sent</p>
              <p className="text-sm text-[var(--text-secondary)]">Thanks for reaching out — I'll get back to you soon.</p>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            exit={{ opacity: 0, y: -12 }}
            onSubmit={submit}
            className="relative overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] p-6 shadow-xl md:p-8"
          >
            {/* accent glow */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[var(--accent)]/10 blur-3xl" />

            <div className="relative grid gap-4 md:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Name</span>
                <input required minLength={2} placeholder="Your name" className={inputCls('name')} {...bind('name')} />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Email</span>
                <input required type="email" placeholder="you@example.com" className={inputCls('email')} {...bind('email')} />
              </label>
              <label className="block md:col-span-2">
                <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Message</span>
                <textarea
                  required minLength={10} rows={4}
                  placeholder="Tell me about your project, role or opportunity…"
                  className={`${inputCls('message')} resize-none`}
                  {...bind('message')}
                />
              </label>

              <div className="flex flex-wrap items-center justify-between gap-4 md:col-span-2">
                <motion.button
                  type="submit"
                  disabled={status === 'sending'}
                  whileHover={{ scale: status === 'sending' ? 1 : 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group inline-flex items-center gap-2.5 rounded-full bg-[var(--accent)] px-8 py-4 text-sm font-bold text-white shadow-lg shadow-[var(--accent)]/25 transition-all hover:brightness-110 disabled:opacity-60"
                >
                  {status === 'sending' ? (
                    <><Loader2 size={17} className="animate-spin" /> Sending…</>
                  ) : (
                    <>Send message <Send size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5" /></>
                  )}
                </motion.button>

                <a
                  href={`mailto:${EMAIL}`}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--text-secondary)] transition-colors hover:text-[var(--accent)]"
                >
                  <Mail size={15} /> {EMAIL}
                  <ArrowUpRight size={13} />
                </a>
              </div>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
