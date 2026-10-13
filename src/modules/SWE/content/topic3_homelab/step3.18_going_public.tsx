import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { TerminalBlock } from '../../../../components/content/TerminalBlock';
import { Steps } from '../../../../components/content/Steps';
import { Collapsible } from '../../../../components/content/Collapsible';
import { Compare } from '../../../../components/content/Compare';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';
import { Flow } from '../../../../components/content/Flow';

export default function Step3_18_GoingPublic() {
  return (
    <div>
      <StepHeader
        eyebrow="Step 3.18 • Names & Traffic (optional)"
        title="Going Public: Opening a Door to the Internet"
        summary="How to make a site reachable by anyone, without Tailscale, and what you take on when you do. This step is optional."
      />

      <Callout type="info" title="You can skip this step">
        Everything in this topic works privately over Tailscale, and for photos, files and family media that is
        usually the better choice. Read this when you want to publish something, like a portfolio site, that people
        without Tailscale should be able to open.
      </Callout>

      <Section title="Private vs public" />
      <Compare
        goodLabel="Private (Tailscale)"
        badLabel="Public (port forwarding)"
        good={
          <ul className="list-disc pl-5 space-y-1">
            <li>Only your signed-in devices can connect</li>
            <li>No router changes, no DDNS</li>
            <li>Attackers cannot even see the service</li>
            <li>Family needs the Tailscale app</li>
          </ul>
        }
        bad={
          <ul className="list-disc pl-5 space-y-1">
            <li>Anyone in the world can connect</li>
            <li>Needs a router port forward and DDNS</li>
            <li>Gets scanned and attacked constantly</li>
            <li>No special app for visitors</li>
          </ul>
        }
      />

      <Section title="The route a public visitor takes" />
      <Flow
        steps={[
          { title: 'Visitor', sub: 'https://pics.example.com' },
          { title: 'Cloudflare DNS', sub: 'CNAME to your DDNS name' },
          { title: 'Router DDNS', sub: 'resolves to your current home IP' },
          { title: 'Port forward', sub: '443 → server' },
          { title: 'nginx', sub: 'HTTPS, then routes to the app' },
        ]}
      />
      <p>
        This is exactly how your own FlashServer is built. The extra pieces compared to the private setup are the DDNS
        name, the port forwards and an open firewall.
      </p>

      <Section title="Before you start: can you even do this?" />
      <p>
        Some internet providers put many homes behind one shared public address (<strong>CGNAT</strong>), which makes port
        forwarding impossible. Check:
      </p>
      <TerminalBlock path="~" command="curl -s https://ifconfig.me" output="203.0.113.45" />
      <p>
        Compare it with the <strong>WAN / Internet IP</strong> shown in your router&apos;s app. If they differ, or the
        router&apos;s one starts with <code>100.64</code> to <code>100.127</code> or <code>10.</code>, you are behind
        CGNAT. Stay with Tailscale (or ask your provider about a public address).
      </p>

      <Section title="1. Get a DDNS name for your home" />
      <Steps
        steps={[
          { title: 'Enable DDNS on the router', children: <p>On a TP-Link Deco: Deco app → <em>More → Advanced → DDNS</em>, then register a name. You end up with something like <code>flash-server.tplinkdns.com</code>. Other routers have a similar setting, or you can use a free DDNS service.</p> },
          { title: 'Check that it resolves', children: <TerminalBlock path="~" command="dig +short flash-server.tplinkdns.com" output="203.0.113.45" /> },
        ]}
      />

      <Section title="2. Point a name at it in Cloudflare" />
      <Table
        headers={['Type', 'Name', 'Target', 'TTL', 'Proxy']}
        rows={[
          ['CNAME', 'pics', 'flash-server.tplinkdns.com', '5 min', 'DNS only (grey cloud)'],
          ['CNAME', 'blog', 'flash-server.tplinkdns.com', '5 min', 'DNS only (grey cloud)'],
        ]}
      />
      <p>
        A <strong>CNAME</strong> points a name at another <em>name</em>, so when the DDNS entry follows your changing IP,
        your record follows too. A short TTL lets changes spread within minutes.
      </p>

      <Section title="3. Forward the ports on the router" />
      <p>In the router app (on a Deco: <em>More → Advanced → NAT Forwarding → Port Forwarding</em>) forward these to your server&apos;s fixed address from step 3.7:</p>
      <Table
        headers={['Name', 'External port', 'Internal port', 'Protocol', 'Purpose']}
        rows={[
          ['HTTPS', '443', '443', 'TCP', 'Secure web traffic for every name'],
          ['HTTP', '80', '80', 'TCP', 'Redirects visitors to HTTPS'],
        ]}
      />
      <Callout type="tip" title="If your provider blocks port 80">
        Some home providers block incoming port 80. FlashServer forwards a spare external port (8463) as a fallback for
        the HTTP redirect. If port 80 is blocked, visitors simply have to type <code>https://</code> themselves, and
        HTTPS on 443 works normally.
      </Callout>

      <Section title="4. Open the firewall" />
      <TerminalBlock
        path="anna@homelab:~"
        lines={[
          { command: "sudo ufw allow 80/tcp comment 'nginx HTTP redirect'" },
          { command: "sudo ufw allow 443/tcp comment 'nginx HTTPS'" },
          { command: 'sudo ufw status verbose' },
        ]}
      />

      <Section title="5. The certificate" />
      <p>
        Good news: the wildcard certificate from step 3.17 already covers <code>pics.example.com</code>, so you only need a
        site file for it. (If you ever prefer Certbot&apos;s HTTP method for a public name,{' '}
        <code>sudo certbot --nginx -d pics.example.com</code> works when port 80 is reachable.)
      </p>

      <Section title="6. Test it as a stranger" />
      <p>
        Turn <strong>Tailscale off</strong> on your phone, switch off its Wi-Fi to use mobile data, and open{' '}
        <code>https://pics.example.com</code>. If it loads, it is public. (A &quot;Not reachable&quot; result means a step
        above is wrong. Check from the outside in: DNS, the router forward, the firewall, nginx.)
      </p>

      <Section title="What you are signing up for" />
      <Callout type="warning" title="Public means attacked">
        Within minutes of opening ports, automated scanners will start trying passwords, known weaknesses and
        default logins. This is normal, not personal. Treat these as the minimum rules:
      </Callout>
      <Table
        headers={['Rule', 'Why']}
        rows={[
          ['Expose only what must be public', 'Every public app is a door. Keep photos, files and your admin pages on Tailscale'],
          ['Never expose SSH, databases or the Docker socket', 'They are the most-attacked and most damaging doors'],
          ['Keep everything updated', 'Most break-ins use known flaws that already have fixes (step 3.11)'],
          ['Strong, unique passwords and two-factor login', 'Where an app offers 2FA, turn it on'],
          ['Look at the logs sometimes', 'sudo tail -f /var/log/nginx/access.log shows who is knocking'],
          ['Consider fail2ban', 'sudo apt install fail2ban bans addresses that keep failing'],
          ['Have backups (step 3.22)', 'If the worst happens, you can rebuild'],
        ]}
      />

      <Collapsible title="Troubleshooting">
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>It works on Wi-Fi at home but not on mobile data:</strong> your router may not support &quot;hairpin&quot; routing, or the forward is wrong. Always test from outside.</li>
          <li><strong>The DDNS name shows an old address:</strong> the router has not updated. Check the DDNS status in the router app.</li>
          <li><strong>Connection refused or timed out from outside:</strong> check the forward, ufw (<code>sudo ufw status</code>), and that nginx is listening on 443 (<code>sudo ss -tlnp | grep 443</code>).</li>
          <li><strong>A certificate warning:</strong> the name is not covered by your certificate. Run <code>sudo certbot certificates</code>.</li>
        </ul>
      </Collapsible>

      <QuizSet>
        <Quiz
          question="Which of these should you NEVER expose to the public internet?"
          options={['A portfolio website', 'SSH and databases', 'A blog', 'A landing page']}
          correctIndex={1}
          explanation="Administration doors and data stores are the most attacked and the most damaging."
        />
        <Quiz
          question="What does DDNS do in a public setup?"
          options={['Encrypts traffic', 'Keeps a name pointing at your changing home IP', 'Speeds up the website', 'Replaces nginx']}
          correctIndex={1}
          explanation="Your home IP can change. DDNS keeps one name following it."
        />
        <Quiz
          question="You are behind CGNAT. What is your best option?"
          options={['Keep trying port forwarding', 'Stay with Tailscale for access', 'Disable the firewall', 'Buy a new laptop']}
          correctIndex={1}
          explanation="CGNAT blocks inbound connections. Tailscale works anyway, since connections go outward."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'Public needs three extras: a DDNS name, router port forwards for 80/443, and an open firewall.',
          'Cloudflare CNAMEs (DNS only) point your names at the DDNS name. The wildcard certificate is reused.',
          'Test from outside with Tailscale off. CGNAT makes public hosting impossible.',
          'Public means attacked. Expose as little as possible and never SSH, databases or admin pages.',
        ]}
      />
    </div>
  );
}
