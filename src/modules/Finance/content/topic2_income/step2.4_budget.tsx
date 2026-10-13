import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { Steps } from '../../../../components/content/Steps';
import { Exercise } from '../../../../components/content/Exercise';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function Step2_4_Budget() {
  return (
    <div>
      <StepHeader
        eyebrow="Topic 2 • Expenses"
        title="A Budget That Fits on One Page"
        summary="Not a punishment: a plan that tells every dollar where to go before the month starts."
      />

      <p>
        A budget is a plan for your money made <strong>before</strong> you spend it. Most people skip it because they
        imagine tracking every coffee. A good budget is smaller than that. It has five numbers and one habit.
      </p>

      <Section title="The five numbers" />
      <Table
        headers={['#', 'Number', 'How to find it']}
        rows={[
          ['1', 'Take-home pay (fixed)', 'Look at your last paycheck stubs (Topic 5)'],
          ['2', 'Fixed expenses', 'Add rent, insurance, phone, debt minimums, subscriptions. Look at 3 months of statements'],
          ['3', 'Variable income', 'Your average side income over the last 3 months. Count only what you actually received'],
          ['4', 'Variable spending', 'Groceries, eating out, fun, shopping, gifts. Look at 3 months and average it'],
          ['5', 'What is left', 'Fixed left + variable left. This is your savings number'],
        ]}
      />

      <Section title="Build it in one evening" />
      <Steps
        steps={[
          { title: 'Gather three months of statements', children: <p>Bank and card statements. Download or screenshot them. Three months smooths out the odd month.</p> },
          { title: 'Sort every line into fixed or variable', children: <p>Use a simple spreadsheet with two columns. Cancel anything you do not recognize.</p> },
          { title: 'Total each side', children: <p>Total fixed expenses and variable expenses. Compare each to its matching income (step 2.2).</p> },
          { title: 'Set a variable spending limit', children: <p>Pick numbers per category for next month, based on what you actually earn on the variable side. A limit you can keep is better than a limit that is too tight to follow.</p> },
          { title: 'Automate the saving', children: <p>Pay yourself first. On payday, move the savings amount automatically to your savings, your Roth IRA and your investments, so you never see it.</p> },
          { title: 'Review once a month', children: <p>Ten minutes on the first of the month: compare to the plan, adjust the numbers, and celebrate any win.</p> },
        ]}
      />

      <Callout type="tip" title="Pay yourself first">
        The classic mistake is saving what is left after spending. There is never anything left. Reverse it: save first,
        automatically, then spend what remains guilt-free. The money you do not see is the money you do not spend.
      </Callout>

      <Section title="The subscription audit" />
      <p>
        Most people lose $50 to $200 a month to subscriptions they forgot. List every recurring charge on your cards
        and bank. Cancel what you have not used in a month. Redirect the savings to your debt or investing. A single
        $15 subscription is $180 a year, and $180 a year invested for 40 years at 10% becomes about $80,000 (Topic 8).
      </p>

      <Section title="Common guides (use as a sanity check, not a cage)" />
      <Table
        headers={['Guide', 'Idea', 'The playbook view']}
        rows={[
          ['50/30/20', '50% needs, 30% wants, 20% savings', 'Useful for a first look. The playbook splits by fixed vs variable instead'],
          ['Housing under 30%', 'Rent or mortgage under 30% of gross income', 'A good ceiling. Lower is better'],
          ['Save 20% or more', 'Save at least 20% of income', 'A start. Aim higher as income grows'],
        ]}
      />

      <Exercise
        title="Do the first pass today"
        solution={
          <ul className="list-disc pl-5 space-y-1">
            <li>Last three months of statements, sorted into fixed and variable.</li>
            <li>The five numbers written down.</li>
            <li>At least one subscription cancelled.</li>
            <li>An automatic transfer set up for the day after payday.</li>
          </ul>
        }
      >
        <p>Do not wait for a perfect system. Pull one month of statements, sort it into fixed and variable, find the five numbers, and set one automatic transfer.</p>
      </Exercise>

      <KeyTakeaways
        items={[
          'A budget is a plan made before you spend. It has five numbers.',
          'Look at three months of real statements, not your memory.',
          'Pay yourself first and automate it.',
          'Audit subscriptions. Small recurring charges compound into big losses.',
        ]}
      />
    </div>
  );
}
