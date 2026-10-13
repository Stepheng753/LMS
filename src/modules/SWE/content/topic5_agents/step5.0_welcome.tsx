import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { BigWarning } from '../../../../components/content/BigWarning';
import { Table } from '../../../../components/content/Table';
import { Flow } from '../../../../components/content/Flow';
import { Quiz } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function Step5_0_Welcome() {
  return (
    <div>
      <StepHeader
        eyebrow="Step 5.0 • Autonomous Agents"
        title="From Asking AI to Letting AI Do"
        summary="The last topic of the AI journey: AI that acts. It connects to your tools, works in the background, and runs on its own."
      />

      <p>
        Everything so far had you in the driving seat. You asked, the AI answered. Even when it controlled your terminal
        through Agy, it did so one request at a time. This topic goes one step further, to AI that is given a <strong>goal</strong>{' '}
        and then <strong>works out the steps and does them itself</strong>. These are called <strong>agents</strong>.
      </p>

      <Section title="The ladder you have been climbing" />
      <Flow
        steps={[
          { title: 'Chat', sub: 'You ask. It answers' },
          { title: 'API', sub: 'Your code calls a model (Topic 4)', via: 'topic 4' },
          { title: 'Tools', sub: 'It runs commands for you (Agy, Antigravity)', via: 'topic 1 to 3' },
          { title: 'Connected', sub: 'It uses your apps through MCP', via: 'this topic' },
          { title: 'Background agents', sub: 'Cloud agents that keep working', via: 'this topic' },
          { title: 'Self-hosted agents', sub: 'Your own, running 24/7', via: 'this topic' },
        ]}
      />
      <p>
        Each rung gives the AI <strong>more reach and more independence</strong>, and gives you less chance to catch a
        mistake before it happens. That trade is the central idea of this topic.
      </p>

      <BigWarning title="Agents act. Treat autonomy as risk, and cost as unlimited until you cap it">
        <p>
          A chatbot can only say the wrong thing. An agent can <strong>do the wrong thing</strong>: delete files, send
          messages, spend money, post in public. It can also be <strong>tricked</strong> by text it reads. And because it
          works in a loop, it can repeat a mistake hundreds of times.
        </p>
        <ul>
          <li><strong>Cost has no natural limit.</strong> An agent calls the model many times per task, and each call carries a growing history. One stuck agent can spend more in an afternoon than a month of normal use. Some agents default to hundreds of steps per task.</li>
          <li><strong>Every action needs a limit.</strong> A cap on steps, a cap on money at the model provider, and a way to stop it instantly.</li>
          <li><strong>Real products have misfired.</strong> One report about a major vendor&apos;s new agent said it deleted users&apos; files without permission in its launch week. Treat any claim of &quot;safe&quot; with suspicion.</li>
          <li><strong>You are responsible for what your agent does and spends.</strong> This course teaches safe defaults. It cannot see your accounts or your bill.</li>
        </ul>
        <p>
          The rule for the whole topic: <strong>start read-only, with test accounts, with approvals on and spending
          capped.</strong> Loosen things only after you have watched them work.
        </p>
      </BigWarning>

      <Section title="The road ahead" />
      <Table
        headers={['Phase', 'Steps', 'You will learn']}
        rows={[
          ['What agents are', '5.1', 'The loop, levels of autonomy, and why agents fail'],
          ['Connecting tools', '5.2 to 5.4', 'MCP: how AI uses apps, practice with real MCP servers, and a tiny agent of your own'],
          ['Cloud agents', '5.5 to 5.6', 'Claude Cowork, Gemini Spark and ChatGPT Work, and how to delegate to them well'],
          ['Open models', '5.7 to 5.9', 'Open-source models: what they are, cloud vs local (price, control, resources), and running one'],
          ['Autonomous agents', '5.10 to 5.12', 'Hermes Agent and OpenClaw, running agents safely, and deploying one on your homelab'],
          ['Project and cheat sheet', '5.13 to 5.14', 'Your own assistant, and a one-page reference. The Summary section (S) then reviews the whole course'],
        ]}
      />

      <Callout type="info" title="Products here change fast">
        Agent products launch, merge and change names every few months. We teach the <strong>ideas</strong>, which last,
        and describe products as they were in October 2026. Always check a vendor&apos;s own page for the current state.
        The habit of reading the documentation, from Topic 4, is the most valuable skill in this topic.
      </Callout>

      <Quiz
        question="What is the main difference between a chatbot and an agent?"
        options={[
          'An agent is always smarter',
          'An agent is given a goal and takes actions in steps by itself',
          'A chatbot cannot use the internet',
          'An agent never makes mistakes',
        ]}
        correctIndex={1}
        explanation="A chatbot answers. An agent works toward a goal, using tools and taking actions."
      />

      <KeyTakeaways
        items={[
          'An agent is AI given a goal, working out and doing the steps itself.',
          'Each rung of the ladder gives the AI more reach and gives you less chance to catch mistakes.',
          'Agents can delete, send, spend and post, and they can be tricked by text they read.',
          'Start read-only, with test accounts, approvals on, and spending capped.',
        ]}
      />
    </div>
  );
}
