import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { Exercise } from '../../../../components/content/Exercise';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';
import { RetirementSustainability } from '../../calculators';

export default function Step9_1_WrongWay() {
  return (
    <div>
      <StepHeader
        eyebrow="Topic 9 • The Wrong Way"
        title="The Wrong Way: Spend Down a Lump Sum and Hope"
        summary="What happens when you treat $1 million like a savings jar that you drain by $60,000 a year."
      />

      <Callout type="warning" title="The common plan">
        Many people think: &quot;I need a big number, and when I retire I will take it out as I need it and hope there is
        enough until I die.&quot; That plan has no way to know whether it works. And it often does not.
      </Callout>

      <Section title="$1,000,000 and a $60,000 lifestyle" />
      <p>
        You retire with $1,000,000. You spend $60,000 in year 1, and raise it 3% a year to keep up with prices. How long
        does the money last? It depends on what the money earns while you spend it:
      </p>
      <Table
        headers={['What the money earns', 'How long $1,000,000 lasts', 'Why']}
        align={['left', 'right', 'left']}
        rows={[
          ['0% (cash under the mattress)', '14 years', 'You are simply dividing the pile by your spending'],
          ['4% (bonds or a savings account)', '19 years', 'A little help from growth, but spending is faster'],
          ['7% (a steady stock return)', '29 years', 'The growth covers part of every withdrawal'],
        ]}
      />
      <p>
        Retire at 65, and the $1 million is gone by 79 in the first case, 84 in the second, 94 in the third. Plenty of people
        live to 95 or beyond. The problem is not the size of the number. It is that $60,000 on $1,000,000 is <strong>6%</strong>:
        too much for the money to keep up.
      </p>

      <Section title="The rule that fixes it" />
      <Callout type="success" title="Spend a percentage, not a pile">
        Instead of asking &quot;how much can I take out?&quot;, ask <strong>&quot;what percentage of the pile can I safely spend
        each year?&quot;</strong> Spend about 4%, and the pile keeps pace with your spending. At 6% it drains. At 4% it holds.
        The next lessons show why.
      </Callout>

      <Section title="See it drain" />
      <p>
        The calculator is set to 6% ($60,000 on $1,000,000), a 4% return and 3% inflation. Watch the balance fall to
        zero, then try the presets that lower the withdrawal or raise the return.
      </p>
      <RetirementSustainability portfolio={1000000} withdrawPct={6} rate={4} inflation={3} years={30} raise title="Spend down: 6% out, 4% growth" />

      <Exercise
        title="How long will it last?"
        solution={
          <ul className="list-disc pl-5 space-y-1">
            <li>With no growth and no inflation: $500,000 ÷ $40,000 = <strong>12.5 years</strong>.</li>
            <li>That is only 8% of the pile a year. At 4% ($20,000 a year) with some growth it would last far longer.</li>
            <li>The fix is a bigger pile or lower spending, not hope.</li>
          </ul>
        }
      >
        <p>A person retires with $500,000 in cash and spends $40,000 a year. About how many years does it last with no growth and no inflation? What percentage of the pile is that each year?</p>
      </Exercise>

      <QuizSet title="Check yourself">
        <Quiz
          question="$1,000,000 and spending $60,000 a year. What percent of the pile is that?"
          options={['4%', '6%', '10%', '60%']}
          correctIndex={1}
          explanation="$60,000 ÷ $1,000,000 = 6%."
        />
        <Quiz
          question="Which question is better to ask at retirement?"
          options={['How much can I take out this year?', 'What percentage of my pile can I safely spend each year?', 'How long will I live?', 'What did the market do today?']}
          correctIndex={1}
          explanation="A percentage rule scales with the pile and the market."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'Spending down a lump sum has no safety: $1,000,000 at $60,000 a year lasts 14 to 29 years depending on growth.',
          '$60,000 on $1,000,000 is a 6% withdrawal, too high to last.',
          'Ask what percentage of the pile you can spend, not how much you can take.',
        ]}
      />
    </div>
  );
}
