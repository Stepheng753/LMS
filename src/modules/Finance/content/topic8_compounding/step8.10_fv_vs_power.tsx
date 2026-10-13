import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { Exercise } from '../../../../components/content/Exercise';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';
import { RealVsNominal } from '../../calculators';

export default function Step8_10_FvVsPower() {
  return (
    <div>
      <StepHeader
        eyebrow="Topic 8 • Inflation"
        title="Future Value vs Purchasing Power"
        summary="The big number is real money, but it is not worth what it is worth today. Plan with the second number."
      />

      <Callout type="info" title="Two numbers for every future balance">
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Future value (nominal):</strong> the dollars on your statement in that year.</li>
          <li><strong>Purchasing power (real):</strong> what those dollars can buy, measured in today&apos;s dollars.</li>
        </ul>
        To get from the first to the second, divide by the price multiplier (1.03 to the power of the years).
      </Callout>

      <Section title="$500 a month at 10.5%, with 3% inflation" />
      <Table
        headers={['After', 'You deposited', 'Statement balance', 'In today’s dollars', 'Price multiplier']}
        align={['left', 'right', 'right', 'right', 'right']}
        rows={[
          ['10 years', '$60,000', '$97,947', '$72,882', '1.34'],
          ['20 years', '$120,000', '$363,785', '$201,419', '1.81'],
          ['30 years', '$180,000', '$1,085,289', '$447,125', '2.43'],
          ['40 years', '$240,000', '$3,043,509', '$933,009', '3.26'],
        ]}
      />
      <p>
        At year 40 the statement says <strong>$3,043,509</strong>. But prices are 3.26 times higher, so it buys what
        $3,043,509 ÷ 3.26 = <strong>$933,009</strong> buys today. That is still almost four times what you deposited
        ($240,000), and it is the number you should plan around.
      </p>

      <Section title="What $933,009 means" />
      <ul className="list-disc pl-5 space-y-1">
        <li>In today&apos;s dollars it is a nest egg that could pay about <strong>$37,300 a year</strong> at a 4% withdrawal rate (Topic 9).</li>
        <li>In 2066 dollars the same buying power is about $121,700 a year, because prices have tripled.</li>
        <li>Both describe the same standard of living. Be careful which one you are looking at.</li>
      </ul>

      <Section title="Why nominal numbers can fool you" />
      <Table
        headers={['Claim', 'Sounds like', 'Reality check']}
        rows={[
          ['“You will have $3 million at 65”', 'A fortune', 'About $933,000 of today’s buying power'],
          ['“My salary doubled in 20 years”', 'Great raises', 'With 3% inflation prices rose 1.8 times, so your real gain was only about 10%'],
          ['“The fund returned 10%”', 'Wealth growing fast', 'About 7% after 3% inflation'],
          ['“I saved $1 million”', 'Secure', 'Depends on the year: $1 million in 2066 buys what about $307,000 buys today'],
        ]}
      />

      <Section title="Change the inflation, change the story" />
      <p>
        The chart shows the statement balance and the buying power line. Try zero inflation, then 6%. Notice how much
        the dashed line moves while the rest stays the same.
      </p>
      <RealVsNominal />

      <Callout type="warning" title="The rule for the rest of the course">
        Whenever a future dollar amount appears (retirement targets, mortgage balances, college costs), ask: is this in
        today&apos;s dollars or future dollars? Plans built in today&apos;s dollars are much easier to understand.
      </Callout>

      <Exercise
        title="Deflate a number"
        solution={
          <ul className="list-disc pl-5 space-y-1">
            <li>1.03^30 = 2.427, so $1,085,289 ÷ 2.427 = <strong>$447,125</strong> in today&apos;s dollars.</li>
            <li>$2,000,000 ÷ 3.262 = <strong>$613,000</strong>.</li>
            <li>If inflation is 4% instead, 1.04^40 = 4.80, so $3,043,509 ÷ 4.80 = <strong>$634,000</strong> in today’s dollars.</li>
          </ul>
        }
      >
        <p>(a) $1,085,289 in 30 years at 3% inflation is worth what in today&apos;s dollars? (b) $2,000,000 in 40 years at 3%? (c) $3,043,509 in 40 years if inflation averages 4%?</p>
      </Exercise>

      <QuizSet title="Check yourself">
        <Quiz
          question="A balance of $1,000,000 in 20 years with 3% inflation buys about what in today’s dollars?"
          options={['$1,000,000', '$554,000', '$250,000', '$100,000']}
          correctIndex={1}
          explanation="1.03^20 = 1.806, so $1,000,000 ÷ 1.806 = $553,700."
        />
        <Quiz
          question="Which should you use to plan retirement spending?"
          options={['The statement balance in future dollars', 'The balance in today’s dollars', 'Whichever is larger', 'Neither']}
          correctIndex={1}
          explanation="Today’s dollars make the plan easy to relate to your current life."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'Future value is dollars on the statement. Purchasing power is what they can buy in today’s money.',
          '$500 a month at 10.5% for 40 years: $3.04 million on the statement, $933,009 in today’s dollars.',
          'Divide by (1 + inflation)^years to deflate a future amount.',
          'Plan in today’s dollars and always ask which kind of dollar a number is.',
        ]}
      />
    </div>
  );
}
