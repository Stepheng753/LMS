// Single source of truth for every file the learner saves or downloads.
// Lessons import from here, and the Toolkit step offers the same text for download.

// "@{" stands in for "${" so shell variable syntax is not read as a JS template substitution.
export const ALIASES = String.raw`export COLOR_NC='0'
export COLOR_BLACK='0;30'
export COLOR_RED='0;31'
export COLOR_GREEN='0;32'
export COLOR_YELLOW='0;33'
export COLOR_BLUE='0;34'
export COLOR_MAGENTA='0;35'
export COLOR_CYAN='0;36'
export COLOR_WHITE='0;37'

# Bright versions
export COLOR_BRIGHT_BLACK='1;30'
export COLOR_BRIGHT_RED='1;31'
export COLOR_BRIGHT_GREEN='1;32'
export COLOR_BRIGHT_YELLOW='1;33'
export COLOR_BRIGHT_BLUE='1;34'
export COLOR_BRIGHT_MAGENTA='1;35'
export COLOR_BRIGHT_CYAN='1;36'
export COLOR_BRIGHT_WHITE='1;37'

# Background colors
export COLOR_BG_BLACK='40'
export COLOR_BG_RED='41'
export COLOR_BG_GREEN='42'
export COLOR_BG_YELLOW='43'
export COLOR_BG_BLUE='44'
export COLOR_BG_MAGENTA='45'
export COLOR_BG_CYAN='46'
export COLOR_BG_WHITE='47'

LS_COLORS=$LS_COLORS:'rs=0:di='@{COLOR_BRIGHT_YELLOW}':ln='@{COLOR_BRIGHT_CYAN}':ex='@{COLOR_BRIGHT_GREEN}
export LS_COLORS

PS1='\[\033['@{COLOR_BRIGHT_YELLOW}'m\][\d \t] '
PS1+='\[\033['@{COLOR_BRIGHT_CYAN}'m\]\u@\h: '
PS1+='\[\033['@{COLOR_BRIGHT_GREEN}'m\]\W '
PS1+='\[\033['@{COLOR_NC}'m\]'

alias cls='clear'
alias cls2='clear && clear'
alias CLS='clear'
alias ll='ls -lhX'
alias LL='ls -lhX'
alias la='ls -lha'

alias grep='grep --color=auto'
alias fgrep='fgrep --color=auto'
alias egrep='egrep --color=auto'
alias dir='dir --color=auto'
alias vdir='vdir --color=auto'

alias py='python3'
alias gs="git status"
alias ga="git add"
alias gc="git commit -m"`.split('@{').join('${');

export const STACK_RULE = `---
trigger: always_on
---
# Stack and working rules

## Stack (fixed, do not substitute)
- Backend: Python with FastAPI.
- Frontend: React with Vite, Tailwind CSS v4 and TypeScript (.tsx files).
- Database: SQLite 3, used through Python's built-in sqlite3 library.

## Working with the user
- The user is a beginner. She does not write code or SQL by hand. Explain what you are doing in plain language.
- Always produce a plan first and wait for approval before changing any files.
- Stay strictly inside the approved plan. If something else is needed, say so and ask first.

## Hard rules
- In the projects we build, configuration lives in JSON files inside backend/config/. Never create .env files for them. (Third-party apps we install, such as Immich, keep their own documented configuration, including .env files.)
- SQLite database files live only inside the data/ folder.
- Never ask the user to run npm, pip, python, uvicorn or pytest directly. Put every command in a script under scripts/ and tell the user to run that script.
- The Python virtual environment lives in backend/.venv. Python is always run as ./.venv/bin/python from inside the backend/ folder. Never activate the virtual environment and never use the global python or pip on the host. (Inside a Docker image the image itself is the isolated environment, so a Dockerfile installs with pip directly.)
- The project root and each top-level folder (docs, scripts, data, tests, backend, frontend) has a README.md.
- Secrets live only in backend/config/secrets.json. Never put secrets in code.`;

