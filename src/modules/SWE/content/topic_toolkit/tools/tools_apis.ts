// Topic 4 artifacts: skills and templates for calling external APIs, Google OAuth, AI providers and Blotato.
// Lessons import from here, and the Toolkit step offers the same text for download.

export const EXTERNAL_APIS_SKILL = `---
name: external-apis
description: How to read third-party API documentation and OpenAPI specs, and how to call external APIs safely from the backend (keys, timeouts, retries, rate limits, errors, cost). Use when integrating any outside API, or when given API docs or a Swagger/OpenAPI file.
---
# External APIs

## Before writing any code
- Read the documentation the user provides first. Saved docs and specs live in docs/api/ and are the source of truth.
- Never invent endpoints, field names, headers, URLs or model names. If something is not in the docs, say so and ask. Copy base URLs, auth header names and request shapes exactly.
- In the plan, say which doc and which endpoint each call comes from.
- Check the docs for: base URL, how to authenticate, rate limits, required fields, error format, pricing or quotas, and plan or account requirements.

## Secrets
- API keys, tokens and client secrets live only in git-ignored files in backend/config/ (secrets.json for keys). Never in code, logs, error messages, URLs, the frontend or git.
- The frontend never calls a third-party API that needs a key. The backend does.

## Calling safely
- One small client module per external service in backend/services/ (for example claude.py, blotato.py, google_sheets.py). Endpoint files call these modules and never call the service directly.
- Always set a timeout. Retry only safe or idempotent calls, with exponential backoff, and honour Retry-After on a 429. Do not retry other 4xx errors.
- Never send the same publish or payment request twice. Record a unique key for each action and check it before sending.
- Respect documented rate limits (for example Blotato: 30 requests per minute).
- Turn every failure into a clear message for the user. Never show raw tracebacks or keys.
- Log what was called, the status code and how long it took. Never log keys, tokens or personal data.
- Cap cost: set max_tokens, record usage, and make any action that spends money or posts publicly wait for human approval.

## Live data
- To use fresh data in an AI prompt: fetch it first, check it is valid, put only what is needed into the prompt, and tell the model to use only that data. If the fetch fails, do not post.

## Testing
- Unit tests use fake responses and never call the real service.
- System tests that touch a real service use a test account and are clearly marked.
- Manual SOPs describe the checks on real accounts.`;

export const GOOGLE_OAUTH_SKILL = `---
name: google-oauth
description: How to add "Connect Google" (OAuth 2.0) to the backend so the app can read the user's Google Sheets. Use when an app needs access to a person's own Google data such as Sheets or Drive.
---
# Google OAuth in the backend

## Choosing the credential
- Use OAuth when the app acts on a person's own Google data. Do not use a service account or an API key for that.

## Google Cloud setup (done once, by the user)
- Enable the Google Sheets API. Create an OAuth client of type "Web application".
- Authorised redirect URI: exactly http://localhost:8000/auth/google/callback. Add the https production address when the app is deployed.
- Scope: only https://www.googleapis.com/auth/spreadsheets.readonly. Ask for the least access needed.
- Consent screen: External. In Testing status, authorisations expire after 7 days, so for a daily job set the status to In production. It stays unverified for personal use and the owner clicks through the warning.

## The flow
- GET /auth/google/login sends the browser to Google with the client id, the scope, the redirect uri, a random state value and offline access.
- GET /auth/google/callback checks the state, exchanges the code for tokens and saves them.
- Refresh the access token automatically with the refresh token. If refreshing fails, return a clear "reconnect Google" message, not a crash.

## Files and secrets
- backend/config/google_client.json (the file downloaded from Google) and backend/config/google_token.json (saved tokens). Both are git-ignored. Their paths are in config.json.
- Never print or log tokens. Never send tokens or the client secret to the frontend.

## Libraries
- google-auth, google-auth-oauthlib and google-api-python-client, pinned in requirements.txt.`;

