import * as T from './texts';
import * as H from './homelabTexts';

export interface Artifact {
  id: string;
  group: 'Rules & skills' | 'Your machine' | 'Project templates' | 'Server templates';
  title: string;
  description: string;
  /** Where the file belongs once installed. */
  installTo: string;
  /** Path inside the downloadable zip. */
  zipPath: string;
  /** File name used for a single-file download. */
  filename: string;
  text: string;
}

const RULES = '~/.gemini/config/rules';
const SKILLS = '~/.gemini/config/skills';

const skill = (id: string, title: string, description: string, text: string): Artifact => ({
  id,
  group: 'Rules & skills',
  title,
  description,
  installTo: `${SKILLS}/${id}/SKILL.md`,
  zipPath: `skills/${id}/SKILL.md`,
  filename: `${id}.SKILL.md`,
  text,
});

export const ARTIFACTS: Artifact[] = [
  {
    id: 'stack',
    group: 'Rules & skills',
    title: 'stack (rule, always on)',
    description: 'The fixed stack and the hard rules: JSON config, database in data/, scripts instead of raw commands.',
    installTo: `${RULES}/stack.md`,
    zipPath: 'rules/stack.md',
    filename: 'stack.md',
    text: T.STACK_RULE,
  },
  skill('fullstack-architecture', 'fullstack-architecture', 'The folder layout, 7 READMEs, naming rules, plus the Docker and CI files.', H.ARCH_SKILL_V2),
  skill('website-design', 'website-design', 'Pages as nested boxes: navbar, hero, sections, cards, footer. Includes the 21st.dev rule.', T.DESIGN_SKILL),
  skill('react-frontend', 'react-frontend', 'React + Vite + Tailwind v4 + TypeScript conventions.', T.FRONTEND_SKILL),
  skill('fastapi-backend', 'fastapi-backend', 'FastAPI, JSON config, endpoints, SQLite in data/.', T.BACKEND_SKILL),
  skill('system-script', 'system-script (final version)', 'scripts/system.sh with frontend, backend and tests.', T.SYSTEM_SKILL_V2),
  skill('testing', 'testing', 'Unit, system and manual tests.', T.TESTING_SKILL),
  skill('git-workflow', 'git-workflow', 'One branch, small commits, never commit secrets.', H.GIT_WORKFLOW_SKILL),
  skill('docker-deploy', 'docker-deploy', 'Dockerfiles, compose, ports and volumes.', H.DOCKER_DEPLOY_SKILL),
  skill('nginx-proxy', 'nginx-proxy', 'Hostnames, HTTPS and the /api proxy through nginx on the host.', H.NGINX_PROXY_SKILL),
  skill('selfhosted-apps', 'selfhosted-apps', 'Installing Immich, Jellyfin, Nextcloud and friends safely.', H.SELFHOSTED_SKILL),
  skill('ci-cd-deploy', 'ci-cd-deploy', 'GitHub Actions: test, then deploy over Tailscale and SSH.', H.CICD_SKILL),

  {
    id: 'bash_aliases',
    group: 'Your machine',
    title: '.bash_aliases',
    description: 'Colourful prompt, ll and la, cls, and the git and python shortcuts.',
    installTo: '~/.bash_aliases',
    zipPath: 'home/.bash_aliases',
    filename: 'bash_aliases.txt',
    text: T.ALIASES,
  },
  {
    id: 'wslconfig',
    group: 'Your machine',
    title: '.wslconfig (Windows)',
    description: 'Turns on mirrored networking for WSL. Lives on the Windows side.',
    installTo: '%UserProfile%\\.wslconfig',
    zipPath: 'windows/.wslconfig',
    filename: 'wslconfig.txt',
    text: T.WSLCONFIG,
  },
  {
    id: 'ssh-config',
    group: 'Your machine',
    title: 'SSH config template',
    description: 'A homelab profile so that "ssh homelab" is all you type.',
    installTo: '~/.ssh/config',
    zipPath: 'home/.ssh/config.template',
    filename: 'ssh_config.txt',
    text: H.SSH_CONFIG,
  },

  {
    id: 'spec-template',
    group: 'Project templates',
    title: 'Spec template for /plan',
    description: 'The prompt skeleton to fill in at the start of every project.',
    installTo: 'Keep it somewhere handy',
    zipPath: 'templates/spec-template.md',
    filename: 'spec-template.md',
    text: T.SPEC_TEMPLATE,
  },
  {
    id: 'gitignore',
    group: 'Project templates',
    title: '.gitignore',
    description: 'Keeps secrets, databases, libraries and logs out of git.',
    installTo: 'Project root: .gitignore',
    zipPath: 'templates/gitignore.txt',
    filename: 'gitignore.txt',
    text: H.GITIGNORE_TEMPLATE,
  },
  {
    id: 'docker-compose',
    group: 'Project templates',
    title: 'docker-compose.yml',
    description: 'Backend and frontend as containers, with data and config mounted.',
    installTo: 'Project root: docker-compose.yml',
    zipPath: 'templates/docker-compose.yml',
    filename: 'docker-compose.yml',
    text: H.COMPOSE_EXAMPLE,
  },
  {
    id: 'backend-dockerfile',
    group: 'Project templates',
    title: 'backend/Dockerfile',
    description: 'The backend image.',
    installTo: 'backend/Dockerfile',
    zipPath: 'templates/backend.Dockerfile',
    filename: 'backend.Dockerfile',
    text: H.BACKEND_DOCKERFILE,
  },
  {
    id: 'backend-dockerignore',
    group: 'Project templates',
    title: 'backend/.dockerignore',
    description: 'Keeps .venv and secrets out of the image.',
    installTo: 'backend/.dockerignore',
    zipPath: 'templates/backend.dockerignore',
    filename: 'backend.dockerignore',
    text: H.BACKEND_DOCKERIGNORE,
  },
  {
    id: 'frontend-dockerfile',
    group: 'Project templates',
    title: 'frontend/Dockerfile',
    description: 'The frontend image.',
    installTo: 'frontend/Dockerfile',
    zipPath: 'templates/frontend.Dockerfile',
    filename: 'frontend.Dockerfile',
    text: H.FRONTEND_DOCKERFILE,
  },
  {
    id: 'frontend-dockerignore',
    group: 'Project templates',
    title: 'frontend/.dockerignore',
    description: 'Keeps node_modules out of the image.',
    installTo: 'frontend/.dockerignore',
    zipPath: 'templates/frontend.dockerignore',
    filename: 'frontend.dockerignore',
    text: H.FRONTEND_DOCKERIGNORE,
  },
  {
    id: 'deploy-yml',
    group: 'Project templates',
    title: 'deploy.yml (GitHub Actions)',
    description: 'Test, then deploy to the homelab over Tailscale and SSH.',
    installTo: '.github/workflows/deploy.yml',
    zipPath: 'templates/deploy.yml',
    filename: 'deploy.yml',
    text: H.DEPLOY_YML,
  },

  {
    id: 'nginx-template',
    group: 'Server templates',
    title: 'nginx.conf.template',
    description: 'Three proven nginx patterns: socket, static + API, and local port.',
    installTo: '/etc/nginx/sites-available/<hostname>',
    zipPath: 'server/nginx.conf.template',
    filename: 'nginx.conf.template',
    text: H.NGINX_TEMPLATE,
  },
  {
    id: 'nginx-app-site',
    group: 'Server templates',
    title: 'nginx site for a full-stack app',
    description: 'Website at / and API at /api/ behind HTTPS.',
    installTo: '/etc/nginx/sites-available/app.<your-domain>',
    zipPath: 'server/nginx-app-site.conf',
    filename: 'nginx-app-site.conf',
    text: H.NGINX_APP_SITE,
  },
  {
    id: 'cloudflare-ini',
    group: 'Server templates',
    title: 'cloudflare.ini (template)',
    description: 'Where the Cloudflare token goes for certificate renewals. Fill in on the server only.',
    installTo: '/root/.secrets/cloudflare.ini',
    zipPath: 'server/cloudflare.ini.template',
    filename: 'cloudflare.ini.template',
    text: H.CLOUDFLARE_INI,
  },
  {
    id: 'jellyfin-compose',
    group: 'Server templates',
    title: 'Jellyfin docker-compose.yml',
    description: 'Media streaming, bound to localhost.',
    installTo: '~/services/jellyfin/docker-compose.yml',
    zipPath: 'server/jellyfin.docker-compose.yml',
    filename: 'jellyfin.docker-compose.yml',
    text: H.JELLYFIN_COMPOSE,
  },
  {
    id: 'nextcloud-compose',
    group: 'Server templates',
    title: 'Nextcloud docker-compose.yml',
    description: 'Files and calendar with MariaDB, bound to localhost.',
    installTo: '~/services/nextcloud/docker-compose.yml',
    zipPath: 'server/nextcloud.docker-compose.yml',
    filename: 'nextcloud.docker-compose.yml',
    text: H.NEXTCLOUD_COMPOSE,
  },
];

