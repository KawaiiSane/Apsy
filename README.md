# APSYLab

**AiInPsychology (Ψ)** — Where minds meet machines.

A Next.js app for the APSYLab research initiative: marketing landing page plus a **student workspace** to organize psychology and computer science work side by side.

## Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS v4
- NextAuth.js (Google sign-in)
- PostgreSQL + Prisma
- Light mode UI (teal + amber accents)
- Unsplash images (nature + tech)

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Start PostgreSQL

This project includes a Docker Compose file. Port **5433** is used because 5432 may already be taken on your machine.

```bash
docker compose up -d
```

### 3. Configure environment variables

Copy the example file and fill in your values:

```bash
cp .env.example .env
```

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | Postgres connection string (default: `postgresql://apsylab:apsylab@localhost:5433/apsylab`) |
| `AUTH_SECRET` | Random secret for session encryption — generate with `openssl rand -base64 32` |
| `AUTH_GOOGLE_ID` | Google OAuth client ID |
| `AUTH_GOOGLE_SECRET` | Google OAuth client secret |

### 4. Google OAuth setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a project (or select an existing one)
3. Enable the **Google+ API** / **Google Identity** APIs
4. Create **OAuth 2.0 Client ID** credentials (Web application)
5. Add authorized redirect URI:

   `http://localhost:3000/api/auth/callback/google`

6. Copy the Client ID and Client Secret into `.env`

### 5. Run database migrations

```bash
npx prisma migrate dev
```

### 6. Start the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Routes

- **/** — Landing page (research verticals, community, platform)
- **/workspace** — Student workspace (requires Google sign-in)
- **/api/auth/** — NextAuth.js authentication endpoints
- **/api/workspace** — Per-user workspace API (GET/PUT)

## Authentication

- Sign in with Google from the navbar
- `/workspace` is protected — unauthenticated users are redirected to the home page
- Each user gets their own workspace data stored in PostgreSQL
- Sign out from the navbar at any time

## Project structure

```
src/
  app/
    api/auth/       # NextAuth.js routes
    api/workspace/  # Workspace API
    workspace/      # Protected workspace page
  components/
    landing/        # Marketing sections
    layout/         # Navbar, Footer, AuthButton, Providers
    workspace/      # Workspace UI
  lib/
    auth.ts         # NextAuth configuration
    db.ts           # Prisma client
    workspace-db.ts # Server-side workspace persistence
prisma/
  schema.prisma     # Database schema
  migrations/       # Migration history
```

## Next steps (ideas)

- Project boards & matching (from the original concept)
- Reading rooms & public lab notebooks
- Dark mode toggle (optional)
- Production deploy with hosted Postgres (Neon, Railway, etc.)

## Reference

The original concept mockup lives in `apsylab.html`.
