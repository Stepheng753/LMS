import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { Formula } from '../../../../components/content/Formula';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';
import { DebtPayoff } from '../../calculators';

export default function Step1_3_InterestMath() {
  return (
    <div>
      <StepHeader
        eyebrow="Topic 1 • Debt"
        title="The Interest Math: Why Extra Payments Are Powerful"
        summary="How interest is actually charged, why the minimum payment is designed to keep you in debt, and what an extra $50 does."
      />

      <Section title="APR in plain words" />
      <p>
        APR is a yearly rate, but you are charged <strong>every month</strong> (cards, daily). To get the monthly rate,
        divide by 12. A 24% APR is 2% a month.
      </p>
      <Formula label="Monthly rate" where={[{ symbol: 'APR', meaning: 'the yearly rate, as a percent' }, { symbol: 'balance', meaning: 'what you owe right now' }]}>
        interest this month = balance × (APR ÷ 12)
      </Formula>

      <Section title="The minimum payment is a trap by design" />
      <p>
        A card minimum is usually about 1% of the balance <em>plus</em> that month&apos;s interest, or around 2% to 3% of the
        balance. As the balance shrinks, the minimum shrinks, so you stay in debt for decades. The company makes more
        when you pay slowly.
      </p>
      <Callout type="warning" title="A $5,000 card at 22%">
        Pay a flat $125 a month and you are done in about 6 years, with about $4,100 of interest. Pay a shrinking
        minimum and it can take 20 years or more.
      </Callout>

      <Section title="What extra payments do" />
      <p>The same $5,000 card at 22%, paying more than $125 each month:</p>
      <Table
        headers={['Monthly payment', 'Time to pay off', 'Interest paid', 'You saved']}
        align={['left', 'right', 'right', 'right']}
        rows={[
          ['$125 (the base)', '6 years 1 month', '$4,095', 'n/a'],
          ['$175 (+$50)', '3 years 5 months', '$2,147', '$1,948'],
          ['$225 (+$100)', '2 years 5 months', '$1,481', '$2,614'],
          ['$325 (+$200)', '1 year 7 months', '$928', '$3,167'],
        ]}
      />
      <p>
        An extra <strong>$50 a month</strong> cuts the time nearly in half and saves almost $2,000. That is the power of
        attacking the principal: every extra dollar stops that dollar from charging interest for the rest of the loan.
      </p>

      <Section title="Try it on one debt" />
      <p>
        Here is a single $5,000 card. Change the extra payment and watch the months and the interest fall. Edit the rate
        or balance too.
      </p>
      <DebtPayoff debts={[{ name: 'Credit card', balance: 5000, apr: 22, minPayment: 125 }]} extra={50} />

      <Callout type="tip" title="Where to find the extra money">
        <ul className="list-disc pl-5 space-y-1">
          <li>Cancel subscriptions you forgot (list them all once).</li>
          <li>Pause eating out and shopping until the debt is gone.</li>
          <li>Sell things you do not use.</li>
          <li>Add temporary income: extra shifts, freelance, a one-time project (Topic 2).</li>
          <li>Send every raise, bonus and tax refund straight to the debt.</li>
        </ul>
      </Callout>

      <QuizSet title="Check yourself">
        <Quiz
          question="A balance of $1,200 at 18% APR. About how much interest is charged this month?"
          options={['$1.80', '$18', '$216', '$180']}
          correctIndex={1}
          explanation="$1,200 × 18% ÷ 12 = $18."
        />
        <Quiz
          question="Why does an extra payment save so much interest?"
          options={['Banks reward extra payments', 'It reduces the principal, so less of the balance charges interest every month after', 'It lowers the APR', 'It changes the due date']}
          correctIndex={1}
          explanation="Interest is charged on what you still owe. Lower the balance sooner and every later month costs less."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'Monthly interest = balance × APR ÷ 12.',
          'Minimum payments are built to keep you paying for years.',
          'An extra $50 a month on a $5,000, 22% card saves almost $2,000 and about 2.7 years.',
          'Find the money: subscriptions, spending pauses, selling things, temporary income.',
        ]}
      />
    </div>
  );
}