export const LLM_PROVIDERS_SKILL = `---
name: llm-providers
description: How to let an app use several AI providers (Claude, OpenAI, Gemini) behind one interface, with a model switcher. Use when an app calls an LLM, or when asked to add, switch or compare AI models.
---
# AI providers and the model switcher

## One interface
- A single function: generate(system, prompt, model) that returns the text plus usage (input and output tokens).
- One adapter file per provider in backend/services/: claude.py, openai.py, gemini.py. Endpoint code only talks to the interface.

## Configuration
- The list of selectable models lives in backend/config/config.json under "models": provider, model id, a label, and the price per million input and output tokens. Never hard-code model names in code.
- Keys come from backend/config/secrets.json: anthropic_api_key, openai_api_key, gemini_api_key. A provider with no key is shown as unavailable.
- Check each provider's current docs for the exact model names and the SDK call shape before writing the adapter. Names change often.
- Use each provider's official Python SDK: anthropic, openai, google-genai.

## Switching
- The chosen provider and model are stored in a settings table and changed in the UI. One request can override it. Show which model wrote each draft.

## Behaviour
- Set a maximum output length. Record usage and an estimated cost per call and show it in the UI.
- Where structured output is needed, ask for JSON that matches a schema and validate it before using it.
- Treat refusals, empty answers, timeouts and rate limits as normal, clearly explained errors.
- Generated text is always a draft for a person to approve.

## Cost safety (mandatory)
- Every model in config.json has a tier (cheap, standard, premium, check) and its prices. The app starts with the cheapest model selected until the user chooses another.
- config.json has max_daily_cost_usd. Before every call, add up today's recorded cost, and refuse with a clear message once the cap is reached. Never call a model without checking the cap first.
- Selecting a premium model shows a plain warning about its cost per draft and asks for confirmation.
- Never call a model in a loop without a fixed upper limit. Never retry a model call more than the documented limit. Never put a whole document or history into every call without being asked.
- Show estimated cost per draft and total spend today in the interface. Estimates use the prices in config, which the user keeps current.`;

export const SOCIAL_POSTING_SKILL = `---
name: social-posting
description: How to publish and schedule social media posts through the Blotato API. Use when an app must post to Instagram, TikTok, Bluesky, X or other platforms.
---
# Posting through Blotato

## Basics (confirm against Blotato's current docs before coding)
- Base URL: https://backend.blotato.com/v2. Header: blotato-api-key, with the key from secrets.json as blotato_api_key. Rate limit: 30 requests per minute.
- List connected accounts: GET /users/me/accounts. Use each account's id as accountId.
- Publish: POST /posts with a body shaped like {"post": {"accountId": "...", "content": {"text": "...", "mediaUrls": [], "platform": "bluesky"}, "target": {"targetType": "bluesky"}}}. A scheduledTime (ISO 8601 with a timezone) or useNextFreeSlot goes at the top level, never inside "post".
- A 201 response only means the post was accepted. Save postSubmissionId and poll GET /posts/{postSubmissionId} until it says published or failed.

## Platform rules
- Bluesky and X accept text-only posts.
- Instagram and TikTok need media: mediaUrls must be public addresses.
- TikTok also requires privacyLevel, disabledComments, disabledDuet, disabledStitch, isBrandedContent, isYourBrand and isAiGenerated. Set isAiGenerated honestly and ask the user if unsure.
- Instagram can set targetType instagram with mediaType reel or story. A story cannot have a caption.

## Safety
- Nothing is published without approval by default. Provide a dry-run mode that shows the exact request and sends nothing.
- Use test accounts first. Never post more than the user approved. Never send the same post twice.`;

export const SECRETS_EXAMPLE = `{
  "anthropic_api_key": "PASTE_YOUR_KEY_HERE",
  "openai_api_key": "",
  "gemini_api_key": "",
  "blotato_api_key": "PASTE_YOUR_KEY_HERE"
}`;

export const CONFIG_WITH_MODELS = `{
  "host": "127.0.0.1",
  "backend_port": 8000,
  "frontend_port": 5173,
  "database_path": "data/app.db",
  "allowed_origins": ["http://localhost:5173"],
  "google_client_file": "backend/config/google_client.json",
  "google_token_file": "backend/config/google_token.json",
  "dry_run": true,
  "max_daily_cost_usd": 1.0,
  "models": [
    {
      "provider": "claude",
      "model": "claude-haiku-5-5",
      "label": "Claude Haiku 5.5 (cheapest)",
      "tier": "cheap",
      "input_per_million": 0.1,
      "output_per_million": 0.5
    },
    {
      "provider": "claude",
      "model": "claude-sonnet-5-5",
      "label": "Claude Sonnet 5.5",
      "tier": "standard",
      "input_per_million": 2.0,
      "output_per_million": 10.0
    },
    {
      "provider": "claude",
      "model": "claude-opus-5-5",
      "label": "Claude Opus 5.5 (expensive)",
      "tier": "premium",
      "input_per_million": 4.0,
      "output_per_million": 20.0
    },
    {
      "provider": "openai",
      "model": "CHECK_OPENAI_DOCS_FOR_THE_CURRENT_MODEL",
      "label": "OpenAI",
      "tier": "check",
      "input_per_million": 0.0,
      "output_per_million": 0.0,
      "price_note": "Fill in from OpenAI's pricing page before using"
    },
    {
      "provider": "gemini",
      "model": "CHECK_GEMINI_DOCS_FOR_THE_CURRENT_MODEL",
      "label": "Gemini",
      "tier": "check",
      "input_per_million": 0.0,
      "output_per_million": 0.0,
      "price_note": "Fill in from Google's pricing page before using"
    }
  ]
}`;

