// Topic 3 artifacts: skills, templates and configs for the homelab and pipeline steps.
// Note: "\${{" below is a literal "${{" (GitHub Actions expression syntax) inside a template string.

export const GIT_WORKFLOW_SKILL = `---
name: git-workflow
description: How to use git and GitHub in our projects: the ignore list, small commits on main, and never committing secrets. Use whenever initialising a repository, committing, pushing, or when git or GitHub is mentioned.
---
# Git workflow

## Rules
- There is one branch, main, with a straight-line history. Do not create other branches unless the user asks.
- Never run git commit or git push on your own. Show what you would commit, propose the message, and wait for the user to say go.
- Never commit secrets: backend/config/secrets.json, keys, tokens or passwords. If one was ever committed, tell the user straight away. Deleting the file is not enough, because it stays in history. The secret must be replaced.
- Commit small. One logical change per commit, with a plain imperative message such as "Add tasks endpoint".
- Never force-push and never rewrite history on main.
- Before committing, show git status and a short summary of the changes.

## .gitignore must include
.venv/
node_modules/
data/*.db
logs/
dist/
backend/config/secrets.json
(Also __pycache__/, .DS_Store and any .env file.)

## The user's shortcuts
gs = git status, ga = git add, gc "message" = git commit -m "message".
The remote is called origin and the branch is main: git push origin main.`;

export const DOCKER_DEPLOY_SKILL = `---
name: docker-deploy
description: How to containerise our full-stack apps with Dockerfiles and docker-compose.yml, including ports, volumes and secrets. Use when asked to dockerize, containerise, deploy or run an app in containers.
---
# Docker deployment

## Files
- backend/Dockerfile, frontend/Dockerfile, and one docker-compose.yml in the project root.
- A .dockerignore in backend/ and in frontend/ so that .venv, node_modules, dist and config/secrets.json are never copied into an image.

## Images
- Backend: python:3.12-slim. WORKDIR /app. Copy requirements.txt and run pip install, then copy the code. Start with python -m uvicorn main:app --host 0.0.0.0 --port 8000. A container needs no virtual environment: the image is the isolated environment.
- Frontend: node:22-alpine. Install with npm, then run the Vite dev server with --host 0.0.0.0 --port 5173. vite.config.ts must allow the public host name (server.allowedHosts), or Vite blocks requests that arrive through the proxy.
- Pin base image tags. Never use :latest for our own images' bases.

## Compose
- Two services: backend and frontend. restart: unless-stopped on both.
- Publish ports as 127.0.0.1:8000:8000 and 127.0.0.1:5173:5173. Docker publishes ports around the host firewall (ufw), so binding to 127.0.0.1 keeps them private. nginx on the host is the only public door.
- Volumes: ./data to /app/data and ./backend/config to /app/config. The database and the config (including secrets.json) live on the host, never inside an image.
- The frontend calls the backend at /api (one constant). nginx routes /api/ to the backend.

## Commands to show the user
docker compose up -d --build, docker compose down, docker compose logs -f, docker compose ps.

## Checks
- After changes, prove persistence: add data, run docker compose down then up -d, and confirm the data is still there.
- Never put secrets in a Dockerfile, an image or the compose file.`;

export const NGINX_PROXY_SKILL = `---
name: nginx-proxy
description: How to expose an app on a hostname through nginx on the host, with HTTPS and an /api proxy. Use when adding a website, a subdomain, a reverse proxy or an SSL certificate.
---
# nginx reverse proxy (on the host)

## Conventions
- nginx is installed on the host with apt, not in a container.
- One file per hostname in /etc/nginx/sites-available/<hostname>, linked into /etc/nginx/sites-enabled/ with ln -s.
- Always test before reloading: sudo nginx -t && sudo systemctl reload nginx. Never stop nginx to change config.

## Every site has two server blocks
1. Port 80: return 301 https://$host$request_uri;
2. Port 443 ssl, with ssl_certificate and ssl_certificate_key pointing at /etc/letsencrypt/live/<name>/fullchain.pem and privkey.pem, TLS 1.2 and 1.3 only.

## Proxying
- Apps listen only on 127.0.0.1:<port>. Never expose an app port to the network.
- Full-stack apps: location /api/ { proxy_pass http://127.0.0.1:8000/; } (the trailing slash strips /api) and location / { proxy_pass http://127.0.0.1:5173; }.
- Always send Host, X-Real-IP, X-Forwarded-For and X-Forwarded-Proto headers.
- WebSockets need proxy_http_version 1.1 plus the Upgrade and Connection headers.
- Photo and file apps need client_max_body_size 0 and long timeouts.

## DNS and certificates
- Private apps: an A record in Cloudflare (DNS only, grey cloud) pointing at the server's Tailscale address, and a Let's Encrypt certificate via the Cloudflare DNS challenge.
- Public apps: a CNAME to the router's DDNS name, ports 80 and 443 forwarded, and certbot --nginx.
- Test renewal with sudo certbot renew --dry-run.

## Checklist for every new hostname
1. DNS record  2. App answers on 127.0.0.1  3. site file  4. symlink  5. nginx -t  6. reload  7. certificate  8. open https://<hostname>.`;

