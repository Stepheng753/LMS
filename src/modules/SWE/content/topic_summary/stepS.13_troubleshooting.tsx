import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { Steps } from '../../../../components/content/Steps';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function StepS_13_Troubleshooting() {
  return (
    <div>
      <StepHeader
        eyebrow="Summary • Troubleshooting"
        title="The Troubleshooting Guide"
        summary="A method for any problem, then a lookup of the symptoms you are most likely to meet across the whole course."
      />

      <Section title="The method that always works" />
      <Steps
        steps={[
          { title: 'Read the error, all of it', children: <p>The last line is often not the cause. Scroll up. The useful words are file names, line numbers and phrases like "not found", "permission denied" or "refused".</p> },
          { title: 'Say what you expected', children: <p>"I ran X expecting Y and got Z." This alone solves many problems.</p> },
          { title: 'Check where you are', children: <p><code>pwd</code> and <code>ls</code>. Wrong folder is the most common cause of "file not found".</p> },
          { title: 'Halve the search', children: <p>Does it work on a smaller piece? In Swagger instead of the frontend? On localhost instead of through nginx? Each test cuts the possibilities in half.</p> },
          { title: 'Change one thing at a time', children: <p>If you change three things and it works, you learned nothing.</p> },
          { title: 'Ask with the full evidence', children: <p>Paste the whole error, the command you ran, and what you already tried. Ask the AI to explain the cause, not just give a fix.</p> },
        ]}
      />

      <Callout type="info" title="The debugging order for the app">
        Database, then backend in Swagger, then the request in the browser&apos;s Network tab, then the screen. The first stage
        that looks wrong is where the problem lives.
      </Callout>

      <Section title="Setup and terminal (Topic 1)" />
      <Table
        headers={['Symptom', 'Likely cause', 'Try']}
        rows={[
          ['command not found', 'Typo, not installed, or the alias is not loaded', 'Check spelling, install with apt, source ~/.bashrc'],
          ['No such file or directory', 'Wrong folder or name', 'pwd, ls, check capitals'],
          ['Permission denied', 'Needs administrator rights, or the file is not yours', 'sudo for system tasks. Check ownership with ls -l'],
          ['Pasting does nothing', 'Ctrl+V does not paste in the terminal', 'Right-click, or Ctrl+Shift+V'],
          ['Password shows nothing', 'Passwords are invisible by design', 'Type it and press Enter'],
          ['Slow files or odd permissions', 'Project is under /mnt/c', 'Move it to ~/Development'],
          ['localhost does not work from Windows', 'WSL networking is not mirrored', 'Check the .wslconfig and run wsl --shutdown'],
        ]}
      />

      <Section title="The app (Topic 2)" />
      <Table
        headers={['Symptom', 'Likely cause', 'Try']}
        rows={[
          ['Frontend loads but shows no data', 'Backend down, wrong URL, or CORS', 'Open /docs. Network tab. Check allowed_origins'],
          ['Network tab shows red / blocked by CORS', 'The backend does not allow the frontend address', 'Add the address to allowed_origins in config'],
          ['404 on a route', 'Wrong path or router not included', 'Compare the URL with Swagger'],
          ['422 Unprocessable', 'Wrong data shape sent', 'Compare the body with the model in Swagger'],
          ['500 Internal Server Error', 'A bug in the backend', 'Read the backend log in the terminal'],
          ['Port already in use', 'A previous run is still going', 'system.sh --stop all, then start again'],
          ['Module not found (Python)', 'Wrong Python, or a missing library', 'Always ./.venv/bin/python from backend/. Add to requirements.txt'],
          ['Data vanished', 'Database file moved or recreated', 'Confirm it lives in data/ and is the same path'],
          ['Styles missing', 'Tailwind not configured for v4', 'Follow the frontend skill. No tailwind.config in v4'],
        ]}
      />

      <Section title="Git and GitHub (Topic 3)" />
      <Table
        headers={['Symptom', 'Likely cause', 'Try']}
        rows={[
          ['Permission denied (publickey)', 'GitHub does not know your key', 'Add the public key to GitHub. ssh -T git@github.com'],
          ['Rejected: non-fast-forward', 'The remote has commits you do not', 'git pull, then push'],
          ['A secret shows in git status', 'It is not ignored', 'Add to .gitignore. git rm --cached FILE. Revoke the secret if it was pushed'],
          ['Huge repository', 'node_modules or a database committed', 'Ignore them and remove from tracking'],
        ]}
      />

      <Section title="Server, SSH, firewall, Tailscale (Topic 3)" />
      <Table
        headers={['Symptom', 'Likely cause', 'Try']}
        rows={[
          ['Connection timed out to the server', 'Server off, wrong address, or the firewall', 'Use the Tailscale name. Check the server is on'],
          ['Connection refused', 'ssh service not running', 'At the console: systemctl status ssh'],
          ['Still asked for a password', 'Key not installed or wrong permissions', 'ssh-copy-id. chmod 700 ~/.ssh, chmod 600 on the key'],
          ['Locked out after ufw', 'Enabled before allowing ssh', 'Use the console: ufw allow ssh'],
          ['Tailscale device offline', 'Key expired or service stopped', 'Disable key expiry. sudo systemctl start tailscaled'],
          ['Server almost out of disk', 'Docker images, logs or backups', 'df -h, docker system df, docker image prune'],
        ]}
      />

      <Section title="Docker, nginx, HTTPS (Topic 3)" />
      <Table
        headers={['Symptom', 'Likely cause', 'Try']}
        rows={[
          ['Container exits at once', 'The app crashed on start', 'docker compose logs SERVICE'],
          ['Port already allocated', 'Something else uses that port', 'Choose another host port, or stop the other'],
          ['Data lost after restart', 'No volume', 'Add a volume for the data path'],
          ['502 Bad Gateway', 'nginx cannot reach the app', 'Is the container up on the port nginx proxies to'],
          ['nginx -t fails', 'Syntax error', 'Read the line number it reports'],
          ['Site shows the wrong app', 'server_name mismatch', 'Check the site file for that name'],
          ['Name does not resolve', 'DNS record missing or wrong', 'Check the Cloudflare record, and that it is DNS only'],
          ['Certificate warning', 'Expired or wrong name', 'certbot certificates, renew, reload nginx'],
          ['Vite: "Blocked request. This host is not allowed"', 'Host not allowed in Vite', 'Add it to server.allowedHosts in vite.config.ts'],
        ]}
      />

      <Section title="Pipeline (Topic 3)" />
      <Table
        headers={['Symptom', 'Likely cause', 'Try']}
        rows={[
          ['Tests fail in Actions but pass locally', 'Different environment or missing file', 'Read the log. Check what the workflow installs'],
          ['Deploy cannot connect', 'Runner not on Tailscale, or wrong host secret', 'Check the Tailscale step and the secrets'],
          ['Permission denied (publickey) in the deploy', 'Wrong deploy key', 'Regenerate it, update the secret and authorized_keys'],
          ['Workflow does not run', 'Wrong file path or YAML indentation', '.github/workflows/, and check indentation'],
        ]}
      />

      <Section title="External APIs (Topic 4)" />
      <Table
        headers={['Symptom', 'Likely cause', 'Try']}
        rows={[
          ['401 Unauthorized', 'Missing or wrong key', 'Check secrets.json and the header format'],
          ['403 Forbidden', 'Key lacks permission, or API not enabled, or sheet not shared', 'Enable the API. Share the sheet with the service account email'],
          ['429 Too Many Requests', 'Rate limit', 'Slow down, back off and retry later'],
          ['Google error about redirect_uri', 'OAuth redirect does not match', 'Add the exact URI in the Google console'],
          ['AI answers are cut off', 'max tokens too low', 'Raise it, mindful of cost'],
          ['App refuses to call the AI', 'Your cap was reached', 'That is the cap working. Raise it on purpose, or wait'],
          ['Posts failing', 'Wrong account id, or content rules', 'Read the Blotato error. Try a manual post'],
        ]}
      />

      <Section title="Agents (Topic 5)" />
      <Table
        headers={['Symptom', 'Likely cause', 'Try']}
        rows={[
          ['MCP tools do not appear', 'Config path or JSON error', 'Validate the JSON. Restart agy'],
          ['MCP server fails to start', 'Missing runtime or wrong command', 'Run the command by hand to see the error'],
          ['Agent loops forever', 'No step limit or unclear goal', 'Add a maximum. Rewrite the brief with a done-when'],
          ['Local model is very slow', 'Model too large for your RAM or GPU', 'Pick a smaller model'],
          ['Telegram bot ignores you', 'Your id not in the allowlist', 'Check the allowed user id'],
          ['Agent did something unexpected', 'Brief too vague or permissions too wide', 'Runbook 5 in the safety playbook'],
        ]}
      />

      <QuizSet title="Troubleshooting Check">
        <Quiz
          question="Your frontend shows nothing. What is the best first check?"
          options={['Rewrite the page', 'Open Swagger at /docs to see if the backend answers', 'Reinstall WSL', 'Delete node_modules']}
          correctIndex={1}
          explanation="This halves the search: if Swagger works, the bug is in the frontend or the request."
        />
        <Quiz
          question="You get a 403 from the Sheets API. What are you most likely missing?"
          options={['A faster computer', 'The sheet shared with the service account email', 'A new model', 'A bigger cap']}
          correctIndex={1}
          explanation="A service account sees only what is shared with its email."
        />
        <Quiz
          question="You changed three settings and it works. What did you learn?"
          options={['Which one fixed it', 'Nothing certain, so change one at a time', 'That all three were needed', 'That it was luck']}
          correctIndex={1}
          explanation="One change at a time keeps cause and effect clear."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'Read the full error, check where you are, halve the search, change one thing at a time.',
          'For the app: database, Swagger, network tab, screen.',
          'Most server trouble is the firewall, a port, a name or a certificate.',
          'Most API trouble is a key, a permission or a rate limit.',
          'Ask with full evidence and request the cause, not just a fix.',
        ]}
      />
    </div>
  );
}