export const SHEET_TEMPLATE = `date,platform,mode,prompt_or_content,media_url,data_url,post_time
2026-10-14,bluesky,prompt,"Write a friendly good-morning post about today's weather. Under 280 characters. Use only the data you are given.",,"https://api.open-meteo.com/v1/forecast?latitude=40.71&longitude=-74.01&current=temperature_2m,wind_speed_10m",09:00
2026-10-15,bluesky,content,"Reminder: our open day is on Saturday. Come and say hello!",,,10:00
2026-10-16,instagram,prompt,"Write a warm caption for this photo of our new menu. Add three hashtags.",https://example.com/photos/menu.jpg,,12:00`;

export const DAILY_POSTER_SPEC = `/plan

I want to build: a Daily Poster app. Every day it reads today's rows from a Google
Sheet that I keep as a content calendar, turns each prompt into a post with an AI
model (using fresh data when the row asks for it), lets me approve it, and posts it
to my own social accounts through Blotato.

Rules: follow my saved rules and skills (stack, fullstack-architecture,
react-frontend, fastapi-backend, system-script, testing, google-oauth,
llm-providers, social-posting, external-apis). Read the API docs in docs/api/ first,
and tell me which document each external call comes from.

My Google Sheet ("Content Calendar") has these columns:
date, platform, mode, prompt_or_content, media_url, data_url, post_time
- mode "prompt": the AI writes the post from prompt_or_content
- mode "content": post exactly what is written, with no AI
- data_url (optional): a public JSON address. Fetch it and give the data to the AI
- media_url (optional): a public image or video address (needed for Instagram, TikTok)

What I can do:
- Connect my Google account (OAuth, read-only access to Sheets)
- See today's drafts, edit one, approve it, reject it, or regenerate it with the current model
- Pick the AI model (Claude, OpenAI or Gemini) in Settings and see what each draft cost
- See how much I have spent today against my daily cap
- Turn dry-run on or off (ON by default, so nothing is really posted)
- See upcoming rows and a history of what was posted

Data (SQLite):
- settings: selected provider and model, dry_run, auto_approve
- posts: sheet date, platform, mode, prompt, generated_text, status, model_used,
  input_tokens, output_tokens, estimated_cost, blotato_submission_id, error, timestamps
- status is one of: draft, approved, scheduled, published, failed, rejected

Backend:
- GET /auth/google/login and /auth/google/callback
- POST /jobs/daily: read today's rows, create drafts (never publishes by itself)
- GET /posts (today, upcoming, history), PATCH /posts/{id} (edit, approve, reject)
- POST /posts/{id}/regenerate: write a new draft with the currently selected model
- POST /posts/{id}/publish: send to Blotato, or only show the request if dry-run
- GET and PUT /settings, GET /models (from config.json, showing which have keys)
- scripts/daily_run.sh: makes sure the backend is running (through system.sh), then calls
  POST /jobs/daily, so cron can run it every morning

Safety:
- Nothing is posted without my approval, and dry-run is ON until I turn it off
- Never post the same row twice. Keep all keys in backend/config/secrets.json
- If live data cannot be fetched, do not create a draft, show the error instead
- Keep model names, prices and accounts in config, never in code
- Cost safety: config.json has max_daily_cost_usd. Stop generating when today's cost reaches it.
  Start with the cheapest model selected, and show a warning when I pick a premium one
- Unit tests use fake API responses. Do not call real services in tests

Screens: Today (drafts with Approve, Edit, Reject), Calendar (upcoming rows),
Settings (model switcher, dry-run), History (posts with model and cost).

It is done when:
- I connect Google and see my sheet's rows in the Calendar
- ./scripts/daily_run.sh creates a draft for each of today's rows
- I switch the model in Settings and the next draft says which model wrote it
- With dry-run on, Approve shows the exact request and sends nothing
- With dry-run off, one approved Bluesky post appears on my test account

Before you write the plan, ask me about anything that is unclear.`;

