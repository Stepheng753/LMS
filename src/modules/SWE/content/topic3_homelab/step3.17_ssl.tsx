import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { CodeBlock } from '../../../../components/content/CodeBlock';
import { TerminalBlock } from '../../../../components/content/TerminalBlock';
import { Steps } from '../../../../components/content/Steps';
import { Collapsible } from '../../../../components/content/Collapsible';
import { Term } from '../../../../components/content/Term';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';
import { CLOUDFLARE_INI, NGINX_APP_SITE } from '../../toolkit/tools_homelab';

const SSL_PARAMS = `# /etc/nginx/snippets/ssl-params.conf  (optional hardening)
ssl_protocols TLSv1.2 TLSv1.3;
ssl_prefer_server_ciphers on;
ssl_ciphers 'TLS_AES_128_GCM_SHA256:TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384';

ssl_session_cache shared:SSL:10m;
ssl_session_timeout 1d;
ssl_session_tickets off;

add_header Strict-Transport-Security "max-age=63072000; includeSubDomains" always;
add_header X-Frame-Options SAMEORIGIN;
add_header X-Content-Type-Options nosniff;`;

const RELOAD_HOOK = `sudo tee /etc/letsencrypt/renewal-hooks/deploy/reload-nginx.sh << 'EOF'
#!/bin/bash
systemctl reload nginx
EOF

sudo chmod +x /etc/letsencrypt/renewal-hooks/deploy/reload-nginx.sh`;

