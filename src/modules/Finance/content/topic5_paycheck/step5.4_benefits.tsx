import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { Compare } from '../../../../components/content/Compare';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function Step5_4_Benefits() {
  return (
    <div>
      <StepHeader
        eyebrow="Topic 5 • Your Paycheck"
        title="Benefits: Pre-Tax vs Post-Tax"
        summary="Why the same dollar comes out of your paycheck at different prices depending on the type of benefit."
      />

      <Section title="Pre-tax benefits: the tax-free dollar" />
      <p>
        Health premiums, an HSA, an FSA and a traditional 401k are taken out <strong>before income tax</strong>. So you
        never pay income tax on those dollars. If you are in the 22% federal bracket and the 9.3% California bracket, a
        pre-tax dollar costs you about <strong>69 cents</strong> of take-home pay (100 − 22 − 9.3), because that dollar was
        going to be taxed at about 31%.
      </p>

      <Section title="Post-tax benefits: the after-tax dollar" />
      <p>
        A Roth 401k and most other deductions (some insurance, union dues) are taken out <strong>after</strong> tax. A
        post-tax dollar costs you the full dollar of take-home pay. You pay tax now, and for the Roth, never again on
        that money.
      </p>
      <Table
        headers={['Benefit', 'Taken out', 'Cost of $100 in your net pay']}
        align={['left', 'left', 'right']}
        rows={[
          ['Traditional 401k', 'Pre-tax', 'About $69 (22% federal + 9.3% California saved)'],
          ['HSA (through payroll)', 'Pre-tax, and lowers FICA too', 'About $69 (22% federal + 7.65% payroll + 1.3% SDI saved; California gives no income tax break)'],
          ['Health FSA', 'Pre-tax, lowers FICA', 'About $60 (federal, payroll, California and SDI all saved)'],
          ['Roth 401k', 'Post-tax', '$100'],
          ['A brokerage account', 'You choose', '$100'],
        ]}
      />
      <Callout type="info" title="Where the 60 comes from">
        An FSA dollar escapes federal income tax (22%), payroll tax (7.65%), California income tax (9.3%) and SDI (1.3%),
        so a $100 FSA dollar costs about $60 of take-home pay. An HSA is the same except California still taxes it. The details are in Topic 7.
      </Callout>

      <Section title="The benefits menu at a typical job" />
      <Table
        headers={['Benefit', 'What it is', 'Who pays']}
        rows={[
          [<strong key="a">Medical</strong>, 'Health insurance. Pick a plan type (PPO or high-deductible)', 'Employer pays a large share, you pay a premium'],
          [<strong key="b">Dental and vision</strong>, 'Smaller plans', 'Often mostly you'],
          [<strong key="c">401k and match</strong>, 'Retirement savings and free money from the employer', 'You contribute. The employer matches'],
          [<strong key="d">HSA</strong>, 'Health savings account, needs a high-deductible plan', 'You, and sometimes the employer'],
          [<strong key="e">FSA</strong>, 'Pre-tax account for medical or dependent care costs', 'You, use it or lose it'],
          [<strong key="f">Life and disability</strong>, 'Basic coverage, often free. Optional extra costs money', 'Employer, plus optional extra'],
          [<strong key="g">Paid time off</strong>, 'Vacation, sick, holidays', 'Employer'],
          [<strong key="h">Commuter, wellness, tuition</strong>, 'Smaller perks', 'Varies'],
        ]}
      />

      <Section title="Total compensation: your pay is more than your salary" />
      <p>An illustrative example (your numbers will differ):</p>
      <Table
        headers={['Part of total compensation', 'Per year']}
        align={['left', 'right']}
        rows={[
          ['Salary', '$100,000'],
          ['Employer 401k match (4%)', '$4,000'],
          ['Employer share of Social Security and Medicare (7.65%)', '$7,650'],
          ['Employer share of health insurance (example)', '$7,000'],
          [<strong key="a">Total cost to your employer</strong>, <strong key="b">about $118,650</strong>],
        ]}
      />
      <p>
        That is why a 1099 contractor needs a higher rate than a W-2 salary (Topic 2). W-2 benefits are worth real
        money, and you only see part of it on your stub.
      </p>

      <Compare
        goodLabel="Use these well"
        badLabel="Common mistakes"
        good={
          <>
            <p><strong>Take the full 401k match.</strong> It is free money, a guaranteed 50% to 100% return.</p>
            <p>Choose the health plan that costs least for the care you really use (Topic 6).</p>
            <p>Use pre-tax accounts (HSA, FSA) for spending you will do anyway.</p>
          </>
        }
        bad={
          <>
            <p>Skipping the match because take-home pay looks smaller.</p>
            <p>Overfunding an FSA and losing the unused money.</p>
            <p>Picking the cheapest premium without checking the deductible.</p>
          </>
        }
      />

      <QuizSet title="Check yourself">
        <Quiz
          question="You are in the 22% federal and 9.3% California brackets. About how much take-home pay does a $1,000 traditional 401k contribution cost?"
          options={['$1,000', '$690', '$220', '$93']}
          correctIndex={1}
          explanation="You save about 31% in income tax, so a $1,000 contribution reduces take-home pay by about $690."
        />
        <Quiz
          question="Which of these is NOT a pre-tax deduction?"
          options={['Health premium', 'HSA', 'Roth 401k', 'FSA']}
          correctIndex={2}
          explanation="A Roth 401k comes out of after-tax pay."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'Pre-tax deductions (premiums, HSA, FSA, traditional 401k) cost you less than a dollar of take-home pay per dollar.',
          'Post-tax deductions (Roth 401k) cost a full dollar now and give tax-free money later.',
          'Total compensation includes the match, the other half of FICA and insurance.',
          'Always take the full match.',
        ]}
      />
    </div>
  );
}
