import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { Compare } from '../../../../components/content/Compare';
import { Exercise } from '../../../../components/content/Exercise';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';
import { RothVsTraditional } from '../../calculators';

export default function Step7_7_RothTrad2() {
  return (
    <div>
      <StepHeader
        eyebrow="Topic 7 • Roth vs Traditional (2 of 4)"
        title="When the Rates Differ"
        summary="Now change one tax rate. The account that taxes you at the lower rate wins, by exactly the gap in rates."
      />

      <Section title="The rule" />
      <Callout type="success" title="Pay tax when your rate is lowest">
        <ul className="list-disc pl-5 space-y-1">
          <li>If your tax rate will be <strong>higher later</strong> than now, pay tax now: <strong>Roth wins</strong>.</li>
          <li>If your tax rate will be <strong>lower later</strong> than now, pay tax later: <strong>traditional wins</strong>.</li>
          <li>If the rates are <strong>equal</strong>, nothing changes: <strong>a tie</strong>.</li>
        </ul>
      </Callout>

      <Section title="Six cases, $10,000 of pay at 8% for 30 years" />
      <Table
        headers={['Tax now', 'Tax later', 'Traditional (after tax)', 'Roth', 'Winner']}
        align={['left', 'left', 'right', 'right', 'left']}
        rows={[
          ['22%', '22%', '$78,489', '$78,489', 'Tie'],
          ['22%', '12%', '$88,551', '$78,489', 'Traditional, by $10,063'],
          ['32%', '22%', '$78,489', '$68,426', 'Traditional, by $10,063'],
          ['12%', '22%', '$78,489', '$88,551', 'Roth, by $10,063'],
          ['12%', '24%', '$76,476', '$88,551', 'Roth, by $12,075'],
          ['24%', '32%', '$68,426', '$76,476', 'Roth, by $8,050'],
        ]}
      />
      <p>
        The winner always pays tax at the lower rate. And the gap is the same size in dollars whenever the percentage gap
        is the same: a 10-point difference is worth $10,063 on $10,000 of pay over 30 years.
      </p>

      <Section title="Play with the rates" />
      <p>
        Change only the two tax rates, one at a time. Watch which side wins. The presets at the top show a lower
        rate in retirement, a higher rate in retirement, and a young person in a low bracket.
      </p>
      <RothVsTraditional taxNow={22} taxLater={12} />

      <Section title="So which will your rate be? Nobody knows." />
      <Compare
        goodLabel="Reasons your later rate could be LOWER (favors traditional)"
        badLabel="Reasons your later rate could be HIGHER (favors Roth)"
        good={
          <>
            <p>You retire with less income than you earned while working, so you land in a lower bracket.</p>
            <p>You live in a high-tax state now (California) and retire in a no-tax state.</p>
            <p>You are at the peak of your earnings now and expect to spend less later.</p>
          </>
        }
        bad={
          <>
            <p><strong>Tax rates are historically low right now.</strong> The top federal rate was 91% in the early 1960s and 70% in the 1970s. Congress can raise rates, and the national debt pushes that way.</p>
            <p>You are early in your career in a low bracket, and your income will grow.</p>
            <p>You will have large traditional balances. Required withdrawals can push you into higher brackets.</p>
            <p>Social Security benefits become taxable at higher incomes.</p>
            <p>You have rental income, a pension or investments that add taxable income in retirement.</p>
          </>
        }
      />
      <Callout type="info" title="A diversification view">
        Because no one knows the future rate, a mix of both is a hedge: some money taxed now, some taxed later. You then
        choose where to withdraw from each year to control your tax bracket. The playbook prefers leaning on Roth (the
        next two lessons), but the mix argument is real.
      </Callout>

      <Exercise
        title="Pick the winner"
        hint={<p>The account that taxes you at the lower rate wins.</p>}
        solution={
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>A (24% now, 12% later):</strong> traditional wins. You pay 12% instead of 24%.</li>
            <li><strong>B (12% now, 22% later):</strong> Roth wins. You pay 12% instead of 22%.</li>
            <li><strong>C (22% now, 22% later):</strong> a tie.</li>
          </ul>
        }
      >
        <p>Which wins in each case? A: 24% now, 12% later. B: 12% now, 22% later. C: 22% now, 22% later.</p>
      </Exercise>

      <QuizSet title="Check yourself">
        <Quiz
          question="You are in the 12% bracket now and expect to be in the 24% bracket in retirement. Which wins?"
          options={['Traditional', 'Roth', 'Tie', 'Neither']}
          correctIndex={1}
          explanation="Paying 12% now instead of 24% later is better, so the Roth wins."
        />
        <Quiz
          question="Which of these argues for traditional?"
          options={['Tax rates will rise sharply', 'You expect a much lower tax rate in retirement', 'You are young in a low bracket', 'You expect large required withdrawals']}
          correctIndex={1}
          explanation="A lower later rate means paying tax later is cheaper."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'Roth wins if your tax rate is higher later. Traditional wins if it is lower later. Equal rates tie.',
          'A 10-point rate difference on $10,000 of pay over 30 years is worth about $10,000.',
          'Nobody knows future tax rates. There are real arguments both ways.',
          'A mix of both is a hedge, but this playbook leans Roth.',
        ]}
      />
    </div>
  );
}
