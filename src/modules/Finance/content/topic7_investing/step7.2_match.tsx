import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { Exercise } from '../../../../components/content/Exercise';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function Step7_2_Match() {
  return (
    <div>
      <StepHeader
        eyebrow="Topic 7 • Accounts"
        title="The Employer Match: Free Money"
        summary="The best deal in personal finance, and the first thing you do after you start a job."
      />

      <Callout type="success" title="What it is">
        Many employers add money to your 401k when you add your own. If your employer matches 100% of the first 4% of your
        pay, and you put in 4%, the employer puts in another 4%. You doubled your money in the first second.
      </Callout>

      <Section title="The math, with real money" />
      <Table
        headers={['You earn $100,000. Employer matches 100% up to 4%.', 'You put in', 'Employer adds', 'Total in the 401k']}
        align={['left', 'right', 'right', 'right']}
        rows={[
          ['You contribute 0%', '$0', '$0', '$0'],
          ['You contribute 2%', '$2,000', '$2,000', '$4,000'],
          [<strong key="a">You contribute 4% (the full match)</strong>, <strong key="b">$4,000</strong>, <strong key="c">$4,000</strong>, <strong key="d">$8,000</strong>],
          ['You contribute 10%', '$10,000', '$4,000', '$14,000'],
        ]}
      />
      <p>
        At 4% you receive $4,000 you would never otherwise see. That is a <strong>100% return</strong> before the money is
        invested at all. If you skip the match, you are turning down $4,000 of salary. And it compounds: $4,000 a year for
        30 years at 10% grows to about $658,000 (Topic 8).
      </p>

      <Section title="Common match formulas" />
      <Table
        headers={['Formula', 'How it works', 'To get the full match']}
        rows={[
          ['100% of the first 4%', 'Dollar for dollar up to 4% of pay', 'Contribute 4%'],
          ['50% of the first 6%', 'Fifty cents per dollar up to 6% of pay', 'Contribute 6% (get 3% from the employer)'],
          ['100% of the first 3%, then 50% of the next 2%', 'A tiered match', 'Contribute 5% (get 4%)'],
          ['A fixed amount', 'Employer puts in a flat $ or % no matter what', 'Often automatic, check'],
        ]}
      />
      <p>
        Find your match in the benefits portal or ask HR: &quot;What is the match formula, and what do I have to contribute to
        get the full amount?&quot;
      </p>

      <Section title="Vesting: when the match becomes yours" />
      <p>
        Your own contributions are always yours. The employer&apos;s match may <strong>vest</strong> over time: if you leave
        early, you might forfeit part of it. Common schedules are <em>immediate</em>, <em>cliff</em> (all after 3 years) and
        <em> graded</em> (20% a year over 5 years). Check the vesting schedule before a job change. A few months can be worth thousands.
      </p>

      <Callout type="info" title="Roth 401k and the match">
        Even if you choose the Roth 401k for your own contributions, the employer match is usually deposited in the
        traditional (pre-tax) part of the account, and you will owe tax on it when you withdraw it. If your plan allows,
        some employers let you take the match as Roth, but then you owe tax on it that year.
      </Callout>

      <Exercise
        title="Work out your match"
        solution={
          <ul className="list-disc pl-5 space-y-1">
            <li>$80,000 × 3% = $2,400 contributed by you for the full match, and $2,400 from the employer.</li>
            <li>The employer adds $4,800 total only if you contribute 6%.</li>
            <li>If you contribute 3% you get $2,400 of free money, a 100% return.</li>
          </ul>
        }
      >
        <p>You earn $80,000. The employer matches 100% of the first 3%. How much do you put in, and how much does the employer add? What if the match were 100% of the first 6%?</p>
      </Exercise>

      <QuizSet title="Check yourself">
        <Quiz
          question="Your employer matches 50% of the first 6% of pay. You earn $60,000 and contribute 6%. How much does the employer add?"
          options={['$3,600', '$1,800', '$360', '$6,000']}
          correctIndex={1}
          explanation="You put in $3,600. The employer adds 50% of that, $1,800."
        />
        <Quiz
          question="What is the return on contributing enough to get a 100% match?"
          options={['10%', '50%', '100%, immediately', 'It depends on the market']}
          correctIndex={2}
          explanation="You double your money before any investing happens."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'The match is free money: a 100% return in the first second.',
          'Contribute at least enough to get it all, even before paying off debt.',
          'Check the match formula and the vesting schedule.',
          'The employer match is usually pre-tax, even if you pick Roth.',
        ]}
      />
    </div>
  );
}
