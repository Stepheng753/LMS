import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Steps } from '../../../../components/content/Steps';
import { Table } from '../../../../components/content/Table';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function Step7_12_Backdoor() {
  return (
    <div>
      <StepHeader
        eyebrow="Topic 7 • If You Earn Too Much"
        title="If You Earn Too Much: The Backdoor Roth"
        summary="A short, legal workaround for high earners who are blocked from contributing to a Roth IRA directly."
      />

      <Callout type="info" title="Who this is for">
        Only if your income is above the Roth IRA limit ($168,000 single or $252,000 married in 2026). If you earn less,
        skip this step: contribute directly. And before doing it for real, talk to a tax professional. The rules have a trap.
      </Callout>

      <Section title="The idea in one line" />
      <p>
        You cannot <em>contribute</em> to a Roth IRA above the income limit, but anyone can <em>convert</em> money to a
        Roth regardless of income. So you put money into a traditional IRA (with no deduction), then convert it to Roth
        immediately.
      </p>

      <Section title="The five steps" />
      <Steps
        steps={[
          { title: 'Open a traditional IRA and a Roth IRA', children: <p>At the same broker, so the conversion is one click.</p> },
          { title: 'Contribute $7,500 to the traditional IRA as a non-deductible contribution', children: <p>You pay tax on this money already (you take no deduction). Keep it in cash.</p> },
          { title: 'Convert it to the Roth IRA', children: <p>A few days later is fine. The conversion moves the $7,500 and any tiny interest it earned.</p> },
          { title: 'Buy your investment inside the Roth', children: <p>The money is now in the Roth, in cash. Buy your fund (step 7.14).</p> },
          { title: 'File Form 8606 with your tax return', children: <p>This form records that your contribution was non-deductible, so you are not taxed on it twice.</p> },
        ]}
      />

      <Section title="The trap: the pro-rata rule" />
      <p>
        When you convert, the IRS treats <strong>all your traditional, SEP and SIMPLE IRA money as one pot</strong>. If you
        have other pre-tax IRA money, part of your conversion is taxable.
      </p>
      <Table
        headers={['You have', 'Conversion of $7,500', 'Taxable part']}
        align={['left', 'right', 'right']}
        rows={[
          ['No other traditional IRA money', '$7,500', '$0 (the backdoor works perfectly)'],
          ['$7,500 of new non-deductible money and $67,500 of old pre-tax IRA money (total $75,000)', '$7,500', 'About 90% taxable ($6,750), because 90% of the pot is pre-tax'],
        ]}
      />
      <Callout type="warning" title="How to avoid it">
        If you have old traditional IRA money, you can often roll it into your <strong>401k</strong> first (if the plan accepts
        it), which clears the IRA pot to zero. Then do the backdoor. Get advice before you do this with large balances.
      </Callout>

      <Section title="Two related ideas, by name only" />
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>Mega backdoor Roth:</strong> some 401k plans let you contribute <em>after-tax</em> money above $24,500 (up to the $72,000 total limit) and convert it to Roth. It exists only if your plan allows both steps.</li>
        <li><strong>Roth 401k:</strong> if you only need a way to put more into Roth than $7,500, the Roth 401k has no income limit. Often that is simpler than the backdoor.</li>
      </ul>

      <QuizSet title="Check yourself">
        <Quiz
          question="Why does the backdoor Roth work?"
          options={['It avoids all tax', 'Conversions to a Roth have no income limit, even though direct contributions do', 'The IRS ignores it', 'Banks allow it']}
          correctIndex={1}
          explanation="You can convert at any income. The backdoor uses a non-deductible traditional IRA contribution followed by a conversion."
        />
        <Quiz
          question="What is the pro-rata rule's effect?"
          options={['It doubles the limit', 'Other pre-tax IRA money makes part of your conversion taxable', 'It removes the penalty', 'It only affects the 401k']}
          correctIndex={1}
          explanation="The IRS counts all your traditional IRA money as one pot."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'Only for people above the Roth IRA income limit. Everyone else contributes directly.',
          'Steps: non-deductible traditional IRA contribution, convert to Roth, buy the fund, file Form 8606.',
          'The pro-rata rule makes the conversion partly taxable if you have other pre-tax IRA money.',
          'The Roth 401k may be a simpler way to add Roth money. Get tax advice before large conversions.',
        ]}
      />
    </div>
  );
}
