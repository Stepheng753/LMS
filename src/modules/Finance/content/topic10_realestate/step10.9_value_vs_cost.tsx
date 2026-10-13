import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';
import { MortgageCalculator } from '../../calculators';

export default function Step10_9_ValueVsCost() {
  return (
    <div>
      <StepHeader
        eyebrow="Topic 10 • The Example"
        title="Total Cost vs Home Value After 1, 2, 5, 10, 15 and 30 Years"
        summary="Home value grows, the loan shrinks, and the costs pile up. Here is what the $500,000 condo looks like at every milestone."
      />

      <Callout type="info" title="The assumptions">
        $500,000 condo, 20% down, 6.5% for 30 years. The home rises <strong>4%</strong> a year. Property tax follows Prop 13
        (assessed value up 2% a year). Insurance and HOA rise 3% a year. Upkeep is 0.5% of the value. Selling costs 6%.
      </Callout>

      <Section title="The big table" />
      <Table
        headers={['After', 'Home value', 'Loan still owed', 'Your equity', 'Total you paid out', 'Money gone (not equity)', 'Cash if you sold']}
        align={['left', 'right', 'right', 'right', 'right', 'right', 'right']}
        rows={[
          ['1 year', '$520,000', '$395,529', '$124,471', '$154,689', '$50,218', '$93,271'],
          ['2 years', '$540,800', '$390,759', '$150,041', '$199,777', '$90,535', '$117,593'],
          ['5 years', '$608,326', '$374,444', '$233,883', '$337,546', '$211,990', '$197,383'],
          ['10 years', '$740,122', '$339,105', '$401,018', '$576,298', '$415,403', '$356,610'],
          ['15 years', '$900,472', '$290,237', '$610,235', '$828,038', '$618,275', '$556,207'],
          [<strong key="a">30 years</strong>, <strong key="b">$1,621,699</strong>, <strong key="c">$0</strong>, <strong key="d">$1,621,699</strong>, '$1,683,867', '$1,183,867', <strong key="e">$1,524,397</strong>],
        ]}
      />
      <p className="text-sm text-muted-foreground">
        <strong>Total you paid out</strong>: down payment, closing costs, every mortgage payment, property tax, insurance, HOA and upkeep.
        <strong> Money gone</strong>: the part that did not build equity (interest, tax, insurance, HOA, upkeep, closing costs).
        <strong> Cash if you sold</strong>: equity minus 6% selling costs.
      </p>

      <Section title="How to read it" />
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>Year 1 is a loss.</strong> You put in $154,689 and could get back $93,271 by selling. Closing costs and selling costs eat $41,200 immediately. Never buy a home you may sell within 2 to 3 years.</li>
        <li><strong>Equity builds slowly at first.</strong> In 5 years the loan only fell from $400,000 to $374,444. Most of the equity growth in years 1 to 10 is appreciation, not payments.</li>
        <li><strong>Year 10 is a turning point.</strong> Equity of $401,018 means the value, not the paid-off loan, did the heavy lifting: the loan only fell $61,000.</li>
        <li><strong>Year 30 is a milestone.</strong> The loan is gone. The home is worth $1.6 million, and your housing cost is just tax, HOA, insurance and upkeep.</li>
      </ul>

      <Section title="Own vs rent: the money gone" />
      <p>
        A renter&apos;s money is also gone every month. Compare the money gone from owning with the rent a similar condo would cost
        ($2,900 a month, rising 3% a year):
      </p>
      <Table
        headers={['After', 'Owning: money gone', 'Renting: rent paid', 'Owning costs']}
        align={['left', 'right', 'right', 'right']}
        rows={[
          ['1 year', '$50,218', '$34,800', '$15,418 more'],
          ['2 years', '$90,535', '$70,644', '$19,891 more'],
          ['5 years', '$211,990', '$184,758', '$27,232 more'],
          ['10 years', '$415,403', '$398,943', '$16,460 more'],
          ['15 years', '$618,275', '$647,242', '$28,967 less'],
          ['30 years', '$1,183,867', '$1,655,624', '$471,758 less'],
        ]}
      />
      <Callout type="success" title="The break-even is around year 12">
        On these assumptions owning costs a bit more for about the first 12 years, then pulls ahead as rent keeps rising and
        the mortgage payment stays fixed. After 30 years you also own a $1.6 million home. Buying wins <em>if you stay many years</em>.
      </Callout>
      <Callout type="warning" title="The cost the table leaves out">
        The $110,000 you put in at the start could have been invested instead. At 10.5%, $110,000 becomes about $181,000 in 5
        years, $299,000 in 10 and over $2.2 million in 30 (before tax). A fair comparison also invests the renter&apos;s savings.
        Include that and a homeowner needs real appreciation to match the stock market over 30 years. A home is
        often a good <em>forced savings plan and a hedge against rent</em>, not a guaranteed way to beat stocks.
      </Callout>

      <Section title="What if the market is different?" />
      <Table
        headers={['Appreciation per year', 'Value after 10 years', 'Cash if sold after 10 years', 'Value after 30 years']}
        align={['left', 'right', 'right', 'right']}
        rows={[
          ['0% (flat)', '$500,000', '$130,895', '$500,000'],
          ['4% (the long-run average)', '$740,122', '$356,610', '$1,621,699'],
          ['6% (a strong market)', '$895,424', '$502,594', '$2,871,746'],
        ]}
      />
      <p>
        At 0% growth, a 10-year seller nets $130,895 in cash, against the $110,000 put in at the start and $571,283 paid out in total.
        The outcome depends heavily on appreciation, which no one controls.
      </p>

      <Section title="Explore it" />
      <p>
        Start with the defaults, then change the appreciation to 0% and 6%, the rate to 5.5% and 7.5%, and the term to 15 years. Read the table at every milestone, and the
        chart of value versus loan.
      </p>
      <MortgageCalculator mode="full" title="Total cost vs value over 30 years" />

      <QuizSet title="Check yourself">
        <Quiz
          question="Why is selling after one year almost always a loss?"
          options={['Prices always fall', 'Closing costs, selling costs and interest eat a large part of the equity', 'Taxes are very high', 'The bank takes the home']}
          correctIndex={1}
          explanation="About $41,000 of costs hit immediately, and you have built little equity."
        />
        <Quiz
          question="When does owning start to beat renting in this example?"
          options={['Year 1', 'Around year 12', 'Year 30 only', 'Never']}
          correctIndex={1}
          explanation="Rent keeps rising while the mortgage is fixed, so owning pulls ahead after about 12 years."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'Year 1: $154,689 paid out, only $93,271 back if you sell. Never buy a home you may sell within 2 to 3 years.',
          'Year 10: value $740,122, loan $339,105, equity $401,018. Year 30: value $1.62 million, loan zero.',
          'Owning costs a bit more than renting for about 12 years, then pulls ahead, if you stay.',
          'Appreciation drives the result: 0% growth leaves a 10-year seller with $130,895.',
        ]}
      />
    </div>
  );
}