export const DESIGN_SKILL = `---
name: website-design
description: How to structure and style a web page as nested boxes (navbar, hero, sections, cards, footer). Use when designing, sketching or building any web page, portfolio or app screen.
---
# Website design

## Core idea
A web page is boxes inside boxes. One big box (the page) contains section boxes stacked top to bottom. Each section contains smaller boxes (text, images, cards, buttons). Plan the layout as nested rectangles first, then build it.

## Standard building blocks
- Navbar: top strip with the name/logo on the left and links on the right. Sticks to the top.
- Hero: the first big section. A headline, one sentence of support, and one main button.
- Sections: one idea each (About, Projects, Skills...), with a heading and consistent padding.
- Cards: small boxes in a row or grid for repeated items such as projects.
- Forms: labelled fields and one clear submit button.
- Footer: bottom strip with small links and copyright.

## Rules
- Before building, describe the layout as a list of nested boxes and confirm it with the user.
- Use Tailwind CSS utility classes. Use flex for rows and columns, and grid for card layouts.
- Design for a phone first, then widen for desktop. Never require horizontal scrolling.
- Use one accent colour, one or two font sizes for body text, and generous, consistent spacing.
- Keep text readable: dark text on a light background, or the reverse, with strong contrast.
- Every image has alt text. Every button says what it does.
- Each distinct block (Navbar, Hero, ProjectCard, Footer) is its own component, one per file.

## Ready-made components (21st.dev)
- The user may paste a component prompt or code from 21st.dev. Adapt it to this project: TypeScript (.tsx), Tailwind v4, one component per file in frontend/src/components/, named after the component.
- Do not run the shadcn CLI and do not add components.json, a ui/ folder, a lib/ folder or a tailwind.config file without asking. Rebuild the component inside our structure instead.
- Say in the plan which component is being added and from where.`;

export const FRONTEND_SKILL = `---
name: react-frontend
description: How to build the frontend with React, Vite, Tailwind CSS v4 and TypeScript, including components and fetching data from the backend. Use when creating or changing anything in the frontend folder.
---
# Frontend: React + Vite + Tailwind v4 + TypeScript

## Setup
- Create the app with Vite's React + TypeScript template inside frontend/.
- Tailwind v4: install tailwindcss and @tailwindcss/vite, add the tailwindcss() plugin in vite.config.ts, and put @import "tailwindcss"; at the top of src/index.css. There is NO tailwind.config file.
- The dev server runs on port 5173.

## Components
- All components live in frontend/src/components/.
- Exactly one component per file. The file name is the component name in PascalCase, e.g. TaskCard.tsx exports TaskCard.
- App.tsx is the root layout and composes components. main.tsx only mounts App.
- Type every component's props with a TypeScript type.
- Style with Tailwind utility classes. No separate CSS files besides src/index.css.

## Data
- Talk to the backend with fetch against the backend base URL (http://localhost:8000). Keep that URL in a single constant, never repeated.
- Show loading and error states whenever data is fetched.
- Never put secrets or API keys in frontend code.

## Never
- Do not use .jsx or .js for source files.
- Do not put two components in one file.
- Do not tell the user to run npm. Use scripts/system.sh.`;

export const SPEC_TEMPLATE = `/plan

I want to build: <one sentence: what is it, and who is it for?>

What a person can do with it:
- <action 1>
- <action 2>

Screens or sections (see my attached sketch):
- <Navbar: ...>
- <Hero: ...>
- <...>

Data (only if there is a database):
- <table name>: <columns>
- Relationships: <for example, each task belongs to one category>

API endpoints (only if there is a backend):
- GET /<resource>: <what it returns>
- POST /<resource>: <what it creates>

Follow my saved rules and skills: stack, fullstack-architecture,
website-design, react-frontend, system-script (and fastapi-backend and
testing if there is a backend).
Everything must run through scripts/system.sh. I never run npm or pip.

It is done when:
- <something I can see or click to prove it works>
- <...>

Before you write the plan, ask me about anything that is unclear.`;

export const BACKEND_SKILL = `---
name: fastapi-backend
description: How to build the Python FastAPI backend with JSON configuration, endpoint routers and a SQLite database in data/. Use when creating or changing anything in the backend or data folders.
---
# Backend: FastAPI + SQLite

## Structure (inside backend/)
- main.py creates the FastAPI app, adds CORS, loads config, and includes every router from endpoints/.
- endpoints/ has one file per domain, named after the resource in lowercase plural (tasks.py, categories.py). Each defines an APIRouter and is registered in main.py. Include __init__.py.
- config/ holds JSON files and nothing else. Never use .env files.
  - config.json: host, ports, database path, allowed frontend origins
  - secrets.json: API keys and tokens. It is git-ignored.
  - distinct_values.json: fixed business values and constants (for example late_after_days)
  Add further JSON files by purpose when needed. Load them with paths relative to the file, never hard-coded absolute paths.
- requirements.txt lists pinned dependencies.

## Python
- The virtual environment is backend/.venv. Always run Python as ./.venv/bin/python from inside the backend/ folder, including pip: ./.venv/bin/python -m pip. Never activate the venv and never use the global python or pip.
- Start the server from backend/ with: ./.venv/bin/python -m uvicorn main:app --reload --port 8000 (the port comes from config.json).

## Database
- SQLite file lives in data/ only (for example data/app.db). Its path comes from config.json.
- Use Python's built-in sqlite3 library. Always use parameter placeholders (?) in queries, never string formatting.
- Turn on foreign keys for every connection (PRAGMA foreign_keys = ON).
- Every table has an INTEGER PRIMARY KEY id. Use separate tables for separate kinds of things, linked by foreign keys.
- Create tables if they do not exist when the app starts. Describe the schema in data/README.md.
- Yes/no values are stored as 0/1, dates as ISO text (YYYY-MM-DD). Convert them at the API boundary.

## API
- Validate request bodies with Pydantic models.
- Use correct status codes: 200, 201 for created, 404 when not found, 422 for invalid input.
- Allow the frontend origin (http://localhost:5173) through CORS.
- Swagger UI is available at http://localhost:8000/docs. Mention every new endpoint in backend/README.md.`;

