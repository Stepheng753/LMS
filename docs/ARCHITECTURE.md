# LMS Platform Architecture

## System Overview

A client-side static web app built with **React 19**, **Vite 6**, **TypeScript** and **Tailwind CSS 4**. There is no
backend: content is bundled with the app and progress is stored in the browser.

For the reason this project exists, see [PURPOSE.md](PURPOSE.md).

---

## 1. Directory Layout

```
.
├── docs/                         Project documentation
├── public/logo.svg               Logo and favicon
├── scripts/
│   ├── system.sh                 Start / stop / restart / status for the dev server
│   └── generate-file-icons.mjs   Builds the file-tree icon data (see section 6)
├── src/
│   ├── components/
│   │   ├── common/               Header (navbar + scroll progress), Footer, ProgressBar, Badge
│   │   ├── content/              Lesson building blocks (see MODULE_CREATION_GUIDE.md)
│   │   ├── layout/               DashboardLayout, ModuleSidebar, StepViewerLayout, StepNav, OnThisPage
│   │   └── ui/                   Ink-blot carousel used on the home page
│   ├── modules/                  Learning tracks: SWE/, Finance/, and index.ts (the registry)
│   ├── styles/style.css          Theme tokens, typography, scrollbar, code highlighting
│   ├── types/lms.ts              Module / Stage / Step types
│   ├── utils/storage.ts          Completed-step persistence (localStorage)
│   ├── App.tsx                   View controller and hash router
│   └── main.tsx
├── index.html
├── vite.config.ts
└── tsconfig*.json                See "TypeScript configs" below
```

---

## 2. Data Model

Defined in `src/types/lms.ts`:

- **Module** has `stages[]`
- **Stage** has `steps[]`
- **Step** has an `id`, an `order` (e.g. `1.0`), a `title`, `estimatedMinutes` and a React `component` that renders the lesson

Modules are registered in `src/modules/index.ts` (`ALL_MODULES`). Everything else (home page cards, navbar module
switcher, sidebar, next/previous navigation) is derived from that list.

---

## 3. Routing & State

- **Hash routing:** URLs look like `#/swe/swe-1-0` (module slug / step id). A `hashchange` listener in `App.tsx`
  keeps the view in sync, so links can be bookmarked and refreshes keep your place. No router library is used.
- **Views:** an empty hash shows the home page (`DashboardLayout`); otherwise the course reader is shown.
- **Progress:** completed step ids are stored under the `lms_completed_steps` localStorage key. Clicking **Next Step**
  (or pressing the right arrow key) marks the current step complete; **Mark as Complete** toggles it.

---

## 4. Course Reader Layout

```
Header (sticky, 56px)  — logo · module switcher · scroll-progress line
├── ModuleSidebar      — all tracks link, module info, progress, stages & steps
├── StepViewerLayout   — breadcrumb, mark complete, the lesson, StepNav (prev/next cards)
└── OnThisPage         — right rail outline of the lesson's sections (screens ≥ 1536px)
```

Notable behaviours:
- **Resizable sidebar:** drag its right edge (240–900px, default 550px). Width is saved in localStorage
  (`lms.sidebarWidth.v3`); double-click the edge to reset.
- **Mobile:** below the `md` breakpoint the sidebar becomes a slide-in drawer opened by the navbar's "Steps" button.
- **Keyboard:** left and right arrow keys move between steps (ignored while typing in an input).
- **On this page:** built at runtime from `h2[id]` elements inside `.lms-content`, with scroll-spy highlighting.

---

## 5. Lesson Content

Each step is a React component built from the components in `src/components/content/`. Typography for plain
`p`, `ul`, `ol`, `code` and headings is applied by `.lms-content` in `style.css`, scoped to the lesson root's direct
children so the components keep their own styling. See [MODULE_CREATION_GUIDE.md](MODULE_CREATION_GUIDE.md).

---

## 6. Dependencies Worth Knowing

| Package | Used for |
|---|---|
| `lucide-react` | UI icons |
| `prismjs` | Syntax highlighting in `CodeBlock` (languages are imported individually in `CodeBlock.tsx`) |
| `@iconify-json/vscode-icons` (dev) | Source of the file-tree icons |

**File-tree icons:** the full vscode-icons set is 3.8MB, so `scripts/generate-file-icons.mjs` copies only the icons
we use into `src/components/content/fileIconData.ts` (generated, do not edit). To add one: add its name to the lists
in the script, map it in `fileIcons.ts`, then run `node scripts/generate-file-icons.mjs`.

---

## 7. TypeScript Configs

The three `tsconfig` files are the standard Vite layout:

| File | Covers |
|---|---|
| `tsconfig.json` | Only references the other two |
| `tsconfig.app.json` | Browser code in `src/` (DOM types, React JSX) |
| `tsconfig.node.json` | `vite.config.ts`, which runs in Node |

`npm run build` runs `tsc -b` (type check, strict, no unused locals) and then `vite build`. The incremental-build cache
is written to `node_modules/.tmp/` and `*.tsbuildinfo` is gitignored.

---

## 8. Build & Deploy

See [DEPLOYMENT.md](DEPLOYMENT.md).
