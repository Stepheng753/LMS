import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Steps } from '../../../../components/content/Steps';
import { Table } from '../../../../components/content/Table';
import { Exercise } from '../../../../components/content/Exercise';
import { Collapsible } from '../../../../components/content/Collapsible';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function Step1_5_PayoffPlan() {
  return (
    <div>
      <StepHeader
        eyebrow="Topic 1 • Debt"
        title="Build Your Payoff Plan"
        summary="A step-by-step plan to get out of bad debt, plus the tools that help and the shortcuts that hurt."
      />

      <Section title="The plan, in six steps" />
      <Steps
        steps={[
          { title: 'Write down every debt', children: <p>Who you owe, the balance, the rate (APR) and the minimum payment. Log in to each account, or look at your credit report for free at annualcreditreport.com. Seeing the whole number is the hardest and most important step.</p> },
          { title: 'Stop adding new debt', children: <p>Put the cards away. Use debit or cash while you pay it off. Pause any buy-now-pay-later. The plan fails if the debt grows faster than you pay it.</p> },
          { title: 'Take the match, build a tiny cushion', children: <p>Keep taking the full employer 401k match (Topic 7). Save a small starter emergency fund of about $1,000 so a flat tire does not become a new card balance.</p> },
          { title: 'Find the extra money', children: <p>Use the budget (Topic 2) to find a number you can add every month. Even $50 helps. Direct raises, bonuses and refunds to the debt.</p> },
          { title: 'Run the snowball', children: <p>Order debts from smallest to largest balance, pay minimums on all, and send everything extra to the smallest. Roll payments forward as each debt dies.</p> },
          { title: 'Celebrate, then keep the payment', children: <p>When the last debt is gone, keep sending that same monthly amount, now to the emergency fund and then to investing (the order of operations). You already live without that money.</p> },
        ]}
      />

      <Section title="Tools that can help (and their catches)" />
      <Table
        headers={['Tool', 'What it does', 'The catch']}
        rows={[
          [<strong key="a">Call and ask for a lower rate</strong>, 'Call your card company. Ask for a lower APR, especially if you have paid on time for a year', 'It is free to ask. They often say no, sometimes yes'],
          [<strong key="b">0% balance transfer card</strong>, 'Moves a card balance to a 0% promotional rate for 12 to 21 months', 'A 3% to 5% fee, and a high rate after the promo. Only if you will pay it off before the promo ends and stop spending'],
          [<strong key="c">Debt consolidation loan</strong>, 'One lower-rate loan pays off several higher-rate debts', 'Only helps if the new rate is lower and you do not run the cards back up'],
          [<strong key="d">Nonprofit credit counseling</strong>, 'A free or low-cost counselor can negotiate lower rates in a debt-management plan', 'Check that it is a real nonprofit (NFCC member)'],
          [<strong key="e">Negotiating medical bills</strong>, 'Ask for an itemized bill, a financial assistance application and a payment plan', 'Never put medical bills on a credit card'],
        ]}
      />

      <Callout type="warning" title="Shortcuts that hurt">
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Payday and title loans.</strong> Rates in the hundreds of percent. Never.</li>
          <li><strong>Debt settlement companies</strong> that charge big fees and tell you to stop paying. They can wreck your credit.</li>
          <li><strong>Borrowing from your 401k</strong> to pay a card. It shrinks your future and has tax traps.</li>
          <li><strong>Closing old cards</strong> right after paying them off. It can lower your credit score (Topic 3).</li>
        </ul>
      </Callout>

      <Section title="Your turn" />
      <Exercise
        title="Write your own plan on paper"
        hint={<p>Use the Debt payoff calculator in step 1.4 to see how long it will take with different extra amounts.</p>}
        solution={
          <ul className="list-disc pl-5 space-y-1">
            <li>A list of every debt with balance, APR and minimum, ordered smallest to largest.</li>
            <li>An extra monthly amount you are sure you can pay, even if it is small.</li>
            <li>A date: the month you will be debt-free, from the calculator.</li>
            <li>The one thing you will stop doing so the debt stops growing.</li>
            <li>What the same monthly amount will do after the last debt: the next rung of the order of operations.</li>
          </ul>
        }
      >
        <p>Imagine you have the four debts from step 1.4. Write the plan: the order, the extra amount, the payoff date, the habit you will stop, and where the freed money goes afterwards.</p>
      </Exercise>

      <Collapsible title="What if I have no debt?">
        <p>Wonderful. Skip straight to Topic 2. Keep this topic as your guard rail: the habit that keeps you out is treating every purchase as one you can pay for now.</p>
      </Collapsible>

      <KeyTakeaways
        items={[
          'Write every debt down, stop adding new debt, keep the match, and hold a small cushion.',
          'Run the snowball with an extra amount you can truly keep up.',
          'Call to ask for a lower rate. Use 0% transfers and consolidation loans only with discipline.',
          'Avoid payday loans, settlement companies, 401k loans and closing old cards.',
          'When debt is gone, keep paying yourself that same monthly amount.',
        ]}
      />
    </div>
  );
}
