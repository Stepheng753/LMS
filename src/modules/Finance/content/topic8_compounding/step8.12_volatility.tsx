import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { Exercise } from '../../../../components/content/Exercise';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function Step8_12_Volatility() {
  return (
    <div>
      <StepHeader
        eyebrow="Topic 8 • Reality"
        title="Averages vs Reality: Why the Path Matters"
        summary="No year is ever 10.5%. Real returns jump around, and the order and size of the swings change what you end up with."
      />

      <Callout type="warning" title="The average is not what happens">
        The S&amp;P 500&apos;s average of about 10.5% is a long-run number. In any single year it can be +30% or −37%. The
        calculators in this course use a smooth rate because it is easy to understand. Real life is bumpy.
      </Callout>

      <Section title="A few real years (total return, approximate)" />
      <Table
        headers={['Year', 'S&P 500 total return']}
        align={['left', 'right']}
        rows={[
          ['2008', 'about −37%'],
          ['2019', 'about +31.5%'],
          ['2020', 'about +18%'],
          ['2021', 'about +28.7%'],
          ['2022', 'about −18%'],
          ['2023', 'about +26%'],
          ['2024', 'about +25%'],
        ]}
      />
      <p>Those seven years go from −37% to +31%. The long-run average comes from a mixture of great, bad and ordinary years.</p>

      <Section title="Same average, different result" />
      <p>Start with $10,000. Each pattern below has the same <em>simple</em> average return of 10% over two years:</p>
      <Table
        headers={['Year 1', 'Year 2', 'Simple average', 'You end with', 'Compound yearly rate']}
        align={['right', 'right', 'right', 'right', 'right']}
        rows={[
          ['+10%', '+10%', '10%', '$12,100', '10.0%'],
          ['+30%', '−10%', '10%', '$11,700', '8.2%'],
          ['+50%', '−30%', '10%', '$10,500', '2.5%'],
          ['+20%', '−20%', '0%', '$9,600', '−2.0%'],
        ]}
      />
      <Callout type="info" title="Volatility drag">
        The bigger the swings, the more the real (compound) growth falls behind the simple average. A loss hurts more than the
        same-size gain helps, because the loss is taken from a bigger base (step 8.1: a 50% loss needs a 100% gain). The
        S&amp;P 500 history already includes all of its swings, so the 10.5% figure is a compound rate that accounts for them.
      </Callout>

      <Section title="Five years of a bumpy market" />
      <Table
        headers={['Year', 'Return', 'Balance (start $10,000)']}
        align={['left', 'right', 'right']}
        rows={[
          ['1', '+30%', '$13,000'],
          ['2', '−20%', '$10,400'],
          ['3', '+10%', '$11,440'],
          ['4', '+25%', '$14,300'],
          ['5', '−5%', '$13,585'],
        ]}
      />
      <p>
        The simple average of those returns is 8% (30 − 20 + 10 + 25 − 5 = 40, divided by 5). The balance ended at $13,585,
        a compound rate of <strong>6.3%</strong> a year. If you had earned a smooth 8% you would have $14,693. The bumps cost
        about $1,100 in five years.
      </p>

      <Section title="Why this matters for you" />
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>While saving (like age 25 to 65):</strong> bad years are good news if you keep investing, because your new money buys shares cheaply. A long accumulation phase smooths the path.</li>
        <li><strong>While withdrawing (retirement):</strong> a crash <em>early</em> in retirement does lasting damage, because you sell shares at low prices. This is called sequence risk, and it is the reason for a modest withdrawal rate in Topic 9.</li>
        <li><strong>Behavior:</strong> the damage that matters most is selling at the bottom. A smooth average only works if you stay invested.</li>
      </ul>

      <Exercise
        title="Find the compound rate"
        hint={<p>Multiply the growth factors: 1 + each return. Then take the nth root.</p>}
        solution={
          <ul className="list-disc pl-5 space-y-1">
            <li>1.40 × 0.70 = 0.98, so $10,000 becomes <strong>$9,800</strong>: a loss, even though the simple average is +5%.</li>
            <li>Compound rate = 0.98^(1/2) − 1 = <strong>−1.0%</strong> a year.</li>
            <li>Lesson: you cannot judge a path by its simple average.</li>
          </ul>
        }
      >
        <p>A fund returns +40% in year 1 and −30% in year 2. What is the simple average, what do you end with from $10,000, and what is the compound yearly rate?</p>
      </Exercise>

      <QuizSet title="Check yourself">
        <Quiz
          question="A fund gains 20% one year and loses 20% the next. What happens to $10,000?"
          options={['It ends at $10,000', 'It ends at $9,600', 'It ends at $12,000', 'It ends at $8,000']}
          correctIndex={1}
          explanation="$10,000 × 1.20 × 0.80 = $9,600. The loss comes from a bigger base."
        />
        <Quiz
          question="When is a market crash most dangerous?"
          options={['While you are saving and buying', 'Early in retirement, when you are selling shares', 'Never', 'Only in the first year of investing']}
          correctIndex={1}
          explanation="Withdrawals during a crash lock in losses. This is sequence risk."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'Real returns swing from about −37% to +31% in single years. The 10.5% is a long-run compound average.',
          'Same simple average, different result: volatility drag lowers the compound rate.',
          'While saving, bad years help if you keep buying. While withdrawing, an early crash is the danger (Topic 9).',
          'The worst mistake is selling at the bottom.',
        ]}
      />
    </div>
  );
}
