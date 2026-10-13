import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { Formula } from '../../../../components/content/Formula';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function Step10_2_Returns() {
  return (
    <div>
      <StepHeader
        eyebrow="Topic 10 • Returns"
        title="What Rate of Return Does Real Estate Earn?"
        summary="Appreciation, rent and leverage: the three engines, and why a home's return is usually lower than the S&P 500's."
      />

      <Section title="The three engines" />
      <Table
        headers={['Engine', 'What it is', 'Typical size']}
        rows={[
          [<strong key="a">Appreciation</strong>, 'The property rises in value', 'About 4% a year nationally over the long run. It can be negative for years'],
          [<strong key="b">Rent</strong>, 'Income from a tenant, or rent you avoid paying yourself', 'Gross rent is about 4% to 8% of the price a year; much of it goes to costs'],
          [<strong key="c">Leverage</strong>, 'You control a big asset with a small down payment, so gains and losses are magnified', 'A 20% down payment means a 5-to-1 lever'],
        ]}
      />
      <p>
        The long-run nominal return of US residential real estate is about <strong>4.2% a year</strong> (NYU Stern&apos;s
        historical returns dataset, 1928 to 2024), compared with about 10% for the S&amp;P 500 and about 3% inflation. That
        is a real return of just over 1%, before the costs of owning.
      </p>

      <Section title="Leverage: the magnifier" />
      <p>You put $110,000 into a $500,000 condo (down payment plus closing costs). The home rises 4% in a year:</p>
      <Table
        headers={['', 'Amount']}
        align={['left', 'right']}
        rows={[
          ['Home value gain', '$20,000 (4% of $500,000)'],
          ['Your cash put in', '$110,000'],
          ['Gain on your own cash', '18.2%'],
        ]}
      />
      <p>
        A 4% rise on the home is an 18% gain on your cash. But leverage cuts both ways: a 4% <em>fall</em> is an 18% loss, and
        the mortgage interest, taxes and upkeep (about $50,000 in year 1 for this condo) come out first. Leverage magnifies
        results, good and bad. It is not free money.
      </p>
      <Callout type="warning" title="Compare costs honestly">
        A stock index fund costs about 0.03% a year to own. A home costs roughly 3% to 5% of its value a year to own once you
        add mortgage interest, property tax, insurance, repairs and HOA dues, and 6% to 10% to buy and sell. The home has to
        rise a lot just to cover its carrying costs.
      </Callout>

      <Section title="Illustrative returns by type (ranges, not promises)" />
      <Table
        headers={['Type', 'How the return arrives', 'Rough yearly range']}
        rows={[
          ['Your own home', 'Appreciation + rent you avoid, minus costs. Not cash flow', '2% to 6% on the value, before costs'],
          ['Single-family rental', 'Rent minus costs, plus appreciation', '0% to 8% cash-on-cash plus appreciation'],
          ['Multi-family rental', 'Rent minus costs, plus appreciation', '4% to 10% cash-on-cash plus appreciation, with more work'],
          ['REIT index fund', 'Dividends plus price change', 'Long-run results have been near the stock market with similar swings'],
          ['S&P 500 index fund', 'Dividends plus price change', 'About 10% long-run, with no tenants'],
        ]}
      />
      <p className="text-sm text-muted-foreground">Illustrative ranges for learning. Actual results vary widely by place, timing, and management. Check NYU Stern (Damodaran) historical returns and Nareit data for REITs.</p>

      <Section title="Two measures investors use" />
      <Formula label="Cap rate (return on the property, ignoring the loan)">cap rate = yearly net operating income ÷ price</Formula>
      <Formula label="Cash-on-cash return (return on your own cash)">cash-on-cash = yearly cash flow after the mortgage ÷ cash you put in</Formula>
      <p>Step 10.10 uses both for the rental version of the condo.</p>

      <Callout type="info" title="Why people still buy homes">
        A home is not only an investment. It gives stability, protection from rising rent, a place you control and a forced
        saving habit: each payment builds equity. Those are real. Just count the costs, and do not assume a house beats the
        stock market.
      </Callout>

      <QuizSet title="Check yourself">
        <Quiz
          question="Roughly how fast has US residential real estate appreciated, nominally, over the long run?"
          options={['About 1%', 'About 4%', 'About 10%', 'About 20%']}
          correctIndex={1}
          explanation="About 4.2% a year, close to inflation plus a point or so."
        />
        <Quiz
          question="A $500,000 home with $110,000 down rises 4%. What is the gain on your cash, before costs?"
          options={['4%', '10%', '18.2%', '40%']}
          correctIndex={2}
          explanation="$20,000 ÷ $110,000 = 18.2%. Leverage magnifies it."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'Three engines: appreciation (about 4% a year), rent, and leverage.',
          'Leverage magnifies gains and losses. A 4% rise is an 18% gain on a 20% down payment.',
          'A home costs 3% to 5% of its value a year to carry, and 6% to 10% to buy and sell.',
          'Count the costs honestly. A home is shelter first, investment second.',
        ]}
      />
    </div>
  );
}
