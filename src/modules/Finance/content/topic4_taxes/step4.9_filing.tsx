import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { Steps } from '../../../../components/content/Steps';
import { Compare } from '../../../../components/content/Compare';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function Step4_9_Filing() {
  return (
    <div>
      <StepHeader
        eyebrow="Topic 4 • Income Tax"
        title="Filing: Forms, Deadlines and Records"
        summary="What arrives in the mail, what to do with it, and the one question that decides if you need an accountant."
      />

      <Section title="The forms you will receive" />
      <Table
        headers={['Form', 'What it reports', 'Arrives by']}
        rows={[
          [<strong key="a">W-2</strong>, 'Your wages and the tax withheld', 'January 31'],
          [<strong key="b">1099-NEC</strong>, 'Pay for contract work', 'January 31. Reported to you above $2,000 from 2026, but all income is taxable'],
          [<strong key="c">1099-INT / 1099-DIV</strong>, 'Interest and dividends', 'Mid-February'],
          [<strong key="d">1099-B</strong>, 'Sales of investments in a brokerage', 'Mid-February'],
          [<strong key="e">1099-R</strong>, 'Withdrawals from a 401k or IRA', 'January 31'],
          [<strong key="f">1098</strong>, 'Mortgage interest you paid', 'January 31'],
          [<strong key="g">1095-A / 1095-B / 1095-C</strong>, 'Health coverage', 'Early in the year'],
        ]}
      />

      <Section title="The deadlines" />
      <Table
        headers={['Date', 'What happens']}
        rows={[
          ['April 15', 'Federal and California returns are due, and any tax you owe must be paid'],
          ['Extension', 'You can request more time to file, usually to October 15. An extension to file is not an extension to pay: pay your estimate by April 15'],
          ['Quarterly dates', 'April 15, June 15, September 15, January 15 for estimated payments (step 4.7)'],
        ]}
      />

      <Section title="How to file, step by step" />
      <Steps
        steps={[
          { title: 'Collect every form', children: <p>Wait until you have all of them, usually by mid-February. Missing one can cause a letter later.</p> },
          { title: 'Choose how to file', children: <p>Free software works for a simple W-2 return (check irs.gov and ftb.ca.gov for free filing options). Paid software handles more. A CPA is best for business, rental or complex situations.</p> },
          { title: 'Enter income, then deductions and credits', children: <p>Let the software ask the questions. Answer every one about kids, education and retirement accounts.</p> },
          { title: 'Check the totals against last year', children: <p>If something changed a lot, find out why before you submit.</p> },
          { title: 'File federal and California, e-file with direct deposit', children: <p>E-filing is faster and has fewer mistakes. Save a PDF copy.</p> },
          { title: 'Pay what you owe or plan the refund', children: <p>Pay by direct debit. If you get a refund, send it where the order of operations says.</p> },
        ]}
      />

      <Section title="Refund vs owing: which is better?" />
      <Compare
        goodLabel="A small refund or small balance"
        badLabel="A big refund"
        good={
          <>
            <p>You paid about the right amount all year.</p>
            <p>You kept your own money in your paychecks.</p>
          </>
        }
        bad={
          <>
            <p>A $4,000 refund means you lent the government $4,000 for free, about $333 a month you could have invested.</p>
            <p>Adjust your W-4 (Topic 5) so the refund is small.</p>
          </>
        }
      />
      <Callout type="info" title="Owing is not a penalty">
        Owing a few hundred dollars is fine. What triggers a penalty is underpaying a lot during the year (see the safe
        harbor rule in step 4.7).
      </Callout>

      <Section title="Keep your records" />
      <ul className="list-disc pl-5 space-y-1">
        <li>Keep a copy of every return and the forms behind it for <strong>at least 3 years</strong> (7 if you claimed a loss or are unsure).</li>
        <li>Keep receipts for deductions and business expenses. Photos are fine.</li>
        <li>Keep records of the cost of every investment you buy (your broker tracks it).</li>
        <li>Keep home purchase and improvement records for as long as you own the home.</li>
        <li>Store everything in one folder, named by tax year.</li>
      </ul>

      <Section title="Do I need an accountant?" />
      <Table
        headers={['Situation', 'Software is fine', 'Hire a CPA']}
        rows={[
          ['One W-2 job, standard deduction', 'Yes', ''],
          ['Marriage, kids, a mortgage', 'Usually', 'If you are unsure'],
          ['1099 income, a business', 'Maybe at the start', 'Yes, once income grows'],
          ['Rental property', '', 'Yes'],
          ['Selling a home, stock options, large gains', '', 'Yes'],
        ]}
      />

      <QuizSet title="Check yourself">
        <Quiz
          question="A tax extension gives you more time to do what?"
          options={['Pay', 'File the return', 'Both', 'Neither']}
          correctIndex={1}
          explanation="You still need to pay what you owe by April 15."
        />
        <Quiz
          question="A $4,000 refund each year means what?"
          options={['You got a gift', 'You lent the government $4,000 interest-free', 'You underpaid', 'You owe next year']}
          correctIndex={1}
          explanation="You over-withheld. Adjust the W-4 so more arrives in your paycheck."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'Forms arrive in January and February: W-2, 1099s, 1098. Gather them all first.',
          'File by April 15. An extension to file is not an extension to pay.',
          'Aim for a small refund. A big one is an interest-free loan to the government.',
          'Keep records for at least 3 years. Hire a CPA for business, rental or large events.',
        ]}
      />
    </div>
  );
}
