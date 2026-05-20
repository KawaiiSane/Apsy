# APSYLab

**AiInPsychology (Ψ)** — Where minds meet machines.

A Next.js app for the APSYLab research initiative: marketing landing page plus a **student workspace** to organize psychology and computer science work side by side.

## Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS v4
- Light mode UI (teal + amber accents)
- Unsplash images (nature + tech)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

- **/** — Landing page (research verticals, community, platform)
- **/workspace** — Student workspace (projects, notes, tasks; link psych ↔ CS items)

Workspace data is stored in the browser (`localStorage`) for now.

## Project structure

```
src/
  app/              # Routes & global styles
  components/
    landing/        # Marketing sections
    layout/         # Navbar, Footer
    workspace/      # Workspace UI
  lib/              # Types, constants, storage helpers
```

## Next steps (ideas)

- Auth & cloud sync (Supabase / Firebase)
- Project boards & matching (from the original concept)
- Reading rooms & public lab notebooks
- Dark mode toggle (optional)

## Reference

The original concept mockup lives in `apsylab.html`.
