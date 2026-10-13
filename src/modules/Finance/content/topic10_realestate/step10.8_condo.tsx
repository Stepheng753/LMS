import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { Exercise } from '../../../../components/content/Exercise';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';
import { MortgageCalculator } from '../../calculators';

export default function Step10_8_Condo() {
  return (
    <div>
      <StepHeader
        eyebrow="Topic 10 • The Example"
        title="The $500,000 San Diego Condo: What It Really Costs Each Month"
        summary="The payment you hear about is $2,528. The cost you actually live with is $3,724, and the cash to get in is $110,000 or more."
      />

      <Section title="The purchase" />
      <Table
        headers={['Item', 'Amount']}
        align={['left', 'right']}
        rows={[
          ['Price', '$500,000'],
          ['Down payment (20%)', '$100,000'],
          ['Loan', '$400,000 at 6.5% for 30 years'],
          ['Closing costs (about 2%)', '$10,000'],
          ['Supplemental tax bill (typical, step 10.7)', 'about $1,400'],
          ['Moving, furniture, first repairs', 'plan $3,000 to $10,000'],
          [<strong key="a">Cash needed to start</strong>, <strong key="b">about $115,000 to $120,000</strong>],
        ]}
      />

      <Section title="The monthly cost, year 1" />
      <Table
        headers={['Item', 'Per month', 'How it is figured']}
        align={['left', 'right', 'left']}
        rows={[
          ['Mortgage: principal and interest', '$2,528', '$400,000, 6.5%, 30 years'],
          ['Property tax', '$479', '$500,000 × 1.15% ÷ 12'],
          ['Homeowners insurance (HO-6 for a condo)', '$58', '$700 a year'],
          ['HOA dues', '$450', 'Example. Real condos run $300 to $800+'],
          ['Maintenance and repairs', '$208', '0.5% of the value a year (condos need less than houses)'],
          [<strong key="a">All-in monthly cost</strong>, <strong key="b">$3,724</strong>, ''],
        ]}
      />
      <Callout type="warning" title="The payment that is quoted is 68% of the real cost">
        Only $2,528 of the $3,724 is the mortgage payment. The rest is tax, insurance, HOA and upkeep. And the HOA dues and
        property tax tend to rise. Compare homes by the <strong>all-in</strong> number, not the mortgage payment.
      </Callout>

      <Section title="What it takes to afford it" />
      <Table
        headers={['Check', 'The condo', 'Result']}
        rows={[
          ['Housing at 28% of gross income (PITI + HOA = $3,515)', 'Needs about $150,000 a year', 'Hard on a $100,000 salary'],
          ['Take-home pay on $100,000 (Topic 5, with a modest 401k)', 'About $5,500 to $5,900 a month', 'Housing would be over 60% of take-home'],
          ['Emergency fund still intact after the down payment', '3 to 6 months of $3,724 = $11,000 to $22,000', 'Needs extra savings beyond the $115,000'],
          ['Retirement accounts still being funded', 'The order of operations', 'Do not stop investing to buy'],
        ]}
      />
      <p>
        On a $100,000 salary, this condo is a stretch. It becomes comfortable at about $150,000 of household income, or with a
        partner, a bigger down payment, or a cheaper home. Lenders may approve you for more, but approval is not the same as
        affordable.
      </p>

      <Section title="Rent vs buy, the monthly view" />
      <Table
        headers={['', 'Own the condo', 'Rent a similar one']}
        align={['left', 'right', 'right']}
        rows={[
          ['Monthly cost', '$3,724', '$2,900 (example)'],
          ['What you keep', 'Part becomes equity: $362 of principal in month 1', 'Nothing. The money is gone'],
          ['Cash tied up', '$110,000 or more', '$0 (invest the $110,000 instead)'],
          ['Repair risk', 'Yours (HOA special assessments)', 'The landlord’s'],
          ['Rent rises?', 'Mortgage is fixed. Tax and HOA rise slowly', 'Rent rises about 3% a year'],
        ]}
      />
      <p>
        Owning costs about $824 more a month in year 1, but only about $362 of principal comes back, and the $110,000
        down payment could have been earning about 10% elsewhere. The next lesson puts the whole 30 years side by side.
      </p>

      <Section title="Try the numbers" />
      <p>Change the price, down payment, rate, HOA and tax rate and watch the all-in monthly number.</p>
      <MortgageCalculator mode="payment" title="The $500,000 condo, monthly" />

      <Exercise
        title="Price a different home"
        solution={
          <ul className="list-disc pl-5 space-y-1">
            <li>Loan = $640,000. Payment at 6.5%: about $4,045.</li>
            <li>Tax $800,000 × 1.15% ÷ 12 = $767. Insurance about $150. No HOA. Upkeep 1% of value = $667.</li>
            <li>All-in about <strong>$5,630</strong> a month, and about $160,000 down plus about $16,000 in closing costs.</li>
          </ul>
        }
      >
        <p>Use the calculator for a $800,000 house with 20% down, no HOA, $1,800 a year in insurance and 1% upkeep. What is the all-in monthly cost?</p>
      </Exercise>

      <QuizSet title="Check yourself">
        <Quiz
          question="Which is the better number to compare homes?"
          options={['The mortgage payment', 'The all-in monthly cost including tax, insurance, HOA and upkeep', 'The price per square foot only', 'The down payment']}
          correctIndex={1}
          explanation="The all-in cost is what you really pay each month."
        />
        <Quiz
          question="About how much gross income does a $3,515 housing cost need at the 28% guideline?"
          options={['$50,000', '$100,000', '$150,000', '$300,000']}
          correctIndex={2}
          explanation="$3,515 × 12 ÷ 0.28 = about $150,000."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'The $500,000 condo needs about $115,000 to $120,000 in cash, and costs $3,724 a month all-in.',
          'The mortgage is only 68% of the monthly cost. Tax, insurance, HOA and upkeep make up the rest.',
          'It needs about $150,000 of gross income at the 28% guideline.',
          'Do not stop investing, and do not drain the emergency fund, to buy.',
        ]}
      />
    </div>
  );
}
