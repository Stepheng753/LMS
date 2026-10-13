import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { Steps } from '../../../../components/content/Steps';
import { Exercise } from '../../../../components/content/Exercise';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';
import { NeededToRetire, RetirementSustainability } from '../../calculators';

export default function Step9_8_BuildNumber() {
  return (
    <div>
      <StepHeader
        eyebrow="Topic 9 • Your Plan"
        title="Build Your Number and Your Monthly Savings"
        summary="From today's spending to a retirement number, and from the number to a monthly amount, using real figures from the age 25 to 65 scenario."
      />

      <Section title="The worked example" />
      <p>You are 25. You want to stop working at 65. You live on $60,000 a year today. The market is 10.5%, inflation 3%, withdrawal 4%.</p>
      <Steps
        steps={[
          { title: 'Step 1: your spending today', children: <p>$60,000 a year.</p> },
          { title: 'Step 2: what the same life costs at 65', children: <p>Prices rise 3% a year for 40 years, which multiplies them by 3.26. $60,000 × 3.26 = <strong>$195,722</strong> a year.</p> },
          { title: 'Step 3: 4% of what equals $195,722?', children: <p>$195,722 ÷ 0.04 = <strong>$4,893,057</strong> invested at 65.</p> },
          { title: 'Step 4: the same number in today’s money', children: <p>$4,893,057 ÷ 3.26 = <strong>$1,500,000</strong>, exactly the $60,000 ÷ 4% you would get today. The two views always agree.</p> },
          { title: 'Step 5: how much to save to reach it', children: <p>At 10.5% for 40 years, you need to put in about <strong>$9,646 a year, $804 a month</strong>, starting at 25 (deposits at the end of each year).</p> },
        ]}
      />
      <Callout type="success" title="Compare it with the earlier scenario">
        In Topic 8, $500 a month for 40 years became $3,043,509 at 65, or $933,009 in today&apos;s dollars. That supports about
        $37,300 a year in today&apos;s money at 4%. To fully fund a $60,000 life you need about $804 a month. Starting early makes the
        required amount surprisingly modest.
      </Callout>

      <Section title="The same plan at other spending levels" />
      <Table
        headers={['Spending today', 'Pile needed (today’s dollars)', 'Save per month from 25 to 65 at 10.5%']}
        align={['left', 'right', 'right']}
        rows={[
          ['$40,000', '$1,000,000', 'about $536'],
          ['$60,000', '$1,500,000', 'about $804'],
          ['$80,000', '$2,000,000', 'about $1,072'],
          ['$100,000', '$2,500,000', 'about $1,340'],
        ]}
      />
      <p>
        If you start at 35 the same $60,000 target needs about $1,677 a month (30 years instead of 40). Starting late costs a
        lot, as step 8.6 showed.
      </p>

      <Section title="What if the market only gives 7%?" />
      <Table
        headers={['Return', 'Monthly saving for a $60,000 life, from 25 to 65']}
        align={['left', 'right']}
        rows={[
          ['10.5%', 'about $804'],
          ['7%', 'about $2,043'],
          ['5%', 'about $3,375'],
        ]}
      />
      <p>
        A lower return means a much larger monthly amount. That is why the plan is tested with a cautious rate, and why the
        order of operations asks you to save steadily and raise the amount with every raise.
      </p>

      <Section title="Do it with your numbers" />
      <p>
        Use the calculator with your own spending, ages and return, then the sustainability tool below it to see how the pile holds
        up through a long retirement.
      </p>
      <NeededToRetire />
      <RetirementSustainability portfolio={1500000} withdrawPct={4} rate={7} inflation={3} years={40} raise title="Does a $1.5M pile last 40 years at 4%?" />

      <Exercise
        title="Your plan on one page"
        solution={
          <ul className="list-disc pl-5 space-y-1">
            <li>Spending today, Social Security estimate and the net amount to cover.</li>
            <li>The pile: net amount ÷ 4%, in today&apos;s dollars.</li>
            <li>The monthly savings from the calculator at two return rates (10.5% and 7%).</li>
            <li>Where it goes in the order of operations, and the date you will review it.</li>
          </ul>
        }
      >
        <p>Use the calculator for $50,000 of spending, age 30, retire at 65, with a cautious 7% return. Write the pile, the monthly saving, and which rung of the ladder funds it.</p>
      </Exercise>

      <QuizSet title="Check yourself">
        <Quiz
          question="Why does $4,893,057 at 65 equal $1,500,000 in today’s dollars?"
          options={['It does not', 'Dividing by the 3.26 price multiplier converts future dollars to today’s dollars', 'Taxes remove the rest', 'The market falls']}
          correctIndex={1}
          explanation="$4,893,057 ÷ 3.26 = $1,500,000. The same lifestyle, measured in different dollars."
        />
        <Quiz
          question="What happens to the monthly amount you need if the market returns 7% instead of 10.5%?"
          options={['It falls', 'It stays the same', 'It more than doubles', 'It halves']}
          correctIndex={2}
          explanation="About $804 becomes about $2,043 a month."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'Spending today, inflated to the retirement date, divided by 4%, gives the pile in future dollars. Divide by the price multiplier to get today’s dollars.',
          'For a $60,000 life from age 25 at 10.5%: about $4.9 million at 65, which is $1.5 million in today’s money, and about $804 a month.',
          'At 7% the same plan needs about $2,043 a month. Test with a cautious rate.',
          'Starting at 35 instead of 25 roughly doubles the monthly amount.',
        ]}
      />
    </div>
  );
}
