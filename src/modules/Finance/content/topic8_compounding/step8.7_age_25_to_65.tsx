import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { Exercise } from '../../../../components/content/Exercise';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';
import { CompoundCalculator } from '../../calculators';

export default function Step8_7_Age25to65() {
  return (
    <div>
      <StepHeader
        eyebrow="Topic 8 • The Scenario"
        title="You Are 25 and You Want to Retire at 65"
        summary="A forty-year plan, with five different monthly amounts, what each one becomes, and what it will be worth in today's money."
      />

      <Callout type="info" title="The scenario">
        You are <strong>25</strong>. You will invest every month until you are <strong>65</strong>, 40 years. The money goes
        into an S&amp;P 500 index fund that has averaged <strong>10.5%</strong> a year. We also assume <strong>3%</strong> yearly
        inflation, to see what the money can really buy.
      </Callout>

      <Section title="Five monthly amounts" />
      <Table
        headers={['You invest per month', 'Per year', 'You put in over 40 years', 'Balance at 65', 'In today’s dollars']}
        align={['left', 'right', 'right', 'right', 'right']}
        rows={[
          ['$100', '$1,200', '$48,000', '$608,702', '$186,602'],
          ['$200', '$2,400', '$96,000', '$1,217,404', '$373,203'],
          [<strong key="a">$500</strong>, '$6,000', '$240,000', <strong key="b">$3,043,509</strong>, <strong key="c">$933,009</strong>],
          ['$1,000', '$12,000', '$480,000', '$6,087,019', '$1,866,017'],
          ['$2,000', '$24,000', '$960,000', '$12,174,038', '$3,732,035'],
        ]}
      />
      <p className="text-sm text-muted-foreground">Assumes one deposit at the end of each year (monthly deposits earn slightly more). 10.5% a year return, 3% inflation.</p>
      <Callout type="success" title="The doubling pattern">
        Double the monthly amount and you double the result. $100 a month turns $48,000 of deposits into over $600,000. $500 a
        month turns $240,000 into over $3 million. Growth supplies about 92% of the final amount in every row.
      </Callout>

      <Section title="Two views of the same $3.04 million" />
      <Table
        headers={['View', 'The number', 'What it means']}
        rows={[
          [<strong key="a">Dollars on the statement (in 40 years)</strong>, '$3,043,509', 'The number you will see in 2066'],
          [<strong key="b">Buying power in today’s dollars</strong>, '$933,009', 'What that money can buy, measured in what a dollar buys today'],
        ]}
      />
      <p>
        Both are true. $933,009 is still far more than the $240,000 you put in, and it is a number you can plan with: it is
        the lifestyle that many people live on for decades (Topic 9). The next steps explain why.
      </p>

      <Section title="Run your own scenario" />
      <p>
        Change the monthly amount (the box shows the yearly amount), the return, the years and the inflation. Look at the
        &quot;today&apos;s dollars&quot; number, not just the big one.
      </p>
      <CompoundCalculator start={0} yearly={6000} rate={10.5} years={40} showInflation title="Age 25 to 65 at $500 a month" presets={[
        { label: '$500 a month', start: 0, yearly: 6000, rate: 10.5, years: 40 },
        { label: '$100 a month', start: 0, yearly: 1200, rate: 10.5, years: 40 },
        { label: '$1,000 a month', start: 0, yearly: 12000, rate: 10.5, years: 40 },
        { label: 'Only 7% returns', start: 0, yearly: 6000, rate: 7, years: 40 },
        { label: '$10,000 head start at 25', start: 10000, yearly: 6000, rate: 10.5, years: 40 },
        { label: 'Retire at 60 instead', start: 0, yearly: 6000, rate: 10.5, years: 35 },
      ]} />

      <Exercise
        title="Build your own scenario"
        hint={<p>Use $ per month × 12 for the yearly box. Compare your answer with the 40-year table.</p>}
        solution={
          <ul className="list-disc pl-5 space-y-1">
            <li>$300 a month is $3,600 a year, about 60% of the $500 result: <strong>about $1.83 million</strong> at 65 (about $560,000 in today&apos;s dollars).</li>
            <li>Starting at 30 instead gives only 35 years, about $1.1 million.</li>
            <li>The choice that matters most is the start date, then the amount.</li>
          </ul>
        }
      >
        <p>You can only manage $300 a month. Use the calculator to find your balance at 65 and in today&apos;s dollars. Then try starting five years later.</p>
      </Exercise>

      <QuizSet title="Check yourself">
        <Quiz
          question="$500 a month from 25 to 65 at 10.5% gives about:"
          options={['$240,000', '$1,000,000', '$3,043,509', '$30,000,000']}
          correctIndex={2}
          explanation="You deposit $240,000, and growth adds the rest."
        />
        <Quiz
          question="If you double your monthly investment, what happens to the result at 65?"
          options={['It doubles', 'It more than doubles', 'It stays the same', 'It triples']}
          correctIndex={0}
          explanation="The growth is a percentage of the deposits, so double the deposits means double the result."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          '$500 a month for 40 years at 10.5% is about $3.04 million, or $933,000 in today’s dollars.',
          '$100 a month becomes over $600,000. $1,000 a month becomes over $6 million.',
          'Double the monthly amount, double the result.',
          'Always read the today’s-dollars number too.',
        ]}
      />
    </div>
  );
}
