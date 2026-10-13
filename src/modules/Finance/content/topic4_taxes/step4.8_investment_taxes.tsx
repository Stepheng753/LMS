import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function Step4_8_InvestmentTaxes() {
  return (
    <div>
      <StepHeader
        eyebrow="Topic 4 • Income Tax"
        title="Taxes on Investments"
        summary="Capital gains, dividends, and why the account you invest through matters as much as what you invest in."
      />

      <Section title="Two kinds of profit" />
      <Table
        headers={['Kind', 'What it is', 'Taxed']}
        rows={[
          [<strong key="a">Capital gain</strong>, 'You sell for more than you paid', 'Only when you sell (a gain on paper is not taxed)'],
          [<strong key="b">Dividend or interest</strong>, 'Cash an investment pays you', 'In the year you receive it'],
        ]}
      />

      <Section title="Short-term vs long-term" />
      <p>
        If you hold an investment for <strong>one year or less</strong> before selling, the gain is short-term and is taxed like
        ordinary income (up to 37%). If you hold it <strong>more than one year</strong>, the gain is long-term and gets a lower
        rate.
      </p>
      <Table
        headers={['Rate', 'Single (taxable income)', 'Married filing jointly']}
        rows={[
          ['0%', 'up to $49,450', 'up to $98,900'],
          ['15%', '$49,450 to $545,500', '$98,900 to $613,700'],
          ['20%', 'over $545,500', 'over $613,700'],
        ]}
      />
      <p className="text-sm text-muted-foreground">2026 long-term capital gains thresholds, IRS Revenue Procedure 2025-32. Qualified dividends use the same rates. A 3.8% net investment income tax is added above $200,000 (single) or $250,000 (married) of income.</p>

      <Section title="What holding for a year is worth" />
      <p>You sell stock for a $10,000 gain, and your other income puts you in the 22% bracket:</p>
      <Table
        headers={['Held', 'Federal tax on $10,000', 'You keep']}
        align={['left', 'right', 'right']}
        rows={[
          ['11 months (short-term)', '$2,200 (22%)', '$7,800'],
          ['13 months (long-term)', '$1,500 (15%)', '$8,500'],
          ['13 months, but your taxable income is low (0% bracket)', '$0', '$10,000'],
        ]}
      />
      <p>Two months of patience saved $700. This is one of the easiest tax savings there is.</p>

      <Callout type="warning" title="California taxes it all as ordinary income">
        California has no special capital gains rate. A gain is added to your income and taxed at your California
        bracket, 6% to 12.3% for most people. Federal long-term rates are lower. State tax does not care how long you held.
      </Callout>

      <Section title="Where you hold it matters" />
      <Table
        headers={['Account', 'Tax while it grows', 'Tax when you take it out']}
        rows={[
          [<strong key="a">Taxable brokerage</strong>, 'Dividends taxed each year. Gains taxed when you sell', 'The gains are taxed as above'],
          [<strong key="b">Traditional 401k / IRA</strong>, 'None', 'All of it taxed as ordinary income'],
          [<strong key="c">Roth 401k / IRA</strong>, 'None', 'None, if the rules are followed'],
          [<strong key="d">HSA</strong>, 'None federally (California taxes it)', 'None for medical costs'],
        ]}
      />
      <p>
        Inside a 401k or IRA you can trade as much as you like with no tax. That is one reason the tax-advantaged
        accounts come before the taxable brokerage in the order of operations.
      </p>

      <Section title="A few useful rules" />
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>Losses offset gains.</strong> If you lose $4,000 on one stock and gain $10,000 on another, you are taxed on $6,000. Extra losses can reduce income by up to $3,000 a year, with the rest carried forward.</li>
        <li><strong>Wash sale rule.</strong> You cannot claim a loss if you buy the same investment within 30 days before or after selling it.</li>
        <li><strong>Index funds are tax-friendly.</strong> They trade rarely, so they send you few taxable surprises (Topic 7).</li>
        <li><strong>Do not let taxes drive the decision.</strong> Never hold a bad investment only to avoid a tax bill.</li>
      </ul>

      <QuizSet title="Check yourself">
        <Quiz
          question="You sell a stock you held for 8 months at a profit. How is the gain taxed federally?"
          options={['At 0%', 'At the long-term rate of 15%', 'As ordinary income', 'Not taxed']}
          correctIndex={2}
          explanation="One year or less is short-term, taxed like ordinary income."
        />
        <Quiz
          question="Does California give a lower tax rate for long-term capital gains?"
          options={['Yes, 15%', 'Yes, 0%', 'No, it taxes them as ordinary income', 'California does not tax gains']}
          correctIndex={2}
          explanation="California has no preferential capital gains rate."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'Gains are taxed when you sell. Hold over a year for the long-term rates of 0%, 15% or 20%.',
          'A $10,000 gain: $2,200 short-term vs $1,500 long-term in the 22% bracket.',
          'California taxes all gains as ordinary income.',
          'Inside a 401k, IRA or HSA you trade without tax. That is why they come first.',
        ]}
      />
    </div>
  );
}
