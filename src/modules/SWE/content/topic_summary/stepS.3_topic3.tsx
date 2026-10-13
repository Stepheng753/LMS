import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { Flow } from '../../../../components/content/Flow';
import { Collapsible } from '../../../../components/content/Collapsible';
import { Quiz, QuizSet, MultiSelectQuiz } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function StepS_3_Topic3() {
  return (
    <div>
      <StepHeader
        eyebrow="Summary • Topic 3"
        title="Recap: Homelab & Pipelines"
        summary="Your own server, reachable from anywhere, running containers behind your own domain, deploying on every push."
      />

      <Section title="The big picture" />
      <Flow
        steps={[
          { title: 'Your laptop', sub: 'Spec, plan, review' },
          { title: 'GitHub', sub: 'Code and the pipeline', via: 'git push' },
          { title: 'Tailscale', sub: 'A private network, no open ports', via: 'runner joins' },
          { title: 'Homelab', sub: 'Docker, nginx, certificates', via: 'ssh + pull' },
          { title: 'Your domain', sub: 'Cloudflare DNS, HTTPS', via: 'names' },
        ]}
      />

      <Section title="The ideas, step by step" />
      <Table
        headers={['Topic', 'Key points', 'Step']}
        rows={[
          [<strong key="a">The internet</strong>, 'Loading a website is the same request and response as localhost: DNS, connect, encrypt, request, server work, response, draw', '3.2'],
          [<strong key="b">Addresses</strong>, 'Private (192.168.x, 10.x), public, loopback 127.0.0.1, Tailscale 100.x. The router shares one public address (NAT) and hands out private ones (DHCP). A port finds the program', '3.3'],
          [<strong key="c">Git and GitHub</strong>, 'Commits are snapshots: gs, ga ., gc "msg", git push origin main. .gitignore keeps secrets, databases, venvs and node_modules out. A committed secret is public forever', '3.4, 3.5'],
          [<strong key="d">The server</strong>, 'Ubuntu Server LTS from a USB stick. A DHCP reservation keeps its address. Lid switch set to ignore', '3.6, 3.7'],
          [<strong key="e">SSH</strong>, 'A key pair: share the .pub, never the private file. ssh-copy-id, then ~/.ssh/config gives you ssh homelab', '3.5, 3.8'],
          [<strong key="f">Hardening</strong>, 'PasswordAuthentication no (check with sshd -T). ufw: deny incoming, allow ssh FIRST, then enable. Test in a second window', '3.9'],
          [<strong key="g">Tailscale</strong>, 'A private encrypted network between your devices. No router ports. Disable key expiry on the server', '3.10'],
          [<strong key="h">Upkeep</strong>, 'apt update && upgrade weekly. df -h, free -h, htop, journalctl. A full disk is the usual failure', '3.11'],
          [<strong key="i">Docker</strong>, 'Dockerfile builds an image, an image runs as a container. Containers forget, so keep data in volumes. Publish ports as 127.0.0.1:HOST:CONTAINER because Docker bypasses ufw', '3.12 to 3.14'],
          [<strong key="j">Names</strong>, 'Hostinger sells the domain, Cloudflare holds the DNS. A records point names at the Tailscale IP, DNS only (grey cloud). DDNS is only for going public', '3.15'],
          [<strong key="k">nginx</strong>, 'A reverse proxy on the host: one site file per name in sites-available, linked into sites-enabled. Always nginx -t && reload. /api/ routes to the backend', '3.16'],
          [<strong key="l">HTTPS</strong>, 'Let\'s Encrypt via the Cloudflare DNS challenge gives a wildcard certificate for every name. 90 days, so test with renew --dry-run', '3.17'],
          [<strong key="m">Self-hosted apps</strong>, 'Own folder, official compose, port on 127.0.0.1, DNS record, nginx site, then set up. Jellyfin, Immich, Nextcloud', '3.19 to 3.21'],
          [<strong key="n">Backups</strong>, '3-2-1: three copies, two storage types, one off-site. Dump databases. Test a restore', '3.22'],
          [<strong key="o">Pipelines</strong>, 'Push to main runs tests, then deploys over Tailscale and SSH with a dedicated deploy key and GitHub secrets. Roll back with git revert', '3.23, 3.24'],
        ]}
      />

      <Callout type="warning" title="Five things that bite everyone">
        <ol className="list-decimal pl-5 space-y-1">
          <li><strong>ufw before SSH.</strong> Allow SSH first, or you lock yourself out.</li>
          <li><strong>Docker ignores ufw.</strong> Bind ports to 127.0.0.1.</li>
          <li><strong>Secrets in git.</strong> Check <code>git ls-files | grep secrets</code> before every push.</li>
          <li><strong>Forgetting nginx -t.</strong> A typo reloaded into a live server takes every site down.</li>
          <li><strong>No backup, no restore test.</strong> A backup you have never restored is a hope.</li>
        </ol>
      </Callout>

      <Section title="Common mistakes" />
      <Table
        headers={['Mistake', 'Fix']}
        rows={[
          ['The server\'s IP keeps changing', 'A DHCP reservation in the router'],
          ['Frontend calls http://localhost:8000 on a server', 'Use /api, routed by nginx to the backend'],
          ['"Blocked request. This host is not allowed"', 'Allow the host name in vite.config.ts (server.allowedHosts)'],
          ['The orange cloud on a Cloudflare record', 'Switch to DNS only. The proxy cannot reach private addresses'],
          ['A certificate warning after renewal', 'Reload nginx. Check certbot certificates'],
          ['Using your personal SSH key in the pipeline', 'A dedicated deploy key you can revoke alone'],
          ['Exposing SSH or databases publicly', 'Never. Keep them on Tailscale'],
        ]}
      />

      <Collapsible title="Rapid recall">
        <ul className="list-disc pl-5 space-y-1">
          <li>Why a wildcard certificate with the DNS challenge? <em>The server is private, so Let&apos;s Encrypt cannot connect to it</em>.</li>
          <li>What is a deploy key? <em>A key made only for the pipeline, so one leak is one revocation</em>.</li>
          <li>How do you stop a container but keep its data? <em>docker compose down. The data is in a volume</em>.</li>
          <li>What does needs: test do in a workflow? <em>Deploy waits for tests, and is skipped if they fail</em>.</li>
        </ul>
      </Collapsible>

      <QuizSet title="Topic 3 Quick Check">
        <Quiz
          question="What does NAT let your home do?"
          options={['Encrypt traffic', 'Share one public address among many devices', 'Speed up downloads', 'Replace DNS']}
          correctIndex={1}
          explanation="The router rewrites addresses, so every device can use the one public address."
        />
        <Quiz
          question="Which is the safe order for ufw?"
          options={['Enable, then allow ssh', 'Allow ssh, then enable', 'Disable ssh', 'Order does not matter']}
          correctIndex={1}
          explanation="Enabling a deny-all firewall before allowing SSH cuts your own connection."
        />
        <Quiz
          question="A container port is published as 0.0.0.0:8081. What does that tell you?"
          options={['It is private', 'It is reachable from other machines, around the firewall', 'The container crashed', 'It is encrypted']}
          correctIndex={1}
          explanation="Use 127.0.0.1 to keep it private, because Docker bypasses ufw."
        />
        <Quiz
          question="What problem does DDNS solve?"
          options={['Slow websites', 'Your home public IP changing over time', 'Missing certificates', 'Weak passwords']}
          correctIndex={1}
          explanation="It is only needed to go public. Tailscale addresses do not change."
        />
        <Quiz
          question="Why run sudo nginx -t before reloading?"
          options={['It is faster', 'It catches mistakes before they take sites down', 'It renews certificates', 'It restarts nginx']}
          correctIndex={1}
          explanation="The test checks the config without applying it."
        />
        <Quiz
          question="How long does a Let's Encrypt certificate last?"
          options={['1 day', '90 days', '10 years', 'Forever']}
          correctIndex={1}
          explanation="That is why you test automatic renewal with --dry-run."
        />
        <Quiz
          question="What does the 3-2-1 backup rule say?"
          options={['3 passwords, 2 disks, 1 server', '3 copies, on 2 kinds of storage, 1 off-site', '3 days, 2 hours, 1 minute', 'Back up three times a day']}
          correctIndex={1}
          explanation="Three copies, two kinds of storage, one somewhere else."
        />
        <MultiSelectQuiz
          question="Which belong in a pipeline's GitHub secrets? (Pick all)"
          options={['The server host name', 'The deploy key (private)', 'The Tailscale OAuth secret', 'A line of code']}
          correctIndexes={[0, 1, 2]}
          explanation="Secrets are credentials and connection details. Code does not belong in secrets."
        />
        <Quiz
          question="A bad change is live. What is the cleanest way back?"
          options={['Delete the repository', 'git revert HEAD, then push so the pipeline deploys the old state', 'Edit files inside the container', 'Reinstall Ubuntu']}
          correctIndex={1}
          explanation="Revert creates a new commit that undoes the change, keeping history a straight line."
        />
      </QuizSet>

      <Section title="Can you...?" />
      <ul className="list-disc pl-5 space-y-1">
        <li>Explain what happens between typing a URL and seeing the page?</li>
        <li>Make a repository, ignore the right files, commit, and push to GitHub?</li>
        <li>Log in to your server with one short command, from anywhere, without a password?</li>
        <li>Turn on the firewall without locking yourself out?</li>
        <li>Run your app in containers and prove its data survives a restart?</li>
        <li>Give a new app a name, a certificate and an nginx site?</li>
        <li>Push a change and watch it deploy, and roll it back?</li>
        <li>Say where your backups are, and how you would restore one?</li>
      </ul>

      <KeyTakeaways
        items={[
          'The server is private by default: Tailscale for access, nginx as the only door, everything else on 127.0.0.1.',
          'Git carries code. Secrets, databases and keys stay on the machine that uses them.',
          'Containers forget. Volumes keep. Docker bypasses ufw, so bind to 127.0.0.1.',
          'Names come from Cloudflare DNS, certificates from Let\'s Encrypt, routing from nginx.',
          'A push to main tests and deploys. Revert to roll back. Back up, and prove you can restore.',
        ]}
      />
    </div>
  );
}