export const INSTALL_SCRIPT = `#!/usr/bin/env bash
# Installs your rules and skills for Antigravity and Agy, and your shell aliases.
# Run it from the folder you unzipped:   bash install.sh

set -e
HERE="$(cd "$(dirname "$0")" && pwd)"
GEMINI="$HOME/.gemini"

echo "Installing rules and skills..."
mkdir -p "$GEMINI/config/rules" "$GEMINI/config/skills"
mkdir -p "$GEMINI/antigravity-cli/rules" "$GEMINI/antigravity-cli/skills"

cp "$HERE"/rules/*.md "$GEMINI/config/rules/"
cp "$HERE"/rules/*.md "$GEMINI/antigravity-cli/rules/"
cp -r "$HERE"/skills/* "$GEMINI/config/skills/"
cp -r "$HERE"/skills/* "$GEMINI/antigravity-cli/skills/"

echo "Installing shell aliases..."
if [ -f "$HOME/.bash_aliases" ]; then
  cp "$HOME/.bash_aliases" "$HOME/.bash_aliases.backup"
  echo "  (your old .bash_aliases was saved as .bash_aliases.backup)"
fi
cp "$HERE/home/.bash_aliases" "$HOME/.bash_aliases"

echo ""
echo "Done. Now run:  source ~/.bashrc"
echo "Templates are in templates/ and server/. Copy them into projects as needed."`;

export const TOOLKIT_README = `# Your toolkit

Everything you saved while learning, in one folder.

- rules/ and skills/ : Antigravity and Agy read these. Run "bash install.sh" to put them in place.
- home/              : .bash_aliases (installed by install.sh) and an SSH config template.
- windows/           : .wslconfig. Copy it to your Windows user folder by hand.
- templates/         : files to copy into new projects (spec, .gitignore, Docker, deploy workflow).
- server/            : nginx, certificate and app templates for the homelab.

Placeholders like <your-domain> must be replaced before use.
Never put real secrets in these files.`;
