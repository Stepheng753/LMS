import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Table } from '../../../../components/content/Table';
import { Callout } from '../../../../components/content/Callout';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function StepS_1_Topics1to3() {
  return (
    <div>
      <StepHeader
        eyebrow="Summary • Recap"
        title="Recap: Debt, Income and Credit Cards"
        summary="Topics 1 to 3 in one page: get out of bad debt, earn more with a variable income, and pay cards in full."
      />

      <Section title="Topic 1: Debt" />
      <Table
        headers={['Idea', 'Rule']}
        rows={[
          ['Interest', 'Monthly interest = balance × APR ÷ 12. $5,000 at 22% costs $91.67 a month'],
          ['Bad debt', 'Cards, store cards, car loans, personal loans, buy-now-pay-later: get out'],
          ['Caveat', 'A comfortable mortgage or low-rate education that raises income can be reasonable'],
          ['Method', 'Snowball: minimums on everything, extra to the smallest balance, roll payments forward'],
          ['Extra money', 'Every extra dollar goes to principal. $50 extra on a $5,000, 22% card saves almost $2,000'],
          ['Payoff = return', 'Paying off a 22% card is a guaranteed 22% return'],
        ]}
      />

      <Section title="Topic 2: Income and Expenses" />
      <Table
        headers={['Idea', 'Rule']}
        rows={[
          ['The equation', 'Savings = income − expenses. Spending has a floor, income has no ceiling'],
          ['Philosophy', 'Fixed income covers fixed expenses. Variable income covers variable expenses. Save the rest'],
          ['Variable income', 'You must have it next to your 9-to-5'],
          ['W-2 vs 1099', 'W-2 shares payroll taxes and benefits with the employer. 1099 pays full price: about 14.1% of profit and all benefits'],
          ['Emergency fund', '3 to 6 months of essentials, 6 or more for variable income, in a separate high-yield savings account'],
          ['Raises', 'Half to investing, half to enjoy. Delay new fixed expenses'],
        ]}
      />

      <Section title="Topic 3: Credit Cards" />
      <Table
        headers={['Idea', 'Rule']}
        rows={[
          ['The one rule', 'Never carry a balance. Autopay the full statement balance'],
          ['Dates', 'Billing period, statement closing date, due date at least 21 days later'],
          ['Grace period', 'All or nothing: pay in full for $0 interest'],
          ['Rewards', '1 point is about 1 cent. Never spend extra for rewards'],
          ['Debit vs credit', 'In practice the same: only spend what is already in checking'],
          ['Score', 'Pay on time, utilization under 10%, keep old cards open'],
        ]}
      />

      <Callout type="success" title="The thread">
        Stop paying for the past (debt), earn more than you spend (income), and use the tools that charge interest as if they
        were debit cards (cards).
      </Callout>

      <QuizSet title="Quick check">
        <Quiz
          question="Which is the playbook's debt payoff method?"
          options={['Avalanche', 'Snowball', 'Minimum payments', 'Debt settlement']}
          correctIndex={1}
          explanation="Smallest balance first, rolling each payment forward."
        />
        <Quiz
          question="Fixed income of $5,000 and fixed expenses of $3,800. Is that comfortable under the 50% test?"
          options={['Yes', 'No: 76% of fixed income', 'Cannot tell', 'Only with a side income']}
          correctIndex={1}
          explanation="$3,800 ÷ $5,000 = 76%."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'Get out of bad debt with the snowball. Keep a small cushion while you do.',
          'Fixed covers fixed, variable covers variable. Build a variable income.',
          'Pay cards in full, automatically. That is the whole card strategy.',
        ]}
      />
    </div>
  );
}
