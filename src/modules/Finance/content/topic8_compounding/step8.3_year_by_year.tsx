import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { Steps } from '../../../../components/content/Steps';
import { Exercise } from '../../../../components/content/Exercise';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';
import { CompoundCalculator } from '../../calculators';

export default function Step8_3_YearByYear() {
  return (
    <div>
      <StepHeader
        eyebrow="Topic 8 • The Slow Build"
        title="Year 1, Year 2, Year 3: Add $10,000 Every Year"
        summary="One slow step at a time. Watch the yearly gain climb from $1,000 to $6,105 even though you add the same $10,000 every year."
      />

      <Callout type="info" title="The setup">
        You invest <strong>$10,000 at the start of each year</strong>. The market gives <strong>10%</strong> a year. We
        will go one year at a time and write every number down.
      </Callout>

      <Section title="Step by step" />
      <Steps
        steps={[
          {
            title: 'Year 1: invest $10,000 and earn 10%',
            children: <p>$10,000 × 10% = <strong>$1,000</strong> of growth. End of year 1: $10,000 + $1,000 = <strong>$11,000</strong>.</p>,
          },
          {
            title: 'Year 2: add another $10,000. Now earn 10% on all of it',
            children: (
              <>
                <p>You start with $11,000 and add $10,000, so you hold <strong>$21,000</strong>.</p>
                <p>10% of $21,000 = <strong>$2,100</strong> of growth. That is 10% on your original $11,000 ($1,100) <em>plus</em> 10% on the new $10,000 ($1,000).</p>
                <p>End of year 2: $21,000 + $2,100 = <strong>$23,100</strong>.</p>
              </>
            ),
          },
          {
            title: 'Look at what just happened',
            children: <p>Year 1 growth was $1,000. Year 2 growth was $2,100, <strong>more than double</strong>, even though you added the same $10,000. The extra came from earning on last year&apos;s earnings.</p>,
          },
          {
            title: 'Year 3: add $10,000 again',
            children: <p>$23,100 + $10,000 = $33,100. 10% of $33,100 = <strong>$3,310</strong>. End of year 3: <strong>$36,410</strong>.</p>,
          },
          {
            title: 'Year 4 and 5: keep going',
            children: <p>Year 4: $36,410 + $10,000 = $46,410, growth $4,641, end <strong>$51,051</strong>. Year 5: $51,051 + $10,000 = $61,051, growth $6,105, end <strong>$67,156</strong>.</p>,
          },
        ]}
      />

      <Section title="The table" />
      <Table
        headers={['Year', 'Start of year', 'You add', 'Growth (10%)', 'End of year']}
        align={['left', 'right', 'right', 'right', 'right']}
        rows={[
          ['1', '$0', '$10,000', '$1,000', '$11,000'],
          ['2', '$11,000', '$10,000', '$2,100', '$23,100'],
          ['3', '$23,100', '$10,000', '$3,310', '$36,410'],
          ['4', '$36,410', '$10,000', '$4,641', '$51,051'],
          ['5', '$51,051', '$10,000', '$6,105', '$67,156'],
        ]}
      />
      <Callout type="success" title="The pattern that changes everything">
        You added $50,000 over five years. Your balance is $67,156, so growth did $17,156 of the work. By year 5 the market
        is giving you <strong>$6,105 a year</strong>, more than half of what you deposit that year. If you stopped adding
        money, it would keep growing on its own.
      </Callout>

      <Section title="Now you try: change the numbers" />
      <p>
        This is the exact example. The deposits land at the start of each year. Change the amount, the rate or the years,
        and read the growth column.
      </p>
      <CompoundCalculator start={0} yearly={10000} rate={10} years={5} timing="begin" title="$10,000 at the start of every year, 10%" presets={[
        { label: 'The example: $10,000, 10%, 5 years', start: 0, yearly: 10000, rate: 10, years: 5 },
        { label: 'Half as much: $5,000', start: 0, yearly: 5000, rate: 10, years: 5 },
        { label: 'Double the rate: 20%', start: 0, yearly: 10000, rate: 20, years: 5 },
        { label: 'Same, 10 years', start: 0, yearly: 10000, rate: 10, years: 10 },
        { label: 'Only 5% growth', start: 0, yearly: 10000, rate: 5, years: 5 },
      ]} />

      <Exercise
        title="Do year 6 yourself"
        hint={<p>Start with the end of year 5, add $10,000, then take 10% of the total.</p>}
        solution={
          <p>
            $67,156 + $10,000 = $77,156. Growth = 10% × $77,156 = <strong>$7,716</strong>. End of year 6:
            <strong> $84,872</strong>. The yearly growth has gone from $1,000 to $7,716.
          </p>
        }
      >
        <p>Continue the table. What is the growth in year 6, and what is the balance at the end of year 6?</p>
      </Exercise>

      <QuizSet title="Check yourself">
        <Quiz
          question="Why is year 2 growth ($2,100) more than double year 1 growth ($1,000), when you added the same $10,000?"
          options={['The rate went up', 'You also earned 10% on last year’s earnings', 'The market was better', 'Fees went down']}
          correctIndex={1}
          explanation="The base in year 2 was $21,000 instead of $10,000, so the growth was bigger."
        />
        <Quiz
          question="At the end of year 3, how much have you deposited in total, and what is the balance?"
          options={['$30,000 deposited, $36,410 balance', '$36,410 deposited, $30,000 balance', '$30,000 deposited, $30,000 balance', '$10,000 deposited, $36,410 balance']}
          correctIndex={0}
          explanation="Three deposits of $10,000, and growth added $6,410."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'Year 1: $10,000 at 10% makes $1,000. Year 2: $21,000 at 10% makes $2,100, more than double.',
          'Each year the growth column gets bigger because the base is bigger.',
          'After 5 years: $50,000 deposited, $67,156 balance, $6,105 of growth in year 5 alone.',
          'Multiply by 1.10 each year. Add the deposit first if it lands at the start of the year.',
        ]}
      />
    </div>
  );
}