export const ARCH_SKILL_V3 = `---
name: fullstack-architecture
description: The required folder layout, README convention and naming rules for every full-stack project, including the Docker, CI/CD and external-API files. Use whenever creating, planning, extending, deploying or reorganising a project.
---
# Full-stack project architecture

Every full-stack project uses exactly this layout. Do not invent other top-level folders.

project-root/
├── README.md                 Project overview and how to start it
├── .gitignore                .venv/, node_modules/, data/*.db, logs/, dist/, backend/config/secrets.json, backend/config/google_*.json
├── docker-compose.yml        Runs backend and frontend as containers (see the docker-deploy skill)
├── .github/
│   └── workflows/
│       └── deploy.yml        Test then deploy on push to main (see the ci-cd-deploy skill)
├── docs/
│   ├── README.md             Specifications, architecture plans, design docs
│   └── api/                  Saved API documentation and OpenAPI specs given to the AI
├── scripts/
│   ├── README.md             What each script does
│   ├── system.sh             Start, stop, restart and test (see the system-script skill)
│   └── ...                   Other utility scripts (seed_db.sh, backup.sh, ...)
├── data/
│   └── README.md             Schemas, seed data, SQLite files (*.db)
├── tests/
│   ├── README.md             Testing guidelines
│   ├── unit/                 pytest tests of functions and config loading
│   ├── system/               Tests against the running API
│   └── manual/               Step-by-step human checks written in Markdown
├── backend/
│   ├── README.md             API documentation and local setup
│   ├── .venv/                Python virtual environment
│   ├── requirements.txt      Pinned dependencies
│   ├── Dockerfile            Backend image
│   ├── .dockerignore         Keeps .venv and config/secrets.json out of the image
│   ├── config/               All configuration as JSON. Never .env files
│   │   ├── config.json
│   │   ├── secrets.json      Ignored by git
│   │   └── distinct_values.json
│   ├── endpoints/            One router file per domain, named after the resource
│   │   ├── __init__.py
│   │   └── tasks.py
│   ├── services/             One client module per external service (claude.py, blotato.py, google_sheets.py)
│   └── main.py               FastAPI entrypoint: registers every router
└── frontend/
    ├── README.md             Build, dev setup and component notes
    ├── node_modules/
    ├── public/               Static assets
    ├── src/
    │   ├── components/       One component per file, file named exactly like the component
    │   │   ├── Button.tsx
    │   │   └── TaskCard.tsx
    │   ├── main.tsx          Application entrypoint
    │   ├── App.tsx           Root layout
    │   └── index.css         Contains: @import "tailwindcss";
    ├── Dockerfile            Frontend image
    ├── .dockerignore
    ├── index.html
    ├── package.json
    ├── tsconfig.json
    └── vite.config.ts        Includes the Tailwind v4 Vite plugin

## Rules
1. There are 7 README.md files: the project root plus docs, scripts, data, tests, backend and frontend. Create them all.
2. Configuration is JSON files in backend/config/, named by purpose. The three above are typical, add more when needed. No .env files.
3. Database files live only in data/.
4. Each endpoints/ file is a router for one domain, named after the resource in lowercase plural (tasks.py, users.py). main.py registers all of them.
5. Frontend components live in frontend/src/components/. One component per file, and the file name equals the component name in PascalCase.
6. Tailwind v4 has no tailwind.config file. Do not create one.
7. Tests are split into unit, system and manual (see the testing skill).
8. A frontend-only project (such as a portfolio) uses only README.md, docs/, scripts/ and frontend/, each with its README.md.
9. Deployment files (docker-compose.yml, the Dockerfiles, .dockerignore files and .github/workflows/deploy.yml) are added only when the project is being containerised or deployed.
10. External services: each has one client module in backend/services/, and its saved docs or OpenAPI spec live in docs/api/. Endpoints never call an outside service directly (see the external-apis skill).
11. Secrets and databases never go into git or into images: backend/config/secrets.json, the Google OAuth files and data/*.db live only on the machine that runs the app.`;
