# Design System

All tokens live in `src/styles/style.css` as CSS custom properties and are exposed to Tailwind (e.g. `bg-card`,
`text-primary`, `border-border`).

## Colour tokens

| Token | Value | Used for |
|---|---|---|
| `--background` | `#faf7f5` | Page background (warm parchment) |
| `--card` | `#f3eee9` | Boxes that sit on the page: tables, tabs, tree, quizzes |
| `--muted` | `#e9e1da` | Header strips inside cards, zebra rows |
| `--border` | `#ddd0c1` | Dividers and card outlines |
| `--sidebar` | `#f0ebe8` | Course sidebar |
| `--primary` | `#9b2c2c` | Brand burgundy: links, selection, buttons |
| `--foreground` | `#1a1a1a` | Body text |
| `--muted-foreground` | `#57534e` | Secondary text |

Status colours (Tailwind palettes): emerald for success, red for errors, amber for tips.

## Typography

- **Headings:** Libre Baskerville (serif)
- **Body:** Poppins (sans)
- **Code:** IBM Plex Mono

Lesson body text is 16px at a 1.7 line height. The reading column is about 54rem wide including padding.

## Buttons

- **Primary actions** (Next Step, Mark as Complete, Submit Answer, Start Track) are outlined: red border, red text,
  light red tint on hover. They are not filled.
- **Selection** is shown with a red bottom border (navbar tabs) or a filled red row (current sidebar step).
- Every enabled button shows a pointer cursor; disabled ones show `not-allowed` (global rule in `style.css`).

## Code blocks

`CodeBlock` and `TerminalBlock` share the `CodeFrame` chrome in the **GitHub dark** palette
(`#0d1117` background, `#161b22` header, `#30363d` borders). Syntax token colours are defined in `style.css` under
`.lms-code`. Terminal blocks are told apart by the header icon and label.

## Scrollbar

Always visible: 12px, with a taupe thumb on a muted track, turning burgundy on hover. Firefox uses the standard
`scrollbar-color` properties instead.

## Layout conventions

- Cards use `rounded-lg`; the home-page module card uses `rounded-xl`.
- The navbar is 56px tall and sticky; the sidebar is sticky beneath it.
- Prefer the shared content components over one-off markup so lessons stay consistent.
