import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Table } from '../../../../components/content/Table';
import { Callout } from '../../../../components/content/Callout';
import { Steps } from '../../../../components/content/Steps';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function StepT_1_Routine() {
  return (
    <div>
      <StepHeader
        eyebrow="Toolbox • Routine"
        title="Your Money Routine: Weekly, Monthly, Yearly"
        summary="How to use the toolbox so money takes about 10 minutes a week, and one afternoon a year."
      />

      <Callout type="success" title="Automation does most of it">
        If your transfers, deposits and card payments are automatic (Topic 7), your routine is a short check, not a
        chore. The point of the routine is to notice problems early and raise your numbers on time.
      </Callout>

      <Section title="The routine" />
      <Table
        headers={['How often', 'What to do', 'Toolbox file', 'Time']}
        rows={[
          [<strong key="a">Weekly</strong>, 'Glance at your checking balance and card balance. Look for strange charges', 'Card app alerts', '5 minutes'],
          [<strong key="b">Monthly</strong>, 'Compare spending with the budget. Update the debt list. Move any extra to the next rung', 'budget.csv, debt-snowball.csv, order-of-operations.md', '20 minutes'],
          [<strong key="c">Every quarter</strong>, 'If you have 1099 income: pay the estimated tax and update the tracker', 'side-income-tracker.csv, tax-calendar.md', '15 minutes'],
          [<strong key="d">Twice a year</strong>, 'Update net worth. Check that investments are actually invested', 'net-worth.csv', '15 minutes'],
          [<strong key="e">Yearly</strong>, 'The full review: raise contributions, insurance, W-4, beneficiaries, retirement number', 'annual-money-review.md, insurance-review.md, retirement-number.md', '2 hours'],
          [<strong key="f">After a life event</strong>, 'Marriage, a baby, a job change, a home purchase: redo the order of operations, W-4, insurance', 'order-of-operations.md, home-purchase-checklist.md', 'an afternoon'],
        ]}
      />

      <Section title="Set it up once" />
      <Steps
        steps={[
          { title: 'Download the zip and make a folder called Money', children: <p>Keep it in a place you back up. Do not put account numbers or passwords in these files.</p> },
          { title: 'Put three dated reminders in your calendar', children: <p>The first of each month, the first of each quarter, and one date each year for the annual review.</p> },
          { title: 'Fill in the budget and the debt list first', children: <p>An hour, once. After that you only update numbers.</p> },
          { title: 'Open the order of operations card and mark where you are', children: <p>Tick the steps you have finished. Review it each month.</p> },
          { title: 'After 90 days, redo the Summary exams (S.12 and S.13)', children: <p>Check what has stuck and what to reread.</p> },
        ]}
      />

      <Callout type="info" title="You do not need to be perfect">
        A routine you keep at 80% beats a perfect system you drop in a month. Start with the monthly check and add the
        rest as the habit forms.
      </Callout>

      <KeyTakeaways
        items={[
          'Weekly 5 minutes, monthly 20, quarterly 15 for 1099 income, yearly about 2 hours.',
          'Keep files in a backed-up Money folder, with no account numbers or passwords.',
          'Use the monthly check as the base and grow the habit.',
        ]}
      />
    </div>
  );
}
