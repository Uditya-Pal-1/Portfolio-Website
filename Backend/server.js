import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_DIR = path.join(__dirname, 'data');
const MESSAGES_FILE = path.join(DATA_DIR, 'messages.json');
const DIST_DIR = path.join(__dirname, '..', 'Frontend', 'dist');

// In production, allow only the deployed frontend origin (set CORS_ORIGIN in .env).
const corsOrigin = process.env.CORS_ORIGIN && process.env.CORS_ORIGIN !== '*'
  ? process.env.CORS_ORIGIN.split(',').map(o => o.trim())
  : true;

app.use(cors({ origin: corsOrigin }));
app.use(express.json({ limit: '10kb' }));

// Basic security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

// Simple in-memory rate limit for the contact endpoint (5 req / 10 min per IP)
const hits = new Map();
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;

function rateLimited(ip) {
  const now = Date.now();
  const record = hits.get(ip) || { count: 0, reset: now + RATE_WINDOW_MS };
  if (now > record.reset) {
    record.count = 0;
    record.reset = now + RATE_WINDOW_MS;
  }
  record.count += 1;
  hits.set(ip, record);
  return record.count > RATE_LIMIT;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

app.post('/api/contact', async (req, res) => {
  const ip = req.ip || req.socket.remoteAddress || 'unknown';
  if (rateLimited(ip)) {
    return res.status(429).json({ error: 'Too many requests. Please try again later.' });
  }

  const { name, email, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'name, email and message are required.' });
  }
  if (typeof name !== 'string' || name.trim().length < 2 || name.length > 120) {
    return res.status(400).json({ error: 'Invalid name.' });
  }
  if (!EMAIL_RE.test(email) || email.length > 200) {
    return res.status(400).json({ error: 'Invalid email address.' });
  }
  if (typeof message !== 'string' || message.trim().length < 10 || message.length > 5000) {
    return res.status(400).json({ error: 'Message must be between 10 and 5000 characters.' });
  }

  const entry = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
    name: name.trim(),
    email: email.trim(),
    message: message.trim(),
    createdAt: new Date().toISOString()
  };

  try {
    fs.mkdirSync(DATA_DIR, { recursive: true });
    let messages = [];
    if (fs.existsSync(MESSAGES_FILE)) {
      messages = JSON.parse(fs.readFileSync(MESSAGES_FILE, 'utf8'));
    }
    messages.push(entry);
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2));
  } catch (err) {
    console.error('Failed to persist message:', err);
    return res.status(500).json({ error: 'Could not save your message. Please email directly.' });
  }

  console.log(`New contact message from ${entry.name} <${entry.email}>`);

  // Optional: forward the message by email via SMTP/Nodemailer.
  // Accepts either SMTP_* vars or MAILTRAP_* vars.
  const smtp = {
    host: process.env.SMTP_HOST || process.env.MAILTRAP_HOST,
    port: Number(process.env.SMTP_PORT || process.env.MAILTRAP_PORT || 465),
    user: process.env.SMTP_USER || process.env.MAILTRAP_USERNAME,
    pass: process.env.SMTP_PASS || process.env.MAILTRAP_PASSWORD
  };
  if (smtp.host && smtp.user && smtp.pass && process.env.CONTACT_TO) {
    try {
      const transporter = nodemailer.createTransport({
        host: smtp.host,
        port: smtp.port,
        secure: smtp.port === 465,
        auth: { user: smtp.user, pass: smtp.pass }
      });
      await transporter.sendMail({
        from: `"Portfolio Contact" <${process.env.MAILTRAP_SENDEREMAIL || smtp.user}>`,
        to: process.env.CONTACT_TO,
        replyTo: entry.email,
        subject: `Portfolio message from ${entry.name}`,
        text: `${entry.message}\n\n— ${entry.name} <${entry.email}>`,
        html: `<p>${entry.message.replace(/</g, '&lt;').replace(/\n/g, '<br>')}</p><hr><p>— ${entry.name} &lt;${entry.email}&gt;</p>`
      });
    } catch (err) {
      console.error('Email forward failed:', err);
    }
  }

  res.status(201).json({ ok: true, id: entry.id });
});

// Serve the built frontend (production)
if (fs.existsSync(DIST_DIR)) {
  app.use(express.static(DIST_DIR, { maxAge: '1d', index: false }));
  app.get(/^(?!\/api\/).*/, (req, res) => {
    res.sendFile(path.join(DIST_DIR, 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.json({ message: 'Portfolio API is running. Build the frontend (cd Frontend && npm run build) to serve the site.' });
  });
}

// 404 for unknown API routes
app.use('/api', (req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.listen(PORT, () => {
  console.log(`Portfolio backend listening on http://localhost:${PORT}`);
});
