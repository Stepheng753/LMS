# Purpose

## Why this exists

This is a personal learning platform. I built it so my partner has a structured, self-paced place to learn new
things ahead of her move to the US.

It is not a product and it is not meant for a wide audience. It is a study space for one person, built around the
topics that will be useful to her in her new life there, with room to grow as her needs become clearer.

## Who it's for

- **One learner**, studying at her own pace, on her own schedule.
- Someone who prefers short, clear lessons with a way to check understanding, not long textbooks.
- Content is written in plain language and assumes no prior background in each topic.

## What it should feel like

- **Calm and focused.** One lesson at a time, nothing competing for attention.
- **Low pressure.** No accounts, no scores that matter, no deadlines. Quizzes are for confidence, not grading.
- **Easy to pick up again.** Progress is remembered, so she can stop and resume at any point.
- **Encouraging.** Clear progress indicators, worked examples, and hints before answers.

## Starting tracks

| Track | Why it's here |
|---|---|
| **Software Engineering** | Terminal, file system and tooling fundamentals |
| **Finance & Valuation** | Markets, financial statements and valuation basics |

These are starting points. The platform is built so new tracks can be added without touching the app itself
(see [MODULE_CREATION_GUIDE.md](MODULE_CREATION_GUIDE.md)). Likely future tracks are whatever turns out to matter
most for settling in and building a career in the US.

## Design principles

1. **Simple to run.** A static front end with no backend or database, hosted on a personal server.
2. **Private by default.** Progress lives in the browser's local storage. Nothing is collected or sent anywhere.
3. **Content is easy to write.** A lesson is one file built from a small set of ready-made components.
4. **Consistent look.** Every lesson shares the same typography and components, so it never feels patchy.
5. **Grow slowly.** Add tracks and lessons as they're needed rather than building everything up front.

## Non-goals

- Multi-user accounts, grading, certificates or analytics
- Syncing progress between devices (progress is per browser for now)
- Competing with full learning platforms

## Success

She finds it easy to open, enjoys using it, and feels more prepared for the move because of it.

---

*See also:* [ARCHITECTURE.md](ARCHITECTURE.md) · [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) · [DEPLOYMENT.md](DEPLOYMENT.md)
