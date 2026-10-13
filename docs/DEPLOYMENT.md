# Deployment

Pushing to `main` triggers the GitHub Actions workflow in
[`.github/workflows/github_actions.yml`](../.github/workflows/github_actions.yml). It joins your Tailscale network,
SSHes into the server, pulls the latest code and restarts the app.

```
push to main → GitHub runner → Tailscale (tag:github-deployer) → SSH to server → git pull → npm ci → system.sh --restart
```

The server runs the Vite server via `scripts/system.sh` on port **5173** (`npm run dev -- --host`). That is fine for
a private, personal site. If you later want a production build instead, serve `dist/` from `npm run build`.

---

## Domain, DNS and certificate (lms.crossroadstutoring.com)

The app is served at **https://lms.crossroadstutoring.com**. The rest of `crossroadstutoring.com` (the main website and
email) is not touched; only one new DNS record is added.

### 1. DNS lives in Cloudflare

Cloudflare is used for DNS so certbot can prove domain ownership with a DNS challenge (port 80 is blocked by the ISP,
so the HTTP challenge is not an option). If the domain's nameservers are still at Hostinger:

1. Cloudflare dashboard → **Add a site** → `crossroadstutoring.com` → Free plan.
2. Cloudflare scans and imports the existing records. **Compare them against Hostinger's DNS zone** (hPanel → Domains →
   DNS / Nameservers → DNS records) and add anything missing, especially `A` / `CNAME` for `@` and `www`, all `MX`
   records, and `TXT` records (SPF, DKIM, DMARC, verification). Missing records break the website or email.
3. Set the website records (`@` and `www`) to **DNS only** (grey cloud) at first, so nothing changes about how the
   website is served.
4. At Hostinger, change the domain's **nameservers** to the two Cloudflare gave you. Propagation takes minutes to hours.
   The domain stays registered at Hostinger; only DNS moves.
5. Add the app record in Cloudflare:

   | Type | Name | Target | Proxy |
   |---|---|---|---|
   | CNAME | `lms` | `flash-server.tplinkdns.com` | DNS only (grey cloud) |

   It points at the same DDNS name your other sites use. Keep it grey: the proxy only supports specific ports, and
   the server uses 443 and 8463.

### 2. Certificate (one-time, on the server)

The Cloudflare API token that certbot uses must include this zone (Cloudflare → My Profile → API Tokens → edit the token →
add `crossroadstutoring.com` with **Zone → DNS → Edit**). Find the credentials file path certbot already uses:

```bash
sudo grep -E "authenticator|dns_cloudflare" /etc/letsencrypt/renewal/stepheng753.com.conf
```

Then issue a certificate for the new hostname (use the same credentials path):

```bash
sudo certbot certonly --dns-cloudflare --dns-cloudflare-credentials /etc/letsencrypt/cloudflare.ini -d lms.crossroadstutoring.com
```

It renews automatically with the other certificates (`sudo certbot renew --dry-run` to confirm).

## Nginx

nginx terminates HTTPS and proxies to the Vite server on port 5173, following the same pattern as the other sites on
the server (HTTP redirect on 8463).

