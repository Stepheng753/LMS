import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { Formula } from '../../../../components/content/Formula';
import { Steps } from '../../../../components/content/Steps';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';
import { MortgageCalculator } from '../../calculators';

export default function Step10_3_Mortgage() {
  return (
    <div>
      <StepHeader
        eyebrow="Topic 10 • The Mortgage"
        title="How a Mortgage Works"
        summary="A loan secured by the home: what you borrow, what it costs each month, and the pieces of the payment people forget."
      />

      <Section title="The vocabulary" />
      <Table
        headers={['Word', 'Meaning', 'Example (the condo)']}
        rows={[
          [<strong key="a">Price</strong>, 'What you pay for the home', '$500,000'],
          [<strong key="b">Down payment</strong>, 'Your cash at purchase', '$100,000 (20%)'],
          [<strong key="c">Principal (the loan)</strong>, 'What you borrow', '$400,000'],
          [<strong key="d">Interest rate</strong>, 'The yearly cost of the loan', '6.5%'],
          [<strong key="e">Term</strong>, 'How long to repay', '30 years (360 payments)'],
          [<strong key="f">Closing costs</strong>, 'Fees paid at purchase: lender, title, appraisal, escrow, recording', 'About 2% to 3%: $10,000 here'],
          [<strong key="g">Escrow</strong>, 'An account where the lender collects property tax and insurance with your payment', 'Often added to the monthly bill'],
          [<strong key="h">PITI</strong>, 'Principal, Interest, Taxes, Insurance: the full payment', '$2,528 + $479 + $58 = $3,065'],
        ]}
      />

      <Section title="The monthly payment formula" />
      <Formula label="Principal and interest" where={[{ symbol: 'L', meaning: 'the loan amount' }, { symbol: 'r', meaning: 'the monthly rate: yearly rate ÷ 12' }, { symbol: 'n', meaning: 'number of payments: years × 12' }]}>
        payment = L × r ÷ (1 − (1 + r)^−n)
      </Formula>
      <p>
        For $400,000 at 6.5% for 30 years: r = 0.065 ÷ 12 = 0.005417 and n = 360. The payment is
        <strong> $2,528.27</strong> every month, the same for 30 years if the rate is fixed. You will never calculate it by hand. Use
        the calculator, and know that a small change in the rate moves it a lot:
      </p>
      <Table
        headers={['Rate', 'Monthly payment ($400,000, 30 years)', 'Compared with 6.5%']}
        align={['left', 'right', 'right']}
        rows={[
          ['5.5%', '$2,271', '−$257 a month'],
          ['6.5%', '$2,528', '—'],
          ['7.5%', '$2,797', '+$269 a month'],
        ]}
      />

      <Section title="The choices you will face" />
      <Table
        headers={['Choice', 'Options', 'Playbook view']}
        rows={[
          [<strong key="a">Fixed vs adjustable (ARM)</strong>, 'Fixed: the rate never changes. ARM: a low rate for a few years, then it resets', 'Fixed. An ARM can raise your payment sharply'],
          [<strong key="b">30-year vs 15-year</strong>, '15-year: higher payment ($3,484 here), lower rate, far less interest ($227,000 vs $510,000)', 'A 30-year with extra payments gives you flexibility. A 15-year if it fits easily'],
          [<strong key="c">Points</strong>, 'Pay a fee up front for a lower rate', 'Only if you will stay many years'],
          [<strong key="d">Down payment size</strong>, '3% to 20% or more', '20% avoids PMI (step 10.5)'],
        ]}
      />
      <Callout type="warning" title="How much house can you afford?">
        Lenders say yes to far more than is wise. A safer guide: total housing cost (PITI + HOA) at or below <strong>28% of gross
        income</strong>, and all debts below 36%. The $3,065 PITI + $450 HOA = $3,515 a month needs about $150,000 of gross
        income. Fit the payment inside your budget (Topic 2), and keep investing.
      </Callout>

      <Section title="Getting a mortgage" />
      <Steps
        steps={[
          { title: 'Check your credit score', children: <p>The rate depends on it (Topic 3). 740 and above gets the best rates.</p> },
          { title: 'Save the down payment and closing costs', children: <p>Not from the emergency fund or retirement accounts.</p> },
          { title: 'Get pre-approved', children: <p>A lender checks your income and credit and states how much you can borrow.</p> },
          { title: 'Compare lenders', children: <p>Get at least three quotes on the same day. Compare the rate and the closing costs (the &quot;Loan Estimate&quot; form).</p> },
          { title: 'Make an offer, inspect, appraise', children: <p>Inspection finds problems. The appraisal confirms the price supports the loan.</p> },
          { title: 'Close', children: <p>Sign, pay the down payment and closing costs, and get the keys.</p> },
        ]}
      />

      <Section title="Try your own mortgage" />
      <MortgageCalculator mode="payment" title="Mortgage payment: the $500,000 condo" />

      <QuizSet title="Check yourself">
        <Quiz
          question="What does PITI stand for?"
          options={['Price, Interest, Tax, Insurance', 'Principal, Interest, Taxes, Insurance', 'Payment, Interest, Total, Income', 'Principal, Income, Tax, Interest']}
          correctIndex={1}
          explanation="The four parts of the monthly housing payment, before HOA and upkeep."
        />
        <Quiz
          question="Why is an adjustable-rate mortgage riskier than a fixed one?"
          options={['It costs more up front', 'The rate can rise after the starting period, raising your payment', 'It lasts longer', 'It has no interest']}
          correctIndex={1}
          explanation="A fixed rate never changes."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'Payment = L × r ÷ (1 − (1 + r)^−n). $400,000 at 6.5% for 30 years is $2,528.27 a month.',
          'PITI (principal, interest, taxes, insurance) is the real payment, plus HOA and upkeep.',
          'A one-point rate change moves the payment by about $260 a month.',
          'Choose a fixed rate. Keep housing at or below about 28% of gross income.',
        ]}
      />
    </div>
  );
}
