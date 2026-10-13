import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { Compare } from '../../../../components/content/Compare';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function Step7_5_401k() {
  return (
    <div>
      <StepHeader
        eyebrow="Topic 7 • Accounts"
        title="The 401k"
        summary="The retirement account through your job: a big $24,500 limit, automatic payroll deductions, and the match."
      />

      <Section title="What it is" />
      <p>
        A <strong>401k</strong> is a retirement account offered by your employer (a 403b at schools and nonprofits, a 457
        for some government jobs). Money comes out of each paycheck automatically, goes into investment funds picked by
        the plan, and, if you are lucky, your employer adds a match.
      </p>

      <Table
        headers={['', 'Detail (2026)']}
        rows={[
          [<strong key="a">Your limit</strong>, '$24,500 a year, Roth and traditional combined'],
          [<strong key="b">Catch-up</strong>, '+$8,000 at 50 and older, +$11,250 at ages 60 to 63'],
          [<strong key="c">Total limit with employer money</strong>, '$72,000'],
          [<strong key="d">Per paycheck to max (26)</strong>, '$942.31'],
          [<strong key="e">Per month to max</strong>, '$2,041.67'],
          [<strong key="f">Types</strong>, 'Traditional (pre-tax) and, if your plan offers it, Roth (after-tax)'],
        ]}
      />

      <Section title="The good and the not-so-good" />
      <Compare
        goodLabel="Why a 401k is great"
        badLabel="Where it falls short"
        good={
          <>
            <p><strong>The match,</strong> free money.</p>
            <p><strong>Automatic:</strong> money leaves before you see it.</p>
            <p>A <strong>big limit</strong> compared with an IRA.</p>
            <p>Strong creditor protection.</p>
            <p>You can take a loan from it in some plans (not recommended).</p>
          </>
        }
        bad={
          <>
            <p><strong>Limited investment menu.</strong> Only the funds your plan offers.</p>
            <p><strong>Fees can be high.</strong> Check the expense ratios (step 7.14).</p>
            <p>Early withdrawals have a 10% penalty plus tax.</p>
            <p>The Roth option exists only if your employer offers it.</p>
          </>
        }
      />

      <Section title="Your first steps in a new 401k" />
      <ol className="list-decimal pl-5 space-y-1">
        <li>Sign up on the first day. Do not wait for the next enrollment window.</li>
        <li>Set the contribution to at least the amount that gets the <strong>full match</strong>.</li>
        <li>Choose <strong>Roth or traditional</strong> (steps 7.6 to 7.9).</li>
        <li>Pick the <strong>lowest-cost index fund</strong> in the menu, such as an S&amp;P 500 or total market index fund. Look at the expense ratio.</li>
        <li>If the plan has a <strong>target-date fund</strong> that you do not want, ignore it. Pick your own.</li>
        <li>Turn on <strong>automatic increases</strong>, 1% a year, if offered.</li>
      </ol>

      <Callout type="warning" title="Check the fund you actually own">
        Many plans default your money to a safe &quot;money market&quot; or stable-value fund. Log in and check that your
        contributions are going into the fund you chose, not sitting in cash.
      </Callout>

      <Section title="When you change jobs" />
      <Table
        headers={['Option', 'What it means', 'Usually']}
        rows={[
          [<strong key="a">Leave it</strong>, 'Keep it in the old plan', 'Fine if the plan is good, but accounts get forgotten'],
          [<strong key="b">Roll over to the new 401k</strong>, 'Move it to the new employer plan', 'Good if the new plan has low-cost funds'],
          [<strong key="c">Roll over to an IRA</strong>, 'Move it to an IRA at your broker (a Roth 401k goes to a Roth IRA)', 'Often best: more investment choices'],
          [<strong key="d">Cash it out</strong>, 'Take the money', 'Almost never: income tax plus a 10% penalty, and you lose years of growth'],
        ]}
      />
      <p>Always do a <strong>direct rollover</strong> (money goes from one account to the other) so no tax is withheld.</p>

      <QuizSet title="Check yourself">
        <Quiz
          question="What is the 2026 employee 401k contribution limit for someone under 50?"
          options={['$7,500', '$24,500', '$72,000', '$100,000']}
          correctIndex={1}
          explanation="$24,500 across Roth and traditional 401k combined."
        />
        <Quiz
          question="You change jobs. What is usually the worst choice for your old 401k?"
          options={['Roll it into an IRA', 'Roll it into the new 401k', 'Cash it out', 'Leave it where it is']}
          correctIndex={2}
          explanation="Cashing out triggers income tax and a 10% penalty, and stops the growth."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'A 401k is a payroll-deducted retirement account with a $24,500 limit and often a match.',
          'Sign up on day one, get the full match, and choose a low-cost index fund.',
          'Check that your money is invested, not sitting in cash.',
          'When you change jobs, roll over directly into an IRA or the new plan. Never cash out.',
        ]}
      />
    </div>
  );
}
