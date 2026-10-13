import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';
import { MortgageCalculator } from '../../calculators';

export default function Step10_5_Pmi() {
  return (
    <div>
      <StepHeader
        eyebrow="Topic 10 • The Mortgage"
        title="The Down Payment and PMI"
        summary="Put down less than 20% and the lender charges mortgage insurance that protects the lender, not you."
      />

      <Section title="What PMI is" />
      <p>
        <strong>Private mortgage insurance (PMI)</strong> is a monthly fee added when your down payment is under 20%. It protects
        the <em>lender</em> if you stop paying. It costs about 0.5% to 1% of the loan a year, and it ends when your loan falls to
        80% of the home&apos;s original value (you can ask to remove it, and it ends automatically at 78%).
      </p>

      <Section title="The condo: 20% down vs 5% down" />
      <Table
        headers={['', '20% down', '5% down']}
        align={['left', 'right', 'right']}
        rows={[
          ['Down payment', '$100,000', '$25,000'],
          ['Loan', '$400,000', '$475,000'],
          ['Principal and interest (6.5%)', '$2,528', '$3,002'],
          ['PMI (0.6% of the loan a year)', '$0', '$238 a month'],
          ['Tax, insurance, HOA, upkeep (year 1)', '$1,195', '$1,195'],
          [<strong key="a">All-in monthly cost</strong>, <strong key="b">$3,724</strong>, <strong key="c">$4,436</strong>],
          ['PMI ends after', 'n/a', 'about 124 months (10 years)'],
          ['Total interest over 30 years', '$510,178', 'about $606,000'],
        ]}
      />
      <p>
        Putting down $75,000 less costs about <strong>$712 more every month</strong>, and about $29,500 in PMI before it ends.
        On the other hand, $75,000 left in the market at 10.5% for 10 years becomes about $204,000. So PMI is not automatically
        bad, but it is an expensive way to borrow, and it makes the monthly payment harder.
      </p>

      <Callout type="info" title="The tradeoff">
        A bigger down payment gives a smaller loan, no PMI and a lower payment, but leaves you with less cash. A smaller down
        payment keeps cash for your emergency fund and investments but costs more per month. Never drain your emergency fund
        for a down payment. A home without a cushion is fragile.
      </Callout>

      <Section title="Ways people lower the down payment" />
      <Table
        headers={['Option', 'What it is', 'Watch out for']}
        rows={[
          ['FHA loan', 'Government-insured, as little as 3.5% down, easier credit rules', 'Mortgage insurance for the life of the loan in many cases'],
          ['Conventional 3% to 5% down', 'Standard loan with PMI', 'PMI until about 20% equity'],
          ['First-time buyer programs', 'State and local grants or low-rate loans (California and San Diego have some)', 'Income limits and rules, check eligibility'],
          ['Gift from family', 'A parent contributes', 'The lender needs a gift letter'],
          ['Never: drain a retirement account', 'Early withdrawals can be penalized and lose decades of growth', 'Avoid. A Roth IRA contribution withdrawal is the one gentle exception'],
        ]}
      />

      <Section title="Compare the down payments" />
      <p>Switch the down payment between 3.5%, 5%, 10% and 20% and watch the monthly cost and the PMI line.</p>
      <MortgageCalculator mode="payment" initial={{ downPct: 5 }} title="5% down on the $500,000 condo" />

      <QuizSet title="Check yourself">
        <Quiz
          question="Whom does PMI protect?"
          options={['You', 'The lender', 'The seller', 'The HOA']}
          correctIndex={1}
          explanation="PMI protects the lender if you default, but you pay for it."
        />
        <Quiz
          question="When can PMI be removed on a conventional loan?"
          options={['Never', 'When you reach about 20% equity (the loan is 80% of the original value)', 'After 1 year', 'Only when you sell']}
          correctIndex={1}
          explanation="You can ask to remove it at 80% and it ends automatically at 78%."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'PMI is a monthly fee under 20% down. It protects the lender and ends near 80% of the original value.',
          'The condo at 5% down costs about $712 a month more than at 20% down.',
          'A bigger down payment is safer. Never drain the emergency fund or retirement accounts for it.',
          'FHA and first-time buyer programs can lower the entry, with trade-offs.',
        ]}
      />
    </div>
  );
}
