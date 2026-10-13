import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { Flow } from '../../../../components/content/Flow';
import { Formula } from '../../../../components/content/Formula';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';
import { RothVsTraditional } from '../../calculators';

export default function Step7_6_RothTrad1() {
  return (
    <div>
      <StepHeader
        eyebrow="Topic 7 • Roth vs Traditional (1 of 4)"
        title="Roth vs Traditional: The Only Difference Is Timing"
        summary="Both accounts invest the same way. The single difference is when the tax is paid: before the money grows, or after."
      />

      <Callout type="info" title="The one idea to hold on to">
        Every dollar of retirement money is taxed <strong>exactly once</strong>. The Roth taxes it <strong>now</strong>, on
        the money you put in. The traditional account taxes it <strong>later</strong>, on the whole pile you take out. The
        entire Roth vs Traditional question is: <em>is your tax rate higher now, or later?</em>
      </Callout>

      <Section title="Two people, one $1,000 of pay" />
      <Flow
        steps={[
          { title: 'You earn $1,000', sub: 'before any tax' },
          { title: 'Traditional: invest all $1,000', sub: 'no tax now', via: 'pre-tax' },
          { title: 'Roth: pay tax first', sub: '22% tax leaves $780, invest that', via: 'after-tax' },
        ]}
      />
      <p>Both invest at 8% a year for 30 years. At 8%, money multiplies by about <strong>10.06</strong> over 30 years (1.08 to the 30th power).</p>
      <Table
        headers={['Step', 'Traditional', 'Roth']}
        align={['left', 'right', 'right']}
        rows={[
          ['You start with (pre-tax pay)', '$1,000', '$1,000'],
          ['Tax paid now (22%)', '$0', '−$220'],
          ['Amount invested', '$1,000', '$780'],
          ['After 30 years at 8% (×10.06)', '$10,063', '$7,849'],
          ['Tax paid at withdrawal (22%)', '−$2,214', '$0'],
          [<strong key="a">What you actually keep</strong>, <strong key="b">$7,849</strong>, <strong key="c">$7,849</strong>],
        ]}
      />
      <Callout type="success" title="They are identical">
        When your tax rate is the same before and after, <strong>both accounts leave you with exactly the same money</strong>.
        The Roth paid 22% on $1,000 up front. The traditional paid 22% on $10,063 at the end. The order of the multiplication
        does not change the answer.
      </Callout>
      <Formula label="Why they match">
        $1,000 × (1 − 22%) × 10.06   =   $1,000 × 10.06 × (1 − 22%)
      </Formula>
      <p>Multiplication does not care about order. That is the whole math behind the claim.</p>

      <Section title="Try it with any rates" />
      <p>
        The calculator starts with the <strong>same tax rate now and later</strong> (22% and 22%). Notice the difference is
        zero. Then change only one of the rates and watch the winner flip. That is the next lesson.
      </p>
      <RothVsTraditional taxNow={22} taxLater={22} />

      <Section title="Same rate, many amounts" />
      <p>Lump sum of $10,000 of pay, 8%, 30 years. The result is a tie every time the two rates match:</p>
      <Table
        headers={['Tax now', 'Tax later', 'Traditional (after tax)', 'Roth', 'Difference']}
        align={['left', 'left', 'right', 'right', 'right']}
        rows={[
          ['12%', '12%', '$88,551', '$88,551', '$0'],
          ['22%', '22%', '$78,489', '$78,489', '$0'],
          ['24%', '24%', '$76,476', '$76,476', '$0'],
        ]}
      />

      <QuizSet title="Check yourself">
        <Quiz
          question="If your tax rate is 22% when you contribute and 22% when you withdraw, which account leaves you with more money?"
          options={['Roth', 'Traditional', 'They leave the same amount', 'It depends on the investment']}
          correctIndex={2}
          explanation="The tax is a percentage of the same money, just taken at a different time. The result is identical."
        />
        <Quiz
          question="What single question decides between Roth and traditional?"
          options={['Which has lower fees?', 'Is my tax rate higher now or later?', 'Which has a higher limit?', 'Which my employer prefers?']}
          correctIndex={1}
          explanation="With the same investment, only the tax rate now versus later changes the result."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'Retirement money is taxed exactly once: Roth now, traditional later.',
          'If the tax rate now equals the rate later, the two accounts give identical results.',
          'The math: $1,000 × (1 − t) × growth = $1,000 × growth × (1 − t).',
          'The only real question is whether your rate is higher now or later.',
        ]}
      />
    </div>
  );
}
