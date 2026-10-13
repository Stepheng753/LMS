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
- Node.js and npm installed
- `git pull origin main` works without a prompt (public repo, or a read-only deploy key on the server)
- `tailscaled` running and the machine online

## Troubleshooting

| Symptom | Likely cause |
|---|---|
| Tailscale step fails with 401/403 | Wrong OAuth scope, or the client wasn't given `tag:github-deployer` |
| SSH step times out | ACL doesn't allow the tag to reach port 22, or the server is offline |
| `Permission denied (publickey)` | Public key not in the server's `authorized_keys`, or the secret is missing its header/footer lines |
| `git pull` asks for credentials | The server can't read the repo non-interactively |
| Site not updating | Check `./scripts/system.sh --status` and `logs/system.log` on the server |
