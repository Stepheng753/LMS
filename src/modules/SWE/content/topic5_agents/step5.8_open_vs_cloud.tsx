import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { BigWarning } from '../../../../components/content/BigWarning';
import { Table } from '../../../../components/content/Table';
import { Compare } from '../../../../components/content/Compare';
import { Exercise } from '../../../../components/content/Exercise';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function Step5_8_OpenVsCloud() {
  return (
    <div>
      <StepHeader
        eyebrow="Step 5.8 • Autonomous Agents"
        title="Open Models vs Cloud Models: Price, Control, Resources"
        summary="Neither is simply better. Learn what each really costs, what each gives you control over, and how to choose, or combine them."
      />

      <p>
        When you give an agent a brain, you choose between a <strong>cloud model</strong> (a company runs it, you pay per
        token) and an <strong>open model</strong> (you run it on your own hardware). Each solves problems the other creates.
        This step lays the trade-offs side by side.
      </p>

      <Section title="The trade-offs" />
      <Table
        headers={['', 'Cloud model', 'Open model, run locally']}
        rows={[
          [<strong key="p">Price</strong>, 'Pay per token. Nothing upfront. Cost grows with use, and can run away if you do not cap it', 'Hardware cost upfront, plus electricity. After that, each extra token is effectively free'],
          [<strong key="c">Control</strong>, 'The vendor sets the model, the limits and the terms. Models get updated or retired. Rate limits apply', 'You pin the exact version, there are no rate limits, it works offline, and nobody can change or remove it'],
          [<strong key="v">Privacy</strong>, 'Your prompts go to the vendor, under their terms and retention rules', 'Everything stays on your machine'],
          [<strong key="r">Resources</strong>, 'None on your side. No GPU, no disk, no setup', 'A capable computer (memory is the key limit), tens of gigabytes of disk, heat, noise, power, and your time to set it up and maintain it'],
          [<strong key="q">Quality</strong>, 'The strongest models available are cloud models, especially for hard reasoning and long agent tasks', 'Good and improving, but smaller local models make more mistakes, especially over many steps'],
          [<strong key="s">Speed</strong>, 'Usually fast, with network delay', 'Depends entirely on your hardware. Can be slow on modest machines'],
          [<strong key="a">Reliability</strong>, 'Vendor-run. Outages and rate limits happen, but are not yours to fix', 'Your uptime. If your machine is off or breaks, so is your AI'],
          [<strong key="sc">Scaling</strong>, 'Instant. Ask for a hundred calls at once', 'Limited to what one machine can do'],
          [<strong key="u">Updates</strong>, 'Automatic, which means behaviour can shift under you', 'Manual, which means stability but you must update yourself'],
        ]}
      />

      <Section title="The price question, with real arithmetic" />
      <BigWarning title="These numbers are illustrations, not quotes">
        <p>
          Prices and hardware costs vary and change. The arithmetic below uses the Claude prices from step 4.7 and made-up
          hardware and electricity figures, to show <strong>how</strong> to think about it. Do your own sums with current
          prices, and remember that cost is only one factor. A cheaper model that does the job badly is not cheaper.
        </p>
      </BigWarning>
      <p>
        Suppose a busy agent uses <strong>20 million input tokens and 2 million output tokens a day</strong>. That is a lot,
        but agents re-send their history on every step, so it adds up fast. The daily cost on cloud models:
      </p>
      <Table
        headers={['Model', 'Input (20M tokens)', 'Output (2M tokens)', 'Per day']}
        rows={[
          ['Claude Haiku 5.5', '$2.00', '$1.00', '$3.00'],
          ['Claude Sonnet 5.5', '$40.00', '$20.00', '$60.00'],
          ['Claude Opus 5.5', '$80.00', '$40.00', '$120.00'],
          ['Claude Fable 5.1', '$200.00', '$100.00', '$300.00'],
          ['A local open model', '$0', '$0', 'About $0.50 of electricity (assuming 300 W for 8 hours at $0.20 per kWh)'],
        ]}
      />
      <p>
        If a <strong>$1,500</strong> computer could do the job, it would pay for itself in roughly{' '}
        <strong>5 days against Fable, 13 days against Opus, 25 days against Sonnet</strong>, but only{' '}
        <strong>about 500 days against Haiku</strong>. The honest conclusion has two halves:
      </p>
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>At heavy usage, local hardware wins on price</strong> against the expensive cloud models.</li>
        <li><strong>At light usage, or against a cheap cloud model, the cloud wins</strong> and you never recover the hardware cost. For one post a day, the cloud costs pennies a month.</li>
      </ul>
      <Callout type="warning" title="The sum leaves out quality">
        The comparison assumes the local model does the job as well as the cloud one. For simple tasks it might. For hard,
        multi-step agent work, a smaller local model may fail, loop or make errors, and those failures cost your time and
        sometimes real consequences. Price per token is not price per <em>success</em>.
      </Callout>

      <Section title="Choosing" />
      <Table
        headers={['Your situation', 'Lean toward']}
        rows={[
          ['A few tasks a day, low volume', 'Cloud. It costs pennies and gives the best quality'],
          ['Sensitive documents that must not leave your computer', 'Local, for that data at least'],
          ['Huge volumes of simple work (summaries, tagging, drafts)', 'Local, or a cheap small cloud model'],
          ['An agent that must make reliable decisions over many steps', 'A strong cloud model, with spending capped'],
          ['No internet, or must keep working offline', 'Local'],
          ['You want to learn how it all works', 'Try both. You are doing this now'],
        ]}
      />

      <Section title="The best answer is often both" />
      <Compare
        goodLabel="A hybrid setup"
        badLabel="All one or the other"
        good={
          <ul className="list-disc pl-5 space-y-1">
            <li>Cloud model as the agent&apos;s brain for hard decisions</li>
            <li>Local model for private documents and bulk, simple jobs</li>
            <li>A model switcher (step 4.8) so you choose per job, and can fall back</li>
          </ul>
        }
        bad={
          <ul className="list-disc pl-5 space-y-1">
            <li>Everything in the cloud: simple, but private data leaves and bills scale with use</li>
            <li>Everything local: private and cheap to run, but limited by your hardware and the model&apos;s skill</li>
          </ul>
        }
      />
      <p>
        You have already built the part that makes this possible: your Daily Poster&apos;s <strong>model switcher</strong>.
        Adding a local model to it is one more adapter. You will do exactly that in the next step.
      </p>

      <Exercise
        title="Pick a brain"
        hint={<p>Think about volume, sensitivity, and how costly a mistake would be.</p>}
        solution={
          <ol className="list-decimal pl-5 space-y-1">
            <li><strong>Daily social post, a few a week:</strong> a cheap cloud model. The cost is negligible and quality is good.</li>
            <li><strong>Summarise 5,000 private customer emails:</strong> local, if it can do the quality. Privacy matters and the volume is high.</li>
            <li><strong>An agent that books travel and holds reservations:</strong> a strong cloud model with caps and approvals. Errors are costly.</li>
            <li><strong>A coding helper on a plane with no wifi:</strong> local.</li>
          </ol>
        }
      >
        <p>Choose cloud, local or a mix: (1) A daily social post. (2) Summarising 5,000 private customer emails. (3) An agent that books travel and holds reservations. (4) A coding helper on a plane with no wifi.</p>
      </Exercise>

      <QuizSet>
        <Quiz
          question="When does local hardware beat the cloud on price?"
          options={['Never', 'At heavy, sustained usage against expensive cloud models', 'At very low usage', 'Only against free models']}
          correctIndex={1}
          explanation="High volume spreads the upfront hardware cost. At light usage, the cloud costs pennies."
        />
        <Quiz
          question="Which is a real advantage of local models?"
          options={['They are always smarter', 'Data stays on your machine and there are no rate limits', 'They need no hardware', 'They never make mistakes']}
          correctIndex={1}
          explanation="Privacy, control and offline use are the main benefits. Quality usually favours the best cloud models."
        />
        <Quiz
          question="Why do many people use a hybrid setup?"
          options={['Because it is required', 'To use a strong cloud model for hard decisions and a local one for private or bulk work', 'Because local models are always cheaper', 'Because cloud models are slow']}
          correctIndex={1}
          explanation="Each handles the jobs it is best at. A switcher lets you choose per job."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'Cloud: pay per token, no hardware, best quality, vendor control. Local: hardware upfront, then near-free, private, your control, but limited by your machine.',
          'Cost depends on volume: heavy use favours local, light use favours the cloud. Do your own sums.',
          'Price per token is not price per success. Quality matters for agents.',
          'Often the best answer is both: cloud for hard decisions, local for private or bulk work, with a model switcher.',
        ]}
      />
    </div>
  );
}
