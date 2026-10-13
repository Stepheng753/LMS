import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { Steps } from '../../../../components/content/Steps';
import { Exercise } from '../../../../components/content/Exercise';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function StepS_14_ActionPlan() {
  return (
    <div>
      <StepHeader
        eyebrow="Summary • Finish"
        title="Your 90-Day Action Plan"
        summary="Reading about money does nothing until you move money. A short plan, in order, with a check at the end of each month."
      />

      <Callout type="success" title="The goal of 90 days">
        By day 90 you know your numbers, your accounts are open and automated, your debt has a plan, and your protection
        is in place. You do not need to be perfect. You need to start and set it up to run itself.
      </Callout>

      <Section title="Days 1 to 30: know your numbers" />
      <Steps
        steps={[
          { title: 'Pull three months of statements and sort them', children: <p>Fixed vs variable. Find the five numbers (Topic 2). Cancel the subscriptions you do not use.</p> },
          { title: 'List every debt', children: <p>Balance, rate, minimum. Order smallest to largest. Start the snowball (Topic 1).</p> },
          { title: 'Read your paycheck stub', children: <p>Check each line against Topic 5. Find the employer match formula and the benefit menu.</p> },
          { title: 'Take the match', children: <p>Set the 401k to at least the full match, Roth if offered, in an S&amp;P 500 index fund.</p> },
          { title: 'Turn on card autopay', children: <p>Full statement balance, with alerts. Pull your free credit reports.</p> },
        ]}
      />

      <Section title="Days 31 to 60: build the foundation" />
      <Steps
        steps={[
          { title: 'Open a high-yield savings account', children: <p>Automatic transfer on payday for the emergency fund. Start with $1,000 if you have debt.</p> },
          { title: 'Open a Roth IRA', children: <p>Automatic monthly deposit and automatic purchase of the S&amp;P 500 fund. Start with whatever fits and raise it.</p> },
          { title: 'Review your insurance', children: <p>Health plan break-even at open enrollment, renters or home, auto liability, and a term life quote if anyone depends on you (Topic 6).</p> },
          { title: 'Check your W-4', children: <p>Aim for a small refund. Update it after any life change (Topic 5).</p> },
          { title: 'Start a variable income', children: <p>One skill, one first customer, a price. Set up a separate account and set aside 25% to 30% for taxes (Topics 2 and 4).</p> },
        ]}
      />

      <Section title="Days 61 to 90: automate and plan" />
      <Steps
        steps={[
          { title: 'Compute your retirement number', children: <p>Yearly spending ÷ 4%, with Social Security subtracted (Topic 9). Find the monthly amount to reach it.</p> },
          { title: 'Run the order of operations', children: <p>Decide which rung you are on and set every transfer to run automatically (Topic 7).</p> },
          { title: 'Set the raise rule', children: <p>Half of every raise to investing, starting with the next one (Topic 2).</p> },
          { title: 'Add beneficiaries and a will', children: <p>Name beneficiaries on every account and policy. Write down where everything is.</p> },
          { title: 'Put one date in your calendar each year', children: <p>The annual money review: contributions, match, insurance, taxes, beneficiaries, goals.</p> },
        ]}
      />

      <Section title="Month-end check" />
      <Table
        headers={['Day', 'You should be able to say']}
        rows={[
          ['30', '"I know my income, expenses and debts, and I take the full match."'],
          ['60', '"My emergency fund and Roth IRA run automatically, and my insurance is reviewed."'],
          ['90', '"I know my retirement number, my ladder is automated, and I have a yearly review date."'],
        ]}
      />

      <Exercise
        title="Write your own plan"
        solution={
          <ul className="list-disc pl-5 space-y-1">
            <li>Which rung of the ladder you are on today, in one sentence.</li>
            <li>Three actions with dates for the next 30 days.</li>
            <li>The monthly amount you can automate, and where each dollar goes.</li>
            <li>The date of your first annual review.</li>
          </ul>
        }
      >
        <p>Write a one-page plan: where you are on the ladder, the first three actions with dates, the monthly amount you will automate, and your review date. Use the Toolbox worksheets.</p>
      </Exercise>

      <KeyTakeaways
        items={[
          'Days 1 to 30: know your numbers, start the snowball, take the match, autopay your cards.',
          'Days 31 to 60: emergency fund, Roth IRA, insurance review, W-4, a variable income.',
          'Days 61 to 90: retirement number, automate the ladder, raise rule, beneficiaries, a yearly review date.',
          'Do it in order, and let automation do the rest.',
        ]}
      />
    </div>
  );
}
