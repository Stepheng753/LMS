import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Table } from '../../../../components/content/Table';
import { Callout } from '../../../../components/content/Callout';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function StepS_4_Topics8to9() {
  return (
    <div>
      <StepHeader
        eyebrow="Summary • Recap"
        title="Recap: Compounding and Retirement"
        summary="Topics 8 and 9: growth on growth, inflation, and living off 4%."
      />

      <Section title="Topic 8: Percentages and Compounding" />
      <Table
        headers={['Idea', 'Rule or number']}
        rows={[
          ['Growth factor', 'new = old × (1 + rate). Compound: FV = P × (1 + r)^n'],
          ['The slow build', '$10,000 at the start of each year at 10%: year 1 gain $1,000, year 2 gain $2,100, year 5 gain $6,105'],
          ['40 years', '$10,000 a year at 10%: $4.9 million, with 92% from growth'],
          ['Rule of 72', 'Years to double ≈ 72 ÷ rate. 10.5% doubles in about 7 years'],
          ['Cost of waiting', '$500 a month at 10.5%: $3.04M from 25, $1.09M from 35, $364k from 45'],
          ['Inflation', '3% multiplies prices by 3.26 in 40 years. Real return = (1 + nominal) ÷ (1 + inflation) − 1'],
          ['Future vs purchasing power', '$3.04 million in 40 years is $933,009 in today’s dollars'],
          ['The data', 'S&P 500 about 10% to 10.5% (NYU Stern, S&P Dow Jones), inflation about 3% (BLS)'],
          ['Volatility', 'Same average, different path: +20% then −20% leaves $9,600 from $10,000'],
        ]}
      />

      <Section title="Topic 9: Retirement" />
      <Table
        headers={['Idea', 'Rule or number']}
        rows={[
          ['The method', 'Withdraw about 4% a year, not a huge lump. Spend the growth, keep the tree'],
          ['The thinking', '4% of invested = a year of expenses = a year of growth'],
          ['Your number', 'Invested = yearly expenses ÷ 4%. $60,000 needs $1,500,000'],
          ['Inflation', 'Raise withdrawals with prices. Real balance stays flat when return ≈ withdrawal % + inflation (7%)'],
          ['The margin', 'S&P 500 real return is about 7.3%, above the 7% break-even'],
          ['Sequence risk', 'A crash early in retirement does lasting damage. Be flexible and keep a cash buffer'],
          ['Social Security', 'Lowers the pile: $24,000 a year is worth $600,000 at 4%. Claim between 62 and 70'],
          ['Spend order', 'Brokerage, then traditional, then Roth last'],
          ['The $60,000 life from 25', 'About $804 a month at 10.5%, about $2,043 at 7%'],
        ]}
      />

      <Callout type="success" title="The thread">
        Time and rate do the work, inflation takes some back, and a modest withdrawal percentage turns the pile into a
        paycheck that lasts.
      </Callout>

      <QuizSet title="Quick check">
        <Quiz
          question="You spend $80,000 a year. What pile makes 4% equal your spending?"
          options={['$800,000', '$1,600,000', '$2,000,000', '$3,200,000']}
          correctIndex={2}
          explanation="$80,000 ÷ 0.04 = $2,000,000."
        />
        <Quiz
          question="About how long does money take to double at 9%?"
          options={['6 years', '8 years', '12 years', '18 years']}
          correctIndex={1}
          explanation="72 ÷ 9 = 8."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'Compounding: growth on growth. Start early. Measure in today’s dollars.',
          'Retirement number = yearly expenses ÷ 4%, minus what Social Security covers.',
          'Bad years early in retirement are the main danger. Stay flexible.',
        ]}
      />
    </div>
  );
}
