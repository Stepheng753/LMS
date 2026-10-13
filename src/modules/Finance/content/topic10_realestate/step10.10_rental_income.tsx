import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { Formula } from '../../../../components/content/Formula';
import { Exercise } from '../../../../components/content/Exercise';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';
import { RentalCashFlow } from '../../calculators';

export default function Step10_10_RentalIncome() {
  return (
    <div>
      <StepHeader
        eyebrow="Topic 10 • Rental Income"
        title="How Rental Income Works"
        summary="Rent is not profit. Between the tenant's check and your bank account sit vacancies, taxes, insurance, repairs and the mortgage."
      />

      <Section title="From rent to cash in your pocket" />
      <p>Say you rent the $500,000 condo for $2,900 a month. Here is where each dollar goes:</p>
      <Table
        headers={['Step', 'Per month', 'Notes']}
        align={['left', 'right', 'left']}
        rows={[
          ['Rent the tenant pays', '$2,900', 'Gross rent'],
          ['Vacancy (5%, about 2.5 weeks a year)', '−$145', 'Empty months between tenants'],
          [<strong key="a">Rent actually collected</strong>, <strong key="b">$2,755</strong>, ''],
          ['Property tax', '−$479', '$5,750 a year'],
          ['Landlord insurance', '−$120', 'Higher than an owner-occupant policy'],
          ['HOA dues', '−$450', 'Owner pays'],
          ['Repairs and upkeep (5% of rent)', '−$145', 'A reserve for plumbing, paint, appliances'],
          [<strong key="c">Net operating income (NOI)</strong>, <strong key="d">$1,561</strong>, 'Before the mortgage'],
          ['Mortgage (principal + interest)', '−$2,528', '$400,000 at 6.5%'],
          [<strong key="e">Cash flow</strong>, <strong key="f">−$967 a month</strong>, 'You top it up from your pocket'],
        ]}
      />
      <Callout type="warning" title="At today's rates this condo does not pay for itself">
        Rented at $2,900, the condo loses $967 a month ($11,604 a year). Rent covers only 77% of the mortgage, tax, insurance
        and HOA. Many properties in expensive markets like San Diego do not cash flow at a 6.5% mortgage rate and 20% down. The investor is betting on
        appreciation, not income. That is a bet, not a paycheck.
      </Callout>

      <Section title="The measures investors use" />
      <Formula label="Cap rate">cap rate = NOI × 12 ÷ price</Formula>
      <Formula label="Cash-on-cash return">cash-on-cash = yearly cash flow ÷ cash invested</Formula>
      <Table
        headers={['Measure', 'The condo as a rental']}
        rows={[
          ['Cap rate', '$1,561 × 12 = $18,730 ÷ $500,000 = 3.7%'],
          ['Cash-on-cash', '−$11,604 ÷ $110,000 = −10.6%'],
          ['What a good one looks like', 'A cap rate above the mortgage rate (so the loan helps, not hurts), and positive cash flow'],
        ]}
      />
      <p>
        A cap rate of 3.7% is below the 6.5% mortgage rate. When the loan costs more than the property earns, leverage works
        <em> against</em> you. Stocks have averaged about 10% with no landlord duties. A rental has to earn its keep.
      </p>

      <Section title="The total return view" />
      <p>Cash flow is only part of the story. In year 1 the condo gives:</p>
      <Table
        headers={['Part', 'Year 1']}
        align={['left', 'right']}
        rows={[
          ['Cash flow (−$967 × 12)', '−$11,604'],
          ['Principal paid down (your equity)', '+$4,471'],
          ['Appreciation at 4%', '+$20,000'],
          [<strong key="a">Total gain</strong>, <strong key="b">about +$12,900</strong>],
          ['On $110,000 of cash', 'about 11.7%'],
        ]}
      />
      <p>
        That looks good, but <strong>all of the profit is the $20,000 appreciation</strong>. If the market is flat, the same year is
        a loss of about $7,100. And the figures ignore tax, selling costs and the effort of managing. Depreciation and rental
        income tax are covered next.
      </p>

      <Section title="Taxes on rental income" />
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>Rent is taxable income.</strong> You report it on Schedule E, after deducting expenses (tax, insurance, HOA, repairs, mortgage interest).</li>
        <li><strong>Depreciation.</strong> The IRS lets you deduct the building&apos;s cost over 27.5 years. On a $500,000 purchase where about $400,000 is the building (not land), that is about <strong>$14,545 a year</strong> of deduction that costs you no cash. It can turn taxable income into a paper loss.</li>
        <li><strong>Recapture.</strong> When you sell, depreciation you took is taxed back at up to 25%.</li>
        <li><strong>Passive loss limits.</strong> Losses from rentals can usually offset only other passive income, with limited exceptions for moderate earners.</li>
        <li><strong>California</strong> taxes the net rental income as ordinary income. A tax professional is worth the fee here.</li>
      </ul>

      <Section title="Try the numbers" />
      <p>Change the rent, vacancy, costs and loan. The presets include renting a room, hiring a manager and a duplex. Watch the cash flow, cap rate and cash-on-cash change.</p>
      <RentalCashFlow />

      <Exercise
        title="Run the numbers on a rental"
        solution={
          <ul className="list-disc pl-5 space-y-1">
            <li>Collected: $3,200 × 0.95 = $3,040. Repairs 5% = $160. Costs: $400 + $100 + $300 + $160 = $960.</li>
            <li>NOI = $3,040 − $960 = <strong>$2,080</strong>. Cash flow = $2,080 − $1,800 = <strong>+$280 a month</strong>.</li>
            <li>Cap rate = $2,080 × 12 ÷ $420,000 = <strong>5.9%</strong>.</li>
            <li>Cash-on-cash = $280 × 12 ÷ $100,000 = <strong>3.4%</strong>.</li>
          </ul>
        }
      >
        <p>A property costs $420,000. Rent is $3,200, vacancy 5%, tax $400, insurance $100, HOA $300, repairs 5% of rent, mortgage $1,800. You put in $100,000. What are the cash flow, the cap rate and the cash-on-cash return?</p>
      </Exercise>

      <QuizSet title="Check yourself">
        <Quiz
          question="What is net operating income (NOI)?"
          options={['Rent minus the mortgage', 'Rent collected minus operating costs, before the mortgage', 'Rent plus appreciation', 'Total tax paid']}
          correctIndex={1}
          explanation="NOI is before the mortgage, so you can judge the property itself."
        />
        <Quiz
          question="A property earns a 3.7% cap rate and the mortgage costs 6.5%. What does leverage do?"
          options={['Helps', 'Works against you', 'Does nothing', 'Eliminates tax']}
          correctIndex={1}
          explanation="Borrowing at a higher rate than the property earns reduces your return."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'Rent minus vacancy, tax, insurance, HOA and repairs is NOI. Minus the mortgage is cash flow.',
          'The $500,000 condo rented for $2,900 loses $967 a month: the profit is appreciation, not income.',
          'Cap rate = NOI × 12 ÷ price. Cash-on-cash = yearly cash flow ÷ cash invested.',
          'Depreciation (about $14,545 a year here) lowers tax but is recaptured at up to 25% on sale.',
        ]}
      />
    </div>
  );
}
