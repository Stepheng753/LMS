import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Table } from '../../../../components/content/Table';
import { Callout } from '../../../../components/content/Callout';
import { QuizSet, Quiz, MultiSelectQuiz, FillInQuiz } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function Step8_13_CheatSheet() {
  return (
    <div>
      <StepHeader
        eyebrow="Topic 8 • Cheat Sheet"
        title="Topic 8 Cheat Sheet and Quiz"
        summary="Compounding on one page, then a check."
      />

      <Section title="The formulas" />
      <Table
        headers={['What', 'Formula', 'Example']}
        rows={[
          ['Percent of a number', 'X × percent ÷ 100', '10% of $10,000 = $1,000'],
          ['Growth factor', 'new = old × (1 + rate)', '$10,000 × 1.10 = $11,000'],
          ['Compound growth', 'FV = P × (1 + r)^n', '$10,000 at 10% for 40 years = $452,593'],
          ['Rule of 72', 'years to double ≈ 72 ÷ rate', '72 ÷ 10 = 7.2 years'],
          ['Real return', '(1 + nominal) ÷ (1 + inflation) − 1', '1.105 ÷ 1.03 − 1 = 7.3%'],
          ['Deflate a future amount', 'amount ÷ (1 + inflation)^years', '$3,043,509 ÷ 3.26 = $933,009'],
          ['CAGR', '(end ÷ start)^(1/years) − 1', '1,000 to 5,000 in 25 years = 6.65%'],
        ]}
      />

      <Section title="The numbers to remember" />
      <Table
        headers={['Fact', 'Number']}
        rows={[
          ['S&P 500 long-run average (total return)', 'about 10% to 10.5%'],
          ['Inflation long-run average', 'about 3%'],
          ['Real return of the S&P 500', 'about 7%'],
          ['$10,000 a year at 10% for 40 years', 'about $4.9 million, with 92% from growth'],
          ['$500 a month at 10.5% from age 25 to 65', '$3,043,509, or $933,009 in today’s dollars'],
          ['Same plan started at 35', '$1,085,289: waiting 10 years cost about $1.96 million'],
          ['A $100 item in 40 years at 3% inflation', '$326'],
        ]}
      />

      <Callout type="success" title="The big idea">
        Start early, keep the percentage working, and measure the result in today&apos;s dollars. Time and rate do most of the
        work. Your job is to start, keep going, and not interrupt the process.
      </Callout>

      <QuizSet title="Topic 8 Quiz">
        <Quiz
          question="$10,000 at 8% compounded for 3 years is about:"
          options={['$12,400', '$12,597', '$13,000', '$24,000']}
          correctIndex={1}
          explanation="$10,000 × 1.08^3 = $12,597."
        />
        <Quiz
          question="About how long does money take to double at 9%?"
          options={['6 years', '8 years', '12 years', '18 years']}
          correctIndex={1}
          explanation="72 ÷ 9 = 8 years."
        />
        <Quiz
          question="In the $10,000-a-year example, why is year 2 growth ($2,100) more than double year 1 growth ($1,000)?"
          options={['The rate rose', 'You earn on last year’s earnings too', 'Fees fell', 'Luck']}
          correctIndex={1}
          explanation="The base is bigger, so the same rate yields more dollars."
        />
        <MultiSelectQuiz
          question="Which of these reduce the final result of a 40-year plan? (Pick all)"
          options={['Starting 10 years later', 'A lower rate of return', 'Higher fees', 'Investing a bit more each year']}
          correctIndexes={[0, 1, 2]}
          explanation="More money invested helps the result."
        />
        <FillInQuiz
          question="At 3% inflation, prices multiply by about ___ in 40 years."
          answer="3.26"
          explanation="1.03 to the 40th power is about 3.26."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'Growth factor and compounding: FV = P × (1 + r)^n. Rule of 72 for a quick estimate.',
          '$500 a month at 10.5% from 25 to 65: $3.04 million, about $933,000 in today’s dollars.',
          'Start early. Waiting 10 years can cost about two million dollars.',
          'Use total return, real numbers, and check the source.',
        ]}
      />
    </div>
  );
}