export const SELFHOSTED_SKILL = `---
name: selfhosted-apps
description: How to install and run third-party open-source apps (Immich, Jellyfin, Nextcloud and similar) with Docker on the homelab. Use when asked to install, update or expose a self-hosted app.
---
# Self-hosted apps

## Layout
- Each app lives in its own folder: ~/services/<app>/ with its own docker-compose.yml. Data lives in bind-mounted folders inside it (or on a mounted drive).
- Use only the project's official documentation and official compose file. Pin a version. Do not use random compose files from blogs.

## Rules
- Third-party apps keep their documented configuration, including .env files. Our no-.env rule applies only to projects we write.
- Publish ports on 127.0.0.1 only (for example 127.0.0.1:2283:2283). Docker bypasses ufw, so never publish to all interfaces. nginx on the host is the only public door.
- Never expose a database port. Use strong unique passwords with only letters and numbers where an app requires it.
- Add each app the same way: DNS record, nginx site, certificate, then open it over HTTPS (see the nginx-proxy skill).
- Uploads: client_max_body_size 0 in nginx for photo and file apps.

## Updating
- Read the release notes first. Then: docker compose pull && docker compose up -d. Never update on the day before you need the app.

## Backups
- Anything with personal data (photos, files, databases) has a backup before it goes live. Compose file, .env and data folders must all be backed up. Test a restore.`;

export const CICD_SKILL = `---
name: ci-cd-deploy
description: How to write the GitHub Actions workflow that tests a project and deploys it to the homelab over Tailscale and SSH. Use when asked for CI/CD, a pipeline, auto-deploy or a GitHub Actions workflow.
---
# CI/CD with GitHub Actions

## File
- .github/workflows/deploy.yml. Trigger: push to main.

## Jobs
1. test: check out the code and run ./scripts/system.sh --test unit. Unit tests must not need secrets.json, because secrets are never in git.
2. deploy (needs: test): join the tailnet with tailscale/github-action using the oauth-client-id and oauth-secret secrets and tags: tag:ci, set up the SSH deploy key, then ssh to the server, cd into the app folder, git pull origin main and run docker compose up -d --build.

## Secrets (GitHub repository secrets only, never in files)
- HOMELAB_HOST (the server's Tailscale name), HOMELAB_USER, HOMELAB_SSH_KEY (a dedicated deploy key, not the user's personal key).
- TS_OAUTH_CLIENT_ID and TS_OAUTH_SECRET (a Tailscale OAuth client with the auth_keys scope and tag tag:ci).
- Never print a secret in a log. Never echo them.

## Server side (done once by hand, not by the workflow)
- The repository is cloned in ~/apps/<app>. The server has a read-only GitHub deploy key to pull.
- backend/config/secrets.json and the database exist only on the server (they are git-ignored).

## Rules
- Use the current major versions of every action. Fail loudly: if tests fail, nothing deploys.
- Do not open any router port for deploys. Deploys travel over Tailscale.
- After deploying, show how to verify: the Actions tab and the live site.`;

export const GITIGNORE_TEMPLATE = `# Python
.venv/
__pycache__/

# Node
node_modules/
dist/

# Data and secrets (never share these)
data/*.db
backend/config/secrets.json
.env

# Logs
logs/
*.log

# Editors and OS
.DS_Store`;

export const SSH_CONFIG = `# ~/.ssh/config
Host homelab
    HostName <server-ip-or-tailscale-name>
    User <your-username>
    IdentityFile ~/.ssh/id_ed25519`;

export const CLOUDFLARE_INI = `# /root/.secrets/cloudflare.ini  (chmod 600, never share, never commit)
dns_cloudflare_api_token = PASTE_YOUR_CLOUDFLARE_TOKEN_HERE`;

export const BACKEND_DOCKERFILE = `# backend/Dockerfile
FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["python", "-m", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]`;

export const BACKEND_DOCKERIGNORE = `# backend/.dockerignore
.venv
__pycache__
config/secrets.json`;

export const FRONTEND_DOCKERFILE = `# frontend/Dockerfile
FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]`;

export const FRONTEND_DOCKERIGNORE = `# frontend/.dockerignore
node_modules
dist`;

