import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { Steps } from '../../../../components/content/Steps';
import { Collapsible } from '../../../../components/content/Collapsible';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function Step3_25_ProjectShipIt() {
  return (
    <div>
      <StepHeader
        eyebrow="Step 3.25 • Project C"
        title="Project C: Ship It"
        summary="Take your Topic 2 full app from your laptop to your own domain, with every change deploying automatically."
      />

      <p>
        This project connects everything in the topic. You will not learn anything new here. You will do it all, in
        order, on your own app. When you finish, a single <code>git push</code> will update a real website running on a
        server in your home.
      </p>
      <Callout type="info" title="You are your own judge">
        As before, there is no hidden check. Press <strong>Mark as Complete</strong> when everything in the checklist at
        the bottom is honestly true.
      </Callout>

      <Section title="Where each piece comes from" />
      <Table
        headers={['You need', 'From']}
        rows={[
          ['A working full app (Project B)', 'Step 2.15'],
          ['A GitHub repository without secrets', 'Steps 3.4 and 3.5'],
          ['A server you can SSH into, and Tailscale on it', 'Steps 3.6 to 3.10'],
          ['The app running in containers', 'Step 3.14'],
          ['A name, nginx and a certificate', 'Steps 3.15 to 3.17'],
          ['Secrets and a pipeline', 'Steps 3.23 and 3.24'],
        ]}
      />

      <Section title="Do it" />
      <Steps
        steps={[
          {
            title: 'Check the server is healthy',
            children: <p><code>ssh homelab</code>, run the updates and the health commands from step 3.11. Make sure disk space is fine.</p>,
          },
          {
            title: 'Run the app on the server',
            children: <p>Clone the repository into <code>~/apps/&lt;your-app&gt;</code>, create <code>secrets.json</code> and <code>data/</code> by hand, then <code>docker compose up -d --build</code>. Check <code>docker compose ps</code>.</p>,
          },
          {
            title: 'Give it a name',
            children: <p>Add a Cloudflare record, an nginx site file with the <code>/api/</code> routing, and use the wildcard certificate. Open <code>https://app.&lt;your-domain&gt;</code>. Add some data through the page.</p>,
          },
          {
            title: 'Prove that the data survives',
            children: <p><code>docker compose down</code> then <code>up -d</code>, and refresh. Your data is still there.</p>,
          },
          {
            title: 'Set up the pipeline',
            children: <p>Create the deploy key and the Tailscale OAuth client, add the five secrets, then use <code>/plan</code> to create <code>deploy.yml</code>. Review it with the checklist from step 3.24.</p>,
          },
          {
            title: 'Make a change and push',
            children: <p>Change something small but visible. <code>ga .</code>, <code>gc &quot;…&quot;</code>, <code>git push origin main</code>.</p>,
          },
          {
            title: 'Watch it deploy',
            children: <p>Follow the Actions tab to two green ticks. Reload the site and check the change is live.</p>,
          },
          {
            title: 'Break it on purpose',
            children: <p>Add a deliberately failing unit test, and push. Confirm the test job goes red and <strong>nothing deploys</strong>. Then fix it and push again.</p>,
          },
          {
            title: 'Roll back once',
            children: <p>Push a visible change, then undo it with <code>git revert HEAD --no-edit</code> and push. Watch the old version return.</p>,
          },
          {
            title: 'Back it up',
            children: <p>Make sure your app&apos;s <code>data/</code> and <code>backend/config/</code> are in the nightly backup, and run a restore test.</p>,
          },
        ]}
      />

      <Collapsible title="If something goes wrong">
        <ul className="list-disc pl-5 space-y-1">
          <li>Work from the inside out: the container (<code>docker compose logs</code>), then nginx (<code>sudo nginx -t</code>, the error log), then DNS (<code>dig</code>), then the pipeline (the Actions log).</li>
          <li>Use the troubleshooting tables in steps 3.14, 3.16, 3.17 and 3.24.</li>
          <li>Give your AI helper the exact error, the step you were on, and what you expected.</li>
        </ul>
      </Collapsible>

      <Section title="Checklist: you are done when" />
      <ul className="list-disc pl-5 space-y-1">
        <li>My app runs on my own server in containers, and I started it with <code>docker compose up -d --build</code>.</li>
        <li>I open it at <code>https://app.&lt;my-domain&gt;</code> and see a padlock, from a device away from home (using Tailscale).</li>
        <li><code>secrets.json</code> and the database are <strong>not</strong> in GitHub, and I can say why.</li>
        <li>The container ports are on <code>127.0.0.1</code>, and I can show it in <code>docker compose ps</code>.</li>
        <li>I pushed a change and it deployed by itself, and I can show the green run in the Actions tab.</li>
        <li>I saw a failing test stop the deployment.</li>
        <li>I rolled back a change with <code>git revert</code>.</li>
        <li>My certificate renews: <code>sudo certbot renew --dry-run</code> passes.</li>
        <li>My app&apos;s data is in a backup that I have restored once.</li>
        <li>All my skills are saved: git-workflow, docker-deploy, nginx-proxy, selfhosted-apps and ci-cd-deploy.</li>
      </ul>
      <p>
        When every line is honestly true, press <strong>Mark as Complete</strong>.
      </p>

      <KeyTakeaways
        items={[
          'You took an app from laptop to GitHub to a container on your own server, behind your own domain with HTTPS.',
          'A push to main now tests and deploys automatically over a private network.',
          'You can break it, roll it back, back it up, and explain where each secret lives.',
        ]}
      />
    </div>
  );
}
