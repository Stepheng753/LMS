import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';
import { CompoundCalculator } from '../../calculators';

export default function Step8_4_BlowItUp() {
  return (
    <div>
      <StepHeader
        eyebrow="Topic 8 • The Slow Build"
        title="Blow It Up: 10, 20, 30 and 40 Years"
        summary="The same $10,000 a year at 10%. Watch the deposits barely move while the growth takes over."
      />

      <Section title="Same plan, longer" />
      <p>You still add $10,000 at the start of each year, and earn 10%. Here is what the same rule does over time.</p>
      <Table
        headers={['Years', 'You deposited', 'Balance', 'Growth did', 'Growth share']}
        align={['left', 'right', 'right', 'right', 'right']}
        rows={[
          ['5', '$50,000', '$67,156', '$17,156', '26%'],
          ['10', '$100,000', '$175,312', '$75,312', '43%'],
          ['20', '$200,000', '$630,025', '$430,025', '68%'],
          ['30', '$300,000', '$1,809,434', '$1,509,434', '83%'],
          ['40', '$400,000', '$4,868,518', '$4,468,518', '92%'],
        ]}
      />
      <Callout type="success" title="Look at the last row">
        You put in $400,000. You have almost $4.9 million. <strong>Growth supplied 92% of the money.</strong> You did the
        work of saving. The compounding did the work of building wealth.
      </Callout>

      <Section title="Where the money is made" />
      <p>The balance does not grow evenly. Look at how much comes in each decade:</p>
      <Table
        headers={['Decade', 'Balance gained in that decade']}
        align={['left', 'right']}
        rows={[
          ['Years 1 to 10', '$175,312'],
          ['Years 11 to 20', '$454,713'],
          ['Years 21 to 30', '$1,179,409'],
          ['Years 31 to 40', '$3,059,084'],
        ]}
      />
      <p>
        About 87% of the final balance arrives in the <em>last two decades</em>. The last decade alone adds $3.06 million, more
        than the first three decades combined ($1.81 million). That is why quitting early or withdrawing early is so costly: you give
        up the part that grows the fastest.
      </p>

      <Section title="What if you only deposit once?" />
      <Table
        headers={['Years', 'One $10,000 deposit at 10%']}
        align={['left', 'right']}
        rows={[
          ['10', '$25,937'],
          ['20', '$67,275'],
          ['30', '$174,494'],
          ['40', '$452,593'],
        ]}
      />
      <p>
        A single $10,000 at age 25 becomes about <strong>$452,593 by age 65</strong>, without another dollar. The one-time
        investment alone is worth half a million dollars.
      </p>

      <Section title="Try it, and push the years" />
      <p>Start with 40 years. Then try 20, then 30. Move the yearly amount. Look at the chart curving upward and at the table.</p>
      <CompoundCalculator start={0} yearly={10000} rate={10} years={40} timing="begin" title="$10,000 a year for 40 years at 10%" presets={[
        { label: '$10,000 a year, 40 years', start: 0, yearly: 10000, rate: 10, years: 40 },
        { label: '20 years', start: 0, yearly: 10000, rate: 10, years: 20 },
        { label: '30 years', start: 0, yearly: 10000, rate: 10, years: 30 },
        { label: 'One $10,000 deposit, 40 years', start: 10000, yearly: 0, rate: 10, years: 40 },
        { label: '$5,000 a year, 40 years', start: 0, yearly: 5000, rate: 10, years: 40 },
      ]} />

      <QuizSet title="Check yourself">
        <Quiz
          question="After 40 years of $10,000 a year at 10%, about what share of the balance is growth?"
          options={['8%', '50%', '92%', '100%']}
          correctIndex={2}
          explanation="You deposited $400,000 and the balance is about $4.87 million, so growth is about 92%."
        />
        <Quiz
          question="A single $10,000 invested for 40 years at 10% becomes about:"
          options={['$50,000', '$100,000', '$452,593', '$4,000,000']}
          correctIndex={2}
          explanation="$10,000 × 1.10^40 = $452,593."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          '$10,000 a year at 10%: $175k after 10 years, $630k after 20, $1.8M after 30, $4.9M after 40.',
          'After 40 years, growth is 92% of the balance.',
          'The last decade adds more than the first three combined.',
          'One $10,000 deposit at 25 becomes about $452,593 by 65.',
        ]}
      />
    </div>
  );
}
