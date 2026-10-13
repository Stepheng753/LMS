import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { CommandTable } from '../../../../components/content/CommandTable';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function Step3_26_CheatSheet() {
  return (
    <div>
      <StepHeader
        eyebrow="Step 3.26 • Reference"
        title="Topic 3 Cheat Sheet"
        summary="Git, SSH, the server, Docker, nginx, certificates, DNS and the pipeline in one place."
      />

      <Section title="Git" />
      <CommandTable
        rows={[
          { command: 'git init -b main', description: 'Start a repository on main' },
          { command: 'gs', description: 'git status' },
          { command: 'ga .', description: 'git add: stage all changes' },
          { command: 'gc "message"', description: 'git commit -m: save a snapshot' },
          { command: 'git push origin main', description: 'Send commits to GitHub' },
          { command: 'git log --oneline', description: 'History, newest first' },
          { command: 'git ls-files | grep secrets', description: 'Must print nothing' },
          { command: 'git revert HEAD --no-edit', description: 'Undo the last commit as a new commit' },
        ]}
      />
      <p>
        Never committed: <code>.venv/</code>, <code>node_modules/</code>, <code>data/*.db</code>,{' '}
        <code>backend/config/secrets.json</code>, <code>logs/</code>.
      </p>

      <Section title="SSH, Tailscale and the firewall" />
      <CommandTable
        rows={[
          { command: 'ssh-keygen -t ed25519', description: 'Make a key pair. Share only the .pub' },
          { command: 'ssh-copy-id homelab', description: 'Install your public key on the server' },
          { command: 'ssh homelab', description: 'Log in (the nickname lives in ~/.ssh/config)' },
          { command: 'ssh -L 8000:127.0.0.1:8000 homelab', description: 'Borrow a private server port on your computer' },
          { command: 'scp file homelab:~/', description: 'Copy a file to the server' },
          { command: 'tailscale status / tailscale ip -4', description: 'Devices on your tailnet / this device\'s address' },
          { command: 'sudo sshd -T | grep -i passwordauth', description: 'Check the real SSH setting' },
          { command: 'sudo ufw status verbose', description: 'See the firewall rules' },
          { command: 'sudo ufw allow ssh (then enable)', description: 'Allow SSH BEFORE enabling ufw' },
        ]}
      />

      <Section title="The server" />
      <CommandTable
        rows={[
          { command: 'sudo apt update && sudo apt upgrade -y', description: 'Weekly updates' },
          { command: 'cat /var/run/reboot-required', description: 'If it exists, plan a sudo reboot' },
          { command: 'uptime / df -h / free -h', description: 'Load, disk and memory' },
          { command: 'htop', description: 'Live processes (q to quit)' },
          { command: 'systemctl status <name>', description: 'Is a service running?' },
          { command: 'journalctl -u <name> -n 20', description: 'Its recent log lines' },
          { command: 'systemctl list-timers', description: 'Scheduled jobs (updates, certbot)' },
        ]}
      />

      <Section title="Docker" />
      <CommandTable
        rows={[
          { command: 'docker ps / docker ps -a', description: 'Running / all containers' },
          { command: 'docker images', description: 'Images on this machine' },
          { command: 'docker logs -f <name>', description: 'Follow a container\'s logs' },
          { command: 'docker exec -it <name> sh', description: 'A shell inside a container' },
          { command: 'docker compose up -d --build', description: 'Build and start everything' },
          { command: 'docker compose down', description: 'Stop and remove containers (volumes stay)' },
          { command: 'docker compose logs -f', description: 'Follow all logs' },
          { command: 'docker compose pull && docker compose up -d', description: 'Update a third-party app' },
          { command: 'docker system df', description: 'Disk used by Docker' },
        ]}
      />
      <Callout type="warning" title="Docker bypasses ufw">
        Always publish ports as <code>127.0.0.1:HOST:CONTAINER</code>. Check the PORTS column: <code>0.0.0.0</code> is
        reachable by everyone.
      </Callout>

      <Section title="nginx" />
      <CommandTable
        rows={[
          { command: 'sudo nginx -t && sudo systemctl reload nginx', description: 'Test, then reload. Never stop it' },
          { command: '/etc/nginx/sites-available/<name>', description: 'One config file per name' },
          { command: 'sudo ln -s …/sites-available/<name> /etc/nginx/sites-enabled/', description: 'Enable a site' },
          { command: 'sudo tail -f /var/log/nginx/error.log', description: 'Watch errors live' },
        ]}
      />
      <Table
        headers={['New hostname checklist', '']}
        rows={[
          ['1', 'DNS record in Cloudflare (A record to the Tailscale IP, grey cloud)'],
          ['2', 'App answers on 127.0.0.1:<port>'],
          ['3', 'Site file in sites-available'],
          ['4', 'Link into sites-enabled'],
          ['5', 'sudo nginx -t'],
          ['6', 'sudo systemctl reload nginx'],
          ['7', 'Certificate: the wildcard already covers it'],
          ['8', 'Open https://<name>.<domain>'],
        ]}
      />

      <Section title="Certificates and DNS" />
      <CommandTable
        rows={[
          { command: 'sudo certbot certificates', description: 'List certificates and expiry dates' },
          { command: 'sudo certbot renew --dry-run', description: 'Prove renewal works' },
          { command: 'systemctl status certbot.timer', description: 'The twice-daily renewal timer' },
          { command: 'dig +short <name>', description: 'What address does a name resolve to?' },
          { command: 'dig NS <domain> +short', description: 'Which nameservers answer for the domain' },
        ]}
      />
      <Table
        headers={['Word', 'Remember']}
        rows={[
          ['A record', 'name → IP address'],
          ['CNAME', 'name → another name'],
          ['DNS', 'The phonebook (Cloudflare)'],
          ['DDNS', 'A name that follows your changing home IP (only needed to go public)'],
          ['Registrar', 'Hostinger: sells the name'],
        ]}
      />

      <Section title="Where things live on the server" />
      <Table
        headers={['What', 'Where']}
        rows={[
          ['Your apps (git clones)', '~/apps/<app>/'],
          ['Third-party apps', '~/services/<app>/'],
          ['Media', '~/media/'],
          ['Backups', '/media/backup/'],
          ['nginx sites', '/etc/nginx/sites-available/ and sites-enabled/'],
          ['Certificates', '/etc/letsencrypt/live/<domain>/'],
          ['Cloudflare token', '/root/.secrets/cloudflare.ini (chmod 600)'],
        ]}
      />
      <Table
        caption="Ports at a glance"
        headers={['Port', 'Used by']}
        rows={[
          ['22', 'SSH'],
          ['80 / 443', 'nginx (HTTP redirect / HTTPS)'],
          ['5173 / 8000', 'Your app: frontend / backend (127.0.0.1 only)'],
          ['8096', 'Jellyfin'],
          ['2283', 'Immich'],
          ['8080', 'Nextcloud'],
        ]}
      />

      <Section title="The pipeline" />
      <Table
        headers={['Secret', 'Holds']}
        rows={[
          ['HOMELAB_HOST', 'Server\'s Tailscale name or 100.x address'],
          ['HOMELAB_USER', 'Server username'],
          ['HOMELAB_SSH_KEY', 'Private deploy key (dedicated)'],
          ['TS_OAUTH_CLIENT_ID / TS_OAUTH_SECRET', 'Tailscale OAuth client (auth_keys, tag:ci)'],
        ]}
      />
      <p>
        Flow: <code>git push origin main</code> → tests → join Tailscale → ssh → <code>git pull</code> →{' '}
        <code>docker compose up -d --build</code>.
      </p>

      <Section title="When something breaks" />
      <Table
        headers={['Symptom', 'First check']}
        rows={[
          ['502 Bad Gateway', 'docker compose ps: is the app running on the right port?'],
          ['Blocked request, host not allowed', 'allowedHosts in vite.config.ts'],
          ['Page loads, no data', 'F12 → Network: are calls going to /api/…?'],
          ['Certificate warning', 'sudo certbot certificates, then reload nginx'],
          ['Cannot SSH', 'Is Tailscale up on both ends? ping, then ssh -v homelab'],
          ['Disk full', 'df -h, docker system df'],
          ['Pipeline red', 'Open the Actions log and find the first red step'],
        ]}
      />

      <KeyTakeaways
        items={[
          'Everything private by default: ports on 127.0.0.1, access over Tailscale, secrets only on the machine that uses them.',
          'nginx is the one front door: one site file per name, test before reload.',
          'The wildcard certificate covers every name. Verify renewal with --dry-run.',
          'A push to main tests and deploys automatically. Revert to roll back.',
          'Back up before you trust anything with photos or files.',
        ]}
      />
    </div>
  );
}
