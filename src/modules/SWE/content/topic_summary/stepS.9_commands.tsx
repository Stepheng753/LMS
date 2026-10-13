import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { CommandTable } from '../../../../components/content/CommandTable';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function StepS_9_Commands() {
  return (
    <div>
      <StepHeader
        eyebrow="Summary • Reference"
        title="Master Command Reference"
        summary="Every command from the course, grouped by what you are trying to do. Bookmark this page."
      />
      <Callout type="info" title="Where each runs">
        Everything here is typed in your Ubuntu terminal (on WSL or the server) unless marked otherwise. The words in
        capitals, like NAME, are for you to replace.
      </Callout>

      <Section title="Files and folders (Topic 1)" />
      <CommandTable
        rows={[
          { command: 'pwd', description: 'Where am I' },
          { command: 'ls -la', description: 'List everything, with details' },
          { command: 'cd DIR / cd .. / cd ~ / cd -', description: 'Go into / up / home / back' },
          { command: 'mkdir -p a/b/c', description: 'Make nested folders' },
          { command: 'touch FILE', description: 'Create an empty file' },
          { command: 'cp -r SRC DEST', description: 'Copy (folders need -r)' },
          { command: 'mv SRC DEST', description: 'Move or rename' },
          { command: 'rm FILE / rm -r DIR', description: 'Delete, permanently' },
          { command: 'cat FILE / head -n 5 FILE / tail -n 5 FILE', description: 'Read a file' },
          { command: 'echo "text" > FILE / >> FILE', description: 'Replace / append' },
          { command: 'nano FILE', description: 'Edit. Ctrl+O Enter save, Ctrl+X exit' },
          { command: 'sudo apt update && sudo apt upgrade -y', description: 'Update the system' },
          { command: 'sudo apt install NAME', description: 'Install a package' },
          { command: 'source ~/.bashrc', description: 'Reload shell settings and aliases' },
        ]}
      />

      <Section title="Running your app (Topic 2)" />
      <CommandTable
        rows={[
          { command: './scripts/system.sh --start all', description: 'Start frontend and backend' },
          { command: './scripts/system.sh --stop all', description: 'Stop them' },
          { command: './scripts/system.sh --restart all', description: 'Restart' },
          { command: './scripts/system.sh --test all', description: 'Run unit, system and manual-list tests' },
          { command: '.venv/bin/python (from inside backend/)', description: 'The only Python you call by hand, and only if a lesson tells you to' },
          { command: 'localhost:8000/docs', description: 'Swagger page for your backend (in a browser)' },
          { command: 'sqlite3 data/app.db ".tables"', description: 'See tables in the database' },
          { command: 'agy', description: 'Start your AI helper. /plan makes a plan' },
        ]}
      />

      <Section title="Git (Topic 3)" />
      <CommandTable
        rows={[
          { command: 'git init', description: 'Start tracking a folder' },
          { command: 'gs', description: 'Status (alias for git status)' },
          { command: 'ga .', description: 'Stage everything (alias for git add)' },
          { command: 'gc "message"', description: 'Commit (alias)' },
          { command: 'git push origin main', description: 'Send commits to GitHub' },
          { command: 'git pull', description: 'Get new commits' },
          { command: 'git log --oneline', description: 'See history' },
          { command: 'git diff', description: 'See changes not yet staged' },
          { command: 'git revert HEAD', description: 'Undo the last commit with a new commit' },
          { command: 'git ls-files | grep secrets', description: 'Check no secret is tracked' },
        ]}
      />

      <Section title="SSH, firewall, Tailscale (Topic 3)" />
      <CommandTable
        rows={[
          { command: 'ssh-keygen -t ed25519', description: 'Make a key pair' },
          { command: 'ssh-copy-id USER@HOST', description: 'Install your public key on a server' },
          { command: 'ssh homelab', description: 'Log in using your ~/.ssh/config entry' },
          { command: 'sudo sshd -T | grep passwordauthentication', description: 'Check password login is off' },
          { command: 'sudo ufw allow ssh && sudo ufw enable', description: 'Allow SSH first, then turn on the firewall' },
          { command: 'sudo ufw status verbose', description: 'See firewall rules' },
          { command: 'tailscale status / tailscale ip -4', description: 'See devices / your Tailscale address' },
        ]}
      />

      <Section title="Server health (Topic 3)" />
      <CommandTable
        rows={[
          { command: 'df -h', description: 'Disk space' },
          { command: 'free -h', description: 'Memory' },
          { command: 'htop', description: 'Live processes (q to quit)' },
          { command: 'journalctl -u NAME -n 50', description: 'Last 50 log lines of a service' },
          { command: 'systemctl status NAME', description: 'Is a service running' },
        ]}
      />

      <Section title="Docker (Topic 3)" />
      <CommandTable
        rows={[
          { command: 'docker compose up -d --build', description: 'Build and start in the background' },
          { command: 'docker compose down', description: 'Stop and remove containers (volumes stay)' },
          { command: 'docker compose ps', description: 'What is running' },
          { command: 'docker compose logs -f --tail 50 SERVICE', description: 'Follow recent logs' },
          { command: 'docker compose exec SERVICE sh', description: 'Open a shell inside a container' },
          { command: 'docker image prune -f', description: 'Clean unused images' },
          { command: 'docker system df', description: 'See Docker disk use' },
        ]}
      />

      <Section title="nginx and HTTPS (Topic 3)" />
      <CommandTable
        rows={[
          { command: 'sudo nginx -t', description: 'Test the config. Always before reloading' },
          { command: 'sudo systemctl reload nginx', description: 'Apply the config without dropping connections' },
          { command: 'sudo ln -s /etc/nginx/sites-available/NAME /etc/nginx/sites-enabled/', description: 'Enable a site' },
          { command: 'sudo certbot certificates', description: 'See certificates and expiry dates' },
          { command: 'sudo certbot renew --dry-run', description: 'Test renewal without changing anything' },
          { command: 'curl -I https://app.example.com', description: 'Check a site answers, and with what' },
        ]}
      />

      <Section title="Checking an API (Topic 2, 4)" />
      <CommandTable
        rows={[
          { command: 'curl http://localhost:8000/tasks', description: 'GET a list' },
          { command: 'curl -X POST URL -H "Content-Type: application/json" -d \'{"title":"x"}\'', description: 'POST JSON' },
          { command: 'curl -X DELETE URL', description: 'DELETE' },
        ]}
      />

      <Section title="Agents and models (Topic 5)" />
      <CommandTable
        rows={[
          { command: 'ollama pull MODEL', description: 'Download an open model' },
          { command: 'ollama run MODEL', description: 'Chat with it locally' },
          { command: 'ollama list', description: 'See what you have downloaded' },
          { command: 'ollama rm MODEL', description: 'Free the disk space' },
          { command: 'cat .agents/mcp_config.json', description: 'See which MCP servers your helper can use' },
        ]}
      />

      <KeyTakeaways
        items={[
          'Most days you need about fifteen of these. The rest are for when something goes wrong.',
          'Before pressing Enter on rm, ufw or a destructive docker command, read it once more.',
          'If you forget a flag, add --help or ask your AI helper to explain the command.',
        ]}
      />
    </div>
  );
}
