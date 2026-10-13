import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { Formula } from '../../../../components/content/Formula';
import { Exercise } from '../../../../components/content/Exercise';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function Step8_1_Percentages() {
  return (
    <div>
      <StepHeader
        eyebrow="Topic 8 • Percentages"
        title="Percentages in Plain Math"
        summary="Three moves that unlock all of finance: a percent of a number, a percent change, and the growth factor."
      />

      <Section title="Move 1: a percent of a number" />
      <p>A percent means &quot;out of 100&quot;. To take a percent of something, turn the percent into a decimal and multiply.</p>
      <Formula label="Percent of a number">percent of X = X × (percent ÷ 100)</Formula>
      <Table
        headers={['What you want', 'Calculation', 'Result']}
        align={['left', 'left', 'right']}
        rows={[
          ['10% of $10,000', '$10,000 × 0.10', '$1,000'],
          ['5% of $10,000', '$10,000 × 0.05', '$500'],
          ['10.5% of $10,000', '$10,000 × 0.105', '$1,050'],
          ['1% of $10,000', '$10,000 × 0.01', '$100'],
          ['20% of $80', '$80 × 0.20', '$16'],
        ]}
      />
      <Callout type="tip" title="Shortcut for 10%">
        To find 10% of any number, move the decimal one place left. 10% of $7,250 is $725. To find 1%, move it two places.
      </Callout>

      <Section title="Move 2: the growth factor" />
      <p>
        If something grows 10%, you do not have to compute the growth and add it. Multiply by <strong>1.10</strong> in one
        step. The 1 is the money you already have, and the 0.10 is the growth.
      </p>
      <Formula label="Growth factor">new amount = old amount × (1 + rate)</Formula>
      <Table
        headers={['Start', 'Rate', 'Multiply by', 'End']}
        align={['right', 'right', 'right', 'right']}
        rows={[
          ['$10,000', '10%', '1.10', '$11,000'],
          ['$10,000', '5%', '1.05', '$10,500'],
          ['$10,000', '−10%', '0.90', '$9,000'],
          ['$10,000', '10.5%', '1.105', '$11,050'],
        ]}
      />
      <p>This is the move that makes compounding easy: do it again for the next year, and the next.</p>

      <Section title="Move 3: percent change" />
      <Formula label="Percent change">percent change = (new − old) ÷ old × 100</Formula>
      <p>
        A stock rises from $80 to $100: (100 − 80) ÷ 80 = 0.25, so it rose <strong>25%</strong>. Notice what happens
        going back down: from $100 to $80 is (80 − 100) ÷ 100 = −20%. A 25% gain needs only a 20% loss to undo. Percent changes
        depend on the starting point.
      </p>

      <Callout type="warning" title="Percent vs percentage points">
        If an interest rate goes from 4% to 6%, it rose by <strong>2 percentage points</strong>, which is a <strong>50%
        increase</strong> in the rate (2 ÷ 4). Be careful which one a headline means.
      </Callout>

      <Exercise
        title="Practice"
        solution={
          <ul className="list-disc pl-5 space-y-1">
            <li>8% of $25,000 = $25,000 × 0.08 = <strong>$2,000</strong>.</li>
            <li>$25,000 × 1.08 = <strong>$27,000</strong>.</li>
            <li>From $25,000 to $30,000: (30,000 − 25,000) ÷ 25,000 = <strong>20%</strong>.</li>
          </ul>
        }
      >
        <p>(a) What is 8% of $25,000? (b) What is $25,000 after growing 8%? (c) If it grows from $25,000 to $30,000, what is the percent change?</p>
      </Exercise>

      <QuizSet title="Check yourself">
        <Quiz
          question="What is $20,000 after it grows 5%?"
          options={['$20,005', '$21,000', '$20,100', '$25,000']}
          correctIndex={1}
          explanation="$20,000 × 1.05 = $21,000."
        />
        <Quiz
          question="A stock falls from $100 to $50. What percent gain is needed to get back to $100?"
          options={['50%', '100%', '25%', '200%']}
          correctIndex={1}
          explanation="From $50 to $100 is (100 − 50) ÷ 50 = 100%. A 50% loss needs a 100% gain."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'A percent of X is X × percent ÷ 100. For 10%, move the decimal one place.',
          'Growth factor: new = old × (1 + rate). 10% growth is × 1.10.',
          'Percent change = (new − old) ÷ old. Losses and gains are not symmetric.',
          'A rate rising from 4% to 6% is 2 percentage points, a 50% increase.',
        ]}
      />
    </div>
  );
}
