import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { Exercise } from '../../../../components/content/Exercise';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function Step3_6_CreditScore() {
  return (
    <div>
      <StepHeader
        eyebrow="Topic 3 • Credit Cards"
        title="Your Credit Score"
        summary="A three-digit number that sets the interest rate on the biggest loan of your life. What moves it, and what does not."
      />

      <p>
        A credit score (from 300 to 850) is a grade on how reliably you repay money. Lenders use it to decide whether to
        lend to you and at what rate. Landlords, insurers and some employers also look at it.
      </p>

      <Section title="The ranges" />
      <Table
        headers={['Score', 'Called', 'What it means']}
        rows={[
          ['800 to 850', 'Exceptional', 'The best rates available'],
          ['740 to 799', 'Very good', 'Best or near-best rates'],
          ['670 to 739', 'Good', 'Fine rates'],
          ['580 to 669', 'Fair', 'Higher rates, harder approvals'],
          ['300 to 579', 'Poor', 'Often denied, or very high rates'],
        ]}
      />

      <Section title="What goes into it (FICO)" />
      <Table
        headers={['Factor', 'Weight', 'What helps']}
        align={['left', 'right', 'left']}
        rows={[
          [<strong key="a">Payment history</strong>, '35%', 'Never pay late. Autopay the full statement'],
          [<strong key="b">Utilization</strong>, '30%', 'Balance as a percent of your limit. Keep it under 30%, ideally under 10%'],
          [<strong key="c">Length of history</strong>, '15%', 'Keep old accounts open. Age helps'],
          [<strong key="d">New credit</strong>, '10%', 'Do not open many accounts in a short time'],
          [<strong key="e">Credit mix</strong>, '10%', 'A mix of cards and loans is a small positive'],
        ]}
      />
      <Callout type="info" title="Utilization in numbers">
        If your limit is $10,000 and your balance when the statement closes is $900, your utilization is 9%. If it is
        $4,000, it is 40% and your score drops. Note that the balance <em>on the statement date</em> is what gets reported,
        so even people who pay in full can show high utilization if they spend a lot before it closes. If you are
        aiming for a score, pay the card down a few days before the statement closes.
      </Callout>

      <Section title="Why the score is worth real money" />
      <p>On a $400,000, 30-year mortgage (Topic 10), the rate is tied to your score:</p>
      <Table
        headers={['Rate', 'Monthly payment', 'Interest over 30 years']}
        align={['left', 'right', 'right']}
        rows={[
          ['6.5% (excellent credit)', '$2,528', '$510,178'],
          ['7.0%', '$2,661', '$558,036'],
          ['7.5% (fair credit)', '$2,797', '$606,869'],
        ]}
      />
      <p>
        The 1% rate gap between the top and bottom row costs <strong>$269 a month</strong>, and about <strong>$97,000</strong>
        over the loan. A strong score is built from boring habits over years.
      </p>

      <Section title="Myths" />
      <Table
        headers={['Myth', 'Truth']}
        rows={[
          ['You must carry a balance to build credit', 'False. Paying in full builds it just as well and costs nothing'],
          ['Checking your own score hurts it', 'False. A soft pull never hurts. Check free'],
          ['Closing an old card helps', 'It can hurt, because it lowers your total limit and the age of your history'],
          ['Debit cards build credit', 'No. Only credit accounts report'],
          ['Income is part of the score', 'No. Your score does not include income'],
        ]}
      />

      <Section title="How to build or repair it" />
      <ol className="list-decimal pl-5 space-y-1">
        <li>Get a free report from annualcreditreport.com and dispute any mistakes.</li>
        <li>Open one no-fee card, put one small recurring bill on it, and autopay in full.</li>
        <li>Pay down balances before the statement closes. Aim for under 10% utilization.</li>
        <li>Never miss a payment. If you are behind, catch up first.</li>
        <li>Be patient: positive history takes years to build, but it adds up.</li>
      </ol>

      <Exercise
        title="Check your numbers"
        solution={
          <ul className="list-disc pl-5 space-y-1">
            <li>Your free reports pulled and reviewed for errors.</li>
            <li>Your utilization worked out: statement balance ÷ limit.</li>
            <li>Autopay set to the full statement.</li>
            <li>The oldest card identified, and marked &quot;never close&quot;.</li>
          </ul>
        }
      >
        <p>Pull your free credit reports, compute the utilization of each card (balance ÷ limit), and check that your oldest account is still open.</p>
      </Exercise>

      <QuizSet title="Check yourself">
        <Quiz
          question="Which factor has the largest weight in a FICO score?"
          options={['Credit mix', 'Payment history', 'New credit', 'Income']}
          correctIndex={1}
          explanation="Payment history is 35%. Never pay late."
        />
        <Quiz
          question="A $5,000 limit with a $500 balance at the statement date. Utilization?"
          options={['5%', '10%', '50%', '100%']}
          correctIndex={1}
          explanation="$500 ÷ $5,000 = 10%."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'Score range 300 to 850. Payment history 35%, utilization 30%, history 15%, new credit 10%, mix 10%.',
          'You do not need to carry a balance to build credit.',
          'Keep utilization under 10%, keep old cards open, never pay late.',
          'A 1% higher mortgage rate costs about $269 a month and $97,000 over 30 years on $400,000.',
        ]}
      />
    </div>
  );
}
