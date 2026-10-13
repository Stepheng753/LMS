import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { Steps } from '../../../../components/content/Steps';
import { Exercise } from '../../../../components/content/Exercise';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function Step5_7_W4() {
  return (
    <div>
      <StepHeader
        eyebrow="Topic 5 • Your Paycheck"
        title="The W-4, Dependents and Withholding"
        summary="The one form that tells your employer how much tax to take out. Get it right and you avoid both a big refund and a big bill."
      />

      <Section title="What the W-4 does" />
      <p>
        When you start a job you fill out a <strong>Form W-4</strong>. It does not set your tax. It only tells your
        employer how much to <strong>withhold</strong> from each paycheck as a down payment on your tax. Your real tax is
        settled when you file. The W-4 aims to make the two match.
      </p>

      <Section title="The five steps of the form" />
      <Table
        headers={['Step', 'What you do', 'Effect']}
        rows={[
          [<strong key="a">1. Personal info</strong>, 'Name, address, and filing status: single, married jointly, or head of household', 'Chooses which brackets and standard deduction are used'],
          [<strong key="b">2. Multiple jobs or a working spouse</strong>, 'Tick the box or use the estimator if you have two jobs or both spouses work', 'Raises withholding so two incomes do not under-withhold'],
          [<strong key="c">3. Claim dependents</strong>, 'Add $2,200 for each child under 17 and $500 for each other dependent', 'Lowers withholding by the credits'],
          [<strong key="d">4. Other adjustments</strong>, '(a) other income, (b) extra deductions, (c) extra withholding per paycheck', 'Fine-tunes the withholding'],
          [<strong key="e">5. Sign</strong>, 'Sign and date', 'Makes it official'],
        ]}
      />
      <p>
        California has its own form, <strong>DE 4</strong>, for state withholding. If you skip it, your employer uses the
        federal W-4 for California too.
      </p>

      <Section title="What each choice does to your paycheck" />
      <Table
        headers={['Choice (the $100,000 single example)', 'Federal withholding per paycheck', 'Result at tax time']}
        align={['left', 'right', 'left']}
        rows={[
          ['Standard W-4, nothing special', '$468.04', 'Refund or balance close to zero'],
          ['Add $100 extra per paycheck (step 4c)', '$568.04', 'Refund of about $2,600'],
          ['Add $20,000 of other income and do nothing', '$468.04', 'Owe about $6,260'],
          ['Add $20,000 of other income and add $250 per paycheck (4c)', '$718.04', 'Close to even'],
        ]}
      />

      <Callout type="info" title="The goal is close to zero, slightly over">
        A big refund means you gave the government an interest-free loan all year. A big bill means you underpaid and
        might owe a penalty. Aim for a refund of a few hundred dollars. Use the IRS tax withholding estimator at
        irs.gov to fill in step 4 exactly.
      </Callout>

      <Section title="When to update your W-4" />
      <Steps
        steps={[
          { title: 'You get married or divorced', children: <p>Filing status changes the brackets and the standard deduction.</p> },
          { title: 'You have a child or add a dependent', children: <p>Each child under 17 is a $2,200 credit in step 3.</p> },
          { title: 'A spouse starts or stops working', children: <p>Two incomes can push you into higher brackets than either alone.</p> },
          { title: 'You start a second job or side income', children: <p>Income with no withholding needs extra withholding or quarterly payments (Topic 4).</p> },
          { title: 'You got a big refund or bill last year', children: <p>Adjust step 4(c) up or down so next year is closer to zero.</p> },
          { title: 'A big raise or a bonus', children: <p>Check the estimator. Bonuses are often withheld at a flat 22% federal.</p> },
        ]}
      />

      <Exercise
        title="Fix the withholding"
        hint={<p>An extra $X per paycheck over 26 paychecks is $26X a year.</p>}
        solution={
          <p>
            You would owe about $6,260. Spread over 26 paychecks that is about <strong>$241 extra per paycheck</strong>. Round
            to $250 and you are slightly over, which is safe. (Or make quarterly estimated payments instead.)
          </p>
        }
      >
        <p>You have a $100,000 job and expect $20,000 of freelance income with no tax withheld. About how much extra should you withhold per paycheck to avoid owing at tax time?</p>
      </Exercise>

      <QuizSet title="Check yourself">
        <Quiz
          question="Does the W-4 set the amount of tax you will owe?"
          options={['Yes', 'No: it only sets how much is withheld during the year', 'Only for single people', 'Only for dependents']}
          correctIndex={1}
          explanation="Your real tax is calculated when you file. The W-4 tries to make withholding match it."
        />
        <Quiz
          question="Which W-4 step gets you a larger paycheck if you have two children?"
          options={['Step 1', 'Step 3', 'Step 5', 'None']}
          correctIndex={1}
          explanation="Step 3 claims the $2,200 child credit per child, lowering withholding."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'The W-4 tells your employer how much to withhold. Your real tax is settled at filing.',
          'Dependents in step 3 lower withholding. Other income and extra amounts in step 4 raise it.',
          'Aim for a small refund. Update the W-4 after marriage, a baby, a second income or a big change.',
          'California uses form DE 4 for state withholding.',
        ]}
      />
    </div>
  );
}
