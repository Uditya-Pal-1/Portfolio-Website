# Uditya Pal — Portfolio

Personal portfolio website for **Uditya Pal (Aman Pal)** — Full-Stack MERN Developer.
React 19 + Vite frontend, Node.js/Express backend, deployed as a single production app.

## Structure

```
MyPortfolio/
├── Frontend/          # React + Vite + Tailwind CSS v4 app
│   ├── src/           # pages, components, data
│   ├── public/        # images, certificates, resume, logos
│   └── dist/          # production build output
├── Backend/           # Express API + static host
│   ├── server.js      # /api/contact, /api/health, serves Frontend/dist
│   ├── data/          # contact messages store (auto-created)
│   └── .env.example   # PORT, CORS_ORIGIN
└── Assets/            # source screenshots/assets
```

## Quick start (development)

```bash
# 1. Frontend
cd Frontend
npm install
npm run dev        # http://localhost:5173

# 2. Backend (optional — API only)
cd ../Backend
npm install
cp .env.example .env
npm run dev        # http://localhost:3000
```

## Production build

```bash
cd Frontend && npm run build   # outputs Frontend/dist
cd ../Backend && npm install && npm start   # serves API + the built site on :3000
```

The backend serves `Frontend/dist` automatically when it exists — one process, one port.

## Environment variables

| Variable         | Where                    | Description                                        |
|------------------|--------------------------|----------------------------------------------------|
| `PORT`           | Backend                  | Server port (platforms inject this)                |
| `CORS_ORIGIN`    | Backend                  | Comma-separated frontend origins for `/api/*`      |
| `SMTP_HOST`       | Backend / Vercel         | SMTP server (e.g. `smtp.gmail.com`)               |
| `SMTP_PORT`       | Backend / Vercel         | SMTP port (465 SSL / 587 TLS)                     |
| `SMTP_USER`       | Backend / Vercel         | SMTP login email                                  |
| `SMTP_PASS`       | Backend / Vercel         | SMTP password / Gmail App Password                |
| `CONTACT_TO`      | Backend / Vercel         | Inbox that receives contact messages              |
| `VITE_API_URL`   | Frontend (build time)    | Backend base URL if API is hosted separately       |

The contact form posts to `/api/contact`. On Vercel, `Frontend/api/contact.js`
runs as a serverless function — set `RESEND_API_KEY` + `CONTACT_TO` in the
Vercel dashboard and messages arrive by email. Without them the form falls
back to opening the visitor's mail client.

## API

- `GET /api/health` — health check
- `POST /api/contact` — `{ name, email, message }` → stores to `Backend/data/messages.json`
  - Validated, rate-limited (5 requests / 10 min / IP), 10kb body limit

## Deploy

**Option A — single service (recommended):**
Deploy the repo root on Railway / Render / VPS. Build command `cd Frontend && npm install && npm run build`, start command `cd Backend && npm install && npm start`.

**Option B — split:**
- Frontend → Vercel/Netlify (static `dist/`)
- Backend → Railway/Render, set `CORS_ORIGIN` to your frontend URL

## Scripts

| Command             | Description            |
|---------------------|------------------------|
| `npm run dev`       | Vite dev server        |
| `npm run build`     | Production build       |
| `npm run lint`      | ESLint check           |
| `npm start` (Backend) | Run API + static host |
