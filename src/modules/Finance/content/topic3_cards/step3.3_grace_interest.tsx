import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { Compare } from '../../../../components/content/Compare';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function Step3_3_GraceInterest() {
  return (
    <div>
      <StepHeader
        eyebrow="Topic 3 • Credit Cards"
        title="Grace Period, Interest and the Minimum Payment"
        summary="When a card is free, the exact moment it starts costing 24%, and why paying 'just the minimum' is the costly choice."
      />

      <Section title="Three numbers on every statement" />
      <Table
        headers={['Number', 'What it is', 'What paying it does']}
        rows={[
          [<strong key="a">Statement balance</strong>, 'Everything you spent in the billing period', 'Pay this in full: $0 interest. Always the goal'],
          [<strong key="b">Minimum payment</strong>, 'About 1% of the balance plus interest and fees, or around $35', 'Avoids a late fee, but interest starts on the rest'],
          [<strong key="c">Current balance</strong>, 'Statement balance plus anything you bought since', 'Not the amount to pay. It includes purchases that are not due yet'],
        ]}
      />

      <Section title="The grace period is all or nothing" />
      <p>
        The grace period means <strong>no interest if you pay the statement balance in full</strong>. If you pay even one
        dollar less, you lose the grace period on <strong>the entire balance</strong>, and interest is charged on every
        purchase from the day you made it, not from the due date. It is a cliff, not a slope.
      </p>
      <Compare
        goodLabel="Pay the full $1,240 statement"
        badLabel="Pay the $35 minimum"
        good={
          <>
            <p><strong>Interest:</strong> $0.00</p>
            <p>The next statement starts fresh.</p>
            <p>The grace period is intact for new purchases.</p>
          </>
        }
        bad={
          <>
            <p><strong>Interest:</strong> about $24 this month at 24%, plus interest on new purchases from day one.</p>
            <p>Balance left: $1,205 and growing with new purchases.</p>
            <p>The grace period is gone until you pay the whole balance for a full cycle.</p>
          </>
        }
      />

      <Section title="What $1,240 at 24% costs if you only pay the minimum" />
      <p>
        If the minimum is a flat $35 and you never add a purchase, the $1,240 takes about <strong>62 months</strong> (over 5 years) and costs
        about <strong>$940 in interest</strong>. A $1,240 statement turns into about $2,180 paid. Real cards also keep shrinking the
        minimum, which stretches it even longer.
      </p>

      <Section title="Other ways a card costs you money" />
      <Table
        headers={['Charge', 'What it is', 'How to avoid it']}
        rows={[
          [<strong key="a">Late fee</strong>, 'A fee, often $30 or more, for missing the due date', 'Autopay the full statement'],
          [<strong key="b">Penalty APR</strong>, 'A higher rate, up to about 30%, after a missed payment', 'Never miss one'],
          [<strong key="c">Cash advance fee and rate</strong>, 'Fees of 3% to 5%, a higher APR, and interest from the first day', 'Never take cash from a credit card'],
          [<strong key="d">Annual fee</strong>, 'A yearly charge for premium cards', 'Only keep it if the rewards are worth more (step 3.4)'],
          [<strong key="e">Foreign transaction fee</strong>, 'Often 3% on purchases abroad', 'Use a card with no foreign fee when traveling'],
          [<strong key="f">Balance transfer fee</strong>, '3% to 5% for moving a balance', 'Only for a clear payoff plan (Topic 1)'],
        ]}
      />

      <Callout type="warning" title="Never use a card cash advance">
        Pulling cash from an ATM with a credit card has a fee up front, a higher rate than purchases, and no grace
        period. It is one of the most expensive ways to get money.
      </Callout>

      <Callout type="info" title="If you cannot pay in full this month">
        Pay as much as you can, and always at least the minimum so you avoid a late fee. Then stop using that card for new
        purchases until the balance is zero. Treat it as a debt to attack with the snowball (Topic 1).
      </Callout>

      <QuizSet title="Check yourself">
        <Quiz
          question="You have a $900 statement balance and pay $899 by the due date. What happens to the grace period?"
          options={['Nothing', 'You lose it on the whole balance', 'You only lose it on $1', 'It doubles']}
          correctIndex={1}
          explanation="The grace period requires paying the full statement balance. Anything less loses it."
        />
        <Quiz
          question="Which number should autopay be set to?"
          options={['Minimum payment', 'Statement balance', 'Current balance', 'Nothing']}
          correctIndex={1}
          explanation="The full statement balance pays no interest and avoids the late fee."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'Pay the statement balance in full for $0 interest. The grace period is all or nothing.',
          'The minimum avoids a late fee but starts interest on everything.',
          'A $1,240 balance at 24%, paid at $35 a month, takes about 62 months and costs about $940 in interest.',
          'Never use cash advances. Avoid late fees with autopay.',
        ]}
      />
    </div>
  );
}