export const COMPOSE_EXAMPLE = `# docker-compose.yml (project root)
services:
  backend:
    build:
      context: ./backend
    container_name: app-backend
    restart: unless-stopped
    ports:
      - "127.0.0.1:8000:8000"
    volumes:
      - ./data:/app/data
      - ./backend/config:/app/config

  frontend:
    build:
      context: ./frontend
    container_name: app-frontend
    restart: unless-stopped
    ports:
      - "127.0.0.1:5173:5173"
    depends_on:
      - backend`;

export const NGINX_APP_SITE = `# /etc/nginx/sites-available/app.<your-domain>
# A full-stack app: the website at / and the API at /api/.

server {
    listen 80;
    listen [::]:80;
    server_name app.<your-domain>;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    listen [::]:443 ssl;
    server_name app.<your-domain>;

    ssl_certificate /etc/letsencrypt/live/<your-domain>/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/<your-domain>/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;

    client_max_body_size 10M;

    # The API: /api/tasks is sent to the backend as /tasks
    location /api/ {
        proxy_pass http://127.0.0.1:8000/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Everything else: the website
    location / {
        proxy_pass http://127.0.0.1:5173;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}`;

export const DEPLOY_YML = `# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Unit tests
        run: ./scripts/system.sh --test unit

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - name: Join the tailnet
        uses: tailscale/github-action@v4
        with:
          oauth-client-id: \${{ secrets.TS_OAUTH_CLIENT_ID }}
          oauth-secret: \${{ secrets.TS_OAUTH_SECRET }}
          tags: tag:ci

      - name: Set up SSH
        run: |
          mkdir -p ~/.ssh
          echo "\${{ secrets.HOMELAB_SSH_KEY }}" > ~/.ssh/id_ed25519
          chmod 600 ~/.ssh/id_ed25519
          ssh-keyscan -H \${{ secrets.HOMELAB_HOST }} >> ~/.ssh/known_hosts

      - name: Deploy
        run: |
          ssh \${{ secrets.HOMELAB_USER }}@\${{ secrets.HOMELAB_HOST }} \\
            "cd ~/apps/myapp && git pull origin main && docker compose up -d --build"`;

export const JELLYFIN_COMPOSE = `# ~/services/jellyfin/docker-compose.yml
services:
  jellyfin:
    image: jellyfin/jellyfin
    container_name: jellyfin
    user: 1000:1000
    restart: unless-stopped
    ports:
      - "127.0.0.1:8096:8096"
    volumes:
      - ./config:/config
      - ./cache:/cache
      - /path/to/your/media:/media:ro`;

export const NEXTCLOUD_COMPOSE = `# ~/services/nextcloud/docker-compose.yml
# Change every "change-me" value before starting.
services:
  db:
    image: mariadb:lts
    restart: always
    command: --transaction-isolation=READ-COMMITTED
    volumes:
      - ./db:/var/lib/mysql
    environment:
      - MYSQL_ROOT_PASSWORD=change-me-root
      - MYSQL_PASSWORD=change-me-user
      - MYSQL_DATABASE=nextcloud
      - MYSQL_USER=nextcloud

  app:
    image: nextcloud
    restart: always
    ports:
      - "127.0.0.1:8080:80"
    depends_on:
      - db
    volumes:
      - ./html:/var/www/html
    environment:
      - MYSQL_PASSWORD=change-me-user
      - MYSQL_DATABASE=nextcloud
      - MYSQL_USER=nextcloud
      - MYSQL_HOST=db
      - NEXTCLOUD_TRUSTED_DOMAINS=files.<your-domain>
      - OVERWRITEHOST=files.<your-domain>
      - OVERWRITEPROTOCOL=https
      - TRUSTED_PROXIES=172.16.0.0/12`;


