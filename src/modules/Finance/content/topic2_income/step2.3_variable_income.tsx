import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { Compare } from '../../../../components/content/Compare';
import { Exercise } from '../../../../components/content/Exercise';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function Step2_3_VariableIncome() {
  return (
    <div>
      <StepHeader
        eyebrow="Topic 2 • Income"
        title="You Must Have a Variable Income"
        summary="A 9-to-5 is a floor, not a plan. Why every person needs income that is not capped, and where to find it."
      />

      <Callout type="warning" title="The rule">
        Alongside your 9-to-5 you <strong>must</strong> have a variable income. Not &quot;it would be nice&quot;. Must. Here is why.
      </Callout>

      <Section title="Reason 1: a salary has a ceiling" />
      <p>
        A typical raise is a few percent a year. On a $80,000 salary, 3% is $2,400 a year before tax, about $1,500 after tax.
        You cannot negotiate your way to double every year. Variable income has no such limit: a client, a product or a
        skill can double in a year.
      </p>

      <Section title="Reason 2: one paycheck is one point of failure" />
      <p>
        If one employer is your only source of income and you lose that job, your income drops to zero overnight. A
        second source means you still have something coming in, and a skill you can sell.
      </p>

      <Section title="Reason 3: it fills the savings column" />
      <p>
        Because fixed income pays fixed bills, every dollar of variable income beyond variable spending goes straight to
        savings. Look at what the same $5,200 salary does with different side incomes (the example from step 2.2: fixed
        expenses $2,590, variable spending $1,250):
      </p>
      <Table
        headers={['Variable income per month', 'Saved per month', 'Saved per year']}
        align={['left', 'right', 'right']}
        rows={[
          ['$0 (salary only)', '$1,360', '$16,320'],
          ['$900', '$2,260', '$27,120'],
          ['$1,500', '$2,860', '$34,320'],
          ['$3,000', '$4,360', '$52,320'],
        ]}
      />
      <p>
        A side income of $900 a month raises savings from $16,320 to $27,120 a year: <strong>66% more saved</strong>, from
        work that did not need a promotion.
      </p>

      <Section title="What counts as variable income?" />
      <Table
        headers={['Source', 'What it looks like', 'Notes']}
        rows={[
          [<strong key="a">Freelancing</strong>, 'Selling a skill by the project: writing, design, video, bookkeeping, programming, tutoring', 'Taxed as 1099 income (Topic 4)'],
          [<strong key="b">A small business</strong>, 'Selling products or services you control', 'Needs a plan for taxes, and a business structure later (Topic 11)'],
          [<strong key="c">Commissions and bonuses</strong>, 'Pay tied to your results at work', 'Some jobs have it built in. Ask for it'],
          [<strong key="d">Overtime and extra shifts</strong>, 'Paid hours beyond the base', 'Easy to start, limited by hours'],
          [<strong key="e">Selling things</strong>, 'Reselling, crafts, used items', 'Limited, but fast to start'],
          [<strong key="f">Rental income</strong>, 'Renting a room, a unit, or a property', 'A big step. See Topic 10'],
          [<strong key="g">Investment income</strong>, 'Dividends and growth', 'Grows with your savings. Not variable income you can start today'],
        ]}
      />

      <Section title="How to start with no ideas" />
      <ol className="list-decimal pl-5 space-y-1">
        <li><strong>List what you are already good at</strong> and what friends ask you for help with.</li>
        <li><strong>Find one person who would pay for it.</strong> Offer a small job at a fair price.</li>
        <li><strong>Do it well, ask for a referral</strong>, and repeat.</li>
        <li><strong>Keep every receipt and every payment record.</strong> You will need it for taxes.</li>
        <li><strong>Put 25% to 30% of every payment aside for taxes</strong> in a separate account (Topic 4).</li>
        <li><strong>Raise your price</strong> every time demand is higher than your time.</li>
      </ol>

      <Compare
        goodLabel="Healthy variable income"
        badLabel="Warning signs"
        good={
          <>
            <p>Uses a skill that you can improve and charge more for.</p>
            <p>Brings in money that is separate from your employer.</p>
            <p>You track it and save part for taxes.</p>
          </>
        }
        bad={
          <>
            <p>Costs more in supplies and ads than it earns.</p>
            <p>Needs you to buy a &quot;starter kit&quot; or recruit friends.</p>
            <p>Promises easy money. That is a scam or a pyramid scheme.</p>
          </>
        }
      />

      <Callout type="info" title="Check your employment agreement">
        Some employers forbid outside work in the same field, or claim anything you make with their time or tools. Read
        your contract before you start, and keep your side work completely separate from your job.
      </Callout>

      <Exercise
        title="Find three possible variable incomes"
        solution={
          <ul className="list-disc pl-5 space-y-1">
            <li>Three skills or assets, each with a first customer in mind.</li>
            <li>A guess at the monthly value of each, even if rough.</li>
            <li>The smallest first step for the best one, with a date.</li>
            <li>A rule: 25% to 30% of everything earned goes to a tax account.</li>
          </ul>
        }
      >
        <p>List three skills or things you have that someone might pay for. Write who the first customer might be, what you might charge, and the first action you will take this week.</p>
      </Exercise>

      <QuizSet title="Check yourself">
        <Quiz
          question="What is the biggest advantage of variable income over a raise?"
          options={['It is guaranteed', 'It has no built-in ceiling', 'It is tax free', 'It needs no effort']}
          correctIndex={1}
          explanation="A raise is a few percent. Variable income can grow as fast as your skill and demand."
        />
        <Quiz
          question="You earn a $1,000 freelance payment. About how much should you set aside for taxes?"
          options={['Nothing', 'About $50', 'About $250 to $300', 'All of it']}
          correctIndex={2}
          explanation="1099 income has no withholding. Setting aside 25% to 30% protects you from a tax surprise."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'A salary has a ceiling and is a single point of failure. You must have variable income.',
          'With fixed bills paid by fixed income, every extra variable dollar is savings.',
          'Start with a skill, one customer, and records. Set aside 25% to 30% for taxes.',
          'Avoid anything that costs you to join or promises easy money.',
        ]}
      />
    </div>
  );
}
