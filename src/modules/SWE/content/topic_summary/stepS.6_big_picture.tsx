import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { Flow } from '../../../../components/content/Flow';
import { Steps } from '../../../../components/content/Steps';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function StepS_6_BigPicture() {
  return (
    <div>
      <StepHeader
        eyebrow="Summary • The Big Picture"
        title="How Everything Connects"
        summary="One system, five layers. See where each topic fits, and follow a single feature from idea to live."
      />

      <Section title="The five layers" />
      <Table
        headers={['Layer', 'What it gives you', 'Topic']}
        rows={[
          [<strong key="1">Workbench</strong>, 'WSL, the terminal, an IDE, an AI helper, aliases. Where you do everything', '1'],
          [<strong key="2">The app</strong>, 'Frontend, backend, database. Built from a spec and a reviewed plan. Run with system.sh', '2'],
          [<strong key="3">The home</strong>, 'A server, Docker, nginx, HTTPS and your own domain, deployed by a pipeline, reached over Tailscale', '3'],
          [<strong key="4">The outside world</strong>, 'Google, AI models and social platforms through APIs, with keys and caps', '4'],
          [<strong key="5">The doers</strong>, 'MCP tools and agents that act for you, under strict limits', '5'],
        ]}
      />

      <Section title="The whole system in one picture" />
      <Flow
        steps={[
          { title: 'You + your AI helper', sub: 'WSL terminal, IDE, rules and skills' },
          { title: 'Repo on GitHub', sub: 'Spec, plan, code, tests', via: 'git push' },
          { title: 'Pipeline', sub: 'Tests, then deploy', via: 'GitHub Actions' },
          { title: 'Homelab', sub: 'Docker, nginx, HTTPS', via: 'Tailscale + SSH' },
          { title: 'APIs and agents', sub: 'Google, AI, social, MCP', via: 'keys in secrets.json' },
        ]}
      />

      <Section title="The life of one feature" />
      <p>
        Say you want a button that suggests a caption for tomorrow&apos;s post. Here is every topic doing its job.
      </p>
      <Steps
        steps={[
          { title: 'Describe it (Topic 2)', children: <p>Sketch the button as a rectangle. Write a spec: goal, action, screen, data, rules, done-when.</p> },
          { title: 'Plan and review (Topic 2)', children: <p>Run <code>/plan</code>. Read all of it against your rules. Comment. Approve only when it matches your layout, stack and naming.</p> },
          { title: 'Build and run (Topics 1, 2)', children: <p>The AI builds it. You start it with <code>system.sh</code>, test it in the browser, then in Swagger, then with the tests.</p> },
          { title: 'Call the AI (Topic 4)', children: <p>The backend calls the model through your switcher, using a key from secrets.json, with a daily cap in the database.</p> },
          { title: 'Commit and push (Topic 3)', children: <p>Check no secret is staged. <code>ga .</code>, <code>gc "feat: caption suggestions"</code>, <code>git push</code>.</p> },
          { title: 'Deploy (Topic 3)', children: <p>The pipeline tests, joins Tailscale, SSHes in, pulls and rebuilds the containers. nginx and HTTPS already front the app.</p> },
          { title: 'Let an agent help (Topic 5)', children: <p>Optionally, an agent with narrow permissions drafts tomorrow&apos;s captions overnight. You approve in the morning.</p> },
        ]}
      />

      <Section title="Where the rules guard you" />
      <Table
        headers={['Stage', 'The guard', 'It protects against']}
        rows={[
          ['Spec', 'Done-when', 'Building the wrong thing'],
          ['Plan', 'Your review checklist', 'The AI inventing its own architecture'],
          ['Code', 'Fixed layout, one component per file, JSON config', 'A messy, unfindable project'],
          ['Commit', '.gitignore and a staged-file check', 'Leaked keys and databases'],
          ['Server', 'Key-only SSH, ufw, Tailscale, 127.0.0.1 ports', 'Strangers on the internet'],
          ['Deploy', 'Tests first, a deploy key, rollback with revert', 'A broken release'],
          ['AI calls', 'Backend only, caps, cheapest model', 'Leaked keys and surprise bills'],
          ['Agents', 'Least privilege, approvals, allowlists, kill switch', 'An agent doing damage'],
        ]}
      />

      <Callout type="success" title="The pattern behind it all">
        Every layer repeats the same three habits: <strong>describe clearly</strong> before you build,{' '}
        <strong>review</strong> before you accept, and <strong>limit</strong> what can go wrong. If you keep only these three, you
        can learn any new tool.
      </Callout>

      <QuizSet title="Big Picture Check">
        <Quiz
          question="At which point does your private key for an AI provider get used?"
          options={['In the browser', 'In the backend, read from secrets.json', 'In the README', 'In the pipeline logs']}
          correctIndex={1}
          explanation="Only the backend holds and uses it."
        />
        <Quiz
          question="What reaches the server when you push to main?"
          options={['Nothing', 'The pipeline tests, then deploys over Tailscale and SSH', 'Your .env', 'Your database']}
          correctIndex={1}
          explanation="Databases and secrets stay on the server and are never part of git."
        />
        <Quiz
          question="Which three habits repeat in every topic?"
          options={['Type fast, copy, paste', 'Describe clearly, review, limit risk', 'Buy, install, forget', 'Guess, run, hope']}
          correctIndex={1}
          explanation="Clarity, review and limits."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'Five layers: workbench, app, home, outside world, doers.',
          'A feature passes through spec, plan, review, build, test, commit, deploy, and sometimes an agent.',
          'Each stage has a guard against a specific failure.',
          'The universal habits: describe clearly, review, limit.',
        ]}
      />
    </div>
  );
}
