import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { Compare } from '../../../../components/content/Compare';
import { Steps } from '../../../../components/content/Steps';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';
import { CompoundCalculator } from '../../calculators';

export default function Step7_14_Sp500() {
  return (
    <div>
      <StepHeader
        eyebrow="Topic 7 • What to Hold"
        title="The Playbook Strategy: S&P 500, Set It and Forget It"
        summary="Every account holds the same thing: a low-cost S&P 500 index fund. Buy it automatically, never sell, and let time work."
      />

      <Callout type="warning" title="This is a personal strategy">
        This is the playbook&apos;s own investment strategy, not a recommendation for everyone. It is simple and has worked
        well historically, but it carries real risk, including large temporary losses. Read the risks below before you
        commit money you cannot afford to see drop in value.
      </Callout>

      <Section title="What the S&P 500 is" />
      <p>
        The <strong>S&amp;P 500</strong> is a list of about 500 of the largest companies in the United States. Together they
        make up roughly 80% of the value of the US stock market. The index is weighted by company size, so the biggest
        companies matter most. When you own the S&amp;P 500, you own a tiny slice of all of them.
      </p>
      <p>
        An <strong>index fund</strong> buys every company in the index automatically. There is no manager picking stocks. You
        get the average result of the 500 largest US companies, at a tiny fee.
      </p>

      <Section title="The strategy, in five rules" />
      <Steps
        steps={[
          { title: 'One fund: an S&P 500 index fund', children: <p>In every account: Roth IRA, 401k, HSA investment, brokerage. No individual stocks, no trading, no timing.</p> },
          { title: 'Buy it automatically, every month', children: <p>A fixed amount on payday, whatever the market is doing. This is called dollar-cost averaging: you buy more shares when prices are low and fewer when they are high.</p> },
          { title: 'Reinvest every dividend', children: <p>Turn on automatic reinvestment so dividends buy more shares.</p> },
          { title: 'Never sell in a crash', children: <p>The big losses are temporary if you hold. Selling in a drop turns a temporary loss into a permanent one.</p> },
          { title: 'Check once a year, not once a day', children: <p>Raise the contribution when your pay rises. Otherwise leave it alone. Ignore the news.</p> },
        ]}
      />

      <Section title="The track record" />
      <Table
        headers={['Measure', 'Number', 'Source']}
        rows={[
          ['Average yearly return since the index began (1957)', 'about 10.5%', 'S&P 500 total return history, dividends reinvested'],
          ['Average yearly return, 1928 to 2024', 'about 10%', 'NYU Stern (Damodaran) historical returns'],
          ['Average inflation over the same long period', 'about 3%', 'US Bureau of Labor Statistics, CPI'],
          ['So the real return after inflation', 'about 7%', '1.105 ÷ 1.03 − 1'],
        ]}
      />
      <p>
        At 10.5% a year, money doubles about every 7 years. After inflation, at about 7% real, it still doubles every 10
        years. Topic 8 shows the full future value and purchasing power in detail.
      </p>

      <Section title="The risk: it is not a smooth line" />
      <p>Averages hide the pain. The S&amp;P 500 has fallen hard several times, before recovering:</p>
      <Table
        headers={['Period', 'Peak-to-bottom fall (approx.)', 'What a $100,000 balance became at the low']}
        align={['left', 'right', 'right']}
        rows={[
          ['2000 to 2002 (dot-com bust)', 'about −49%', 'about $51,000'],
          ['2007 to 2009 (financial crisis)', 'about −57%', 'about $43,000'],
          ['February to March 2020 (COVID)', 'about −34% in five weeks', 'about $66,000'],
          ['2022 (rates and inflation)', 'about −25%', 'about $75,000'],
        ]}
      />
      <Callout type="warning" title="Can you hold through a 50% drop?">
        Seeing $100,000 become $50,000 is a real test. The people who lose money in the S&amp;P 500 are the ones who
        sell at the bottom. Every one of those drops was followed by new highs, but that is history, not a promise. If a
        50% drop would make you panic, you have too much in stocks for your stomach.
      </Callout>
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>Never invest money you need within about 5 years.</strong> A house down payment next year belongs in cash.</li>
        <li><strong>A flat decade can happen.</strong> The S&amp;P 500 was roughly flat from 2000 to 2012 in dollars, and down after inflation.</li>
        <li><strong>One country, large companies only.</strong> You own no international stocks or bonds in this strategy. Some people add them for diversification. This playbook keeps it simple and relies on the broad reach of 500 global companies.</li>
        <li><strong>Near and in retirement</strong> the picture changes: a crash early in retirement is the biggest danger (Topic 9).</li>
      </ul>

      <Section title="Why not pick stocks or hire a manager?" />
      <Compare
        goodLabel="Index fund"
        badLabel="Stock picking and active funds"
        good={
          <>
            <p>Gets the market&apos;s return at a fee of about 0.03% a year.</p>
            <p>Needs no skill or time. It is hard to do badly with.</p>
            <p>Holds the winners automatically as they grow.</p>
          </>
        }
        bad={
          <>
            <p>Fees of 0.5% to 1% or more a year.</p>
            <p>Most professional managers lose to the S&amp;P 500 over 15 years. S&amp;P&apos;s own SPIVA reports show roughly 85% to 90% of large-cap funds trailing the index over that time.</p>
            <p>Takes time, nerves and luck, and mistakes are expensive.</p>
          </>
        }
      />

      <Section title="Fees: a tiny number with a huge effect" />
      <p>
        The expense ratio is the yearly fee as a percent of your balance. Look at $6,000 a year ($500 a month) invested for 30
        years at a 10% market return before fees:
      </p>
      <Table
        headers={['Fund type', 'Fee', 'Ending balance', 'Lost to fees']}
        align={['left', 'right', 'right', 'right']}
        rows={[
          ['S&P 500 index fund', '0.03%', '$981,376', 'about $300 a year at the end'],
          ['Typical actively managed fund', '1.00%', '$817,845', '$163,531 less than the index fund'],
        ]}
      />
      <p>
        A 1% fee sounds small. Over 30 years it cost <strong>$163,531</strong>, about 17% of the whole result. Always check
        the expense ratio. For an S&amp;P 500 fund it should be about 0.02% to 0.05%.
      </p>

      <Section title="What to buy (examples, not endorsements)" />
      <Table
        headers={['Kind', 'Examples', 'Notes']}
        rows={[
          [<strong key="a">ETF</strong>, 'VOO, IVV, SPY', 'Trades like a stock. Bought at any broker'],
          [<strong key="b">Mutual fund</strong>, 'FXAIX (Fidelity), SWPPX (Schwab), VFIAX (Vanguard)', 'Buy in dollar amounts, which makes automatic investing easy'],
          [<strong key="c">In a 401k</strong>, 'The plan’s S&amp;P 500 or large-cap index option', 'If none, pick the lowest-fee broad US index fund'],
        ]}
      />
      <p className="text-sm text-muted-foreground">These are examples for learning, not a recommendation to buy a specific product. Fees and funds change. Check the current expense ratio and read the fund&apos;s summary before you buy.</p>

      <Section title="See what $500 a month becomes" />
      <p>
        The calculator starts with $500 a month ($6,000 a year) at 10.5% for 40 years: ages 25 to 65. Change the amount,
        the rate and the years. The next topic turns this into a deep study of compounding.
      </p>
      <CompoundCalculator start={0} yearly={6000} rate={10.5} years={40} title="Set it and forget it: $500 a month into the S&P 500" showInflation />

      <QuizSet title="Check yourself">
        <Quiz
          question="What does an S&P 500 index fund do?"
          options={['Picks the best 10 stocks', 'Buys the roughly 500 largest US companies automatically', 'Guarantees 10% a year', 'Invests only in bonds']}
          correctIndex={1}
          explanation="An index fund copies the index automatically, at very low cost."
        />
        <Quiz
          question="A $100,000 S&P 500 balance falls 50% in a crash. What does the playbook say to do?"
          options={['Sell everything', 'Keep buying on schedule and do not sell', 'Switch to cash', 'Stop contributing for 10 years']}
          correctIndex={1}
          explanation="Selling locks in the loss. Continued buying picks up shares at lower prices."
        />
        <Quiz
          question="A 1% yearly fee vs 0.03% on $6,000 a year for 30 years at 10% costs about how much?"
          options={['$1,631', '$16,353', '$163,531', '$1,635,310']}
          correctIndex={2}
          explanation="$981,376 versus $817,845, a gap of $163,531."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'The strategy: an S&P 500 index fund in every account, bought automatically each month, never sold, checked once a year.',
          'History: about 10% to 10.5% a year, about 7% after inflation. It includes drops of 25% to 57%.',
          'Never invest money you need within about 5 years. Be sure you can hold through a 50% drop.',
          'Fees matter: 0.03% vs 1% cost about $163,000 over 30 years on $500 a month.',
          'This is a personal strategy with real risk. It is not a guarantee.',
        ]}
      />
    </div>
  );
}
