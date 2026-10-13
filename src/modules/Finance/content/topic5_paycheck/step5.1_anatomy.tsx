import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { Exercise } from '../../../../components/content/Exercise';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function Step5_1_Anatomy() {
  return (
    <div>
      <StepHeader
        eyebrow="Topic 5 • Your Paycheck"
        title="Anatomy of a Paycheck Stub"
        summary="Five sections, top to bottom. Learn to read your stub and you can catch mistakes."
      />

      <Section title="The five sections" />
      <Table
        headers={['Section', 'What is in it', 'Example']}
        rows={[
          [<strong key="a">1. Earnings</strong>, 'Gross pay for the period, hours or salary, bonuses, overtime', 'Regular pay $3,846.15'],
          [<strong key="b">2. Pre-tax deductions</strong>, 'Taken out before income tax: health, dental, vision, HSA, FSA, traditional 401k', 'Health $150.00'],
          [<strong key="c">3. Taxes</strong>, 'Federal income tax, Social Security, Medicare, state income tax, state disability (SDI)', 'Federal $468.04'],
          [<strong key="d">4. Post-tax deductions</strong>, 'Taken out after tax: a Roth 401k, wage garnishments, union dues, some insurance', 'Roth 401k $942.31'],
          [<strong key="e">5. Net pay</strong>, 'What lands in your account', '$1,759.64'],
        ]}
      />

      <Section title="A real-looking stub (every 2 weeks, $100,000, California)" />
      <Table
        headers={['Line', 'This paycheck', 'Year to date after 10 checks']}
        align={['left', 'right', 'right']}
        rows={[
          [<strong key="a">Gross pay</strong>, '$3,846.15', '$38,461.50'],
          ['Health premium (pre-tax)', '−$150.00', '−$1,500.00'],
          ['Dental and vision (pre-tax)', '−$25.00', '−$250.00'],
          ['Federal income tax', '−$468.04', '−$4,680.40'],
          ['Social Security (6.2%)', '−$227.61', '−$2,276.10'],
          ['Medicare (1.45%)', '−$53.23', '−$532.30'],
          ['California income tax', '−$172.60', '−$1,726.00'],
          ['California SDI (1.3%)', '−$47.72', '−$477.20'],
          ['Roth 401k (post-tax)', '−$942.31', '−$9,423.10'],
          [<strong key="b">Net pay</strong>, <strong key="c">$1,759.64</strong>, <strong key="d">$17,596.40</strong>],
        ]}
      />
      <p>
        Two lines to notice: the <strong>year-to-date</strong> column adds up every paycheck so far, and the Roth 401k is
        the single biggest deduction, bigger than federal tax. That is the cost of maxing it out, and also the point.
      </p>

      <Callout type="info" title="What is not on the stub but is yours">
        Your employer also pays the other half of Social Security and Medicare, usually a <strong>4% 401k match</strong>
        ($4,000 a year here), a large share of your health insurance, unemployment and disability insurance, and
        payroll fees. These are part of your <em>total compensation</em>, even though they never appear in your net pay.
      </Callout>

      <Section title="Check your stub every few months" />
      <ul className="list-disc pl-5 space-y-1">
        <li>Is gross pay what you expect? Did a raise or bonus arrive as promised?</li>
        <li>Are your 401k and HSA contributions the amounts you chose?</li>
        <li>Is the match showing up in the retirement account?</li>
        <li>Does the withholding match your W-4 (step 5.7)?</li>
        <li>Is the Social Security tax 6.2% of the right wages, and Medicare 1.45%?</li>
      </ul>

      <Exercise
        title="Read the stub"
        solution={
          <ul className="list-disc pl-5 space-y-1">
            <li>Net pay: $3,846.15 − $175 − $468.04 − $227.61 − $53.23 − $172.60 − $47.72 − $942.31 = <strong>$1,759.64</strong>.</li>
            <li>The largest deduction is the Roth 401k at $942.31.</li>
            <li>Taxes total $969.20 (federal, Social Security, Medicare, California and SDI), about 25% of gross.</li>
          </ul>
        }
      >
        <p>Using the stub above: what is the net pay, which deduction is the largest, and about what percent of gross goes to taxes?</p>
      </Exercise>

      <QuizSet title="Check yourself">
        <Quiz
          question="Which of these is a post-tax deduction?"
          options={['Health premium', 'Roth 401k', 'Traditional 401k', 'HSA']}
          correctIndex={1}
          explanation="A Roth 401k comes out after income tax has been calculated."
        />
        <Quiz
          question="What does the year-to-date column show?"
          options={['Next year’s pay', 'The total of all paychecks so far this year', 'The average paycheck', 'Your tax refund']}
          correctIndex={1}
          explanation="Year-to-date adds every paycheck since January 1."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'A stub has five parts: earnings, pre-tax deductions, taxes, post-tax deductions, net pay.',
          'Pre-tax items lower your income tax. Post-tax items like a Roth 401k do not.',
          'The employer pays extra on your behalf: the match, the other half of FICA, part of insurance.',
          'Check your stub for correct contributions and withholding.',
        ]}
      />
    </div>
  );
}
