import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { Compare } from '../../../../components/content/Compare';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';
import { CompoundCalculator } from '../../calculators';

export default function Step2_6_LifestyleCreep() {
  return (
    <div>
      <StepHeader
        eyebrow="Topic 2 • Expenses"
        title="Lifestyle Creep: Where Raises Go to Die"
        summary="Why people who earn more often have no more left over, and the simple rule that stops it."
      />

      <p>
        Lifestyle creep is when your spending quietly rises to match your income. Each raise gets absorbed by a nicer
        apartment, a newer car, more eating out and more subscriptions. A decade later you earn twice as much and have
        saved the same amount.
      </p>

      <Section title="How it happens" />
      <ol className="list-decimal pl-5 space-y-1">
        <li>You get a raise. It feels like free money.</li>
        <li>You &quot;deserve&quot; something. A better car, an upgraded apartment, a nicer phone.</li>
        <li>The payment becomes a <strong>fixed</strong> expense. It does not go away when the raise does.</li>
        <li>A new raise arrives, and the cycle repeats.</li>
      </ol>
      <Callout type="warning" title="Fixed expenses are the dangerous kind">
        A new fixed expense is permanent. A $300-a-month car payment or apartment upgrade now has to be paid by your
        fixed income every month for years. Variable fun is flexible. Fixed commitments are not.
      </Callout>

      <Section title="What $300 a month is worth if you do not spend it" />
      <p>
        Suppose you absorb a raise into $300 a month of new spending. Now suppose you invest that $300 a month
        ($3,600 a year) instead, at an average 10% a year:
      </p>
      <Table
        headers={['Years', 'You deposited', 'It becomes (10%)']}
        align={['left', 'right', 'right']}
        rows={[
          ['10', '$36,000', 'about $57,000'],
          ['20', '$72,000', 'about $206,000'],
          ['30', '$108,000', 'about $592,000'],
          ['40', '$144,000', 'about $1,593,000'],
        ]}
      />
      <p>A single $300 monthly habit decides whether you have a million dollars or nothing at the end of a career. Try it:</p>
      <CompoundCalculator start={0} yearly={3600} rate={10} years={30} title="What $300 a month becomes" presets={[
        { label: '$300 a month, 30 years', start: 0, yearly: 3600, rate: 10, years: 30 },
        { label: '$300 a month, 40 years', start: 0, yearly: 3600, rate: 10, years: 40 },
        { label: '$600 a month, 30 years', start: 0, yearly: 7200, rate: 10, years: 30 },
        { label: '$300 a month at a 4% bank rate', start: 0, yearly: 3600, rate: 4, years: 30 },
      ]} />

      <Section title="The fix: split every raise" />
      <Compare
        goodLabel="The playbook rule"
        badLabel="What usually happens"
        good={
          <>
            <p><strong>Half of every raise goes to saving or investing.</strong> Automate it the day the raise starts.</p>
            <p>The other half is yours to enjoy, guilt-free.</p>
            <p>Delay any new fixed expense by 6 months.</p>
          </>
        }
        bad={
          <>
            <p>All of it goes to spending, because it feels like a reward.</p>
            <p>New fixed bills are taken on right away.</p>
            <p>Savings stay flat while income rises.</p>
          </>
        }
      />

      <Section title="A raise, in real numbers" />
      <p>
        You get a $6,000 raise. After tax at a typical marginal rate of about 40% (federal, California, Social Security
        and Medicare together), that is about $3,600 a year, or $300 a month. With the 50/50 rule: $150 a month goes to
        investing, $150 a month is yours. Do that with each raise for ten years and the investing side compounds quietly
        in the background while your lifestyle still improves.
      </p>

      <QuizSet title="Check yourself">
        <Quiz
          question="Why are new fixed expenses the most dangerous part of lifestyle creep?"
          options={['They have higher interest', 'They are permanent commitments your income must cover every month', 'They are always illegal', 'They are tax deductible']}
          correctIndex={1}
          explanation="A car payment or rent upgrade stays long after the excitement of the raise has gone."
        />
        <Quiz
          question="What does the 50/50 raise rule say?"
          options={['Spend half of your savings', 'Half of every raise goes to saving and investing', 'Take two raises a year', 'Pay half in cash']}
          correctIndex={1}
          explanation="You get to enjoy part of it, and part builds your future."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'Lifestyle creep is spending rising to match income.',
          'Fixed commitments are the dangerous kind.',
          '$300 a month invested for 30 years at 10% becomes about $592,000.',
          'Split every raise: half to investing, half to enjoy. Delay new fixed expenses.',
        ]}
      />
    </div>
  );
}
