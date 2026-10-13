import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function Step9_7_OtherIncome() {
  return (
    <div>
      <StepHeader
        eyebrow="Topic 9 • The Whole Picture"
        title="Social Security, Health Care and Taxes in Retirement"
        summary="Three things that change your number: guaranteed income that lowers it, and health costs and taxes that raise it."
      />

      <Section title="Social Security lowers the number you need" />
      <p>
        Social Security pays a monthly check for life, adjusted for inflation. It does not replace your income, but it covers
        part of your spending, so your investments only have to cover the rest.
      </p>
      <Table
        headers={['', 'Without Social Security', 'With $24,000 a year of Social Security']}
        align={['left', 'right', 'right']}
        rows={[
          ['Yearly spending', '$60,000', '$60,000'],
          ['Social Security', '$0', '$24,000'],
          ['Investments must cover', '$60,000', '$36,000'],
          ['Pile needed at 4%', '$1,500,000', '$900,000'],
        ]}
      />
      <p>
        A $24,000 check is worth $600,000 of investments at 4%. Get your own estimate for free at ssa.gov by creating an
        account. Plan on the estimate, but also test the plan with a lower number: the program has funding questions,
        and the law could change.
      </p>
      <Table
        headers={['When you claim', 'Effect on the monthly check']}
        rows={[
          ['At 62 (earliest)', 'About 30% less than at full retirement age'],
          ['At 67 (full retirement age, born 1960 or later)', '100% of your benefit'],
          ['At 70 (latest useful)', 'About 24% more than at 67, for life'],
        ]}
      />
      <p>
        Waiting increases a check that is inflation-adjusted for life. If you are healthy and have other money to live on in
        your 60s, delaying is one of the best guaranteed returns available.
      </p>

      <Section title="Health care costs more as you age" />
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>Before 65</strong> there is no Medicare. If you retire early you must buy coverage (Covered California, COBRA, a spouse&apos;s plan). Budget $10,000 to $25,000 a year for a couple.</li>
        <li><strong>At 65</strong> Medicare begins. Part B (doctors) has a monthly premium, and you will likely add a supplement or Advantage plan. Plan for a few thousand dollars a year per person at the start.</li>
        <li><strong>Long-term care</strong> (a nursing home or home aide) can cost $80,000 to $120,000 a year or more. Many people self-insure with a large pile, or consider long-term-care coverage in their 50s.</li>
        <li><strong>An HSA</strong> (Topic 7) funded for decades is the best tool for paying these costs tax-free.</li>
      </ul>

      <Section title="Taxes in retirement" />
      <Table
        headers={['Where the money comes from', 'How it is taxed']}
        rows={[
          [<strong key="a">Roth withdrawals</strong>, 'Tax-free, and they do not raise your income for other calculations'],
          [<strong key="b">Traditional 401k and IRA</strong>, 'Taxed as ordinary income at your bracket'],
          [<strong key="c">Brokerage account</strong>, 'Only the gains, at long-term rates (0%, 15% or 20% federal; California ordinary rates)'],
          [<strong key="d">Social Security</strong>, 'Up to 85% can be federally taxable depending on your other income. California does not tax it'],
          [<strong key="e">HSA, for medical costs</strong>, 'Tax-free'],
        ]}
      />
      <Callout type="success" title="Another reason for the Roth">
        A retiree with only traditional money pays tax on every withdrawal, and a larger share of Social Security becomes
        taxable. A retiree with a big Roth balance can spend $60,000 and owe little or no income tax. That is the control
        the playbook buys when it chooses Roth in step 7.9.
      </Callout>

      <Section title="Putting it together" />
      <Table
        headers={['Step', 'Example']}
        rows={[
          ['1. Yearly spending in today’s dollars', '$60,000'],
          ['2. Add health costs if you retire before Medicare', '+$15,000 until 65'],
          ['3. Subtract guaranteed income', '− $24,000 Social Security'],
          ['4. Divide what is left by 4%', '$36,000 ÷ 0.04 = $900,000'],
          ['5. Add a cushion for taxes and surprises', 'Round up, or use 3.5%'],
        ]}
      />

      <QuizSet title="Check yourself">
        <Quiz
          question="You spend $50,000 a year and expect $20,000 of Social Security. At a 4% withdrawal, what pile do your investments need?"
          options={['$500,000', '$750,000', '$1,250,000', '$1,750,000']}
          correctIndex={1}
          explanation="$50,000 − $20,000 = $30,000, and $30,000 ÷ 0.04 = $750,000."
        />
        <Quiz
          question="Delaying Social Security from 67 to 70 raises the monthly check by about:"
          options={['0%', '8%', '24%', '50%']}
          correctIndex={2}
          explanation="About 8% for each year of delay, so about 24% in total."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'Social Security lowers the pile you need: $24,000 a year is worth $600,000 at 4%.',
          'Claiming at 62 cuts the check about 30%. Waiting to 70 raises it about 24% over age 67.',
          'Budget for health care, especially before Medicare at 65 and for long-term care.',
          'A large Roth balance lowers retirement taxes and keeps Social Security less taxed.',
        ]}
      />
    </div>
  );
}