```nginx
server {
    listen 8463;
    server_name lms.crossroadstutoring.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    listen [::]:443 ssl;
    server_name lms.crossroadstutoring.com;

    ssl_certificate     /etc/letsencrypt/live/lms.crossroadstutoring.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/lms.crossroadstutoring.com/privkey.pem;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;
    ssl_protocols TLSv1.2 TLSv1.3;

    location / {
        proxy_pass http://127.0.0.1:5173;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

Setup on the server:

```bash
sudo nano /etc/nginx/sites-available/lms.crossroadstutoring.com   # paste the config above
sudo ln -s /etc/nginx/sites-available/lms.crossroadstutoring.com /etc/nginx/sites-enabled/
ln -s /etc/nginx/sites-available/lms.crossroadstutoring.com ~/Services/Nginx/lms_nginx_conf.so   # shortcut, like the other sites
sudo nginx -t && ~/Services/Nginx/reload_nginx.sh               # test, then reload
```

`vite.config.ts` sets `server.allowedHosts` to `.crossroadstutoring.com` and `.stepheng753.com`. Without it, Vite rejects
proxied requests with "Blocked request. This host is not allowed." Change it if you use another domain.

---

## Required GitHub secrets

Add these under **Repository → Settings → Secrets and variables → Actions → New repository secret**.

| Secret | What it is |
|---|---|
| `TS_OAUTH_CLIENT_ID` | Tailscale OAuth client ID |
| `TS_OAUTH_SECRET` | Tailscale OAuth client secret |
| `SERVER_IP` | The server's Tailscale IP (`100.x.y.z`) or MagicDNS name |
| `SSH_PRIVATE_KEY` | Private key the runner uses to log in as `flash-server` |

### 1. Tailscale policy (one-time)

In the Tailscale admin console → **Access controls**, make sure the tag exists and may reach the server's SSH port:

```json
"tagOwners": { "tag:github-deployer": ["autogroup:admin"] },
"acls": [
  { "action": "accept", "src": ["tag:github-deployer"], "dst": ["*:22"] }
]
```

Narrow `dst` to the server if you want it tighter. Merge into your existing policy rather than replacing it.

### 2. `TS_OAUTH_CLIENT_ID` and `TS_OAUTH_SECRET`

1. Tailscale admin console → **Settings → OAuth clients → Generate OAuth client**.
2. Grant the **Auth Keys: Write** scope (shown as `auth_keys` / `devices:core` depending on version).
3. Add the tag **`tag:github-deployer`**. It must match `tags:` in the workflow.
4. Generate, then copy the **client ID** and **client secret**. The secret is only shown once.

### 3. `SERVER_IP`

On the server:

```bash
tailscale ip -4
```

Use the `100.x.y.z` address (or the machine's MagicDNS name).

### 4. `SSH_PRIVATE_KEY`

Use a dedicated key just for deployment. On your own machine:

```bash
ssh-keygen -t ed25519 -f ~/.ssh/lms_deploy -C "github-actions-lms" -N ""
```

Install the **public** key on the server for the `flash-server` user:

```bash
ssh-copy-id -i ~/.ssh/lms_deploy.pub flash-server@<server-tailscale-ip>
```

Copy the **private** key, including the `-----BEGIN` and `-----END` lines, into the secret:

```bash
cat ~/.ssh/lms_deploy
```

### Optional: set them from the command line

With the GitHub CLI (`gh auth login` first):

```bash
gh secret set TS_OAUTH_CLIENT_ID --repo Stepheng753/LMS
gh secret set TS_OAUTH_SECRET    --repo Stepheng753/LMS
gh secret set SERVER_IP          --repo Stepheng753/LMS
gh secret set SSH_PRIVATE_KEY    --repo Stepheng753/LMS < ~/.ssh/lms_deploy
```

---

## Server prerequisites

- The repo cloned at `~/Development/LMS` for the `flash-server` user
- **Node.js 20 or newer** (Tailwind 4 will not install or start on Node 18), installed with nvm and set as the nvm default
  (`nvm alias default 22`). The deploy script loads nvm itself, like the other sites' workflows, so the system Node can
  stay as it is for other services.
- `git pull origin main` works without a prompt (public repo, or a read-only deploy key on the server)
- `tailscaled` running and the machine online

## Troubleshooting

| Symptom | Likely cause |
|---|---|
| Tailscale step fails with 401/403 | Wrong OAuth scope, or the client wasn't given `tag:github-deployer` |
| SSH step times out | ACL doesn't allow the tag to reach port 22, or the server is offline |
| `Permission denied (publickey)` | Public key not in the server's `authorized_keys`, or the secret is missing its header/footer lines |
| `git pull` asks for credentials | The server can't read the repo non-interactively |
| App won't start, `EBADENGINE` or "Cannot find native binding" | The deploy is running on Node 18. Check that nvm's default is Node 22 (`nvm ls`) and re-run the workflow |
| Site not updating | Check `./scripts/system.sh --status` and `logs/system.log` on the server |
