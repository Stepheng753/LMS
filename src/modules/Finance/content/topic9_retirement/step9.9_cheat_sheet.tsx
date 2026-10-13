import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Table } from '../../../../components/content/Table';
import { Callout } from '../../../../components/content/Callout';
import { QuizSet, Quiz, MultiSelectQuiz, FillInQuiz } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function Step9_9_CheatSheet() {
  return (
    <div>
      <StepHeader
        eyebrow="Topic 9 • Cheat Sheet"
        title="Topic 9 Cheat Sheet and Quiz"
        summary="Retirement on one page, then a check."
      />

      <Section title="The core ideas" />
      <Table
        headers={['Idea', 'In one line']}
        rows={[
          ['The method', 'Withdraw about 4% of the pile a year, not a huge lump'],
          ['The thinking', '4% of invested = a year of expenses = a year of growth'],
          ['Your number', 'Invested = yearly expenses ÷ 4% (same as expenses × 25)'],
          ['Inflation', 'Raise withdrawals with prices. Real balance stays flat when return ≈ withdrawal % + inflation (7%)'],
          ['The margin', 'The S&P 500 has averaged about 7.3% after inflation, above the 7% break-even'],
          ['Sequence risk', 'A crash early in retirement does lasting damage. Be flexible, keep a cash buffer'],
          ['Social Security', 'Lowers the pile: $24,000 a year is worth $600,000 at 4%'],
          ['Spend order', 'Brokerage, then traditional, then Roth last'],
        ]}
      />

      <Section title="The numbers" />
      <Table
        headers={['Yearly spending', 'Pile at 4%', 'Pile at 3.5%']}
        align={['left', 'right', 'right']}
        rows={[
          ['$40,000', '$1,000,000', '$1,142,857'],
          ['$60,000', '$1,500,000', '$1,714,286'],
          ['$100,000', '$2,500,000', '$2,857,143'],
        ]}
      />

      <Callout type="success" title="The big idea">
        You do not retire on a pile you hope is big enough. You retire on a percentage of an engine that keeps growing.
        Know your yearly spending, divide by 4%, save toward that, and stay flexible.
      </Callout>

      <QuizSet title="Topic 9 Quiz">
        <Quiz
          question="You spend $48,000 a year. At 4%, what pile do you need?"
          options={['$480,000', '$1,200,000', '$1,920,000', '$4,800,000']}
          correctIndex={1}
          explanation="$48,000 ÷ 0.04 = $1,200,000."
        />
        <Quiz
          question="With a 4% withdrawal that rises 3% a year, what return keeps your buying power flat?"
          options={['3%', '4%', '7%', '10%']}
          correctIndex={2}
          explanation="Withdrawal plus inflation: 4% + 3%."
        />
        <Quiz
          question="Which gives a worse outcome with the same returns and spending?"
          options={['Bad years first in retirement', 'Bad years last', 'They are identical', 'Neither']}
          correctIndex={0}
          explanation="Selling shares during an early crash leaves fewer to recover."
        />
        <MultiSelectQuiz
          question="Which lower the pile your investments must cover? (Pick all)"
          options={['Social Security', 'A paid-off home', 'Lower spending', 'A bigger mortgage']}
          correctIndexes={[0, 1, 2]}
          explanation="A bigger mortgage raises spending."
        />
        <FillInQuiz
          question="Dividing by 4% is the same as multiplying by ___."
          answer="25"
          explanation="1 ÷ 0.04 = 25."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'Withdraw about 4%, raised with inflation. Spend the growth, keep the tree.',
          'Pile = yearly expenses ÷ 4%, minus what Social Security covers.',
          'Stay flexible in bad early years. Keep Roth for last.',
          'Test the plan at 7% as well as 10.5%.',
        ]}
      />
    </div>
  );
}
