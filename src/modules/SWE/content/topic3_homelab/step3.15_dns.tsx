import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { TerminalBlock } from '../../../../components/content/TerminalBlock';
import { Steps } from '../../../../components/content/Steps';
import { Collapsible } from '../../../../components/content/Collapsible';
import { Compare } from '../../../../components/content/Compare';
import { Exercise } from '../../../../components/content/Exercise';
import { Term } from '../../../../components/content/Term';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function Step3_15_Dns() {
  return (
    <div>
      <StepHeader
        eyebrow="Step 3.15 • Names & Traffic"
        title="DNS: How Names Find Servers"
        summary="Buy a domain at Hostinger, hand its DNS to Cloudflare, and point friendly names at your server."
      />

      <p>
        You have a server with an address like <code>100.101.102.103</code>. Nobody wants to remember that. A{' '}
        <strong>domain name</strong> such as <code>example.com</code> gives it a human name, and{' '}
        <strong>DNS</strong> (the Domain Name System) is the worldwide phonebook that turns names into addresses. You met it
        in step 3.2. Now you will run your own corner of it.
      </p>

      <Section title="Two different jobs" />
      <Table
        headers={['Job', 'Who does it for you', 'What it means']}
        rows={[
          [<strong key="a">Registrar</strong>, 'Hostinger', 'Sells you the name and records that you own it (you rent it, yearly)'],
          [<strong key="b">DNS host</strong>, 'Cloudflare', 'Holds the phonebook entries for your domain and answers the world\'s questions about it'],
        ]}
      />
      <p>
        They can be the same company, but they do not have to be. We buy at Hostinger and then tell the world &quot;for
        questions about my domain, ask Cloudflare&quot;. That is done with <strong>nameservers</strong>.
      </p>

      <Section title="1. Buy the domain at Hostinger" />
      <Steps
        steps={[
          { title: 'Search for a name', children: <p>On <code>hostinger.com</code>, use the domain search. Short and easy to say works best. A <code>.com</code> is the safest choice.</p> },
          { title: 'Buy it', children: <p>Choose a one-year term. Turn off any extras you do not need. If privacy protection for your contact details is offered, take it.</p> },
          { title: 'Find the domain in your account', children: <p>In Hostinger&apos;s control panel go to <em>Domains</em> and open yours. You will need its DNS / Nameservers page in a moment.</p> },
        ]}
      />
      <p>
        (Prices and screens change, so if you cannot find something, ask your AI helper with a screenshot.)
      </p>

      <Section title="2. Put Cloudflare in charge of the phonebook" />
      <Steps
        steps={[
          { title: 'Create a free Cloudflare account', children: <p>At <code>cloudflare.com</code>.</p> },
          { title: 'Add your domain', children: <p>Choose <em>Add a domain</em>, type yours, and select the <strong>Free</strong> plan. Cloudflare scans for existing records. Accept what it finds for now.</p> },
          { title: 'Copy the two nameservers Cloudflare shows', children: <p>They look like <code>ada.ns.cloudflare.com</code> and <code>bob.ns.cloudflare.com</code>.</p> },
          { title: 'Set them at Hostinger', children: <p>In Hostinger, open the domain&apos;s <em>DNS / Nameservers</em> page, switch from the default nameservers to <strong>custom</strong>, and paste Cloudflare&apos;s two. Save.</p> },
          { title: 'Wait for Cloudflare to say Active', children: <p>It can take from a few minutes to a few hours. Cloudflare emails you, and the dashboard shows the domain as active.</p> },
        ]}
      />
      <TerminalBlock
        path="~"
        command="dig NS example.com +short"
        output={'ada.ns.cloudflare.com.\nbob.ns.cloudflare.com.'}
      />
      <p>Once <code>dig</code> returns Cloudflare&apos;s nameservers, the handover is complete.</p>

      <Section title="3. Records: the phonebook entries" />
      <Table
        headers={['Type', 'Maps', 'Example', 'Used for']}
        rows={[
          [<code key="a">A</code>, 'a name to an IPv4 address', 'app → 100.101.102.103', 'Pointing a name at a server'],
          [<code key="b">AAAA</code>, 'a name to an IPv6 address', 'app → 2001:db8::1', 'The same, for IPv6'],
          [<code key="c">CNAME</code>, 'a name to <em>another name</em>', 'pics → myhome.tplinkdns.com', 'An alias, handy when the target address changes'],
          [<code key="d">TXT</code>, 'a name to some text', 'verification codes', 'Proving you own a domain'],
          [<code key="e">MX</code>, 'where email goes', 'mail servers', 'Email (we are not doing this)'],
        ]}
      />
      <p>
        Each record also has a <Term definition="Time To Live: how long, in seconds, other computers may remember an answer before asking again.">TTL</Term>:
        how long the world may remember the answer. A short TTL (such as 5 minutes) means changes spread quickly, which is
        helpful while you are setting things up.
      </p>

      <Section title="4. Point your names at the server" />
      <p>
        In Cloudflare open <em>DNS → Records</em> and add an <strong>A record</strong> for each service. Use your
        server&apos;s <strong>Tailscale address</strong> from step 3.10 as the value:
      </p>
      <Table
        headers={['Type', 'Name', 'Content', 'Proxy status']}
        rows={[
          ['A', 'app', '100.101.102.103', 'DNS only (grey cloud)'],
          ['A', 'jellyfin', '100.101.102.103', 'DNS only (grey cloud)'],
          ['A', 'photos', '100.101.102.103', 'DNS only (grey cloud)'],
          ['A', 'files', '100.101.102.103', 'DNS only (grey cloud)'],
        ]}
      />
      <Callout type="info" title="Public name, private address">
        The names are in the public phonebook, but the address they lead to, <code>100.x.x.x</code>, is a Tailscale
        address that only your signed-in devices can reach. Strangers can read the entry and still cannot connect. This
        keeps everything private while giving it real names, with no open doors in your router.
      </Callout>
      <Callout type="warning" title="Switch the orange cloud OFF">
        Cloudflare can optionally route traffic through its own network (an orange cloud). For these records choose{' '}
        <strong>DNS only</strong> (grey cloud). The orange mode cannot reach a private Tailscale address at all, and for
        photos and video it also imposes upload size limits and is not intended for streaming media.
      </Callout>
      <TerminalBlock
        path="~"
        lines={[
          { command: 'dig +short app.example.com', output: '100.101.102.103' },
        ]}
      />
      <p>If it prints your server&apos;s Tailscale address, the name works. Wait a few minutes and try again if it is empty.</p>

      <Section title="DNS vs DDNS: what is the difference?" />
      <p>
        You may have seen both words around your router. They solve different problems.
      </p>
      <Compare
        goodLabel="DNS"
        badLabel="DDNS (Dynamic DNS)"
        good={
          <>
            <p><strong>The phonebook.</strong> Turns a name into an address.</p>
            <p>Cloudflare holds yours: <code>app.example.com → 100.101.102.103</code>.</p>
          </>
        }
        bad={
          <>
            <p><strong>A phonebook entry that keeps itself up to date.</strong></p>
            <p>Your home&apos;s public IP changes from time to time. A DDNS name such as <code>myhome.tplinkdns.com</code> is kept pointing at your current one, usually by the router itself.</p>
          </>
        }
      />
      <Table
        headers={['', 'DNS', 'DDNS']}
        rows={[
          ['What it does', 'Name → address', 'Keeps one name pointing at an address that keeps changing'],
          ['Where yours lives', 'Cloudflare', 'Your TP-Link router (for example flash-server.tplinkdns.com)'],
          ['Do you need it for the private setup?', 'Yes', <strong key="n">No. Tailscale addresses never change</strong>],
          ['Do you need it to go public?', 'Yes', 'Yes, or the public address will drift (step 3.18)'],
        ]}
      />
      <p>
        In a <em>public</em> setup the two chain together: a record in Cloudflare (DNS) points to the router&apos;s
        DDNS name, which resolves to your current home address. In our <em>private</em> setup the record points straight
        at the Tailscale address, so DDNS is simply not needed.
      </p>

      <Collapsible title="If the name will not resolve at home">
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Empty answer:</strong> the record is not saved yet, or has not spread. Check the spelling in Cloudflare and wait.</li>
          <li><strong>Works on mobile data but not at home:</strong> some routers block public names that resolve to private-looking addresses (&quot;DNS rebinding protection&quot;). Look for that setting in the router, or ask your AI helper.</li>
          <li><strong>It resolves to the wrong address:</strong> an old record or the orange cloud is interfering. Check each record in Cloudflare.</li>
        </ul>
      </Collapsible>

      <Exercise
        title="Plan your names"
        hint={<p>One record per service, using the server&apos;s Tailscale address. Names should be short and lowercase.</p>}
        solution={
          <ul className="list-disc pl-5 space-y-1">
            <li><code>app</code> A → the Tailscale IP (your Topic 2 app)</li>
            <li><code>jellyfin</code> A → the same IP</li>
            <li><code>photos</code> A → the same IP (Immich)</li>
            <li><code>files</code> A → the same IP (Nextcloud)</li>
            <li>All set to DNS only. One server address serves every name, and nginx will tell them apart.</li>
          </ul>
        }
      >
        <p>List the DNS records you will create for your app, Jellyfin, Immich and Nextcloud, and say which proxy setting each gets.</p>
      </Exercise>

      <QuizSet>
        <Quiz
          question="Which company is the registrar and which is the DNS host in our setup?"
          options={['Both are Cloudflare', 'Hostinger is the registrar, Cloudflare is the DNS host', 'Cloudflare is the registrar, Hostinger is the DNS host', 'Both are Hostinger']}
          correctIndex={1}
          explanation="Hostinger sells the name. Its nameservers are switched to Cloudflare, which answers DNS questions."
        />
        <Quiz
          question="Why do we use DNS only (grey cloud) for these records?"
          options={['It looks nicer', 'The proxy cannot reach private Tailscale addresses and limits uploads and streaming', 'It is cheaper', 'It is required by Hostinger']}
          correctIndex={1}
          explanation="The orange proxy mode sits in front of public servers only."
        />
        <Quiz
          question="What problem does DDNS solve?"
          options={['Slow websites', "Your home's public IP changing over time", 'Missing certificates', 'Weak passwords']}
          correctIndex={1}
          explanation="DDNS keeps a name pointing at an address that changes. It is not needed with Tailscale addresses."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'DNS is the phonebook. The registrar (Hostinger) sells the name, and the DNS host (Cloudflare) answers for it.',
          'Switch the domain\'s nameservers at Hostinger to Cloudflare\'s two.',
          'A records point names at your server\'s Tailscale address, set to DNS only (grey cloud).',
          'DDNS keeps a name tracking a changing public IP. You only need it to go public.',
        ]}
      />
    </div>
  );
}
