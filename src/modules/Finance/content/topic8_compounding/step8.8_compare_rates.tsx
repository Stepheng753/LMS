import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';
import { RateCompare } from '../../calculators';

export default function Step8_8_CompareRates() {
  return (
    <div>
      <StepHeader
        eyebrow="Topic 8 • Rates"
        title="The Rate Matters More Than You Think"
        summary="The same $6,000 a year for 40 years at 1%, 4.5%, 7% and 10.5%. A few percentage points create a million-dollar gap."
      />

      <Section title="Four rates, one plan" />
      <Table
        headers={['Where the money is', 'Rate', 'Balance after 40 years', 'Growth']}
        align={['left', 'right', 'right', 'right']}
        rows={[
          ['A typical bank savings account', '1%', '$293,318', '$53,318'],
          ['Bonds (long-run average)', '4.5%', '$642,182', '$402,182'],
          ['A cautious guess for stocks', '7%', '$1,197,811', '$957,811'],
          [<strong key="a">The S&amp;P 500 long-run average</strong>, '10.5%', <strong key="b">$3,043,509</strong>, '$2,803,509'],
        ]}
      />
      <p>
        You deposit $240,000 in every row. The bank returns $53,318 of growth. The S&amp;P 500 returns $2.8 million, about
        <strong> 52 times more growth</strong>, for the same deposits. The rate multiplies everything.
      </p>
      <Callout type="warning" title="But riskier rates are not guaranteed">
        A 1% savings account almost never loses money. The S&amp;P 500 has fallen 25% to 57% several times (step 7.14). The
        higher rate is the <em>reward for being willing to sit through the drops</em>. The 10.5% is a long-run average, not a
        promise, and a 7% column is shown because the future may be lower than the past.
      </Callout>

      <Section title="Why 3 points make a big difference" />
      <p>
        From 7% to 10.5% is only 3.5 percentage points, but it more than doubles the result ($1.2 million to $3.0 million).
        The gap widens each year because the higher rate earns on a bigger pile each time. Over short periods the rates
        look alike. Over 40 years they are different worlds.
      </p>

      <Section title="Play with the rates" />
      <p>
        Four rates, side by side. Change any of them. Read the table at years 10, 20, 30 and 40 and watch the lines separate.
      </p>
      <RateCompare />

      <Section title="Where each rate comes from" />
      <Table
        headers={['Rate used', 'What it represents', 'Source']}
        rows={[
          ['1%', 'A large-bank savings account (high-yield accounts pay more, often 3% to 4.5%)', 'Bank rate pages, FDIC national rates'],
          ['4.5%', 'Long-run average of 10-year US Treasury bonds', 'NYU Stern (Damodaran) historical returns'],
          ['7%', 'The S&P 500 return after inflation, or a cautious future estimate', '10.5% ÷ 3% inflation, or a lower forecast'],
          ['10.5%', 'The S&P 500 average yearly return since 1957, dividends reinvested', 'S&P Dow Jones Indices history'],
        ]}
      />

      <QuizSet title="Check yourself">
        <Quiz
          question="$6,000 a year for 40 years at 1% versus 10.5%. About how much more growth does the 10.5% produce?"
          options={['2 times', '10 times', 'About 52 times', '100 times']}
          correctIndex={2}
          explanation="$2,803,509 of growth versus $53,318 is about 52 times."
        />
        <Quiz
          question="Why show a 7% column when the S&P 500 average is 10.5%?"
          options={['It is the bank rate', 'The future may be lower than the past, and 7% is a more cautious plan', 'It is guaranteed', 'It is the inflation rate']}
          correctIndex={1}
          explanation="Planning with a lower rate protects you if returns disappoint."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          '$6,000 a year for 40 years: $293k at 1%, $642k at 4.5%, $1.2M at 7%, $3.0M at 10.5%.',
          'A few points of rate multiply into a seven-figure gap over decades.',
          'Higher rates come with larger temporary drops. Plan with a cautious rate too.',
          'Know the source of every rate you use.',
        ]}
      />
    </div>
  );
}