export const SYSTEM_SKILL_V2 = `---
name: system-script
description: How to write scripts/system.sh, the single script that installs, starts, stops, restarts and tests a project so the user never types npm, pip or python. Use whenever a project must be run, started, stopped, installed or tested.
---
# scripts/system.sh

The user NEVER types npm, pip, python, uvicorn or pytest. Everything goes through scripts/system.sh.

## Usage
./scripts/system.sh <--start|--restart|--stop> <backend|frontend|all>
./scripts/system.sh --test <unit|system|all>

## Behaviour
- Bash script with set -e. Make it executable (chmod +x scripts/system.sh).
- Work out the project root from the script's own location so it runs correctly from any folder.
- Read the ports from backend/config/config.json (frontend 5173, backend 8000 by default). If there is no backend folder, only the frontend options exist.
- Find running processes by port using lsof. Do NOT create or read .pid files.
- --stop ends whatever is listening on the project's ports. --restart is stop followed by start. "all" means backend and frontend.
- After starting, wait until the port answers, then print the URL.
- Write output to logs/backend.log and logs/frontend.log.

## Frontend
- If frontend/node_modules is missing, run npm install in frontend/ first.
- Start the Vite dev server on the frontend port.

## Backend
- Run all backend commands from inside backend/ (cd backend first).
- If .venv is missing, create it with python3 -m venv .venv and install requirements with ./.venv/bin/python -m pip install -r requirements.txt.
- ALWAYS run Python as ./.venv/bin/python (never activate it, never use global python or pip).
- Start the API with ./.venv/bin/python -m uvicorn main:app --port 8000.
- Open http://localhost:8000/docs for the API documentation and mention it in the output.

## Tests
- --test unit runs, from backend/: ./.venv/bin/python -m pytest ../tests/unit
- --test system first makes sure the backend is running (starts it if not), then runs, from backend/: ./.venv/bin/python -m pytest ../tests/system
- --test all runs both, unit first.
- Show a clear pass/fail summary and exit non-zero when anything fails.

## Output
- Print coloured, plain-language messages: [INFO], [SUCCESS], [WARN], [ERROR].
- For a missing or unknown argument, print the usage text and exit with an error.
- Keep logs/ in .gitignore and document every flag in scripts/README.md.`;

export const TESTING_SKILL = `---
name: testing
description: How to write and organise tests for a full-stack project in tests/unit, tests/system and tests/manual. Use when adding features, fixing bugs, or when asked to test or verify anything.
---
# Testing

Every feature ships with tests in the right layer. Tests are run only through scripts/system.sh (--test unit|system|all). Never tell the user to run pytest directly.

## Layers (all inside the top-level tests/ folder)
- tests/unit/: pytest tests for standalone functions, config loading, and validation. No running server needed. Fast.
- tests/system/: pytest tests that call the RUNNING API over HTTP and assert status codes and response bodies (200, 201, 404, 422). Use a temporary database or clean up what they create.
- tests/manual/: plain Markdown SOPs a human follows to verify the app. Each is a numbered list of exact steps and the expected result.

## Naming
- Python test files are named test_<domain>.py (test_tasks.py) and test functions start with test_.
- Manual SOPs are named after the feature (add_task.md).

## Manual SOP format
Title, then "Steps" as a numbered list (including the exact command and URL), then "Expected result". Example:
1. Run ./scripts/system.sh --start all.
2. Open http://localhost:5173.
3. Type "Buy milk" and press Add.
Expected: a card titled "Buy milk" appears and is still there after refreshing the page.

## Rules
- Add tests to the plan; a plan with no tests is incomplete.
- Keep tests/README.md up to date with how each layer works.
- When a bug is found, add a test that would have caught it.`;

export const WSLCONFIG = `[wsl2]
networkingMode=mirrored`;

