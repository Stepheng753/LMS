import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { Formula } from '../../../../components/content/Formula';
import { Exercise } from '../../../../components/content/Exercise';
import { Quiz } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';
import { DebtPayoff } from '../../calculators';

export default function Step1_1_WhatDebtCosts() {
  return (
    <div>
      <StepHeader
        eyebrow="Topic 1 • Debt"
        title="What Debt Really Costs"
        summary="Debt is renting money. The rent is called interest, and it is always higher than it feels."
      />

      <p>
        When you borrow, you do not just owe back what you borrowed. You owe it back <strong>plus a fee for the time you
        held it</strong>. That fee is interest. Three words to know before anything else:
      </p>
      <Table
        headers={['Word', 'Meaning', 'Example']}
        rows={[
          [<strong key="a">Principal</strong>, 'The amount you borrowed', '$5,000'],
          [<strong key="b">Interest</strong>, 'The fee, charged on what you still owe', '1 this month'],
          [<strong key="c">APR</strong>, 'Annual Percentage Rate: the yearly cost of the loan, as a percent', '22%'],
        ]}
      />

      <Section title="Start with one month" />
      <p>You owe <strong>$5,000</strong> on a credit card charging <strong>22% APR</strong>.</p>
      <Formula label="Interest for one month">monthly interest = balance × APR ÷ 12</Formula>
      <p>
        $5,000 × 22% ÷ 12 = <strong>$91.67</strong>. If your minimum payment is $125, then $91.67 of it is pure interest
        and only <strong>$33.33</strong> actually reduces what you owe.
      </p>
      <Callout type="warning" title="That is the trap">
        Next month you owe $4,966.67, so interest is a little lower, and a little more goes to principal. Paying a flat
        $125 a month takes <strong>about 6 years</strong> and costs about <strong>$4,100 in interest</strong>
        on a $5,000 purchase. You paid for it almost twice.
      </Callout>

      <Section title="Now scale it up: the same debt over time" />
      <Table
        headers={['Debt', 'Rate', 'Minimum paid only', 'Time', 'Interest paid', 'Total cost']}
        align={['left', 'right', 'right', 'right', 'right', 'right']}
        rows={[
          ['$5,000 credit card', '22%', '$125 a month', 'about 6 years', 'about $4,100', 'about $9,100'],
          ['$2,000 store card', '27%', '$55 a month', 'about 6.5 years', 'about $2,200', 'about $4,200'],
          ['$12,000 personal loan', '14%', '$328 a month', '4 years', 'about $3,750', 'about $15,750'],
          ['$30,000 car loan', '8%', '$608 a month', '5 years', 'about $6,500', 'about $36,500'],
        ]}
      />
      <p>Every row is a real, ordinary debt. In every row, you pay for the thing more than once.</p>

      <Section title="Why debt feels cheap but is not" />
      <ul className="list-disc pl-5 space-y-1">
        <li>The <strong>monthly payment</strong> is small, so it feels affordable. The <strong>total cost</strong> is what matters.</li>
        <li>Interest is charged on the whole balance, every month, so early payments barely dent it.</li>
        <li>Debt takes money from your future self. Every dollar of interest is a dollar that could have been invested.</li>
        <li>Investments earn on average about 10% a year. Credit cards charge about 22%. Paying off a card is a <strong>guaranteed 22% return</strong>, which no investment can promise.</li>
      </ul>

      <Section title="Try it: see the cost on your own numbers" />
      <p>
        The calculator below starts with four ordinary debts. Edit the balances and rates, then compare paying only the
        minimums with paying extra. Look at the interest totals.
      </p>
      <DebtPayoff />

      <Exercise
        title="Work out the interest yourself"
        hint={<p>Use monthly interest = balance × APR ÷ 12.</p>}
        solution={
          <p>
            $3,000 × 18% ÷ 12 = <strong>$45</strong> of interest in the first month. If the minimum payment is $90, then $45
            reduces the debt. It takes about 4 years and about $1,200 of interest to pay it off at the minimum.
          </p>
        }
      >
        <p>You owe $3,000 at 18% APR and your minimum payment is $90. How much interest do you pay in the first month, and how much of your payment reduces the debt?</p>
      </Exercise>

      <Quiz
        question="On a $4,000 card at 24% APR, about how much interest is charged in one month?"
        options={['$8', '$80', '$960', '$24']}
        correctIndex={1}
        explanation="$4,000 × 24% ÷ 12 = $80. The yearly interest would be $960, and monthly is that divided by 12."
      />

      <KeyTakeaways
        items={[
          'Debt is renting money. Interest is the rent, charged on what you still owe.',
          'Monthly interest = balance × APR ÷ 12.',
          'Paying only the minimum can cost nearly double the purchase price.',
          'Paying off a 22% card is a guaranteed 22% return, better than any investment.',
        ]}
      />
    </div>
  );
}
