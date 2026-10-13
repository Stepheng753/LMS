import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Table } from '../../../../components/content/Table';
import { Callout } from '../../../../components/content/Callout';
import { QuizSet, Quiz, MultiSelectQuiz, FillInQuiz } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function Step4_10_CheatSheet() {
  return (
    <div>
      <StepHeader
        eyebrow="Topic 4 • Cheat Sheet"
        title="Topic 4 Cheat Sheet and Quiz"
        summary="Taxes on one page, then a check."
      />

      <Section title="The numbers (2026)" />
      <Table
        headers={['Item', 'Single', 'Married filing jointly']}
        rows={[
          ['Federal standard deduction', '$16,100', '$32,200'],
          ['Federal brackets', '10%, 12%, 22%, 24%, 32%, 35%, 37%', 'about double the single thresholds'],
          ['California standard deduction', '$5,900', '$11,800'],
          ['California brackets', '1% to 12.3%, nine of them', 'double the single thresholds'],
          ['Child tax credit', '$2,200 each, under 17', 'same'],
          ['Self-employment tax', '15.3% of 92.35% of profit', 'same'],
          ['Long-term capital gains', '0% to $49,450, 15% to $545,500', '0% to $98,900, 15% to $613,700'],
        ]}
      />

      <Section title="The ideas" />
      <Table
        headers={['Idea', 'In one line']}
        rows={[
          ['Marginal vs effective', 'Marginal is the rate on your last dollar. Effective is total tax ÷ income'],
          ['Brackets', 'Fill buckets. Each bucket has its own rate. A raise never lowers pay'],
          ['Deduction vs credit', 'A $1,000 deduction saves your rate × $1,000. A $1,000 credit saves $1,000'],
          ['Single vs married', 'Equal earners pay the same. One big earner saves a lot as a couple'],
          ['1099', 'Set aside 25% to 30%. Pay quarterly: Apr 15, Jun 15, Sep 15, Jan 15'],
          ['Investments', 'Hold over a year for lower federal rates. California taxes all gains as income'],
          ['Filing', 'Due April 15. Aim for a small refund. Keep records at least 3 years'],
        ]}
      />

      <Callout type="success" title="The big idea">
        The tax system is a set of rules you can plan around. The highest-value moves are: contribute where the rules
        reward you (401k, IRA, HSA), claim every credit, and hold investments over a year.
      </Callout>

      <QuizSet title="Topic 4 Quiz">
        <Quiz
          question="A single person has $83,900 of taxable income. What is the marginal federal rate in 2026?"
          options={['12%', '22%', '24%', '32%']}
          correctIndex={1}
          explanation="$83,900 is between $50,400 and $105,700, the 22% bracket."
        />
        <Quiz
          question="Which saves more: a $1,000 deduction at 22% or a $300 credit?"
          options={['The deduction ($220)', 'The credit ($300)', 'Equal', 'Neither']}
          correctIndex={1}
          explanation="$1,000 × 22% = $220, which is less than $300."
        />
        <Quiz
          question="How should a freelancer protect against a surprise tax bill?"
          options={['Hope', 'Save 25% to 30% of each payment and pay quarterly', 'Wait until April', 'Ask the client']}
          correctIndex={1}
          explanation="Nobody withholds tax from 1099 income."
        />
        <MultiSelectQuiz
          question="Which of these lower taxable income? (Pick all)"
          options={['Traditional 401k contribution', 'HSA contribution (federal)', 'Roth 401k contribution', 'Standard deduction']}
          correctIndexes={[0, 1, 3]}
          explanation="A Roth 401k is made with after-tax money and does not lower taxable income now."
        />
        <FillInQuiz
          question="Investments held longer than ___ year(s) get long-term capital gains rates."
          answer="1"
          explanation="One year or less is short-term."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'Brackets are buckets. Marginal is the last dollar, effective is the average.',
          'Credits beat deductions dollar for dollar.',
          'Married couples with equal incomes pay the same. A single large earner saves.',
          '1099: save 25% to 30%, pay quarterly. Investments: hold over a year.',
        ]}
      />
    </div>
  );
}
