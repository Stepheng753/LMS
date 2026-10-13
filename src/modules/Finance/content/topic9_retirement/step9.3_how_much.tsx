import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { Formula } from '../../../../components/content/Formula';
import { Exercise } from '../../../../components/content/Exercise';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';
import { NeededToRetire } from '../../calculators';

export default function Step9_3_HowMuch() {
  return (
    <div>
      <StepHeader
        eyebrow="Topic 9 • The Number"
        title="How Much Do I Need? 4% of What Equals My Expenses?"
        summary="The one question that gives you your retirement number: what pile, multiplied by 4%, equals a year of your spending?"
      />

      <Callout type="success" title="The thinking, in one line">
        <strong>4% of what I have invested = one year of my expenses = one year of the pile&apos;s growth.</strong> So the
        question is simply: <em>4% of what equals my yearly expenses?</em>
      </Callout>

      <Section title="Solve for the pile" />
      <Formula label="Your retirement number" where={[{ symbol: 'expenses', meaning: 'what you spend in a year' }, { symbol: '4%', meaning: 'the share of the pile you spend each year' }]}>
        invested = expenses ÷ 4%
      </Formula>
      <Table
        headers={['Yearly expenses', 'The question', 'You need invested']}
        align={['left', 'left', 'right']}
        rows={[
          ['$40,000', '4% of what = $40,000?', '$1,000,000'],
          ['$50,000', '4% of what = $50,000?', '$1,250,000'],
          ['$60,000', '4% of what = $60,000?', '$1,500,000'],
          ['$80,000', '4% of what = $80,000?', '$2,000,000'],
          ['$100,000', '4% of what = $100,000?', '$2,500,000'],
        ]}
      />
      <p>
        Check the first row: 4% of $1,000,000 is $40,000. Check the third: 4% of $1,500,000 = $60,000. Every row works the
        same way. The pile is always the expenses divided by 0.04.
      </p>

      <Callout type="info" title="It is the same as a multiple, said another way">
        Dividing by 4% is the same as multiplying by 25 (because 1 ÷ 0.04 = 25). So $60,000 of spending needs $60,000 × 25 =
        $1,500,000. Some people use that shortcut. The playbook prefers the percentage view, because it connects to growth: the
        4% is what the pile earns, and what you spend.
      </Callout>

      <Section title="A cautious or a bold percentage" />
      <Table
        headers={['Yearly expenses', 'At 3.5% (cautious)', 'At 4% (the playbook)', 'At 5% (bold)']}
        align={['left', 'right', 'right', 'right']}
        rows={[
          ['$40,000', '$1,142,857', '$1,000,000', '$800,000'],
          ['$60,000', '$1,714,286', '$1,500,000', '$1,200,000'],
          ['$100,000', '$2,857,143', '$2,500,000', '$2,000,000'],
        ]}
      />
      <p>
        A lower percentage needs a bigger pile and is safer. A higher percentage needs a smaller pile but risks running out
        (step 9.5). The pile you need depends heavily on <em>how much you spend</em>. Cut $10,000 of yearly spending and you
        cut the number by $250,000.
      </p>

      <Section title="What counts as expenses?" />
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>What you actually spend today</strong>, from your budget (Topic 2): housing, food, transport, insurance, health care, fun, travel.</li>
        <li><strong>Taxes on the money you withdraw.</strong> With Roth accounts there are none. With traditional accounts, add them.</li>
        <li><strong>Subtract the guaranteed income you will have</strong> (Social Security, a pension), step 9.7.</li>
        <li><strong>Remember the mortgage</strong>: a paid-off home lowers the number a lot.</li>
        <li><strong>Add one-time costs</strong> separately: a new roof, a car, help for family.</li>
      </ul>

      <Section title="Do it with your own numbers" />
      <p>
        The calculator asks for your yearly spending in <em>today&apos;s dollars</em>, the withdrawal percentage, your age, your
        retirement age and the return. The top box shows the pile you need; the second shows the same in future dollars, and
        the third shows the amount to save each year to get there.
      </p>
      <NeededToRetire />

      <Exercise
        title="Your first number"
        hint={<p>Divide your yearly spending by 0.04. Then check by multiplying the answer by 0.04.</p>}
        solution={
          <ul className="list-disc pl-5 space-y-1">
            <li>$54,000 ÷ 0.04 = <strong>$1,350,000</strong>. Check: 4% of $1,350,000 = $54,000.</li>
            <li>At 3.5%: $54,000 ÷ 0.035 = <strong>$1,542,857</strong>.</li>
            <li>If $1,350,000 is too far away, the levers are lower spending, a Social Security offset, or a longer timeline.</li>
          </ul>
        }
      >
        <p>You spend $54,000 a year. What pile makes 4% equal your spending? What if you want a more cautious 3.5%?</p>
      </Exercise>

      <QuizSet title="Check yourself">
        <Quiz
          question="You want to spend $70,000 a year in retirement. At a 4% withdrawal rate, you need invested about:"
          options={['$280,000', '$700,000', '$1,750,000', '$7,000,000']}
          correctIndex={2}
          explanation="$70,000 ÷ 0.04 = $1,750,000."
        />
        <Quiz
          question="If you can cut yearly spending by $12,000, how much does your retirement number fall at 4%?"
          options={['$12,000', '$48,000', '$300,000', '$480,000']}
          correctIndex={2}
          explanation="$12,000 ÷ 0.04 = $300,000."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'Invested = yearly expenses ÷ 4%. The pile times 4% equals a year of spending, and a year of growth.',
          '$40,000 needs $1,000,000. $60,000 needs $1,500,000. $100,000 needs $2,500,000.',
          'Dividing by 4% is the same as multiplying by 25, but the percentage view shows the growth.',
          'Your spending is the lever: every $10,000 cut lowers the number by $250,000.',
        ]}
      />
    </div>
  );
}
