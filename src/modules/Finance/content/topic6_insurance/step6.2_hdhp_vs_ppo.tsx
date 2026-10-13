import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';
import { InsuranceBreakEven } from '../../calculators';

export default function Step6_2_HdhpVsPpo() {
  return (
    <div>
      <StepHeader
        eyebrow="Topic 6 • Insurance"
        title="HDHP + HSA vs PPO: The Break-Even"
        summary="Which plan is cheaper depends on one number: how much medical care you will use."
      />

      <Section title="Two plans, side by side" />
      <Table
        headers={['', 'Plan A: HDHP with HSA', 'Plan B: PPO']}
        rows={[
          [<strong key="a">Your premium</strong>, '$150 a month ($1,800 a year)', '$330 a month ($3,960 a year)'],
          [<strong key="b">Deductible</strong>, '$3,200', '$500'],
          [<strong key="c">After the deductible you pay</strong>, '20%', '10%'],
          [<strong key="d">Out-of-pocket maximum</strong>, '$6,000', '$2,500'],
          [<strong key="e">Employer puts in your HSA</strong>, '$500 a year', 'No HSA'],
        ]}
      />

      <Section title="What each plan costs at different amounts of care" />
      <Table
        headers={['Medical bills this year', 'Plan A total cost', 'Plan B total cost', 'Cheaper']}
        align={['left', 'right', 'right', 'left']}
        rows={[
          ['$0 (a healthy year)', '$1,300', '$3,960', 'Plan A, by $2,660'],
          ['$1,500', '$2,800', '$4,560', 'Plan A, by $1,760'],
          ['$5,500 (break-even)', '$4,960', '$4,960', 'Equal'],
          ['$9,000', '$5,660', '$5,310', 'Plan B, by $350'],
          ['$25,000 (a very bad year)', '$7,300', '$6,460', 'Plan B, by $840'],
        ]}
      />
      <p className="text-sm text-muted-foreground">Total cost = premiums for the year + what you pay for care (up to the out-of-pocket maximum) − any employer HSA gift. These numbers are an example. Use your own plan’s numbers.</p>

      <Callout type="success" title="The pattern">
        The high-deductible plan wins in healthy years, and even in moderately costly ones. The PPO only wins if you
        expect heavy use of care (above about $5,500 in this example). Most healthy adults are cheaper on the HDHP.
      </Callout>

      <Section title="Why the HDHP + HSA is attractive" />
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>The HSA is a triple tax break:</strong> contributions are pre-tax, growth is tax-free, and withdrawals for medical costs are tax-free (California taxes it, step 4.3).</li>
        <li>The money <strong>never expires</strong> and moves with you. It is yours.</li>
        <li>It can be invested like a retirement account once you have a cushion, and later used for any purpose after 65 (taxed as ordinary income if not medical).</li>
        <li>The 2026 HSA limit is $4,400 single and $8,750 family. An HDHP must have at least a $1,700 deductible ($3,400 family).</li>
      </ul>
      <Callout type="warning" title="The catch">
        You have to be able to pay the deductible if something happens. Keep the emergency fund (Topic 2) big enough to
        cover the out-of-pocket maximum, and use the HSA as that cushion over time.
      </Callout>

      <Section title="Compare your own plans" />
      <p>Enter the numbers from your own plans, and try different amounts of medical bills. The break-even and the chart show where each plan wins.</p>
      <InsuranceBreakEven />

      <QuizSet title="Check yourself">
        <Quiz
          question="A healthy person who rarely goes to the doctor most likely does best on which plan?"
          options={['The low-deductible PPO', 'The HDHP with an HSA', 'No insurance', 'Whichever has the lowest deductible']}
          correctIndex={1}
          explanation="The lower premium wins in a healthy year, and the HSA keeps the savings."
        />
        <Quiz
          question="What is the worst-case yearly cost of a plan?"
          options={['The premium', 'The deductible', 'Premiums plus the out-of-pocket maximum', 'The copay']}
          correctIndex={2}
          explanation="That is the most you can pay in a year."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'Compare plans with total yearly cost = premiums + what you pay for care, at several levels of care.',
          'In the example the HDHP wins below about $5,500 of bills, and the PPO wins above it.',
          'An HSA is pre-tax in, tax-free growth, tax-free for medical out (California taxes it).',
          'You need cash to cover the deductible: size the emergency fund for it.',
        ]}
      />
    </div>
  );
}
