import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { Formula } from '../../../../components/content/Formula';
import { Exercise } from '../../../../components/content/Exercise';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function Step8_5_RuleOf72() {
  return (
    <div>
      <StepHeader
        eyebrow="Topic 8 • Compounding"
        title="The Rule of 72: How Fast Money Doubles"
        summary="A mental shortcut: divide 72 by the rate and you get the years it takes for money to double."
      />

      <Formula label="The rule of 72">years to double ≈ 72 ÷ rate</Formula>
      <Table
        headers={['Rate', 'Rule of 72 says', 'Exact answer']}
        align={['left', 'right', 'right']}
        rows={[
          ['1% (a bank account)', '72 years', '69.7 years'],
          ['4%', '18 years', '17.7 years'],
          ['7%', '10.3 years', '10.2 years'],
          ['10%', '7.2 years', '7.3 years'],
          ['10.5% (the S&P 500 average)', '6.9 years', '6.9 years'],
          ['22% (a credit card, working against you)', '3.3 years', '3.5 years'],
        ]}
      />
      <p>The shortcut is close enough for planning. The last row is a warning: at 22% a debt doubles in about three years.</p>

      <Section title="Doublings from age 25 to 65" />
      <p>At 10.5%, money doubles about every 7 years. Over 40 years that is almost <strong>six doublings</strong>:</p>
      <Table
        headers={['Age', 'Years invested', 'Doublings', 'One $10,000 becomes']}
        align={['left', 'right', 'right', 'right']}
        rows={[
          ['25', '0', '0', '$10,000'],
          ['32', '7', '1', '$20,000'],
          ['39', '14', '2', '$40,000'],
          ['46', '21', '3', '$80,000'],
          ['53', '28', '4', '$160,000'],
          ['60', '35', '5', '$320,000'],
          ['65', '40', 'about 5.8', 'about $542,600 (exact)'],
        ]}
      />
      <Callout type="success" title="Notice where the dollars are">
        The first doubling adds $10,000. The last doubling (from 53 to 60) adds $160,000. Each doubling is the same
        <em> percentage</em> but a much bigger <em>dollar amount</em>. The later years do most of the building.
      </Callout>

      <Section title="Use it in your head" />
      <ul className="list-disc pl-5 space-y-1">
        <li>At 7%: your money doubles about every 10 years, so 30 years is 3 doublings, which is 8 times.</li>
        <li>At 10%: about every 7 years, so 28 years is 4 doublings, which is 16 times.</li>
        <li>Quick check of a promise: &quot;doubles in 5 years&quot; means about 14% a year. Be suspicious.</li>
      </ul>

      <Exercise
        title="Use the rule"
        solution={
          <ul className="list-disc pl-5 space-y-1">
            <li>At 6%: 72 ÷ 6 = <strong>12 years</strong> to double.</li>
            <li>At 9%: 72 ÷ 9 = 8 years, so 24 years is 3 doublings: $5,000 × 8 = <strong>$40,000</strong>.</li>
            <li>To double in 6 years you need 72 ÷ 6 = <strong>12%</strong> a year.</li>
          </ul>
        }
      >
        <p>(a) How long does money take to double at 6%? (b) $5,000 at 9% for 24 years, about how much? (c) What rate doubles money in 6 years?</p>
      </Exercise>

      <QuizSet title="Check yourself">
        <Quiz
          question="About how long does money take to double at 8%?"
          options={['6 years', '9 years', '12 years', '18 years']}
          correctIndex={1}
          explanation="72 ÷ 8 = 9 years."
        />
        <Quiz
          question="A credit card at 24% APR. About how fast does an unpaid balance double?"
          options={['3 years', '12 years', '24 years', '1 year']}
          correctIndex={0}
          explanation="72 ÷ 24 = 3 years."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'Years to double ≈ 72 ÷ rate.',
          'At 10.5%, money doubles about every 7 years: almost 6 doublings in 40 years.',
          'Each doubling is the same percentage but a bigger dollar gain, so later years build the most.',
          'The same rule shows debt at 22% doubling in about 3 years.',
        ]}
      />
    </div>
  );
}
