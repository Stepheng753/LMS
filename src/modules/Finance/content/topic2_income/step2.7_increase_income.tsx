import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { Steps } from '../../../../components/content/Steps';
import { Exercise } from '../../../../components/content/Exercise';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function Step2_7_IncreaseIncome() {
  return (
    <div>
      <StepHeader
        eyebrow="Topic 2 • Income"
        title="A Plan to Increase Your Income"
        summary="Raises, job changes, skills and side income. Increase it as hard as you can."
      />

      <p>
        Income is the lever with no ceiling, so it deserves a plan, not hope. There are four ways to raise it. You can
        pull more than one at once.
      </p>

      <Table
        headers={['Way', 'What to do', 'Speed']}
        rows={[
          [<strong key="a">1. Ask for a raise</strong>, 'Document your results, research the market rate, and ask', 'Once or twice a year'],
          [<strong key="b">2. Change jobs</strong>, 'Switching employers often brings a bigger jump than staying. Stay only if the raises keep pace with the market', 'Every few years when needed'],
          [<strong key="c">3. Build skills</strong>, 'Learn what the market pays more for: sales, technical skills, management, communication', 'Months to years. Compounds'],
          [<strong key="d">4. Add variable income</strong>, 'Freelance, a small business, a side service', 'Weeks to start. Uncapped'],
        ]}
      />

      <Section title="How to ask for a raise" />
      <Steps
        steps={[
          { title: 'Keep a win list all year', children: <p>Every project, number and compliment. Memory fades and managers forget. Dates and dollar results are persuasive.</p> },
          { title: 'Know the market number', children: <p>Check pay for your role and city on several salary sites and job posts. Aim for the middle or higher for your experience.</p> },
          { title: 'Book a meeting about it', children: <p>Do not ambush your manager in a hallway. Say you want to talk about your growth and pay.</p> },
          { title: 'Lead with value, then the number', children: <p>&quot;Here is what I have delivered. Based on the market for this role, I would like to move to $X.&quot; Ask for a specific number, a little higher than you will accept.</p> },
          { title: 'If the answer is no, ask what it would take', children: <p>Get a clear list and a date. If there is no path, you have your answer about changing jobs.</p> },
        ]}
      />

      <Callout type="tip" title="The new-job negotiation">
        When a company makes an offer, almost nobody offers their best on the first try. A polite, specific counter is
        normal. Never share your current salary if you can avoid it; say what you are looking for instead. The starting
        number sets your pay for years, because future raises are a percentage of it.
      </Callout>

      <Section title="Skills that raise earning power" />
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>Talking to people and asking for the sale.</strong> Almost every high income involves selling something.</li>
        <li><strong>Writing and communicating clearly.</strong> It multiplies the value of everything else you know.</li>
        <li><strong>Technical skills</strong> with demand: data, software, finance, trades, healthcare.</li>
        <li><strong>Managing money and people</strong>, which is how salaries grow into leadership pay.</li>
        <li><strong>Learning to use AI tools</strong>: the people who do get more done in the same hours.</li>
      </ul>

      <Section title="What $1,000 more a month is worth" />
      <p>
        Add $1,000 a month of income. After about 40% in marginal taxes that is $600 a month, or $7,200 a year. Invest
        all of it at 10% for 30 years and it becomes about <strong>$1.18 million</strong> (Topic 8). The effort of
        finding $1,000 a month is a few hours a week for a year or two. The return is a seven-figure difference.
      </p>

      <Exercise
        title="Write your income plan"
        solution={
          <ul className="list-disc pl-5 space-y-1">
            <li>A target monthly increase, in dollars, with a date.</li>
            <li>The main lever you will pull first, and the one next action this week.</li>
            <li>For a raise: the win list started and the market number found.</li>
            <li>For variable income: one skill, one first customer, a price.</li>
            <li>A rule for the new income: how much to savings and how much is taxed.</li>
          </ul>
        }
      >
        <p>Pick one lever and one number. Write what you will do in the next 7 days, in the next 90 days, and what the extra income will be used for (hint: the order of operations).</p>
      </Exercise>

      <KeyTakeaways
        items={[
          'Four levers: a raise, a new job, new skills, variable income.',
          'Keep a win list and know the market rate. Ask with a specific number.',
          'Selling, communicating and in-demand skills raise earning power the most.',
          '$1,000 more a month, invested for 30 years, can become over a million dollars.',
        ]}
      />
    </div>
  );
}
