import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { Compare } from '../../../../components/content/Compare';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';
import { RetirementSustainability } from '../../calculators';

export default function Step9_5_SequenceRisk() {
  return (
    <div>
      <StepHeader
        eyebrow="Topic 9 • The Safety Margin"
        title="Why 4% and Not 8%, and the Danger of a Bad Start"
        summary="The withdrawal percentage is the one dial that decides whether the money lasts. And when the bad years arrive matters as much as how bad they are."
      />

      <Section title="Same pile, different withdrawal rate" />
      <p>
        $1,000,000 retired, the market earns a steady 7%, inflation is 3%, and you raise your withdrawal each year to keep
        up. Look at what only the starting percentage changes:
      </p>
      <Table
        headers={['Withdrawal in year 1', 'You spend in year 1', 'What happens']}
        align={['left', 'right', 'left']}
        rows={[
          ['3%', '$30,000', 'The balance grows. After 30 years it buys about $1.5 million in today’s dollars'],
          [<strong key="a">4%</strong>, <strong key="b">$40,000</strong>, <strong key="c">Buying power stays exactly flat for 30 years and beyond</strong>],
          ['5%', '$50,000', 'Lasts 43 years: the balance steadily loses buying power'],
          ['6%', '$60,000', 'Runs out in year 29'],
          ['8%', '$80,000', 'Runs out in year 19'],
        ]}
      />
      <p>
        One or two percentage points decide whether the money lasts 19 years or forever. A small percentage is a big safety
        margin, because it lets the market do the heavy lifting.
      </p>

      <Section title="Even at the S&P 500's average of 10.5%" />
      <Table
        headers={['Withdrawal', 'Result at a steady 10.5% and 3% inflation']}
        align={['left', 'left']}
        rows={[
          ['4%', 'Balance grows to about $10.6 million after 30 years'],
          ['6%', 'Balance still grows, to about $5.9 million after 30 years'],
          ['8%', 'Lasts until about year 40'],
          ['10%', 'Runs out in year 20'],
        ]}
      />
      <p>
        If the future looked exactly like the long-run average, you could withdraw even 6%. But the future is bumpy. That brings
        us to the real danger.
      </p>

      <Section title="Sequence risk: when the bad years come" />
      <Callout type="warning" title="The same returns in a different order">
        Imagine six years of market returns: −25%, −10%, +5%, +15%, +20%, +25%. The average is +5%. Now imagine the same six
        returns in the opposite order. You retire with $1,000,000 and spend $40,000 in year 1, rising 3% a year. Look
        at the balance after each year:
      </Callout>
      <Table
        headers={['Year', 'Bad years FIRST: return', 'Balance', 'Bad years LAST: return', 'Balance']}
        align={['left', 'right', 'right', 'right', 'right']}
        rows={[
          ['1', '−25%', '$710,000', '+25%', '$1,210,000'],
          ['2', '−10%', '$597,800', '+20%', '$1,410,800'],
          ['3', '+5%', '$585,254', '+15%', '$1,579,984'],
          ['4', '+15%', '$629,333', '+5%', '$1,615,274'],
          ['5', '+20%', '$710,179', '−10%', '$1,408,726'],
          ['6', '+25%', '$841,353', '−25%', '$1,010,174'],
        ]}
      />
      <p>
        The returns are identical. The spending is identical. After six years one retiree has <strong>$841,353</strong> and the
        other has <strong>$1,010,174</strong>, a difference of $168,821. The crash at the start forced the first retiree to
        sell shares at low prices to pay for living, so those shares were not there for the recovery.
      </p>
      <Compare
        goodLabel="Bad years while you save"
        badLabel="Bad years right after you retire"
        good={
          <>
            <p>You keep buying at low prices.</p>
            <p>The recovery works on all your new shares.</p>
            <p>A long career smooths it out.</p>
          </>
        }
        bad={
          <>
            <p>You sell shares at low prices to live.</p>
            <p>Fewer shares are left to recover.</p>
            <p>The damage is permanent. This is <strong>sequence of returns risk</strong>.</p>
          </>
        }
      />

      <Section title="How to protect against a bad start" />
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>Use a modest withdrawal rate</strong> (4% or a little less). It is the margin that absorbs a bad start.</li>
        <li><strong>Be flexible.</strong> In a bad year, spend a little less (skip the trip, delay the car). A 10% cut in a down year helps a lot.</li>
        <li><strong>Keep one or two years of spending in cash or short-term bonds</strong> in the years around retirement, so you are not forced to sell stocks in a crash.</li>
        <li><strong>Have another income</strong> (Social Security, part-time work, rent) to lower what the pile must cover.</li>
        <li><strong>Do not panic.</strong> After a drop, the plan is to hold, spend less if you can, and wait.</li>
      </ul>
      <Callout type="info" title="A note on this playbook">
        The S&amp;P 500 strategy (Topic 7) is all stocks, which is volatile. Near retirement, many people add some cash or bonds
        for the first years of spending. That is a reasonable adjustment to the playbook as the date gets close, and a good
        subject for a professional plan.
      </Callout>

      <Section title="Try the withdrawal dial" />
      <p>
        Return is 7%, inflation 3%, withdrawals rise with it. Move the withdrawal percentage from 3% to 8% and read the last row of the table.
      </p>
      <RetirementSustainability portfolio={1000000} withdrawPct={5} rate={7} inflation={3} years={40} raise title="What does the withdrawal rate do?" />

      <QuizSet title="Check yourself">
        <Quiz
          question="Why is a crash in the first years of retirement worse than a crash in the last years?"
          options={['Stocks fall more early', 'You sell shares at low prices to pay for living, so fewer are left to recover', 'Taxes are higher', 'Banks charge more']}
          correctIndex={1}
          explanation="That is sequence of returns risk."
        />
        <Quiz
          question="Two retirees get the same returns and spend the same amount, but in opposite orders. What happens?"
          options={['They end with the same balance', 'The one with the bad years first ends with much less', 'The one with bad years last ends with less', 'Neither runs out']}
          correctIndex={1}
          explanation="The order matters when you are withdrawing."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'At 7% growth and 3% inflation: 4% holds buying power flat, 6% runs out in year 29, 8% in year 19.',
          'Sequence risk: the same returns in a bad-first order left one retiree $168,821 behind after six years.',
          'Protect with a modest rate, flexibility, a cash buffer for the early years, and other income.',
          'A crash is much more dangerous when you are withdrawing than when you are saving.',
        ]}
      />
    </div>
  );
}
