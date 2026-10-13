import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { Formula } from '../../../../components/content/Formula';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';
import { RetirementSustainability } from '../../calculators';

export default function Step9_4_InflationHonest() {
  return (
    <div>
      <StepHeader
        eyebrow="Topic 9 • The Honest Version"
        title="The Honest Version: What Inflation Changes"
        summary="A flat balance in dollars is a shrinking balance in buying power. Here is the correct picture, and why the S&P 500's history still gives a safety margin."
      />

      <Callout type="warning" title="The correction">
        In step 9.2 the balance stayed at $1,000,000 when growth equaled withdrawals. In <strong>dollars</strong> that is true.
        But prices rise about 3% a year, so a flat balance buys less every year. After 30 years $1,000,000 buys what
        <strong> $411,987</strong> buys today. To keep the same lifestyle you must <strong>raise your withdrawal 3% a year</strong>.
        That changes the math. Here is the honest version.
      </Callout>

      <Section title="What happens at a 4% return" />
      <p>
        You retire with $1,000,000, spend $40,000 in year 1, and raise it 3% a year for inflation. The market gives just
        4% (no buffer). What happens?
      </p>
      <Table
        headers={['', 'Result']}
        rows={[
          ['Year 1 spending', '$40,000'],
          ['Year 30 spending (rises with prices)', '$94,263 in future dollars (still the same lifestyle)'],
          ['The balance in year 30', 'Gone: the money lasts about 30 years'],
        ]}
      />
      <p>
        A 4% return is <strong>not</strong> enough on its own if your spending keeps up with prices. The pile has to grow
        faster than 4% to keep your lifestyle for good.
      </p>

      <Section title="The break-even return" />
      <Formula label="To keep the real balance flat">
        return needed ≈ withdrawal % + inflation
      </Formula>
      <Table
        headers={['Withdrawal', 'Inflation', 'Return that keeps your buying power flat']}
        align={['left', 'right', 'right']}
        rows={[
          ['4%', '3%', '7%'],
          ['5%', '3%', '8%'],
          ['3%', '3%', '6%'],
        ]}
      />
      <p>
        At exactly 7% a year, with a 4% withdrawal that rises with inflation, your balance keeps its buying power forever.
        After 30 years the balance in dollars is about $2.43 million, which buys exactly what $1,000,000 buys today.
      </p>

      <Section title="What different market returns do ($1,000,000, 4% rising 3% a year)" />
      <Table
        headers={['Market return', 'Balance after 30 years', 'In today’s dollars', 'Verdict']}
        align={['left', 'right', 'right', 'left']}
        rows={[
          ['4%', 'Gone in year 30', '$0', 'Ran out'],
          ['5%', '$532,583', '$219,417', 'Lasts, but buying power shrinks a lot'],
          ['7%', '$2,427,262', '$1,000,000', 'Exactly flat in buying power'],
          ['8.5%', '$4,917,532', '$2,025,958', 'Buying power doubles'],
          ['10.5% (the S&P 500 average)', '$10,624,400', '$4,377,112', 'Buying power more than quadruples'],
        ]}
      />
      <Callout type="success" title="Why the history still supports 4%">
        The S&amp;P 500 has historically averaged about 10.5%, about 7.3% after inflation. That is above the 7% break-even, so
        history gives a margin of about 3 points. A 4% withdrawal is chosen so that even in the worst historical stretches
        studied, the money lasted about 30 years. In ordinary stretches the pile grows. The margin is the safety, not a guarantee.
      </Callout>

      <Section title="Two ways to say the same thing" />
      <Table
        headers={['', 'In dollars (nominal)', 'In buying power (real)']}
        rows={[
          ['4% return, 4% withdrawal that is never raised', 'The balance stays flat', 'The balance shrinks about 3% a year'],
          ['7% return, 4% withdrawal rising 3%', 'The balance grows about 3% a year', 'The balance stays flat'],
          ['10.5% return, 4% withdrawal rising 3%', 'The balance grows about 8% a year', 'The balance grows about 5% a year'],
        ]}
      />
      <p>
        So the playbook&apos;s plain claim, &quot;4% in, 4% out leaves the pile unchanged&quot;, is a <em>teaching picture</em>. The
        complete statement is: <strong>spend 4% of the pile in year 1, raise it with inflation, and rely on the market&apos;s long-run
        return of around 7% real, which leaves a safety margin.</strong>
      </p>

      <Section title="Explore it" />
      <p>
        Inflation is on, withdrawals rise with it, and the return is 7%. The solid line is the balance, the dashed line is its buying
        power. Click the presets to see 5% (shrinks), 7% (flat in real terms) and 10.5% (grows).
      </p>
      <RetirementSustainability portfolio={1000000} withdrawPct={4} rate={7} inflation={3} years={30} raise title="4% out, raised with inflation, 7% growth" />

      <QuizSet title="Check yourself">
        <Quiz
          question="With a 4% withdrawal that rises 3% a year, what return keeps your buying power flat?"
          options={['4%', '3%', '7%', '10.5%']}
          correctIndex={2}
          explanation="Return needed is about the withdrawal rate plus inflation: 4% + 3% = 7%."
        />
        <Quiz
          question="$1,000,000 flat for 30 years at 3% inflation buys about what in today’s dollars?"
          options={['$1,000,000', '$700,000', '$411,987', '$100,000']}
          correctIndex={2}
          explanation="1.03^30 = 2.43, so $1,000,000 ÷ 2.43 = $411,987."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'A balance that stays flat in dollars loses buying power. Raise withdrawals with inflation.',
          'To keep real value flat: return ≈ withdrawal % + inflation. For 4% and 3% that is 7%.',
          'The S&P 500 has averaged about 7.3% after inflation, a margin above the 7% break-even.',
          '4% is a cautious rate, not a guarantee. The margin is the safety.',
        ]}
      />
    </div>
  );
}