export const NGINX_TEMPLATE = `# ==============================================================================
# Generic NGINX Configuration Templates for Subdomains
# ==============================================================================
# This template demonstrates the 3 common configurations used for subdomains:
# 1. Reverse Proxy to Unix Socket (e.g., Python Flask/Gunicorn)
# 2. Serve Static Frontend + Proxy API & WebSockets (e.g., Node/React + Express)
# 3. Reverse Proxy to Local TCP Port (e.g., Docker containers or local apps)
#
# Before deploying, replace placeholders in brackets (e.g., <domain_name>)
# with your actual values (defined in your local setup.conf).
# ==============================================================================

# ------------------------------------------------------------------------------
# TEMPLATE 1: Unix Socket Reverse Proxy (WSGI / Gunicorn)
# ------------------------------------------------------------------------------

# HTTP Redirect to HTTPS (Uses custom port if standard port 80 is blocked by ISP)
server {
    listen <http_redirect_port>; # e.g., 80, or a custom port like 8463
    server_name <subdomain>.<domain_name>;

    # Redirect all HTTP traffic on this port to HTTPS on default port 443
    return 301 https://$host$request_uri;
}

# HTTPS Server Block
server {
    listen 443 ssl;
    listen [::]:443 ssl;
    server_name <subdomain>.<domain_name>;

    # SSL Certificates (managed and automatically inserted by Certbot)
    ssl_certificate /etc/letsencrypt/live/<subdomain>.<domain_name>/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/<subdomain>.<domain_name>/privkey.pem;

    # Recommended SSL settings for security and performance
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers 'TLS_AES_128_GCM_SHA256:TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384';
    ssl_prefer_server_ciphers on;

    # Timeouts & size limits
    client_max_body_size 10M;
    proxy_connect_timeout 300s;
    proxy_send_timeout 300s;
    proxy_read_timeout 300s;
    send_timeout 300s;

    # Proxy traffic to Gunicorn Unix Socket
    location / {
        proxy_pass http://unix:<socket_path>; # e.g., /tmp/flask_api.sock
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;

        # Forward original request headers so the backend knows the real client IP
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Real-IP $remote_addr;
    }
}


# ------------------------------------------------------------------------------
# TEMPLATE 2: Static Frontend + API & WebSocket Proxy
# ------------------------------------------------------------------------------

# HTTP Redirect to HTTPS
server {
    listen 80;
    listen [::]:80;
    server_name <subdomain>.<domain_name>;

    location / {
        return 301 https://$host$request_uri;
    }
}

# HTTPS Server Block
server {
    listen 443 ssl;
    listen [::]:443 ssl;
    server_name <subdomain>.<domain_name>;

    ssl_certificate /etc/letsencrypt/live/<subdomain>.<domain_name>/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/<subdomain>.<domain_name>/privkey.pem;

    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers 'TLS_AES_128_GCM_SHA256:TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384';
    ssl_prefer_server_ciphers on;

    client_max_body_size 10M;
    proxy_connect_timeout 300s;
    proxy_send_timeout 300s;
    proxy_read_timeout 300s;
    send_timeout 300s;

    # 1. FRONTEND: Serve Built Static Files
    location / {
        root /var/www/<project_dir>/dist;
        index index.html;
        try_files $uri $uri/ /index.html;

        # Basic security headers for static site
        add_header X-Frame-Options "SAMEORIGIN";
        add_header X-XSS-Protection "1; mode=block";
        add_header X-Content-Type-Options "nosniff";
    }

    # 2. BACKEND: REST API Reverse Proxy
    location /api {
        proxy_pass http://127.0.0.1:<api_port>; # e.g., http://127.0.0.1:3000
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # 3. BACKEND: WebSockets Proxy (e.g. chat/real-time)
    location /ws {
        proxy_pass http://127.0.0.1:<api_port>; # e.g., http://127.0.0.1:3000
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

        proxy_read_timeout 3600s;
        proxy_send_timeout 3600s;
    }
}


# ------------------------------------------------------------------------------
# TEMPLATE 3: Local Port Reverse Proxy (e.g., Docker Apps)
# ------------------------------------------------------------------------------

# HTTP Redirect to HTTPS
server {
    listen 80;
    listen [::]:80;
    server_name <subdomain>.<domain_name>;

    location / {
        return 301 https://$host$request_uri;
    }
}

# HTTPS Server Block
server {
    listen 443 ssl;
    listen [::]:443 ssl;
    server_name <subdomain>.<domain_name>;

    ssl_certificate /etc/letsencrypt/live/<subdomain>.<domain_name>/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/<subdomain>.<domain_name>/privkey.pem;

    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers 'TLS_AES_128_GCM_SHA256:TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384';
    ssl_prefer_server_ciphers on;

    # Large uploads timeout support (photos, videos, etc.)
    client_max_body_size 0; # Disable body size limit
    proxy_connect_timeout 300s;
    proxy_send_timeout 300s;
    proxy_read_timeout 300s;
    send_timeout 300s;

    location / {
        proxy_pass http://localhost:<local_port>; # e.g. 5678, 2283, 8096
        
        # Standard proxy headers
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # WebSocket support
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}`;

export const ARCH_SKILL_V2 = `---
name: fullstack-architecture
description: The required folder layout, README convention and naming rules for every full-stack project, including the Docker and CI/CD files. Use whenever creating, planning, extending, deploying or reorganising a project.
---
# Full-stack project architecture

Every full-stack project uses exactly this layout. Do not invent other top-level folders.

project-root/
├── README.md                 Project overview and how to start it
├── .gitignore                .venv/, node_modules/, data/*.db, logs/, dist/, backend/config/secrets.json
├── docker-compose.yml        Runs backend and frontend as containers (see the docker-deploy skill)
├── .github/
│   └── workflows/
│       └── deploy.yml        Test then deploy on push to main (see the ci-cd-deploy skill)
├── docs/
│   └── README.md             Specifications, architecture plans, design docs
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
10. Secrets and databases never go into git or into images: backend/config/secrets.json and data/*.db live only on the machine that runs the app.`;
