# Academy LMS

A small, self-hosted learning platform: self-paced tracks, short lessons, quizzes and exercises, with progress
remembered in the browser. Built with **React 19**, **Vite**, **TypeScript** and **Tailwind CSS 4**.

It was built as a personal study space to help my partner learn new things ahead of her move to the US.
See [docs/PURPOSE.md](docs/PURPOSE.md).

## Features

- **Tracks, stages and steps** loaded from a single registry, with per-stage and per-track progress
- **Course reader** with a resizable sidebar, section outline ("On this page"), previous/next cards and arrow-key navigation
- **Rich lesson components:** terminal and code blocks (syntax highlighted), file trees, tables, charts, formulas,
  tabs, callouts, worked examples and several quiz types
- **Mobile friendly:** the sidebar becomes a slide-in drawer on small screens
- **No backend:** hash routing, and progress stored in `localStorage`

## Quick Start

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type check + production build
```

Or manage a background server with the helper script:

```bash
./scripts/system.sh --start     # start (logs to logs/system.log)
./scripts/system.sh --status
./scripts/system.sh --restart
./scripts/system.sh --stop
```

## Project Structure

```
.
├── docs/                 Documentation (see below)
├── public/               Logo / favicon
├── scripts/              system.sh (server start/stop helper)
├── src/
│   ├── components/       common/, content/ (lesson blocks), layout/, ui/
│   ├── modules/          SWE/, Finance/, and index.ts (the registry)
│   ├── styles/style.css  Theme tokens and typography
│   ├── types/            Module / Stage / Step types
│   ├── utils/            Progress storage
│   └── App.tsx           View controller and hash router
└── .github/workflows/    Deploy on push to main
```

## Documentation

| Doc | What's in it |
|---|---|
| [docs/PURPOSE.md](docs/PURPOSE.md) | Why this exists and who it's for |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | How the app is put together |
| [docs/MODULE_CREATION_GUIDE.md](docs/MODULE_CREATION_GUIDE.md) | Writing new tracks and lessons, plus the component reference |
| [docs/DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md) | Colours, typography, buttons, code theme |
| [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) | CI/CD and the GitHub secrets you need |

## Deployment

Pushing to `main` deploys to the home server through Tailscale and SSH. It needs four repository secrets
(`TS_OAUTH_CLIENT_ID`, `TS_OAUTH_SECRET`, `SERVER_IP`, `SSH_PRIVATE_KEY`).
Setup steps are in [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).

## Adding Content

Create a step file, register it in the module's `index.ts`, and it appears everywhere automatically.
See [docs/MODULE_CREATION_GUIDE.md](docs/MODULE_CREATION_GUIDE.md).
