import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { Steps } from '../../../../components/content/Steps';
import { Exercise } from '../../../../components/content/Exercise';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';
import { OrderOfOperations } from '../../calculators';

export default function Step7_15_System() {
  return (
    <div>
      <StepHeader
        eyebrow="Topic 7 • Your System"
        title="Your Automatic Monthly System"
        summary="Turn the whole topic into a setup you build once: accounts opened, transfers automated, and a calendar that runs itself."
      />

      <Section title="The system in one picture" />
      <Table
        headers={['Where the money is', 'What it is', 'How it is funded']}
        rows={[
          [<strong key="a">Checking</strong>, 'Pays bills. A buffer of one month of expenses', 'Your net paycheck'],
          [<strong key="b">High-yield savings</strong>, 'Emergency fund', 'Automatic transfer on payday until full'],
          [<strong key="c">Roth IRA</strong>, 'First tax-free account', '$625 a month, automatic, auto-buys the S&P 500 fund'],
          [<strong key="d">401k (Roth if offered)</strong>, 'Match first, then up to $24,500', 'Payroll deduction'],
          [<strong key="e">HSA</strong>, 'Health and long-term savings', 'Payroll deduction'],
          [<strong key="f">Brokerage</strong>, 'Everything above the limits', 'Automatic transfer on payday'],
        ]}
      />

      <Section title="A real timeline" />
      <p>You earn $100,000 and have $2,500 a month to put to work. You owe $6,000 on a card. The emergency fund target is $15,000, with $3,000 saved. The ladder runs itself:</p>
      <Table
        headers={['When', 'What the $2,500 does']}
        rows={[
          ['Months 1 to 3', '$333 to the 401k match every month, $2,167 to the card. Card paid off in month 3'],
          ['Months 4 to 9', '$333 to the match, $2,167 to the emergency fund. About $12,000 added. Fund full in month 9'],
          ['Month 10 onward', '$333 match + $625 Roth IRA + about $1,542 into the Roth 401k above the match. The IRA is full at $625'],
          ['After a raise or a bonus', 'The 401k fills toward $24,500, then the HSA, the FSA and the brokerage'],
        ]}
      />
      <p>
        From month 10, about $2,500 a month, $30,000 a year, goes into the investments with no further decision. Over 30
        years at 10%, that is about <strong>$4.9 million</strong> in future dollars, before inflation (Topic 8).
      </p>

      <Section title="Setting it up: a one-weekend checklist" />
      <Steps
        steps={[
          { title: 'Know your employer plan', children: <p>Find the match formula, whether a Roth 401k exists, the vesting schedule, and the fund menu with expense ratios.</p> },
          { title: 'Set the 401k', children: <p>Contribute enough for the full match at least. Choose Roth if offered. Pick the S&amp;P 500 index fund. Turn on yearly auto-increase.</p> },
          { title: 'Open the high-yield savings account', children: <p>An FDIC-insured online bank. Link your checking. Set a payday transfer to the emergency fund.</p> },
          { title: 'Open the Roth IRA', children: <p>At Fidelity, Schwab or Vanguard. Link checking. Set $625 a month on the day after payday. Set automatic purchase of the S&amp;P 500 fund.</p> },
          { title: 'If you have a high-deductible plan, set the HSA', children: <p>Contribute through payroll. Choose an investment option for the amount above your deductible cushion.</p> },
          { title: 'Open the brokerage account later', children: <p>Only after everything above is full. Same broker as the IRA is simplest.</p> },
          { title: 'Put one date in your calendar each year', children: <p>Pick a day (your birthday, January 1). Check: contributions, the match, funds, beneficiaries, raises.</p> },
        ]}
      />

      <Callout type="success" title="The point of automation">
        Willpower is unreliable. A system that moves the money before you can spend it does not need willpower. Every
        month the right thing happens without a decision, and your only job is to raise the numbers after each raise.
      </Callout>

      <Section title="Your annual review" />
      <ul className="list-disc pl-5 space-y-1">
        <li>Did I raise my contributions after my raise (half of every raise)?</li>
        <li>Am I still getting the full match, and is it landing in my account?</li>
        <li>Is every dollar invested in the S&amp;P 500 fund, not sitting in cash?</li>
        <li>Is the emergency fund full? Did I use it and need to refill it?</li>
        <li>Is the Roth IRA limit for this year filled before the deadline?</li>
        <li>Are my beneficiaries current on every account?</li>
        <li>Do I need to re-run the order of operations because something changed?</li>
      </ul>

      <Section title="Run your own ladder" />
      <OrderOfOperations />

      <Exercise
        title="Design your month"
        solution={
          <ul className="list-disc pl-5 space-y-1">
            <li>A number for the money you can put to work each month after bills.</li>
            <li>Which step you are on: debt, emergency fund, Roth IRA, 401k, HSA/FSA or brokerage.</li>
            <li>The automatic transfers that match it, with dates.</li>
            <li>The date for next year&apos;s review.</li>
          </ul>
        }
      >
        <p>Using the calculator, write down what you will do with your monthly money, which rung you are on, and what you will automate this week.</p>
      </Exercise>

      <QuizSet title="Check yourself">
        <Quiz
          question="Why automate your investing?"
          options={['It lowers fees', 'It does not rely on willpower or timing', 'It is required', 'It improves returns by itself']}
          correctIndex={1}
          explanation="Automatic transfers and purchases make the right choice every month without a decision."
        />
        <Quiz
          question="In the timeline, what happens at month 10?"
          options={['The match stops', 'Debt and the emergency fund are done, so money flows to the Roth IRA and 401k', 'You must stop investing', 'You switch to a brokerage']}
          correctIndex={1}
          explanation="The first two rungs are full, so the same $2,500 flows down."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'Build once, automate everything: transfers, purchases, payroll deductions.',
          'The same monthly amount flows further down the ladder as each rung fills.',
          'A one-weekend checklist sets up every account. One date a year to review.',
          'Raise your contributions with every raise.',
        ]}
      />
    </div>
  );
}
