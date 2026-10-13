import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { Compare } from '../../../../components/content/Compare';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function Step7_3_Brokerage() {
  return (
    <div>
      <StepHeader
        eyebrow="Topic 7 • Accounts"
        title="The Taxable Brokerage Account"
        summary="The no-limits account. Flexible and simple, but with no special tax break. The last rung of the ladder, not the first."
      />

      <Section title="What it is" />
      <p>
        A brokerage account is a plain investment account at a company like Fidelity, Schwab or Vanguard. You put in
        after-tax money, buy investments, and can sell and withdraw at any time. There are no contribution limits, no
        age rules and no penalties.
      </p>

      <Section title="The trade-off" />
      <Compare
        goodLabel="What you get"
        badLabel="What you give up"
        good={
          <>
            <p><strong>No limits</strong> on how much you put in.</p>
            <p><strong>Total flexibility:</strong> use the money any time, for a house, a business, or retirement before 59½.</p>
            <p>Long-term gains get lower federal rates (0%, 15%, 20%).</p>
            <p>Easy to open, easy to understand.</p>
          </>
        }
        bad={
          <>
            <p><strong>No tax break going in</strong> (unlike a traditional 401k).</p>
            <p>Dividends are taxed each year. Gains are taxed when you sell.</p>
            <p>California taxes every gain as ordinary income.</p>
            <p>It is easy to dip into, which can derail long-term saving.</p>
          </>
        }
      />

      <Section title="How it is taxed (a quick refresher from Topic 4)" />
      <Table
        headers={['Event', 'Tax']}
        rows={[
          ['You buy an investment', 'None'],
          ['It grows but you do not sell', 'None (a paper gain)'],
          ['It pays a dividend', 'Taxed that year. Qualified dividends use the lower rates'],
          ['You sell after more than a year', 'Long-term capital gains: 0%, 15% or 20% federal, plus California income tax'],
          ['You sell within a year', 'Taxed as ordinary income'],
        ]}
      />

      <Callout type="success" title="Why it is last">
        Every account above it on the ladder gives a real tax advantage, so you fill those first. Once they are full
        (or when you need flexibility for goals before retirement, like a home down payment), the brokerage is where
        extra money goes. Hold investments for the long term, such as an S&amp;P 500 index fund (step 7.14), and you will
        owe little tax along the way.
      </Callout>

      <Section title="Brokerage accounts for specific goals" />
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>A house down payment in 5+ years:</strong> a brokerage account for the long part of the timeline, moved to cash a year or two before you buy.</li>
        <li><strong>Retiring before 59½:</strong> a brokerage account is how you bridge the years before retirement-account withdrawals are penalty-free.</li>
        <li><strong>Money under 3 years away:</strong> keep it in a high-yield savings account, not in stocks.</li>
      </ul>

      <Section title="How to open one" />
      <ol className="list-decimal pl-5 space-y-1">
        <li>Pick a large, low-cost provider (Fidelity, Schwab, Vanguard are common choices).</li>
        <li>Open an individual account with your Social Security number and bank details. It takes about 15 minutes.</li>
        <li>Set up an <strong>automatic transfer</strong> on payday.</li>
        <li>Set up <strong>automatic investing</strong> into your chosen fund.</li>
        <li>Turn on the option to reinvest dividends.</li>
      </ol>

      <QuizSet title="Check yourself">
        <Quiz
          question="What is the main reason the taxable brokerage is last in the order of operations?"
          options={['It has high fees', 'It has no tax advantage, so tax-advantaged accounts fill first', 'You cannot withdraw money', 'It has a low limit']}
          correctIndex={1}
          explanation="The retirement and health accounts each give a tax break. The brokerage gives none."
        />
        <Quiz
          question="Which is a good use of a brokerage account?"
          options={['Rent money for next month', 'A goal 10 years away, or retiring before 59½', 'An emergency fund', 'Next year’s vacation']}
          correctIndex={1}
          explanation="Long-term goals that need flexibility. Short-term money belongs in cash."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'A brokerage has no limits and total flexibility, but no tax break on contributions.',
          'Dividends are taxed yearly. Gains are taxed when you sell (California as ordinary income).',
          'It comes last because everything above it has a tax advantage.',
          'Use it for long-term goals before retirement and for money beyond the limits.',
        ]}
      />
    </div>
  );
}
