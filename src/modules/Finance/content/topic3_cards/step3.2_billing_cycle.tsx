import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { Flow } from '../../../../components/content/Flow';
import { Exercise } from '../../../../components/content/Exercise';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';
import { CardBillingTimeline } from '../../calculators';

export default function Step3_2_BillingCycle() {
  return (
    <div>
      <StepHeader
        eyebrow="Topic 3 • Credit Cards"
        title="The Billing Period, Statement Date and Due Date"
        summary="Three dates run every card. Know them and you never pay interest or a late fee."
      />

      <Section title="The three dates" />
      <Flow
        steps={[
          { title: 'Billing period', sub: 'About 30 days of purchases are collected' },
          { title: 'Statement closing date', sub: 'The bank adds it up and sends the bill', via: 'period ends' },
          { title: 'Payment due date', sub: 'At least 21 days later. Pay in full here', via: 'grace period' },
        ]}
      />
      <Table
        headers={['Term', 'What it means', 'Example']}
        rows={[
          [<strong key="a">Billing period (cycle)</strong>, 'The span of about 30 days whose purchases land on one bill', 'Oct 16 to Nov 15'],
          [<strong key="b">Statement closing date</strong>, 'The last day of the billing period. Your balance on this day is the statement balance', 'Nov 15'],
          [<strong key="c">Statement balance</strong>, 'What you owe from that whole period. Pay this in full and you pay no interest', '$1,240'],
          [<strong key="d">Payment due date</strong>, 'The deadline to pay. By law at least 21 days after the statement closes', 'Dec 10'],
          [<strong key="e">Grace period</strong>, 'The free time between the statement date and the due date', '25 days'],
        ]}
      />

      <Section title="A purchase, from swipe to payment" />
      <p>Your card&apos;s statement closes on the <strong>15th</strong> of each month, and payment is due <strong>25 days later</strong>.</p>
      <Table
        headers={['You buy on', 'It lands on the statement that closes', 'It is due on', 'Days you hold the money free']}
        rows={[
          ['Nov 3', 'Nov 15', 'Dec 10', '37 days'],
          ['Nov 14', 'Nov 15', 'Dec 10', '26 days'],
          ['Nov 16', 'Dec 15', 'Jan 9', '54 days'],
        ]}
      />
      <Callout type="tip" title="The trick: buy right after the statement closes">
        A purchase made the day after the statement closes has the longest wait (about 54 days). It is not about
        spending more. It is just that you hold the money a little longer. The trick is only a bonus. The rule that
        matters is paying the whole statement.
      </Callout>

      <Section title="Pick a date and see it" />
      <p>
        The calculator shows the dates for any purchase. Try buying the day before and the day after the statement closes.
        Then try paying only the minimum and watch the interest appear.
      </p>
      <CardBillingTimeline />

      <Section title="The habit that makes it all safe" />
      <ol className="list-decimal pl-5 space-y-1">
        <li>Turn on <strong>autopay for the full statement balance</strong>, not the minimum.</li>
        <li>Keep enough in checking to cover it. Set a low-balance alert.</li>
        <li>Turn on <strong>purchase alerts</strong> in the card&apos;s app to catch fraud and track spending.</li>
        <li>Open each statement once to check for mistakes and forgotten subscriptions.</li>
      </ol>

      <Exercise
        title="Find your own dates"
        solution={
          <ul className="list-disc pl-5 space-y-1">
            <li>The statement closing date and payment due date, from the app or your latest statement.</li>
            <li>The length of the grace period in days.</li>
            <li>The best day to start big purchases (the day after it closes).</li>
            <li>Autopay switched to &quot;statement balance&quot;.</li>
          </ul>
        }
      >
        <p>Log in to a card (or ask someone to show theirs) and find the statement closing date and the due date. How many days of grace do you get? Is autopay set to the full statement balance?</p>
      </Exercise>

      <QuizSet title="Check yourself">
        <Quiz
          question="Statement closes on the 15th and is due 25 days later. You buy on the 16th. When is it due?"
          options={['In 9 days', 'On the next statement\'s due date, about 54 days later', 'Right away', 'Never']}
          correctIndex={1}
          explanation="The purchase misses this statement and lands on the next one."
        />
        <Quiz
          question="What do you pay to avoid interest?"
          options={['The minimum', 'The statement balance in full by the due date', 'Half the balance', 'Whatever you can']}
          correctIndex={1}
          explanation="Paying the full statement balance keeps the grace period."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'Billing period (about 30 days), statement closing date, then the due date at least 21 days later.',
          'Pay the statement balance in full by the due date and pay $0 interest.',
          'A purchase just after the statement closes has the longest free float.',
          'Autopay the full statement, keep a buffer, and turn on alerts.',
        ]}
      />
    </div>
  );
}
