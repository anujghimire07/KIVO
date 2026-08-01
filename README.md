# KIVO

A minimal task manager built to keep your workflow calm, organized, and beautifully simple. Add tasks, set priorities, track progress with a live completion ring, and keep a full calendar view — all in one clean space.

**Live site:** https://kivo-gules.vercel.app/

## Features

- Add, edit, and delete tasks in seconds
- Set priorities from No Priority to High
- Toggle tasks complete with a single click
- Sort your list by priority or date
- Filter by All, Pending, or Completed
- Track progress with a live completion ring
- Browse a full month calendar view
- Secure user authentication (JWT)
- Light/dark theme toggle
- Contact form powered by Formspree

## Pages

- `/` — Home
- `/about` — About KIVO
- `/contact` — Contact form
- `/login` — Sign in
- `/signup` — Create an account
- `/dashboard/tasks` — Task dashboard (protected)
- `/dashboard/calendar` — Calendar view (protected)

## Tech Stack

### Frontend

- React 19 + Vite
- Tailwind CSS
- React Router
- lucide-react icons

### Backend

- Node.js + Express
- MongoDB (Mongoose)
- JWT authentication with bcrypt

## Getting Started

### Frontend

```bash
cd Frontend
npm install
npm run dev
```

### Backend

```bash
cd Backend
npm install
npm start
```

### Environment Variables

**Backend (`Backend/.env`)**

| Variable | Description |
| --- | --- |
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret used to sign JWTs |
| `CLIENT_URL` | Allowed frontend origin(s), comma-separated |
| `NODE_ENV` | Set to `production` in production |
| `PORT` | Server port (defaults to 8000) |

**Frontend (`Frontend/.env`)**

- `VITE_API_URL` — Base URL of the backend API

The contact form endpoint and displayed email live in `Frontend/src/config.js`.

## Deployment

The frontend is deployed on Vercel using `vercel.json` for SPA rewrites. The backend can be deployed on any Node.js host (Render, Railway, etc.); point `VITE_API_URL` and `CLIENT_URL` to the deployed backend.
