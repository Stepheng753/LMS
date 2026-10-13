import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { Compare } from '../../../../components/content/Compare';
import { Exercise } from '../../../../components/content/Exercise';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';
import { RentalCashFlow } from '../../calculators';

export default function Step10_11_OffsetOrProfit() {
  return (
    <div>
      <StepHeader
        eyebrow="Topic 10 • Rental Income"
        title="Can Rent Offset the Mortgage, or Even Make a Profit?"
        summary="Yes, with the right rent, the right price and time. Here is the rent you need, and how the picture improves as the years pass."
      />

      <Section title="The rent you need to break even" />
      <p>
        For the $500,000 condo, the costs before rent are the mortgage ($2,528), tax ($479), insurance ($120) and HOA
        ($450), plus vacancy and repairs, which scale with rent (5% each). Setting cash flow to zero:
      </p>
      <Table
        headers={['Monthly rent', 'Cash flow per month', 'Result']}
        align={['left', 'right', 'left']}
        rows={[
          ['$2,900', '−$967', 'You pay about $1,000 a month to hold it'],
          ['$3,500', '−$427', 'Closer'],
          [<strong key="a">$3,975</strong>, <strong key="b">$0</strong>, <strong key="c">Break-even: the tenant pays everything</strong>],
          ['$4,500', '+$473', 'A small profit'],
          ['$5,000', '+$923', 'A real profit'],
        ]}
      />
      <p>
        The tenant needs to pay about <strong>$3,975</strong> for the condo to pay for itself. That is 37% above the $2,900
        market rent in the example. In expensive areas, rents often fall short of the cost of owning.
      </p>

      <Section title="What helps or hurts" />
      <Table
        headers={['Change', 'Effect on cash flow (condo, rented at $2,900)']}
        align={['left', 'right']}
        rows={[
          ['Base case', '−$967'],
          ['Hire a property manager (8% of rent)', '−$1,188'],
          ['Two empty months a year (17% vacancy)', '−$1,315'],
          ['Buy with a 5.5% rate instead of 6.5%', 'payment falls $257, about −$710'],
          ['Put down more cash (smaller loan)', 'cash flow improves, return on cash may fall'],
        ]}
      />

      <Section title="Time is on a landlord's side" />
      <p>
        The mortgage payment is fixed, but rent rises about 3% a year. Property tax rises 2%, and HOA and insurance about 3%. As
        a result, the gap closes. Here is the condo, rented, over the years:
      </p>
      <Table
        headers={['Year', 'Monthly rent', 'Net operating income', 'Mortgage', 'Cash flow']}
        align={['left', 'right', 'right', 'right', 'right']}
        rows={[
          ['1', '$2,900', '$1,561', '$2,528', '−$967'],
          ['10', '$3,784', '$2,089', '$2,528', '−$439'],
          ['20', '$5,085', '$2,879', '$2,528', '+$351'],
          ['30', '$6,834', '$3,957', '$2,528', '+$1,428'],
          ['31 and later', 'rising', 'about $4,000+', '$0 (paid off)', 'about +$4,000+'],
        ]}
      />
      <Callout type="success" title="The long game">
        The condo only starts to pay you around year 16, and after year 30 the mortgage is gone and the net rent is about
        $4,000 a month for as long as you hold it. That is how rental real estate builds lifelong income: a fixed cost
        meeting rising rent. But it takes time, capital, and years of negative or thin cash flow first.
      </Callout>

      <Section title="House hacking: let a tenant pay your mortgage" />
      <p>
        Buy a home you will <strong>live in</strong>, and rent part of it: a spare room, a basement unit, or the other units of a
        duplex or fourplex. You get the low down payment and mortgage rate of a primary home (step 10.1), and the rent offsets your cost.
      </p>
      <Table
        headers={['', 'Without a tenant', 'Renting a room for $1,300']}
        align={['left', 'right', 'right']}
        rows={[
          ['All-in cost of the condo', '$3,724', '$3,724'],
          ['Rent from a roommate', '$0', '−$1,300 (before tax)'],
          [<strong key="a">Your net housing cost</strong>, <strong key="b">$3,724</strong>, <strong key="c">about $2,424</strong>],
        ]}
      />
      <p>
        At $2,424 the condo costs less than renting a similar place ($2,900) while you build equity. A fourplex where three
        units pay rent could cover most or all of the payment on the unit you live in. This is a common first step for
        investors, but you share your home, so privacy and being a landlord are real costs.
      </p>

      <Compare
        goodLabel="Rental income works well when"
        badLabel="It fails when"
        good={
          <>
            <p>The rent covers the mortgage, tax, HOA and a repair reserve.</p>
            <p>You have a large emergency fund for vacancies and repairs.</p>
            <p>You plan to hold for many years and buy below market where possible.</p>
            <p>You will manage it, or budget for a manager.</p>
          </>
        }
        bad={
          <>
            <p>You are counting on appreciation to cover negative cash flow.</p>
            <p>One empty month or a big repair forces you into debt.</p>
            <p>You borrow the down payment or buy with no cushion.</p>
            <p>You assume tenants always pay and never damage the place.</p>
          </>
        }
      />

      <Section title="Compare it with the S&P 500" />
      <Table
        headers={['', 'The rental condo', 'S&P 500 index fund']}
        rows={[
          ['Cash needed', '$110,000+', 'Any amount'],
          ['Income at the start', 'Negative at $2,900 rent', 'Dividends (about 1.5%)'],
          ['Work', 'Tenants, repairs, vacancies, taxes', 'None (automatic)'],
          ['Liquidity', 'Months to sell, 6% cost', 'A day, near zero cost'],
          ['Risk', 'One building, one city', '500 companies'],
          ['Long-run growth', 'About 4% plus rent', 'About 10%'],
        ]}
      />
      <p>
        Real estate can be an excellent addition once the foundation of the playbook is built, especially a home you live in
        or a house hack. As a pure investment it has to beat a low-fee index fund that needs no work. Do the numbers first.
      </p>

      <Section title="Run your own scenarios" />
      <RentalCashFlow />

      <Exercise
        title="What rent do you need?"
        hint={<p>Break-even rent r solves: r × (1 − 0.05 − 0.05) = fixed costs + mortgage.</p>}
        solution={
          <ul className="list-disc pl-5 space-y-1">
            <li>Fixed costs + mortgage = $479 + $120 + $450 + $2,528 = $3,577.</li>
            <li>Rent × 0.90 = $3,577, so rent = <strong>$3,974</strong> to break even.</li>
            <li>To profit $500: rent × 0.90 = $4,077, so rent = <strong>$4,530</strong>.</li>
          </ul>
        }
      >
        <p>With 5% vacancy and 5% repairs (both on rent), what rent gives break-even on the condo? What rent gives a $500 monthly profit?</p>
      </Exercise>

      <QuizSet title="Check yourself">
        <Quiz
          question="About what monthly rent does the $500,000 condo need to break even?"
          options={['$2,000', '$2,900', '$3,975', '$6,000']}
          correctIndex={2}
          explanation="At $3,975 the rent covers mortgage, tax, insurance, HOA, vacancy and repairs."
        />
        <Quiz
          question="What is house hacking?"
          options={['Breaking into a house', 'Living in a property and renting part of it to offset your cost', 'Buying with no money', 'Flipping houses']}
          correctIndex={1}
          explanation="A primary-home loan plus rent from other rooms or units."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'The $500,000 condo needs about $3,975 of rent to break even, and $4,530 for a $500 monthly profit.',
          'Rent rises while the mortgage is fixed: cash flow turns positive around year 16 and the loan ends at year 30.',
          'House hacking cuts your own cost: a $1,300 roommate lowers the condo from $3,724 to about $2,424.',
          'Do not rely on appreciation to cover negative cash flow. Compare with a no-work index fund.',
        ]}
      />
    </div>
  );
}
