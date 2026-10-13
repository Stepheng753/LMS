import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { Exercise } from '../../../../components/content/Exercise';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';
import { CompoundCalculator } from '../../calculators';

export default function Step8_6_CostOfWaiting() {
  return (
    <div>
      <StepHeader
        eyebrow="Topic 8 • Compounding"
        title="The Cost of Waiting"
        summary="The same $500 a month, started at 25, 30, 35, 45 or 55. Ten years of waiting costs two million dollars."
      />

      <Callout type="info" title="The setup">
        You save <strong>$6,000 a year ($500 a month)</strong> into an investment that earns <strong>10.5%</strong>, until
        age 65. The only thing that changes is the age you start.
      </Callout>

      <Section title="What each starting age gives you at 65" />
      <Table
        headers={['Start at age', 'Years', 'You put in', 'Balance at 65', 'In today’s dollars (3% inflation)']}
        align={['left', 'right', 'right', 'right', 'right']}
        rows={[
          [<strong key="a">25</strong>, '40', '$240,000', <strong key="b">$3,043,509</strong>, '$933,009'],
          ['30', '35', '$210,000', '$1,824,953', '$648,558'],
          ['35', '30', '$180,000', '$1,085,289', '$447,125'],
          ['45', '20', '$120,000', '$363,785', '$201,419'],
          ['55', '10', '$60,000', '$97,947', '$72,882'],
        ]}
      />
      <p>
        Starting at 25 instead of 35 means putting in only <strong>$60,000 more</strong>, but ending with
        <strong> $1,958,220 more</strong>. Waiting 10 years cost about 64% of the final result.
      </p>

      <Callout type="warning" title="What it takes to catch up">
        A 35-year-old who wants to reach the same $3.04 million at 65 must save about <strong>$16,800 a year</strong>
        ($1,400 a month), nearly <strong>2.8 times</strong> as much as the 25-year-old. Waiting does not make you pay a little
        more. It makes you pay far more, for the same result.
      </Callout>

      <Section title="Why the early years matter most" />
      <p>
        Money invested at 25 has 40 years to double five or six times. Money invested at 55 has only 10 years, so it
        doubles once. The earlier a dollar goes in, the more doublings it gets. The first $6,000 you invest at 25 becomes about
        $295,000 by 65, all by itself.
      </p>

      <Section title="Play with the age" />
      <p>
        The calculator starts at 25. Click through the presets to see what 35, 45 and 55 do. Then try raising the monthly
        amount to catch up.
      </p>
      <CompoundCalculator start={0} yearly={6000} rate={10.5} years={40} showInflation title="$500 a month until age 65" presets={[
        { label: 'Start at 25 (40 years)', start: 0, yearly: 6000, rate: 10.5, years: 40 },
        { label: 'Start at 30 (35 years)', start: 0, yearly: 6000, rate: 10.5, years: 35 },
        { label: 'Start at 35 (30 years)', start: 0, yearly: 6000, rate: 10.5, years: 30 },
        { label: 'Start at 35, save $1,400 a month', start: 0, yearly: 16800, rate: 10.5, years: 30 },
        { label: 'Start at 45 (20 years)', start: 0, yearly: 6000, rate: 10.5, years: 20 },
        { label: 'Start at 55 (10 years)', start: 0, yearly: 6000, rate: 10.5, years: 10 },
      ]} />

      <Callout type="success" title="The good news">
        If you are not 25, the best time to start is still today. The cost of waiting is real, but it also means the
        first dollars you invest now are the most valuable ones you will ever invest. Do not wait for a perfect amount.
        Start with $50 a month and raise it.
      </Callout>

      <Exercise
        title="Cost of one more year"
        solution={
          <p>
            At 35 the plan reaches $1,085,289 over 30 years. At 36 it has 29 years and reaches about $976,700. One extra year of waiting
            costs roughly <strong>$108,600</strong> at the end, for $6,000 not invested. Every year of delay is a huge bill.
          </p>
        }
      >
        <p>Use the calculator to compare 30 years with 29 years of $6,000 at 10.5%. What does one more year of waiting cost at 65?</p>
      </Exercise>

      <QuizSet title="Check yourself">
        <Quiz
          question="Which gives a larger balance at 65: $500 a month from 25 to 35 and then stopping, or $500 a month from 35 to 65?"
          options={['Starting at 35 and saving 30 years', 'Saving only 10 years but starting at 25', 'They are equal', 'It depends on the stock']}
          correctIndex={1}
          explanation="The early 10 years ($60,000) compound for 40 years and end near $1.96 million at 10.5%, more than the late 30 years ($180,000), which end near $1.09 million."
        />
        <Quiz
          question="Why does delaying cost so much?"
          options={['Fees increase', 'Early dollars have more years to double', 'Taxes rise', 'Prices fall']}
          correctIndex={1}
          explanation="Each dollar invested early gets more doublings."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          '$500 a month at 10.5%: $3.04M if you start at 25, $1.09M at 35, $364k at 45, $98k at 55.',
          'Ten years of waiting costs about $1.96 million for only $60,000 less invested.',
          'To catch up from 35 you must save about 2.8 times as much.',
          'Start now, even small, and raise it with every raise.',
        ]}
      />
    </div>
  );
}
