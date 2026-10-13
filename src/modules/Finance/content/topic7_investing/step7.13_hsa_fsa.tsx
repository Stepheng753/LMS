import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { Compare } from '../../../../components/content/Compare';
import { Exercise } from '../../../../components/content/Exercise';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';
import { CompoundCalculator } from '../../calculators';

export default function Step7_13_HsaFsa() {
  return (
    <div>
      <StepHeader
        eyebrow="Topic 7 • Health Accounts"
        title="HSA and FSA: Tax Breaks on Health Spending"
        summary="The HSA is the only account with a tax break going in, growing, and coming out. The FSA is a use-it-or-lose-it cousin."
      />

      <Section title="HSA: the triple tax break" />
      <Callout type="success" title="Three tax breaks in one account">
        <ol className="list-decimal pl-5 space-y-1">
          <li><strong>In:</strong> contributions are pre-tax (and skip Social Security and Medicare tax when done through payroll).</li>
          <li><strong>Growing:</strong> investments grow tax-free.</li>
          <li><strong>Out:</strong> withdrawals for medical costs are tax-free.</li>
        </ol>
        No other account does all three. (California taxes HSA contributions and growth, as covered in Topic 4.)
      </Callout>

      <Table
        headers={['HSA rule', 'Detail (2026)']}
        rows={[
          [<strong key="a">Who can have one</strong>, 'Anyone on a qualifying high-deductible health plan (HDHP), not on Medicare, and not claimed as a dependent'],
          [<strong key="b">HDHP means</strong>, 'A deductible of at least $1,700 (single) or $3,400 (family), and an out-of-pocket maximum no more than $8,500 or $17,000'],
          [<strong key="c">Limit</strong>, '$4,400 single, $8,750 family, +$1,000 if 55 or older. Employer contributions count toward the limit'],
          [<strong key="d">It is yours forever</strong>, 'No use-it-or-lose-it. It stays with you if you change jobs or plans'],
          [<strong key="e">After age 65</strong>, 'Withdraw for anything, taxed as ordinary income with no penalty (like a traditional IRA). Medical stays tax-free'],
          [<strong key="f">Before 65, non-medical</strong>, '20% penalty plus income tax'],
        ]}
      />

      <Section title="The HSA as a retirement account" />
      <p>
        Most people spend the HSA. A stronger move, if you can afford it: <strong>pay your medical bills out of pocket today,
        keep the receipts, and let the HSA invest</strong>. There is no deadline to reimburse yourself, so years later you can
        take the money out tax-free for those old receipts.
      </p>
      <p>
        An HSA funded with the 2026 single limit of $4,400 a year for 30 years at 10% grows to about
        <strong> $724,000</strong>. Use the calculator to see it.
      </p>
      <CompoundCalculator start={0} yearly={4400} rate={10} years={30} title="HSA: $4,400 a year, invested" presets={[
        { label: '$4,400 a year, 30 years', start: 0, yearly: 4400, rate: 10, years: 30 },
        { label: 'Family limit $8,750', start: 0, yearly: 8750, rate: 10, years: 30 },
        { label: 'Only 15 years', start: 0, yearly: 4400, rate: 10, years: 15 },
        { label: 'Spend it all each year', start: 0, yearly: 0, rate: 10, years: 30 },
      ]} />
      <Callout type="info" title="Practical tips">
        Keep enough in the HSA in cash (or covered by your emergency fund) for your deductible. Invest the rest in the same
        index fund as your other accounts. Many HSA providers only let you invest above a minimum cash balance.
      </Callout>

      <Section title="FSA: the use-it-or-lose-it account" />
      <Table
        headers={['FSA rule', 'Detail (2026)']}
        rows={[
          [<strong key="a">Limit</strong>, '$3,400 for a health FSA. Dependent care FSA $7,500'],
          [<strong key="b">Tax break</strong>, 'Pre-tax. Also skips Social Security, Medicare and California SDI. About 40% off if you are in the 22% and 9.3% brackets'],
          [<strong key="c">Who has one</strong>, 'Offered by your employer. You do not need a high-deductible plan'],
          [<strong key="d">Catch</strong>, 'Mostly use it or lose it each year. Some plans allow a small carryover (about $680) or a grace period'],
          [<strong key="e">The full amount is available on day one</strong>, 'You can spend the whole yearly amount in January even though you contribute through the year'],
        ]}
      />
      <Compare
        goodLabel="Plan the FSA carefully"
        badLabel="Mistakes"
        good={
          <>
            <p>Estimate only what you are <strong>sure</strong> to spend: glasses or contacts, dental work, prescriptions, copays.</p>
            <p>Use it on eligible items before the year ends.</p>
            <p>Use a dependent care FSA for daycare you are already paying.</p>
          </>
        }
        bad={
          <>
            <p>Putting in $3,400 when you only spend $800.</p>
            <p>Forgetting the deadline and losing the balance.</p>
            <p>Having both a full health FSA and an HSA (you generally cannot, unless the FSA is &quot;limited purpose&quot;).</p>
          </>
        }
      />

      <Section title="HSA vs FSA at a glance" />
      <Table
        headers={['', 'HSA', 'FSA']}
        rows={[
          ['Needs a high-deductible plan', 'Yes', 'No'],
          ['Keeps the balance year to year', <strong key="a">Yes, forever</strong>, 'No (mostly)'],
          ['Can be invested', 'Yes', 'No'],
          ['Goes with you if you leave', 'Yes', 'No'],
          ['Limit (2026)', '$4,400 / $8,750', '$3,400'],
          ['Best for', 'Long-term tax-free health and retirement savings', 'Known near-term health costs'],
        ]}
      />

      <Exercise
        title="HSA or FSA?"
        solution={
          <ul className="list-disc pl-5 space-y-1">
            <li>You have a high-deductible plan: <strong>HSA</strong>. Contribute up to $4,400 and invest what you will not need soon.</li>
            <li>You have a PPO and know you need $900 of dental and glasses: a health <strong>FSA</strong> of about $900.</li>
            <li>You have a baby in daycare: a <strong>dependent care FSA</strong> up to $7,500.</li>
          </ul>
        }
      >
        <p>Which account fits? (a) You have a high-deductible plan and rarely see a doctor. (b) You have a PPO and need about $900 of dental work and glasses this year. (c) You pay for daycare.</p>
      </Exercise>

      <QuizSet title="Check yourself">
        <Quiz
          question="What makes the HSA special among tax-advantaged accounts?"
          options={['It has no limit', 'Tax-free in, tax-free growth and tax-free out for medical costs', 'It is available to everyone', 'It never needs a plan']}
          correctIndex={1}
          explanation="The triple tax break."
        />
        <Quiz
          question="What happens to unused FSA money at the end of the year?"
          options={['It rolls over forever', 'You mostly lose it', 'It is invested', 'It goes to your HSA']}
          correctIndex={1}
          explanation="FSAs are use it or lose it, with at most a small carryover or a grace period."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'HSA: tax-free in, tax-free growth, tax-free out for medical. Needs a high-deductible plan. 2026 limit $4,400 single, $8,750 family.',
          'Keep HSA receipts and invest the rest. $4,400 a year for 30 years at 10% is about $724,000.',
          'FSA: pre-tax, use it or lose it, $3,400 (dependent care $7,500). Only fund what you are sure to spend.',
          'California taxes HSA contributions and growth.',
        ]}
      />
    </div>
  );
}
