# AGENTS.md

## What this project is

Static front-end EAD (distance-learning) platform — plain HTML/CSS/JS pages at the
repo root (`index.html`, `student-dashboard.html`, `supervisor-dashboard.html`,
`training-view.html`, `quiz.html`, `certificates.html`) plus `css/style.css`,
`js/api.js` and `js/auth.js`.

Non-obvious facts worth knowing before changing anything:

- **There is no backend, no database service and no external credentials.** All
  data lives in the browser's `localStorage` under the key `cp_ead_db`, seeded on
  first load by `js/api.js`. `database/schema.sql` is a *reference model only* —
  nothing executes it; do not stand up Postgres/MySQL because of it.
- `js/api.js` and `js/auth.js` are plain scripts, not ES modules: they attach
  themselves to `window` (`window.api`, `window.auth`) and rely on global scripts
  being loaded in order before the page's inline script.
- Only external dependencies are client-side CDNs (Chart.js, Font Awesome, Google
  Fonts) and a sample video URL — nothing is fetched server-side.
- Default supervisor login: `admin@camarasepneus.com.br` / `admin123`.
- `localStorage` is per-origin, so data does not carry between different ports or
  hostnames.

## Running it here

```bash
docker compose -f docker-compose.base44.yml up -d --build
```

Serves the repo directly on host port 3000 with `python3 -m http.server` (the
command the project's own README prescribes), running from the cloned source via
a bind mount. Edits are visible after a browser refresh.

## How to verify

```bash
curl -s http://localhost:3000/index.html | head
docker compose -f docker-compose.base44.yml ps
```

`/index.html` is the health path and must return real markup.

## Gotchas

- The project has no toolchain (no `package.json`, no build step), so there is no
  HMR watcher: after an edit, force a preview refresh rather than expecting the
  page to update on its own.
- `python3 -m http.server` has no host/origin allowlisting, so the proxied
  preview hostname works without extra configuration.
- The original code arrived on branch `codex/criar-plataforma-ead-completa`;
  `main` was an empty placeholder. This branch carries those files forward.
