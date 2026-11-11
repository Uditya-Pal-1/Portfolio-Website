/* global process */
// Vercel serverless function — POST /api/contact (Nodemailer + SMTP)
// Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO in Vercel env vars.
// Without SMTP creds it accepts the message and returns ok.

import nodemailer from 'nodemailer';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

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

  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS && process.env.CONTACT_TO) {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 465),
        secure: Number(process.env.SMTP_PORT || 465) === 465,
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
      });
      await transporter.sendMail({
        from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
        to: process.env.CONTACT_TO,
        replyTo: email.trim(),
        subject: `Portfolio message from ${name.trim()}`,
        text: `${message.trim()}\n\n— ${name.trim()} <${email.trim()}>`,
        html: `<p>${message.trim().replace(/</g, '&lt;').replace(/\n/g, '<br>')}</p><hr><p>— ${name.trim()} &lt;${email.trim()}&gt;</p>`
      });
    } catch (err) {
      console.error('SMTP send failed:', err);
      return res.status(502).json({ error: 'Email delivery failed.' });
    }
  }

  res.status(201).json({ ok: true });
}