export default function Step3_17_Ssl() {
  return (
    <div>
      <StepHeader
        eyebrow="Step 3.17 • Names & Traffic"
        title="HTTPS: The Padlock"
        summary="Get a free, trusted certificate from Let's Encrypt, using Cloudflare to prove you own the domain, and have it renew by itself."
      />

      <p>
        Right now your app opens over plain <code>http://</code>. Anyone able to see the traffic could read it, and
        browsers mark the page &quot;Not secure&quot;. <strong>HTTPS</strong> encrypts everything between the browser and
        nginx. For that you need a{' '}
        <Term definition="A digital file that proves a server owns a name, and holds the keys used to encrypt the connection.">certificate</Term>,
        issued by a trusted authority that has checked you control the domain.
      </p>
      <p>
        <strong>Let&apos;s Encrypt</strong> is a free, automatic certificate authority. A tool called{' '}
        <strong>Certbot</strong> talks to it for you.
      </p>

      <Section title="How do you prove you own a domain?" />
      <Table
        headers={['Method', 'Proof', 'Needs open ports?', 'Used for']}
        rows={[
          ['HTTP challenge', 'Let\'s Encrypt connects to your server on port 80 and fetches a secret file', 'Yes: your server must be public', 'Public sites (step 3.18)'],
          [<strong key="d">DNS challenge</strong>, 'Certbot temporarily adds a secret TXT record to your DNS, which only the owner can do', <strong key="n">No</strong>, <strong key="p">Our private setup</strong>],
        ]}
      />
      <p>
        Because our server is private (reachable only over Tailscale), Let&apos;s Encrypt could never connect to it. The
        DNS challenge lets Certbot change records through Cloudflare&apos;s API instead. A bonus: it can issue a{' '}
        <strong>wildcard</strong> certificate covering every name, <code>*.example.com</code>, in one go.
      </p>

      <Section title="1. Make a Cloudflare API token" />
      <p>
        Certbot needs permission to edit your DNS records. Give it a <strong>token</strong> limited to that one job, not
        your account password.
      </p>
      <Steps
        steps={[
          { title: 'In Cloudflare, open your profile → API Tokens', children: <p>Choose <em>Create Token</em>.</p> },
          { title: 'Use the "Edit zone DNS" template', children: <p>Click <em>Use template</em> beside it.</p> },
          { title: 'Limit it to your domain', children: <p>Under Zone Resources choose <em>Include → Specific zone →</em> your domain. The permission should read <strong>Zone / DNS / Edit</strong>.</p> },
          { title: 'Create it and copy the token', children: <p>Cloudflare shows it <strong>once</strong>. Keep it open until step 3.</p> },
        ]}
      />
      <Callout type="warning" title="The token is a secret">
        Treat it like a password: never paste it into chat, GitHub or the lesson files. It goes in exactly one file on the
        server, next.
      </Callout>

      <Section title="2. Install Certbot with the Cloudflare plugin" />
      <TerminalBlock
        path="anna@homelab:~"
        command="sudo apt install -y certbot python3-certbot-dns-cloudflare"
      />

      <Section title="3. Store the token" />
      <TerminalBlock
        path="anna@homelab:~"
        lines={[
          { command: 'sudo mkdir -p /root/.secrets' },
          { command: 'sudo nano /root/.secrets/cloudflare.ini' },
        ]}
      />
      <CodeBlock language="bash" title="/root/.secrets/cloudflare.ini" code={CLOUDFLARE_INI} />
      <TerminalBlock path="anna@homelab:~" command="sudo chmod 600 /root/.secrets/cloudflare.ini" />
      <p>
        <code>chmod 600</code> lets only its owner read it. Certbot refuses to use the file if anyone else can read it.
      </p>

      <Section title="4. Ask for the certificate" />
      <TerminalBlock
        path="anna@homelab:~"
        command={'sudo certbot certonly --dns-cloudflare --dns-cloudflare-credentials /root/.secrets/cloudflare.ini -d example.com -d "*.example.com"'}
        output={`Enter email address (used for urgent renewal and security notices):
Please read the Terms of Service ... (Y)es/(N)o: Y
Requesting a certificate for example.com and *.example.com
Waiting 10 seconds for DNS changes to propagate
Successfully received certificate.
Certificate is saved at: /etc/letsencrypt/live/example.com/fullchain.pem
Key is saved at:         /etc/letsencrypt/live/example.com/privkey.pem`}
      />
      <p>
        Replace <code>example.com</code> with your domain. The email is where Let&apos;s Encrypt sends renewal warnings.
        Answer <code>N</code> to the newsletter question if you like.
      </p>
      <Table
        caption="What Certbot saved in /etc/letsencrypt/live/example.com/"
        headers={['File', 'Purpose', 'nginx directive']}
        rows={[
          [<code key="a">fullchain.pem</code>, 'The certificate and the chain of trust', <code key="a2">ssl_certificate</code>],
          [<code key="b">privkey.pem</code>, 'The private key. Keep it secret', <code key="b2">ssl_certificate_key</code>],
        ]}
      />

      <Section title="5. Switch your site to HTTPS" />
      <p>
        Open your site file again, <code>sudo nano /etc/nginx/sites-available/app.example.com</code>, and replace its
        contents with this version, using your domain in place of <code>&lt;your-domain&gt;</code>:
      </p>
      <CodeBlock language="bash" title="/etc/nginx/sites-available/app.example.com" code={NGINX_APP_SITE} />
      <p>
        There are now two blocks: the first sends anyone arriving on port 80 to HTTPS, and the second serves the site
        with the certificate. Test and reload as always:
      </p>
      <TerminalBlock
        path="anna@homelab:~"
        lines={[
          { command: 'sudo nginx -t && sudo systemctl reload nginx', output: 'syntax is ok\ntest is successful' },
        ]}
      />
      <Callout type="success" title="Success looks like this">
        Open <code>https://app.example.com</code>. The padlock appears, and your app works. Typing{' '}
        <code>http://app.example.com</code> jumps to the secure address. One certificate covers <em>every</em> name under
        your domain, so Jellyfin, Immich and Nextcloud will reuse it. They only need their own site file.
      </Callout>

      <Section title="6. Make renewal automatic" />
      <p>
        Let&apos;s Encrypt certificates last <strong>90 days</strong>. Certbot installs a timer that tries to renew them
        twice a day. You must verify that it works <em>now</em>, rather than finding out in three months:
      </p>
      <TerminalBlock
        path="anna@homelab:~"
        lines={[
          { command: 'sudo certbot renew --dry-run', output: 'Congratulations, all simulated renewals succeeded' },
          { command: 'systemctl status certbot.timer', output: '● certbot.timer - Run certbot twice daily\n   Active: active (waiting)' },
          { command: 'sudo certbot certificates', output: 'Certificate Name: example.com\n  Domains: example.com *.example.com\n  Expiry Date: ... (VALID: 89 days)' },
        ]}
      />
      <p>
        When a certificate is renewed, nginx must reload to pick up the new file. A tiny hook script does that (this is
        from your FlashServer notes):
      </p>
      <CodeBlock language="bash" title="Reload nginx after every renewal" code={RELOAD_HOOK} />

      <Collapsible title="Optional: stricter security headers">
        <p>
          You can raise your site&apos;s security rating by saving this as a snippet and including it in each HTTPS block
          with <code>include /etc/nginx/snippets/ssl-params.conf;</code>. Only do this once the basics work, as a wrong
          header can lock you out of your own site in the browser for a long time.
        </p>
        <CodeBlock language="bash" title="ssl-params.conf" code={SSL_PARAMS} />
      </Collapsible>

      <Collapsible title="Troubleshooting">
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>&quot;Unsafe permissions on credentials configuration file&quot;:</strong> run <code>sudo chmod 600 /root/.secrets/cloudflare.ini</code>.</li>
          <li><strong>An authentication or permission error from Cloudflare:</strong> the token is wrong, or it lacks <em>DNS Edit</em> on this zone. Make a new one.</li>
          <li><strong>&quot;Challenge failed&quot; / TXT record not found:</strong> propagation was too slow. Add <code>--dns-cloudflare-propagation-seconds 60</code> to the command.</li>
          <li><strong>&quot;Too many certificates already issued&quot;:</strong> Let&apos;s Encrypt limits duplicate requests (about five per week). While experimenting, add <code>--dry-run</code>, and reuse existing certificates under <code>/etc/letsencrypt/live/</code>.</li>
          <li><strong>The browser still shows a warning:</strong> nginx has not reloaded, or the site file points at the wrong certificate path. Check <code>ssl_certificate</code> and run <code>sudo certbot certificates</code>.</li>
        </ul>
      </Collapsible>

      <QuizSet>
        <Quiz
          question="Why do we use the DNS challenge instead of the HTTP challenge?"
          options={['It is faster', 'Our server is private, so Let\'s Encrypt cannot connect to it', 'HTTP challenges are not free', 'It does not need a domain']}
          correctIndex={1}
          explanation="The DNS challenge proves ownership through DNS records, so no inbound connection is needed."
        />
        <Quiz
          question="How long does a Let's Encrypt certificate last?"
          options={['1 day', '90 days', '10 years', 'Forever']}
          correctIndex={1}
          explanation="90 days, which is why automatic renewal matters."
        />
        <Quiz
          question="Which command proves renewal will work without actually renewing?"
          options={['sudo certbot renew --dry-run', 'sudo nginx -t', 'docker ps', 'ping']}
          correctIndex={0}
          explanation="--dry-run simulates the renewal against Let's Encrypt's test servers."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'HTTPS needs a certificate. Let\'s Encrypt issues them free, and Certbot requests them.',
          'The DNS challenge, through a limited Cloudflare token, works for private servers and allows a wildcard certificate.',
          'The token lives only in /root/.secrets/cloudflare.ini, with chmod 600.',
          'One certificate covers every name. Each site just points at the same files.',
          'Always run certbot renew --dry-run, and reload nginx after renewals.',
        ]}
      />
    </div>
  );
}
