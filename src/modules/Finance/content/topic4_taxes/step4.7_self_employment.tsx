import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { Steps } from '../../../../components/content/Steps';
import { Exercise } from '../../../../components/content/Exercise';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';
import { SelfEmploymentTax } from '../../calculators';

export default function Step4_7_SelfEmployment() {
  return (
    <div>
      <StepHeader
        eyebrow="Topic 4 • Income Tax"
        title="1099 Income: Self-Employment Tax and Quarterly Payments"
        summary="Nobody withholds tax from 1099 income, so you pay it yourself, four times a year."
      />

      <Callout type="warning" title="Set aside 25% to 30% of every 1099 payment">
        The most painful tax surprise is a freelancer who spent everything and now owes thousands in April. Put 25% to
        30% of each payment in a separate savings account the day it arrives. The rest is yours.
      </Callout>

      <Section title="What you owe on 1099 profit" />
      <Table
        headers={['Tax', 'How it is calculated']}
        rows={[
          [<strong key="a">Self-employment tax</strong>, '15.3% × 92.35% of your net profit (12.4% Social Security up to $184,500, plus 2.9% Medicare). This is both the employee and employer halves'],
          [<strong key="b">Federal income tax</strong>, 'On profit minus half of the self-employment tax, minus the standard deduction'],
          [<strong key="c">California income tax</strong>, 'On the same profit, with California’s own brackets'],
          [<strong key="d">California SDI</strong>, 'Not required for the self-employed, unless you opt in'],
        ]}
      />
      <p>Net profit means revenue minus allowed business expenses.</p>

      <Section title="Two examples (single, 2026)" />
      <Table
        headers={['', '$100,000 profit', '$40,000 revenue, $4,000 expenses']}
        align={['left', 'right', 'right']}
        rows={[
          ['Net profit', '$100,000', '$36,000'],
          ['Self-employment tax', '$14,130', '$5,087'],
          ['Federal income tax', '$11,616', '$1,835'],
          ['California income tax', '$4,254', '$287'],
          [<strong key="a">Total</strong>, <strong key="b">$29,999</strong>, <strong key="c">$7,208</strong>],
          ['As a percent of net profit', 'about 30%', 'about 20%'],
          ['Quarterly payment', 'about $7,500', 'about $1,800'],
        ]}
      />
      <p>The 25% to 30% rule fits both. Smaller profits owe a lower percent, because more of the income sits in the low brackets.</p>

      <Section title="Quarterly estimated payments" />
      <Table
        headers={['Payment', 'Federal due date (2026 income)', 'California share']}
        rows={[
          ['Q1', 'April 15, 2026', '30%'],
          ['Q2', 'June 15, 2026', '40%'],
          ['Q3', 'September 15, 2026', '0% (none)'],
          ['Q4', 'January 15, 2027', '30%'],
        ]}
      />
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>Federal:</strong> pay at irs.gov/payments with Form 1040-ES. Four equal parts are the simplest.</li>
        <li><strong>California:</strong> pay at ftb.ca.gov with Form 540-ES, in a 30%, 40%, 0%, 30% pattern.</li>
        <li><strong>Safe harbor:</strong> to avoid a penalty, pay at least 90% of this year&apos;s tax or 100% of last year&apos;s tax (110% if last year&apos;s income was over $150,000).</li>
        <li><strong>If you also have a W-2 job</strong>, you can raise your withholding there instead of making quarterly payments (Topic 5).</li>
      </ul>

      <Section title="Deductions that matter for 1099 workers" />
      <ul className="list-disc pl-5 space-y-1">
        <li>Supplies, software, equipment, phone and internet (the business share).</li>
        <li>Home office, if a space is used only and regularly for work.</li>
        <li>Mileage for business driving, and business meals (50%).</li>
        <li>Self-employed health insurance premiums.</li>
        <li><strong>Retirement:</strong> a SEP-IRA or a solo 401k lets you save much more than an IRA, and the contributions lower taxable profit.</li>
        <li>Half of the self-employment tax.</li>
        <li>The federal qualified business income deduction: up to 20% of qualified profit for many sole proprietors (California does not allow it).</li>
      </ul>

      <Section title="The calculator" />
      <p>Turn the expenses and the QBI deduction on and off. Compare the bottom lines with the same income as a W-2.</p>
      <SelfEmploymentTax />

      <Section title="Your 1099 routine" />
      <Steps
        steps={[
          { title: 'Open a separate checking account for the business', children: <p>Keep business money and personal money apart. Record-keeping becomes easy.</p> },
          { title: 'Move 25% to 30% to a tax savings account on every payment day', children: <p>A high-yield savings account works. Do it right away.</p> },
          { title: 'Track every expense with a receipt or note', children: <p>A simple spreadsheet is enough: date, amount, what for.</p> },
          { title: 'Pay the four quarterly estimates', children: <p>Put the dates in your calendar for April, June, September and January.</p> },
          { title: 'File a Schedule C with your annual return', children: <p>Or hire a CPA once your income passes a few thousand dollars a month.</p> },
        ]}
      />

      <Exercise
        title="Estimate a quarter"
        solution={
          <p>
            Profit of $12,000 in the quarter. At about 25% to 30%, set aside <strong>$3,000 to $3,600</strong>. The
            federal payment would be about 75% of that and the California payment (in April) about 30% of the year&apos;s California total.
          </p>
        }
      >
        <p>You earned $12,000 of net profit from 1099 work in the first three months. About how much should you set aside?</p>
      </Exercise>

      <QuizSet title="Check yourself">
        <Quiz
          question="Why is self-employment tax about double the payroll tax a W-2 worker sees?"
          options={['It is a penalty', 'You pay both the employee half and the employer half', 'It includes state tax', 'It is the same']}
          correctIndex={1}
          explanation="A W-2 worker pays 7.65% and their employer pays another 7.65%. The self-employed pay both."
        />
        <Quiz
          question="California estimated payments are split how?"
          options={['25%, 25%, 25%, 25%', '30%, 40%, 0%, 30%', '50%, 0%, 0%, 50%', '100% in April']}
          correctIndex={1}
          explanation="California asks for 30% in April, 40% in June, nothing in September, 30% in January."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'Set aside 25% to 30% of every 1099 payment in a separate account.',
          'Self-employment tax is 15.3% of 92.35% of profit, both halves.',
          'Estimated payments: Apr 15, Jun 15, Sep 15, Jan 15 federal. California 30/40/0/30.',
          'Business expenses, a SEP-IRA or solo 401k, and the QBI deduction reduce the bill.',
        ]}
      />
    </div>
  );
}
